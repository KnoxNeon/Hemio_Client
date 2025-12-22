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

    const handleRole = (email, newRole) =>{
      axiosSecure.patch(`/update/user/status?email=${email}&role=${newRole}`).then(res=>{
        fetchUsers()
      }) 
    }

  return (
    <div className="overflow-x-auto">
      <h2 className="text-4xl font-bold text-red-700  text-center mb-12">
       All Users
      </h2>
      <title>All Users</title>
      <table className="table table-xs text-center">
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
          {users.map((user) => (
            <tr>
              <td></td>
              <td>
                <img src={user?.mainPhotoUrl} className="w-10 h-10" alt="" />
              </td>
              <td>{user?.name}</td>
              <td>{user?.email}</td>
              <td>{user?.blood}</td>
              <td>{user?.role}</td>
              <td>{user?.status}</td>
              <td className='space-x-2'>
                {user?.status == "active" ? (
                  <button
                    onClick={() => handleStatus(user?.email, "block")}
                    className="btn bg-red-500 text-white"
                  >
                    Block
                  </button>
                ) : (
                  <button
                    onClick={() => handleStatus(user?.email, "active")}
                    className="btn bg-green-600 text-white"
                  >
                    Unblock
                  </button>
                )}
              
                <select defaultValue={user?.role} className="select w-20">
                  <option disabled={true}>Select Role</option>
                  <option onClick={() => handleRole(user?.email, 'admin')}>admin</option>
                  <option onClick={() => handleRole(user?.email, 'volunteer')}>volunteer</option>
                  <option onClick={() => handleRole(user?.email, 'donor')}>donor</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AllUsers
