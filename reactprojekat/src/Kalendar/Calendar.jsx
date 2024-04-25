import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Dogadjaj from './Dogadjaj';
import './Calendar.css';
import useDogadjaji from './useDogadjaji';
const Calendar = () => {
  
    const [dogadjaji, setDogadjaji] = useDogadjaji();

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
        <div className="empty"></div> 
        {vremenskiOdeljci}
      </div>
      <div className="body">
      
        {dogadjaji.map(dogadjaj => (
          <Dogadjaj key={dogadjaj.id} dogadjaj={dogadjaj} />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
