import { FormFeedback, FormGroup, Input as ReactStrapInput } from "reactstrap";

const Input = (props) => {
  const { type, placeholder, name, value, onChange, error, onBlur } = props;

  return (
    <FormGroup>
      <ReactStrapInput
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onBlur={onBlur}
        onChange={onChange}
        className="mb-3"
        invalid={Boolean(error)}
      />
      <FormFeedback>{error}</FormFeedback>
    </FormGroup>
  );
};

export default Input;
