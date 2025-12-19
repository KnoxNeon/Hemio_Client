import React, { useContext, useEffect, useState } from 'react'
import useAxiosSecure from '../../../Hooks/useAxiosSecure'
import { AuthContext } from '../../../Provider/AuthProvider'

const AllUsers = () => {
    const axiosSecure = useAxiosSecure()
    const [users, setUsers] = useState([])
    const {user} = useContext(AuthContext)

    useEffect(()=>{
        if(!user) return;
        axiosSecure.get('/users')
        .then(res =>{
            setUsers(res.data)
        })
    },[axiosSecure, user])

    console.log(users)

  return (
    <div>
      this is all users
    </div>
  )
}

export default AllUsers
