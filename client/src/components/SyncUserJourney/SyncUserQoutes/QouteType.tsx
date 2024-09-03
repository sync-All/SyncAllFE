import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const QouteType = () => {
  const { id } = useParams();
  const [idValid, setIdValid] = useState(false);



  const [selectedOption, setSelectedOption] = useState(' ');
  const navigate = useNavigate();

  // interface ResponseData {
  //   message?: string;
  // }

  interface TrackDetails {
    artWork: string;
  }

  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  useEffect(() => {
    const fetchTrackDetails = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/queryTrackInfo/${id}`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        const res = await axios.get(apiUrl, config);
        console.log(res);
        setTrackDetails(res.data.details);
        setIdValid(true);
      } catch (error: unknown) {
        setIdValid(false);
      }
    };
    fetchTrackDetails();
  }, [id]);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRoute = () => {
    const selectedOptionObj = radioOptions.find(
      (option) => option.value === selectedOption
    );
    if (selectedOptionObj) {
      navigate(selectedOptionObj.route);
    }
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  const radioOptions = [
    {
      id: 'filmMovieTVSeries',
      value: 'filmMovieTVSeries',
      label: 'Film/Movie/TV Series',
      route: `/quote/filmMovieTVSeries/${id}`,
    },
    {
      id: 'tvCommercialAds',
      value: 'tvCommercialAds',
      label: 'TV Commercial/Ads',
      route: `/quote/tvCommercialAds/${id}`,
    },
    {
      id: 'videoGames',
      value: 'videoGames',
      label: 'Video Games',
      route: `/quote/videoGames/${id}`,
    },
    {
      id: 'sampling',
      value: 'sampling',
      label: 'Sampling',
      route: `/quote/sampling/${id}`,
    },
    {
      id: 'interpolation',
      value: 'interpolation',
      label: 'Interpolation',
      route: `/quote/interpolation/${id}`,
    },
    {
      id: 'crbt',
      value: 'crbt',
      label: 'CRBT',
      route: `/quote/crbt/${id}`,
    },
    {
      id: 'socialMediaContent',
      value: 'socialMediaContent',
      label: 'Social Media Content',
      route: `/quote/smc/${id}`,
    },
  ];

  return (
    <>
      {idValid ? (
        <div className="flex flex-col px-3 lg:flex-row mt-[153px] gap-[94px] items-start justify-center mx-auto mb-[150px] ">
          <div>
            <img
              src={trackDetails?.artWork}
              alt=""
              className="w-[439px] h-[412px] object-cover"
            />
          </div>
          <div className="max-w-[593px] ">
            <div>
              <h2 className="text-black2 font-formular-bold leading-[100%] text-[56px] tracking-[-2.24px] ">
                What type of licensing do you need?
              </h2>
              <p className="font-Utile-regular text-[24px] text-[#667185] leading-[100%]  tracking-[-0.96px] mt-[15px] ">
                Select one of the options below and proceed
              </p>
            </div>
            <div className="mt-[55px] flex flex-col gap-8">
              {radioOptions.map((option) => (
                <span key={option.id} className="flex gap-6 items-center">
                  <input
                    type="radio"
                    name="licenseOption"
                    id={option.id}
                    value={option.value}
                    className="h-6 w-6"
                    checked={selectedOption === option.value}
                    onChange={handleSelection}
                  />
                  <label
                    htmlFor={option.id}
                    className="text-black2 leading-[117%] font-Utile-regular tracking-[-0.96px] text-[24px]"
                  >
                    {option.label}
                  </label>
                </span>
              ))}
            </div>
            <div className="mt-[68px] flex gap-6 items-center">
              <button
                className="max-w-[176px] px-4 py-2.5 border border-black2 rounded-[8px] text-black2 font-formular-medium text-[14px] leading-5 "
                onClick={handleBackBtn}
              >
                Back
              </button>
              <button
                className="max-w-[176px] px-4 py-2.5 border border-yellow rounded-[8px] text-black2 font-formular-medium text-[14px] leading-5  bg-yellow"
                onClick={handleRoute}
              >
                Proceed
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center flex-col mt-[80px] mb-[130px]">
          <h1 className="text-black2 font-formular-bold text-[56px] tracking-[-2.24px] leading-[100%] ">
            Invalid ID
          </h1>
        </div>
      )}
    </>
  );
};

export default QouteType;
