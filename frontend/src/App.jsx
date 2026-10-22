import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Landing from './pages/Landing'
import Inventory from './pages/Inventory'

function App() {
  return (
      <div>
        <Router>
          <Routes>
            <Route path ="/" element={<Landing />}  />
            <Route path ="/inventory" element={<Inventory />}  />
            <Route path ="*" element ={<h1>404 Not Found</h1>}  />
          </Routes>
        </Router>
      </div>
      
  )
}

export default App