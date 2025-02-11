const GET_REVIEW_LIKE = 'http://localhost:3000/api/likeReview'
const GET_REVIEW_LIKED = 'http://localhost:3000/api/likeReview/liked'
const REVIEW_LIKE = 'http://localhost:3000/api/likeReview/addLike'
const REVIEW_DELETE = 'http://localhost:3000/api/likeReview/removeLike'

const COLUMN_REVIEW = 'review'
const COLUMN_USER = 'user'

class LikeService{

    async getLikes({ reviewId }){
        const response = await fetch(GET_REVIEW_LIKE, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ id: reviewId, column: COLUMN_REVIEW })
        })
        const data = await response.json()
        return data
     }

     async getLiked({ reviewId, userId }){
        const response = await fetch(GET_REVIEW_LIKED, {
           method: 'POST',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ reviewId: reviewId, userId: userId, column1: COLUMN_REVIEW, column2: COLUMN_USER })
        })
        const data = await response.json()
        return data
     }

    async addLike({ reviewId, userId }){
        const response = await fetch(REVIEW_LIKE, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ reviewId: reviewId, userId: userId })
        })
        const data = await response.json()
        return data
    }

    async deleteLike({ reviewId, userId }){
        const response = await fetch(REVIEW_DELETE, {
           method: 'DELETE',
           headers: {'Content-Type': 'application/json'},
           body: JSON.stringify({ reviewId: reviewId, userId: userId, column1: COLUMN_REVIEW, column2: COLUMN_USER })
        })
        const data = await response.json()
        return data
     }
}

export default new LikeService()