import ListItem from "../UI/ListItem/ListItem";
import SortButton from "../UI/SortButton/SortButton";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/user-slice";
import classes from "./SessionComponent.module.css";
const SessionComponent = (props) => {
  const users = useSelector((state) => state.user.users);
  const dispatch = useDispatch();
  const onSortHandle = (sort) => {
    if (sort === "asc") dispatch(userActions.sortAsc("user"));
    if (sort === "desc") dispatch(userActions.sortDesc("user"));
  };

  return (
    <div className={classes.SessionComponent}>
      <SortButton sortFunction={onSortHandle} sortBy="Time" />
      <ul className={classes["session-unordered-list"]}>
        {users.length === 0
          ? "No Users Found"
          : users.map((user) => <ListItem user={user} key={user.id} />)}
      </ul>
    </div>
  );
};

export default SessionComponent;
