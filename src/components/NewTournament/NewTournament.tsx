import React from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addTournamentWithAPI } from '../../store/tournamentsSlice';
import Button from '../UI/Button';

const NewTournament: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const addTournamentHandler = async (): Promise<void> => {
    const addedTournamentName = window.prompt('Tournament Name:', '');
    if (addedTournamentName)
      dispatch(addTournamentWithAPI(addedTournamentName));
  };

  return <Button onClick={addTournamentHandler}>CREATE TOURNAMENT</Button>;
};

export default NewTournament;
