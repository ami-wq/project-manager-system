import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import IssuesPage from './pages/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/boards" element={<BoardsPage />} />
        <Route path="/board/:id" element={<BoardPage />} />
        <Route path="/issues" element={<IssuesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
};

export default App;