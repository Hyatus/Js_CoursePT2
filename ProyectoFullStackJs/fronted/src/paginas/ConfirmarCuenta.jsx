import {useParams, Link} from 'react-router-dom';
import { useEffect, useState } from 'react';
// import axios from 'axios'; -> ClienteAxios lo reemplaza
import Alerta from '../components/alerta';
import clienteAxios from '../../config/axios';

const ConfirmarCuenta = () => {
  const params = useParams();

  const {id} = params;
  // envia la alerta si se confirmó o no 
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  // estará esperando la respuesta del backend
  const [cargando, setCargando ] = useState(true);
  // useState para la alerta
  const [alerta, setAlerta] = useState({});

  useEffect(()=>{
     const confirmarCuenta = async() =>{

        try {
          const url = `/veterinarios/confirmar/${id}`;
          const {data} = await clienteAxios(url);
          // La cuenta fue confirmada correctamente
          setCuentaConfirmada(true);
          
          setAlerta({
            msg: data.msg
          })


        } catch (error) {
           setAlerta({msg: error.response.data.msg,
            error:true})
        }

        setCargando(false);
     }
     confirmarCuenta();
  },[])

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Confirma tu cuenta y comienza a administrar tus <span className="text-black">pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
              {/* Cuando cargando sea false entonces muestra la alerta */}
              {!cargando && 
              <Alerta 
                alerta={alerta}
              />}

              {cuentaConfirmada && (
                 <Link to="/"
                 className='block text-center my-5 text-gray-500'>Iniciar Sesión</Link>
         
              )}
               
        </div>
    </>
  )
}

export default ConfirmarCuenta