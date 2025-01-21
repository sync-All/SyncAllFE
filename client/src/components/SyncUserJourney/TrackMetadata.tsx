import Background from '../../assets/images/user-homepage-head.png';
import Favorite from '../../assets/images/favorite.svg';
import Liked from '../../assets/images/liked.svg';
import Arrowdown from '../../assets/images/arrow-down.svg';
import Copy from '../../assets/images/copy-link.svg';
// import AddMusic from '../../assets/images/add-music.svg';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import MusicPlayer from '../MusicPlayer';
import { useSyncUser } from '../../Context/syncUserData';
import useLoading from '../../constants/loading';
import LoadingAnimation from '../../constants/loading-animation';
import SpotifyHelper from '../../utils/spotifyhelper';

const TrackMetadata = () => {
  const track = useSyncUser();
  const { id } = useParams();
  const [trackDetails, setTrackDetails] = useState<TrackDetails | null>(null);
  const [subscriptionStatus, setSubscriptionStatus] = useState(false);

  const { loading, setLoading } = useLoading();
  const [isVisible, setIsVisible] = useState(false);

  const [liked, isLiked] = useState(false);
  interface ResponseData {
    message?: string;
  }

  const handleViewMore = () => {
    setIsVisible(true);
  };

  const handleUpgradeClick = () => {
    window.location.href = '/pricing';
  };

  interface TrackDetails {
    _id: string;
    trackTitle: string;
    mainArtist: string;
    genre: string;
    mood: string[];
    releaseDate: string;
    countryOfRecording: string;
    countryOfRelease: string;
    lyrics: string;
    trackLink: string;
    artWork: string;
    audioLang: string;
    claimBasis: string;
    claimingUser: string;
    composers: string[];
    copyrightName: string;
    copyrightYear: number;
    createdAt: string;
    explicitCont: boolean;
    featuredArtist: string[];
    featuredInstrument: string[];
    isrc: string;
    percentClaim: number;
    producers: string[];
    publishers: string[];
    recordingDate: string;
    recordingVersion: string;
    releaseDesc: string;
    releaseLabel: string;
    releaseTitle: string;
    releaseType: string;
    tag: string[];
    upc: number;
    updatedAt: string;
    uploadStatus: string;
    user: string;
    writers: string[];
    duration: string[];
    spotifyLink: string;
  }

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
        setLoading(true);
        const res = await axios.get(apiUrl, config);
        setTrackDetails(res.data.details);
      } catch (error: unknown) {
        const axiosError = error as AxiosError<ResponseData>;
        toast.error(
          (axiosError.response && axiosError.response.data
            ? axiosError.response.data.message || axiosError.response.data
            : axiosError.message || 'An error occurred'
          ).toString()
        );
      } finally {
        setLoading(false);
      }
    };
    fetchTrackDetails();
  }, [id, setLoading]);

  useEffect(() => {
    const trackAdded = track.user?.user.tracklist || [];
    const isIdPresent = trackAdded.some((track) => track._id === id);

    if (isIdPresent) {
      isLiked(true);
    }
  }, [id, track]);

  const sub = track.user?.user.billing.prod_id;
  console.log(sub);
  console.log(track.user?.user);

  useEffect(() => {
    setSubscriptionStatus(sub === 'free');
  }, [sub]);

  const handleLikes = async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/liketrack/${id}`;
    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      const res = await axios.get(apiUrl, config);
      toast.success(res.data);
      isLiked(true);
    } catch (error) {
      const axiosError = error as AxiosError<ResponseData>;

      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
    }
  };

  const handleCopyLink = (id: string) => {
    navigator.clipboard.writeText(`${window.location.origin}/metadata/${id}`);
    toast.success('Link copied to clipboard');
  };

  if (loading) {
    return <LoadingAnimation />;
  }

console.table(trackDetails);

  return (
    <div>
      <div className="flex flex-col lg:flex-row lg:gap-16 mx-5 lg:mx-20">
        <div className="lg:w-[40%]">
          <img
            src={trackDetails?.artWork || Background}
            alt=""
            className="w-full h-[412px] object-cover"
          />
        </div>
        <div className="flex flex-col mt-11 lg:mt-0 lg:w-[60%]">
          <div className="flex justify-between flex-col  md:flex-row">
            <div className="flex flex-col gap-2 lg:gap-4 w-full">
              <p className="text-[#475367] text-[32px] lg:text-[56px] font-formular-bold ">
                {trackDetails?.trackTitle || 'No Title Available'}
              </p>
              <p className="text-[#667185] text-[16px] lg:text-[24px] font-Utile-regular  ">
                {trackDetails?.mainArtist}
              </p>
            </div>
            <div className="flex mt-[27px] gap-[25px] items-center lg:items-start ">
              <img
                src={liked ? Liked : Favorite}
                alt=""
                className="cursor-pointer"
                onClick={handleLikes}
              />
              {/* <img src={AddMusic} alt="" /> */}
              <img
                src={Copy}
                alt=""
                className="cursor-pointer"
                onClick={() => handleCopyLink(trackDetails?._id ?? '')}
              />
              <Link to={`/quote/${trackDetails?._id}`}>
                <button className="w-fit  text-white bg-black2 font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px] lg:w-[100px]">
                  Get Quote
                </button>
              </Link>
            </div>
          </div>
          <div className="mt-20">
            {trackDetails?.trackLink ? (
              <MusicPlayer
                trackLink={trackDetails?.trackLink}
                songId={trackDetails?._id}
              />
            ) : (
              <iframe
                style={{ borderRadius: '12px' }}
                src={`https://open.spotify.com/embed/track/${SpotifyHelper(
                  trackDetails?.spotifyLink || ''
                )}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder="0"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              ></iframe>
            )}
          </div>

          <div className="mt-[93px] mb-[163px] w-full">
            <h4 className="font-formular-regular text-[24px] leading-6 text-[#344054] mb-2 ">
              Track Details
            </h4>
            <hr />
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 justify-between ">
              <div className="flex flex-col gap-8 lg:gap-6 ">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Genre</p>
                  <p className="text-[#475367]">
                    {trackDetails?.genre || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Duration</p>
                  <p className="text-[#475367]">{trackDetails?.duration}</p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Tag</p>
                  <p
                    className={`text-[#475367] ${
                      trackDetails?.tag === undefined ? 'cursor-pointer' : ''
                    }`}
                    onClick={
                      trackDetails?.tag === undefined
                        ? handleUpgradeClick
                        : undefined
                    }
                  >
                    {trackDetails?.tag === undefined
                      ? 'Upgrade to see this info'
                      : trackDetails.tag.length === 0
                      ? 'N/A'
                      : trackDetails.tag.join(', ')}
                  </p>
                </span>
              </div>
              <div className="flex flex-col justify-between gap-8 lg:gap-6 ">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Mood</p>
                  <p className="text-[#475367]">
                    {trackDetails?.mood.join(', ') || 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release date</p>
                                   <p className="text-[#475367]">
                    {trackDetails?.releaseDate
                      ? new Date(trackDetails.releaseDate).toLocaleDateString()
                      : 'N/A'}
                  </p>
                </span>
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release Label</p>
                  <p
                    className={`text-[#475367] ${
                      trackDetails?.releaseLabel === undefined
                        ? 'cursor-pointer'
                        : ''
                    }`}
                    onClick={
                      trackDetails?.releaseLabel === undefined
                        ? handleUpgradeClick
                        : undefined
                    }
                  >
                    {trackDetails?.releaseLabel || 'Upgrade to see this info'}
                  </p>
                </span>
              </div>
              <div className="flex  flex-col justify-between gap-8 lg:gap-6">
                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Produced by</p>
                  <p
                    className={`text-[#475367] ${
                      trackDetails?.producers === undefined
                        ? 'cursor-pointer'
                        : ''
                    }`}
                    onClick={
                      trackDetails?.producers === undefined
                        ? handleUpgradeClick
                        : undefined
                    }
                  >
                    
                    {trackDetails?.producers.join(', ') || 'N/A'}
                  </p>
                </span>

                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Featured Artist</p>
                  <p
                    className={`text-[#475367] ${
                      trackDetails?.featuredArtist === undefined
                        ? 'cursor-pointer'
                        : ''
                    }`}
                    onClick={
                      trackDetails?.featuredArtist === undefined
                        ? handleUpgradeClick
                        : undefined
                    }
                  >
                    {trackDetails?.featuredArtist === undefined
                      ? 'Upgrade to see this info'
                      : trackDetails.featuredArtist.length === 0
                      ? 'N/A'
                      : trackDetails.featuredArtist.join(', ')}
                  </p>
                </span>

                <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                  <p>Release Title</p>
                  <p
                    className={`text-[#475367] ${
                      trackDetails?.releaseTitle === undefined
                        ? 'cursor-pointer'
                        : ''
                    }`}
                    onClick={
                      trackDetails?.releaseTitle === undefined
                        ? handleUpgradeClick
                        : undefined
                    }
                  >
                    {trackDetails?.releaseTitle === undefined
                      ? 'Upgrade to see this info'
                      : trackDetails.releaseTitle.trim() === ''
                      ? 'N/A'
                      : trackDetails.releaseTitle}
                  </p>
                </span>
              </div>
            </div>

            {!isVisible && (
              <>
                <hr className="mt-2" />
                <div className="flex justify-center mt-6">
                  <button
                    className="text-[14px] font-Utile-bold text-[#475367] cursor-pointer bg-slate-200 rounded-xl py-1 px-2.5 flex gap-2 items-center"
                    onClick={handleViewMore}
                  >
                    View More <img src={Arrowdown} alt="" />
                  </button>
                </div>
              </>
            )}

            {/* <i>kindly upgrade your current plan to view this informations</i> */}
            {isVisible && (
              <>
                {subscriptionStatus && (
                  <>
                    <hr className="mt-4" />
                    <p className="text-center italic my-2 font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      kindly upgrade your current plan to view this informations
                    </p>
                  </>
                )}
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 justify-between ">
                  {/* First Column */}
                  <div className="flex flex-col gap-8 lg:gap-6 ">
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Country of Recording</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.countryOfRecording === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.countryOfRecording === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.countryOfRecording === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.countryOfRecording.trim() === ''
                          ? 'N/A'
                          : trackDetails.countryOfRecording}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Country of Release</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.countryOfRelease === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.countryOfRelease === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.countryOfRelease === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.countryOfRelease.trim() === ''
                          ? 'N/A'
                          : trackDetails.countryOfRelease}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Lyrics</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.lyrics === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.lyrics === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.lyrics === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.lyrics.trim() === ''
                          ? 'N/A'
                          : trackDetails.lyrics}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Audio Language</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.audioLang === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.audioLang === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.audioLang === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.audioLang.trim() === ''
                          ? 'N/A'
                          : trackDetails.audioLang}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Release Type</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.releaseType === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.releaseType === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.releaseType === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.releaseType.trim() === ''
                          ? 'N/A'
                          : trackDetails.releaseType}
                      </p>
                    </span>
                  </div>

                  {/* Second Column */}
                  <div className="flex flex-col justify-between gap-8 lg:gap-6 ">
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Copyright Name</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.copyrightName === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.copyrightName === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.copyrightName === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.copyrightName.trim() === ''
                          ? 'N/A'
                          : trackDetails.copyrightName}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Copyright Year</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.copyrightYear === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.copyrightYear === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.copyrightYear === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.copyrightYear.toString().trim() === ''
                          ? 'N/A'
                          : trackDetails.copyrightYear}
                      </p>
                    </span>

                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Explicit Content</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.explicitCont === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.explicitCont === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.explicitCont === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.explicitCont
                          ? 'Yes'
                          : 'No'}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Writer</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.writers === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.writers === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {Array.isArray(trackDetails?.writers)
                          ? trackDetails.writers.join(', ')
                          : 'Upgrade to see this info'}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Featured Instrument</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.featuredInstrument === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.featuredInstrument === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {Array.isArray(trackDetails?.featuredInstrument)
                          ? trackDetails.featuredInstrument.join(', ')
                          : 'Upgrade to see this info'}
                      </p>
                    </span>
                  </div>

                  {/* Third Column */}
                  <div className="flex flex-col justify-between gap-8 lg:gap-6">
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Publishers</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.publishers === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.publishers === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.publishers === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.publishers.length === 0
                          ? 'N/A'
                          : trackDetails.publishers.join(', ')}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Recording Date</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.recordingDate === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.recordingDate === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.recordingDate === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.recordingDate.trim() === ''
                          ? 'N/A'
                          : new Date(
                              trackDetails.recordingDate
                            ).toLocaleDateString()}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Recording Version</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.recordingVersion === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.recordingVersion === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.recordingVersion === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.recordingVersion.trim() === ''
                          ? 'N/A'
                          : trackDetails.recordingVersion}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Composed by</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.composers === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.composers === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {Array.isArray(trackDetails?.composers)
                          ? trackDetails.composers.join(', ')
                          : 'Upgrade to see this info'}
                      </p>
                    </span>
                    <span className="text-left font-inter text-[14px] font-medium leading-6 text-[#98A2B3]">
                      <p>Release Description</p>
                      <p
                        className={`text-[#475367] ${
                          trackDetails?.releaseDesc === undefined
                            ? 'cursor-pointer'
                            : ''
                        }`}
                        onClick={
                          trackDetails?.releaseDesc === undefined
                            ? handleUpgradeClick
                            : undefined
                        }
                      >
                        {trackDetails?.releaseDesc === undefined
                          ? 'Upgrade to see this info'
                          : trackDetails.releaseDesc.trim() === ''
                          ? 'N/A'
                          : trackDetails.releaseDesc}
                      </p>
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackMetadata;
