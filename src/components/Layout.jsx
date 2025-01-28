import { Outlet } from "react-router-dom";
import { Menu } from "./Menu/Menu";
import { Footer } from "./Footer/Footer";
Footer

export default function Layout(){
    return(
        <>
            <Menu/>
            <div className="page">
                <Outlet></Outlet>
            </div>
            <Footer/>
        </>
    )
}