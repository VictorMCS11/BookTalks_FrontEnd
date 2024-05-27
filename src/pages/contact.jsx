import { ContactForm } from "../components/ContactForm/ContactForm.jsx"
import { MessageCardsSection } from '../components/MessageCardSection/MessageCardSection.jsx'
import { Menu } from "../components/Menu/Menu.jsx"
import { Footer } from '../components/Footer/Footer.jsx'

export function Contact(){
    return(
        <>
            <Menu />
            <div className="page">
                <ContactForm />
                {/* <MessageCardsSection></MessageCardsSection> */}
            </div>
            <Footer />
        </>
    )
}