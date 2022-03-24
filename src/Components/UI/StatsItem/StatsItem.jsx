import "./StatsItem.css";
const StatsItem = (props) => {
  return (
    <li className="StatsItem">
      <div>
        <h3>{props.stats.nat}</h3>
      </div>
      <div className="stats-number">{props.stats.players}</div>
    </li>
  );
};

export default StatsItem;
