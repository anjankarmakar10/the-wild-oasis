import { styled } from "styled-components";
import Logo from "../ui/Logo";
import MainNav from "../ui/MainNav";

const Sidebar = () => {
  return (
    <Container>
      <Logo />
      <MainNav />
    </Container>
  );
};

const Container = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);
  grid-row: 1 / 3;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

export default Sidebar;
