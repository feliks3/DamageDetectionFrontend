import styled from 'styled-components';

const DamagedAreaStyled = styled.div`
  position: absolute;
  top: ${(props) => props.$scaledDamagedArea.top}px;
  left: ${(props) => props.$scaledDamagedArea.left}px;
  width: ${(props) => props.$scaledDamagedArea.width}px;
  height: ${(props) => props.$scaledDamagedArea.height}px;
  border: 1px solid yellow;
`;

function DamagedArea({ scaledDamagedArea }) {
  // console.log('scaledDamagedArea', scaledDamagedArea);
  return <DamagedAreaStyled $scaledDamagedArea={scaledDamagedArea} />;
}

export default DamagedArea;
