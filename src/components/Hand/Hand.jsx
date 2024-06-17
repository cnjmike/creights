import {PlacematContainer} from "../PlacematContainer"
import "./Hand.css"
import Login from "../Login"
import {useEffect} from "react"
import {useGameEngine} from "../../hooks/useGameEngine"


export const Hand = () => {

    const {memberName} = useGameEngine()

    return (
        <div className="w-screen h-screen">
            { memberName ?
                <PlacematContainer label="Hand" /> :
                <Login />
            }
        </div>

    )
}
