import React, { useState,useEffect, useContext }  from 'react'
import UserContext from '../context/User';
import axios from 'axios';




const History = () => {
    const { user, setUser } = useContext(UserContext);
    console.log(user);
    const [historyList,setHistoryList] = useState([]);
    const [flag,setFlag] = useState(true);
    
    useEffect(() => {
      getHistory();
    },[flag]);

    const getHistory = async() => {
      try{
          const response = await axios.get(`http://localhost:5000/trPinjam/${user.id}`);
          // console.log(response.data);
          // const statusList = response.data.map((data,i)=>{
          //     if(data.statusAlat === 0) {
          //         return "Tersedia";
          //     } else {
          //         return "Dipinjam";
          //     }
          // })
          // setStatus(statusList);
          setHistoryList(response.data);
      } catch(error) {
          console.log(error);
      }
  } 

  const deleteHistory = async(e,id) => {
    e.preventDefault();
    try{
      setFlag(false);
      const response = await axios.delete(`http://localhost:5000/trPinjam/${id}`);
      alert(response.data.msg);
      setFlag(true);
      
    } catch(error){
      alert(error);
    }
  }

    
  return (
    <section>
      <div className="container">
        <div className='columns is-multiline is-vcentered mt-3'>
          <div className='column is-one-third'>
              <figure class="image is-1by1">
                <img alt='/' class="is-rounded" src={require('./avatar.jpg')} />
                
              </figure>
            </div>
          <div className='column is-two-third is-vcentered m-5'>
            <h3 class="user-name is-size-4 has-text-weight-semibold">{user.name}</h3>
            <h3 class="user-npm is-size-4 has-text-weight-semibold ">{user.npm}</h3>
            <h3 class="user-email is-size-4 has-text-weight-semibold">{user.email}</h3>
            <h3 class="is-size-4 has-text-weight-semibold">Denda Tersisa: <span class="user-fine">Rp.{user.denda}</span></h3> 
          </div>
        </div>
        <h2 className='is-size-4 has-text-weight-semibold mb-4'>My History</h2>
        <p className='mb-3'>Keterangan: (0:Dipesan,1:Sedang Dipinjam,2:Dikembalikan)</p>
        <table className="table is-striped is-hoverable is-fullwidth table-head-cell-color is-bordered  ">
                <thead>
                    <tr className="table is-selected">
                        <th scope="col">Tgl Booking Pinjam</th>
                        <th scope="col">Tgl Booking Kembali</th>
                        <th scope='col'>Tgl Ambil</th>
                        <th scope="col">Tgl Kembali</th>
                        <th scope="col">Alat</th>
                        <th scope="col">Status</th>
                        <th scope="col">Denda</th>
                    </tr>
                </thead>
                <tbody>
                  {
                      historyList.map((data,i)=>(
                        <tr className="active">
                          <td>{data.tgl_pinjam}</td>
                          <td>{data.tgl_kembali}</td>
                          <td>{data.waktu_diambil}</td>
                          <td>{data.waktu_dikembalikan}</td>
                          <td>{data.id_alat}</td>
                          {
                            data.status == 0?<td>{data.status}<span><button className="button is-small ml-3 is-danger" onClick={ (e)=> (deleteHistory(e,data.id) )  }>Cancel</button></span></td>:
                            <td>{data.status}</td>
                          }
                          
                          <td>{data.denda}</td>
                        </tr>
                      ))
                  }
                </tbody>
        </table>
      </div>

    </section>


  )
}

export default History