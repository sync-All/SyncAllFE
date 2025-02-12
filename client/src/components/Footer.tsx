import syncLogo from '../assets/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="bg-black2 py-12 md:py-20 lg:pt-32 lg:pb-[74px] px-3 md:px-10 lg:px-14">
      <section className="flex flex-col gap-8 lg:flex-row justify-between">
        <div>
          <img src={syncLogo} alt="" className="w-44 lg:w-[360px]" />
        </div>
        <section className="font-inter flex flex-wrap gap-32">
          <div className="flex flex-col gap-8">
            <h4 className="text-[rgba(255,255,255,0.60)] font-semibold text-xs">
              PRODUCT
            </h4>
            <div className="text-white flex flex-col text-sm gap-5">
              {/* <Link to="#" className="hover:text-yellow">Music</Link>
                  <Link to="#" className="hover:text-yellow">Sound Effects</Link>
                  <Link to="#" className="hover:text-yellow">Pricing</Link> */}
              <Link to="/login" className="hover:text-yellow">
                Log in
              </Link>
              <Link to="/register1" className="hover:text-yellow">
                Start free trial
              </Link>
            </div>
          </div>
          {/* <div className="flex flex-col gap-8">
                  <h4 className="text-[rgba(255,255,255,0.60)] font-semibold text-xs">
                  LEARN MORE
                  </h4>
                  <div className="text-white flex flex-col text-sm gap-5">
                  <Link to="#" className="hover:text-yellow">How it Works</Link>
                  <Link to="#" className="hover:text-yellow">For Artists</Link>
                  <Link to="#" className="hover:text-yellow">For Developers</Link>
                  <Link to="#" className="hover:text-yellow">Mobile App</Link>
                  <Link to="#" className="hover:text-yellow">In-store Music</Link>
                  <Link to="#" className="hover:text-yellow">Entreprise</Link>
                  <Link to="#" className="hover:text-yellow">Community</Link>
                  <Link to="#" className="hover:text-yellow">Solutions</Link>
                  </div>
                </div> */}
          {/* <div className="flex flex-col gap-8">
                  <h4 className="text-[rgba(255,255,255,0.60)] font-semibold text-xs">
                  ABOUT
                  </h4>
                  <div className="text-white flex flex-col text-sm gap-5">
                  <Link to="#" className="hover:text-yellow">About Us</Link>
                  <Link to="#" className="hover:text-yellow">Press</Link>
                  <Link to="#" className="hover:text-yellow">Careers</Link>
                  <Link to="#" className="hover:text-yellow">Blog</Link>
                  <Link to="#" className="hover:text-yellow">Help</Link>
                  </div>
                </div> */}
          <div className="flex flex-col gap-8">
                  <h4 className="text-[rgba(255,255,255,0.60)] font-semibold text-xs">
                  OTHER
                  </h4>
                  <div className="text-white flex flex-col text-sm gap-5">
                  {/* <Link to="#" className="hover:text-yellow">Legal Information</Link> */}
                  <Link to="/termsOfService" className="hover:text-yellow">Terms of Use</Link>
                  <Link to="/privacyPolicy" className="hover:text-yellow">Privacy</Link>
                  {/* <Link to="#" className="hover:text-yellow">Cookie</Link>
                  <Link to="#" className="hover:text-yellow">Languages</Link> */}
                  </div>
                </div>
        </section>
      </section>
      <section className="text-white pt-14 flex flex-col lg:flex-row gap-6 justify-between">
        <h4>Copyright © {new Date().getFullYear()} SYNCALL</h4>
        <div className="flex items-center gap-5 md:gap-9">
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer">
            <path d="M11.9999 2.7998C6.47724 2.7998 2 7.27703 2 12.7999C2 18.3229 6.47724 22.7998 11.9999 22.7998C17.5232 22.7998 22 18.3229 22 12.7999C22 7.27739 17.5233 2.7998 11.9999 2.7998ZM16.5858 17.2228C16.4067 17.5165 16.0222 17.6097 15.7285 17.4293C13.3806 15.9952 10.4249 15.6704 6.94403 16.4657C6.6086 16.5421 6.27424 16.3319 6.19782 15.9964C6.12104 15.6608 6.33037 15.3264 6.66663 15.25C10.4759 14.3797 13.7434 14.7544 16.3793 16.3654C16.673 16.5457 16.7662 16.929 16.5858 17.2228ZM17.8098 14.4999C17.5841 14.8667 17.1041 14.9825 16.7375 14.7568C14.0495 13.1046 9.95214 12.6261 6.77279 13.5912C6.36046 13.7158 5.92496 13.4834 5.79982 13.0718C5.67563 12.6594 5.90812 12.2248 6.31974 12.0994C9.95142 10.9974 14.4663 11.5312 17.5531 13.4281C17.9197 13.6538 18.0355 14.1337 17.8098 14.4999ZM17.9149 11.6645C14.692 9.75012 9.37454 9.5741 6.29741 10.5081C5.80328 10.6579 5.28073 10.379 5.13099 9.88482C4.98125 9.39044 5.25995 8.86824 5.75444 8.71801C9.28678 7.64567 15.1589 7.85285 18.8695 10.0557C19.3149 10.3195 19.4606 10.8935 19.1967 11.3374C18.934 11.7818 18.3579 11.9284 17.9149 11.6645Z"  fill-opacity="0.6"/>
          </svg> */}
          {/* <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25" className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer">
            <path d="M18.9806 4.96309C15.6762 4.7448 8.3183 4.74594 5.0194 4.96309C1.4477 5.19966 1.0264 7.29227 1 12.7998C1.0264 18.297 1.4433 20.3999 5.0194 20.6365C8.3194 20.8537 15.6762 20.8548 18.9806 20.6365C22.5523 20.3999 22.9736 18.3073 23 12.7998C22.9736 7.30256 22.5567 5.19966 18.9806 4.96309ZM8.7 9.37132L16.5837 12.7952L8.7 16.3553V9.37132Z" fill-opacity="0.6" />
          </svg> */}
          <a
            href="https://www.instagram.com/syncallmusic?igsh=OGVueGd5YnBuNHJ2"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M17.5 4.7998C16.7422 4.7998 16 5.54205 16 6.2998C16 7.05755 16.7422 7.7998 17.5 7.7998C18.2578 7.7998 19 7.05755 19 6.2998C19 5.54205 18.2578 4.7998 17.5 4.7998ZM11.5 15.7998C9.37423 15.8349 8 14.4047 8 12.2998C8 10.1717 9.5 8.7998 11.5 8.7998C13.5 8.7998 15 10.2998 15 12.2998C15 14.2998 13.5791 15.7654 11.5 15.7998ZM11.5 6.7998C8.5 6.7998 6 9.29981 6 12.2987C6 15.2977 8.5 17.7998 11.5 17.7998C14.5 17.7998 17 15.2998 17 12.2998C17 9.2998 14.5 6.7998 11.5 6.7998ZM11.5 2.7998C14.5938 2.7998 14.9612 2.81141 16.1824 2.86736C19.3227 3.00986 20.7899 4.5003 20.9324 7.61736C20.9894 8.83863 21 9.20597 21 12.2998C21 15.3947 20.9884 15.761 20.9324 16.9822C20.7899 20.0961 19.3269 21.5897 16.1824 21.7322C14.9612 21.7871 14.5959 21.7998 11.5 21.7998C8.40617 21.7998 8.03883 21.7871 6.81756 21.7322C3.66989 21.5887 2.21006 20.0919 2.06756 16.9812C2.01161 15.7599 2 15.3936 2 12.2987C2 9.20492 2.01267 8.83863 2.06756 7.6163C2.21111 4.5003 3.67411 3.01091 6.81756 2.8663C8.03989 2.81141 8.40617 2.7998 11.5 2.7998Z"
                fill-opacity="0.6"
              />
            </svg>
          </a>
          <a
            href="https://www.tiktok.com/@syncallmusic?_t=8peeNtAtpMT&_r=1"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer"
            >
              <path
                d="M20.9972 10.8914C20.8348 10.9073 20.6719 10.9156 20.5088 10.9164C19.6282 10.9165 18.7614 10.6959 17.9867 10.2744C17.212 9.85286 16.5537 9.24377 16.0714 8.50207V16.7234C16.0714 17.9252 15.7174 19.1 15.0542 20.0993C14.391 21.0985 13.4483 21.8774 12.3454 22.3373C11.2426 22.7972 10.029 22.9175 8.85818 22.683C7.68737 22.4486 6.61192 21.8699 5.76781 21.0201C4.92371 20.1703 4.34887 19.0876 4.11598 17.9089C3.88309 16.7301 4.00261 15.5084 4.45944 14.3981C4.91627 13.2878 5.68988 12.3388 6.68244 11.6711C7.675 11.0034 8.84194 10.647 10.0357 10.647C10.1617 10.647 10.2848 10.6584 10.4087 10.6663V13.6606C10.2848 13.6457 10.1631 13.6229 10.0357 13.6229C9.21869 13.6229 8.43516 13.9496 7.85745 14.5312C7.27975 15.1128 6.9552 15.9016 6.9552 16.7241C6.9552 17.5466 7.27975 18.3354 7.85745 18.917C8.43516 19.4986 9.21869 19.8254 10.0357 19.8254C11.7373 19.8254 13.24 18.4757 13.24 16.7626L13.2698 2.7998H16.1153C16.2453 4.0445 16.8057 5.20359 17.6987 6.0744C18.5916 6.94521 19.7601 7.47232 21 7.56357V10.8914"
                fill-opacity="0.6"
              />
            </svg>
          </a>

          <a
            href="https://x.com/syncallmusic?s=21&t=52amkBCt29av_-wAbLgkcw"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer"
            >
              <path
                d="M13.9027 11.483L21.3482 2.7998H19.5838L13.119 10.3393L7.95547 2.7998H2L9.8082 14.2008L2 23.3065H3.76443L10.5915 15.3445L16.0445 23.3065H22L13.9027 11.483ZM11.4861 14.3013L10.695 13.166L4.40018 4.13241H7.11025L12.1902 11.4228L12.9813 12.5581L19.5847 22.0345H16.8746L11.4861 14.3013Z"
                fill-opacity="0.6"
              />
            </svg>
          </a>

          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="25"
            viewBox="0 0 24 25"
            className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M9 9.7998H6V13.7998H9V22.7998H13V13.7998H16L17 9.7998H13V8.3408C13 7.5058 13.827 6.8378 14.596 6.8378H17V2.7998H13.827C10.83 2.7998 9 4.1848 9 6.8378V9.7998Z"
              fill-opacity="0.6"
            />
          </svg> */}

          <a
            href="https://www.linkedin.com/company/syncallmusic/"
            target="_blank"
            rel="noopener noreferrer"
          >
            {' '}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              className="hover:fill-yellow fill-white transition-all duration-700 cursor-pointer"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.33031 3.7998C3.59583 3.7998 3 4.37749 3 5.08919V20.5108C3 21.2226 3.5959 21.7998 4.33031 21.7998H19.6697C20.4045 21.7998 21 21.2225 21 20.5106V5.08919C21 4.37749 20.4045 3.7998 19.6697 3.7998H4.33031ZM8.46993 10.7598V18.8635H5.7764V10.7598H8.46993ZM8.64747 8.25369C8.64747 9.03135 8.06282 9.65362 7.12373 9.65362L7.10608 9.65355C6.20207 9.65355 5.61764 9.03128 5.61764 8.25362C5.61764 7.45832 6.21972 6.85342 7.14159 6.85342C8.06282 6.85342 8.62989 7.45832 8.64747 8.25369ZM12.6542 18.8635H9.96084C9.96084 18.8635 9.99614 11.5203 9.96098 10.7601H12.6544V11.9072C13.0124 11.3551 13.6532 10.5699 15.0819 10.5699C16.854 10.5699 18.1826 11.7281 18.1826 14.2171V18.8635H15.4894V14.5287C15.4894 13.4392 15.0993 12.6962 14.125 12.6962C13.3807 12.6962 12.9375 13.1973 12.7429 13.6814C12.6717 13.8542 12.6542 14.0967 12.6542 14.3385V18.8635Z"
                fill-opacity="0.6"
              />
            </svg>
          </a>
        </div>
      </section>
    </div>
  );
};

export default Footer;
