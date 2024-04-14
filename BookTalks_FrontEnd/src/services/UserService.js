const USER_BASE_REST_API = "http://localhost:8080/api/v1/user"

class UserService{
    async createUser({ user }){
        const response = await fetch(USER_BASE_REST_API,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( user )
            })
        return response
    }

    async getUser({ name, password }){
        const response = await fetch(USER_BASE_REST_API, {
            method: 'GET',
            header: { 'Content-Type': 'application/json' },
            body: name, password,
        })
        const data = await response.json()
        return data
    }
}

export default new UserService()
