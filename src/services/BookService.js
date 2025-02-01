const BOOK_BASE_REST_API_GET_BOOKS = "http://localhost:3000/api/books"
const BOOK_BASE_REST_API_GET_BOOK = "http://localhost:3000/api/books/book"
const COLUMN = 'title'

class BookService{

    async getBooks(){
        const response = await fetch(BOOK_BASE_REST_API_GET_BOOKS, {
           method: 'GET',
           headers: { 
            'Content-Type': 'application/json',
           }
        })
        const data = await response.json()
        return data
   }

   async getBook(title){
      const response = await fetch(BOOK_BASE_REST_API_GET_BOOK, {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ title: title, column: COLUMN })
      })
      const data = await response.json()
      return data
 }
}

export default new BookService()