import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Calendar';
import deleteDogadjaj from './deleteDogadjaj';   

const Dogadjaj = ({ dogadjaj, onDelete }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DOGADJAJ,
    item: { dogadjaj },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleDelete = async () => {
    await deleteDogadjaj(dogadjaj.id);
    onDelete(dogadjaj.id);  // Pozivanje funkcije onDelete za uklanjanje događaja iz lokalne memorije
  };

  return (
    <div ref={drag} className={`dogadjaj ${isDragging ? 'dragging' : ''}`}>
      <h4>{dogadjaj.naziv}</h4>
      <p>{dogadjaj.vreme_od} - {dogadjaj.vreme_do}</p>
      <button onClick={handleDelete}>Obriši</button>
    </div>
  );
};

export default Dogadjaj;
