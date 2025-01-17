import { Content } from '../contexts/ContentContext';

interface CopyrightOwnerClaimProps {
  details?: Content;
}

const CopyrightOwnerClaim: React.FC<CopyrightOwnerClaimProps> = ({
  details
}) => {
  const applyInputStyles =
    'shadow appearance-none border border-[#D7DCE0] rounded-[4px] w-full py-2 px-3 focus:bg-[#F4F5F6] focus:outline-transparent focus:shadow-outline text-[#98A2B3] font-inter font-normal leading-4 tracking-[0.4px] text-[16px]';
  const applyLabelStyles =
    'font-inter font-normal text-[14px] leading-4 tracking-[0.4px] text-[#3A434B] mb-2';
  const applyFormDiv = 'flex flex-col items-start mb-4 gap-10';
  return (
    <div className="flex flex-col mt-[60px]">
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="claimBasis" className={applyLabelStyles}>
            What is the basis of your claim?
          </label>
          <input
            name="claimBasis"
            
            placeholder={details?.claimBasis}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="claimingUser" className={applyLabelStyles}>
            Who is making the claim?
          </label>
          <input
            type="text"
            name="claimingUser"
            
            placeholder={details?.claimingUser}
            className={applyInputStyles}
          />
        </div>
      </div>
      <div className={applyFormDiv}>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="role" className={applyLabelStyles}>
            Role
          </label>
          <input
            name="role"
            
            placeholder={details?.role}
            className={applyInputStyles}
          />
        </div>
        <div className="w-[367px] flex flex-col gap-2 mb-4">
          <label htmlFor="percentClaim" className={applyLabelStyles}>
            Percentage Claim Share
          </label>
          <input
            type="number"
            name="percentClaim"
            
            placeholder={
              details?.percentClaim?.toString() || 'Composition and/or Masters'
            }
            className={applyInputStyles}
          />
        </div>
      </div>
    </div>
  );
};

export default CopyrightOwnerClaim;
