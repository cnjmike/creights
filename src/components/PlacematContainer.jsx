import {useEffect, useState} from "react"
import Cookies from "js-cookie"

export const PlacematContainer = ({ label, children }) => {

    return(
        <div className="w-full h-full flex items-center justify-center p-0.5 md:p-4 bg-deco-green shadow-dark-offset">
            <div className='w-full h-full border-2 border-deco-gold flex items-center justify-center text-center relative pb-4 pr-4 pl-0.25 md:pb-2 md:pe-0 md:pl-2 md:pr-2 flex-col'>
                <div className='relative w-full flex flex-grow items-center justify-center'>
                    {children}
                </div>
                <div className="absolute text-xl mt-0.5 bottom-3 left-1/2 transform -translate-x-1/2 hidden lg:block text-deco-gold">
                    {label}
                </div>
            </div>
        </div>
    )

    /* return(
         <div className="w-full h-full flex items-center justify-center p-0.5 md:p-4 bg-deco-green shadow-dark-offset">
             <div
                 className='w-full h-full border-2 border-deco-gold flex items-center justify-center text-center text-deco-gold relative pb-0.25 pr-0.25 pl-0.25 md:pb-2 md:pe-0 md:pl-2 md:pr-2'>
                 <div className="absolute text-xl mt-0.5 bottom-1 left-1/2 transform -translate-x-1/2 z-1 hidden lg:block">
                     {label}
                 </div>
                 {children}
             </div>
         </div>
     )*/
}
