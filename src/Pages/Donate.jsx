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
    <div className="p-8 text-center flex flex-col space-y-6 min-h-screen justify-center items-center bg-gradient-to-r from-red-50 to-sky-50">
      <title>Support Us</title>
      
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
          Give Financially, Save Eternally
        </h1>
        <p className="text-gray-600 text-lg">
          Your Support Keeps the Blood Flowing
        </p>
      
      <form onSubmit={handleCheckOut} action="" className='flex justify-center gap-4'>
        <input name='donateAmount' type="text" placeholder='Enter Your Amount' className='input' />
        <button className='btn btn-primary' type='submit'>Donate</button>
      </form>
    </div>
  )
}

export default Donate
