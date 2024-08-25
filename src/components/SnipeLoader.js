import {useEffect, useRef, useState} from "react"

const SnipeLoader = () => {

    const [x, setX] = useState(15)
    const [dx, setDx] = useState(20)

    useEffect(() => {

        const move = () => {
            setX(prevX => {
                let nextX = prevX + dx

                if (nextX > 70) {
                    nextX = 70
                    setDx(-20)
                }
                if (nextX < 0) {
                    nextX = 10
                    setDx(20)
                }
                return nextX
            })
        }

        const timer = setInterval(move, 500)
        return () => clearInterval(timer)
    }, [dx])

    const [snipe, setSnipe] = useState(null)
    useEffect(() => {
        setSnipe(<div
            style={{
                left: `${x}%`,
            }}
        className="absolute h-full">
            { dx > 0
            ? <img src={`${process.env.PUBLIC_URL}/images/snipe_right.png`} alt="snipe left" className='flex h-full' />
            : <img src={`${process.env.PUBLIC_URL}/images/snipe_left.png`} alt="snipe right" className='flex h-full' />
            }
        </div>)
    }, [x, dx])

    return (
        <div className='flex relative h-full w-full bg-black'>
            {snipe}
        </div>
    )
}

export default SnipeLoader

