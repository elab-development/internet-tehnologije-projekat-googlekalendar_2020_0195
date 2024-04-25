import axios from 'axios';
import React, { useState, useEffect } from 'react';
const useDogadjaji = () => {
    const [dogadjaji, setDogadjaji] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
       
        const config = {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        };
  
        try {
          const result = await axios.get('http://127.0.0.1:8000/api/dogadjaji', config);
          setDogadjaji(result.data.data);
        } catch (error) {
          console.error('Došlo je do greške prilikom dohvatanja događaja', error);
        }
      };
  
      fetchData();
    }, []);
  
    return [dogadjaji, setDogadjaji];  
  };

  export default useDogadjaji;