import React from 'react';
import{
  BrowserRouter,
Routes,
Route,
} from "react-router-dom";
import Form from './pages/Form';
import List from './pages/List';

export const Switch = () => {
  return (
      <>
      <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/list" element={<List />} />
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
