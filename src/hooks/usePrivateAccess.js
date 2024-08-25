import React, {createContext} from "react"
import {useSearchParams} from "react-router-dom"
import Cookies from "js-cookie"



export const PrivateAccessContext = createContext(null)

export const PrivateAccessProvider = ({children}) => {
    const [ params, _setParams ] = useSearchParams()
    const windowId = params.get('window')
    let storedMemberId
    let storedMemberCode
    if (windowId)
    {
        const storedMemberIdStr = Cookies.get(`${windowId}-memberId`)
        storedMemberId = storedMemberIdStr ? parseInt(storedMemberIdStr) : null
        storedMemberCode = Cookies.get(`${windowId}-memberCode`)
    }

    return(
        <PrivateAccessContext.Provider value={{windowId, storedMemberId, storedMemberCode}}>
            {children}
        </PrivateAccessContext.Provider>
    )
}

export const usePrivateAccess = () => {
    const context = React.useContext(PrivateAccessContext)
    if (context === undefined) {
        throw new Error('usePrivateAccess must be used within the context')
    }
    return context
}


