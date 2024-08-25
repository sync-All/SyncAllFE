import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const QouteType = () => {
  const { id } = useParams();

  const [selectedOption, setSelectedOption] = useState(' ');
  const navigate = useNavigate();

  interface ResponseData {
    message?: string;
  }

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
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      }
    };
    fetchTrackDetails();
  }, [id]);

  const handleSelection = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedOption(event.target.value);
  };

  const handleRoute = () => {
    if (selectedOption === 'syncLicense') {
      navigate('/home/quote/syncLicense');
    } else if (selectedOption === 'samplingInterpolation') {
      navigate('/samplingInterpolation');
    }
  };

  const handleBackBtn = () => {
    navigate(-1);
  };

  return (
    <div className="flex flex-col px-3 lg:flex-row mt-[153px] gap-[94px] items-center justify-center mx-auto mb-[150px] ">
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
        <div className="mt-[55px] flex flex-col gap-8 ">
          <span className="flex gap-6 items-center">
            <input
              type="radio"
              name="licenseOption"
              id="syncLicense"
              value="syncLicense"
              className="h-6 w-6"
              checked={selectedOption === 'syncLicense'}
              onChange={handleSelection}
            />
            <label
              htmlFor="syncLicense"
              className="text-black2 leading-[117%] font-Utile-regular  tracking-[-0.96px] text-[24px] "
            >
              Sync License
            </label>
          </span>
          <span className="flex gap-6 items-center">
            <input
              type="radio"
              name="licenseOption"
              id="samplingInterpolation"
              value="samplingInterpolation"
              className="h-6 w-6"
              checked={selectedOption === 'samplingInterpolation'}
              onChange={handleSelection}
            />
            <label
              htmlFor="samplingInterpolation"
              className="text-black2 leading-[117%] font-Utile-regular  tracking-[-0.96px] text-[24px] "
            >
              Sampling and Interpolation
            </label>
          </span>
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
  );
};

export default QouteType;
