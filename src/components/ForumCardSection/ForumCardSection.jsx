import './forumCardSection.css'
import ForumService from '../../services/FoumService.js'
import { ForumCard } from './ForumCard.jsx'
// import { MessageCard } from '../MessageCardSection/MessageCardSection.jsx'
// import { useAuth } from '../Authentication/AuthProvider.jsx'

export function ForumCardSection(){

    const forumList = [
        {
            id: 1, 
            userId: 1, 
            title: 'Libros de aventuras', 
            releaseDate: '07/07/2012',
            messages: [
                    {
                        id: 1, 
                        userId: 1, 
                        subject: 'Asunto1', 
                        text: 'Hola que tal este es el mensaje',
                        releaseDate: '07/07/2012'
                    },
                    {
                        id: 2, 
                        userId: 4, 
                        subject: 'Asunto 2', 
                        text: 'Hola que tal este es el mensaje', 
                        releaseDate: '24/09/2023'
                    },
                    {
                        id: 2, 
                        userId: 4, 
                        subject: 'Asunto 3', 
                        text: 'Hola que tal este es el mensaje', 
                        releaseDate: '24/09/2023'
                    },
                    {
                        id: 2, 
                        userId: 4, 
                        subject: 'Asunto 4', 
                        text: 'Hola que tal este es el mensaje', 
                        releaseDate: '24/09/2023'
                    },
                ]
        },
        {
            id: 2, 
            userId: 4, 
            title: 'Beneficios de leer', 
            releaseDate: '24/09/2023',
            messages: [
                {
                    id: 1, 
                    userId: 1, 
                    subject: 'Asunto 1', 
                    text: 'Hola que tal este es el mensaje',
                    releaseDate: '07/07/2012'
                },
                {
                    id: 2, 
                    userId: 4, 
                    subject: 'Asunto 2', 
                    text: 'Hola que tal este es el mensaje',
                    releaseDate: '24/09/2023'
                },
            ]
        },
        {
            id: 2, 
            userId: 4, 
            title: 'Beneficios de leer', 
            releaseDate: '24/09/2023',
            messages: [
                {
                    id: 1, 
                    userId: 1, 
                    subject: 'Asunto 1', 
                    text: 'Hola que tal este es el mensaje',
                    releaseDate: '07/07/2012'
                },
                {
                    id: 2, 
                    userId: 4, 
                    subject: 'Asunto 2', 
                    text: 'Hola que tal este es el mensaje',
                    releaseDate: '24/09/2023'
                },
            ]
        },
    ]

    return(
        <div className='forumContainer'>
            {
                forumList.map(forum =>(
                    <ForumCard
                        key={forum.id} 
                        title={forum.title} 
                        releaseDate={forum.releaseDate}
                        opened={false}
                        messages={forum.messages}>
                    </ForumCard>
                ))
            }
        </div>
    )
}