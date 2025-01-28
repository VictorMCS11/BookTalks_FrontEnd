import './forumList.css'
import ForumService from '../../services/ForumService.js'
import UserService from '../../services/UserService.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import arrow_more from '../../assets/img/arrow-more.svg'
import addForum from '../../assets/img/addForum.svg'
import loading from '../../assets/img/loading.svg'

export function ForumList(){

    const [forumList, setForumList] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() =>{
        setIsLoading(true)
        ForumService.getForums().then(async (response) => {
            if (!response.body) return
            // Mapear las reseñas y esperar las promesas usando Promise.all
            const forumListToShow = await Promise.all(
                response.body.map(async (forum) => {
                    try {
                        const userResponse = await UserService.getUserById(forum.user_id);
                        if (!response.body[0]) return
                        const user = userResponse.body[0]; // Suponiendo que `body[0]` contiene el usuario
                        return {
                            forumId: forum.forum_id,
                            title: forum.title,
                            releaseDate: 'Publicado el '
                                + forum.release_date.slice(8,10)
                                + '/'
                                + forum.release_date.slice(5,7)
                                + '/'
                                + forum.release_date.slice(0, 4)
                                + ' a las '
                                + forum.release_date.slice(11,16),
                            user: {
                                userId: user.user_id,
                                name: user.name,
                                email: user.email,
                            },
                        };
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                        return null; // Retorna null si hay error para ignorar esta reseña
                    }
                })
            );
            // Filtrar reseñas válidas y actualizar el estado
            const filteredForums = forumListToShow.filter((forum) => forum !== null);
            setForumList(filteredForums);

        }).catch(error => {
            console.error("Error fetching reviews:", error);
        }).finally(
            setIsLoading(false)
        )
    }, [])

    return(
        <div className='forumContainer'>
            {
                isLoading ?(
                    <img className='loadForumList' src={loading} alt="" />
                ):(
                    forumList?.map(forum =>(
                        <div className='forumCard' key={forum.forumId}>
                            <div className='forumInfo'>
                                <h3 className='forumTitle'>{forum.title}<br /><span className="forumBy">{forum.user.name}</span></h3>
                                <p className='forumReleaseDate'>{forum.releaseDate}</p>
                            </div>
                            <Link to={`/forum/${forum.forumId}`} className='moreButton'>
                                <img src={arrow_more} alt="" />
                            </Link>
                        </div>
                    ))
                )
            }
        </div>
    )
}