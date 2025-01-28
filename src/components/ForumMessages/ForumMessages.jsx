import { useEffect, useState } from "react"
import MessageService from '../../services/MessageService.js'
import ForumService from "../../services/ForumService.js"
import { useAuth } from '../Authentication/AuthProvider.jsx'
import loadImage from '../../assets/img/loading.svg'
import { useParams } from "react-router-dom"
import './forumMessages.css'

export function ForumMessages(){

    const forumId = useParams()
    const [forum, setForum] = useState({})

    const [messageList, setMessageList] = useState([])
    const [userId, setUserId] = useState() 

    const [isLoading, setIsLoading] = useState(false)
    const sendingMessageClass =  isLoading ? '_loading' : ''

    const authentication = useAuth()

    const loadMessages = () =>{
        setIsLoading(true)
        ForumService.getForum(forumId['*']).then(response =>{
            setForum(response.body[0])
        }).catch(error =>{
            console.log(error)
        })
        MessageService.getMessages(forumId['*']).then(response =>{
            setMessageList(response.body)
        }).catch(error =>{
            console.log(error)
        }).finally(setIsLoading(false))
    }

    const handleSubmit = (e) =>{
        if(authentication.isAuthenticated){
            e.preventDefault()
            const dataMessage = Object.fromEntries(new window.FormData(e.target))

            if(dataMessage.content !== ''){
                const messageToSend = {
                    content: dataMessage.content,
                    user: {
                        userId: userId
                    },
                    forum: {
                        forumId: forumId['*']
                    }
                }
                MessageService.createMessage({ message: messageToSend }).then(
                    document.querySelector('.messageAddText').value = ''
                ).catch(error =>{
                    console.log(error)
                }).finally(loadMessages)
            }else{
                alert('No se pudo enviar el mensaje 🥲')
            }
        }else{
            alert('Es necesario iniciar sesion para enviar mensajes')
        }
    }

    const deleteMessage = (e) =>{
        e.preventDefault()
        const messageId = Object.fromEntries( new window.FormData(e.target)).messageId
        MessageService.deleteMessage(messageId)
            .then()
            .catch(error =>{console.log(error)})
            .finally(loadMessages)
    }

    useEffect(() =>{
        const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
        setUserId(loggedUser.user_id)
        loadMessages()
    }, [])

    return (
        <div className='forumMessagesContainer'>
            <div className="forumHead">
                <h3 className="forumTitle">{forum.title} <span>by name</span></h3>
                <p className="forumReleaseDate">{forum.release_date}</p>
            </div>
            <div className='moreOpened'>
                <form className={'addMessage'} onSubmit={handleSubmit}>
                    <textarea className="messageAddText" name="content"  rows="10" cols="40" placeholder="Participa en el foro enviando un mensaje ✍️..."></textarea>
                    <button className="addMessageButton">Añadir mensaje</button>
                </form>
                <div className='messageCardsSec'>
                    <div className={'sendingMessage'+sendingMessageClass}>
                        <img src={loadImage} alt="" />
                    </div>
                {
                    messageList?.slice().reverse().map(message =>(
                        <form className={'messageCard'+sendingMessageClass} key={message.message_id} onSubmit={deleteMessage}>
                            <strong className='messageSubject'>{message.user_id}</strong>
                            <span className='messageText'>{message.content}</span>
                            <p className='messageDate'>{message.release_date.slice(0, 10)}</p>
                            <input readOnly type="number" value={message.message_id} name='messageId' style={{display: 'none'}} />
                            {   /* condicion que comprueba que el usuario loggeado puede borrar mensajes */
                                message.user_id === userId ?(
                                    <button className='messageDeleteButton'>Borrar</button>
                                ):(
                                    null
                                )
                            }
                        </form>
                    ))
                } 
                </div>
            </div>
        </div>
    )
}