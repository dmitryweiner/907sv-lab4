import React from 'react';
import Button from '@material-ui/core/Button';

export default function AddButton() {
  return (
    <Button variant="contained" color="primary" data-testid="handleSubmit" type="submit">
      Добавить
    </Button>
  );
}
