import React from 'react';
import { toUTC } from '../../utils/dateFormat';
import Button from '../UI/Button';
import Card from '../UI/Card';
import H6 from '../UI/H6';

type TournamentItemProps = {
  item: any;
  onEdit: (item: any) => void;
  onDelete: (t: any) => Promise<void>;
};

const TournamentItem: React.FC<TournamentItemProps> = ({
  item,
  onEdit,
  onDelete,
}) => {
  const editTournamentHandler = () => {
    onEdit(item);
  };
  const deleteTournamentHandler = () => {
    onDelete(item.id);
  };

  return (
    <Card>
      <H6>{item.game}</H6>
      <div>Organizer: {item.organizer}</div>
      <div>
        {/* Participants: {item.participants.current}/{item.participants.max} */}
      </div>
      <div style={{ marginBottom: '8px' }}>
        Start: {toUTC(item.startDate).toString()}
      </div>
      <Button onClick={editTournamentHandler} style={{ marginRight: '8px' }}>
        EDIT
      </Button>
      <Button onClick={deleteTournamentHandler}>DELETE</Button>
    </Card>
  );
};

export default TournamentItem;
