import { Menu } from '../components/Menu/Menu.jsx'
import { Footer } from '../components/Footer/Footer.jsx'
import { BookCardSection } from '../components/BookCardSection/BookCardSection.jsx'
import { useState } from 'react'

export function Reviews(){
    // const [isReviewsSelected, setIsReviewsSelected] = useState(true)
    // const [isBooksSelected, setIsBooksSelected] = useState(false)

    // const reviewButtonClass = isReviewsSelected ? 'reviewsSelected' : ''
    // const booksButtonClass = isBooksSelected ? 'booksSelected' : ''

    // const handleClickReviews = () =>{
    //     if(!isReviewsSelected){
    //         setIsReviewsSelected(true)
    //         setIsBooksSelected(false)
    //     }
    // }
    // const handleClickBooks = () =>{
    //     if(!isBooksSelected){
    //         setIsBooksSelected(true)
    //         setIsReviewsSelected(false)
    //     }
    // }

    return(
        <>
            <Menu></Menu>
            <div className="page">
                <h1 style={{marginTop:'100px'}}>Reseñas</h1>
                {/* <div className="reviewBooksButtons">
                    <button onClick={handleClickReviews} className={reviewButtonClass}>Reseñas</button>
                    <button onClick={handleClickBooks} className={booksButtonClass}>Libros</button>
                </div> */}
                <BookCardSection></BookCardSection>
            </div>
            <Footer></Footer>
        </>
    )
}