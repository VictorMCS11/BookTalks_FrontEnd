import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import MessageService from '../../services/MessageService.js'
import ForumService from "../../services/ForumService.js"
import UserService from '../../services/UserService.js'
import { useAuth } from '../Authentication/AuthProvider.jsx'
import loadImage from '../../assets/img/loading.svg'
import { useParams } from "react-router-dom"
import './forumMessages.css'
import xImage from '../../assets/img/x.svg'

export function ForumMessages(){

    const authentication = useAuth()
    const userId = authentication.isAuthenticated ? authentication.userLogged.loggedId : undefined

    const forumId = useParams()
    const [forum, setForum] = useState({})
    const [forumUser, setForumUser] = useState({})

    const [messageList, setMessageList] = useState([])

    const [isLoading, setIsLoading] = useState(false)
    const sendingMessageClass =  isLoading ? '_loading' : ''

    const loadMessages = () =>{
        setIsLoading(true)
        ForumService.getForum(forumId['*'])
        .then((response) => {
            if (!response.body?.[0]) return; // Exit if no forum data is found
    
            const forumData = response.body[0]; // Get the forum data
            const forumToShow = {
                forumId: forumData.forum_id,
                title: forumData.title,
                releaseDate: `Publicado el ${forumData.release_date.slice(8, 10)} del ${forumData.release_date.slice(5, 7)} de ${forumData.release_date.slice(0, 4)} a las ${forumData.release_date.slice(11, 16)}`,
                userId: forumData.user_id
            };
    
            setForum(forumToShow);
            // Load the forum owner details
            UserService.getUserById(forumToShow.userId)
                .then((response) => {
                    if (!response.body?.[0]) return; // Exit if no user data is found
    
                    const forumUser = response.body[0];
                    const forumUserToShow = {
                        userId: forumUser.user_id,
                        name: forumUser.name,
                        email: forumUser.email
                    };
    
                    setForumUser(forumUserToShow);
                })
                .catch((error) => {
                    console.error("Error fetching forum user details:", error);
                });
        })
        .catch((error) => {
            console.error("Error fetching forum details:", error);
        });    

        MessageService.getMessages(forumId['*']).then(async response =>{
            // setMessageList(response.body)
            if(!response.body) return
            const messageListToShow = await Promise.all(
                response.body.map( async message =>{
                    try {
                        const userResponse = await UserService.getUserById(message.user_id);
                        const user = userResponse.body[0];
                        return {
                            messageId: message.message_id,
                            content: message.content,
                            releaseDate: 'Enviado el '
                                + message.release_date.slice(8,10)
                                + ' del '
                                + message.release_date.slice(5,7)
                                + ' de '
                                + message.release_date.slice(0, 4)
                                + ' a las '
                                + message.release_date.slice(11,16),
                            user: {
                                userId: user.user_id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                            },
                        };
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                        return null; // Retorna null si hay error para ignorar esta reseña
                    }
                })
            )
            setMessageList(messageListToShow)
        }).catch(error =>{
            console.log(error)
            return null
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
        loadMessages()
    }, [])

    return (
        <div className='forumMessagesContainer'>
            <Link to='/forum' className='closeForum'><img src={xImage} alt="" /></Link>
            <div className="forumHead">
                <h3 className="forumTitle">{forum.title} <br /> <span className="forumBy">{'@'+forumUser.name}</span></h3>
                <p className="forumReleaseDate">{forum.releaseDate}</p>
            </div>
            <div className='moreOpened'>
                <form className={'addMessage'} onSubmit={handleSubmit}>
                    <textarea className="messageAddText" name="content"  rows="40" cols="40" placeholder="Participa en el foro enviando un mensaje ✍️..."></textarea>
                    <button className="addMessageButton">Añadir mensaje</button>
                </form>
                <div className='messageCardsSec'>
                    <div className={'sendingMessage'+sendingMessageClass}>
                        <img src={loadImage} alt="" />
                    </div>
                {
                    messageList?.slice().reverse().map(message =>(
                        <form className={'messageCard'+sendingMessageClass} key={message.messageId} onSubmit={deleteMessage}>
                            <strong className='messageSubject'>{'@'+message.user.name}</strong>
                            <span className='messageText'>{message.content}</span>
                            <p className='messageDate'>{message.releaseDate}</p>
                            <input readOnly type="number" value={message.messageId} name='messageId' style={{display: 'none'}} />
                            {   /* condicion que comprueba que el usuario loggeado puede borrar mensajes */
                                message.user.userId === userId ?(
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