const MESSAGE_BASE_REST_API_GET_MESSAGES = "http://localhost:8080/api/v1/messages/messagesByForum/"
const MESSAGE_BASE_REST_API_CREATE_MESSAGE = "http://localhost:8080/api/v1/messages/message"

class MessageService{

    async createMessage({ message }){
         const response = await fetch(MESSAGE_BASE_REST_API_CREATE_MESSAGE, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify( message )
         })
         return response
    }

    async getMessages(forumId){
        const response = await fetch(MESSAGE_BASE_REST_API_GET_MESSAGES + forumId, {
           method: 'POST',
           headers: {'Content-Type': 'application/json',
           }
        })
        const data = await response.json()
        return data
   }

   async deleteMessage(){
      
   }
}

export default new MessageService()