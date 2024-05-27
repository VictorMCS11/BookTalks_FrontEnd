import { Link } from 'react-router-dom'
import './sectionsHome.css'

export function SectionsHome(){
    return(
        <section className="sections">
            <div className='sections_forum'>
                <Link to="/forum"><h2>Foros</h2><p>Entra a nuestro foro en línea para publicar mensajes sobre diferentes libros.</p></Link>
            </div>
            <div className='sections_reviews'>
                <Link to="/reviews"><h2>Reseñas</h2><p>
                Publica reseñas y evalúa tus libros leídos.</p></Link>
            </div>
        </section>
    )
}