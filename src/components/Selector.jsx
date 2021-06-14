import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { ACTION_TYPES } from '../store';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTORS } from '../store';

export default function Selector() {
  const value = useSelector(state => state.selector);
  const dispatch = useDispatch();
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Фильтрация</FormLabel>
      <RadioGroup
        aria-label="Фильтр:"
        name="gender1"
        value={value}
        onChange={e => dispatch({ type: ACTION_TYPES.SELECTOR, payload: e.target.value })}
        data-testid={'selector'}
      >
        {Object.keys(SELECTORS).map((elem, index) => (
          <FormControlLabel
            value={elem}
            control={<Radio />}
            label={SELECTORS[elem]}
            key={index}
            data-testid={'radioButton'}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
