import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const axiosSecure = axios.create({
    baseURL:'https://donatebloodserver.vercel.app'
})

const useAxiosSecure = () =>{
    const {user} = useContext(AuthContext)
    
    useEffect(() => {
      const reqInterceptor = axiosSecure.interceptors.request.use(async (config) =>{
        if (user) {
          try {
            // Get the Firebase ID token
            const token = await user.getIdToken()
            config.headers.Authorization = `Bearer ${token}`
          } catch (error) {
            console.error('Error getting Firebase token:', error)
          }
        }
        return config
      })
      
      const resInterceptor = axiosSecure.interceptors.response.use((response) =>{
        return response
      },(error) =>{
        console.log('Axios error:', error)
        console.log('Error response:', error.response?.data)
        return Promise.reject(error)
      })

      return () =>{
        axiosSecure.interceptors.request.eject(reqInterceptor)
        axiosSecure.interceptors.response.eject(resInterceptor)
      }
    }, [user])

    return axiosSecure
    
}

export default useAxiosSecure