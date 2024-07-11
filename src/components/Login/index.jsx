import {useEffect, useRef, useState} from "react"

import "./Login.css"
import {useGameEngine} from "../../hooks/useGameEngine"
import Member from "../Member"

const Login = () => {

    const [ loggingInMember, setLoggingInMember ] = useState(null)
    const { members, setMembers, setMe} = useGameEngine()
    const [ gallery, setGallery ] = useState([])

    useEffect(() => {

        async function getMembers() {
            return await fetch('https://creights.integneo.com:3427/members')
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
                    setGallery(members.map((member, index) => (
                        <Member member={member} onClick={() => setLoggingInMember(member)} />
                    )))
                })
                .catch(error => console.error(error))
        }

        getMembers()

    }, [setMembers])

    useEffect(() => {
        if (loggingInMember !== null )
        {
            const joinGame = async (member) => {
                setMe(member)
                await fetch(`https://creights.integneo.com:3427/game/FSA/member/${member.member_id}/join`,
                    {method: 'POST'}
                )
            }
            joinGame(loggingInMember)
        }
    }, [loggingInMember, setMe])


    return (
        <div className="grid grid-cols-4 grid-rows-3 flex h-full w-full place-items-center">
            {gallery.length > 0 ?
                gallery :
                <div>Loading</div>
            }
        </div>
    )
}

export default Login


