import {Call} from "../Call/Call";
import {Game} from "../Game/Game";

export const Room = () => {

    return (
        <div className="h-screen w-screen flex flex-col">
            <div className="w-full h-1/2 flex items-center justify-center">
                <Call />
            </div>
            <div className="w-full h-1/2 flex items-center justify-center">
                <Game />
            </div>
        </div>
    )
}
