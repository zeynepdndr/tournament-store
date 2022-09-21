import React, { useState } from 'react';
import NewTournament from '../NewTournament/NewTournament';
import TournamentList from './TournamentList';
import Input from '../UI/Input';

const Tournaments: React.FC = () => {
  const [searchedTournamentName, setSearchedTournamentName] = useState('');

  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: '24px',
        }}
      >
        <Input
          placeholder="Search tournament ..."
          value={searchedTournamentName}
          onChange={(e) => setSearchedTournamentName(e.target.value)}
          onBlur={(e) => setSearchedTournamentName(e.target.value)}
        />
        <NewTournament />
      </div>
      <TournamentList searchedTournamentName={searchedTournamentName} />
    </>
  );
};

export default Tournaments;
