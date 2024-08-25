import Card from "./Card"
import {useGameEngine} from "../../hooks/useGameEngine"

const Stock = () => {

    const {
        count,
        draw
    } = useGameEngine()

    return(
        <div className="h-full w-full" onClick={()=>{draw()}}>
            <Card showCount={count} />
        </div>
    )
}


export default Stock
