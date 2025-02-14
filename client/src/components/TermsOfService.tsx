import Footer from './Footer';
import Navbar from './Navbar';

const TermsOfService = () => {
  const termsMap = [
    {
      number: '1',
      title: 'DEFINITIONS',
      content: [
        '"SyncAll" refers to the SyncAll platform, including its website and services.',
        '"User" refers to any individual or entity accessing or using SyncAll.',
        '"Licensor" refers to content owners who upload and license their music.',
        '"Licensee" refers to users who search for and obtain licenses to use music.',
        '"Content" refers to any music, audio, metadata, or other materials uploaded to SyncAll.',
      ],
    },
    {
      number: '2',
      title: 'ACCEPTANCE OF TERMS',
      content: [
        'By using SyncAll, you confirm that you are at least 18 years old or have obtained parental consent if required.',
        'You agree to comply with these Terms and all applicable laws and regulations.',
      ],
    },
    {
      number: '3',
      title: 'ACCOUNT REGISTRATION & SECURITY',
      content: [
        'To access certain features, you must create an account.',
        'You are responsible for maintaining the confidentiality of your login credentials.',
        'You agree to notify us immediately if you suspect unauthorized access to your account.',
        'We reserve the right to suspend or terminate accounts found violating these Terms.',
      ],
    },
    {
      number: '4',
      title: 'USE OF SERVICES',
      content: [
        'You may use SyncAll for lawful purposes only.',
        'You must not engage in unauthorized copying, distribution, or sublicensing of content.',
        'You agree not to interfere with the platform’s functionality or security.',
        'SyncAll reserves the right to modify or discontinue any part of the service at any time.',
      ],
    },
    {
      number: '5',
      title: 'CONTENT & INTELLECTUAL PROPERTY',
      content: [
        'A. Licensor Rights & Responsibilities',
        'By uploading content, you grant SyncAll a non-exclusive, worldwide license to distribute and display your content.',
        'You affirm that you own or have the necessary rights to license all uploaded content.',
        'You must not upload content that infringes any third-party rights or contains unlawful material.',
        'B. Licensee Rights & Responsibilities',
        'Licensees may use licensed music as permitted under the terms of their agreements.',
        'Unauthorized distribution or resale of licensed content is strictly prohibited.',
        'SyncAll does not guarantee the suitability of content for specific purposes.',
      ],
    },
    {
      number: '6',
      title: 'PAYMENTS & TRANSACTIONS',
      content: [
        'Payments for licensing and other services must be made through authorized payment channels.',
        'All transactions are final, and refunds are only issued in cases of unauthorized charges or system errors.',
        'SyncAll reserves the right to adjust pricing and fees at its discretion.',
      ],
    },
    {
      number: '7',
      title: 'PRIVACY & DATA PROTECTION',
      content: [
        'By using SyncAll, you consent to the collection and use of your data as described in our Privacy Policy.',
        'We implement security measures to protect user data, but we cannot guarantee absolute security.',
        'Users are responsible for ensuring their data is accurate and up to date.',
      ],
    },
    {
      number: '8',
      title: 'RESTRICTIONS & PROHIBITED CONDUCT',
      content: [
        'Users must not use SyncAll for any illegal or fraudulent activities.',
        'Harassment, abusive behavior, and hate speech are strictly prohibited.',
        'Reverse engineering, hacking, or attempting to bypass security features is not allowed.',
        'Any violation of these rules may result in account suspension or legal action.',
      ],
    },
    {
      number: '9',
      title: 'TERMINATION OF SERVICE',
      content: [
        'SyncAll reserves the right to suspend or terminate accounts without prior notice for violations of these Terms.',
        'Users may delete their accounts at any time, but obligations incurred before termination remain in effect.',
      ],
    },
    {
      number: '10',
      title: 'DISCLAIMERS & LIMITATION OF LIABILITY',
      content: [
        'SyncAll provides its services "as is" without warranties of any kind.',
        'We are not responsible for any loss of data, business interruptions, or damages resulting from platform use.',
        'SyncAll is not liable for third-party content or external links provided on the platform.',
      ],
    },
    {
      number: '11',
      title: 'DISPUTE RESOLUTION',
      content: [
        'Any disputes arising from these Terms will be resolved through mediation or arbitration in Nigeria.',
        'Users waive the right to participate in class-action lawsuits against SyncAll.',
      ],
    },
    {
      number: '12',
      title: 'CHANGES TO TERMS',
      content: [
        'SyncAll may update these Terms at any time. Continued use of the platform after updates constitutes acceptance of the revised Terms.',
      ],
    },
    {
      number: '13',
      title: 'CONTACT INFORMATION',
      content: [
        'For any questions or concerns regarding these Terms, contact us at:',
        'SyncAll Support Team',
        'Email: info@syncalmusic.com',
        'Business Address: 19A Akin Osiyemi Street Off Allen Avenue, Ikeja, Lagos State, Nigeria.',
        'Phone Number: +2348121912877',
        
      ],
    },
  ];

  return (
    <div className="bg-black text-white">
      <Navbar />
      <div className="w-full flex items-center justify-center text-white pb-[100px] px-4 md:px-8 lg:px-16">
        <div className="w-full max-w-[800px] mt-[60px] md:mt-[80px] lg:mt-[100px]">
          <div className="flex gap-6 flex-col">
            <h2 className="text-[32px] md:text-[48px] lg:text-[64px] font-semibold font-inter leading-[40px] md:leading-[60px] lg:leading-[80px] tracking-[-1.5px] md:tracking-[-2px] lg:tracking-[-2.7px] uppercase text-[#F0F2F5]">
              Terms of Use
            </h2>
            <p className="font-inter text-[16px] md:text-[18px] lg:text-[20px] leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.5px] md:tracking-[-0.7px] lg:tracking-[-0.86px] text-[#CED2DA]">
              Effective date: 01/03/2025
            </p>
          </div>

          <div className="my-10 md:my-16 lg:my-20 font-inter text-[16px] md:text-[20px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.5px] md:tracking-[-0.7px] lg:tracking-[-0.86px] text-[#CED2DA]">
            Welcome to SyncAll! These Terms of Use govern your access to and use
            of the SyncAll website and services. By using SyncAll, you agree to
            be bound by these Terms. If you do not agree, please do not use our
            services.
          </div>

          <ul className="list-none mb-8">
            {termsMap.map((term, index) => (
              <li key={index} className="mb-6">
                <h3 className="font-inter text-[16px] md:text-[20px] lg:text-[24px] font-bold leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.5px] md:tracking-[-0.7px] lg:tracking-[-0.86px] text-[#CED2DA]">
                  {term.number}. {term.title}
                </h3>
                <ul className="font-inter text-[16px] md:text-[20px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.5px] md:tracking-[-0.7px] lg:tracking-[-0.86px] text-[#CED2DA] ml-4 md:ml-6 lg:ml-8 mt-4 md:mt-5 lg:mt-6">
                  {term.content.map((point, index) => (
                    <li
                      key={index}
                      className={
                        point.startsWith('A.') ||
                        point.startsWith('B.') ||
                        point.startsWith('C.')
                          ? 'list-none font-bold my-4 md:my-5 lg:my-6 ml-[-16px] md:ml-[-20px] lg:ml-[-24px]'
                          : 'list-disc'
                      }
                    >
                      {point}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
          <p className="font-inter text-[16px] md:text-[20px] lg:text-[24px] leading-[24px] md:leading-[28px] lg:leading-[32px] tracking-[-0.5px] md:tracking-[-0.7px] lg:tracking-[-0.86px] text-[#CED2DA] list-disc mt-4 md:mt-5 lg:mt-6">
            By using SyncAll, you acknowledge that you have read, understood,
            and agreed to these Terms of Use.
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;
