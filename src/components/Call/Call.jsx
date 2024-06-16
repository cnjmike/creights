import {PlacematContainer} from "../PlacematContainer"
import ZoomMtgEmbedded from '@zoom/meetingsdk/embedded'
import { useRef } from 'react'

export const Call = () => {

    const client = ZoomMtgEmbedded.createClient()
    let meetingSDKElement = useRef(null)

    const KJUR = require('jsrsasign')
    function generateSignature(key, secret, meetingNumber, role) {

        const iat = Math.round(new Date().getTime() / 1000) - 30
        const exp = iat + 60 * 60 * 2
        const oHeader = { alg: 'HS256', typ: 'JWT' }

        const oPayload = {
            sdkKey: key,
            appKey: key,
            mn: meetingNumber,
            role: role,
            iat: iat,
            exp: exp,
            tokenExp: exp
        }

        const sHeader = JSON.stringify(oHeader)
        const sPayload = JSON.stringify(oPayload)
        const sdkJWT = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, secret)
        return sdkJWT
    }

    function startZoom() {
        client.init({
            zoomAppRoot: meetingSDKElement.current,
            language: 'en-US',
            patchJsMedia: true
        }).then(() => {
            client.join({
                sdkKey: '9ZUr3hhQTKmbhsStZbT_XA',
                signature: generateSignature(
                    '9ZUr3hhQTKmbhsStZbT_XA',
                    'f48Pwha90hIn97gVxd8epOnLKbe9BPQn',
                    7725431331,
                    0),
                meetingNumber: 7725431331,
                password: 'rYMlhENbBYREtaFj8Qj8UNXMkEMBnE.1',
                userName: 'fred'
            }).then(() => {
                console.log('joined successfully')
            }).catch((error) => {
                console.log(error.toString())
            })
        }).catch((error) => {
            console.log(error.toString())
        })
    }

    return (
        <PlacematContainer label="Call">
            <button onClick={startZoom}>Join the call</button>
            <div id="meetingSDKElement" ref={meetingSDKElement}/>
        </PlacematContainer>
    )
}
