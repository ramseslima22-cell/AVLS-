import { MotionConfig } from 'framer-motion';
import ScrollProgress from '@/components/ScrollProgress';
import '@/components/office3d/office3d.css';
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';



function App() {
    return (
        <MotionConfig reducedMotion="user">
            <div className="site-over-3d">
                <Router>
                    <ScrollProgress />
                    <ScrollToTop />
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                    </Routes>
                </Router>
            </div>
        </MotionConfig>
    );
}

export default App;
