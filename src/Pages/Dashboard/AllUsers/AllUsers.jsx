import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider'

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
    
  const fetchUsers =() =>{
    axiosSecure.get('/users')
        .then(res =>{
            setUsers(res.data)
        })

  }
    useEffect(()=>{
        fetchUsers()
    },[axiosSecure])

    const handleStatus = (email, status) =>{
        axiosSecure.patch(`/update/user/status?email=${email}&status=${status}`).then(res =>{
          fetchUsers()
        })
    }

  return (
    <div className="overflow-x-auto">
      <title>My Orders</title>
  <table className="table table-xs">
    <thead>
      <tr>
        <th></th>
        <th>Avatar</th>
        <th>Name</th>
        <th>Email</th>
        <th>Blood Type</th>
        <th>Role</th>
        <th>Status</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        users.map(user=>
        <tr>
        <td></td>
        <td><img src={user?.mainPhotoUrl} className='w-10 h-10' alt="" /></td>
        <td>{user?.name}</td>
        <td>{user?.email}</td>
        <td>{user?.blood}</td>
        <td>{user?.role}</td>
        <td>{user?.status}</td>
        <td>
          {
            user?.status == 'active'?(<button onClick={()=>handleStatus(user?.email, 'block')} className='btn bg-red-500 text-white'>Block</button>)
            :
            <button onClick={()=>handleStatus(user?.email, 'active')} className='btn bg-green-600 text-white'>Unblock</button>
          }
          
          
        </td>
        
      </tr>

        )
      }
      </tbody> 
  </table>
</div>
  )
}

export default AllUsers
