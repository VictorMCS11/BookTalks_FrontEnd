const MESSAGE_BASE_REST_API = ""

class MessageService{

    async createMessage({ user }){
         const response = await fetch(MESSAGE_BASE_REST_API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
               body: JSON.stringify( user )
            }
         })
         return response
    }

    async getMessages(){
        const response = await fetch(MESSAGE_BASE_REST_API, {
           method: 'GET',
           headers: { 'Content-Type': 'application/json',
           }
        })
        const data = await response.json()
        return data
   }
}

export default new MessageService()