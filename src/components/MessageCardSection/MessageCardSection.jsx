import './messageCardsSection.css'
import { MessageCard } from './MessageCard.jsx'
import { useAuth } from '../Authentication/AuthProvider.jsx'

export function MessageCardsSection(messages){

    const authentication = useAuth().isAuthenticated
    
    return(
        !authentication ?(
            <div className='messageCardsSec'>
                <h2>Log in to see the messages</h2>
            </div>
        ):(
            messages ?(
                <div className='messageCardsSec'>
                    <h2>You have no messages</h2>
                </div>
            ):(
                <div className='messageCardsSec'>
                    <h2>Messages</h2>
                    {
                        messages.map(message =>(
                            <MessageCard key={message.subject} info={message}></MessageCard>
                        ))
                    }
                </div>
            )
        )
    )
}
