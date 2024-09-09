import axios from 'axios';
import { useEffect, useState } from 'react';

const VerifyId = (id: string) => {
  const [idValid, setIdValid] = useState(false);
  useEffect(() => {
    const fetchTrackDetails = async () => {
      const token = localStorage.getItem('token');
      const urlVar = import.meta.env.VITE_APP_API_URL;
      const apiUrl = `${urlVar}/queryTrackInfo/${id}`;
      const config = {
        headers: {
          Authorization: `${token}`,
        },
      };

      try {
        await axios.get(apiUrl, config);
        setIdValid(true);
      } catch (error: unknown) {
        setIdValid(false);
      }
    };
    fetchTrackDetails();
  }, [id]);
  return idValid;
};

export default VerifyId;
