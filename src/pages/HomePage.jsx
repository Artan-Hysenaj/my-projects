import Header from "../components/Layout/Header/Header";
import Snippets from "../components/Snippets/Snippets";
const HomePage = (props) => {
  return (
    <>
      <Header
        title="Errday Snippets"
        subtitle="Create and browse snippets you see and use every day"
      />

      <Snippets />
    </>
  );
};

export default HomePage;
