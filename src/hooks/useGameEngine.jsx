import React, {createContext, useEffect, useState} from 'react'
import Cookies from 'js-cookie'
import {findRenderedDOMComponentWithTag} from "react-dom/test-utils";

const GameEngineContext = createContext({})

export const GameEngineProvider = ({ children }) => {

    const [members, setMembers] = useState([])
    const [players, setPlayers] = useState([])
    const [me, setMe] = useState(null)
    const [fsaRules, setFsaRules] = useState(true)
    const [shortGame, setShortGame] = useState(false)

    const [ phase, setPhase] = useState('gathering')
    const [ currentHandSize, setCurrentHandSize] = useState(0)
    const [ currentDealer, setCurrentDealer] = useState(null)

    const [ currentPlayer, setCurrentPlayer] = useState(null)
    const [ direction, setDirection] = useState(1)
    const [ stock, setStock ] = useState([])
    const [ pile, setPile ] = useState([])
    const [ count, setCount ] = useState(0)

    const gameState = {
        members, setMembers,
        players, setPlayers,
        me, setMe,
        fsaRules, setFsaRules,
        shortGame, setShortGame,

        phase, setPhase,
        currentHandSize, setCurrentHandSize,
        currentDealer, setCurrentDealer,

        currentPlayer, setCurrentPlayer,
        direction, setDirection,
        stock, setStock,
        pile, setPile,
        count, setCount
    }

    useEffect(() => {
        const eventSource = new EventSource(
            'https://creights.integneo.com:3427/events/game/FSA')

        eventSource.onmessage = (event) => {

            let message = event.data
            if (message.startsWith('b')) {
                message = message.slice(2,-1)
            }
            message = JSON.parse(message)
            if (message) {
                const mType = message.type
                const data = message.data

                console.log(mType)
                console.log(data)
                switch(mType) {
                    case 'player_joins':
                        setPlayers(data['players'])
                        break

                    case 'configure':
                        setFsaRules(data['fsa_rules'])
                        setShortGame(data['short_game'])
                        break

                    case 'new_round':
                        setCurrentDealer(data['current_dealer'])
                        setCurrentPlayer(data['current_player'])
                        setStock(data['stock'])
                        setPile(data['pile'])
                        setDirection(data['direction'])
                        setCount(data['count'])
                        setPhase(data['phase'])
                        setCurrentHandSize(data['current_hand_size'])
                        break

                    case 'card_dealt':
                        // animate from data['dealer'] to
                        // receiving player
                        setPlayers(data['players'])
                        setStock(data['stock'])
                }
            }
        }

        eventSource.onopen = (event) => {
            console.log('Connection to SSE opened successfully', event)
        }

        eventSource.onerror = (event) => {
            console.error('SSE connection error', event);
            if (event.readyState === EventSource.CLOSED) {
                console.log('Connection to SSE closed')
            }
        }

        return () => {
            eventSource.close()
        }
    }, [])

    // game behaviors
    useEffect(() => {
        const gameInfo = fetch('https://creights.integneo.com:3427/game/FSA')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setPhase(data['phase'])
                setMembers(data['members'])
                setPlayers(data['players'])
                setStock(data['stock'])
                setPile(data['pile'])
                setCurrentDealer(data['current_dealer'])
            })
    }, [me])

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
