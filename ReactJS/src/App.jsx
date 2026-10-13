import { use, useState } from 'react'
import './App.css'
import errorIcon from './assets/error.png'

function App() {
  const [count, setCount] = useState(0)
  const [waga, setWaga] = useState('');
  const [wzrost, setWzrost] = useState('');

  const [wagaWynik, setWagaWynik] = useState(0);
  const [wzrostWynik, setWzrostWynik] = useState(0);
  const [popupy, setPopupy] = useState([]);

  function ObliczBMI() {
    if (waga > 0 && wzrost > 0 ) {
      setWagaWynik(waga)
      setWzrostWynik(wzrost)
    } else {
        const id = crypto.randomUUID();

        setPopupy((poprzednie) => [
          ...poprzednie,
          { id }
        ]);

        setTimeout(() => {
          setPopupy((poprzednie) =>
            poprzednie.filter((popup) => popup.id !== id)
          );
        }, 4000);
    }
}

// const wynik = warunek ? wartoscJesliTrue : wartoscJesliFalse;

  const BMI = wagaWynik > 0 && wzrostWynik > 0
    ? wagaWynik / (wzrostWynik / 100) ** 2
    : 0;

  let KolorBMI = '';
  let NazwaBMI = '';
  let ZakresBMI = '';

  if(BMI > 0 && BMI < 18.5) {
    KolorBMI = "var(--niedowaga)";
    NazwaBMI = "Niedowaga";
    ZakresBMI = "Poniżej 18.5"
  }
  else if(BMI >= 18.5 && BMI < 25) {
    KolorBMI = "var(--norma)";
    NazwaBMI = "Norma";
    ZakresBMI = "18.5 - 24.9"
  }
  else if(BMI >= 25 && BMI < 30) {
    KolorBMI = "var(--nadwaga)";
    NazwaBMI = "Nadwaga";
    ZakresBMI = "25 - 29.9"
  }
  else if(BMI >=30) {
    KolorBMI = "var(--otyłość)";
    NazwaBMI = "Otyłość";
    ZakresBMI = "30 i więcej"
  }

  const szerokoscBMI = Math.min((BMI / 50) * 100, 100);

  return (
    <>
      <div className="Title">
        <h1>Kalkulator BMI</h1>
      </div>
      <div className="Calculator">
        <div className='Calculator-Inputs'>
          <label className="Calc-label" htmlFor="weight">Waga (kg)</label>
          <input 
          type="number" 
          placeholder="np. 70.5"
          className="Calc-Input"
          value={waga}
          onChange={(e) => setWaga(e.target.value)}
          />
          <label className="Calc-label" htmlFor="height">Wzrost (cm)</label>
          <input 
          type="number" 
          placeholder="np. 175"
          className="Calc-Input"
          value={wzrost}
          onChange={(e) => setWzrost(e.target.value)}
          />
          <button onClick={ObliczBMI} className='Calc-Button'>Oblicz</button>
        </div>
        <div className="Result">
          <div className='BMI-Bar'>
            <div
              className='BMI-Value' 
              style={{
                width: `${szerokoscBMI}%`,
                background: KolorBMI
              }}
            >
            </div>
          </div>
          <div className='BMI-Description'>
            <h3>BMI: <p style={{color: KolorBMI}}>{BMI.toFixed(2)}</p></h3>
            <h3>{NazwaBMI} <p style={{color: KolorBMI}}>{ZakresBMI}</p></h3>
          </div>
        </div>
        <div className="popup-column">
          {popupy.map((popup) => (
            <div className="popup" key={popup.id}>
              Niepoprawne dane!
              <img
                src={errorIcon}
                alt="Error"
                style={{ width: '25px', height: '25px' }}
              />
            </div>
          ))}
        </div>
      </div>
      
    </>
  )
}

export default App
