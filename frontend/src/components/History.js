import React, { useState,useEffect, useContext }  from 'react'
import { UserContext } from '../context/User';




const History = () => {
    const { user, setUser } = useContext(UserContext);
    

    
  return (
    <section>
      <div className="container">
        <div className='columns is-multiline is-vcentered'>
          <div className='column is-one-third'>
              <figure class="image is-1by1">
                <img alt='/' class="is-rounded" src={require('./avatar.jpg')} />
                
              </figure>
            </div>
          <div className='column is-two-third is-vcentered m-5'>
            <h3 class="user-name is-size-4 has-text-weight-semibold">{user}</h3>
            <h3 class="user-npm is-size-4 has-text-weight-semibold ">1906299843</h3>
            <h3 class="user-email is-size-4 has-text-weight-semibold">gerygirsang@gmail.com</h3>
            <h3 class="is-size-4 has-text-weight-semibold">Denda Tersisa: <span class="user-fine">Rp.0</span></h3> 
          </div>
        </div>
        <h2 className='is-size-4 has-text-weight-semibold mb-4'>My History</h2>
        <table className="table is-striped is-hoverable is-fullwidth table-head-cell-color is-bordered  ">
                <thead>
                    <tr className="table is-selected">
                        <th scope="col">Waktu Dipinjam</th>
                        <th scope="col">Waktu Dikembalikan</th>
                        <th scope="col">Alat</th>
                        <th scope="col">Status</th>
                        <th scope="col">Denda</th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="active">
                        <td><span class="tglpnjm">23/11/2022</span> <span class="wktpnjm">09.00</span></td>
                        <td><span class="tglpnjm">-</span> <span class="wktpnjm"></span></td>
                        <td>Elvis</td>
                        <td>Dipesan</td>
                        <td>0</td>
                    </tr>
                    <tr>
                      <td><span class="tglpnjm">11/11/2022</span> <span class="wktpnjm">12.00</span></td>
                      <td><span class="tglpnjm">13/11/2022</span> <span class="wktpnjm">09.00</span></td>
                      <td>Elvis</td>
                      <td>Dikembalikan Terlambat</td>
                      <td>5000</td>
                  </tr>
                  <tr>
                    <td><span class="tglpnjm">5/11/2022</span> <span class="wktpnjm">12.00</span></td>
                    <td><span class="tglpnjm">5/11/2022</span> <span class="wktpnjm">17.00</span></td>
                    <td>Elvis</td>
                    <td>Dikembalikan</td>
                    <td>0</td>
                </tr>
                </tbody>
        </table>
      </div>

    </section>


  )
}

export default History