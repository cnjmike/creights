
import {NewTable} from "./NewTable"
import {Status} from "./Status"



export const Public = () => {

    return (
        <div className="h-screen w-screen flex">
            <div className="w-full h-full flex flex-row items-center justify-center">
                <div className="w-4/5 h-full flex items-center justify-center">
                    <NewTable/>
                </div>
                <div className="w-1/5 h-full flex items-center justify-center">
                    <Status/>
                </div>
            </div>
        </div>
    )
}
