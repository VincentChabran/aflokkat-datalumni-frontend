import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { NavBar } from './components/NavBar/NavBar';
import { Accueil } from './views/Accueil';
import { Annuaire } from './views/Annuaire';
import { Login } from './views/Login';
import { useUserStore } from './store/useUserStore';
import { getLocalStorageToken } from './utils/jwtToken';
import { Profil } from './views/Profil';

function App() {
   const navigate = useNavigate();

   const { setUser } = useUserStore();

   useEffect(() => {
      const lsToken = getLocalStorageToken();

      if (lsToken) {
         setUser(jwtDecode(lsToken));

         if (window.location.pathname.includes('/login')) navigate('/accueil');
         else navigate(window.location.pathname);
      } else {
         navigate('/login');
      }
   }, []);

   return (
      <Routes>
         <Route path="/login" element={<Login />} />

         <Route
            path="/*"
            element={
               <>
                  <NavBar />
                  <Routes>
                     <Route path="/annuaire" element={<Annuaire />} />

                     <Route path="/profil/:userId" element={<Profil />} />

                     <Route path="*" element={<Accueil />} />
                  </Routes>
               </>
            }
         />
      </Routes>
   );
}

export default App;
