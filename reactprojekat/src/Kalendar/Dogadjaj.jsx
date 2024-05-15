import React from 'react';
import { useDrag } from 'react-dnd';
import { ItemTypes } from './Calendar';   

const Dogadjaj = ({ dogadjaj }) => {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.DOGADJAJ,
    item: { dogadjaj },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div ref={drag} className={`dogadjaj ${isDragging ? 'dragging' : ''}`}>
      <h4>{dogadjaj.naziv}</h4>
      <p>{dogadjaj.vreme_od} - {dogadjaj.vreme_do}</p>
    </div>
  );
};

export default Dogadjaj;
