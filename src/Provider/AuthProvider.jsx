import { createUserWithEmailAndPassword, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import auth from "../Firebase/firebase.config"
import axios from "axios"

export const AuthContext = createContext()

const AuthProvider = ({children}) => {

    const [loading, setLoading] = useState(true)
    const [roleLoading, setRoleLoading] = useState(true)
    const [user, setUser] = useState(null)
    const [role, setRole] = useState('')
    const [userStatus, setUserStatus] = useState('')

    const registerWithEmailPassword = (email, pass) =>{
        return createUserWithEmailAndPassword(auth, email, pass)
    }

    const handleGoogleSignin = async () => {
        try {
            const provider = new GoogleAuthProvider()
            // Add additional scopes if needed
            provider.addScope('email')
            provider.addScope('profile')
            
            const result = await signInWithPopup(auth, provider)
            return result
        } catch (error) {
            console.error('Google sign-in error:', error)
            throw error
        }
    }
   
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser)=>{
            setUser(currentUser)
            setLoading(false) 
      })
        return ()=>{
            unsubscribe()
        }
    }, [])

     useEffect(() => {
        if(!user) return
        axios.get(`https://donatebloodserver.vercel.app/users/role/${user.email}`)
        .then(res =>{
                setRole(res.data.role)
                setUserStatus(res.data.status)
                setRoleLoading(false)
            })
            .catch(err => {
                console.error('Error fetching role:', err)
                setRoleLoading(false)
            })
      },[user])

  const authData = { 
    registerWithEmailPassword,
    handleGoogleSignin,
    user,
    setUser,
    loading,
    role,
    roleLoading,
    userStatus 
  }

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
}

export default AuthProvider
