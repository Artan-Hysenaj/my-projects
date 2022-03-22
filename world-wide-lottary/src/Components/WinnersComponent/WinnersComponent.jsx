import { useState } from "react";
import { useSelector } from "react-redux";
import ListItem from "../UI/ListItem/ListItem";
import SortButton from "../UI/SortButton/SortButton";
import "./WinnersComponent.css";
const WinnersComponent = (props) => {
  const users = useSelector((state) => state.user.users);
  const getWinners = users.filter((user) => user.isWinner === true);
  let sortedArray = [...getWinners];
  const [winners, setWinners] = useState(getWinners);

  //descending -sort by time
  const descendingUsers = (array) => {
    return array.sort(function (a, b) {
      return new Date(b.time).getTime() - new Date(a.time).getTime();
    });
  };

  // ascending - sort by time
  const ascendingUsers = (array) => {
    return array.sort(function (a, b) {
      return new Date(a.time).getTime() - new Date(b.time).getTime();
    });
  };

  //handle click
  const onSortHandle = (sort) => {
    if (sort === "desc") descendingUsers(sortedArray);
    if (sort === "asc") ascendingUsers(sortedArray);
    setWinners(sortedArray);
  };

  return (
    <div className="WinnersComponent">
      <SortButton sortFunction={onSortHandle} sortBy="Time" />
      <ul className="winners-unordered-list">
        {winners.length === 0
          ? "No Winners"
          : winners.map((user) => <ListItem user={user} key={user.id} />)}
      </ul>
    </div>
  );
};

export default WinnersComponent;
