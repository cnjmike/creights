import {PlacematContainer} from "../PlacematContainer";
import QRCode from "react-qr-code";
import {Call} from "../Call/Call";
import {Game} from "../Game/Game";

export const Status = () => {

    return (
        <PlacematContainer label="Status">
            <div className="w-full h-full flex flex-col">
                <div className="w-full h-2/3 flex items-center justify-center">

                </div>
                <div className="w-full h-1/3 flex items-center justify-center p-8">
                    <QRCode size={128} value="https://pro:3000?hand=1"/>
                </div>
            </div>
        </PlacematContainer>
    )
}
