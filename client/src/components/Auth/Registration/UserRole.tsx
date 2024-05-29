import { useNavigate } from 'react-router-dom';
import syncUser from '../../../assets/images/sync-user.svg';
import musicUploader from '../../../assets/images/music-uploader.svg';

const RegisterUserRole = ({ setSelectedRole }: { setSelectedRole: (role: string) => void }) => {
  const navigate = useNavigate();

  const handleRoleClick = (role: string) => {
    setSelectedRole(role);
    navigate('/register');
  };

  return (
    <div className="bg-green-950 h-full">
      <div className="flex flex-col items-center justify-center bg-white py-[56px] px-[31px] border gap-[64px]">
        <div className="text-center">
          <h2 className="text-[32px] font-Utile-regular leading-[18.5px]">
            Who are you signing up as?
          </h2>
          <p className="max-w-[440px] leading-[24px] text-[16px] font-formular-light text-[#878789] mt-[16px]">
            Get onboarded to fully enjoy every single one of our services at
            your fingertips.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-[30px]">
          <div
            className="text-center border rounded-[22px] cursor-pointer"
            onClick={() => handleRoleClick('Sync User')}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && handleRoleClick('Sync User')}
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
        </div>
      </div>
    </div>
  );
};

export default RegisterUserRole;
