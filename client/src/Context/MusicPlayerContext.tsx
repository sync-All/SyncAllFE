import { createContext, useState } from "react";

export const MusicPlayerContext = createContext <PlayerContextProps | undefined >(undefined)

interface PlayerContextProps {
    currentPlayingTrackId : string
    setCurrentPlayingTrackId : React.Dispatch<React.SetStateAction<string>>
}

interface Props {
    children?: React.ReactNode
    // any props that come into the component
}

export const MusicPlayerProvider = ({children}:Props)=>{

    const [currentPlayingTrackId, setCurrentPlayingTrackId] = useState('')

    return (<MusicPlayerContext.Provider value={{setCurrentPlayingTrackId, currentPlayingTrackId}}>
        {children}
    </MusicPlayerContext.Provider>)
}