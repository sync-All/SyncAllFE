import { useParams } from "react-router-dom";

const MusicUploaderPublicProfile = () => {

  const { username } = useParams();
  return (
    <div>
      <h3>welcome to {username}'s Profile</h3>
    </div>
  );
}

export default MusicUploaderPublicProfile;
