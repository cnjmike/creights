import {Table} from "../Table/Table";
import {Status} from "../Status/Status";

export const Game = () => {

    return (
        <div className="h-full w-full flex flex-row">
            <div className="w-2/3 h-full flex items-center justify-center">
                <Table />
            </div>
            <div className="w-1/3 h-full flex items-center justify-center">
                <Status />
            </div>
        </div>
    )
}
