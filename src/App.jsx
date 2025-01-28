import './App.css'
import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './components/Authentication/AuthProvider.jsx'
import  LoginPage  from './pages/LoginPage.jsx'
import  SignupPage  from './pages/SignupPage.jsx'
import  HomePage  from './pages/HomePage.jsx'
import  ContactPage  from './pages/ContactPage.jsx'
import  ForumPage  from './pages/ForumPage.jsx'
import  ReviewsPage  from './pages/ReviewsPage.jsx'
import Layout from './components/Layout.jsx'

function App() {

  return (
    <>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>
            <Route path='/signup' element={<SignupPage />}></Route>
            <Route path='/contact' element={<ContactPage />}></Route>
            <Route path='/forum/*' element={<ForumPage />}></Route>
            <Route path='/reviews/*' element={<ReviewsPage />}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </>
  )
}

export default App
