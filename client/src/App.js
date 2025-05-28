import { BrowserRouter, Routes, Route } from "react-router-dom";
import Quiz from "./components/Quiz";
import './App.css';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
