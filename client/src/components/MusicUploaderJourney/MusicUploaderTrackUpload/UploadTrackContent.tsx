// import React, { useState, ChangeEvent, FormEvent } from 'react';
// import MinimumRecordingInfo from './MinimumRecordingInfo';
// import AdditionalRecordingInfo from './AdditionalRecordingInfo';
// import CopyrightOwnerClaim from './CopyrightOwnerClaim';

// interface FormData {
//   mainArtist: string;
//   featuredArtist: string[];
//   releaseType: string;
//   releaseTitle: string;
//   trackTitle: string;
//   trackLink: string;
//   upc: string;
//   isrc: string;
//   genre: string;
//   artWork: File | null;
// }

// const initialFormData: FormData = {
//   mainArtist: '',
//   featuredArtist: [],
//   releaseType: '',
//   releaseTitle: '',
//   trackTitle: '',
//   trackLink: '',
//   upc: '',
//   isrc: '',
//   genre: '',
//   artWork: null,
// };

// const UploadTrackMultiForm: React.FC = () => {
//   const [currentSection, setCurrentSection] = useState<string>(
//     'Minimum Recording Information'
//   );
//   const [formData, setFormData] = useState<FormData>(initialFormData);

//   const liClass =
//     'text-[#81909D] font-formular-regular text-[14px] font-normal font-medium leading-[16px] tracking-[0.028px] py-4';
//   const activeLiClass = 'border-b border-[#013131] text-[#013131]';

//   const handleChange = (
//     e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));
//   };

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       artWork: e.target.files ? e.target.files[0] : null,
//     }));
//   };

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     console.log(formData);
//   };

//   const renderSection = () => {
//     switch (currentSection) {
//       case 'Minimum Recording Information':
//         return (
//           <MinimumRecordingInfo
//             formData={formData}
//             handleChange={handleChange}
//             handleFileChange={handleFileChange}
//           />
//         );
//       case 'Additional Recording Information':
//         return (
//           <AdditionalRecordingInfo
//             formData={formData}
//             handleChange={handleChange}
//           />
//         );
//       case 'Copyright Owner Claim':
//         return (
//           <CopyrightOwnerClaim
//             formData={formData}
//             handleChange={handleChange}
//             handleFileChange={handleFileChange}
//           />
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="lg:mx-8">
//       <div>
//         <span className="flex gap-2">
//           <h2 className="text-[#101828] text-[18px] font-formular-medium leading-[28px]">
//             New Track Upload
//           </h2>
//           <p className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl">
//             Track Details
//           </p>
//         </span>
//         <p className="text-[#667085] font-formular-regular text-[14px] leading-5">
//           Upload your track for distribution and licensing.
//         </p>
//       </div>
//       <nav className="mt-8">
//         <ul className="flex gap-8">
//           <li
//             className={`${liClass} ${
//               currentSection === 'Minimum Recording Information'
//                 ? activeLiClass
//                 : ''
//             }`}
//             onClick={() => setCurrentSection('Minimum Recording Information')}
//           >
//             Minimum Recording Information
//           </li>
//           <li
//             className={`${liClass} ${
//               currentSection === 'Additional Recording Information'
//                 ? activeLiClass
//                 : ''
//             }`}
//             onClick={() =>
//               setCurrentSection('Additional Recording Information')
//             }
//           >
//             Additional Recording Information
//           </li>
//           <li
//             className={`${liClass} ${
//               currentSection === 'Copyright Owner Claim' ? activeLiClass : ''
//             }`}
//             onClick={() => setCurrentSection('Copyright Owner Claim')}
//           >
//             Copyright Owner Claim
//           </li>
//         </ul>
//       </nav>
//       <form onSubmit={handleSubmit}>
//         {renderSection()}
//         <div className="buttons">
//           {currentSection !== 'Minimum Recording Information' && (
//             <button
//               type="button"
//               onClick={() => setCurrentSection('Minimum Recording Information')}
//             >
//               Previous
//             </button>
//           )}
//           {currentSection !== 'Copyright Owner Claim' && (
//             <button
//               type="button"
//               onClick={() => setCurrentSection('Copyright Owner Claim')}
//             >
//               Next
//             </button>
//           )}
//           {currentSection === 'Copyright Owner Claim' && (
//             <button type="submit">Submit</button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default UploadTrackMultiForm;
