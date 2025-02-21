import logo from '../../assets/img/logo.png'
import './footer.css'

export function Footer(){
    return(
        <div className="footer">
            <div className="footer_container">
                <img src={logo} alt="" />
                <hr />
                <p>VictorMCS11@gmail.com</p>
            </div>
        </div>
    )
}