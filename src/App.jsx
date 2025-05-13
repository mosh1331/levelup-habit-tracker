import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Landing from "./components/Landing";
import Settings from "./components/Settings";

function App() {

  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/settings" element={<Settings  />} />
    </Routes>
  </BrowserRouter>
  )
}

export default App
