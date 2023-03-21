import { Outlet, Navigate  } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Header from "../components/Header";
import Footer from "../components/Footer";

const RutaProtegida = () => {

  const {auth, cargando} = useAuth();

  if(cargando) return 'cargando...';


  return (
    <>
        <Header/>
        {/* Si auth tiene algo muestro Outlet y si no lo envío a la página de inicio*/}
          { auth?._id ? (
            <main className="container mx-auto mt-10">
              <Outlet />
            </main>
          ) : <Navigate to="/"/>}
        <Footer/>
    </>
  )
}

export default RutaProtegida;