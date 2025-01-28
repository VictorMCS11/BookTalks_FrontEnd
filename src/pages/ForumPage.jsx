import { ForumList } from '../components/ForumList/ForumList.jsx'
import { Route, Routes } from 'react-router-dom'
import { ForumMessages } from '../components/ForumMessages/ForumMessages.jsx'

export default function ForumPage(){
    return(
        <>
            <h1 style={{marginTop:'100px'}}>Foros</h1>
            <Routes>
                <Route index element={<ForumList />} />
                <Route path=':forumId' element={<ForumMessages />} />
            </Routes>
        </>
    )
}