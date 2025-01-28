import { SignUpForm } from "../components/SignUpForm/SignUpForm.jsx"

export default function SignupPage(){
    return(
        <>
            <img 
                className="logo_banner" 
                src="src/assets/img/logo.png" 
                alt=""
                style={{'height': '60px', 'object-fit': 'contain', 'marginTop': '120px'}}
             />
            <SignUpForm />

        </>
    )
}