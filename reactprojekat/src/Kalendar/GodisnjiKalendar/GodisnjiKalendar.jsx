import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MesecniKalendar from './MesecniKalendar';
import './GodisnjiKalendar.css';

const GodisnjiKalendar = () => {
  const [praznici, setPraznici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      const cachedHolidays = localStorage.getItem('praznici');
      const currentYear = new Date().getFullYear();
      
      if (cachedHolidays) {
        const parsedHolidays = JSON.parse(cachedHolidays);
        if (parsedHolidays.year === currentYear) {
          setPraznici(parsedHolidays.data);
          setLoading(false);
          return;
        }
      }

      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/holidays', {
          params: {
            country: 'RS', // Kod za Srbiju
            year: currentYear, // Trenutna godina
          },
          headers: {
            'X-Api-Key': '181QjUpNRZQGa5oA0ZA6PCeyG6U12QLvnh2D5sDW', 
          },
        });
        setPraznici(response.data);
        localStorage.setItem('praznici', JSON.stringify({ year: currentYear, data: response.data }));
        setLoading(false);
      } catch (error) {
        console.error('Greška prilikom dohvatanja praznika:', error);
        setLoading(false);
      }
    };

    fetchHolidays();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const godisnjiKalendar = [];
  for (let mesec = 0; mesec < 12; mesec++) {
    const mesecniPraznici = praznici.filter(praznik => new Date(praznik.date).getMonth() === mesec);
    const brojDanaUMesecu = new Date(new Date().getFullYear(), mesec + 1, 0).getDate();

    const nedelje = [];
    let danUMesecu = 1;
    while (danUMesecu <= brojDanaUMesecu) {
      const nedelja = [];
      for (let danUNedelji = 0; danUNedelji < 7; danUNedelji++) {
        if (danUMesecu <= brojDanaUMesecu) {
          const datum = new Date(new Date().getFullYear(), mesec, danUMesecu);
          const formattedDate = formatDate(datum);
          const prazniciZaDatum = mesecniPraznici.filter(praznik => praznik.date === formattedDate);
          nedelja.push({ datum, praznici: prazniciZaDatum });
          danUMesecu++;
        } else {
          nedelja.push(null);
        }
      }
      nedelje.push(nedelja);
    }
    godisnjiKalendar.push({ mesec: mesec + 1, nedelje });
  }

  return (
    <div className="godisnji-kalendar">
      {godisnjiKalendar.map((mesec, index) => (
        <MesecniKalendar key={index} mesec={mesec.mesec} nedelje={mesec.nedelje} />
      ))}
    </div>
  );
};

export default GodisnjiKalendar;
