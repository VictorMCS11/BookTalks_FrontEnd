import './forumList.css'
import ForumService from '../../services/ForumService.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import arrow_more from '../../assets/img/arrow-more.svg'

export function ForumList(){

    const [forumList, setForumList] = useState([])

    useEffect(() =>{
        ForumService.getForums().then(response =>{
            setForumList(response.body)
        }).catch(error =>{
            console.log(error)
        })
    }, [])

    return(
        <div className='forumContainer'>
            {
                forumList?.map(forum =>(
                    <div className='forumCard' key={forum.forum_id}>
                        <div className='forumInfo'>
                            <h3 className='forumTitle'>{forum.title}</h3>
                            <p className='forumReleaseDate'>{forum.release_date.slice(0, 10)}</p>
                        </div>
                        <Link to={`/forum/${forum.forum_id}`} className='moreButton'>
                            <img src={arrow_more} alt="" />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}