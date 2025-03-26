import { useDataContext } from '../../Context/DashboardDataProvider';
import NoNotification from '../../assets/images/no_dispute.svg';
import ReactModal from 'react-modal';
import mark from "../../assets/images/mark.svg"
import { formatDistanceToNow, isToday, isYesterday, format } from "date-fns";
import { notification } from '../../declarations';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface MusicUploaderNotificationProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const MusicUploaderNotification: React.FC<MusicUploaderNotificationProps> = ({
  isOpen,
  onRequestClose,
}) => {
  const { dashboardData } = useDataContext();
  ReactModal.setAppElement('#root');
  let notifications : notification[] = []
  let unreadNotifs = []
  if(dashboardData){
    notifications = dashboardData.profileInfo.notifications
    unreadNotifs = notifications?.filter((item)=> !item.read)
  }
  useEffect(()=>{
    if(isOpen){
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    }else{
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    }
  },[isOpen])

  const apiUrl = import.meta.env.VITE_APP_API_URL
  const { setRefresh } = useDataContext()
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      Authorization: ` ${token}`,
    },
  };
  const markNotification =  async(param : string)=>{
    try {
      await axios.get(`${apiUrl}/readNotification?${param}`,config)
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error("An error occurred please try again later")
    }
  }

  const clearNotification = async()=>{
    try {
      await axios.get(`${apiUrl}/clearAllNotification`,config)
      setRefresh((prev)=>!prev)
    } catch (error) {
      toast.error('An error occured while clearing notifications')
    }
  }


  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        content : {
          width : '98%',
          position : 'relative',
          inset : 0,
          background: 'none',
          //   opacity : '1',
          border : 'none',
          display: 'flex',
          flexDirection : 'column',
          alignItems : 'center',
          gap : '3rem'
        },
        overlay: {
          zIndex : 20000,
          display: 'flex',
          justifyContent : 'center',
          alignItems : 'center',
          background : 'rgba(0,0,0,0.5)',
          width : '100%',
          overflowY: 'scroll',
          backdropFilter : 'blur(1.6500015258789px)'
        },
      }}
    >
      <div className=" w-full lg:max-w-[56.1vw] py-[12px] pb-9 bg-white z-10 rounded-lg font-manrope">
        <div className='flex items-center justify-between px-4 lg:px-7 py-3'>
          <h2 className="font-formular-bold text-[24px] leading-8 tracking-[-0.5px] text-[#202020]">
          Notifications
          </h2>
          <span onClick={onRequestClose} className='text-xl font-formular-bold cursor-pointer '>X</span>
        </div>
        <div className="flex items-center px-4 lg:px-7 py-[14px] border-y border-[#DADCE0] justify-between">
          <div>
            <p className="font-formular-regular text-[16px] leading-7 tracking-[-0.5px] text-[#202020]">
              All
              <span className="bg-[#013131] rounded-[24px] h-[28px] w-[40px] inline-block text-center text-white ml-2">
              {unreadNotifs.length}
            </span>
            </p>
          </div>
          <div className='flex items-center text-xs gap-3'>
            {
              unreadNotifs.length > 0 && (<p className='flex items-center gap-1 text-xs lg:text-base text-[#202020] cursor-pointer' onClick={()=>{markNotification(`markAll=true`)}}>
                <img src={mark} alt="" className='w-4 lg:w-5' /> Mark all as read
              </p>)
            }
            {
              notifications.length > 0 && (
                <p className='text-xs lg:text-base text-[#F62C2C] cursor-pointer' onClick={clearNotification}>
                  Clear All
                </p>
              )
            }
          </div>
        </div>
        {
          notifications.length > 0 && (<div className='max-h-[70vh] overflow-y-auto scrollbar-hide w-full'>
            {
              notifications.map((item, idx)=> <NotificationCards key={idx} title={item.title} id={item._id} read={item.read} createdAt={item.createdAt} markOne={markNotification}/>)
            }
          </div>)
        }
        {
          notifications.length < 1 && (
            <div className="mt-[87px]">
          <img src={NoNotification} alt="" className="mx-auto my-auto" />
        </div>
          )
        }
        
      </div>
    </ReactModal>
  );
};

export default MusicUploaderNotification;

const NotificationCards = ({title, createdAt, read, id, markOne}: {title : string, createdAt : string | Date, read : boolean, id ?: string, markOne : (param : string)=> void})=>{
  const [readNotification, setReadNotification] = useState(read)
  const readANotif = ()=>{
    markOne(`markOne=${id}`)
    setReadNotification(true)
  }
  const getFormattedTime = (date : string | Date) => {
    const dateObj = new Date(date);
  
    if (isToday(dateObj)) {
      return `Today, ${formatDistanceToNow(dateObj, { addSuffix: true })}`;
    } else if (isYesterday(dateObj)) {
      return `Yesterday, ${formatDistanceToNow(dateObj, { addSuffix: true })}`;
    } else {
      return format(dateObj, "MMMM d, yyyy"); // e.g., "March 20, 2025"
    }
  };
  return(<div className={`px-5 lg:px-[2vw] py-[17px] ${!readNotification ? 'bg-[#EFEFF9]' : 'bg-white'} hover:bg-[#EFEFF9] border-y border-[#DADCE0] flex items-center justify-between w-full font-manrope cursor-pointer`}>
    <div className='w-[66%]'>
      <h4 className='text-sm lg:text-[1vw] font-medium text-[#202020]'>
        {title}
      </h4>
      {/* {
        message && (<p className='text-[10px] '>
          {message}
        </p>)
      } */}
      <p className='text-xs text-[#838383] '>
        {getFormattedTime(createdAt)}
      </p>
    </div>
    <div className=''>
      {
        !read && (<p className='flex items-center gap-1 text-xs lg:text-base text-[#202020] cursor-pointer ' onClick={readANotif}>
          <img src={mark} alt="" className='w-4 lg:w-5' /> Mark as read
        </p>)
      }
    </div>
  </div>)
}
