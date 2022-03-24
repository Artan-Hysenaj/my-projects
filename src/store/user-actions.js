import axios from "axios";
import { uiActions } from "./ui-slice";
import { userActions } from "./user-slice";

//generate random number from 1-100 method
const generateRandomNumber = () => {
  return Math.floor(Math.random() * 100 + 1);
};

//generate user, api call
export const fetchUser = () => {
  return async (dispatch) => {
    dispatch(uiActions.setIsLoading(true));
    const fetchUserData = async () => {
      const response = await axios(
        "https://randomuser.me/api?page={pageIndex}"
      );
      if (response.status !== 200) {
        throw new Error("Something went wrong");
      }
      return response;
    };
    try {
      const responseData = await fetchUserData();
      const user = responseData.data.results[0];
      const randomNumber = generateRandomNumber();
      const newUser = {
        //some users return null for user.id.value, to avoid that a bug I've decided to use as follows
        id: user.id.value ? user.id.value : user.cell + user.phone,
        //thumbnail image is too small and low quality for given UI
        picture: user.picture.large,
        fullName: `${user.name.first} ${user.name.last}`,
        email: user.email,
        gender: user.gender.slice(0, 1).toUpperCase(),
        cell: user.cell,
        phone: user.phone,
        location: `${user.location.city}, ${user.location.country}, ${user.location.postcode}`,
        nat: user.nat,
        isWinner: false,
        age: user.dob.age,
        time: new Date().toISOString(),
      };
      if (newUser.age === randomNumber) {
        newUser.isWinner = true;
        dispatch(
          uiActions.showWinner({
            show: true,
            status: "success",
            title: "Winner",
            message: "Congratulations",
          })
        );
        dispatch(uiActions.showDialog());
      } else {
        dispatch(
          uiActions.showWinner({
            show: false,
            status: "",
            title: "",
            message: "",
          })
        );
      }
      dispatch(userActions.setGeneratedUser(newUser));
      dispatch(userActions.setUserToArray(newUser));
      dispatch(userActions.setStats(newUser));
    } catch (error) {
      console.log(error);
    }
    dispatch(uiActions.setIsLoading(false));
  };
};
