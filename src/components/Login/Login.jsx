import {useEffect, useState} from "react"

import "./Login.css"
import {useGameEngine} from "../../hooks/useGameEngine"
import Member from "./Member"

const Login = () => {

    const {
        members,
        join
    } = useGameEngine()

    const [ gallery, setGallery ] = useState([])

    useEffect(() => {

        async function buildGallery() {

            if(members)
                setGallery(members.map((member) => (
                    <Member
                        key={`gallery-member-${member.member_id}`}
                        member={member}
                        onClick={() => {join(member)}}
                    />
                )))
        }

        buildGallery()
    }, [members])


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


