
import { cardFaces } from "./cardFaces"
import {useGameEngine} from "../../../hooks/useGameEngine";
import {useEffect, useState} from "react";

const Card = ({idString, declaredSuit, showCount, onClick}) => {

    const {
        count
    } = useGameEngine()

    let CardFace = null
    let CardBack = cardFaces["1B"]
    if (idString !== undefined)
    {
        CardFace = (declaredSuit && declaredSuit.length === 1) ? cardFaces[`x${declaredSuit}`] : cardFaces[idString]

        const rank = idString?.slice(0, -1)
        const suit = idString?.slice(-1)
        const cardColor = suit && (suit === 'S' || suit === 'C') ? 'text-black' : 'text-red-500'
    }

    const svgUrl = process.env.PUBLIC_URL + '/images/cardMask.svg'
    const backImage = process.env.PUBLIC_URL + '/images/boys_rot.png'

    const [ countDisplay, setCountDisplay ] = useState(null)
    useEffect(() => {
        setCountDisplay(showCount && count ?
            <div className='absolute flex top-1/2 right-1/2 transform translate-x-1/2 -translate-y-1/2 text-center bg-deco-green bg-opacity-80 text-white text-5xl'>{count}</div> :
            null
        )
    }, [count])

    return (
        <div style={{
            backgroundImage: `url(${backImage})`,
            WebkitMaskImage: `url(${svgUrl})`,
            maskImage: `url(${svgUrl})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain'
        }}
             className="relative aspect-content aspect-w-5 aspect-h-7 bg-no-repeat bg-contain bg-center mask-no-repeat mask-contain border bg-deco-green">
             {idString ?
                <CardFace className={`w-full h-full object-cover`} onClick={onClick} /> :
                <>
                    <CardBack className={`w-full h-full object-cover ${showCount ? 'opacity-50' : 'opacity-0'}`} />
                    {countDisplay}
                </>
             }
        </div>
    )
}


export default Card
