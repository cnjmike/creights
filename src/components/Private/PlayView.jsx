import React, {useEffect, useRef, useState} from "react"
import {useGameEngine} from "../../hooks/useGameEngine"
import "./privateLayout"
import Pile from "../Common/Pile"
import Stock from "../Common/Stock"
import Card from "../Common/Card"
import Blind from "../Common/Blind"
import Hand from "../Common/Hand.xjsx"
import Deal from "./Deal";
import DialogContainer from "../DialogContainer"
import Declare from "./Declare"
import Drawer from "../Drawer"
import {Settings} from "./Settings";

export const PlayView = () => {

    const {
        myself,
        currentPlayerIx,
        currentDealerIx,
        players,
        phase,
        pile,
        direction,

        pickUp,
        declareSuit,
        draw
    } = useGameEngine()

    const [message, setMessage] = useState("")
    const [dialog, setDialog] = useState(null)
    const [playerStatus, setPlayerStatus] = useState(null)

    const [tableCardH, setTableCardH] = useState(null)
    const [tableCardW, setTableCardW] = useState(null)
    const [blindCenterX, setBlindCenterX] = useState(null)
    const [blindCenterY, setBlindCenterY] = useState(null)
    const [blindDivs, setBlindDivs ] = useState([])
    const [stockTop, setStockTop] = useState(0)
    const [stockLeft, setStockLeft] = useState(0)
    const [pileTop, setPileTop] = useState(0)
    const [pileLeft, setPileLeft] = useState(0)

    const [handCardH, setHandCardH] = useState(null)
    const [handCardW, setHandCardW] = useState(null)
    const [thumbX, setThumbX] = useState(0)
    const [thumbY, setThumbY] = useState(0)
    const [dTheta, setDTheta] = useState(0)
    const [firstTheta, setFirstTheta] = useState(0)

    const cardRef = useRef(null)
    const compRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            const newTableCardW = compRef.current.clientWidth / 12
            setTableCardW(newTableCardW)
            const newTableCardH = newTableCardW * 7 / 5
            setTableCardH(newTableCardH)

            const newHandCardH = compRef.current.clientHeight * 0.5
            const newHandCardW = newHandCardH * 5 / 7
            setHandCardW(newHandCardW)
            setHandCardH(newHandCardH)

            setBlindCenterX(compRef.current.clientWidth * 5 / 6)
            setBlindCenterY(compRef.current.clientHeight * 5 / 6)

            setStockTop(3)
            const newStockLeft = compRef.current.clientWidth - newTableCardW - 3
            setStockLeft(newStockLeft)

            setPileTop(3 + newTableCardH + 8)
            setPileLeft(newStockLeft)

            setThumbY(newHandCardH + (compRef.current.clientHeight - newHandCardH)/2)
            setThumbX(compRef.current.clientWidth * 0.45)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() =>{
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

    useEffect(() => {

        let newPlayerStatus = [
            <div
                style={{
                    width: compRef.current.clientWidth / 12
                }}
                className="flex text-3xl text-center text-white p-2 font-vga">
                { direction > 0 ? "\u0001\u001A" : "\u001B\u0001"}
            </div>
        ]
        let myIndex = players.findIndex(player => player.member.member_id === myself.member.member_id)
        if (myIndex >= 0) {
            let playerIndex = myIndex
            while (newPlayerStatus.length <= players.length) {
                newPlayerStatus.push(
                    <div
                        key={`player-${playerIndex}`}
                        style={{
                            width: compRef.current.clientWidth / 12
                        }}
                        className={`flex text-center text-xl ${currentPlayerIx === playerIndex ? 'text-deco-gold' : 'text-white'}`}
                    >
                        {players[playerIndex].member.name}
                    </div>
                )
                playerIndex = (playerIndex + 1) % players.length
            }
            newPlayerStatus =
                <div className='flex h-1 items-start items-baseline'>
                    {newPlayerStatus}
                </div>
            setPlayerStatus(newPlayerStatus)
        }

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
    }, [phase, players, myself, currentPlayerIx])


    return (
        <>
            <div ref={compRef} className="flex w-full h-full relative">

                { playerStatus }

                <div
                    style={{
                        top: `${stockTop}px`,
                        left: `${stockLeft}px`,
                        height: `${tableCardH}px`,
                        width: `${tableCardW}px`
                    }}
                    className="absolute"
                >
                    <Stock onClick={()=>draw()}/>
                </div>

                <div
                    style={{
                        top: `${pileTop}px`,
                        left: `${pileLeft}px`,
                        height: `${tableCardH}px`,
                        width: `${tableCardW}px`
                    }}
                    className="absolute"
                >
                    <Pile/>
                </div>

                <Blind
                    player={myself}
                    blindCenterX={blindCenterX}
                    blindCenterY={blindCenterY}
                    cardH={tableCardH}
                    cardW={tableCardW}
                    onClick={() => {pickUp()}} />

                <Hand
                    player={myself}
                    myHand={true}
                    thumbX={thumbX}
                    thumbY={thumbY}
                    cardW={handCardW}
                    cardH={handCardH}
                    rotate={0}
                    />
            </div>

            {dialog}

            {message &&
                <div className='absolute w-full bottom-1 bg-deco-gold text-deco-black z-50'>
                    {message}
                </div>
            }

            <Drawer
                imageUrl={`${process.env.PUBLIC_URL}/images/lifering.png`}
                autoOpen={ phase === 'gathering'}
                width={compRef.current ? compRef.current.clientWidth / 2 : '50px'}
            >
                <Settings />
            </Drawer>
        </>
    )
}

export default PlayView
