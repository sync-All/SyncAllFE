import { useNavigate } from 'react-router-dom';
import syncUser from '../../../assets/images/sync-user.svg';
import musicUploader from '../../../assets/images/music-uploader.svg';
import BackgroundPattern from '../../../assets/images/user-role-pattern.svg';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';

interface gauthProps {
    googleAuthData: object | null,
  }


const GoogleAuthUserRole = ({googleAuthData}:gauthProps) => {
  const navigate = useNavigate();

  const handleNavigationTODashboard = (spotifyLink:string) => {
    if(!spotifyLink){
      navigate('/onboarding-details');
    }else{
      navigate('/dashboard');
    }
};

  const handleRoleClick = async(role: string) => {
    const colatedValues = {...googleAuthData, role}
    console.log(colatedValues)
    await axios
        .post('http://localhost:3000/api/v1/googleauth', {...googleAuthData, role})
        .then((response) => {
          const spotifyLink = response.data.user.spotifyLink
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('userRole', response.data.user.role);
          localStorage.setItem('userId', response.data.user._id);
          toast.success('Login successful');
          setTimeout(()=>{
            if (response.data.user.role == 'Music Uploader') {
                handleNavigationTODashboard(spotifyLink);
              } else {
                navigate('/home');
              }
          },1500)
        })
        .catch((err)=>{
            console.log(err)
        })
  };

  return (
    <div className="bg-[#013131]">
      <div
        className="  h-screen flex items-center justify-center"
        style={{ background: `url(${BackgroundPattern})` }}
      >
        <div className="flex flex-col items-center justify-center bg-white lg:w-[619px] py-[56px] px-[31px] border gap-[64px] rounded-[20px] ">
          <div className="text-center">
            <h2 className="text-[32px] font-Utile-regular leading-[18.5px]">
              Before Continuing
            </h2>
            <p className="max-w-[440px] leading-[24px] text-[16px] font-formular-light text-[#878789] mt-[16px]">
              Kindly select who you are signing in as
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-[30px]">
            <div
              className="text-center border rounded-[22px] cursor-pointer"
              onClick={() => handleRoleClick('Sync User')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleRoleClick('Sync User')
              }
            >
              <div className="flex flex-col items-center justify-center px-[33px] py-[40px] gap-[31px]">
                <img src={syncUser} alt="Sync User" className="mx-auto" />
                <div>
                  <h2 className="text-[24px] leading-[24px] font-formular-regular">
                    Sync User
                  </h2>
                  <p className="w-[206px] text-[#667185] mt-[20px] font-formular-light text-[16px]">
                    You are here to license music from SyncAll.
                  </p>
                </div>
              </div>
            </div>
            <div
              className="text-center border rounded-[22px] cursor-pointer"
              onClick={() => handleRoleClick('Music Uploader')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) =>
                e.key === 'Enter' && handleRoleClick('Music Uploader')
              }
            >
              <div className="flex flex-col items-center justify-center px-[33px] py-[40px] gap-[31px]">
                <img
                  src={musicUploader}
                  alt="Music Uploader"
                  className="mx-auto"
                />
                <div>
                  <h2 className="text-[24px] leading-[24px] font-formular-regular">
                    Music Uploader
                  </h2>
                  <p className="w-[206px] text-[#667185] mt-[20px] font-formular-light text-[16px]">
                    You are here to publish music to SyncAll for use.
                  </p>
                </div>
              </div>
            </div>
            <ToastContainer/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GoogleAuthUserRole;