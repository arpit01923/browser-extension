export const getHour = () => {
  const hrs = new Date().getHours();
  return hrs;
};

export const getMinute = () => {
  const min = new Date().getMinutes();
  if (min < 10) return "0".concat(min.toString());
  else return min;
};
