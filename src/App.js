// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import EventList from './components/EventList';
import EventDetail from './components/EventDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EventList />} />
        <Route path="/event/:alias" element={<EventDetail />} /> {/* Параметр alias в URL */}
      </Routes>
    </Router>
  );
}

export default App;
