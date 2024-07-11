
import React, {useEffect, useRef, useState} from 'react'
import Chair from '../Chair'
import TableCenter from "../TableCenter"
import {useGameEngine} from "../../hooks/useGameEngine";
import Stock from "../Stock";
import Pile from "../Pile";
import Card from "../Card";

export const Table = () => {

    const {
        players
    } = useGameEngine()

    const parentRef = useRef(null)
    const modelBaseR = 32
    const modelPlayerAtR = 28
    const modelTableR = 24
    const modelBlindAtR = 16
    const modelStockR = 3.5
    const modelPileR = 3.5
    const modelCardH = 7
    const modelCardW = 5

    const [gridTemplate, setGridTemplate] = useState('[1fr 500px 1fr]')
    const [tableR, setTableR] = useState(modelTableR)
    const [playerAtR, setPlayerAtR] = useState(modelPlayerAtR)
    const [blindAtR, setBlindAtR] = useState(modelBlindAtR)
    const [stockR, setStockR] = useState(modelStockR)
    const [pileR, setPileR] = useState(modelPileR)
    const [cardH, setCardH] = useState(modelCardH)
    const [cardW, setCardW] = useState(modelCardW)
    const [anglePerPlayer, setAnglePerPlayer] = useState(Math.PI/4)

    useEffect( () => {

        const handleResize = () => {

            const shortSide = Math.min(window.innerWidth * 0.8, window.innerHeight) - 10
            setGridTemplate(`[1fr minmax(auto, ${shortSide}px) 1fr]`)

            const scaleLength = (r) => {
                return(shortSide * r / (2 * modelBaseR))
            }

            setTableR(scaleLength(modelTableR))
            setPlayerAtR(scaleLength(modelPlayerAtR))
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


    const getTransformString = (polarPosition, rSlopP= 0, thetaSlopRad = 0, rotation = 0) => {

        const { r, theta } = polarPosition
        const txp = r * Math.cos(theta)
        const typ = r * Math.sin(theta)

        const ts = `translateX(calc(-50% + ${txp}px)) translateY(calc(-50% - ${typ}px)) rotate(${rotation}rad)`
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
                {[1, 2, 3, 4, 5, 6, 7, 8].map((player, index) => {
                    return (
                        <div
                            style={{
                                height: '50px',
                                width: '150px',
                                top: '50%',
                                left: '50%',
                                transform: getTransformString({
                                    r: playerAtR,
                                    theta: anglePerPlayer * index
                                    },
                                    0,
                                    0,
                                    Math.PI/2 - anglePerPlayer * index
                                ),
                                borderRadius: '50%'
                            }}
                            className="absolute bg-green-900 border text-white z-10 flex items-center justify-center"
                        >Stamps {index}</div>
                    )
                })}
                <div
                    style={{
                        height: `${cardH}px`,
                        width: `${cardW}px`,
                        transform: getTransformString({
                            r: playerAtR,
                            theta: 2 * anglePerPlayer
                        }),
                        top: '50%',
                        left: '50%'
                    }}
                    className='absolute'>

                </div>

                <div/>
                <div/>
                <div/>
                <div/>
            </div>
        </div>
    )
}
