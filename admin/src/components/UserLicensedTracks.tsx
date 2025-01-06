import Menu from '../assets/images/menu-dot-square.svg';
import Favorite from '../assets/images/favorite.svg';
import Copy from '../assets/images/copy-link.svg';
import NoLicensedTrack from '../assets/images/no_track.svg';

import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { User } from '../contexts/UserContext';
import MusicPlayer from './MusicPlayer';
import SpotifyHelper from '../helper/spotifyHelper';

interface UserLicensedTracksProps {
  userDetails: User | undefined;
}

const UserLicensedTracks: React.FC<UserLicensedTracksProps> = ({
  userDetails,
}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const navigate = useNavigate();

  const redirectMetadata = () => {
    navigate('/metadata');
  };

  const licensedTracks = userDetails?.totalLicensedTracks;

  const actions = [Favorite, Copy];


  return (
    <section className="mt-[63px] relative mb-[485px]">
      <div className=" hidden flex-col gap-[56px] lg:flex">
        {licensedTracks && licensedTracks.length > 0 ? (
          licensedTracks.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between"
              onClick={redirectMetadata}
            >
              <span className="flex gap-3">
                <img src={detail?.artWork} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail?.trackTitle}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail?.mainArtist}
                  </p>
                </span>
              </span>
              <div className="items-center flex">
                {detail.trackLink ? (
                  <MusicPlayer trackLink={detail?.trackLink} />
                ) : (
                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/track/${SpotifyHelper(
                      detail?.spotifyLink || ''
                    )}?utm_source=generator`}
                    width="100%"
                    height="100"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                )}
              </div>
              <span className="flex gap-12">
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail?.duration || 'N/A'}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail?.producers || 'N/A'}
                  </p>
                </span>
                <span>
                  <p className="font-Utile-bold text-[#475367] leading-4 text-[12px]">
                    {detail?.genre || 'N/A'}
                  </p>
                  <p className="font-Utile-regular text-[#98A2B3] leading-4 text-[12px]">
                    {detail?.mood.join(', ') || 'N/A'}
                  </p>
                </span>
              </span>
              <span className="flex gap-6">
                {actions.map((action, actionIndex) => (
                  <img key={actionIndex} src={action} alt="" />
                ))}{' '}
              </span>
              <span className="gap-[12px] flex">
                <button
                  className="text-[#27282A] font-Utile-bold text-[14px] leading-[10px] py-[9px] px-[7px]"
                  onClick={redirectMetadata}
                >
                  See Song{' '}
                </button>
              </span>
            </div>
          ))
        ) : (
          <div className="flex items-center justify-center">
            <p className="text-[#475367] font-Utile-regular text-[16px] leading-[24px]">
              You have no licensed tracks
            </p>
          </div>
        )}
      </div>
      {/* Mobile */}
      <div className="lg:hidden flex flex-col gap-6">
        {licensedTracks && licensedTracks.length > 0 ? (
          licensedTracks.map((detail, index) => (
            <div
              key={index}
              className="flex items-center w-full justify-between  "
            >
              <span className="flex gap-3">
                <img src={detail?.artWork} alt="" />
                <span>
                  <h4 className="font-Utile-bold text-[#475367] leading-6 text-[14px]">
                    {detail.trackTitle}
                  </h4>
                  <p className="font-Utile-regular text-[#475367] leading-4 text-[12px]">
                    {detail.mainArtist}
                  </p>
                </span>
              </span>
              <span>
                <img src={Menu} alt="" onClick={closeMenu} />
              </span>
            </div>
          ))
        ) : (
          <div className="text-center mt-[109px] text-[16px] leading-[20px] py-6 ">
            <img src={NoLicensedTrack} alt="" className="mx-auto" />
            <p className="font-Utile-medium mt-6 text-[16px] text-[#98A2B3]">
              User does not have any license request at the moment
            </p>
          </div>
        )}

        {}
      </div>
    </section>
  );
};

export default UserLicensedTracks;
