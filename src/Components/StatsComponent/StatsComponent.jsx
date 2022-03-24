import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { userActions } from "../../store/user-slice";
import SortButton from "../UI/SortButton/SortButton";
import StatsItem from "../UI/StatsItem/StatsItem";
import "./StatsComponent.css";
const StatsComponent = (props) => {
  const stats = useSelector((state) => state.user.stats);
  const dispatch = useDispatch();
  const onSortHandle = (sort) => {
    if (sort === "asc") dispatch(userActions.sortAsc("stats"));
    if (sort === "desc") dispatch(userActions.sortDesc("stats"));
  };
  return (
    <div className="StatsComponent">
      <SortButton sortFunction={onSortHandle} sortBy="Most played" />
      <ul className="stats-unordered-list">
        {stats.length === 0
          ? "No data"
          : stats.map((stat) => <StatsItem key={stat.nat} stats={stat} />)}
      </ul>
    </div>
  );
};

export default StatsComponent;
