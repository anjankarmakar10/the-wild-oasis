import { Outlet } from "react-router-dom";
import Sidebar from "./ui/Sidebar";
import Header from "./ui/Header";
import { styled } from "styled-components";

function App() {
  return (
    <Wrapper>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </Wrapper>
  );
}

const Container = styled.div`
  max-width: 120rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  overflow: auto;
`;

const Wrapper = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: green;
  padding: 4rem 4.8rem 6.4rem;
  background-color: var(--color-grey-50);
`;

export default App;
