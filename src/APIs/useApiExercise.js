import axios from "axios";

const dataOption = (muscleChoice) => {
  const options = {
    method: "GET",
    url: `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${muscleChoice}`,
    headers: {
      "X-RapidAPI-Key": "57996be828msh986f446112d7c93p1e56fajsn95c27087f48a",
      "X-RapidAPI-Host": "exercisedb.p.rapidapi.com",
    },
  };

  return options;
};

const getData = async (muscle) => {
  try {
    const response = await axios.request(dataOption(muscle));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
