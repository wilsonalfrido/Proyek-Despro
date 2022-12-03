import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState,useMemo } from "react";
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList"
import Booking from "./components/Booking";
import History from "./components/History";
import { UserContext } from "./context/User";

function App() {
  const [user,setUser] = useState(null);
  const providerValue = useMemo(()=>({user,setUser}),[user,setUser]);



  return (
    <BrowserRouter>
      <UserContext.Provider value = {{user,setUser}}>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/dashboard" element={
            [<Navbar/>,<Dashboard/>]}/>
          <Route exact path="/booking" element={[<Navbar/>,<Booking/>]}></Route>
          <Route exact path="/history" element={
            [<Navbar/>,<History/>]}/>
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
}

export default App;
