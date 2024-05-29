import './messageCardsSection.css'

export function MessageCardsSection({ messages }){
    
    return(
        <div className='messageCardsSec'>
            {
                messages.map(message =>(
                    <div className='messageCard' key={message.id}>
                        <strong className='messageSubject'>{message.subject}</strong>
                        <span className='messageText'>{message.text}</span>
                        <p className='messageDate'>{message.releaseDate}</p>
                    </div>
                ))
            }
        </div>
    )
}
