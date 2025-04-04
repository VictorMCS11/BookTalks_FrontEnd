const MESSAGE_BASE_REST_API_GET_MESSAGES = "https://booktalksapi-production.up.railway.app/api/forumMessages"
const MESSAGE_BASE_REST_API_CREATE_MESSAGE = "https://booktalksapi-production.up.railway.app/api/forumMessages/addForumMessage"
const MESSAGE_BASE_REST_API_DELETE_MESSAGE = "https://booktalksapi-production.up.railway.app/api/forumMessages/removeForumMessage/"
const COLUMN = "forum"

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
      const response = await fetch(MESSAGE_BASE_REST_API_GET_MESSAGES, {
         method: 'POST',
         headers: {'Content-Type': 'application/json'},
         body: JSON.stringify({ id: forumId, column: COLUMN })
      })
      const data = await response.json()
      return data
   }

   async deleteMessage(messageId){
      const response = await fetch(MESSAGE_BASE_REST_API_DELETE_MESSAGE + messageId, {
         method: 'DELETE',
         headers: {'Content-Type': 'application/json'}
      })
      const data = await response.json()
      return data
   }
}

export default new MessageService()