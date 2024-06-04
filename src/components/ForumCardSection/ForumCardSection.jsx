import './forumCardSection.css'
import ForumService from '../../services/FoumService.js'
import { ForumCard } from './ForumCard.jsx'
import { useEffect } from 'react'
import { useState } from 'react'
// import { MessageCard } from '../MessageCardSection/MessageCardSection.jsx'
// import { useAuth } from '../Authentication/AuthProvider.jsx'

export function ForumCardSection(){

    const [forumList, setForumList] = useState([])

    useEffect(() =>{
        ForumService.getForums().then(response =>{
            setForumList(response)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

    return(
        <div className='forumContainer'>
            {
                forumList?.map(forum =>(
                    <ForumCard
                        key={forum.forumId} 
                        forumId={forum.forumId}
                        title={forum.title} 
                        releaseDate={forum.releaseDate}
                        opened={false}>
                    </ForumCard>
                ))
            }
        </div>
    )
}