import React, {useEffect, useState} from "react"
import Card from "./Card"
import {motion} from "framer-motion"

export const Blind = ({player, blindCenterX, blindCenterY, cardH, cardW, pileX, pileY, onClick}) => {

    const [blindCards, setBlindCards ] = useState([])

    const CARD_H_PERCENT = 75
    const CARD_ASPECT = 7/5

    useEffect(() => {

        console.log('pile', pileX, pileY)
        if (player.blind) {

            setBlindCards(
                player.blind.map((card, cardIndex) => {
                    const slopX = card.r * Math.cos(card.theta)
                    const slopY = card.r * Math.sin(card.theta)
                    return (
                        <motion.div
                            key={`${player.member.member_id}-blind-${cardIndex}`}
                            initial={{
                                x: `-${blindCenterX + slopX}px)`,
                                y: `-${blindCenterY + slopY}px)`
                            }}
                            animate={{
                                x: 0,
                                y: 0
                            }}
                            style={{
                                position: 'absolute',
                                height: `${cardH}px`,
                                width: `${cardW}px`,
                                top: `${blindCenterY + slopY}px)`,
                                left: `${blindCenterX + slopX}px)`,
                                transform: `rotate(${card.rotation}rad)`
                            }}
                            className={`z-${cardIndex} flex items-center justify-center`}
                            onClick={onClick}
                        ><Card/>
                        </motion.div>
                    )
                })
            )
        }
    }, [player, blindCenterX, blindCenterY])

    return (
        <div className="flex position-relative">
            {blindCards}
        </div>
    )
}

export default Blind
