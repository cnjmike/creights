import Switch from "react-switch"
import {useGameEngine} from "../../hooks/useGameEngine";
import {useEffect, useState} from "react";
import Member from "../Member";

export const GameConfig = (props) => {

    const {
        players,
        fsaRules, setFsaRules,
        shortGame, setShortGame,
    } = useGameEngine()


    useEffect(() => {
        fetch('https://creights.integneo.com:3427/game/FSA/configure', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               'fsa_rules': fsaRules,
               'short_game': shortGame,
            })
        })
    }, [fsaRules, shortGame])

    const startGame = () => {
        fetch('https://creights.integneo.com:3427/game/FSA/start', {
            method: 'POST'
        })
    }

    return(
        <>
            <div className="flex flex-col w-1/3 h-full">
                <div className="grid grid-cols-2 grid-rows-4 w-full h-full place-items-center">
                    { players.map((player, index) => (
                        <Member member={player.member} />
                    )) }
                </div>
            </div>
            <div className="flex flex-col w-2/3 h-full">
                <h1 className="w-full text-base md:text-2xl mt-10">Game Setup</h1>
                <div className="flex flex-col justify-center w-full">
                    <div className="flex text-base md:text-xl mt-10 w-full justify-center">
                        <label className="ml-4 mr-4">
                            <Switch
                                onChange={() => setFsaRules(!fsaRules)}
                                checked={fsaRules}
                            />
                        </label>
                        FSA Rules (Nines wild, three 5's per deck)
                    </div>
                    <div className="flex text-base md:text-xl w-full justify-center">
                        <label className="ml-4 mr-4">
                            <Switch onChange={() => setShortGame(!shortGame)} checked={shortGame}/>
                        </label>
                        Short Game (start with 5 cards)
                    </div>
                </div>
                <button className="mt-8 w-1/3 self-center" onClick={() => startGame()}>Start Game</button>
            </div>
        </>
    )
}
