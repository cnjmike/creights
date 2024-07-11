import Stock from "../Stock";
import Pile from "../Pile";

const TableCenter = () => {

    return (
        <div className={`position-relative flex h-full w-full justify-center items-center gap-1`}>
            <div className="h-full"><Stock/></div>
            <div className="h-full"><Pile/></div>
        </div>
    )
}

export default TableCenter
