import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import BoardsPage from './pages/BoardsPage'
import BoardPage from './pages/BoardPage'
import IssuesPage from './pages/IssuesPage'
import NotFoundPage from './pages/NotFoundPage'
import Layout from './components/Layout'
import { ToastContainer } from 'react-toastify'
import TaskFormModalContainer from './components/TaskFormModalContainer'
import ScrollToTop from './components/ScrollToTopButton'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/issues" replace />} />
            <Route path="/boards" element={<BoardsPage />} />
            <Route path="/board/:id" element={<BoardPage />} />
            <Route path="/issues" element={<IssuesPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
        <TaskFormModalContainer />
        <ScrollToTop />
      </Router>
    </>
  );
};

export default App;