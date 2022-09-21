import { render } from 'react-dom';
import styled from 'styled-components';
import theme from '../../theme';

const Card = styled.div`
  width: 286px;
  background: ${theme.palette.background.base};
  border: 1px solid ${theme.palette.background.base};
  border-radius: ${theme.borderRadius};
  padding: ${theme.spacing(2)};
`;

export default Card;
