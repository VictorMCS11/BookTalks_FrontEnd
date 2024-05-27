import logo from '../../assets/img/logo.png'
import './footer.css'

export function Footer(){
    return(
        <div className="footer">
            <img src={logo} alt="" />
            <hr />
            <p>VictorMCS11@gmail.com<br></br>ethan.h.botia@gmail.com</p>
        </div>
    )
}