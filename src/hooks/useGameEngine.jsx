import React, {createContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'

const GameEngineContext = createContext({})

export const GameEngineProvider = ({ children }) => {

    const [rules, setRules] = useState('FSA')
    const [firstHandSize, setFirstHandSize] = useState(8)
    const [players, setPlayers] = useState([])
    const [memberName, setMemberName] = useState(Cookies.get('member-name'))

    const [ phase, setPhase] = useState('gathering') // waiting_deal, in_play, round_over, game_over
    const [ currentHandSize, setCurrentHandSize] = useState(0)
    const [ currentDealer, setCurrentDealer] = useState(null)
    const [ currentPlayer, setCurrentPlayer] = useState(null)
    const [ direction, setDirection] = useState(1)
    const [ stock, setStock ] = useState([])
    const [ pile, setPile ] = useState([])

    const gameState = {
        rules,
        firstHandSize,
        players,
        memberName,
        phase,
        currentHandSize,
        currentDealer,
        direction,
        stock,
        pile
    }

    // game behaviors
    useEffect(() => {
        // start Game here
    }, [])


    return(
        <GameEngineContext.Provider value={{...gameState}}>
            {children}
        </GameEngineContext.Provider>
    )
}

export const useGameEngine = () => {
    const context = React.useContext(GameEngineContext)
    if (context === undefined) {
        throw new Error('useGameEngine must be used within the context')
    }
    return context
}
