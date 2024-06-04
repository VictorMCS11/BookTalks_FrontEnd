import { useEffect, useState } from "react"
import arrow_more from '../../assets/img/arrow-more.svg'
import { MessageCardsSection } from '../MessageCardSection/MessageCardSection.jsx'
import MessageService from '../../services/MessageService.js'
import { useAuth } from '../Authentication/AuthProvider.jsx'
import loadImage from '../../assets/img/loading.svg'

export function ForumCard({ forumId, title, releaseDate, opened }){

    const [isOpened, setIsOpened] = useState(opened)
    const classMore = isOpened ? "moreOpened" : "more"
    const classMoreButton = isOpened ? "moreButtonOpened" : "moreButton"

    const [messageList, setMessageList] = useState()
    const [userId, setUserid] = useState() 

    const [isLoading, setIsLoading] = useState(false)
    const sendingMessageClass =  isLoading ? '_loading' : ''

    const authentication = useAuth()

    const openMore = () =>{
        setIsOpened(!isOpened)
    }

    const handleSubmit = (e) =>{
        setIsLoading(true)
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
                        forumId: forumId
                    }
                }
                
                console.log(messageToSend)

                MessageService.createMessage({ message: messageToSend }).then(response =>{
                    console.log(response)
                }).catch(error =>{
                    console.log(error)
                })
            }else{
                alert('No se pudo enviar el mensaje 🥲')
            }
        }else{
            alert('Es necesario iniciar sesion para enviar mensajes')
        }
        setTimeout(() =>{
            setIsLoading(false)
        }, 500)
    }

    useEffect(() =>{
        if(authentication.isAuthenticated){
            const dataUser = JSON.parse(window.localStorage.getItem('loggedUser'))
            setUserid(dataUser.userId)
        }
        MessageService.getMessages(forumId).then(response =>{
            setMessageList(response)
        }).catch(error =>{
            console.log(error)
        })
    }, [isLoading])

    return (
        <div className='forumCard'>
            <div className='forumInfo'>
                <h3 className='forumTitle'>{title}</h3>
                <p className='forumReleaseDate'>{releaseDate}</p>
            </div>
            <button onClick={openMore} className={classMoreButton}>
                <img src={arrow_more} alt="" />
            </button>
            <div className={classMore}>
                <form className={'addMessage'+sendingMessageClass} onSubmit={handleSubmit}>
                    <textarea className="messageAddText" name="content"  rows="10" cols="40" placeholder="Participa en el foro enviando un mensaje ✍️..."></textarea>
                    <button className="addMessageButton">Añadir mensaje</button>
                </form>
                <div className={'sendingMessage'+sendingMessageClass}><img src={loadImage} alt="" /></div>
                <MessageCardsSection messages={messageList} userId={userId} />
            </div>
        </div>
    )
}