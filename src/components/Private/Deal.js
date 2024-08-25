import React, {useEffect} from "react";
import {useGameEngine} from "../../hooks/useGameEngine";
import SnipeLoader from "../SnipeLoader";

const Deal = () => {

    const {
        myself,
        players,
        currentDealerIx,
        deal
    } = useGameEngine()


    return(
        <>
            <div className="flex flex-col items-center justify-center w-full h-full relative">
                <div className="flex w-1/2 h-8">
                    <SnipeLoader/>
                </div>

                <div className="flex w-full items-center justify-center m-2">
                    {players[currentDealerIx].member.member_id === myself.member.member_id && (
                        <button className="w-1/2" onClick={() => deal()}>Deal</button>
                    )}
                </div>
            </div>
        </>
    )
}


export default Deal

