import { BrowserRouter, Route, Routes } from "react-router-dom"
import { useState,useMemo } from "react";
import Login from "./components/Login"
import Register from "./components/Register"
import Navbar from "./components/Navbar";
import Dashboard from "./components/Dashboard";
import ProductList from "./components/ProductList"
import Booking from "./components/Booking";
import History from "./components/History";
import Rules from "./components/Rules";
import { UserProvider } from "./context/User";

function App() {
  // const [user,setUser] = useState(null);
  // const providerValue = useMemo(()=>({user,setUser}),[user,setUser]);



  return (
    <UserProvider>
      <BrowserRouter>
      
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route exact path="/register" element={<Register/>}/>
          <Route exact path="/dashboard" element={
            [<Navbar/>,<Dashboard/>]}/>
          <Route exact path="/booking" element={[<Navbar/>,<Booking/>]}></Route>
          <Route exact path="/history" element={
            [<Navbar/>,<History/>]}/>
          <Route exact path="/rules" element={
            [<Navbar/>,<Rules/>]}/>
        </Routes>
      
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
