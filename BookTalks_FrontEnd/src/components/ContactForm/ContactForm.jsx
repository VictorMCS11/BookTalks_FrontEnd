import './contactForm.css'
import MessageService from '../../services/MessageService.js'
import { useAuth } from '../Authentication/AuthProvider.jsx'
import { useState } from 'react'

export function ContactForm(){

    const authentication = useAuth().isAuthenticated
    const [permission, setPermission] = useState('approved')

    const handleSubmit = (e) =>{
        //Validación del formulario
        e.preventDefault()
        const dataSubmit = Object.fromEntries(new window.FormData(e.target))
        const subject = dataSubmit.email
        const text = dataSubmit.textComment
        if(subject==='' || text===''){
            alert('Faltan datos') 
            return
        }else{
            if(!authentication){
                setPermission('denied')
                return
            }
            setPermission('approved')
            const message = { subject, text }
            MessageService.createMessage({ message }).then(response =>{
                if(response.ok){
                    alert('El mensaje ha sido enviado con éxito')
                }else{
                    alert('Ha habido un error')
                }
            }).catch(error =>{
                alert(error)
            })
        }
    }

    return(
        <form className="contact_form" onSubmit={handleSubmit}>
            <h4 className={permission}>You must log in to send us a message ⛔</h4>
            <h1>Send us an email</h1>
            <div className="input input_subject">
                <label className="subject">Subject</label>
                <input type="text" placeholder="" name="email" />
            </div>
            <div className="input input_mensaje">
                <label className="mensaje">Mensaje</label>
                <textarea name="textComment" rows="10" cols="40" placeholder="Text message..."></textarea>
            </div>
            <div className="button_contact">
                <input type="submit" value="send" />
            </div>
        </form>
    )
}