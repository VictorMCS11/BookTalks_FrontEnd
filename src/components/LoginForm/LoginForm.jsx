import './loginForm.css'
import { Link, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../Authentication/AuthProvider.jsx'
import UserService from '../../services/UserService'

export function LoginForm(){

    const authentication = useAuth()

    const [userName, setUserName] = useState("")
    const [userPassword, setUserPassword] = useState("")

    const handleSubmit = (e) =>{
        e.preventDefault()

        const user = Object.fromEntries(new window.FormData(e.target))
        UserService.getUser({ user }).then((response) =>{
            if(response.body[0].name === user.name && response.body[0].password === user.password){
                window.localStorage.setItem('loggedUser', JSON.stringify(response.body[0]))
                window.location.reload(true)
            }else{
                console.log(response)
                alert("Usuario incorrecto, asegurese de escribir bien el usuario y contraseña")
            }
        }).catch(error =>{
            console.log(error)
            alert("Usuario incorrecto, asegurese de escribir bien el usuario y contraseña")
        })
    }

    const userNameChange = (e) =>{
        const newUserName = e.target.value
        setUserName(newUserName)
    }

    const userPasswordChange = (e) =>{
        const newUserPassword = e.target.value
        setUserPassword(newUserPassword)
    }

    return(
        !authentication.isAuthenticated ?(
        <form className='login_form' onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>
            <div className='data_login'>
                <input className='user_input' type="text" placeholder='Nombre de usuario' onChange={userNameChange} value={userName} name='name' />
                <input className='password_input' type="password" placeholder='Contraseña' onChange={userPasswordChange} value={userPassword} name='password' />
            </div>
            <input className='button_login_form' type="submit" value='Iniciar sesión'/>
            <div className='no_account_container'>
                <Link className='no_account' to="/signup">Crear nueva cuenta aquí</Link>
            </div>
        </form>):(
            <Navigate to="/"></Navigate>
        )
    )
}