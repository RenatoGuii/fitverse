import axios from "axios";

const dataOption = (dataText) => {
  const options = {
    method: "POST",
    url: "https://ai-translate.p.rapidapi.com/translates",
    headers: {
      "content-type": "application/json",
      "X-RapidAPI-Key": "57996be828msh986f446112d7c93p1e56fajsn95c27087f48a",
      "X-RapidAPI-Host": "ai-translate.p.rapidapi.com",
    },
    data: {
      texts: dataText,
      tls: ["pt"],
      sl: "en",
    },
  };

  return options;
};

const getDataTranslate = async (data) => {
  try {
    const response = await axios.request(dataOption(data));
    return response.data[0].texts;
  } catch (error) {
    console.error(error);
  }
};

export default getDataTranslate;
