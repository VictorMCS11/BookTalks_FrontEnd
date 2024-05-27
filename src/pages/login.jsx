import { Menu } from '../components/Menu/Menu.jsx'
import { LoginForm } from '../components/LoginForm/LoginForm.jsx'
import { Footer } from '../components/Footer/Footer.jsx'

export function LogIn(){
    return(
        <>
            <Menu />
            <div className="page">
                <img className="logo_banner" src="src/assets/img/logo.png" alt="" />
                <LoginForm />
            </div>
            <Footer />
        </>
    )
}
