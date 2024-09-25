import Placeholder from '../../assets/images/placeholder.png';

interface User {
  _id: string;
  fullName: string;
  name: string;
  email: string;
  status: string;
  role: string;
}
interface SingleUserPageProps {
  user: User;
}




const SingleUserPage: React.FC<SingleUserPageProps> = ({ user }) => {
  if (!user) {
    return <p>No user selected.</p>; // Display this if no user is selected
  }
  return (
    <div>
      <p>Manage Users &gt; User Information</p>
      <h2>Music Uploader</h2>
      <div className="flex items-center gap-[32px] ml-3 lg:ml-12">
        <img
          src={Placeholder}
          alt=""
          className="h-[145px] w-[145px] rounded-[50%] object-cover"
        />
        <span className="">
          <h1 className="poppins-semibold text-[24px] leading-normal text-[#1D2739] ">
            {user.name}
          </h1>
          <p className="text-[16px] poppins-regular leading-normal tetx-[#667185] opacity-60">
            {' '}
            {/* {profileDetails?.email} */} Tom
          </p>
        </span>
      </div>
    </div>
  );
};

export default SingleUserPage;
