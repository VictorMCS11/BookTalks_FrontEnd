const USER_BASE_REST_API_CREATE_USER = "http://localhost:8080/api/v1/users/user"
const USER_BASE_REST_API_CREATE_NAME_PASSWORD = "http://localhost:8080/api/v1/users/userByNameAndPassword"

class UserService{
    async createUser({ user }){
        const response = await fetch(USER_BASE_REST_API_CREATE_USER,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( user )
        })
        return response
    }

    async getUser({ user }){
        const response = await fetch(USER_BASE_REST_API_CREATE_NAME_PASSWORD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
        })
        const data = await response.json()
        return data
    }
}

export default new UserService()
