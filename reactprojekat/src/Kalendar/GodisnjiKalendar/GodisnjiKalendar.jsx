import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './GodisnjiKalendar.css';

const GodisnjiKalendar = () => {
  const [praznici, setPraznici] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get('https://api.api-ninjas.com/v1/holidays', {
          params: {
            country: 'RS', // Kod za Srbiju
            year: new Date().getFullYear(), // Trenutna godina
          },
          headers: {
            'X-Api-Key': 'wldJVqp8aBoYHEhst6oQmXwRKc0gM0Dh7yXYkcge', 
          },
        });
        setPraznici(response.data);
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

  // Funkcija za kreiranje datuma sa formatom "YYYY-MM-DD"
  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  // Kreiranje prazničnog kalendara za celu godinu
  const godisnjiKalendar = [];

  // Iteracija kroz sve mesece u godini
  for (let mesec = 0; mesec < 12; mesec++) {
    const mesecniPraznici = praznici.filter(praznik => new Date(praznik.date).getMonth() === mesec);
    const brojDanaUMesecu = new Date(new Date().getFullYear(), mesec + 1, 0).getDate();

    const nedelje = [];
    let danUMesecu = 1;

    // Iteracija kroz nedelje u mesecu
    while (danUMesecu <= brojDanaUMesecu) {
      const nedelja = [];
      // Iteracija kroz dane nedelje
      for (let danUNedelji = 0; danUNedelji < 7; danUNedelji++) {
        if (danUMesecu <= brojDanaUMesecu) {
          const datum = new Date(new Date().getFullYear(), mesec, danUMesecu);
          const formattedDate = formatDate(datum);
          const prazniciZaDatum = mesecniPraznici.filter(praznik => praznik.date === formattedDate);
          nedelja.push({ datum, praznici: prazniciZaDatum });
          danUMesecu++;
        } else {
          nedelja.push(null); // Dodaj null vrednost za prazna polja na kraju meseca
        }
      }
      nedelje.push(nedelja);
    }
    godisnjiKalendar.push({ mesec: mesec + 1, nedelje });
  }

  return (
    <div className="godisnji-kalendar">
      {godisnjiKalendar.map((mesec, index) => (
        <div key={index} className="mesec">
        <h2>{new Date(1, mesec.mesec-1, 1).toLocaleString('default', { month: 'long' })}</h2>

          <table>
           
            <tbody>
              {mesec.nedelje.map((nedelja, index) => (
                <tr key={index}>
                  {nedelja.map((dan, index) => (
                    <td key={index}>
                      {dan && (
                        <>
                          <div className="datum">{dan.datum.getDate()}</div>
                          <div className="praznici">
                            {dan.praznici.map((praznik, index) => (
                              <div key={index} className="praznik">
                                {praznik.name}
                              </div>
                            ))}
                          </div>
                        </>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default GodisnjiKalendar;
