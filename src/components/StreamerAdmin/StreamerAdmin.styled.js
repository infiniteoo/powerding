import styled from "styled-components";

export const PowerDingContainer = styled.div`
  display: flex;
  flex-direction: column;

  overflow-x: auto;

  width: 100%;
  border: 5px solid #fff;
`;
export const PowerDing = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
  /* justify-content: space-between; */
  height: 100%;
  width: 100%;
  background: transparent;
  border: 1px solid #fff;
  padding: 3px;
  :hover {
    color: #fff;
  }
`;

export const Playback = styled.div``;

export const DonationBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 60px;
  width: 100%;
  background: transparent;
  border: 5px solid #fff;
`;
