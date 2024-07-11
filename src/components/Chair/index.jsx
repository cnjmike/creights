import {useGameEngine} from "../../hooks/useGameEngine"
import {useEffect, useRef, useState} from "react"
import { motion } from "framer-motion"
import { Blind } from "../Blind"

const Chair = ({i}) => {
    const chairRef = useRef(null)

    const { players } = useGameEngine()
    const [ thisPlayer, setThisPlayer ] = useState(null)

    useEffect(() => {

        const u = null
        if (players.length > 0) {
            const iam=[
                [ u, u, 0, u, u,   u, u, u, u, u,  u, u, u, u, u ],
                [ u, u, 0, u, u,   u, u, u, u, u,  u, u, 1, u, u ],
                [ u, 0, u, 1, u,   u, u, u, u, u,  u, u, 2, u, u ],
                [ u, u, 1, u, u,   0, u, u, u, 2,  u, u, 3, u, u ],
                [ u, 1, u, 2, u,   0, u, u, u, 3,  u, u, 4, u, u ],
                [ u, 1, u, 2, u,   0, u, u, u, 3,  u, 5, u, 4, u ],
                [ u, 1, 2, 3, u,   0, u, u, u, 4,  u, 6, u, 5, u ],
                [ u, 1, 2, 3, u,   0, u, u, u, 4,  u, 7, 6, 5, u ]
            ][players.length-1][i]
            if (iam !== null) {
                const rect = chairRef.current.getBoundingClientRect()
                const centerX = window.scrollX + rect.left + rect.width / 2
                const centerY = window.scrollY + rect.top + rect.height / 2
                players[iam].centerPoint = { x: centerX, y: centerY }

                setThisPlayer(players[iam])
            }
            else
                setThisPlayer(null)
        }
    }, [i, players])

    const posClasses =
        i >= 0 && i <= 4 ? "top-5 left-0 items-start" :
        i >= 10 ? "bottom-5 right-0 items-end" :
        i === 5 ? "top-0 left-5" :
        i === 9 ? "top-0 right-5" :
        ""

    const bgColor = thisPlayer ? 'bg-deco-gold' : ''

    return (
        <motion.div layoutId={thisPlayer?.member?.name}>
            <div ref={chairRef}
                 className={`position-relative flex h-full w-full ${posClasses} ${bgColor} bg-opacity-30 justify-center`}>
                <Blind player={thisPlayer} />
                <p className={`transform ${i === 5 ? "-rotate-90" : i === 9 ? "rotate-90" : ""} m-5 text-[1.25vw]`}>
                    {thisPlayer?.member?.name}
                </p>
            </div>
        </motion.div>
    )
}

export default Chair
