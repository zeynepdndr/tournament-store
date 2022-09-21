import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import {
  deleteTournamentWithAPI,
  editTournamentWithAPI,
  fetchTournamentsFromAPI,
} from '../../store/tournamentsSlice';
import TournamentItem from './TournamentItem';
import Button from '../UI/Button';
import FlexBox from '../UI/FlexBox';

export interface ITournamentItem {
  id: string;
  name: string;
  organizer: string;
  participants: Object;
  game: string;
  startDate: any;
}

type TournamentListProps = {
  searchedTournamentName: string;
};

const TournamentList: React.FC<TournamentListProps> = ({
  searchedTournamentName,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const tournaments = useSelector((state: any) => state.items);

  //  Loading and error states are defined for fetching tournaments from the API
  //  Since these cases are no requirements for editing, adding and deleting operations
  const loading = useSelector((state: any) => state.loading);
  const error = useSelector((state: any) => state.error);
  const [filteredTournamentList, setfilteredTournamentList] = useState<
    ITournamentItem[]
  >([]);

  const fetchTournaments = () => {
    console.log('jhh');
    dispatch(fetchTournamentsFromAPI());
  };
  const editTournamentHandler = (item: any) => {
    const updatedTournamentName = window.prompt(
      'New Tournament Name:',
      item.name
    );
    if (updatedTournamentName)
      dispatch(
        editTournamentWithAPI({ id: item.id, name: updatedTournamentName })
      );
  };
  const deleteTournamentHandler = async (id: any) => {
    if (window.confirm('Do you really want to delete this tournament?'))
      dispatch(deleteTournamentWithAPI(id));
    fetchTournamentsFromAPI();
  };

  //   Data fetched from the API is filtered from input typed
  const filterTournamentList = () => {
    if (searchedTournamentName || searchedTournamentName !== '') {
      const newTournaments = tournaments.filter((e: ITournamentItem) => {
        return (
          e.game.toLowerCase() === searchedTournamentName.toLowerCase() ||
          e.game.toLowerCase().indexOf(searchedTournamentName.toLowerCase()) >=
            0
        );
      });
      setfilteredTournamentList(newTournaments);
    } else {
      setfilteredTournamentList(tournaments);
    }
  };
  let tournamentContent: React.ReactNode = (
    <div style={{ display: 'block', margin: 'auto', textAlign: 'center' }}>
      <p>No tournament found.</p>
    </div>
  );

  if (filteredTournamentList.length > 0) {
    let tournamentItems = filteredTournamentList.map((item: any) => (
      <TournamentItem
        key={item.id}
        item={item}
        onEdit={editTournamentHandler}
        onDelete={deleteTournamentHandler}
      />
    ));
    tournamentContent = <FlexBox>{tournamentItems}</FlexBox>;
  }

  if (error) {
    tournamentContent = (
      <div style={{ display: 'block', margin: 'auto', textAlign: 'center' }}>
        <p>Something went wrong.</p>
        <Button onClick={fetchTournaments}>RETRY</Button>
      </div>
    );
  }

  if (loading) {
    tournamentContent = (
      <div style={{ display: 'block', margin: 'auto', textAlign: 'center' }}>
        <p>Loading tournaments ...</p>
      </div>
    );
  }

  useEffect(() => {
    filterTournamentList();
  }, [tournaments, searchedTournamentName]);

  useEffect(() => {
    fetchTournaments();
  }, [dispatch]);

  return <>{tournamentContent}</>;
};

export default TournamentList;
