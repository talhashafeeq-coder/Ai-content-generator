import { Routes, Route } from 'react-router-dom'
import IndexUrl from './context/index_url'

function App() {
  return (
    <Routes>
     <Route path='/' element={<IndexUrl.Blogwith_history />} /> 
    <Route path='/home' element={<IndexUrl.MainApi />} />
    <Route path='/login' element={<IndexUrl.Login />} />
    <Route path='/register' element={<IndexUrl.Register />} />
    <Route path='/sidebar' element={<IndexUrl.Sidebar />} />
    <Route path='/profile' element={<IndexUrl.Profile />} />
    <Route path='/navbar' element={<IndexUrl.Navbar />} />
    </Routes>
  )
}
export default App
