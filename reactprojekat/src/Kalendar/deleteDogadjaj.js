import axios from 'axios';

const deleteDogadjaj = async (id) => {
  const token = sessionStorage.getItem('token');
  try {
    await axios.delete(`http://127.0.0.1:8000/api/dogadjaji/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    console.error('Failed to delete event', error);
  }
};

export default deleteDogadjaj;
