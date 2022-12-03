import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom"



const ProductList = () => {
    const [daftarAlat,setDaftarAlat] = useState([]);
    const [status,setStatus] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getAlat();
    },[]);

    // const Booking = () => {
        
    // }
    const Booking = (e,namaAlat, idAlat)=>{
        e.preventDefault();
        try{
            // await axios.post('http://localhost:5000/peminjam',{
            //     name:name,
            //     email:email,
            //     password:password,
            //     confPassword: confPassword
            // });
            navigate("/booking",{ state: { namaAlat: namaAlat, idAlat:idAlat} });
        } catch (error){
            if(error.response){
                console.log(error.response.data.msg);
            }
        }
    }

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
    return (
        // <section className='hero is-fullwidth is-fullheight'>
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

        // </section>
    )

}
export default ProductList