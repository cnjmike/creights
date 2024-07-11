import {useEffect, useState} from "react"
//import { AspectRatio } from '@tailwindcss/aspect-ratio'
import { cardFaces } from "./cardFaces"

const Card = ({idString}) => {

    let CardFace = null
    let CardBack = cardFaces["1B"]
    if (idString !== undefined)
    {
        CardFace = cardFaces[idString]

        const rank = idString?.slice(0, -1)
        const suit = idString?.slice(-1)
        const cardColor = suit && (suit === 'S' || suit === 'C') ? 'text-black' : 'text-red-500'
    }

    const svgUrl = process.env.PUBLIC_URL + '/images/cardMask.svg'
    const backImage = process.env.PUBLIC_URL + '/images/boys_rot.png'


    return(
        <div style={{
            backgroundImage: `url(${backImage})`,
            WebkitMaskImage: `url(${svgUrl})`,
            maskImage: `url(${svgUrl})`,
            WebkitMaskSize: 'contain',
            maskSize: 'contain'
        }}
             className="aspect-content aspect-w-5 aspect-h-7 bg-no-repeat bg-contain bg-center mask-no-repeat mask-contain border bg-deco-green">
            {idString ?
                <CardFace className="w-full h-full object-cover"/> :
                <CardBack className="w-full h-full object-cover opacity-0" />
            }
        </div>
    )
}


export default Card
