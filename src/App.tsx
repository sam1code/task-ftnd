import { Routes, Route } from 'react-router-dom'
import AddEmpl from './pages/AddEmpl'
import Main from './pages/Main'
import NotFound from './pages/NotFound'
import Update from './pages/Update'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/add" element={<AddEmpl />} />
      <Route path="/:id" element={<Update />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App
