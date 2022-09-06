import styled from "styled-components";

export const PowerDingContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow-x: auto;

  width: 100%;
  border: 3px solid #fff;
`;
export const PowerDing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  color: ${(props) => (props.cssProps ? "grey" : null)};
  height: 100%;
  width: 100%;
  background: transparent;
  border: 1px solid #fff;
  padding: 3px;
  font-size: 1.2rem;
`;

export const Playback = styled.div``;

export const DonationBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 100%;
  background: transparent;
`;

export const PowerDingText = styled.div`
  :hover {
    color: #fff;
  }
`;

export const NoPowerDingsToDisplay = styled.div`
  display: flex;
  justify-content: center;
  color: grey;
  padding: 20px;
`;
