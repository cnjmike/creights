import {PlacematContainer} from "../PlacematContainer"
import "./Hand.css"
import Login from "../Login"
import {useGameEngine} from "../../hooks/useGameEngine"
import {useEffect} from "react";
import {GameConfig} from "../GameConfig/GameConfig"
import {PlayingHand} from "../PlayingHand"


export const Hand = () => {

    const {
        me,
        phase
    } = useGameEngine()

    useEffect(() => {

    }, [])

    return (
        <div className="w-screen h-[100dvh]">
            <PlacematContainer label={me ? `${me.name}'s Hand`: ""}>
                {
                    me? (
                        (() => {
                            switch(phase) {
                                case 'gathering':
                                    return <GameConfig className="w-full"/>

                                default:
                                    return <PlayingHand className="w-full" />
                            }
                        })()) : <Login />

                }
            </PlacematContainer>
        </div>
    )
}
