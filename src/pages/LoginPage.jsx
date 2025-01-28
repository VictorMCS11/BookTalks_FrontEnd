import { LoginForm } from '../components/LoginForm/LoginForm.jsx'

export default function LoginPage(){
    return(
        <>
            <img 
                className="logo_banner" 
                src="src/assets/img/logo.png" 
                alt=""
                style={{'height': '60px', 'objectFit': 'contain', 'marginTop': '120px'}}
             />
            <LoginForm />
        </>
    )
}
