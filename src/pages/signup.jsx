import { SignUpForm } from "../components/SignUpForm/SignUpForm"
import { Menu } from "../components/Menu/Menu"
import { Footer } from '../components/Footer/Footer.jsx'

export function SignUp(){
    return(
        <>
            <Menu />
            <div className="page">
                <img className="logo_banner" src="src/assets/img/logo.png" alt="" />
                <SignUpForm />
            </div>
            <Footer />
        </>
    )
}