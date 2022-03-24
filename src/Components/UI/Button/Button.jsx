import "./Button.css";
const Button = (props) => {
  return (
    <button
      type={props.type}
      className={props.danger ? "Button danger" : "Button"}
      onClick={props.buttonFunction}
    >
      {props.buttonValue}
    </button>
  );
};

export default Button;
