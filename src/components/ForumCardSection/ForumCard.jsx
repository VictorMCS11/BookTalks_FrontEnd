import { useState } from "react"
import arrow_more from '../../assets/img/arrow-more.svg'
import { MessageCardsSection } from '../MessageCardSection/MessageCardSection.jsx'

export function ForumCard({ title, releaseDate, opened, messages }){

    const [isOpened, setIsOpened] = useState(opened)
    const classMore = isOpened ? "moreOpened" : "more"
    const classMoreButton = isOpened ? "moreButtonOpened" : "moreButton"

    const openMore = () =>{
        setIsOpened(!isOpened)
    }

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
                <div className="addMessage">
                <textarea className="messageAddText" name="text"  rows="10" cols="40" placeholder="Participa en el foro enviando un mensaje ✍️..."></textarea>
                    <button className="addMessageButton">Añadir mensaje</button>
                </div>
                <MessageCardsSection messages={messages}></MessageCardsSection>
            </div>
        </div>
    )
}