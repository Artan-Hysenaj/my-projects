import "./App.css";
import Home from "./Pages/Home";
import Winners from "./Pages/Winners";
import SessionPlayers from "./Pages/SessionPlayers";
import Stats from "./Pages/Stats";
import NotFound from "./Pages/NotFound";
import { Route, Switch } from "react-router-dom";
import Header from "./Components/Layout/Header";
import Notification from "./Components/UI/Notification/Notification";
import { useSelector } from "react-redux";
function App() {
  const showWinner = useSelector((state) => state.ui.showWinner);
  const users = useSelector((state) => state.user.users);
  return (
    <div className="App">
      {showWinner.show && users.length !== 0 && (
        <Notification
          status={showWinner.status}
          title={showWinner.title}
          message={showWinner.message}
        />
      )}
      <Header />
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/winners" exact>
          <Winners />
        </Route>
        <Route path="/session-players" exact>
          <SessionPlayers />
        </Route>
        <Route path="/stats" exact>
          <Stats />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
