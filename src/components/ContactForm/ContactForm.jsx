import './contactForm.css'
import { useAuth } from '../Authentication/AuthProvider.jsx'
import { useState } from 'react'
import { useRef } from 'react'
import emailjs from '@emailjs/browser'

export function ContactForm(){

    const authentication = useAuth().isAuthenticated
    const [permission, setPermission] = useState('approved')
    const [permissionMessage, setPermissionMessage] = useState('')
    const [loading, setLoading] = useState(false)
    const refForm = useRef()

    const SERVICE_ID = 'service_zuthhgg'
    const TEMPLATE_ID = 'template_3hxz1ac'
    const API_KEY = 'ig5BlAG_BjtsZKVrS'
    const username = authentication ? JSON.parse(window.localStorage.getItem('loggedUser')).name : ''

    const handleSubmit = (e) =>{
        //Validación del formulario
        if(permission === 'denied') return
        setLoading(true)
        e.preventDefault()
        const dataSubmit = Object.fromEntries(new window.FormData(e.target))
        const subject = dataSubmit.subject
        const email = dataSubmit.email
        const message = dataSubmit.message

        if(subject==='' || message==='' || email===''){
            setPermission('denied')
            setPermissionMessage('Te faltan datos por insertar ⛔')

        }else if(!authentication){
                setPermission('denied')
                setPermissionMessage('Debes iniciar sesión para enviarnos un mensaje ⛔')
        }else{
            emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, refForm.current, API_KEY)
            .then(response =>{
                console.log(response)
                setPermissionMessage('¡Mensaje enviado con éxito! 😎')
                setPermission('sent')
            })
            .catch(error =>{
                console.error(error)
                setPermissionMessage('Error al enviar el mensaje 💀')
                setPermission('denied')
            })
        }
        setTimeout(() => {
            setPermission('approved');
            setLoading(false)
          }, "3000");
    }

    return(
        <form className="contact_form" onSubmit={handleSubmit} ref={refForm}>
            <h4 className={permission}>{permissionMessage}</h4>
            <h1>Envíanos un correo</h1>

            <div className='loading' style={loading ? {display:'flex'} : {display:'none'}}>
                <img className='loading_svg' src="../../src/assets/img/loading.svg" alt="" />
            </div>

            <div className='subject_email'>
                <div className="input input_subject">
                    <label className="subject">Asunto</label>
                    <input type="text" placeholder="Mi perro se ha comido mi libro... 💀" name="subject" />
                </div>
                <div className="input input_email">
                    <label className="email">Tu correo</label>
                    <input type="email" placeholder="ejemplo@gmail.com" name="email" />
                </div>
            </div>

            <input style={{display: 'none'}} readOnly type="text" name='username' value={username} />

            <div className="input input_mensaje">
                <label className="mensaje">Mensaje</label>
                <textarea name="message" rows="10" cols="40" placeholder="Mi perro estaba.."></textarea>
            </div>

            <div className="button_contact">
                <input type="submit" value="Enviar" />
            </div>
        </form>
    )
}