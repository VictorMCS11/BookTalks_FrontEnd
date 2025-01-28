const FORUM_BASE_REST_API_GET_ALL_FORUMS = "http://localhost:3000/api/forums"
const FORUM_BASE_REST_API_GET_FORUM = "http://localhost:3000/api/forums/"

class ForumService{

    async getForums(){
        const response = await fetch(FORUM_BASE_REST_API_GET_ALL_FORUMS, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        return data
    }

    async getForum(id){
        const response = await fetch(FORUM_BASE_REST_API_GET_FORUM + id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        return data
    }

}

export default new ForumService()