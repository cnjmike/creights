
import React, { Component } from "react";

import {Room} from '../Room/Room'
import {Hand} from '../Hand/Hand'
import { useSearchParams} from "react-router-dom";
import "./App.css"


export const App = () => {

    const [ params, _setParams ] = useSearchParams()
    console.log(params.toString())
    const isHand = params.get('hand')

    return  isHand ? <Hand /> : <Room />
}

