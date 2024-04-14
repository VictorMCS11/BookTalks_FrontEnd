import { Link } from 'react-router-dom'
import './sectionsHome.css'

export function SectionsHome(){
    return(
        <section className="sections">
            <div className='sections_forum'>
                <Link to="/forum"><h2>forum</h2><p>Enter our online forum to post messages about different books</p></Link>
            </div>
            <div className='sections_reviews'>
                <Link to="/reviews"><h2>reviews</h2><p>
                Publish reviews and evaluate your read books</p></Link>
            </div>
        </section>
    )
}