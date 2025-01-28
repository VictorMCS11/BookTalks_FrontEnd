const REVIEW_BASE_REST_API_GET_REVIEWS = "http://localhost:3000/api/reviews/"
const REVIEW_BASE_REST_API_CREATE_REVIEW = "http://localhost:3000/api/reviews/addReview"
const REVIEW_BASE_REST_API_DELETE_REVIEW = "http://localhost:3000/api/reviews/removeReview/"

const COLUMN = 'book'

class ReviewService{

    async createReview({ review }){
         const response = await fetch(REVIEW_BASE_REST_API_CREATE_REVIEW, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify( review )
         })
         return response
    }

    async getBookReviews({ bookId }){
        const response = await fetch(REVIEW_BASE_REST_API_GET_REVIEWS, {
           method: 'POST',
           headers: { 
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({ id: bookId, column: COLUMN })
        })
        const data = await response.json()
        return data
   }

   async removeReview({ reviewId }){
      const response = await fetch(REVIEW_BASE_REST_API_DELETE_REVIEW + reviewId, {
         method: 'DELETE',
         headers: {
            'Content-Type': 'application/json'
         },
         // body: JSON.stringify(reviewId)
      })
      const data = await response.json()
      return data
   }
}

export default new ReviewService()