
import {BrowserRouter, Routes, Route } from 'react-router-dom';

import AuthLayout from './layout/AuthLayout';
import RutaProtegida from './layout/RutaProtegida';

/* Paginas para las rutas públicas */
import Login from './paginas/Login';
import OlvidePassword from './paginas/OlvidePassword';
import ConfirmarCuenta from './paginas/ConfirmarCuenta';
import Registrar from './paginas/Registrar';
import NuevoPassword from './paginas/NuevoPassword';

/* Para la autenticación */
import { AuthProvider } from './context/AuthProvider';
import { PacientesProvider } from './context/PacientesProvider';

/* Paginas para las rutas protegidas */
import AdministrarPacientes from './paginas/AdministrarPacientes';

function App() {

  return (
    <BrowserRouter>
        <AuthProvider>
          <PacientesProvider>
            {/* El Provider rodea toda la aplicación  y se ejecuta todo el tiempo*/}
            <Routes>
                <Route path='/' element={<AuthLayout/>}>
                    <Route index element={ <Login/> } /> 
                    <Route path="registrar" element={< Registrar /> }/>
                    <Route path="olvide-password" element={< OlvidePassword />}/>
                    <Route path="olvide-password/:token" element={< NuevoPassword />}/>
                    <Route path="confirmar/:id" element={< ConfirmarCuenta />}/>
                </Route>
                {/* Rutas protegidas  */}
                <Route path='/admin' element={ <RutaProtegida /> }>
                      <Route index element={<AdministrarPacientes/>}/>
                </Route>
            </Routes> 
          </PacientesProvider>
        </AuthProvider>
    </BrowserRouter>
  )
}

export default App
