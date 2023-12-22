import React, { useState } from 'react';
import { Modal, Button, TextField, Card, CardContent } from '@mui/material';
import instance from '../../axiosConfig';
import './addBookModal.css';

const AddBookModal = ({ onClose, onAddBook }) => {
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    read_date: '',
  });

  const handleClose = () => {
    onClose();
  };
  
  const handleSaveNewBook = async () => {
    try {
      const response = await instance.post('/api/books', newBook);
      onAddBook(response.data);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar o novo livro:', error.message);
    }
  };

  return (
    <Modal open={true} onClose={onClose} className="add-book-modal">
      <div className="add-book-container">
        <Card className="add-book-card">
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '10px 0' }}>Adicionar Livro</h2>
            <TextField
              label="Título"
              value={newBook.title}
              onChange={(e) => setNewBook({ ...newBook, title: e.target.value })}
              style={{ margin: '10px 0' }}
            />
            <TextField
              label="Autor"
              value={newBook.author}
              onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
              style={{ margin: '10px 0' }}
            />
            <TextField
              label="Data de Leitura"
              value={newBook.read_date}
              onChange={(e) => setNewBook({ ...newBook, read_date: e.target.value })}
              style={{ margin: '10px 0' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveNewBook}
              style={{ margin: '10px 0' }}
            >
              Salvar Livro
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              onClick={handleClose}
              style={{ margin: '10px 0'}}
            >
              Fechar
            </Button>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default AddBookModal;
