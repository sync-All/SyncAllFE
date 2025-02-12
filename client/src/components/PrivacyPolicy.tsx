import Navbar from './Navbar';
import Footer from './Footer';

const PrivacyPolicy = () => {
  const privacyPolicyMap = [
    {
      number: '1',
      title: 'INFORMATION WE COLLECT',
      content: [
        'We collect different types of information to improve our platform’s functionality and user experience. This includes:',
        'A. Personal Information:',
        'When you register, subscribe, or interact with our services, we may collect:',
        ' Full name',
        ' Email address',
        ' Phone number',
        ' Payment details (for transactions and licensing payments)',
        ' Username and password',
        ' Profile information (e.g., bio, social media links, preferences)',
        'B. Non-Personal Information:',
        'We may automatically collect:',
        ' IP address',
        ' Browser type and settings',
        ' Device type and operating system',
        ' Usage data (e.g., search history, interactions with content, licensing preferences)',
        'C. Cookies and Tracking Technologies:',
        'We use cookies and similar technologies to enhance user experience and improve our services. You can manage cookie settings through your browser.',
      ],
    },
    {
      number: '2',
      title: 'LEGAL BASIS FOR PROCESSING DATA',
      content: [
        'We process your data based on:',
        ' Contractual necessity: To provide services requested by you.',
        ' Legitimate interests: To enhance and secure our platform.',
        ' Legal obligations: To comply with regulatory requirements.',
        ' User consent: Where required for marketing, analytics, and cookie tracking.',
      ],
    },
    {
      number: '3',
      title: 'HOW WE USE YOUR INFORMATION',
      content: [
        'We use the collected data for the following purposes:',
        ' To provide and improve our services.',
        ' To personalize your user experience.',
        ' To process transactions and licensing agreements.',
        ' To allow licensors to search for music using keywords, artist names, and other criteria.',
        ' To communicate with you regarding updates, promotions, or security alerts.',
        ' To enforce our Terms of Use and prevent fraud.',
        ' To analyze platform usage and enhance functionality.',
        ' To facilitate automated recommendations based on search history and user behavior.',
      ],
    },
    {
      number: '4',
      title: 'HOW WE SHARE YOUR INFORMATION',
      content: [
        'We do not sell or rent your personal data. However, we may share information with:',
        ' Service Providers: Third-party vendors (e.g., payment processors, cloud storage providers) that help us operate our services.',
        ' Legal and Regulatory Authorities: If required by law, we may disclose data to comply with legal obligations or protect rights.',
        ' Business Transfers: In the event of a merger, acquisition, or sale, your data may be transferred as part of the business assets.',
        ' Marketing & Advertising Partners: With your consent, we may share limited data for promotional campaigns.',
      ],
    },
    {
      number: '5',
      title: 'DATA SECURITY & RETENTION',
      content: [
        'We implement industry-standard security measures to protect your personal data. However, no online transmission or storage system is completely secure. We encourage users to take precautions, such as using strong passwords and logging out after use.',
        'We retain your data for as long as necessary to:',
        ' Provide services to you',
        ' Comply with legal obligations.',
        ' Resolve disputes and enforce our agreements.',
      ],
    },
    {
      number: '6',
      title: 'YOUR RIGHTS & CHOICES',
      content: [
        'You have certain rights regarding your data, including:',
        ' Access & Correction: You may request access to or correction of your personal information.',
        ' Data Deletion: You can request deletion of your account and associated data, subject to legal requirements.',
        ' Marketing Preferences: You can opt out of promotional emails at any time.',
        ' Cookie & Tracking Preferences: You can manage or disable cookies through browser settings.',
        ' Objection to Processing: You can object to how we process your data under certain conditions.',
        'To exercise these rights, please contact us at info@syncallmusic.com.',
      ],
    },
    {
      number: '7',
      title: 'THIRD-PARTY LINKS & INTEGRATIONS',
      content: [
        'SyncAll may contain links to third-party websites or services. We are not responsible for their privacy practices. Please review their policies before providing personal information.',
      ],
    },
    {
      number: '8',
      title: 'AUTOMATED DECISION-MAKING & PROFILING',
      content: [
        'SyncAll may use automated tools to:',
        ' Recommend music selections based on search behavior.',
        ' Filter search results using AI-driven algorithms.',
        ' Prevent fraudulent activities. You can opt out of profiling by adjusting your account settings or contacting us.',
      ],
    },
    {
      number: '9',
      title: 'OPT-OUT MECHANISMS FOR PERSONALIZED ADVERTISING',
      content: [
        'We may use third-party advertising services to deliver personalized ads. You can opt out of personalized advertising by:',
        ' Adjusting your ad preferences in your account settings.',
        ' Managing cookie settings in your browser.',
        ' Using opt-out tools provided by ad networks (e.g., Google Ads, Facebook Ads settings).',
      ],
    },
    {
      number: '10',
      title: 'DATA BREACH NOTIFICATION POLICY',
      content: [
        'In the event of a data breach that may compromise your personal information, we will:',
        ' Investigate and assess the extent of the breach.',
        ' Notify affected users promptly if there is a significant risk.',
        ' Take necessary steps to mitigate further risks.',
        ' Report the breach to regulatory authorities where required by law.',
      ],
    },
    {
      number: '11',
      title: "CHILDREN'S PRIVACY",
      content: [
        'SyncAll is not intended for individuals under 18. We do not knowingly collect data from minors. If you believe a minor has provided information, please contact us to remove it.',
      ],
    },
    {
      number: '12',
      title: 'INTERNATIONAL DATA TRANSFERS',
      content: [
        'If you access SyncAll from outside Nigeria, your data may be transferred and processed in countries with different data protection laws. We take necessary measures to ensure your data is protected under applicable laws.',
      ],
    },
    {
      number: '13',
      title: 'CHANGES TO THIS PRIVACY POLICY',
      content: [
        'We may update this Privacy Policy periodically. Changes will be reflected with a revised "Last Updated" date. Your continued use of SyncAll after updates constitutes acceptance of the new policy.',
      ],
    },
    {
      number: '14',
      title: 'CONTACT US',
      content: [
        'If you have any questions about this Privacy Policy, please contact us at:',
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
      <div className="w-full flex items-center justify-center text-white pb-[250px]">
        <div className="w-full max-w-[800px] mt-[146px]">
          <div className="flex gap-6 flex-col">
            <h2 className="text-[64px] font-semibold font-inter leading-[80px] tracking-[-2.7px] uppercase text-[#F0F2F5]">
              PRIVACY POLICY
            </h2>
            <p className="font-inter text-[20px] leading-[32px] tracking-[-0.86px] text-[#CED2DA]">
              Effective date: 01/03/2025
            </p>
          </div>

          <div className="my-20 font-inter text-[24px] leading-[32px] tracking-[-0.86px] text-[#CED2DA]">
            Welcome to Syncall! Your privacy is important to us. This Privacy
            Policy outlines how we collect, use, disclose, and safeguard your
            personal information when you use our website and services. By
            accessing or using Syncall, you agree to the terms outlined in this
            policy.
          </div>

          <ul className="list-none mb-8">
            {privacyPolicyMap.map((term, index) => (
              <li key={index} className="mb-6">
                <h3 className="font-inter text-[24px] font-bold leading-[32px] tracking-[-0.86px] text-[#CED2DA]">
                  {term.number}. {term.title}
                </h3>
                <ul className="font-inter text-[24px] leading-[32px] tracking-[-0.86px] text-[#CED2DA] ml-8 mt-6">
                  {term.content.map((point, index) => (
                    <li
                      key={index}
                      className={
                        point.startsWith('A.') ||
                        point.startsWith('B.') ||
                        point.startsWith('C.')
                          ? 'list-none font-bold my-6 ml-[-24px]'
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
          <p className="font-inter text-[24px] leading-[32px] tracking-[-0.86px] text-[#CED2DA] list-disc mt-6">
            Thank you for using Syncall!
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
