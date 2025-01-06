import './App.css';
import AddUser from "./components/AddUser";
import Navbar from "./components/Navbar";
import Users from "./components/Users";
import { BrowserRouter as Router, Routes, Route } from "react-router";

function App() {

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Users />} />
        <Route path="/add-user" element={<AddUser />} />
      </Routes>
    </Router>
  );
}

export default App;
