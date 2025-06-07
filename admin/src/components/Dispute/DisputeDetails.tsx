import { ReactNode, useCallback, useEffect, useState } from 'react';
import Dropdown from '../../constants/Dropdown';
import DisputeResolve from '../../modals/DisputeResolve';
import ConfirmTransferOwnership from '../../modals/ConfirmTransferOwnership';
import { useDispute } from '../../contexts/DisputeContext';
import { useParams } from 'react-router-dom';
import LoadingAnimation from '../../constants/loading-animation';
import { toast } from 'react-toastify';
import axios, { AxiosError } from 'axios';
import Dot from '../../assets/images/dot.svg';
import { downloadFile } from '../../utils/filedownloader';
import getStatusColors from '../../helper/getStatusColors';

interface ResponseData {
  message: string;
}

interface Option {
  value: string;
  label: ReactNode;
}

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
}

const DisputeDetails = () => {
  const { id } = useParams();
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { dispute, loading } = useDispute();

  const parentDispute = dispute.find((d) =>
    d.associatedDisputes.some((ad) => ad._id === id)
  );

  const associatedDispute = parentDispute?.associatedDisputes.find(
    (ad) => ad._id === id
  );
  const user = parentDispute?.user;
  const disputeData = {
    ...associatedDispute,
    ...user,
  };
 

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();

    // Get time
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? 'PM' : 'AM';

    // Convert to 12-hour format
    hours = hours % 12 || 12;

    // Format minutes as two digits
    const formattedMinutes = minutes.toString().padStart(2, '0');

    return `${month} ${day}, ${year} ${hours}:${formattedMinutes} ${period}`;
  };

  const tdStyles =
    'px-4 py-3 text-[14px] text-[#667085] leading-[18px] font-inter font-normal border border-[#EAECF0]';
  const tdValueStyles =
    'px-4 py-3 text-black2 font-inter font-medium text-[14px] leading-[18px] text-left  border border-[#EAECF0] ';

  const handleAction = (action: string) => {
    if (action === 'Transfer Ownership') {
      setIsModalOpen(false); // Close first modal
      setIsConfirmationModalOpen(true); // Open confirmation modal
    } else {
      // Handle other actions
      console.log('Selected action:', action);
      setIsModalOpen(false);
    }
  };

  const handleConfirmTransfer = () => {
    // Handle the actual transfer logic here
    console.log('Transfer confirmed');
    setIsConfirmationModalOpen(false);
  };

  const changeStatus = async (newStatus: string) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/dispute/setstatus?status=${newStatus}&disputeId=${id}`;

    const config = {
      headers: {
        Authorization: `${token}`,
      },
    };

    try {
      const res = await axios.get(apiUrl, config);
      console.log(res.data);
      toast.success('Status updated successfully');
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

  const handleStatusChange = (option: Option) => {
    if (option.value === 'Resolved') {
      changeStatus('Resolved');
    }
  };

  const fetchAdmins = useCallback(async () => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/allAdmins`;

    try {
      setIsLoading(true);
      const res = await axios.get(apiUrl, {
        headers: { Authorization: `${token}` },
      });
      setAdmins(res.data.admins); // Access the admins array from response
    } catch (error: unknown) {
      const axiosError = error as AxiosError<ResponseData>;
      toast.error(
        (axiosError.response && axiosError.response.data
          ? axiosError.response.data.message || axiosError.response.data
          : axiosError.message || 'An error occurred'
        ).toString()
      );
      setAdmins([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const assignDispute = async (adminId: string) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/dispute/assign?adminId=${adminId}&disputeId=${id}`;

    try {
      await axios.get(apiUrl, {
        headers: { Authorization: `${token}` },
      });
      toast.success('Dispute assigned successfully');
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

  const requestAddtionalInfo = async (tickId: string, disputeId: string) => {
    const token = localStorage.getItem('token');
    const urlVar = import.meta.env.VITE_APP_API_URL;
    const apiUrl = `${urlVar}/dispute/requestAdditionalDocument?tickId=${tickId}&disputeId=${disputeId}`;

    try {
      await axios.get(apiUrl, {
        headers: { Authorization: `${token}` },
      });
      toast.success('Additional info requested successfully');
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

  const handleAdminChange = (option: Option) => {
    assignDispute(option.value);
  };

  useEffect(() => {
    fetchAdmins();
  }, [fetchAdmins]);

  const adminData = localStorage.getItem('adminData');
  const currentUserId = adminData ? JSON.parse(adminData)._id : null;
  console.log(currentUserId);
  const currentAdmin = admins.find((admin) => admin._id === currentUserId);

  const dropdownOptions: Option[] = admins.map((admin) => ({
    value: admin._id,
    label: admin.name,
  }));
  if (loading) {
    return <LoadingAnimation />;
  }

  if (isLoading) {
    return <LoadingAnimation />;
  }

  const truncateText = (text: string, length: number) => {
    if (text.length <= length) return text;
    return text.slice(0, length);
  };

  console.log(disputeData.status);

  return (
    <div className="lg:mx-8 ml-5 mt-[29px] mb-[96px]">
      <div className="flex items-center justify-between ">
        <div className="flex items-center gap-2.5">
          <h1 className="text-black2 text-[24px] font-inter font-semibold leading-6 tracking-[-0.96px]">
            Dispute ID:{' '}
            <span className="uppercase">
              D{truncateText(disputeData._id ?? '', 6)}
            </span>
          </h1>
          <span
            className={`${getStatusColors(disputeData.status || '').text} ${
              getStatusColors(disputeData.status || '').bg
            } font-inter font-medium text-[12px] leading-[18px] gap-[6px] px-[6px] flex items-center justify-center rounded-2xl w-fit`}
          >
            <div
              className={`${
                getStatusColors(disputeData.status || '').dot
              } w-2 h-2 rounded-full`}
            ></div>
            {disputeData.status}
          </span>
        </div>
        <div className="flex items-center gap-6 ">
          <div className="flex items-center gap-2 ">
            <p className="text-[14px] font-inter leading-5 text-[#344054] font-normal">
              Change Status:
            </p>
            <Dropdown
              options={[{ value: 'Resolved', label: 'Resolved' }]}
              onChange={handleStatusChange}
              placeholder={
                disputeData.status === 'Resolved' ? (
                  <span className="flex items-center gap-2">
                    <img src={Dot} alt="status dot" />
                    <span>Resolved</span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="8"
                      height="8"
                      viewBox="0 0 8 8"
                      fill="none"
                    >
                      <circle cx="4" cy="4" r="3" fill="#F3A218" />
                    </svg>
                    <span>Pending</span>
                  </span>
                )
              }
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-[14px] font-inter leading-5 text-[#344054] font-normal">
              Assign to Admin:
            </p>
            <Dropdown
              options={dropdownOptions}
              onChange={handleAdminChange}
              placeholder={
                <span className="text-[12px] font-inter leading-5 text-[#667185] font-normal flex items-center gap-2">
                  {currentAdmin?.name ?? 'Select Admin'}
                  {currentUserId === currentAdmin?._id ? ' (You)' : ''}
                </span>
              }
            />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mt-[60px] space-y-10">
        {disputeData?.status === 'Resolved' && (
          <div className="space-y-6 ">
            <div className="flex items-center">
              <h2 className="text-[18px] leading-7 font-inter font-normal ">
                Dispute Resolution Summary{' '}
              </h2>
              <span className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center uppercase flex bg-[#ECF7F7] rounded-2xl w-fit gap-[6px]">
                D{truncateText(disputeData._id ?? '', 6)}
              </span>
            </div>

            {/* Summary Details */}
            <div className=" rounded-md overflow-hidden">
              <table className="w-full">
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-[#F0F2F5]">
                    <td className={tdStyles}>Resolution Outcome</td>
                    <td className={tdValueStyles}>Ownership Transferred</td>
                  </tr>
                  <tr>
                    <td className={tdStyles}>Resolution Notes</td>
                    <td className={tdValueStyles}>
                      Ownership reassigned to {disputeData.name}
                    </td>
                  </tr>
                  <tr>
                    <td className={tdStyles}>Resolved By</td>
                    <td className={tdValueStyles}>
                      {disputeData.assignedTo?.name}
                    </td>
                  </tr>
                  <tr>
                    <td className={tdStyles}>Date Resolved</td>
                    <td className={tdValueStyles}>
                      {formatDate(disputeData.createdAt)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="space-y-6 ">
          <div className="flex items-center">
            <h2 className="text-[18px] leading-7 font-inter font-normal ">
              Dispute Summary
            </h2>
            <span className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl w-fit gap-[6px] uppercase">
              D{truncateText(disputeData._id ?? '', 6)}
            </span>
          </div>

          {/* Summary Details */}
          <div className=" rounded-md overflow-hidden">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-[#F0F2F5]">
                  <td className={tdStyles}>Dispute Reason</td>
                  <td className={tdValueStyles}>{disputeData?.issueType}</td>
                </tr>
                <tr>
                  <td className={tdStyles}>Filed By</td>
                  <td className={tdValueStyles}>{disputeData?.name}</td>
                </tr>
                <tr>
                  <td className={tdStyles}>Date Filed</td>
                  <td className={tdValueStyles}>
                    {formatDate(disputeData?.createdAt)}
                  </td>
                </tr>
                <tr>
                  <td className={tdStyles}>Customer Contact</td>
                  <td className={tdValueStyles}>{disputeData.email}</td>
                </tr>
                <tr>
                  <td className={tdStyles}>Associated Item</td>
                  <td className={tdValueStyles}>{disputeData.nameOfTrack}</td>
                </tr>
                <tr>
                  <td className={tdStyles}>Supporting Document</td>
                  <td className={tdValueStyles}>
                    <div className="flex items-center gap-2">
                      <span>{disputeData.nameOfTrack} support document</span>
                      <p
                        onClick={() => {
                          if (disputeData.supportingDoc) {
                            downloadFile(
                              disputeData.supportingDoc,
                              disputeData.supportingDocType === 'image/png'
                                ? 'image/png'
                                : 'application/pdf'
                            );
                          } else {
                            toast.error('No document available for download');
                          }
                        }}
                        className="text-blue-600 hover:underline text-sm"
                      >
                        (Download Here)
                      </p>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Log */}
        {disputeData?.activityLog?.length ?? 0 > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center">
              <h3 className="text-lg font-medium">Activity Log</h3>
              <button className="text-black2 text-[12px] font-formular-medium py-[2px] px-[8px] items-center flex bg-[#ECF7F7] rounded-2xl w-fit gap-[6px]">
                All Activity
              </button>
            </div>

            <div className="bg-white border rounded-md">
              <table className="w-full">
                <thead className="bg-[#F0F2F5]">
                  <tr>
                    <th className={tdValueStyles}>Date & Time</th>
                    <th className={tdValueStyles}>Action Taken</th>
                    <th className={tdValueStyles}>Performed By</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {disputeData.activityLog?.map((activity, index) => (
                    <tr key={index}>
                      <td className={tdStyles}>
                        {formatDate(activity.activityDate)}
                      </td>
                      <td className={tdStyles}>{activity.action_taken}</td>
                      <td className={tdStyles}>{activity.performedBy}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          ''
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 border rounded-md font-inter text-[#101828] hover:bg-gray-50"
            onClick={() => {
              if (associatedDispute?._id && parentDispute?.tickId) {
                requestAddtionalInfo(
                  parentDispute.tickId,
                  associatedDispute?._id
                );
              } else {
                toast.error('Dispute ID or Ticket ID is missing');
              }
            }}
          >
            Request Additional Document
          </button>
          <button
            className="px-4 py-2 bg-[#013131] text-white rounded-md active:scale-90"
            onClick={() => setIsModalOpen(true)}
          >
            Resolve Dispute
          </button>
        </div>
      </div>
      <DisputeResolve
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAction={handleAction}
      />
      <ConfirmTransferOwnership
        isOpen={isConfirmationModalOpen}
        onClose={() => setIsConfirmationModalOpen(false)}
        onConfirm={handleConfirmTransfer}
      />
    </div>
  );
};

export default DisputeDetails;
