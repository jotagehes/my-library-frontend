import React, { useState, useEffect } from 'react';
import { Modal, Button, TextField, Card, CardContent } from '@mui/material';
import instance from '../../axiosConfig';
import './editBookModal.css';

const EditBookModal = ({ book, onClose }) => {
  const [editedBook, setEditedBook] = useState({ ...book });

  useEffect(() => {
    setEditedBook({ ...book });
  }, [book]);

  const handleSaveChanges = async () => {
    try {
      await instance.put(`/api/books/${editedBook.id}`, editedBook);
      window.location.reload();
    } catch (error) {
      console.error('Erro ao salvar as alterações:', error.message);
    }
    onClose();
  };

  return (
    <Modal open={!!book} onClose={onClose} className="edit-book-modal">
      <div className="edit-book-container">
        <Card className="edit-book-card">
          <CardContent style={{ display: 'flex', flexDirection: 'column' }}>
            <h2 style={{ margin: '10px 0' }}>Editar Livro</h2>
            <TextField
              label="Título"
              value={editedBook.title}
              onChange={(e) => setEditedBook({ ...editedBook, title: e.target.value })}
              style={{ margin: '10px 0' }}
            />
            <Button variant="contained" color="primary" onClick={handleSaveChanges} style={{ margin: '10px 0' }}>
              Salvar Alterações
            </Button>
            <Button onClick={onClose} style={{ margin: '10px 0' }}>
              Fechar
            </Button>
          </CardContent>
        </Card>
      </div>
    </Modal>
  );
};

export default EditBookModal;
