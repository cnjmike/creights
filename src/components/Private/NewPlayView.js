import React, {useEffect, useRef, useState} from "react"
import Stock from "../Common/Stock"
import Pile from "../Common/Pile"
import Drawer from "../Drawer"
import {Settings} from "./Settings"
import {useGameEngine} from "../../hooks/useGameEngine"
import {blindCardStyle, initialBlindCardStyle,
    handCardStyle, initialHandCardStyle,
    playerStyle, initialModelPlayerViewBase,
    rescalePrivateView} from "./privateLayout"
import Card from "../Common/Card"
import DialogContainer from "../DialogContainer"
import Deal from "./Deal"
import Declare from "./Declare"
import './NewPlayView.css'

export const NewPlayView = () => {

    const {
        players,
        currentPlayerIx,
        currentDealerIx,
        myself,
        pile,
        direction,
        phase,

        draw,
        pickUp,
        discard
    } = useGameEngine()

    const clientRef = useRef(null)
    const [modelPlayerViewBase, setModelPlayerViewBase] = useState(initialModelPlayerViewBase)
    const [tableTopStyle, setTableTopStyle] = useState(initialModelPlayerViewBase)
    const [myPlayerIx, setMyPlayerIx] = useState(0)
    const [stockStyle, setStockStyle] = useState({})
    const [pileStyle, setPileStyle] = useState({})
    const [blindCardStyleInput, setBlindCardStyleInput] = useState(initialBlindCardStyle)
    const [handCardStyleInput, setHandCardStyleInput] = useState(initialHandCardStyle)
    const [dTheta, setDTheta] = useState(0)
    const [firstTheta, setFirstTheta] = useState(0)
    const [dialog, setDialog] = useState(null)

    useEffect(() => {

        const handleResize = () => {
            const {
                newModelPlayerViewBase,
                newTableTopStyle,
                newStockStyle,
                newPileStyle,
                newBlindCardStyleInput,
                newHandCardStyleInput
            } = rescalePrivateView(clientRef.current)

            setModelPlayerViewBase(newModelPlayerViewBase)
            setTableTopStyle(newTableTopStyle)
            setStockStyle(newStockStyle)
            setPileStyle(newPileStyle)
            setBlindCardStyleInput(newBlindCardStyleInput)
            setHandCardStyleInput(newHandCardStyleInput)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setMyPlayerIx(players.findIndex(player => player.member.member_id === myself.member.member_id))
    }, [players, myself])

    useEffect(() => {
        switch(phase) {
            case 'awaiting_deal':
                setDialog(
                    <DialogContainer label={`Waiting for ${players[currentDealerIx].member.member_id === myself.member.member_id ? "you" : players[currentDealerIx].member.name} to deal.`}>
                        <Deal />
                    </DialogContainer>
                )
                break

            case 'declaring':
                if (players[currentPlayerIx].member.member_id === myself.member.member_id)
                    setDialog(
                        <DialogContainer label="Declare a suit">
                            <Declare options={pile.top_card.declared_suit}/>
                        </DialogContainer>
                    )
                else
                    setDialog(null)
                break

            default:
                setDialog(null)
        }
    }, [phase, players, currentPlayerIx, currentDealerIx, myself, pile])

    useEffect(() => {
        const maxTheta = Math.acos(3/7)
        const marginTheta = Math.PI / 6
        const handTheta = Math.PI - marginTheta
        const nCards = myself.hand?.length || 0
        const newDTheta = Math.min(maxTheta, nCards > 0 ? handTheta / nCards : maxTheta)
        setDTheta(newDTheta)
        setFirstTheta(
            nCards % 2 === 0 ?
                (nCards/2 + 0.5) * newDTheta :
                ((nCards-1)/2) * newDTheta
        )
    },[myself])

    return (
        <div
            ref={clientRef}
            className="flex w-full h-full relative"
            style={{
                perspective: '1000px'
            }}
        >

            <div
                className="tableTop absolute"
                style={tableTopStyle}
                />

             {players.map((player, index) => {
                if (index !== myPlayerIx)
                    return <div
                        key={`player-name-${index}`}
                        style={
                            playerStyle(
                                {
                                    modelPlayerViewBase,
                                    playerIx: index,
                                    nPlayers: players.length,
                                    currentPlayerIx,
                                    myPlayerIx,
                                    direction
                        })}
                        className='absolute'
                    >
                        {player.member.name}
                    </div>
                 else
                     return null
            })}

            <div
                style={stockStyle}
                className="absolute"
            >
                <Stock onClick={() => draw()}/>
            </div>

            <div
                style={pileStyle}
                className="absolute"
            >
                <Pile/>
            </div>

            { myself.blind.map((card, cardIndex) => {
                return (
                    <div
                        key={`blind-card-${cardIndex}`}
                        style={blindCardStyle({
                            baseInput: blindCardStyleInput,
                            card: card,
                            cardIndex: cardIndex
                        })}
                        className='absolute'
                        onClick={() => pickUp()}
                    >
                        <Card/>
                    </div>
                )
            })}

            { myself.hand.map((card, cardIndex) => {
                return (
                    <div
                        key={`hand-card-${cardIndex}`}
                        style={handCardStyle({
                            baseInput: handCardStyleInput,
                            cardIndex: cardIndex,
                            nCards: myself.hand.length
                        })}
                        className={`absolute z-${100+cardIndex}`}
                    >
                        <Card
                            idString={card.id_string}
                            showCount={0}
                            onClick={() => {
                                discard(cardIndex, card.id_string)
                            }}
                        />
                    </div>
                )
            })}

            {dialog}

            <Drawer
                imageUrl={`${process.env.PUBLIC_URL}/images/lifering.png`}
                autoOpen={phase === 'gathering'}
                width={clientRef.current ? clientRef.current.clientWidth / 2 : '50px'}
            >
                <Settings/>
            </Drawer>
        </div>
    )
}


