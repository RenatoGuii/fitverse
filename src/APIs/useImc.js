import axios from "axios";

const dataOption = (height, weight) => {
  const options = {
    method: "GET",
    url: "https://mega-fitness-calculator1.p.rapidapi.com/bmi",
    params: {
      weight: `${weight}`,
      height: `${height}`,
    },
    headers: {
      "X-RapidAPI-Key": "57996be828msh986f446112d7c93p1e56fajsn95c27087f48a",
      "X-RapidAPI-Host": "mega-fitness-calculator1.p.rapidapi.com",
    },
  };

  return options;
};

const getData = async (height, weight) => {
  try {
    const response = await axios.request(dataOption(height, weight));
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getData;
