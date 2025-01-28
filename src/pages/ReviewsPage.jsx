import { BookSearch } from '../components/BookSearch/BookSearch.jsx'
import BookDetails from '../components/BookDetails/BookDetails.jsx'
import { Route, Routes } from 'react-router-dom'

export default function ReviewsPage(){
    return(
        <>
            <h1 style={{marginTop:'100px'}}>Reseñas</h1>
            <Routes>
                <Route index element={<BookSearch/>}></Route>
                <Route path=':bookTitle' element={<BookDetails/>}></Route>
            </Routes>
        </>
    )
}