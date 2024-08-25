import Card from "./Card"
import {useGameEngine} from "../../hooks/useGameEngine"
import {useEffect, useState} from "react";

const Pile = () => {

    const { pile } = useGameEngine()

    const [topCard, setTopCard ] = useState(null)

    useEffect(() => {
        if (pile && pile.n_cards > 0) {
            setTopCard(pile.top_card)
        }
    }, [pile])

    return (
        <div className="w-full h-full bg-deco-grey bg-opacity-20 rounded-md">
            { topCard &&
                <Card
                    idString={topCard.id_string}
                    declaredSuit={topCard.declared_suit}
                    showCount={1}
                /> }
        </div>
    )
}

export default Pile
