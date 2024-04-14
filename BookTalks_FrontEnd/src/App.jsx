import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthProvider } from './components/Authentication/AuthProvider.jsx'
import { LogIn } from './pages/login.jsx'
import { SignUp } from './pages/signup.jsx'
import { Home } from './pages/home.jsx'
import { Contact } from './pages/contact.jsx'
import { Forum } from './pages/forum.jsx'
import { Reviews } from './pages/reviews.jsx'

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />
    },
    {
      path: "/login",
      element: <LogIn/>
    },
    {
      path: '/signup',
      element: <SignUp />,
    },
    {
      path: "/contact",
      element: <Contact />
    },
    {
      path: "/forum",
      element: <Forum />
    },
    {
      path: "/reviews",
      element: <Reviews />
    }
  ])

  return (
    <>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </>
  )
}

export default App
