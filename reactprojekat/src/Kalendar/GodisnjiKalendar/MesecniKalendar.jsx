import React from 'react';

const MesecniKalendar = ({ mesec, nedelje }) => {
  return (
    <div className="mesec">
      <h2>{new Date(1, mesec - 1, 1).toLocaleString('default', { month: 'long' })}</h2>
      <table>
        <tbody>
          {nedelje.map((nedelja, index) => (
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
  );
};

export default MesecniKalendar;
