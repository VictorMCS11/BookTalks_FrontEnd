import { BannerHome } from '../components/BannerHome/BannerHome.jsx'
import { SectionsHome } from '../components/SectionsHome/SectionsHome.jsx'
import { Menu } from '../components/Menu/Menu.jsx'
import { Footer } from '../components/Footer/Footer.jsx'

export function Home(){
    return(
        <>
            <Menu />
            <div className="page">
                <BannerHome />
                <SectionsHome />
            </div>
            <Footer />
        </>
    )
}