import axios from 'axios';

const updateDogadjaj = async (dogadjaj) => {
  const token = sessionStorage.getItem('token');
  const updatedDogadjaj = {
    ...dogadjaj,
    user_id: dogadjaj.user_id || sessionStorage.getItem('user_id'),  
    kategorija_id: dogadjaj.kategorija_id || 1  
  };
  
  try {
    await axios.put(`http://127.0.0.1:8000/api/dogadjaji/${dogadjaj.id}`, updatedDogadjaj, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Failed to update event', error);
  }
};

export default updateDogadjaj;
