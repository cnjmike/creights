
const canWakeLock = () => 'wakeLock' in navigator

let wakelock
export async function lockWakeState() {
    if(canWakeLock()) {
        console.log('wakelock not available')
        let video = document.createElement('video')
        video.style.display = 'none'
        video.muted = true
        video.src = `${process.env.PUBLIC_URL}/silent_video.mp4`
        await video.play()
        video.loop = true
        document.body.appendChild(video)
        return
    } else {
        try {
            wakelock = await navigator.wakeLock.request()
            wakelock.addEventListener('release', () => {
                console.log('Screen Wake State Locked:', !wakelock.released)
            });
            console.log('Screen Wake State Locked:', !wakelock.released)
        } catch(e) {
            console.error('Failed to lock wake state with reason:', e.message)
        }
    }
}

export function releaseWakeState() {
    if(wakelock) wakelock.release()
    wakelock = null
}
