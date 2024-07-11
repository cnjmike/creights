import {useEffect, useRef, useState} from "react"
import Card from "../Card";

export const Blind = ({player}) => {

    const blindRef = useRef()
    const [blindCards, setBlindCards ] = useState([])

    const CARD_H_PERCENT = 75
    const CARD_ASPECT = 7/5

    useEffect(() => {

        const blindAspect = blindRef.current.offsetHeight / blindRef.current.offsetWidth
        if (player?.blind && player.blind.length > 0) {
            const cardMap =
                player.blind.map((card, index) => {
                    const cardCenterX = 50 + 0.5 * (card.r - CARD_H_PERCENT) * Math.cos(card.theta)
                    const cardCenterY = 50 + 0.5 * (card.r - (CARD_H_PERCENT / blindAspect)) * Math.sin(card.theta)
                    const topPercent = cardCenterX - CARD_H_PERCENT / 2
                    const leftPercent = cardCenterY - (CARD_H_PERCENT / CARD_ASPECT) / 2
                    const className = `flex absolute  w-[${CARD_H_PERCENT/CARD_ASPECT}%] h-[${CARD_H_PERCENT}%] top-[${topPercent}%] left-[${leftPercent}%] rotate-[${card.rot}] z-[${index}]`
                    return (
                        <div className={className}>
                            <Card idString={card.idString} />
                        </div>
                    )
                })

            setBlindCards(cardMap)
        }
    }, [player])

    return (
        <div ref={blindRef} className="flex position-relative">
            {blindCards}
        </div>
    )
}

export default Blind
