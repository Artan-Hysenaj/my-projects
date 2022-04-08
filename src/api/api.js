const FIREBASE =
  "https://snippets-react-re-do-default-rtdb.europe-west1.firebasedatabase.app/";

export const getAllSnippets = async () => {
  const response = await fetch(FIREBASE + "snippets.json");
  const responseData = await response.json();
  const reformedData = [];
  for (let key in responseData) {
    reformedData.push({ id: key, ...responseData[key] });
  }
  return reformedData;
};
const add = () => {
  fetch(FIREBASE + "snippets.json", {
    method: "POST",
    body: JSON.stringify({
      language: "JavaScript",
      name: "Try Catch",
      description: "Used catching errors",
      code: "try{}catch(error){console.log(error)}",
    }),
  })
    .then((response) => response.json())
    .then((responseData) => console.log(responseData));
};
