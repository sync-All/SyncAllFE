import Uploaded from '../assets/images/black-upload-icon.svg';
import Earning from '../assets/images/Cash Out.svg';
import Earth from '../assets/images/Earth.svg';
import { User } from '../contexts/UserContext';

interface AccountOverviewProps {
  userDetails: User | undefined
}

const AccountOverview:React.FC<AccountOverviewProps> = ({userDetails}) => {


  const cardData = [
    {
      imgSrc: Earning,
      title: 'Total Spent:',
      value: 0,
    },
    {
      imgSrc: Uploaded,
      title: 'Total Tracks Licensed',
      value: userDetails?.totalLicensedTracks.length,
    },

    {
      imgSrc: Earth,
      title: 'Upcoming Renewals',
      value: userDetails?.upcomingRenewals,
    },
    {
      imgSrc: Earning,
      title: 'Pending License Request:',
      value: userDetails?.pendingLicensedTracks.length,
    },
    {
      imgSrc: Uploaded,
      title: 'License Rejected',
      value: 0,
    },

    {
      imgSrc: Earth,
      title: 'Quotes Sent',
      value: 0,
    },
  ];

  return (
    <div className="mt-[50px] w-[70%]">
      <div>
        <h3 className="text-[#98A2B3] font-Utile-regular text-[24px] ">
          Quick Stats:
        </h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-4 w-full">
          {cardData.map((card, index) => (
            <div
              key={index}
              className="border border-[#E4E7EC] py-5 text-center w-full rounded-[10px]"
            >
              <img
                src={card.imgSrc}
                alt=""
                className="p-2 border border-[#E4E7EC] rounded-[5px] mx-auto"
              />
              <p className="mt-4 font-formular-light text-[14px] text-center text-[#667185]">
                {card.title}
              </p>
              <h3 className="mt-2 font-formular-regular text-[32px] text-[#1D2739] text-center">
                {card.value}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AccountOverview;
