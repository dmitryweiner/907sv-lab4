import React from 'react';
import './ListItem.css';
import { check, remove } from '../../store';
import { useDispatch } from 'react-redux';

type ListItemProps = {
  title: string;
  id: string;
  isChecked: boolean;
};

export default function ListItem({ title, id, isChecked }: ListItemProps) {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={isChecked}
          data-testid="checkbox"
          onChange={() => dispatch(check(id))}
        />
        <div className="task" data-testid="task">
          {title}
        </div>
        <button data-testid="delete-button" onClick={() => dispatch(remove(id))}>
          X
        </button>
      </div>
    </>
  );
}
