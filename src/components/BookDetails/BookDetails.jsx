import { BookReviews } from '../BookReviews/BookReviews.jsx'
import { useParams } from 'react-router-dom'
import xImage from '../../assets/img/x.svg'
import { useState, useEffect } from 'react'
import loadImage from '../../assets/img/loading.svg'
import BookService from '../../services/BookService.js'
import { Link } from 'react-router-dom'
import './bookDetails.css'

export default function BookDetails(){
    const title = useParams();
  
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [book, setBook] = useState(null);
  
    useEffect(() => {
        setLoadingBooks(true);
        BookService.getBook(title['*']).then((response) => {
            let bookToShow = response.body[0]
            bookToShow = {
                bookId: bookToShow.book_id,
                title: bookToShow.title,
                author: bookToShow.author,
                releaseDate: bookToShow.release_date.slice(0, 10),
                urlImage: 'http://localhost:3000/' + bookToShow.url_image
            }
            setBook(bookToShow)
        })
        .catch((error) => {
          console.error('Error fetching book:', error);
        })
        .finally(() => {
            setLoadingBooks(!loadingBooks);
        });
    }, []);

    return(
        loadingBooks?(
            <div className='bookContainer'>
                <img src={loadImage} alt="" />
            </div>
        ):(
            <div className='bookDetailContainer'>
                <div className='bookReviews'>
                    <Link to='/reviews' className='closeBookReview'><img src={xImage} alt="" /></Link>
                    <div className='bookDataCard'>
                        <img className='bookCover' src={book.urlImage} alt="" />
                        <div className='title_author'>
                            <h3>{book.title}</h3>
                            <strong>{book.author}</strong>
                        </div>
                        <p><b>{book.releaseDate}</b></p>
                    </div>
                    <BookReviews bookId={book.bookId}></BookReviews>
                </div>
            </div>
        )
    )
} 