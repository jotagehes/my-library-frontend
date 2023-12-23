import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import BookList from './components/bookList';
import Login from './components/login';
import Register from './components/register';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<BookList />} />
        {/* Adicione mais rotas conforme necessário */}
      </Routes>
    </Router>
  );
}

export default App;