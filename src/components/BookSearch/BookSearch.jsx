import './bookSearch.css'
import BookService from '../../services/BookService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import { Link } from 'react-router-dom'

export function BookSearch(){

    const [bookList, setBookList] = useState([])
    const [loadingBooks, setLoadingBooks] = useState(true)

    useEffect(() => {
        setLoadingBooks(true)
        BookService.getBooks().then(response =>{
            const booksToShow = response.body?.map(book =>(
                {
                    bookId: book.book_id,
                    title: book.title,
                    author: book.author,
                    releaseDate: book.release_date.slice(0, 10),
                    urlImage: book.url_image
                }
            ))
            setBookList(booksToShow)
        }).catch(error =>{
            console.log(error)
        }).finally(setLoadingBooks(!loadingBooks))
      }, []);

    return (
        <div className='bookContainer'>
            {
                loadingBooks ?( 
                    <img className='loadingBooks' src={loadImage} alt="" />
                ):(
                    bookList?.map(book =>(
                        <Link to={`/reviews/${book.title}`} className='bookCard' key={book.bookId}>
                            <img className='bookCover' src={book.urlImage} alt="" />
                            <div className='title_author'>
                                <h3>{book.title}</h3>
                                <strong>{book.author}</strong>
                            </div>
                            <p>{book.releaseDate}</p>
                        </Link>
                    ))
                )
            }
        </div>  
    )
}