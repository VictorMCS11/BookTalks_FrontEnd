import { Menu } from '../components/Menu/Menu.jsx'
import { ForumCardSection } from '../components/ForumCardSection/ForumCardSection.jsx'
import { Footer } from '../components/Footer/Footer.jsx'

export function Forum(){
    return(
        <>
            <Menu></Menu>
            <div className="page">
                <h1 style={{marginTop:'100px'}}>Foros</h1>
                <ForumCardSection></ForumCardSection>
            </div>
            <Footer></Footer>
        </>
    )
}