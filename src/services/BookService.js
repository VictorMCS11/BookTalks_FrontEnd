const BOOK_BASE_REST_API_GET_BOOKS = "http://localhost:8080/api/v1/books/listBooks"

class BookService{

    async getBooks(){
        const response = await fetch(BOOK_BASE_REST_API_GET_BOOKS, {
           method: 'GET',
           headers: { 'Content-Type': 'application/json',
           }
        })
        const data = await response.json()
        return data
   }
}

export default new BookService()