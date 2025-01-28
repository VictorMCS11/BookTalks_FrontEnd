import './bookReviews.css'
import ReviewService from '../../services/ReviewService.js'
import UserService from '../../services/UserService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import trashImage from '../../assets/img/trash.svg'
import { useAuth } from '../Authentication/AuthProvider.jsx'

export function BookReviews({ bookId }){

    const authentication = useAuth()

    const [warnig, setWarning] = useState('')
    const [warningType, setWarningType] = useState('')
    const [reviewIsLoading, setReviewIsLoading] = useState(false)
    const [userId, setUserId] = useState()

    const [reviewList, setReviewList] = useState([])

    const loadReviews = () =>{
        setReviewIsLoading(true)
        ReviewService.getBookReviews({ bookId }).then(async (response) => {
            if (!response.body) return;
            // Mapear las reseñas y esperar las promesas usando Promise.all
            const reviewListToShow = await Promise.all(
                response.body.map(async (review) => {
                    try {
                        const userResponse = await UserService.getUserById(review.user_id);
                        const user = userResponse.body[0]; // Suponiendo que `body[0]` contiene el usuario
                        return {
                            reviewId: review.review_id,
                            score: review.score,
                            content: review.content,
                            releaseDate: review.release_date.slice(0, 10),
                            bookId: review.book_id,
                            user: {
                                userId: user.user_id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                            },
                        };
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                        return null; // Retorna null si hay error para ignorar esta reseña
                    }
                })
            );
            // Filtrar reseñas válidas y actualizar el estado
            const filteredReviews = reviewListToShow.filter((review) => review !== null);
            setReviewList(filteredReviews);

        }).catch(error => {
            console.error("Error fetching reviews:", error);
        }).finally(
            setReviewIsLoading(false)
        )
    }

    const warningClass = 
        warningType=='ok' ? '_approve'
                 : warningType=='error' ? '_error' : ''

    const handleSubmit = (e) =>{
        e.preventDefault()
        const dataReview = Object.fromEntries(new window.FormData(e.target))
        const content = dataReview.contentReview
        const score = dataReview.scoreReview
        if(content !== '' && (score >= 0 && score <=5)){
            if(authentication.isAuthenticated){
                // setReviewIsLoading(!reviewIsLoading)
                // setUserId(JSON.parse(window.localStorage.getItem("loggedUser")).user_id)
                const review = {
                    content: content,
                    score: score,
                    user: {
                        userId: userId
                    },
                    book: {
                        bookId: bookId
                    }
                }

                ReviewService.createReview({ review }).then(response =>{
                    if(response.ok){
                        setWarning('Reseña enviada con éxito 😎')
                        setWarningType('ok')
                        document.querySelector('.writeReviewSec textarea').value = ""
                    }else{
                        setWarning('Error al enviar la reseña 💀')
                        setWarningType('error')
                    }
                }).catch(error =>{
                    console.log(error)
                    setWarning('Error al enviar la reseña 💀')
                    setWarningType('error')
                }).finally(loadReviews)

            }else{
                setWarning('Debes iniciar sesión para escribir reseñas 🥲')
                setWarningType('error')
            }
        }else{
            setWarning('La reseña no se podrá enviar al estar incompleta 💀')
            setWarningType('error')
        }

        setTimeout(() => {
            setWarningType('')
          }, 4000);
    }

    const removeReview = (e) =>{
        // setReviewIsLoading(true)
        e.preventDefault()
        const reviewId = Object.fromEntries(new window.FormData(e.target)).reviewId
        ReviewService.removeReview({reviewId}).then(
            // setReviewIsLoading(false)
        ).catch(error =>{
            console.log(error)
            // setReviewIsLoading(false)
        }).finally(loadReviews)
    }

    useEffect(() =>{
        if (authentication.isAuthenticated) {
            const loggedUser = JSON.parse(window.localStorage.getItem("loggedUser"))
            setUserId(loggedUser.user_id)
        }
        loadReviews()
    }, [])

    return(
        <div className='reviewCardsSec'>
            <form className='writeReviewSec' onSubmit={handleSubmit}>
                <h3>Escribe una reseña para este libro</h3>
                <textarea name='contentReview' type="text" placeholder="Este libro ha sido..." minLength="5" maxLength="400" required />
                <div className={'warningContent' + warningClass}>
                    <p className='warningText'>{warnig}</p>
                </div>
                <div className='scoreSec'>
                    <p>Tu puntuación:&nbsp;</p>
                    <input className='score' required name='scoreReview' type="number" min="0" max="5" />
                    <p>&nbsp;/5</p>
                </div>
                <button className='writeReviewButton' type="submit">Enviar</button>
            </form>
            <h4>Reseñas de usuarios</h4>
            <div className='cardsReviews'>
                {   
                    reviewIsLoading || reviewIsLoading ?(
                        <form className='reviewCard' onSubmit={handleSubmit}>
                            <img src={loadImage} alt="" />
                        </form>
                    ):(
                        //Mapeamos las reviews filtradas por la ID del libro al que corresponden
                        reviewList ? reviewList.slice().reverse().map(review =>(
                            <form className='reviewCard' key={review.reviewId} onSubmit={removeReview}>
                                <div>
                                    <strong className='reviewUser'>{review.user.name}</strong>
                                    <span className='reviewScore'>{review.score}</span>
                                    {/* condicion que comprueba que el usuario loggeado puede borrar     mensajes */
                                    review.user.userId === userId ? (
                                        <button className='reviewDeleteButton'><img src={trashImage} alt="" /></button>
                                    ):(null)
                                }
                                </div>
                                <span className='reviewContent'>{review.content}</span>
                                <p className='reviewDate'>{review.releaseDate}</p>
                                <input style={{ display:'none' }} type="number" value={review.reviewId} name='reviewId' readOnly />
                            </form>
                        )) : (
                            <form className='reviewCard' onSubmit={handleSubmit}>
                                <p>No hay reseñas</p>
                            </form>
                        )
                    )
                }
            </div>
        </div>
    )
}