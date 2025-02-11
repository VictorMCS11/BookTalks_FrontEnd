import { BookReviews } from '../BookReviews/BookReviews.jsx'
import { useParams } from 'react-router-dom'
import xImage from '../../assets/img/x.svg'
import { useState, useEffect } from 'react'
import loadImage from '../../assets/img/loading.svg'
import BookService from '../../services/BookService.js'
import ReviewService from '../../services/ReviewService.js'
import { Link } from 'react-router-dom'
import './bookDetails.css'

export default function BookDetails(){
    const title = useParams();
  
    const [loadingBooks, setLoadingBooks] = useState(true);
    const [book, setBook] = useState(null);
  
    useEffect(() => {
        setLoadingBooks(true);
        BookService.getBook(title['*']).then((bookResponse) => {
            if (!bookResponse.body) return;
    
            const bookData = bookResponse.body[0]; // Asignamos la data correctamente
                
            return ReviewService.getBookReviews({ bookId: bookData.book_id }).then((reviewsResponse) => {
                let totalScore = 0;
                let scoreText = "";
    
                if (reviewsResponse.body?.length > 0) {
                    totalScore = reviewsResponse.body.reduce((acc, review) => acc + review.score, 0);
                    scoreText = (totalScore / reviewsResponse.body.length).toFixed(1); // Calculamos el promedio
                }
    
                const bookToShow = {
                    bookId: bookData.book_id,
                    title: bookData.title,
                    author: bookData.author,
                    releaseDate: bookData.release_date.slice(0, 10),
                    urlImage: `http://localhost:3000/${bookData.url_image}`,
                    score: scoreText > 0 ? 'Nota Media: ' + scoreText.replace('.', ',') + ' / 5 \n ' + reviewsResponse.body.length + ' puntuaciones' : 'No tiene puntuaciones',
                };
                setBook(bookToShow);
            });
        }).catch((error) => {
            console.error("Error fetching book:", error);
        }).finally(() => {
            setLoadingBooks(false);
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
                            <span className="score_book">{`${book.score}`}</span>
                        </div>
                        <p><b>{book.releaseDate}</b></p>
                    </div>
                    <BookReviews bookId={book.bookId}></BookReviews>
                </div>
            </div>
        )
    )
} 