import { ContactForm } from "../components/ContactForm/ContactForm.jsx"
import { Menu } from "../components/Menu/Menu.jsx"
import { Footer } from '../components/Footer/Footer.jsx'

export function Contact(){
    return(
        <>
            <Menu />
            <div className="page">
                <ContactForm />
            </div>
            <Footer />
        </>
    )
}