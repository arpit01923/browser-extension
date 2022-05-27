import axios from "axios";

export const getQuote = async (setQuote) => {
  try {
    const response = await axios.get(
      "https://api.quotable.io/random?maxLength=50"
    );
    setQuote(response.data.content);
  } catch (e) {
    console.log(e);
  }
};
