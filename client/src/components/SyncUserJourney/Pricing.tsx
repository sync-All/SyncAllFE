import Check from '../../assets/images/check.svg';
import X from '../../assets/images/xOutline.svg';
import { currencies } from '../../constants/currency';
import TooltipImg from '../../assets/images/tooltip-info.svg';
import WhiteCheck from '../../assets/images/white-check.svg'
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';


const Pricing = () => {
  const pricingPlans = [
    {
      name: 'Basic',
      price: 'Free',
      buttonText: 'Get Basic',
      features: [
        'Limited Metadata access',
        'Limited Exclusive Content Review',
        'Ability to search and browse metadata',
        'Licensing quote request',
      ],
    },
    {
      name: 'Standard',
      dollar: '$',
      price: '20',

      bg: '#ECFDF5',
      btnBg: '#1B2128',
      btntext: '#FBFCFE',
      pricebtntext: '#FBFCFE',
      smallText: 'per month',
      buttonText: 'Get Standard',
      features: [
        'Unlimited Metadata access',
        'Unlimited Exclusive Content Review',
        'Ability to search and browse metadata',
        'Licensing quote request',
        'Licensing to use royalty free background music ',
        'Limited Advanced Search Filter',
      ],
    },
    {
      name: 'Premium',
      dollar: '$',
      price: '70',

      smallText: 'per month',
      buttonText: 'Get Premium',
      features: [
        'Everything in Standard plus:',
        'Unlimited Advanced Search Filter',
        'Priority Access',
        'Rights Share Auction',
        'Personal Account Manager',
      ],
    },
    {
      name: 'Enterprise',
      bg: '#013131',
      pricebtntext: '#FBFCFE',
      btntext: '#1B2128',
      price: 'Custom',
      textCol: '#fff',
      check: WhiteCheck,
      buttonText: 'Contact us',

      features: [
        'Everything in Basic',
        'Everything in Standard',
        'Everything in Premium',
        'Additional Benefits',
      ],
      comparePlansPriceBorder: 'border-r-0',
    },
  ];

  const featureComparison = [
    {
      feature: 'Metadata access',
      tooltip: 'Access to descriptive details and context of each song',
      basic: 'Limited',
      standard: 'Unlimited',
      premium: 'Unlimited',
      enterprise: 'Unlimited',
    },
    // {
    //   feature: 'Exclusive Content Review',

    //   basic: 'Limited',
    //   standard: 'Unlimited',
    //   premium: 'Unlimited',
    // },
    {
      feature: 'Ability to search and browse metadata',
      tooltip:
        'Access to search and browse metadata using descriptive information resource',

      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Licensing quote request',
      tooltip: 'Option to inquire about licensing terms',

      basic: true,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Licensing to use royalty free background music',
      tooltip:
        'Access to use background music without the need to pay additional royalties or fees.',
      basic: false,
      standard: true,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Advanced Search Filter',
      tooltip: 'Access to advanced search filters and curated playlists.',

      basic: false,
      standard: 'Limited',
      premium: 'Unlimited',
      enterprise: 'Unlimited',
    },
    {
      feature: 'Discounted Licensing Rates',
      tooltip: 'Discounted licensing rates for bulk licensing.',
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
    {
      feature: 'Priority Access',
      tooltip: 'Priority access to new releases and exclusive content.',
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Rights Share Auction',
      tooltip: 'Ability to participate in rights share auctions.',
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Personal Account Manager',
      tooltip: 'Dedicated account manager for licensing and rights inquiries.',
      basic: false,
      standard: false,
      premium: true,
      enterprise: true,
    },
    {
      feature: 'Soundtrack Commission',
      tooltip:
        'Exclusive commissioning of original music composition from our pool of composers.',
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
    {
      feature: 'Team Access',
      tooltip:
        'Ability for members of a team or group to have permission and privileges to a user account and access controls',
      basic: false,
      standard: false,
      premium: false,
      enterprise: true,
    },
  ];

  return (
    <div>
      <div className="my-[90px] text-center">
        <select name="" id="" className="w-fit">
          <option value="">Select Country</option>
          {currencies.map((country, index) => (
            <option key={index} value={country.code}>
              {country.code}
            </option>
          ))}
        </select>
      </div>
      <div className="text-center">
        <h1 className="text-[#1B2128] font-formular-bold text-[64px] leading-[68px] tracking-[-1.28px]">
          Our Pricing Plans
        </h1>
        <p className="text-[#1B2128] font-formular-regular text-[24px] leading-[32px] mt-4">
          Choose the best plan that fits your needs.
        </p>
      </div>
      <div>
        <span className="flex justify-center w-full items-center gap-3 lg:gap-[36px] my-12 flex-wrap">
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-3 lg:px-[26px] rounded-full text-[10px] lg:text-[18px] font-formular-medium tracking-6">
            Monthly
          </p>
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-[26px] rounded-full text-[10px] lg:text-[18px]  font-formular-medium tracking-6">
            Quarterly
          </p>
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-[26px] rounded-full text-[10px] lg:text-[18px]  font-formular-medium tracking-6">
            Bi-Annually
          </p>
        </span>
      </div>

      <section className="flex flex-col md:grid md:grid-cols-2 md:gap-1 md:mx-auto md:w-[824px]  items-center justify-center gap-6 min-h-full">
        {pricingPlans.map((plan, index) => (
          <div
            key={index}
            className="p-6 bg-[#F7F9FC] rounded-[16px] h-[412px] w-[400px] "
            style={{ backgroundColor: plan.bg, color: plan.textCol }}
          >
            <p
              className="text-[#1B2128] font-formular-bold text-[17px] leading-6"
              style={{ color: plan.textCol }}
            >
              {plan.name}
            </p>
            <h2
              className="text-[#1B2128] font-formular-bold text-[48px] leading-[52px] tracking-[-0.96px] mt-4"
              style={{ color: plan.textCol }}
            >
              <span className="font-Utile-bold">{plan.dollar}</span>{' '}
              {plan.price}{' '}
              <small className="text-[20px] font-formular-regular leading-6">
                {plan.smallText}
              </small>
            </h2>
            <button
              className="w-full py-2 px-4 bg-transparent rounded-[8px] border border-[#495A6E] text-[#1B2128] font-formular-medium  text-[15px] leading-[20px] my-6"
              style={{ backgroundColor: plan.btnBg, color: plan.pricebtntext }}
            >
              {plan.buttonText}
            </button>
            <hr />
            <ul className="mt-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-2">
                  <img
                    src={plan.check || Check}
                    alt=""
                    className="text-white"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className="mt-[109px]">
        <p
          className="text-[48px] font-formular-bold leading-[52px]
        tracking-[-0.96px] text-center"
        >
          Compare plans
        </p>
        <div className="overflow-x-auto lg:overflow-hidden h-full lg:mx-12">
          <table className="mt-12 w-full h-full mx-auto">
            <thead>
              <tr>
                <th className="border-l-0 border-t-0 border border-black p-4 md:p-6 w-1/4]"></th>
                {pricingPlans.map((plan, index) => (
                  <th
                    key={index}
                    className={`border-l-0 border-t-0 border border-black p-4 md:p-6 w-1/4 ${plan.comparePlansPriceBorder}`}
                  >
                    <p className="font-formular-bold text-[17px] leading-6 text-[#1B2128]">
                      {plan.name}
                    </p>
                    <p className="text-[20px] plus-jarkata-sans-regular">
                      <b className="font-Utile-bold text-[28px] leading-8 tracking-[-0.56px] text-[#1B2128]">
                        {plan.dollar} {plan.price}
                      </b>{' '}
                      per month
                    </p>
                    <button
                      className="w-full py-2 px-4 bg-transparent rounded-[8px] border border-[#495A6E] text-[#1B2128] font-formular-medium  text-[15px] leading-[20px] my-6"
                      style={{
                        backgroundColor: plan.btnBg,
                        color: plan.btntext,
                      }}
                    >
                      {plan.buttonText}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureComparison.map((feature, index) => (
                <tr
                  key={index}
                  className="border-l-0 border-r-0 border border-black relative"
                >
                  <td className=" plus-jarkata-sans-regular py-4 px-2 md:py-6 md:px-8 w-1/4 font-[20px] leading-6 text-[#1B2128] border-l-0  border border-black">
                    {feature.feature}{' '}
                    <span className="absolute z-50 py-4 px-2 left-[20%] top-[23%]">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content={feature.tooltip}
                        data-tooltip-place="right"
                      >
                        <img src={TooltipImg} alt="" />
                      </a>
                      <Tooltip id="my-tooltip" style={{ width: '200px' }} />
                    </span>
                  </td>
                  <td className="plus-jarkata-sans-regular py-4 px-2 md:py-6 md:px-8 w-1/4 font-[20px] leading-6 text-[#1B2128] border border-black">
                    {typeof feature.basic === 'boolean' ? (
                      feature.basic ? (
                        <img src={Check} alt="Available" />
                      ) : (
                        <img src={X} alt="Not Available" />
                      )
                    ) : (
                      feature.basic
                    )}
                  </td>
                  <td className="plus-jarkata-sans-regular py-4 px-2 md:py-6 md:px-8 w-1/4 font-[20px] leading-6 text-[#1B2128] border border-black">
                    {typeof feature.standard === 'boolean' ? (
                      feature.standard ? (
                        <img src={Check} alt="Available" />
                      ) : (
                        <img src={X} alt="Not Available" />
                      )
                    ) : (
                      feature.standard
                    )}
                  </td>
                  <td className="plus-jarkata-sans-regular py-4 px-2 md:py-6 md:px-8 w-1/4 font-[20px] leading-6 text-[#1B2128] border border-black">
                    {typeof feature.premium === 'boolean' ? (
                      feature.premium ? (
                        <img src={Check} alt="Available" />
                      ) : (
                        <img src={X} alt="Not Available" />
                      )
                    ) : (
                      feature.premium
                    )}
                  </td>
                  <td className="plus-jarkata-sans-regular py-4 px-2 md:py-6 md:px-8 w-1/4 font-[20px] leading-6 text-[#1B2128]">
                    {typeof feature.enterprise === 'boolean' ? (
                      feature.enterprise ? (
                        <img src={Check} alt="Available" />
                      ) : (
                        <img src={X} alt="Not Available" />
                      )
                    ) : (
                      feature.enterprise
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-col gap-4 mt-[94px] p-6 ml-[56px] mb-[118px]">
          <p className="text-[#1B2128] font-formular-bold text-[17px] leading-6 ">
            Enterprise
          </p>
          <h2 className="text-[#1B2128] font-formular-bold text-[48px] leading-[52px] tracking-[-0.96px] ">
            Contact Us
          </h2>
          <p className="text-[#1B2128] font-Utile-regular text-[24px] leading-[52px] tracking-[-0.48px] ">
            Send an email to <b>enterpriserequest@syncall.com</b>{' '}
          </p>
        </div>
      </section>
    </div>
  );
};

export default Pricing;
