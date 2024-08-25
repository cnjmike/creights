import React from "react"
import {useGameEngine} from "../../hooks/useGameEngine"

export const GameStats = () => {

    const {
        myself,
        players,
        currentDealerIx,
        deal
    } = useGameEngine()


    return(
        <>
            <div className="flex flex-col items-center justify-center w-full h-full relative">
                <div className="flex">Waiting for {players[currentDealerIx].member.member_id === myself.member.member_id ? "you" : players[currentDealerIx].member.name} to deal.</div>
                <div className="flex w-full items-center justify-center mt-8">
                    {players[currentDealerIx].member.member_id === myself.member.member_id && (
                    <button className="w-1/2" onClick={() => deal()}>Deal</button>
                )}
                </div>
            </div>
        </>
    )
}

