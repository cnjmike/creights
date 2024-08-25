import React, {useEffect, useState} from "react";
import { cardFaces} from "../Common/Card/cardFaces"
import {useGameEngine} from "../../hooks/useGameEngine";

const Declare = ({options}) => {

    const {
        declareSuit
    } = useGameEngine()

    console.log(options)
    const selectors = ["S", "H", "C", "D"].map((suit) => {
        const SelectorComponent = cardFaces[suit]
        return(
            <div
                style={{
                    opacity: `${options.indexOf(suit) >= 0 ? '100%' : '40%'}`
                }}
                className='m-2'
                onClick={() => {options.indexOf(suit) >= 0 && declareSuit(suit)}}>
                <SelectorComponent/>
            </div>
        )})

    return (
        <div
            style={{
                height: '100%',
                width: '100%'
            }}
            className='absolute flex w-full justify-center items-center gap-4'>
            { selectors }
        </div>
    )
}

export default Declare


