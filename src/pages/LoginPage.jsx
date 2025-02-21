import { LoginForm } from '../components/LoginForm/LoginForm.jsx'
import  logo  from '../assets/img/logo.png'

export default function LoginPage(){
    return(
        <>
            <img 
                className="logo_banner" 
                src={logo}
                alt=""
                style={{'height': '60px', 'objectFit': 'contain', 'marginTop': '120px'}}
             />
            <LoginForm />
        </>
    )
}
