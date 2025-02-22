const FORUM_BASE_REST_API_GET_ALL_FORUMS = "https://booktalksapi-production.up.railway.app/api/forums"
const FORUM_BASE_REST_API_GET_FORUM = "https://booktalksapi-production.up.railway.app/api/forums/"

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