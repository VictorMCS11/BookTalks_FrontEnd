import { BannerHome } from '../components/BannerHome/BannerHome.jsx'
import { SectionsHome } from '../components/SectionsHome/SectionsHome.jsx'

export default function HomePage(){
    return(
        <>
            <BannerHome />
            <h1 style={{'marginTop': '20px'}}>¡Bienvenido/a!</h1>
            <p>Aquí podrás:</p>
            <p>📚 Escribir y Leer Reseñas: Descubre y comparte tus opiniones sobre una amplia variedad de libros y valoralos.</p>
            <p>💬 Crear y Participar en Foros: Únete a debates enriquecedores sobre tus libros favoritos o temas literarios de interés.</p>
            <p>🔒 Inicia Sesión para una Experiencia Completa</p>
            <SectionsHome />
        </>
    )
}