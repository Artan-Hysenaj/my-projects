import React from "react";
import { BallTriangle } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { uiActions } from "../../store/ui-slice";
import { fetchUser } from "../../store/user-actions";
import { userActions } from "../../store/user-slice";
import Button from "../UI/Button/Button";
import Card from "../UI/Card/Card";
import "./HomeComponent.css";
import Dialog from "../UI/Modal/Dialog";
const Home = (props) => {
  const generatedUser = useSelector((state) => state.user.generatedUser);
  const users = useSelector((state) => state.user.users);
  const isLoading = useSelector((state) => state.ui.isLoading);
  const dispatch = useDispatch();

  return (
    <div className="Home">
      <Button
        buttonValue="Generate User"
        type="button"
        buttonFunction={() => {
          dispatch(fetchUser());
        }}
      />
      <Dialog user={generatedUser} />
      {isLoading && <BallTriangle color="#00BFFF" height={80} width={80} />}
      {users.length !== 0 && !isLoading && <Card user={generatedUser} />}
      {users.length !== 0 && !isLoading && (
        <Button
          danger
          buttonValue="Clear Session"
          type="button"
          buttonFunction={() => {
            dispatch(userActions.clearSession(), uiActions.clearState());
          }}
        />
      )}
    </div>
  );
};

export default Home;
