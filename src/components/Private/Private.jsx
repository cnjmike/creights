import {PlacematContainer} from "../PlacematContainer"
import "./Private.css"
import Login from "../Login/Login"
import {useGameEngine} from "../../hooks/useGameEngine"
import {NewPlayView} from "./NewPlayView"
import {useEffect} from "react";


export const Private = () => {

    const {
        myself,
        phase
    } = useGameEngine()

    useEffect(() => {
        myself && (document.title = `${myself.member.name}'s Hand`)
    }, [myself])

    return (
        <div className="w-screen h-[100dvh]">
            { myself ?
                <PlacematContainer label={`${myself.member.name}'s Hand`}>
                    <NewPlayView className="flex w-full"/>
                </PlacematContainer> :
                <Login/>
            }
        </div>
    )
}
