import { useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import { ACTION_TYPES } from '../store';
import React from 'react';

export default function Filter() {
  const dispatch = useDispatch();
  return (
    <TextField
      id="outlined-basic"
      label="Поиск"
      variant="outlined"
      inputProps={{ 'data-testid': 'search-bar' }}
      onChange={e => dispatch({ type: ACTION_TYPES.SEARCH, payload: e.target.value })}
    />
  );
}
