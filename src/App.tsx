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
import { APropos } from './views/APropos';
import { OffresEmploi } from './views/OffresEmploi';
import { Actualites } from './views/Actualites';
import { CreateActualites } from './components/Actualites/CreateActualites';
import { ActualiteDetail } from './components/Actualites/ActualiteDetail/ActualiteDetail';
import { CreateOffre } from './components/OffresEmploi/CreateOffre';
import { OffreDetail } from './components/OffresEmploi/OffreDetail/OffreDetail';
import { GestionNewAccount } from './views/GestionNewAccount';

function App() {
   const navigate = useNavigate();

   const { setUserStore } = useUserStore();

   useEffect(() => {
      const lsToken = getLocalStorageToken();

      if (lsToken) {
         setUserStore(jwtDecode(lsToken));

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

                     <Route path="/offresemploi" element={<OffresEmploi />} />
                     <Route path="/offresemploi/create" element={<CreateOffre />} />
                     <Route path="/offresemploi/:offreId" element={<OffreDetail />} />

                     <Route path="/actualites" element={<Actualites />} />
                     <Route path="/actualites/create" element={<CreateActualites />} />
                     <Route path="/actualites/:blogId" element={<ActualiteDetail />} />

                     <Route path="/apropos" element={<APropos />} />

                     <Route path="/profil/:userId" element={<Profil />} />
                     <Route path="/gestionNewAccount" element={<GestionNewAccount />} />

                     <Route path="*" element={<Accueil />} />
                  </Routes>
               </>
            }
         />
      </Routes>
   );
}

export default App;
