// import './messageCardsSection.css'
// import MessageService from '../../services/MessageService'
// import { useEffect, useState } from 'react'

// export function MessageCardsSection({ messages, userId }){

//     const [messageList, setMessageList] = useState()
//     const [messageId, setMessageId] = useState()
//     // const [messageId, setMessageId] = useState()

//     const deleteMessage = (e) =>{
//         e.preventDefault()
//         const newMessageId = Object.fromEntries( new window.FormData(e.target)).messageId
//         setMessageId(newMessageId)
//         // setMessageId(idFromMessage)
//         MessageService.deleteMessage(messageId).then(response =>{
//             console.log(response)
//         }).catch(error =>{
//             console.log(error)
//         })
//     }

//     useEffect(() =>{
//         const newMessages = messages?.filter(m => m.messageId !== messageId)
//         setMessageList(newMessages)
//         console.log(messageList)
//     }, [messageId]) 
    
//     return(
//         <div className='messageCardsSec'>
//             {
//                 messageList?.map(message =>(
//                     <form className='messageCard' key={message.messageId} onSubmit={deleteMessage}>
//                         <strong className='messageSubject'>{message.user.name}</strong>
//                         <span className='messageText'>{message.content}</span>
//                         <p className='messageDate'>{message.releaseDate}</p>
//                         <input readOnly type="number" value={message.messageId} name='messageId' style={{display: 'none'}} />
//                         {   /* condicion que comprueba que el usuario loggeado puede borrar mensajes */
//                             message.user.userId === userId ?(
//                                 <button className='messageDeleteButton'>Borrar</button>
//                             ):(
//                                 null
//                             )
//                         }
//                     </form>
//                 ))
//             } 
//         </div>
//     )
// }
