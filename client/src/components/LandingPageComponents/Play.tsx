import Marquee from "react-fast-marquee"
import {playTrackInfo} from "../../constants/index"
import playButton from "../../assets/playCovers/playButton.png"
import pauseButton from "../../assets/playCovers/pause.svg"
import {useState, useRef, useEffect} from "react"
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from "swiper/modules";
import clsx from "clsx";

const Play = () => {
    const [clicked, setClicked] = useState(5)
    const [mediaIndex, setMediaIndex] = useState(7)
    const swiperRef = useRef<SwiperRef>(null);
    const [media, setMedia] = useState(playTrackInfo[0]?.trackSource);
    const [med, setMed] = useState(false);
    const audioRef = useRef<HTMLAudioElement>(null!)
    
    useEffect(()=>{
        setMedia(playTrackInfo[clicked]?.trackSource)
        if(mediaIndex == clicked){
            setMed(true)
        }else{
            setMed(false)
        }
        async function load(){
           
            if(med){
                
             audioRef?.current?.play()
             .then(()=>console.log("object"))
             .catch((err)=> console.log(err))
            }else{
                audioRef.current.pause()
            }
        }
        load()
    
    },[clicked,mediaIndex,med,media,audioRef])

    function handleClick(index:number){
        if(clicked == index){
            swiperRef?.current?.swiper?.autoplay.start()
            return setClicked(5)
        }
        swiperRef?.current?.swiper?.autoplay.stop()
        setMediaIndex(index)
        setClicked(index)
        audioRef?.current?.play()
        
           
    }



  return (
    <div>
        <audio src={media} ref={audioRef}/>

        <Marquee className="font-formular-light text-grey-400 pb-6">
        FILM MAKING - GAME DEVELOPMENT- CONTENT CREATION - ADVERTISEMENT - MARKETING - EVENT PRODUCTION -  FILM MAKING - GAME DEVELOPMENT - CONTENT CREATION - ADVERTISEMENT - MARKETING - EVENT PRODUCTION -  
        </Marquee>

        <Swiper className="swi flex items-stretch"
        ref={swiperRef}
        slidesPerView={1}
        modules={[Autoplay]}
        loop={true}
        autoplay={{
            delay : 500,
            waitForTransition: true 
        }}
        centeredSlides={true}
        freeMode={true}
        speed={2000}
        breakpoints={
           { 
            300 : {
                spaceBetween : 1
            },
            700 : {
                slidesPerView : 2.2,
                spaceBetween : 10
            },
            1024 : {
            slidesPerView : 3.4
            }
        }}>

        {playTrackInfo.map((item,index) =>(
            <SwiperSlide>
            <div >
                <div className="relative w-fit" onClick={()=>{
                handleClick(index)}
                }>
                    <img src={item.img} alt="" className="lg:w-[28.27vw] h-[450px] lg:h-[500px]"/>
                    <div className={clsx("absolute inset-0 opacity-0 hover:opacity-65 flex hover:bg-[rgba(239,167,5,0.3)] cursor-pointer transition-all duration-500  items-center justify-center z-10 ", {"flex opacity-65" : med})} >
                        {
                            med && clicked == index ? <img src={pauseButton} alt="" className="w-24" /> :<img src={playButton} alt="" className="z-40 opacity-100" />
                        }
                    </div>
                </div>
                {
                    clicked == index && <div className="pb-5 pt-3 flex gap-3 text-white ">
                    <img src={item.trackArt} alt="" className="w-[52px] h-[52px]" />
                    <div>
                        <h5 className="pb-1 font-Utile-regular text-grey-100">{item.movieTitle}</h5>
                        <h5 className="text-xs text-grey-400">TRACK: {item.trackName}</h5>
                    </div>
                    </div>
                }
                </div>
            </SwiperSlide>
        ))}
        </Swiper>


{/* 
        <Playcard clicks={clicked} img={playTrackInfo[0]?.img} index={playTrackInfo[0]?.id} onClick={(e)=>{handleClick(playTrackInfo[0]?.id)}} movieTitle={playTrackInfo[0]?.movieTitle} audioRef={audioRef} />

        <div>
        <Playcard clicks={clicked} img={playTrackInfo[1]?.img} index={playTrackInfo[1]?.id} onClick={()=>{handleClick(playTrackInfo[1]?.id)}} movieTitle={playTrackInfo[1]?.movieTitle} audioRef={audioRef} />
        </div> */}

        <Marquee className="font-formular-light text-grey-400 pt-6">
        FILM MAKING - GAME DEVELOPMENT- CONTENT CREATION - ADVERTISEMENT - MARKETING - EVENT PRODUCTION -  FILM MAKING - GAME DEVELOPMENT - CONTENT CREATION - ADVERTISEMENT - MARKETING - EVENT PRODUCTION -  
        </Marquee>
    </div>
  )
}

export default Play
