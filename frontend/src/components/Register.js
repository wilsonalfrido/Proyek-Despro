import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"


//REACT COMPONENT
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confPassword, setConfPassword] = useState('');   
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    
  

    const Register = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:5000/peminjam',{
                name:name,
                email:email,
                password:password,
                confPassword: confPassword
            });
            navigate("/");
        } catch (error){
            if(error.response){
                setMsg(error.response.data.msg);
            }
        }
    }

    return (
    <section className="hero has-background-grey-light is-fullheight is-fullwidth">
      <div className="hero-body">
        <div className="container">
            <div className='columns is-centered'>
                <div className='column is-4-desktop'>
                    <form onSubmit={ Register } className='box'>
                        <p className='has-text-centered'>{msg}</p>
                        <div className="field mt-5">
                            <label className="label">Name</label>
                            <div className="control">
                                <input type="text" className="input" placeholder='Name' 
                                value={name} onChange={(e)=>{setName(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Email or username</label>
                            <div className="control">
                                <input type="email" className="input" placeholder='Username' 
                                value={email} onChange={(e)=>{setEmail(e.target.value)}} />
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Password</label>
                            <div className="control">
                                <input type="password" className="input" placeholder='********' 
                                value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <label className="label">Confirmation Password</label>
                            <div className="control">
                                <input type="password" className="input" placeholder='********' 
                                value={confPassword} onChange={(e)=>{setConfPassword(e.target.value)}}/>
                            </div>
                        </div>
                        <div className="field mt-5">
                            <button className="button is-success is-fullwidth">Register</button>
                        </div>
                        <p className='has-text-centered'>Already a member ? <span onClick={(e)=>{
                            e.preventDefault();
                            navigate("/");
                        }} className='has-text-link-dark is-underlined'><a className = "has-text-weight-bold">Login Here</a></span></p>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Register