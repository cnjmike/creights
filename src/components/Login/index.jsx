import {useEffect, useState} from "react";

const Login = () => {

    const [myIp, setMyIp] = useState("")
    const gameServer = ''

    useEffect( () => {

        async function getIp() {

            await fetch(`https://creights.integneo.com:3427/ip`, {
                    method: 'GET'
                })
                .then(res => {console.log(res); return res.json()})
                .then(data => {
                    console.log(data)
                    setMyIp(data)
                })
                .catch(error => {
                    console.log(error.message)
                })
        }

        getIp()
    }, [])

    return <>
        hi {Object.keys(myIp).length}
        <div>

            {Object.keys(myIp).map((key) => (
                <div key={key}>
                    {key}: {myIp[key]}
                </div>
            ))}
        </div>
    </>
}

export default Login
