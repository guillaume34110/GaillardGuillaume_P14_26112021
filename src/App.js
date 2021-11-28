import React, { useState } from 'react';
import{
  BrowserRouter,
Routes,
Route,
} from "react-router-dom";
import Form from './pages/Form';
import List from './pages/List';

export const Switch = () => {
  const [stateDatas , setStateDatas] = useState([]) //state data array for entire application
  return (
      <>
      <Routes>
      <Route path="/" element={<Form stateDatas={stateDatas} setStateDatas ={setStateDatas} />} />
      <Route path="/list" element={<List  stateDatas={stateDatas} setStateDatas ={setStateDatas}  />} />
     </Routes>
      </>
  )
};
function App() {
  
  return (
    <BrowserRouter>
      <Switch />
    </BrowserRouter>
  );
}

export default App;
