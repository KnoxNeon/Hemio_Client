import React, { useContext } from 'react'
import useAxios from '../Hooks/useAxios'
import { AuthContext } from '../Provider/AuthProvider';
import { useNavigate } from 'react-router';

const Donate = () => {
    const axiosInstance = useAxios();
    const {user } = useContext(AuthContext)

    const navigate = useNavigate()

    const handleCheckOut = (e) =>{
        e.preventDefault()
        const donateAmount = e.target.donateAmount.value;
        const donorEmail = user?.email
        const donorName = user?.displayName

        const formData = {
            donateAmount,
            donorEmail,
            donorName,
        }

        axiosInstance.post('/create-payment-checkout', formData)
        .then(res =>{
            window.location.href = res.data.url
        })
    }
  return (
    <div>
      <title>Add Donation</title>
      <form onSubmit={handleCheckOut} action="" className='flex justify-center items-center min-h-screen gap-4'>
        <input name='donateAmount' type="text" placeholder='type here' className='input' />
        <button className='btn btn-primary' type='submit'>Donate</button>
      </form>
    </div>
  )
}

export default Donate
