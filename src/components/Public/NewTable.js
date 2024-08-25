import {useGameEngine} from "../../hooks/useGameEngine"
import {useEffect, useLayoutEffect, useRef, useState} from "react"
import {playerBlindCardStyle, playerNameStyle, playerHandCardStyle, rescalePublicView} from "../../util/publicLayout"
import Stock from "../Common/Stock"
import Pile from "../Common/Pile"
import Card from "../Common/Card"

export const NewTable = () => {

    const {
        players,
        currentPlayerIx
    } = useGameEngine()

    const viewRef = useRef(null)

    const [tableStyle, setTableStyle] = useState({})
    const [stockStyle, setStockStyle] = useState({})
    const [pileStyle, setPileStyle] = useState({})
    const [playerAngle, setPlayerAngle] = useState(Math.PI/2)
    const [playerNameStyleInput, setPlayerNameStyleInput] = useState({})
    const [playerBlindCardStyleInput, setPlayerBlindCardStyleInput] = useState({})
    const [playerHandCardStyleInput, setPlayerHandCardStyleInput] = useState({})

    useLayoutEffect(() => {

        const handleResize = () => {

            const {
                newTableStyle,
                newStockStyle,
                newPileStyle,
                newPlayerNameStyleInput,
                newPlayerBlindCardStyleInput,
                newPlayerHandCardStyleInput
            } = rescalePublicView(viewRef.current)

            setTableStyle(newTableStyle)
            setStockStyle(newStockStyle)
            setPileStyle(newPileStyle)
            setPlayerNameStyleInput(newPlayerNameStyleInput)
            setPlayerBlindCardStyleInput(newPlayerBlindCardStyleInput)
            setPlayerHandCardStyleInput(newPlayerHandCardStyleInput)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setPlayerAngle(players.length > 0 ? 2 * Math.PI / players.length : Math.PI/4)
    }, [players])

    const playerClassName = ({playerIndex, currentPlayerIx}) => {
        return (
            (playerIndex === currentPlayerIx) ?
                'text-center text-deco-gold text-2xl text-bold underline' :
                'text-center text-deco-green'
        )
    }

    return(
            <div
                ref={viewRef}
                className="relative border-2 border-red-900 w-full h-full">

                {/* table */}
                <div style={tableStyle} className='bg-deco-green' />

                {/* stock */}
                <div style={stockStyle}>
                    <Stock/>
                </div>

                {/* pile */}
                <div style={pileStyle}>
                    <Pile/>
                </div>

                {/* players */}
                { players.map((player, playerIndex) => {
                    return(
                        <>

                            {/* name */}
                            <div
                                key={`player-${playerIndex}-name`}
                                style={playerNameStyle({
                                    baseInput: playerNameStyleInput,
                                    anglePerPlayer: playerAngle,
                                    playerIx: playerIndex})}
                                className={playerClassName({playerIndex, currentPlayerIx})}
                            >
                                {player.member.name}
                            </div>

                            {/* blind */}
                            { player.blind.map((card, cardIndex) => {
                                return (
                                    <div
                                        key={`player-${playerIndex}-blind-card-${cardIndex}`}
                                        style={playerBlindCardStyle({
                                            baseInput: playerBlindCardStyleInput,
                                            anglePerPlayer: playerAngle,
                                            playerIx: playerIndex,
                                            card: card,
                                            cardIndex: cardIndex
                                        })}
                                    >
                                        <Card/>
                                    </div>
                                )
                            })}

                            {/* hand */}
                            { player.hand.map((card, cardIndex) => {
                                return (
                                    <div
                                        key={`player-${playerIndex}-hand-card-${cardIndex}`}
                                        style={playerHandCardStyle({
                                            baseInput: playerHandCardStyleInput,
                                            anglePerPlayer: playerAngle,
                                            playerIx: playerIndex,
                                            cardIndex: cardIndex,
                                            nCards: player.hand.length
                                        })}
                                    >
                                        <Card/>
                                    </div>
                                )
                            })}
                        </>
                    )
                })}
            </div>
    )
}



