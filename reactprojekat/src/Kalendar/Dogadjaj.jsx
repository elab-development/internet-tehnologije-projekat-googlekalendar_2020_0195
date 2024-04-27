import React, { useState, useEffect } from 'react';
 

const Dogadjaj = ({ dogadjaj }) => (
  <div className="dogadjaj">
    <div>{dogadjaj.naziv}</div>
    {/* <div>{dogadjaj.datum}</div> */}
    <div>{dogadjaj.vreme_od} - {dogadjaj.vreme_do}</div>
    {/* <div>{dogadjaj.opis}</div> */}
  </div>
);

export default Dogadjaj;