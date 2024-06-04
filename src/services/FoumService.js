const FORUM_BASE_REST_API_GET_ALL_FORUMS = "http://localhost:8080/api/v1/forums/listForums"

class ForumService{

    async getForums(){
        const response = await fetch(FORUM_BASE_REST_API_GET_ALL_FORUMS, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const data = response.json()
        return data
    }

}

export default new ForumService()