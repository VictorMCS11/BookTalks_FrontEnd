const REVIEW_BASE_REST_API_CREATE_REVIEW = "http://localhost:8080/api/v1/reviews/reviews"
const REVIEW_BASE_REST_API_GET_REVIEWS = "http://localhost:8080/api/v1/reviews/listReviews"
const REVIEW_BASE_REST_API_DELETE_REVIEW = "http://localhost:8080/api/v1/reviews/review"

class ReviewService{

    async createReview({ review }){
         const response = await fetch(REVIEW_BASE_REST_API_CREATE_REVIEW, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify( review )
         })
         return response
    }

    async getReviews(){
        const response = await fetch(REVIEW_BASE_REST_API_GET_REVIEWS, {
           method: 'GET',
           headers: { 'Content-Type': 'application/json',
           }
        })
        const data = await response.json()
        return data
   }

   async deleteReview({ reviewId }){
      const id = reviewId
      console.log(id)
      const response = await fetch(REVIEW_BASE_REST_API_DELETE_REVIEW + `/${reviewId}`, {
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