'use client'
import React, { useEffect, useState } from 'react'
import PixiApp from './PixiApp'
import { RealmData } from '@/utils/pixi/types'
import PlayNavbar from './PlayNavbar'
import { useModal } from '../hooks/useModal'
import signal from '@/utils/signal'
import dynamic from 'next/dynamic'

const IntroScreen = dynamic(() => import('./IntroScreen'), {
    ssr: false 
});

type PlayProps = {
    mapData: RealmData
    username: string
    access_token: string
    realmId: string
    uid: string
    shareId: string
    initialSkin: string
    name: string
}

const PlayClient:React.FC<PlayProps> = ({ mapData, username, access_token, realmId, uid, shareId, initialSkin, name }) => {

    const { setErrorModal, setDisconnectedMessage } = useModal()

    const [showIntroScreen, setShowIntroScreen] = useState(true)

    useEffect(() => {
        const onShowKickedModal = (message: string) => { 
            setErrorModal('Disconnected')
            setDisconnectedMessage(message)
        }

        const onShowDisconnectModal = () => {
            setErrorModal('Disconnected')
            setDisconnectedMessage('You have been disconnected from the server.')
        }

        signal.on('showKickedModal', onShowKickedModal)
        signal.on('showDisconnectModal', onShowDisconnectModal)

        return () => {
            signal.off('showKickedModal', onShowDisconnectModal)
            signal.off('showDisconnectModal', onShowDisconnectModal)
        }
    }, [])

    return (
        <>
            {!showIntroScreen && <div className='relative w-full h-screen flex flex-col-reverse sm:flex-col'>
                <PixiApp 
                    mapData={mapData} 
                    className='w-full grow sm:h-full sm:flex-grow-0' 
                    username={username} 
                    access_token={access_token} 
                    realmId={realmId} 
                    uid={uid} 
                    shareId={shareId} 
                    initialSkin={initialSkin} 
                />
                <PlayNavbar />
            </div>}
            {showIntroScreen && <IntroScreen realmName={name} initialSkin={initialSkin} username={username} setShowIntroScreen={setShowIntroScreen}/>}    
        </>
    )
}
export default PlayClient