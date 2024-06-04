import './signUpForm.css'
import UserService from '../../services/UserService'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuth } from '../Authentication/AuthProvider'
import { Link } from 'react-router-dom'

function useSignUp(){
    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")
    const [userEmail, setUserEmail] = useState("")
    const [registered, setRegistered] = useState("no_registered")

    useEffect(() =>{
        
    }, [userName, userPassword])

    return { userName, setUserName, userPassword, setUserPassword, userEmail, setUserEmail, registered, setRegistered }
}

export function SignUpForm(){

    const { userName, setUserName, userPassword, setUserPassword, userEmail, setUserEmail,registered, setRegistered } = useSignUp()

    const authentication = useAuth()

    const handleSubmit = (e) =>{
        e.preventDefault()

        const name = userName
        const password = userPassword
        const email = userEmail

        const user = { name, password, email }

        if(user.name !== "" && user.password !== "" && user.email !== ""){
            UserService.createUser({ user }).then(response =>{
                if(response.ok){
                    setRegistered("registered")
                }else{
                    alert("Error")
                }
            }).catch(error =>{
                console.log(error)
                alert("El usuario no pudo ser creado")
            })
        }else{
            alert("Todos los campos han de ser rellenados")
        }
    }

    const updatePassword = (e) =>{ 
        const newPassword = e.target.value
        setUserPassword(newPassword)
    }

    const updateUserName = (e) =>{
        const newUserName = e.target.value
        setUserName(newUserName)
    }

    const updateUserEmail = (e) =>{
        const newUserEmail = e.target.value
        setUserEmail(newUserEmail)
    }

    return(
        !authentication.isAuthenticated ?(        
                <form className='signup_form' onSubmit={handleSubmit}>
                    <h1>Crear una cuenta</h1>
                    <div className='data_signup'>
                        <input className='user_input' name="user" type="text" value={userName} placeholder='Nombre de usuario' onChange={updateUserName} />
                        <input type="text" name='email' value={userEmail} onChange={updateUserEmail} placeholder="Correo"/>
                        <input className='password_input' name='password' type="password" value={userPassword} placeholder='Contraseña' onChange={updatePassword} />
                    </div>
                    <div className={registered}>
                        <h2>¡Nueva cuenta {`"${userName}"`} creada con éxito!</h2>
                        <h3>Ahora puedes iniciar sesión</h3>
                        <Link className='registered_button' to="/login">Iniciar sesión</Link>
                    </div>
                    <input className='button_signup_form' type="submit" value='Registrarse'/>
                    
                    <div className='no_account_container'>
                        <Link className='no_account' to="/login">Iniciar sesión</Link>
                    </div>
                </form>
        ):(
            <Navigate to="/"></Navigate>
        )
    )
}