
import './App.css';

import { Home } from "./pages/Home";
import { Navbar } from "./components/Navbar";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
      <Route path="/" element={
        <>

          <Navbar />
          <Home />
        </>
      }></Route>
    </Routes>
  );
}

export default App;
