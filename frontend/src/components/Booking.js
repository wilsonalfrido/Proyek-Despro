import { useLocation } from "react-router-dom"
import React, { useState, useEffect } from 'react'
import axios from 'axios';
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom';

const Booking = () => {
    const [ bookData, setBookData ] = useState({id_peminjam:0,
        id_alat:0,
        tgl_pinjam:'',
        tgl_kembali:'',
        });
    const { state } = useLocation();
    const { namaAlat, idAlat, idPeminjam } = state;
    const [msg,setMsg] = useState('');
  

    useEffect(() => {
      setBookData({...bookData, id_alat:idAlat, id_peminjam:idPeminjam});
    },[]);
  

    const Booking = async(e)=>{
        // e.preventDefault();
        // console.log(bookData);
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5000/trPinjam',{
                id_peminjam:bookData.id_peminjam,
                tgl_pinjam:bookData.tgl_pinjam,
                tgl_kembali:bookData.tgl_kembali,
                id_alat:bookData.id_alat,
            });
            console.log(response);
            setMsg(response.data.msg);
        } catch (error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }


  return (
    // <section className="hero is-fullheight is-fullwidth">
      <div className="hero-body mt-5">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form onSubmit={ Booking } className='box'>
                    <p className='has-text-centered'>{msg}</p>
                    <h1 className='title is-4 has-text-centered m-2'>Form Booking Peminjaman Alat</h1>
                        {/* <p className='has-text-centered'>{msg}</p> */}
                        <div className="field mt-5">
                            <label className="label">Nama Alat</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='Name' 
                                value={namaAlat} />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Tanggal Peminjaman</label>
                            <div className="control">
                                <input type="datetime-local" className="input"
                                value={bookData.tgl_pinjam} onChange={(e)=>{setBookData({...bookData, tgl_pinjam:e.target.value});
                                }}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Tanggal Pengembalian</label>
                            <div className="control">
                                <input type="datetime-local" className="input"
                                value={bookData.tgl_kembali} onChange={(e)=>{setBookData({...bookData, tgl_kembali:e.target.value})}}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Booking</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
      </div>
    // </section>
  )
}

export default Booking