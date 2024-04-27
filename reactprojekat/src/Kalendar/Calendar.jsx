import React, { useState } from 'react'; 

import Dogadjaj from './Dogadjaj';
import './Calendar.css';
import useDogadjaji from './useDogadjaji';


const Calendar = () => {
  const [dogadjaji, setDogadjaji] = useDogadjaji();
  const [trenutniDatum, setTrenutniDatum] = useState(new Date());
  const [pretraga, setPretraga] = useState('');
 

  const monday = new Date(trenutniDatum);
  monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));

  const daniNedelje = Array.from({ length: 7 }, (_, i) => {
    const dan = new Date(monday);
    dan.setDate(dan.getDate() + i);
    return dan;
  });

  const filtrirajDogadjajeZaDatum = (dogadjaji, datum) => {
    const dogadjajiZaDatum = [];
    for (let i = 0; i < dogadjaji.length; i++) {
      const datumDogadjaja = new Date(dogadjaji[i].datum);
      if (
        datumDogadjaja.getFullYear() === datum.getFullYear() &&
        datumDogadjaja.getMonth() === datum.getMonth() &&
        datumDogadjaja.getDate() === datum.getDate()
      ) {
        dogadjajiZaDatum.push(dogadjaji[i]);
      }
    }
    return dogadjajiZaDatum;
  };

  const sortirajDogadjajePoSatima = (dogadjaji) => {
    return dogadjaji.sort((a, b) => {
      const vremeA = new Date(`2000-01-01T${a.vreme_od}`);
      const vremeB = new Date(`2000-01-01T${b.vreme_od}`);
      return vremeA - vremeB;
    });
  };

  const handlePrethodnaNedelja = () => {
    const noviDatum = new Date(trenutniDatum);
    noviDatum.setDate(noviDatum.getDate() - 7);
    setTrenutniDatum(noviDatum);
  };

  const handleSledecaNedelja = () => {
    const noviDatum = new Date(trenutniDatum);
    noviDatum.setDate(noviDatum.getDate() + 7);
    setTrenutniDatum(noviDatum);
  };

  const handlePretragaChange = (e) => {
    setPretraga(e.target.value);
  };

  return (
    <>
      <div className="pagination">
        <button onClick={handlePrethodnaNedelja}>Prethodna nedelja</button>
        <button onClick={handleSledecaNedelja}>Sledeća nedelja</button>
        <input type="text" placeholder="Pretraži događaje" value={pretraga} onChange={handlePretragaChange} />
      </div>
      <div className="calendar">
        {daniNedelje.map((dan, index) => {
          const dogadjajiZaDan = filtrirajDogadjajeZaDatum(dogadjaji, dan);
          const sortiraniDogadjajiZaDan = sortirajDogadjajePoSatima(dogadjajiZaDan.filter(dogadjaj =>
            dogadjaj.naziv.toLowerCase().includes(pretraga.toLowerCase())
          ));
          return (
            <div key={index} className="day">
              <div className="header">
                {dan.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
              </div>
              <div className="events">
                {sortiraniDogadjajiZaDan.map((dogadjaj, dogadjajIndex) => (
                  <Dogadjaj key={dogadjajIndex} dogadjaj={dogadjaj} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Calendar;
