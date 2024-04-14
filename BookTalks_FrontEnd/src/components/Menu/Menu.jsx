import { Link } from "react-router-dom"
import { useAuth } from '../Authentication/AuthProvider'
import logo from '../../assets/img/logo.png'
import './menu.css'
import { useEffect } from "react"
import { useState } from "react"

export function Menu() {

    const authentication = useAuth()
    const [userName, setUserName] = useState("")

    useEffect(() =>{
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if(loggedUserJSON){
            const name = JSON.parse(loggedUserJSON)
            setUserName(name[0].name)
        }
    }, [])

    const closeSession = () =>{
        window.localStorage.removeItem('loggedUser')
        window.location.reload(true)
    }

    const links = [
        {
            name: "home",
            href: "/"
        },
        {
            name: "forum",
            href: "/forum"
        },
        {
            name: "reviews",
            href: "/reviews"
        },
        {
            name: "contact",
            href: "/contact"
        },
        {
            name: "log in",
            href: "/login"
        },
        {
            name: "sign up",
            href: "/signup"
        },
    ]

    return(
        !authentication.isAuthenticated ? (
            <section className="menu">
                <Link to={links[0].href} className="menu_logo"><img src={logo} alt="" /></Link>
                <Link to={links[0].href} className="menu_option">{links[0].name}</Link>
                <div className="talks">
                    <a className="menu_talks">talks</a>
                    <ul className="menu_suboptions">
                        <div className="style_menu_suboption"></div>
                        <li><Link to={links[1].href} className="menu_suboption">{links[1].name}</Link></li>
                        <li><Link to={links[2].href} className="menu_suboption">{links[2].name}</Link></li>
                    </ul>
                </div>
                <Link to={links[3].href} className="menu_option">{links[3].name}</Link>
                <div className="menu_login">
                    <Link to={links[4].href} className="button_login">{links[4].name}</Link>
                    <Link to={links[5].href} className="button_checkin">{links[5].name}</Link>
                </div>
            </section>
        ):(
            <section className="menu">
            <Link to={links[0].href} className="menu_logo"><img src={logo} alt="" /></Link>
            <Link to={links[0].href} className="menu_option">{links[0].name}</Link>
            <div className="talks">
                <a className="menu_talks">talks</a>
                <ul className="menu_suboptions">
                    <div className="style_menu_suboption"></div>
                    <li><Link to={links[1].href} className="menu_suboption">{links[1].name}</Link></li>
                    <li><Link to={links[2].href} className="menu_suboption">{links[2].name}</Link></li>
                </ul>
            </div>
            <Link to={links[3].href} className="menu_option">{links[3].name}</Link>
            <div className="menu_logged">
                <p className="logged_name_user">{userName}</p>
                <button className="button_close_session" onClick={closeSession}>close session</button>
            </div>
        </section>
        )
    )
}