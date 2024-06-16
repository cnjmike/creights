
export const PlacematContainer = ({ label, children }) => {

    return(
        <div className="w-full h-full flex items-center justify-center p-8 bg-deco-green">
            <div
                className='w-full h-full border-2 border-deco-gold flex items-center justify-center text-center text-3xl text-deco-gold relative'>
                <div className="absolute text-4xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-50 z-1">
                    {label}
                </div>
                {children}
            </div>
        </div>
    )
}
