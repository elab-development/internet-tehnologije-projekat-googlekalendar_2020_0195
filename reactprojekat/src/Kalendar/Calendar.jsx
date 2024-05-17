import React, { useState } from 'react'; 
import { useDrag, useDrop, DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import Dogadjaj from './Dogadjaj';
import './Calendar.css';
import useDogadjaji from './useDogadjaji';
import updateDogadjaj from './updateDogadjaj';
import deleteDogadjaj from './deleteDogadjaj';  

export const ItemTypes = {
  DOGADJAJ: 'dogadjaj'
};

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

  const moveDogadjaj = (dogadjaj, noviDatum) => {
    const updatedDogadjaj = {
      ...dogadjaj,
      datum: noviDatum.toISOString().split('T')[0],
      kategorija_id: dogadjaj.kategorija_id || 1,
    };
    updateDogadjaj(updatedDogadjaj).then(() => {
      setDogadjaji(prev => prev.map(d => d.id === dogadjaj.id ? updatedDogadjaj : d));
    });
  };

  const handleDeleteDogadjaj = (id) => {
    setDogadjaji(prev => prev.filter(d => d.id !== id));
  };

  const handleDownloadPDF = async () => {
    const input = document.getElementById('pdf-content');
    const canvas = await html2canvas(input);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('landscape', 'mm', 'a4');
    const imgWidth = 297;
    const pageHeight = 210;
    const imgHeight = canvas.height * imgWidth / canvas.width;
    const heightLeft = imgHeight;

    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    position = heightLeft - pageHeight;

    while (position >= 0) {
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      position -= pageHeight;
    }

    pdf.save('raspored.pdf');
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="pagination">
        <button onClick={handlePrethodnaNedelja}>Prethodna nedelja</button>
        <button onClick={handleSledecaNedelja}>Sledeća nedelja</button>
        <input type="text" placeholder="Pretraži događaje" value={pretraga} onChange={handlePretragaChange} />
        <button onClick={handleDownloadPDF}>Preuzmi PDF</button> {/* Dodato dugme za preuzimanje PDF-a */}
      </div>
      <div className="calendar" id="pdf-content"> {/* Dodato id za sadržaj koji će se pretvoriti u PDF */}
        {daniNedelje.map((dan, index) => {
          const dogadjajiZaDan = filtrirajDogadjajeZaDatum(dogadjaji, dan);
          const sortiraniDogadjajiZaDan = sortirajDogadjajePoSatima(dogadjajiZaDan.filter(dogadjaj =>
            dogadjaj.naziv.toLowerCase().includes(pretraga.toLowerCase())
          ));
          return (
            <Day key={index} dan={dan} moveDogadjaj={moveDogadjaj}>
              <div className="header">
                {dan.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'numeric', day: 'numeric' })}
              </div>
              <div className="events">
                {sortiraniDogadjajiZaDan.map((dogadjaj, dogadjajIndex) => (
                  <Dogadjaj key={dogadjajIndex} dogadjaj={dogadjaj} onDelete={handleDeleteDogadjaj} />
                ))}
              </div>
            </Day>
          );
        })}
      </div>
    </DndProvider>
  );
};

const Day = ({ dan, moveDogadjaj, children }) => {
  const [{ isOver }, drop] = useDrop({
    accept: ItemTypes.DOGADJAJ,
    drop: (item) => moveDogadjaj(item.dogadjaj, dan),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className={`day ${isOver ? 'over' : ''}`}>
      {children}
    </div>
  );
};

export default Calendar;
