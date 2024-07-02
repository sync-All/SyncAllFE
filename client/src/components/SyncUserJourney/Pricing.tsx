import Check from '../../assets/images/check.svg';
import { currencies } from '../../constants/currency';

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
      smallText: 'per month',
      buttonText: 'Start with Standard',
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
      name: 'Premuim',
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
    // Add more pricing plans here if needed
  ];

  return (
    <div>
      <div className="my-[90px] text-center">
        <select name="" id="" className='w-fit'>
          <option value="">Select Country</option>
          {currencies.map((country, index) => (
            <option key={index} value={country.code}>{country.code}</option>
          ))}
        </select>
      </div>
      <div className=" text-center">
        <h1 className="text-[#1B2128] font-formular-bold text-[64px] leading-[68px] tracking-[-1.28px] ">
          Our Pricing Plans
        </h1>
        <p className="text-[#1B2128] font-formular-regular text-[24px] leading-[32px] mt-4 ">
          Choose the best plan that fits your needs.
        </p>
      </div>
      <div>
        <span className="flex justify-center items-center gap-[36px] my-12">
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-[26px] rounded-full text-[18px] font-formular-medium tracking-6">
            Monthly
          </p>
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-[26px] rounded-full text-[18px] font-formular-medium tracking-6">
            Quartely
          </p>
          <p className="bg-[#EBF8F3] text-[#1C7272] w-fit py-[15px] px-[26px] rounded-full text-[18px] font-formular-medium tracking-6">
            Bi-Annually
          </p>
        </span>
      </div>

      <section className="flex justify-center gap-6">
        {pricingPlans.map((plan, index) => (
          <div key={index} className="p-6 bg-[#F7F9FC] rounded-[16px] max-w-[400px] h-[412px]" style={{backgroundColor: plan.bg}}>
            <p className="text-[#1B2128] font-formular-bold text-[17px] leading-6">
              {plan.name}
            </p>
            <h2 className="text-[#1B2128] font-formular-bold text-[48px] leading-[52px] tracking-[-0.96px] mt-4">
             <span className='font-Utile-bold'>{plan.dollar}</span> {plan.price} <small className='text-[20px] font-formular-regular leading-6'>{plan.smallText}</small>
            </h2>
            <button className="w-full py-2 px-4 bg-transparent rounded-[8px] border border-[#495A6E] text-[#1B2128] font-formular-medium  text-[15px] leading-[20px] my-6 " style={{backgroundColor:plan.btnBg, color: plan.btntext}}>
              {plan.buttonText}
            </button>
            <hr />
            <ul className="mt-6">
              {plan.features.map((feature, featureIndex) => (
                <li key={featureIndex} className="flex gap-2">
                  <img src={Check} alt="" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
      <section className='mt-[109px]'></section>
    </div>
  );
};

export default Pricing;