import './messageCardsSection.css'
import MessageService from '../../services/MessageService'

export function MessageCardsSection({ messages, userId }){

    const deleteMessage = () =>{
        
    }
    
    return(
        <div className='messageCardsSec'>
            {
                messages?.map(message =>(
                    <div className='messageCard' key={message.messageId}>
                        <strong className='messageSubject'>{message.user.name}</strong>
                        <span className='messageText'>{message.content}</span>
                        <p className='messageDate'>{message.releaseDate}</p>
                        {   /* condicion que comprueba que el usuario loggeado puede borrar mensajes */
                            message.user.userId === userId ?(
                                <button className='messageDeleteButton' onClick={deleteMessage}>Borrar</button>
                            ):(
                                null
                            )
                        }

                    </div>
                ))
            } 
        </div>
    )
}
