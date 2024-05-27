import { useEffect, useState, useContext, createContext } from "react"

const AuthContext = createContext({
    isAuthenticated: false,
})

export function AuthProvider({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() =>{
        const loggedUser = window.localStorage.getItem('loggedUser')
        
        loggedUser ? setIsAuthenticated(true) : setIsAuthenticated(false)
    }, [])

    return(
        <AuthContext.Provider value={{ isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
    return(useContext(AuthContext))
}
