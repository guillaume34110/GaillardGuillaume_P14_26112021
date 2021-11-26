import React from 'react';
import{
  BrowserRouter,
Routes,
Route,
} from "react-router-dom";
import Form from './pages/Form';
import List from './pages/List';


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Form />} />
      <Route path="/login" element={<List />} />
     </Routes>
    </BrowserRouter>
  );
}

export default App;
