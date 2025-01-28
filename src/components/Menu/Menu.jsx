import { Link } from "react-router-dom"
import { useAuth } from '../Authentication/AuthProvider'
import logo from '../../assets/img/logo.png'
import menu_closed from '../../assets/img/menu_closed.svg'
import menu_opened from '../../assets/img/menu_opened.svg'
import './menu.css'
import { useEffect } from "react"
import { useState } from "react"

export function Menu() {

    const authentication = useAuth()
    const [userName, setUserName] = useState("")
    const [menuOpenClose, setMenuOpenClose] = useState(menu_closed)

    useEffect(() =>{
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            const name = JSON.parse(loggedUserJSON)
            setUserName(name.name)
        }
    }, [])

    const closeSession = () =>{
        window.localStorage.removeItem('loggedUser')
        window.location.reload(true)
    }

    const menuOpenCloseChange = (e) =>{
        const checked = e.target.checked
        setMenuOpenClose(checked ? menu_opened : menu_closed)
    }

    const links = [
        {
            name: "Inicio",
            href: "/"
        },
        {
            name: "Foros",
            href: "/forum"
        },
        {
            name: "Reseñas",
            href: "/reviews"
        },
        {
            name: "Contacto",
            href: "/contact"
        },
        {
            name: "Iniciar sesión",
            href: "/login"
        },
        {
            name: "Registrarse",
            href: "/signup"
        },
    ]

    return(
        !authentication.isAuthenticated ? (
            <section className="menu">
                <div className="menu_container">
                    <Link to={links[0].href} className="menu_logo"><img src={logo} alt="" /><span>BookTalk</span></Link>
                    <div className="menu_sections">
                        <Link to={links[0].href} className="menu_option">{links[0].name}</Link>
                        <div className="talks">
                            <a className="menu_talks">talks</a>
                            <ul className="menu_suboptions">
                                <div className="style_menu_suboption"></div>
                                <Link to={links[1].href} className="menu_suboption">{links[1].name}</Link>
                                <Link to={links[2].href} className="menu_suboption">{links[2].name}</Link>
                            </ul>
                        </div>
                        <Link to={links[3].href} className="menu_option">{links[3].name}</Link>
                    </div>    
                    <div className="menu_login">
                        <Link to={links[4].href} className="button_login">{links[4].name}</Link>
                        <Link to={links[5].href} className="button_checkin">{links[5].name}</Link>
                    </div>
                    <label className="menu_open_close" id="menu_open_close_button">
                        <input type="checkbox" name="menu_open_close_button" onChange={menuOpenCloseChange} hidden />
                        <img className="menu_closed" src={menuOpenClose} alt="" />
                    </label>
                </div>
            </section>
        ):(
            <section className="menu">
                <div className="menu_container">
                    <Link to={links[0].href} className="menu_logo"><img src={logo} alt="" /><span>BookTalk</span></Link>
                    <div className="menu_sections">
                        <Link to={links[0].href} className="menu_option">{links[0].name}</Link>
                        <div className="talks">
                            <a className="menu_talks">talks</a>
                            <ul className="menu_suboptions">
                                <div className="style_menu_suboption"></div>
                                <Link to={links[1].href} className="menu_suboption">{links[1].name}</Link>
                                <Link to={links[2].href} className="menu_suboption">{links[2].name}</Link>
                            </ul>
                        </div>
                        <Link to={links[3].href} className="menu_option">{links[3].name}</Link>
                    </div>
                    <div className="menu_logged">
                        <p className="logged_name_user">{userName}</p>
                        <button className="button_close_session" onClick={closeSession}>cerrar sesión</button>
                    </div>
                    {/* <div className="menu_open_close">
                        <input type="checkbox" />
                        <img className="menu_opened" src={menu_opened} alt="" />
                    </div> */}
                </div>
            </section>
        )
    )
}