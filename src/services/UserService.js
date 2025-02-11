const USER_BASE_REST_API_CREATE_USER = "http://localhost:3000/api/users/addUser"
const USER_BASE_REST_API_CREATE_NAME_PASSWORD = "http://localhost:3000/api/login"
const USER_BASE_REST_API_ID = "http://localhost:3000/api/users/"
const USER_BASE_REST_API_NAME = "http://localhost:3000/api/users"
const COLUMN = 'name'

class UserService{
    async createUser({ user }){
        const response = await fetch(USER_BASE_REST_API_CREATE_USER,{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
        })
        const data = await response.json()
        return data
    }

    async getUser({ user }){
        user = {
            ...user,
            column: COLUMN
        }
        const response = await fetch(USER_BASE_REST_API_CREATE_NAME_PASSWORD, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
        })
        const data = await response.json()
        return data
    }

    async getUserById( id ){
        const response = await fetch(USER_BASE_REST_API_ID + id, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
        const data = await response.json()
        return data
    }

    async getUserByName({ user }){
        user = {
            ...user,
            column: COLUMN
        }
        console.log(user)
        const response = await fetch(USER_BASE_REST_API_NAME, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify( user )
        })
        const data = await response.json()
        return data
    }
}

export default new UserService()
