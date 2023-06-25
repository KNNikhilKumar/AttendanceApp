import axios from "axios";
import AttendancePage from "./components/AttendancePage";
import Home from './components/Home';

import NavBar from "./components/NavBar";
import { Route,Routes } from "react-router-dom";
import Dates from "./components/Dates";
function App() {
  
  return (
      <div className="container" style={{width:'50%'}}>
        <NavBar text="Attendance App" />
        <br />
        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='/attendance/:tid/:date' element={<AttendancePage />}></Route>
            <Route path="/date/:tid" element={<Dates />}></Route>
        </Routes>
      </div>
      
  );
}

export default App;
