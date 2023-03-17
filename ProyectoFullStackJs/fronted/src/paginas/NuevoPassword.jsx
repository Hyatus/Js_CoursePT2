import {Link} from 'react-router-dom';
import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom';
import Alerta from '../components/alerta';
import clienteAxios from '../../config/axios';

const NuevoPassword = () => {

    const [password, setPassword] = useState('');
    const [alerta, setAlerta] = useState({});
    const [tokenValido, setTokenValido] = useState(false);
    const [passwordModificado, setPasswordModificado] = useState(false);

    const params = useParams();

    const {token} = params;

    useEffect(()=>{
        /* Colocamos la función dentro del Effect para no colocarlo en la dependencia */
        const comprobarToken = async() =>{
            try {
                await clienteAxios(`/veterinarios/olvide-password/${token}`);
                setAlerta({msg:'Coloca tu nuevo password'});
                setTokenValido(true);
            } catch (e) {
                setAlerta({msg: 'Hubo un error con el enlace', error:true});
            }
        }

        comprobarToken();
    },[])

    const {msg} = alerta;

    const handleSubmit = async e =>{
        e.preventDefault();

        if(password.length < 6){
            setAlerta({
                msg: 'El password debe ser mínimo de 6 caracteres',
                error: true
            })
            return;
        }

        try {
            const url = `/veterinarios/olvide-password/${token}`;

            const { data } = await clienteAxios.post(url,{password});

            setAlerta({msg: data.msg});

            setPasswordModificado(true);

        } catch (error) {
            setAlerta({
                msg: error.response.data.msg,
                error: true
            })
        }
    }

  return (
    <>
        <div>
            <h1 className="text-indigo-600 font-black text-6xl">Reestablece tu password y no pierdas acceso a tus  <span className="text-black">pacientes</span>
            </h1>
        </div>

        <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
             
                {/* Si el mensaje lleva algo mostramos la alerta */}
                {msg && <Alerta 
                    alerta={alerta}
                 />}

                 {tokenValido && (
                    <>
                        <form 
                            onSubmit={handleSubmit}
                        >

                            <div className="my-5">
                                <label 
                                className="uppercase text-gray-600 block text-xl font-bold"
                                >Password</label>
                                <input type="password" 
                                        placeholder="Tu nuevo password"
                                        className="border w-full p-3 bg-gray-50 rounded-xl my-5"
                                        value={password}
                                        onChange={e=>setPassword(e.target.value)}     
                                />
                            </div>
        
                            <input type="submit" value="Reiniciar Contraseña" 
                                className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase font-bold my-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"/>
                
                        </form> 
                           
                    </>
                 )}

                 {passwordModificado && (
                     <Link to="/"
                     className='block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión</Link>
                 )}

          </div>     
    </>
  )
}

export default NuevoPassword;