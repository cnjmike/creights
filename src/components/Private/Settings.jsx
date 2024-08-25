import Switch from "react-switch"
import {useGameEngine} from "../../hooks/useGameEngine"

export const Settings = () => {

    const {
        fsaRules,
        shortGame,
        phase,

        configure,
        startRound
    } = useGameEngine()


    return(
        <>
            <div className="flex flex-col w-full h-full bg-deco-grey-green text-deco-gold p-2">
                <h1 className="w-full text-base md:text-2xl mt-10">Game Setup</h1>
                <div className="flex flex-col justify-center w-full">
                    <div className="flex text-base md:text-xl mt-10 w-full justify-center">
                        <label className="ml-4 mr-4">
                            <Switch
                                onChange={() => configure(!fsaRules, shortGame)}
                                disabled={phase !== 'gathering'}
                                checked={fsaRules}
                            />
                        </label>
                        FSA Rules (Nines wild, two 5's per deck)
                    </div>
                    <div className="flex text-base md:text-xl w-full justify-center">
                        <label className="ml-4 mr-4">
                            <Switch onChange={() => configure(fsaRules, !shortGame)} checked={shortGame}/>
                        </label>
                        Short Game (start with 5 cards vs 8)
                    </div>
                </div>
                { phase === 'gathering' &&
                    <button className="mt-8 w-1/3 self-center" onClick={() => startRound()}>Start Game</button> }
            </div>
        </>
    )
}
