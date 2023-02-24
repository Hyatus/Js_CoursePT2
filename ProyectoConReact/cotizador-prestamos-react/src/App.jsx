import {useState} from 'react';
import Header from './components/Header'
import Button from './components/Button';


function App() {

  // Aquí deben ir los Hooks
  /*     *State      *Función que lo modifica */
  const [cantidad, setCantidad] = useState(10000);

  const MIN = 0;
  const MAX = 20000;
  const STEP = 100;

  /* Si la función está asociada a un evento se coloca "handle" */
  function handleChange(e){
    setCantidad(+e.target.value)
  }

  function handleClickDecremento(){
    // Ej: 10000 - 100
    const valor = cantidad - STEP;

    if(valor < MIN ){
      alert('Cantidad no Válida');
      return;
    }
    setCantidad(valor);
  }

  function handleClickAumento(){
        // Ej: 10000 + 100
        const valor = cantidad + STEP;
        if(valor > MAX){
          alert('Cantidad no Válida');
          return;
        }
        setCantidad(valor);
  }

  return (
      <div className="my-20 max-w-lg mx-auto bg-white shadow p-10">
         <Header />

         <div className="flex justify-between my-6">
          <Button 
            operador='-'
          />
          <Button 
            operador='+'
          />
         </div>

         <input className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'  
                type="range" 
                onChange={handleChange}      
                min={MIN}
                max={MAX}
                step={STEP}
                value={cantidad}
          />

          <p className="text-center my-10 text-5xl font-extrabold text-indigo-600">{cantidad}</p>

      </div>
  )
 
}

export default App
