import {Table} from "../Table/Table";
import {Status} from "../Status/Status";

export const Game = () => {

    return (
        <div className="h-full w-full flex flex-row">
            <div className="w-4/5 h-full flex items-center justify-center">
                <Table />
            </div>
            <div className="w-1/5 h-full flex items-center justify-center">
                <Status />
            </div>
        </div>
    )
}
