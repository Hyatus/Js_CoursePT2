import {Link} from 'react-router-dom';
import { useState } from 'react';

/** Crearemos un State por cada uno de los campos **/

const [nombre, setNombre ] = useState('');
const [email, setEmail ] = useState('');
const [password, setPassword ] = useState('');
const [repetirPassword, setRepetirPassword ] = useState('');

const Registrar = () => {
  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Crea tu cuenta y administra tus  <span className="text-black">pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
              <form >
                <div className="my-5">
                  <label 
                   className="uppercase text-gray-600 block text-xl font-bold"
                  >Nombre</label>
                  <input type="text" 
                         placeholder="Tu nombre"
                         className="border w-full p-3 bg-gray-50 rounded-xl "
                         value={nombre}
                         onchange={e = setNombre(e.target.value)}
                  />
                </div>
                <div className="my-5">
                  <label 
                   className="uppercase text-gray-600 block text-xl font-bold"
                  >Email</label>
                  <input type="email" 
                         placeholder="Email de registro"
                         className="border w-full p-3 bg-gray-50 rounded-xl"
                         value={email}
                         onchange={e = setEmail(e.target.value)}
                  />
                </div>

                <div className="my-5">
                  <label 
                   className="uppercase text-gray-600 block text-xl font-bold"
                  >Password</label>
                  <input type="password" 
                         placeholder="Tu password"
                         className="border w-full p-3 bg-gray-50 rounded-xl "
                  />
                </div>

                <div className="my-5">
                  <label 
                   className="uppercase text-gray-600 block text-xl font-bold"
                  >Repetir Password</label>
                  <input type="password" 
                         placeholder="Repite tu password"
                         className="border w-full p-3 bg-gray-50 rounded-xl "
                  />
                </div>

                <input type="submit" value="Crear Cuenta" 
                       className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
        
               </form> 

               <nav className='mt-10 lg:flex lg:justify-between'>
                 <Link to="/"
                       className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                 <Link to="/olvide-password"
                      className='block text-center my-5 text-gray-500'>Olvidé mi password</Link>
              </nav>
        </div>        


    </>
  )
}

export default Registrar