import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Modal,
} from '@mui/material';
import EditBookModal from './editBookModal';
import AddBookModal from './addBookModal';
import instance from '../../axiosConfig';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [editBookModalOpen, setEditBookModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const response = await instance.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Erro ao carregar a lista de livros:', error.message);
    }
  };

  const [addBookModalOpen, setAddBookModalOpen] = useState(false);

  const handleAddBook = () => {
    setAddBookModalOpen(true);
  };

  const handleCloseAddBookModal = () => {
    setAddBookModalOpen(false);
  };

  const handleBookAdded = (newBook) => {
    setBooks([...books, newBook]);
  };

  const handleEditBook = (book) => {
    setSelectedBook(book);
    setEditBookModalOpen(true);
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await instance.delete(`/api/books/${bookId}`);
      loadBooks();
    } catch (error) {
      console.error('Erro ao excluir o livro:', error.message);
    }
  };

  const handleCloseEditBookModal = () => {
    setEditBookModalOpen(false);
    setSelectedBook(null);
  };

  return (
    <div>
      <h2>Lista de Livros</h2>
      <Button variant="contained" color="primary" onClick={handleAddBook}>
        Adicionar Livro
      </Button>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Autor</TableCell>
              <TableCell>Data de Leitura</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book.id} hover>
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.read_date}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" onClick={() => handleEditBook(book)}>
                    Editar
                  </Button>
                  <Button variant="outlined" color="secondary" onClick={() => handleDeleteBook(book.id)}>
                    Deletar
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={editBookModalOpen} onClose={handleCloseEditBookModal}>
        <EditBookModal book={selectedBook} onClose={handleCloseEditBookModal} />
      </Modal>
      <Modal open={addBookModalOpen} onClose={handleCloseAddBookModal}>
        <AddBookModal onClose={handleCloseAddBookModal} onAddBook={handleBookAdded} />
      </Modal>
    </div>
  );
};

export default BookList;