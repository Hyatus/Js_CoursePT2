import { createContext, useState, useEffect } from "react";
import clienteAxios from "../../config/axios";
import useAuth from "../hooks/useAuth";


const PacientesContext = createContext();


export const PacientesProvider = ({children}) =>{


    const [pacientes, setPacientes] = useState([]);
    const [paciente, setPaciente] = useState({});
    const {auth} = useAuth();

    useEffect(()=>{
        const obtenerPacientes = async()=>{
           try {
             const token = localStorage.getItem('token');
             if(!token) return;

             const config = {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
            
            const {data} = await clienteAxios('/pacientes',config);

            setPacientes(data)

           } catch (error) {
            console.log(error);
           }
        }

        obtenerPacientes();
    },[auth])

    const guardarPaciente = async(paciente) =>{
        
        const token = localStorage.getItem('token');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        
        
        if(paciente.id){
            /**  PARA PACIENTES MODIFICADOS **/
            try {
                const {data} = await clienteAxios.put(`/pacientes/${paciente.id}`,paciente,config);

                // Iteramos en los pacientes que tenemos almacenaos y únicamente vamos a cambiar los datos 
                // del paciente que modificamos, si el id que nos devuelve la db es igual al que está almacenado en nuestro 
                // arreglo entonces devolvemos la info actualizada, de lo contrario devolvemos la información que ya tenemos
                const pacientesActualizado = pacientes.map(pacienteState => pacienteState._id === data._id ? data : pacienteState)

                setPacientes(pacientesActualizado);
            } catch (error) {
                console.log(error);
            }
        }else{
            /**  PARA PACIENTES NUEVOS **/
            try {
                const {data} = await clienteAxios.post('/pacientes',paciente, config);
    
                const { createdAt, updatedAt, __v, ...pacienteAlmacenado } = data;
    
                setPacientes([pacienteAlmacenado,...pacientes]);
    
            } catch (error) {
                console.log(error.response.data.msg);
            }
        }
    }


    const setEdicion = (paciente) =>{
        setPaciente(paciente);
    }


    const eliminarPaciente = async id =>{
        const confirmar = confirm('¿Confirmas que deseas eliminar?');

        const token = localStorage.getItem('token');
        const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        if(confirmar){
            try {
                const {data} = await clienteAxios.delete(`/pacientes/${id}`,config);

                // Traemos todos los pacientes que tengan un id distinto al que fue eliminado 
                const pacientesActualizado = pacientes.filter(pacientesState => pacientesState._id !== id);

                setPacientes(pacientesActualizado);

            } catch (error) {
                console.log(error);
            }
        }
    }

    return(

        <PacientesContext.Provider
        value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente
        }}
        >
            {children}
        </PacientesContext.Provider>
    )
}


export default PacientesContext;


