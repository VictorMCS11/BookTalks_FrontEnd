import './reviewCardSection.css'
import ReviewService from '../../services/ReviewService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import trashImage from '../../assets/img/trash.svg'

export function ReviewCardSection({ bookId, authentication }){

    const [warnig, setWarning] = useState('')
    const [warningType, setWarningType] = useState('')
    const [reviewSendIsLoading, setReviewSendIsLoading] = useState(false)
    const [reviewDeleteIsLoading, setReviewDeleteIsLoading] = useState(false)
    const [userId, setUserId] = useState()

    const [reviewList, setReviewList] = useState()

    useEffect(() =>{
        ReviewService.getReviews().then(response =>{
            //Filtramos las reseñas por la ID del libro al que corresponde
            const reviewListToShow = response.filter((review) => review.book.bookId == bookId)
            setReviewList(reviewListToShow)
            if(authentication.isAuthenticated){
                setUserId(JSON.parse(window.localStorage.getItem("loggedUser")).userId)
            }
            console.log(userId)
        }).catch(error =>{
            console.log(error)
        })
    }, [reviewSendIsLoading, bookId, reviewDeleteIsLoading])

    const warningClass = 
        warningType=='ok' ? '_approve'
                 : warningType=='error' ? '_error' : ''

    const handleSubmit = (e) =>{
        setReviewSendIsLoading(!reviewSendIsLoading)
        e.preventDefault()
        const dataReview = Object.fromEntries(new window.FormData(e.target))
        const content = dataReview.contentReview
        const score = dataReview.scoreReview
        if(content !== '' && (score >= 0 && score <=5)){
            if(authentication.isAuthenticated){
                setUserId(JSON.parse(window.localStorage.getItem("loggedUser")).userId)
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
                    }else{
                        setWarning('Error al enviar la reseña 💀')
                        setWarningType('error')
                    }
                }).catch(error =>{
                    console.log(error)
                    setWarning('Error al enviar la reseña 💀')
                    setWarningType('error')
                })

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
            setReviewSendIsLoading(false)
          }, 4000);
    }

    const deleteReview = (e) =>{
        setReviewDeleteIsLoading(true)
        e.preventDefault()
        const reviewId = Object.fromEntries(new window.FormData(e.target)).reviewId
        console.log(reviewId + ' Esta es la ID de review actual')
        ReviewService.deleteReview({reviewId}).then(response  =>{
            console.log(response)
            setReviewDeleteIsLoading(false)
        }).catch(error =>{
            console.log(error)
            setReviewDeleteIsLoading(false)
        })
    }

    return(
        <div className='reviewCardsSec'>
            {
                reviewSendIsLoading ? (
                    <div className='reviewSendLoad'>
                        <img src={loadImage} alt="" />
                    </div>
                ):(
                    <form className='writeReviewSec' onSubmit={handleSubmit}>
                        <h3>Escribe una reseña para este libro</h3>
                        <textarea name='contentReview' type="text" placeholder="Este libro ha sido..." minLength="5" maxLength="400" required />
                        <div className='scoreSec'>
                        <p>Tu puntuación:&nbsp;</p>
                            <input className='score' required name='scoreReview' type="number" min="0" max="5" />
                            <p>&nbsp; /5</p>
                        </div>
                        <button className='writeReviewButton' type="submit">Enviar</button>
                    </form>
                )
            }
            <div className={'warningContent' + warningClass}>
                <p className='warningText'>{warnig}</p>
            </div>
            <h4>Reseñas de usuarios</h4>
            <div className='cardsReviews'>
                {   //Mapeamos las reviews filtradas por la ID del libro al que corresponden
                    reviewList?.map(review =>(
                        <form className='reviewCard' key={review.reviewId} onSubmit={deleteReview}>
                            <div>
                                <strong className='reviewUser'>{review.user.name}</strong>
                                <span className='reviewScore'>{review.score + '/5'}</span>
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
                    ))
                }
            </div>
        </div>
    )
}