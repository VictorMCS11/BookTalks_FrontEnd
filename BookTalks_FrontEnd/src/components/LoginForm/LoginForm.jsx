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
        console.log({user})
        UserService.getUser(userName, userPassword).then((response) =>{
            if(response[0].name === user.name && response[0].password === user.password){
                window.localStorage.setItem('loggedUser', JSON.stringify(response))
                window.location.reload(true)
            }else{
                console.log(response)
            }
        }).catch(error =>{
            console.log(error)
        })
    }

    const userNameChange = (e) =>{
        const newUserName = e.target.value
        setUserName(newUserName)
        console.log(newUserName)
    }

    const userPasswordChange = (e) =>{
        const newUserPassword = e.target.value
        setUserPassword(newUserPassword)
        console.log(newUserPassword)
    }

    return(
        !authentication.isAuthenticated ?(
        <form className='login_form' onSubmit={handleSubmit}>
            <h1>Login to BookTalk</h1>
            <div className='data_login'>
                <input className='user_input' type="text" placeholder='User name' onChange={userNameChange} value={userName} name='name' />
                <input className='password_input' type="text" placeholder='Password' onChange={userPasswordChange} value={userPassword} name='password' />
            </div>
            <input className='button_login_form' type="submit" value='Log in'/>
            <Link className='no_account' to="/signup">Create an account here</Link>
        </form>):(
            <Navigate to="/"></Navigate>
        )
    )
}