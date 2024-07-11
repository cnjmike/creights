import {useGameEngine} from "../../hooks/useGameEngine"
import Pile from "../Pile"
import Stock from "../Stock"
import {useEffect, useState} from "react"

export const PlayingHand = () => {

    const {
        me,
        players,
        currentDealer,
        pile,
        stock,
        phase
    } = useGameEngine()

    const [message, setMessage] = useState("")

    useEffect(() => {
        if (phase === 'awaiting_deal' && currentDealer.member.member_id !== me.member_id)
            setMessage(`Waiting for ${currentDealer.member.name} to deal.`)
    }, [phase, me])

    const deal = () => {
        fetch(`https://creights.integneo.com:3427/game/FSA/member/${me.member_id}/deal`, { method: 'POST' })
    }

    return(
        <>
            <div className="flex items-center justify-center w-full h-full">
                <div className="w-11/12 h-full relative">
                    {phase === 'awaiting_deal' && currentDealer.member.member_id === me.member_id && (
                        <button className="w-1/2" onClick={()=>deal()}>Deal</button>
                    )}
                    <div className='absolute w-full bottom-1 bg-deco-gold text-deco-black'>
                        {message}
                    </div>
                </div>

                <div className="flex w-1/12 h-full justify-center items-center">
                    <div className="flex flex-col">
                    <div className="h-full"><Stock/></div>
                        <div className="h-full"><Pile/></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PlayingHand
