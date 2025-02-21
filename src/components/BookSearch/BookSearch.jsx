import './bookSearch.css'
import BookService from '../../services/BookService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import { Link } from 'react-router-dom'
import delete_left from '../../assets/img/delete-left.svg'

export function BookSearch(){

    const [bookList, setBookList] = useState([])
    const [defaultBookList, setDefaultBookList] = useState([])
    const [loadingBooks, setLoadingBooks] = useState(true)
    const [search, setSearch] = useState('')
    const [notFound, setNotFound] = useState({msj: "¡Busca tus libros favoritos! 😎", class: 'no_'})

    const showBooks = (books) => {
        return books?.map(book => ({
            bookId: book.book_id,
            title: book.title,
            author: book.author,
            releaseDate: book.release_date.slice(0, 10),
            urlImage: book.url_image
        }));
    };

    const deleteSearch = () =>{
        setSearch('')
        setBookList([])
        setNotFound({msj: '¡Busca tus libros favoritos! 😎', class:'no_'})

    }

    const handleSearch = (e) =>{
        e.preventDefault()
        // let currentSearch = search.replaceAll(' ', '%20')
        let currentSearch = search
        if(currentSearch === '') return
        if(currentSearch.length < 4 || currentSearch === undefined){
            setBookList([])
            setNotFound({msj: 'No se encontraron libros 💀', class:'no_'})
            return
        }
        BookService.getBookSearch(currentSearch).then(response =>{
            if(response && Array.isArray(response.body) && !response.body.some(item => typeof item === "object")){
                setBookList([])
                setNotFound({msj: 'No se encontraron libros 💀', class:'no_'})
            }else{
                setBookList(showBooks(response.body))
                setNotFound({msj: '', class:''})
            }
        }).catch(err =>{
            console.log(err)
        })
    }

    useEffect(() => {
        setLoadingBooks(true)
        BookService.getBooks().then(response =>{
            setDefaultBookList(showBooks(response.body))
        }).catch(error =>{
            console.log(error)
        }).finally(setLoadingBooks(!loadingBooks))
      }, []);

    return (
        <div className={`${notFound.class}bookContainer`}>
            <form className='book_search' onSubmit={handleSearch}>
                <input className='button_search' type="submit" value="Buscar" />
                <input type="text" className='search_engine' placeholder='El principito, El arte de la guerra ...' value={search} onChange={(e) => setSearch(e.target.value)} />
                <button className='delete_search' onClick={deleteSearch}><img src={delete_left} /></button>
            </form>
            {
                loadingBooks ?( 
                    <img className='loadingBooks' src={loadImage} alt="" />
                ):(
                    bookList.length == 0 ?(
                        <>
                            <h1 className={`${notFound.class}books_founded`}>{notFound.msj}</h1>
                            {
                                defaultBookList.map(book =>(
                                    <Link to={`/reviews/${book.title}`} className='bookCard' key={book.bookId}>
                                        <img className='bookCover' src={'http://booktalksapi-production.up.railway.app/'+book.urlImage} alt="" />
                                        <div className='title_author'>
                                            <h3>{book.title}</h3>
                                            <strong>{book.author}</strong>
                                        </div>
                                        <p>{book.releaseDate}</p>
                                    </Link>
                                ))
                            }
                        </>
                    ):(
                        <>
                            <h1 className={`${notFound.class}books_founded`}>{notFound.msj}</h1>
                            {
                                bookList.map(book =>(
                                    <Link to={`/reviews/${book.title}`} className='bookCard' key={book.bookId}>
                                        <img className='bookCover' src={'http://booktalksapi-production.up.railway.app/'+book.urlImage} alt="" />
                                        <div className='title_author'>
                                            <h3>{book.title}</h3>
                                            <strong>{book.author}</strong>
                                        </div>
                                        <p>{book.releaseDate}</p>
                                    </Link>
                                ))
                            }
                        </>
                    )
                )
            }
        </div>  
    )
}