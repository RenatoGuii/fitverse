import axios from "axios";

const dataOption = (muscleChoice, typeChoice, levelChoice) => {
  const options = {
    method: "GET",
    url: "https://exercises-by-api-ninjas.p.rapidapi.com/v1/exercises",
    params: {
      type: typeChoice,
      muscle: muscleChoice,
      difficulty: levelChoice,
    },
    headers: {
      "X-RapidAPI-Key": "57996be828msh986f446112d7c93p1e56fajsn95c27087f48a",
      "X-RapidAPI-Host": "exercises-by-api-ninjas.p.rapidapi.com",
    },
  };
  return options;
};

const getData = async (muscle, type, level) => {
  try {
    const response = await axios.request(dataOption(muscle, type, level));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
