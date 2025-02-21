import { SignUpForm } from "../components/SignUpForm/SignUpForm.jsx"
import logo from '../assets/img/logo.png'

export default function SignupPage(){
    return(
        <>
            <img 
                className="logo_banner" 
                src={logo} 
                alt=""
                style={{'height': '60px', 'objectFit': 'contain', 'marginTop': '120px'}}
             />
            <SignUpForm />

        </>
    )
}