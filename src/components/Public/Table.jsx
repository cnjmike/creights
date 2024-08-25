
import React, {useEffect, useRef, useState} from 'react'
import {useGameEngine} from "../../hooks/useGameEngine"
import Stock from "../Common/Stock"
import Pile from "../Common/Pile"
import Blind from "../Common/Blind"
import Hand from "../Common/Hand.xjsx";

export const Table = () => {

    const {
        players,
        currentPlayerIx
    } = useGameEngine()

    const parentRef = useRef(null)
    const modelBaseR = 32
    const modelPlayerAtR = 26
    const modelHandAtR = 25
    const modelTableR = 24
    const modelPlayerNameAtR = 22
    const modelBlindAtR = 16
    const modelStockR = 3.5
    const modelPileR = 3.5
    const modelCardH = 7
    const modelCardW = 5

    const [gridTemplate, setGridTemplate] = useState('[1fr 500px 1fr]')
    const [tableR, setTableR] = useState(modelTableR)
    const [playerAtR, setPlayerAtR] = useState(modelPlayerAtR)
    const [handAtR, setHandAtR] = useState(modelHandAtR)
    const [playerNameAtR, setPlayerNameAtR] = useState(modelPlayerNameAtR)
    const [blindAtR, setBlindAtR] = useState(modelBlindAtR)
    const [stockR, setStockR] = useState(modelStockR)
    const [pileR, setPileR] = useState(modelPileR)
    const [cardH, setCardH] = useState(modelCardH)
    const [cardW, setCardW] = useState(modelCardW)
    const [anglePerPlayer, setAnglePerPlayer] = useState(Math.PI/4)
    const [playerColors, setPlayerColors] = useState([])

    useEffect( () => {

        const handleResize = () => {

            const shortSide = Math.min(window.innerWidth * 0.8, window.innerHeight) - 10
            setGridTemplate(`[1fr minmax(auto, ${shortSide}px) 1fr]`)

            const scaleLength = (r) => {
                return(shortSide * r / (2 * modelBaseR))
            }

            setTableR(scaleLength(modelTableR))
            setPlayerAtR(scaleLength(modelPlayerAtR))
            setHandAtR(scaleLength(handAtR))
            setPlayerNameAtR(scaleLength(modelPlayerNameAtR))
            setBlindAtR(scaleLength(modelBlindAtR))
            setStockR(scaleLength(modelStockR))
            setPileR(scaleLength(modelPileR))
            setCardW(scaleLength(modelCardW))
            setCardH(scaleLength(modelCardH))
        }


        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)

    }, [])

    useEffect(() => {
        setAnglePerPlayer(players.length > 0 ? 2 * Math.PI / players.length : Math.PI/4)
    }, [players])

    useEffect(() => {
        const colors = new Array(players.length).fill('text-white')
        colors[currentPlayerIx] = 'text-deco-gold text-2xl text-bold underline'
        setPlayerColors(colors)
    }, [players, currentPlayerIx])

    const getTransformString = (polarPosition, rSlopP= 0, thetaSlopRad = 0, rotation = 0) => {

        const { r, theta } = polarPosition
        const txpx = r * Math.cos(theta)
        const typx = r * Math.sin(theta)
        const slopxp = rSlopP * Math.cos(thetaSlopRad)
        const slopyp = rSlopP * Math.sin(thetaSlopRad)

        const ts = `translateX(calc(-50% + ${txpx}px + ${slopxp}%)) translateY(calc(-50% - ${typx}px - ${slopyp}%)) rotate(${rotation}rad)`
        return ts
    }


    return(
        <div ref={parentRef}
             style={{
                 display: 'grid',
                 gridTemplateColumns: gridTemplate,
                 gridTemplateRows: gridTemplate,
             }}
             className="border-4 border-red-900"
        >

            <div/>
            <div/>
            <div/>
            <div/>

            <div className="relative border">
                <div
                    style={{
                        height: `${2*tableR}px`,
                        width: `${2*tableR}px`,
                        transform: 'translateX(-50%) translateY(-50%)',
                        top: '50%',
                        left: '50%',
                        borderRadius: '50%'
                    }}
                    className={`absolute bg-deco-green`}/>
                <div
                    style={{
                        height: `${cardH}px`,
                        width: `${cardW}px`,
                        transform: getTransformString({r: stockR, theta: Math.PI}),
                        top: '50%',
                        left: '50%'
                    }}
                    className='absolute'>
                    <Stock/>
                </div>
                <div
                    style={{
                        height: `${cardH}px`,
                        width: `${cardW}px`,
                        transform: getTransformString({r: pileR, theta: 0 }),
                        top: '50%',
                        left: '50%'
                    }}
                    className='absolute'>
                    <Pile/>
                </div>
                {players.map((player, playerIndex) => {
                    return (
                        <>
                            <div
                                style={{
                                    height: '50px',
                                    width: '150px',
                                    top: `calc(50% + ${playerNameAtR * Math.sin(anglePerPlayer * playerIndex) - 25}px)`,
                                    left: `calc(50% + ${playerNameAtR * Math.cos(anglePerPlayer * playerIndex) - 75}px)`,
                                    transform: `rotate(calc(${Math.PI/2 + anglePerPlayer * playerIndex}rad)`
                                }}
                                className={`absolute flex items-center justify-center ${playerColors[playerIndex]}`}
                            >{player.member.name}</div>

                            <Blind
                                player={player}
                                cardH={cardH}
                                cardW={cardW}
                                blindCenterX={blindAtR * Math.cos(anglePerPlayer * playerIndex)}
                                blindCenterY={blindAtR * Math.sin(anglePerPlayer * playerIndex)}
                                pileX={-pileR}
                                pileY={0}
                                onClick={null}
                            />

                           <Hand
                                player={player}
                                rotationOffset={anglePerPlayer * playerIndex + Math.PI / 4}
                                myHand={false}
                                thumbX={handAtR * Math.cos(anglePerPlayer * playerIndex)}
                                thumbY={handAtR * Math.sin(anglePerPlayer * playerIndex)}
                                cardW={cardW * 0.8}
                                cardH={cardH * 0.8}
                            />

                        </>
                    )
                })}

                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}
