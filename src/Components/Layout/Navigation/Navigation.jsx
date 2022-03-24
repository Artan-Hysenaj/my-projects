import classes from "./Navigation.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
const Navigation = (props) => {
  return (
    <ul className={classes.Navigation}>
      <NavigationItem link="/home" page="HOME" />
      <NavigationItem link="/winners" page="WINNERS" />
      <NavigationItem link="/session-players" page="SESSION PLAYERS" />
      <NavigationItem link="/stats" page="STATS" />
    </ul>
  );
};

export default Navigation;
