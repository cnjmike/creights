import React, {createContext, useEffect, useRef, useState} from 'react'
import Cookies from "js-cookie"
import {usePrivateAccess} from "./usePrivateAccess";
import {lockWakeState} from "../wakelock";

const GameEngineContext = createContext({})

export const GameEngineProvider = ({ children }) => {

    const {
        windowId,
        storedMemberId,
        storedMemberCode
    } = usePrivateAccess()

    // ------- GetMembers -------

    const [members, setMembers] = useState([])

    const getMembers = async() => {
        return fetch('https://creights.integneo.com:3427/members')
            .then(response => response.json())
            .then(members => {
                let centerPair
                if (members[0]?.location === members[1].location) {
                    centerPair = members.splice(0, 2)
                } else {
                    centerPair = members.splice(0, 1)
                    centerPair.push({
                        name: 'Guest',
                        image: 'guest.png',
                        location: null,
                        player: null
                    })
                }
                members.splice(5, 0, ...centerPair)
                setMembers(members)
            })
    }

    // ------- join ---------

    const [myself, setMyself] = useState(null)
    const [players, setPlayers] = useState([])


    const join = async (member) => {
        return fetch(`https://creights.integneo.com:3427/join`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                member_id: member.member_id,
                code: null
            })
        })
            .then(response => response.json())
            .then(data => {
                Cookies.set(`${windowId}-memberId`, member.member_id)
                Cookies.set(`${windowId}-memberCode`, data['myself']['code'])
                setMyself(data['myself'])
            })
    }

    const joined = (data) => {
        setPlayers(data['players'])
    }

    // -------- configure ------

    const [fsaRules, setFsaRules] = useState(true)
    const [shortGame, setShortGame] = useState(false)

    const configure = (fsaRules, shortGame) => {
        return fetch(
            'https://creights.integneo.com:3427/configure',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    'fsa_rules': fsaRules,
                    'short_game': shortGame,
                })
            })
    }

    const configured = (data) => {
        setFsaRules(data['fsa_rules'])
        setShortGame(data['short_game'])
    }

    // --------- startRound ----------

    const [ phase, setPhase] = useState('gathering')
    const [ currentHandSize, setCurrentHandSize] = useState(0)
    const [ currentDealerIx, setCurrentDealerIx] = useState(null)
    const [ currentPlayerIx, setCurrentPlayerIx] = useState(null)
    const [ direction, setDirection] = useState(1)
    const [ stock, setStock ] = useState([])
    const [ pile, setPile ] = useState([])
    const [ count, setCount ] = useState(0)

    const startRound = () => {
        return fetch(
            'https://creights.integneo.com:3427/start_round',
            { method: 'POST'})
    }

    const roundStarted = (data) => {
        setCurrentDealerIx(data['current_dealer_ix'])
        setCurrentPlayerIx(data['current_player_ix'])
        setStock(data['stock'])
        setPile(data['pile'])
        setDirection(data['direction'])
        setCount(data['count'])
        setPhase(data['phase'])
        setCurrentHandSize(data['current_hand_size'])
    }

    //---------- deal -------

    const deal = () => {
        return fetch(
            `https://creights.integneo.com:3427/deal`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id
                })
            })
    }

    const phaseChanged = (data) => {
        setPhase(data['phase'])
    }

    const cardDealt = (data) => {
        setPlayers(data['players'])
        setStock(data['stock'])
    }

    const cardTurnedUp = (data) => {
        setStock(data['stock'])
        setPile(data['pile'])
    }

    //--------- pickUp -----------

    const pickUp = () => {
        return fetch(
            `https://creights.integneo.com:3427/pick_up`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id
                })
            })
    }

    const pickedUp = (data) => {
        setPlayers(data['players'])
    }

    //-------- consider ----------

    const consider = (cardIndex, cardKey) => {
        return fetch(
            'https://creights.integneo.com:3427/consider',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id,
                    card_index: cardIndex,
                    card_key: cardKey
                })
            }
        )
    }

    const considered = (data) => {
        setPlayers(data['players'])
    }


    //-------- reorder ----------

    const reorder = (cardIndex, cardKey, newIndex) => {
        return fetch(
            'https://creights.integneo.com:3427/reorder',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id,
                    card_index: cardIndex,
                    card_key: cardKey,
                    new_index: newIndex
                })
            }
        )
    }

    const reordered = (data) => {
        setPlayers(data['players'])
    }

    // ---------- discard -----------

    const discard = (cardIndex, cardIdString) => {
        console.log('cardIndex', cardIndex)
        console.log('type cardIndex', typeof(cardIndex))
        return fetch(
            'https://creights.integneo.com:3427/discard',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id,
                    card_index: cardIndex,
                    card_id_string: cardIdString
                })
            }
        )
    }

    const discarded = (data) => {
        setPlayers(data['players'])
        setPile(data['pile'])
    }

    const discardApplied = (data) => {
        data['players'] && setPlayers(data['players'])
        data['pile'] && setPile(data['pile'])
        data['stock'] && setStock(data['stock'])
        data['phase'] && setPhase(data['phase'])
        data['count'] && setCount(data['count'])
        data['direction'] && setDirection(data['direction'])
    }

    // ------- draw -----------

    const draw = () => {
        return fetch(
            `https://creights.integneo.com:3427/draw`,
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id
                })
            })
    }

    const shuffled = (data) => {
        setPlayers(data['players'])
        setPile(data['pile'])
        setStock(data['stock'])
    }

    const drawn = (data) => {
        setPlayers(data['players'])
        setStock(data['stock'])
        setCount(data['count'])
    }

    const countCancelled = (data) => {
        setCount(data['count'])
    }

    // ------- declareSuit -------

    const declareSuit = (suit) => {
        return fetch(
            'https://creights.integneo.com:3427/declare',
            {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    member_id: myself.member.member_id,
                    suit: suit
                })
            }
        )
    }

    const suitDeclared = (data) => {
        setPile(data['pile'])
        setPhase(data['phase'])
    }

    //  ---- playerAdvanced -----

    const playerAdvanced = (data) => {
        setCurrentPlayerIx(data['current_player_ix'])
    }

    // -------- leave ---------
    const leave = () => {
        // tbd
    }

    const gameState = {
        members,
        players,
        myself,
        fsaRules,
        shortGame,
        phase,
        currentHandSize,
        currentDealerIx,
        currentPlayerIx,
        direction,
        stock,
        pile,
        count,

        getMembers,
        join,
        configure,
        startRound,
        deal,
        pickUp,
        discard,
        draw,
        declareSuit,
        leave
    }

    const [ handStreaming, setHandStreaming ] = useState(false)
    const handEventSourceRef = useRef(null)


    useEffect(() => {

        getMembers()

        fetch('https://creights.integneo.com:3427/game')
            .then(response => response.json())
            .then(data => {
                setPhase(data['phase'])
                setMembers(data['members'])
                setPlayers(data['players'])
                setStock(data['stock'])
                setPile(data['pile'])
                setCurrentDealerIx(data['current_dealer_ix'])
                setCurrentPlayerIx(data['current_player_ix'])
                setDirection(data['direction'])
                setCount(data['count'])
                setFsaRules(data['fsa_rules'])
                setCurrentHandSize(data['current_hand_size'])

                if (storedMemberId  && storedMemberCode) {
                    fetch('https://creights.integneo.com:3427/hand',
                        {
                            method: 'POST',
                            headers: {'Content-Type': 'application/json'},
                            body: JSON.stringify({
                                member_id: storedMemberId,
                                player_code: storedMemberCode
                            })
                        })
                        .then(response => response.json())
                        .then(data => {
                            setMyself(data['myself'])
                            //return lockWakeState()
                        })
                        .catch(err => { console.log(err)})
                }
            })

        const tableEventSource = new EventSource(
            'https://creights.integneo.com:3427/game/FSA/table_stream')

        tableEventSource.onmessage = (event) => {

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
                    case 'joined': joined(data); break
                    case 'configured': configured(data); break
                    case 'roundStarted': roundStarted(data); break
                    case 'phaseChanged': phaseChanged(data); break
                    case 'cardDealt': cardDealt(data); break
                    case 'cardTurnedUp': cardTurnedUp(data); break
                    case 'pickedUp': pickedUp(data); break
                    case 'drawn': drawn(data); break
                    case 'discarded': discarded(data); break
                    case 'discardApplied': discardApplied(data); break
                    case 'suitDeclared': suitDeclared(data); break
                    case 'countCancelled': countCancelled(data); break
                    case 'playerAdvanced': playerAdvanced(data); break
                }
            }
        }

        tableEventSource.onopen = (event) => {
            console.log('Connection to table SSE opened successfully', event)
        }

        tableEventSource.onerror = (event) => {
            console.error('Table SSE connection error', event);
            if (event.readyState === EventSource.CLOSED) {
                console.log('Connection to table SSE closed')
            }
        }

        return () => {
            tableEventSource.close()
            if (handEventSourceRef.current)
                handEventSourceRef.current.close()
        }
    }, [])

    // game behaviors
    useEffect(() => {

        if (myself && !handStreaming) {

            handEventSourceRef.current = new EventSource(
                `https://creights.integneo.com:3427/game/FSA/hand_stream/${myself.member.member_id}/x`)

            handEventSourceRef.current.onmessage = (event) => {

                let message = event.data
                if (message.startsWith('b')) {
                    message = message.slice(2, -1)
                }
                message = JSON.parse(message)
                if (message) {
                    const mType = message.type
                    const data = message.data

                    if (data['myself'])
                        setMyself(data['myself'])
                }
            }

            handEventSourceRef.current.onopen = (event) => {
                console.log('Connection to hand SSE opened successfully', event)
            }

            handEventSourceRef.current.onerror = (event) => {
                console.error('Private SSE connection error', event);
                if (event.readyState === EventSource.CLOSED) {
                    console.log('Connection to hand SSE closed')
                }
            }

            setHandStreaming(true)
        }
    }, [myself])

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
