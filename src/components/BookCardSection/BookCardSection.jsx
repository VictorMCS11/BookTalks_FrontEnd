import './bookCardSection.css'
import BookService from '../../services/BookService.js'
import { useEffect, useState } from 'react'
import xImage from '../../assets/img/x.svg'
import { ReviewCardSection } from '../ReviewCardSection/ReviewCardSection.jsx'
import loadImage from '../../assets/img/loading.svg'
import { useAuth } from '../Authentication/AuthProvider'

export function BookCardSection(){

    const authentication = useAuth()

    const [openReview, setOpenReview] = useState(false)
    const [bookList, setBookList] = useState([])
    const [loadingBooks, setLoadingBooks] = useState(true)

    const [id, setId] = useState()
    const [title, setTitle] = useState('')
    const [author, setauthor] = useState('')
    const [releaseDate, setReleaseDate] = useState('')
    const [urlImage, setUrlImage] = useState('')

    useEffect(() => {
        setLoadingBooks(true)
        if(!openReview){
            BookService.getBooks().then(response =>{
                const booksToShow = response?.map(book =>(
                    {
                        bookId: book.bookId,
                        title: book.title,
                        author: book.author,
                        releaseDate: book.releaseDate.slice(0, 10),
                        urlImage: book.urlImage
                    }
                ))
                setBookList(booksToShow)
            }).catch(error =>{
                console.log(error)
            }).finally(setLoadingBooks(!loadingBooks))

        }else{
            setBookList([])
        }
      }, [openReview]);


    const handleSubmit = (e) =>{
        e.preventDefault()
        const dataBook = Object.fromEntries( new window.FormData(e.target)) 
        const bookOpened = bookList.find((book) => book.bookId == dataBook.bookId)
        setOpenReview(!openReview)
        setTitle(bookOpened.title)
        setauthor(bookOpened.author)
        setReleaseDate(bookOpened.releaseDate.slice(0, 10))
        setUrlImage(bookOpened.urlImage)
        setId(bookOpened.bookId)
    }

    const handleCloseReview = () =>{
        setOpenReview(!openReview)
    }

    const openReviewClass = openReview ? '_open' : ''

    return (
        <div className='bookContainer'>
            {
                loadingBooks ? 
                <img className='loadingBooks' src={loadImage} alt="" />
                :
                bookList?.map(book =>(
                    <form className='bookCard' key={book.bookId} onSubmit={handleSubmit}>
                        <img className='bookCover' src={book.urlImage} alt="" />
                        <div className='title_author'>
                            <h3>{book.title}</h3>
                            <strong>{book.author}</strong>
                        </div>
                        <p>{book.releaseDate}</p>
                        <input readOnly className='bookId' name='bookId' value={book.bookId} />
                        <input type="submit" className='buttonSumbitBook' />
                    </form>
                ))
            }
            <div className={'bookReviews' + openReviewClass}>
                <div className='bookDataCard'>
                    <img className='bookCover' src={urlImage} alt="" />
                    <div className='title_author'>
                        <h3>{title}</h3>
                        <strong>{author}</strong>
                    </div>
                    <p>{'Lanzamiento:'}<br></br><b>{releaseDate}</b></p>
                </div>
                <button onClick={handleCloseReview} className='closeBookReview'><img src={xImage} alt="" /></button>
                <ReviewCardSection bookId={id} authentication={authentication}></ReviewCardSection>
            </div>
        </div>  
    )
}