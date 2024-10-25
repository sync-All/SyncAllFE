import { createContext, useState } from "react";

export const MusicPlayerContext = createContext <PlayerContextProps | undefined >(undefined)

interface PlayerContextProps {
    currentPlayingTrackId : string
    setCurrentPlayingTrackId : React.Dispatch<React.SetStateAction<string>>
}

interface Props {
    children?: React.ReactNode
}

export const MusicPlayerProvider = ({children}:Props)=>{

    const [currentPlayingTrackId, setCurrentPlayingTrackId] = useState('')

    return (<MusicPlayerContext.Provider value={{setCurrentPlayingTrackId, currentPlayingTrackId}}>
        {children}
    </MusicPlayerContext.Provider>)
}