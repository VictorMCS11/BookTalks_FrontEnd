export function MessageCard({message}){
    return (
        <div className='messageCard'>
            <strong className='messageSubject'>{message['subject']}</strong>
            <span className='messageText'>{message['text']}</span>
            <p className='messageDate'>{message['date']}</p>
        </div>
    )
}