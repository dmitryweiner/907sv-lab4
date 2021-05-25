import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ACTION_TYPES, selector } from '../../store';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('Все');

  const handleChange = event => {
    setValue(event.target.value);
    switch (event.target.value) {
      case 'SELECTDONE': {
        selector({ type: ACTION_TYPES.SELECTDONE });
        break;
      }
      case 'SELECTALL': {
        selector({ type: ACTION_TYPES.SELECTALL });
        break;
      }
      case 'SELECTNOTDONE': {
        selector({ type: ACTION_TYPES.SELECTNOTDONE });
        break;
      }
    }
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Фильтрация</FormLabel>
      <RadioGroup aria-label="Фильтр:" name="gender1" value={value} onChange={handleChange}>
        <FormControlLabel value="SELECTDONE" control={<Radio />} label="Выполненные" />
        <FormControlLabel value="SELECTNOTDONE" control={<Radio />} label="Не выполненные" />
        <FormControlLabel value="SELECTALL" control={<Radio />} label="Все" />
      </RadioGroup>
    </FormControl>
  );
}
