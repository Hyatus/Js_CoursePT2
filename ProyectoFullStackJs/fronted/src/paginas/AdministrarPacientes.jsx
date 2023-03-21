import Formulario from "../components/Formulario";
import ListadoPacientes from "../components/ListadoPacientes";


const AdministrarPacientes = () => {
  // El fragment '<> </>' se coloca porque estoy retornando múltiples elementos en el primer nivel  
  return (
    <>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 lg:w-2/5">
             <Formulario />
          </div>

          <div className="md:w-1/2 lg:w-3/5">
            <ListadoPacientes />
          </div>

        </div>
    </>
  )
}

export default AdministrarPacientes;