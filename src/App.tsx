import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Practice from './pages/Practice';
import Categories from './pages/Categories';
import Category from './pages/Category';
import Guide from './pages/Guide';
import ExamHistory from './pages/ExamHistory';
import Exam from './pages/Exam';
import ExamResultPage from './pages/ExamResultPage';

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/category/:id" element={<Category />} />
            <Route path="/guide" element={<Guide />} />
            <Route path="/exam" element={<ExamHistory />} />
            <Route path="/exam/start" element={<Exam />} />
            <Route path="/exam/results/:id" element={<ExamResultPage />} />
          </Routes>
          <Navigation />
        </div>
      </Router>
    </AppProvider>
  );
};

export default App;
