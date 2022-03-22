import "./NavigationItem.css";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
const NavigationItem = (props) => {
  const location = useLocation();
  return (
    <li className="NavigationItem">
      <Link
        className={
          location.pathname === props.link
            ? "navigation-link active"
            : "navigation-link"
        }
        to={props.link}
      >
        {props.page}
      </Link>
    </li>
  );
};

export default NavigationItem;
