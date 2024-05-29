const FORUM_BASE_REST_API_GET_ALL_USERS = ""
const FORUM_BASE_REST_API_CREATE_USER = ""


class ForumService{

    async getAllForums(){
        const response = await fetch(FORUM_BASE_REST_API_GET_ALL_USERS, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        return response
    }

    async createForum(forum){
        const response = fetch(FORUM_BASE_REST_API_CREATE_USER, {
            method: 'POST',
            headers: {'Content-Type': 'application/json',
                body: JSON.stringify( forum )
            }
        })
        return response
    }

}

export default new ForumService()