import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dogadjaj from './Dogadjaj';
import './Calendar.css';
const Calendar = () => {
  const [dogadjaji, setDogadjaji] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      // Ako token postoji, dodajte ga u zaglavlje zahteva
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

  // Kreiranje vremenskih odeljaka od 8 ujutru do 22 uvece
  const vremenskiOdeljci = [];
  for (let i = 8; i <= 22; i++) {
    vremenskiOdeljci.push(
      <div key={i} className="vremenski-odeljak">
        {i}:00
      </div>
    );
  }

  return (
    <div className="calendar">
      <div className="header">
        <div className="empty"></div> {/* Prvi red se popunjava datumima */}
        {vremenskiOdeljci}
      </div>
      <div className="body">
        {/* Prikaz događaja po danima i satima */}
        {dogadjaji.map(dogadjaj => (
          <Dogadjaj key={dogadjaj.id} dogadjaj={dogadjaj} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
