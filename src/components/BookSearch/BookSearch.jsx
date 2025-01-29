import './bookSearch.css'
import BookService from '../../services/BookService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import { Link } from 'react-router-dom'
import delete_left from '../../assets/img/delete-left.svg'

export function BookSearch(){

    const [bookList, setBookList] = useState([])
    const [loadingBooks, setLoadingBooks] = useState(true)
    const [search, setSearch] = useState('')

    const showBooks = (books) =>{
        const booksToShow = books?.map(book =>(
            {
                bookId: book.book_id,
                title: book.title,
                author: book.author,
                releaseDate: book.release_date.slice(0, 10),
                urlImage: book.url_image
            }
        ))
        setBookList(booksToShow)
    }

    const deleteSearch = () =>{
        if(search === '') return
        setSearch('')
        setBookList([])
    }

    const handleSearch = (e) =>{
        e.preventDefault()
        const currentSearch = search.replaceAll(' ', '%20')
        BookService.getBook(currentSearch).then(response =>{
            if(response.body[0] === ''){
                setBookList([])
                return
            } 
            showBooks(response.body)
        }).catch(err =>{
            console.log(err)
        })
    }

    useEffect(() => {
        setLoadingBooks(true)
        BookService.getBooks().then(response =>{
            showBooks(response.body)
        }).catch(error =>{
            console.log(error)
        }).finally(setLoadingBooks(!loadingBooks))
      }, []);

    return (
        <div className='bookContainer'>
            <form className='book_search' onSubmit={handleSearch}>
                <input className='button_search' type="submit" value="Buscar" />
                <input type="text" className='search_engine' placeholder='El principito, El arte de la guerra ...' value={search} onChange={(e) => setSearch(e.target.value, console.log(e.target.value))} />
                <button className='delete_search' onClick={deleteSearch}><img src={delete_left} /></button>
            </form>
            {
                loadingBooks ?( 
                    <img className='loadingBooks' src={loadImage} alt="" />
                ):(
                    bookList.length == 0 ?(
                        <h1>No se encontraron libros</h1>
                    ):(
                        bookList.map(book =>(
                            <Link to={`/reviews/${book.title}`} className='bookCard' key={book.bookId}>
                                <img className='bookCover' src={'http://localhost:3000/'+book.urlImage} alt="" />
                                <div className='title_author'>
                                    <h3>{book.title}</h3>
                                    <strong>{book.author}</strong>
                                </div>
                                <p>{book.releaseDate}</p>
                            </Link>
                        ))
                    )
                )
            }
        </div>  
    )
}