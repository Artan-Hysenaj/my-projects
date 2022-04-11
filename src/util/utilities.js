const WEB_API_KEY = "AIzaSyD-vwRIousdCMYVmqzE0w591GoMYfQexPY";

export const FIREBASE =
  "https://snippets-react-re-do-default-rtdb.europe-west1.firebasedatabase.app/";
export const FIREBASE_REGISTER = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${WEB_API_KEY}`;
export const FIREBASE_LOGIN = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${WEB_API_KEY}`;

export const transfomIncomingDataToArray = (data) => {
  const transformedArray = [];
  for (let key in data) {
    transformedArray.push({
      id: key,
      ...data[key],
    });
  }
  return transformedArray;
};
