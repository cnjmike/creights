
import React, {Component, useEffect} from "react"

import {Public} from '../Public/Public'
import {Private} from '../Private/Private'
import "./App.css"
import {usePrivateAccess} from "../../hooks/usePrivateAccess"

export const App = () => {

    const {
        windowId
    } = usePrivateAccess()

    return  windowId ? <Private /> : <Public />
}

