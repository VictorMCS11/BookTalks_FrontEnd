import './bookReviews.css'
import ReviewService from '../../services/ReviewService.js'
import UserService from '../../services/UserService.js'
import LikeService from '../../services/LikeService.js'
import { useEffect, useState } from 'react'
import loadImage from '../../assets/img/loading.svg'
import trashImage from '../../assets/img/trash.svg'
import like from '../../assets/img/like.svg'
import like_block from '../../assets/img/like_block.svg'
import { useAuth } from '../Authentication/AuthProvider.jsx'

export function BookReviews({ bookId }){

    const authentication = useAuth()
    const userId = authentication.isAuthenticated ? authentication.userLogged.loggedId : undefined

    const [warnig, setWarning] = useState('')
    const [warningType, setWarningType] = useState('')
    const [reviewIsLoading, setReviewIsLoading] = useState(false)

    const [reviewList, setReviewList] = useState([])

    const loadLikes = async (reviews) => {
        if (reviews.length === 0) return;
    
        try {
            // Obtener los likes en paralelo
            const results = await Promise.all(
                reviews.map(async (review) => {
                    try {
                        // Obtener total de likes
                        const response = await LikeService.getLikes({ reviewId: review.reviewId });
                        if (response.error || !response.body) return { reviewId: review.reviewId, likes: 0, liked: false };
    
                        // Verificar si el usuario actual ha dado like
                        const likedResponse = await LikeService.getLiked({ reviewId: review.reviewId, userId: userId });
                        const liked = likedResponse.error === false && likedResponse.body?.length > 0;
    
                        return { reviewId: review.reviewId, likes: response.body.length, liked };
                    } catch (error) {
                        console.error("Error obteniendo likes:", error);
                        return { reviewId: review.reviewId, likes: 0, liked: false };
                    }
                })
            );
            // Actualizar el estado correctamente
            const updatedReviews = reviews.map(item => {
                const updatedReview = results.find(r => r.reviewId === item.reviewId);
                return updatedReview ? { ...item, likes: updatedReview.likes, liked: updatedReview.liked } : item;
            })
            setReviewList(updatedReviews)
            
        }catch(error){
            console.error("Error al cargar likes:", error);
        }
    };
    
    

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
                            releaseDate: 'Publicado el '
                                + review.release_date.slice(8,10)
                                + '/'
                                + review.release_date.slice(5,7)
                                + '/'
                                + review.release_date.slice(0, 4)
                                + ' a las '
                                + review.release_date.slice(11,16),
                            bookId: review.book_id,
                            user: {
                                userId: user.user_id,
                                name: user.name,
                                email: user.email,
                                password: user.password,
                            },
                            likes: 0,
                            liked: false
                        };
                    } catch (error) {
                        console.error("Error fetching user details:", error);
                        return null; // Retorna null si hay error para ignorar esta reseña
                    }
                })
            );
            // Filtrar reseñas válidas y actualizar el estado
            const filteredReviews = reviewListToShow.filter((review) => review !== null);
            loadLikes(filteredReviews)
            // setReviewList(filteredReviews);

        }).catch(error => {
            console.error("Error fetching reviews:", error);
        }).finally(
            setReviewIsLoading(false),
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
                // setUserId(authentication.userLogged.loggedId)
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
                
                let reviewed = (reviewList.length > 0) ? reviewList.findIndex(revw => revw.user.userId === review.user.userId) : 0

                if(reviewed == -1 || !reviewList.length > 0){
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
                    setWarning('Ya tienes escrita una "review" para este libro 🥲')
                    setWarningType('error')
                }
                
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

    const handleReviewAction = (e) =>{
        // setReviewIsLoading(true)
        e.preventDefault()
        const reviewId = Object.fromEntries(new window.FormData(e.target)).reviewId
        const reviewLiked = Object.fromEntries(new window.FormData(e.target)).reviewLiked
        const action = e.nativeEvent.submitter.value;
        if(action === 'delete'){
            ReviewService.removeReview({reviewId: reviewId}).then(
                // setReviewIsLoading(false)
            ).catch(error =>{
                console.log(error)
                // setReviewIsLoading(false)
            }).finally(loadReviews)
        }else if(action === 'like'){
            if(userId){
                if(reviewLiked == 1){
                    LikeService.deleteLike({ reviewId: reviewId, userId: userId }).then(response =>{
                        if(response.error === true || !response.body) return
                        loadLikes(reviewList)
                    })
                }else{
                    LikeService.addLike({ reviewId: reviewId, userId: userId }).then(response =>{
                        if(response.error === true || !response.body) return
                        loadLikes(reviewList)
                    })
                }
            }else{
                alert('Inicia sesión para interactuar')
            }
        }
    }

    useEffect(() =>{
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
                    reviewIsLoading ?(
                        <img src={loadImage} alt="" />
                    ):(
                        //Mapeamos las reviews filtradas por la ID del libro al que corresponden
                        reviewList.length > 0 ? reviewList.slice().reverse().map(review =>(
                            <form className='reviewCard' key={review.reviewId} onSubmit={handleReviewAction}>
                                <div>
                                    <strong className='reviewUser'>{'@'+review.user.name}</strong>
                                    <span className='reviewScore'>{review.score}</span>
                                    {/* condicion que comprueba que el usuario loggeado puede borrar     mensajes */
                                    review.user.userId === userId ? (
                                        <>
                                            <button type='submit' className='reviewDeleteButton' value='delete'>
                                                <img src={trashImage} alt="" />
                                            </button>
                                            <div className='reviewLike'>
                                                <div className='reviewLikeButton'>
                                                    <img src={like_block} alt="" />
                                                </div>
                                                <span>{review.likes}</span>
                                            </div>
                                        </>
                                    ):(
                                        <div className='reviewLike'>
                                            <button type='submit' className='reviewLikeButton' value='like'>
                                                <img className={review.liked ? 'liked_available_true' : 'like_available'} src={like} alt="" />
                                                <img className='like_block' src={like_block} alt="" />
                                            </button>
                                            <span>{review.likes}</span>
                                        </div>
                                    )
                                }
                                </div>
                                <span className='reviewContent'>{review.content}</span>
                                <p className='reviewDate'>{review.releaseDate}</p>
                                <input style={{ display:'none' }} type="number" value={review.reviewId} name='reviewId' readOnly />
                                <input style={{ display:'none' }} type="number" value={review.liked ? 1 : 0} name='reviewLiked' readOnly />
                            </form>
                        )):
                            <p>No hay reseñas</p>
                        
                    )
                }
            </div>
        </div>
    )
}