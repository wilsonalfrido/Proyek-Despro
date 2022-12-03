import React, { useState,useEffect, useContext} from 'react';
import axios from 'axios';
import jwt_decode from "jwt-decode";
import UserContext from '../context/User';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name,setName] = useState('');
  const [id,setId] = useState('');
  const [token,setToken] = useState('');
  const [expiredToken,setExpiredToken] = useState('');
  const [daftarAlat,setDaftarAlat] = useState([]);
  const [status,setStatus] = useState([]);
  const navigate = useNavigate();
  // const msg = useContext(UserContext);
  const { user, setUser } = useContext(UserContext);



  useEffect(() => {
    getAlat();
    refreshToken();
  },[]);


  const refreshToken = async()=>{
    try{
      const response = await axios.get('http://localhost:5000/token');
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setId(decoded.idPeminjam);
      setExpiredToken(decoded.exp);

      setUser({...user, id:decoded.idPeminjam, name:decoded.name, email:decoded.email,npm:decoded.npm,denda:decoded.denda});
      // setUser(decoded.npm);

    } catch(error){
      if(error.response){ //a
        navigate('/');
      }
    }
  }

  const axiosJWT = axios.create();

  axiosJWT.interceptors.request.use(async(config) => {
    const currentDate = new Date();
    if(expiredToken*1000 < currentDate.getTime()) {
      const response = await axios.get("http://localhost:5000/token");
      config.headers.Authorization = `Bearer ${response.data.accessToken}`;
      setToken(response.data.accessToken);
      const decoded = jwt_decode(response.data.accessToken);
      setName(decoded.name);
      setId(decoded.idPeminjam);
      setExpiredToken(decoded.exp); 
      // setUser({...user, id:decoded.idPeminjam, name:decoded.name, email:decoded.email,npm:decoded.npm,denda:decoded.denda});
      // setUser(decoded.idPeminjam);
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  })

  const getAlat = async() => {
      try{
          const response = await axios.get('http://localhost:5000/alat');
          // console.log(response.data);
          const statusList = response.data.map((data,i)=>{
              if(data.statusAlat === 0) {
                  return "Tersedia";
              } else {
                  return "Dipinjam";
              }
          })
          setStatus(statusList);
          setDaftarAlat(response.data);
      } catch(error) {
          console.log(error);
      }
  } 

  const Booking = (e,namaAlat, idAlat)=>{
    e.preventDefault();
    try{
        // await axios.post('http://localhost:5000/peminjam',{
        //     name:name,
        //     email:email,
        //     password:password,
        //     confPassword: confPassword
        // });
        navigate("/booking",{ state: { namaAlat: namaAlat, idAlat:idAlat, idPeminjam: id} });
    } catch (error){
        if(error.response){
            console.log(error.response.data.msg);
        }
    }
  }

  // const getUsers = async() => {
  //   const response = await axiosJWT.get("http://localhost:5000/peminjam",{
  //     headers:{
  //       Authorization: `Bearer ${token}`
  //     }
  //   });
  //   console.log(response.data);
  // }

  return (
    <section>
          <div className='container mt-5'>
            <h1 className="title is-5 m-4">Welcome Back to E-Lab, {user.name}, id: {user.id} </h1>
          </div>
          <div className='container mt-5'>
            <div className="columns is-multiline">
                    {
                        daftarAlat.map((card,i)=>(
                            <div className="column is-one-quarter-desktop is-half-tablet">
                                <div key={i} className="box card" >
                                    <figure className='image is-1by1'>
                                        <img src={card.url} alt="" />
                                    </figure>
                                    <h3 className='has-text-centered'>{card.namaAlat}</h3>
                                    <p className='has-text-centered'>Status: {status[i]} </p>
                                    <button onClick={(e)=>{
                                        Booking(e,card.namaAlat,card.id)
                                    }} className='button is-primary is-responsive is-fullwidth'>Book</button>
                                </div>
                            </div>
                        ))
                    }
            </div>
        </div>
    </section>

    
  )
}

export default Dashboard