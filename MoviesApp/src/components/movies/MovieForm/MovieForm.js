import { useState } from "react";
import { Button, Input, Label } from "reactstrap";
import classes from "./MovieForm.module.css";
import CustomInput from "../../shared/Input";

const initialState = {
  title: "",
  description: "",
  img: "http://via.placeholder.com/250x250",
  director: "",
  duration: "",
  price: "",
  featured: false,
};

const MovieForm = (props) => {
  const [formData, setFormData] = useState(props.initalData ?? initialState);
  const [errors, setErrors] = useState({});

  const validateData = () => {
    const tempErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key] && key !== "featured") {
        tempErrors[key] = `${key} field is required`;
      }
    });

    setErrors(tempErrors);

    return Boolean(Object.keys(tempErrors).length !== 0);
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    const hasErrors = validateData();
    if (hasErrors) {
      return;
    }
    props.onSubmit(formData);
  };

  const handleOnChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleOnCheckboxChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.checked,
    });
  };

  return (
    <form onSubmit={handleOnSubmit} className={classes["movie-form"]}>
      <CustomInput
        placeholder="Title"
        name="title"
        value={formData.title}
        onChange={handleOnChange}
        error={errors.title}
      />

      <CustomInput
        placeholder="Description"
        name="description"
        value={formData.description}
        onChange={handleOnChange}
        error={errors.description}
      />

      <div className="mb-3">
        <CustomInput
          placeholder="Image"
          name="img"
          value={formData.img}
          onChange={handleOnChange}
          error={errors.img}
        />

        <img src={formData.img} alt="" />
      </div>

      <CustomInput
        placeholder="Director"
        name="director"
        value={formData.director}
        onChange={handleOnChange}
        error={errors.director}
      />

      <CustomInput
        placeholder="Duration"
        name="duration"
        value={formData.duration}
        onChange={handleOnChange}
        error={errors.duration}
      />

      <CustomInput
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleOnChange}
        error={errors.price}
      />

      <div>
        <Label htmlFor="featured">
          <Input
            type="checkbox"
            style={{ marginRight: 5 }}
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleOnCheckboxChange}
          />
          <span>Featured</span>
        </Label>
      </div>

      <div className="mt-2 mb-5">
        <Button color="primary">Save</Button>
      </div>
    </form>
  );
};

export default MovieForm;
