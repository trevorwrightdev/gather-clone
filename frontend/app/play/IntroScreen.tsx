'use client'
import React from 'react'
import BasicButton from '@/components/BasicButton'
import AnimatedCharacter from './SkinMenu/AnimatedCharacter'
import { 
    LocalVideoTrack, 
} from 'agora-rtc-react'
import { useVideoChat } from '../hooks/useVideoChat'
import MicAndCameraButtons from '@/components/VideoChat/MicAndCameraButtons'

type IntroScreenProps = {
    realmName: string
    initialSkin: string
    username: string
    setShowIntroScreen: (show: boolean) => void
}

const IntroScreen:React.FC<IntroScreenProps> = ({ realmName, initialSkin, username, setShowIntroScreen }) => {

    const src = '/sprites/characters/Character_' + initialSkin + '.png'

    return (
        <main className='dark-gradient w-full h-screen flex flex-col items-center pt-28'>
            <h1 className='text-4xl font-semibold'>Welcome to <span className='text-[#CAD8FF]'>{realmName}</span></h1>
            <section className='flex flex-row mt-32 items-center gap-24'>
                <div className='flex flex-col items-center gap-4'>
                    <div className='aspect-video w-[337px] h-[227px] bg-black rounded-xl border-2 border-[#3F4776] overflow-hidden'>
                        <LocalVideo/>
                    </div>
                    <MicAndCameraButtons/>
                </div>
                <div className='flex flex-col items-center gap-4'>
                    <div className='flex flex-row items-center'>
                        <AnimatedCharacter src={src}/>
                        <p className='relative top-4'>{username}</p>
                    </div>
                    <BasicButton className='py-0 px-32 w-[250px]' onClick={() => setShowIntroScreen(false)}>
                        Join
                    </BasicButton>
                </div>
            </section>
        </main>
    )
}

export default IntroScreen

function LocalVideo() {
    const { localCameraTrack, isCameraEnabled, isMicrophoneEnabled } = useVideoChat()
    return (
        <div className='w-full h-full bg-[#111111] grid place-items-center relative'>
            <LocalVideoTrack 
                track={localCameraTrack}
                play={true}
                className='w-full h-full'
            />
            <div className='absolute select-none text-sm text-white items-center flex flex-col gap-1'>
                {!isMicrophoneEnabled && !isCameraEnabled && <p>You are muted</p>}
                {!isCameraEnabled && <p>Your camera is off</p>}
            </div>
            {!isMicrophoneEnabled && isCameraEnabled && <p className='absolute bottom-2 right-3 select-none text-sm text-white bg-black bg-opacity-50 p-1 px-2 rounded-full'>
                You are muted
            </p>}
        </div>
    )
}