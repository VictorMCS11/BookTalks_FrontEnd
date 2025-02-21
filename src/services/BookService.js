const BOOK_BASE_REST_API_GET_BOOKS = "https://booktalksapi-production.up.railway.app/api/books"
const BOOK_BASE_REST_API_GET_BOOK = "https://booktalksapi-production.up.railway.app/api/books/book"
const BOOK_BASE_REST_API_GET_BOOK_SEARCH = "https://booktalksapi-production.up.railway.app/api/books/bookSearch"
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

   async getBookSearch(title){
      const response = await fetch(BOOK_BASE_REST_API_GET_BOOK_SEARCH, {
         method: 'POST',
         headers: { 
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ title: title, column: COLUMN })
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