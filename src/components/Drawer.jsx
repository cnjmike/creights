import React, {useEffect, useState} from 'react'
import { motion } from 'framer-motion'

function Drawer({imageUrl, autoOpen, width, children}) {
    const [requestOpen, setRequestOpen] = useState(false)

    return (
        <>
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: '50px',
                    height: '50px',
                    backgroundImage: `url(${imageUrl})`,
                    backgroundSize: 'cover',
                    cursor: 'pointer',
                    zIndex: 2,
                }}
                onClick={() => setRequestOpen(!requestOpen)}
                whileHover={{
                    scale: 3
                }}
            ></motion.div>
            <motion.div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    width: width,
                    zIndex: 1,
                }}
                initial={{ y: '100%' }}
                animate={{
                    y: (requestOpen || autoOpen) ? '0%' : '100%',
                    visibility: (requestOpen || autoOpen) ? 'visible' : 'hidden'}}
            >
                {children}
            </motion.div>
        </>
    )
}

export default Drawer
