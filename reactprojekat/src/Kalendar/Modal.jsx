import React, { useState } from 'react';
import axios from 'axios';
 import './Modal.css';
const Modal = ( ) => {
  const [formData, setFormData] = useState({
    datum: '',
    vreme_od: '',
    vreme_do: '',
    naziv: '',
    opis: '',
    status: 'zavrseno',
    kategorija_id: '1'  //za seminarski cemo dodati komboboxx da moze da bira korisnik kategoriju
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/dogadjaji', formData, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`
        }
      });
      console.log('Response:', response.data);
       alert("USPESNO KREIRANO")
     
    } catch (error) {
      console.error('Error:', error);
     
      alert(error)
    }
  };

  return (
    
      <div className="modal-content">
       
        <h2>Kreiraj novi događaj</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="datum">Datum:</label>
          <input type="date" id="datum" name="datum" value={formData.datum} onChange={handleChange} required />
          <label htmlFor="vreme_od">Vreme početka:</label>
          <input type="time" id="vreme_od" name="vreme_od" value={formData.vreme_od} onChange={handleChange} required />
          <label htmlFor="vreme_do">Vreme završetka:</label>
          <input type="time" id="vreme_do" name="vreme_do" value={formData.vreme_do} onChange={handleChange} required />
          <label htmlFor="naziv">Naziv:</label>
          <input type="text" id="naziv" name="naziv" value={formData.naziv} onChange={handleChange} required />
          <label htmlFor="opis">Opis:</label>
          <textarea id="opis" name="opis" value={formData.opis} onChange={handleChange} required />
          <label htmlFor="status">Status:</label>
          <select id="status" name="status" value={formData.status} onChange={handleChange} required>
            <option value="zavrseno">Završeno</option>
            <option value="odlozeno">Odlagano</option>
            <option value="otkazano">Otkazano</option>
            <option value="u_toku">U toku</option>
            <option value="zakazano">Zakazano</option>
          </select>
         
          <button type="submit">Kreiraj događaj</button>
        </form>
      </div>
  
  );
};

export default Modal;
