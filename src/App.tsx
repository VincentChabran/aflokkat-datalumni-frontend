import { useEffect, useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { NavBar } from './components/NavBar/NavBar';
import { Login } from './views/Login';

function App() {
   const [count, setCount] = useState(1);

   const navigate = useNavigate();

   // useEffect(() => {
   //    if (count === 1) {
   //       if (window.location.pathname.includes('/login')) navigate('/test1');
   //       else navigate(window.location.pathname);
   //    } else {
   //       navigate('/login');
   //    }
   // }, []);

   return (
      <Routes>
         <Route path="/login" element={<Login />} />

         <Route
            path="/*"
            element={
               <>
                  <NavBar />
                  <Routes>
                     <Route path="/">{/* <Route path="test1" element={<Test1 />} /> */}</Route>
                  </Routes>
               </>
            }
         />
      </Routes>
   );
}

export default App;
