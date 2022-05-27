export const getGreet = () => {
  const hrs = new Date().getHours();
  const min = new Date().getMinutes();
  if (hrs >= 5 && hrs <= 11 && min <= 59) {
    return "Good morning";
  } else if (hrs >= 12 && hrs <= 17) {
    return "Good Afternoon";
  } else if (hrs >= 17 && hrs <= 21) {
    return "Good Evening";
  } else {
    return "Good Night";
  }
};
