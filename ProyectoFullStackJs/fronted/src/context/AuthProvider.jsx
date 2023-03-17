import {useState, useEffect, createContext} from 'react';
import clienteAxios from '../../config/axios';


// createContexto nos permite acceder al State de forma global 

const AuthContext = createContext();

const AuthProvider = ({children}) =>{

    const [auth, setAuth] = useState({});

    useEffect(()=>{
        const autenticarUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token) return;

            const config = {
                headers: {
                    "Content-Type":"application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil',config);

                setAuth(data);

            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
        }

        autenticarUsuario();
    },[]);
    return(
        <AuthContext.Provider
         value={{auth,setAuth}}
        >
            {/* Children son todos los componentes contenidos en el AuthProvider */}
            {children}
        </AuthContext.Provider>
    )
}


export {
    AuthProvider
}


export default AuthContext;