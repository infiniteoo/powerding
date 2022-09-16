import styled from "styled-components";

export const AccountLabel = styled.div`
  color: #ea39b8;
  font-size: 1.25rem;
  margin-top: 0.5rem;

  @media (max-width: 974px) {
    font-size: 1rem;
  }
`;

export const AccountInfo = styled.div`
  color: white;
  @media (max-width: 974px) {
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  margin: 0 auto;
  width: 100%;
  /*  max-width: 1000px; */
  padding: 0 1rem;
  height: 100%;

  @media (max-width: 974px) {
    flex-direction: column;
  }
`;

export const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  width: 100%;
  /* max-width: 1000px; */
  padding: 0 1rem;
  height: 100%;
`;
