import { useEffect, useState, useContext, createContext } from "react"

const AuthContext = createContext({
    isAuthenticated: false,
})

export function AuthProvider({ children }){
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [userLogged, setUserLogged] = useState({})

    const parseJwt = (token) =>{
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    
        return JSON.parse(jsonPayload);
    }

    useEffect(() =>{
        if(window.localStorage.getItem('loggedUser')){
            const loggedUserTime = (parseJwt(window.localStorage.getItem('loggedUser')).exp*1000 > Date.now())
            if(loggedUserTime){
                setIsAuthenticated(true)
                setUserLogged({
                    loggedId: parseJwt(window.localStorage.getItem('loggedUser')).id,
                    loggedName: parseJwt(window.localStorage.getItem('loggedUser')).name
                })
                // console.log(parseJwt(window.localStorage.getItem('loggedUser')))
            }else{
                setIsAuthenticated(false)
                window.localStorage.removeItem('loggedUser')
            }
        }
    }, [])

    return(
        <AuthContext.Provider value={{ isAuthenticated, userLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () =>{
    return(useContext(AuthContext))
}
