export const convertDate = (dateCreated) => {
  let dateToConvert = new Date(dateCreated);
  let date =
    parseInt(dateToConvert.getMonth() + 1) +
    "/" +
    dateToConvert.getDate() +
    "/" +
    dateToConvert.getFullYear();

  return date;
};

export const convertTime = (timeCreated) => {
  let timeToConvert = new Date(timeCreated);
  let amPm = timeToConvert.getHours() >= 12 ? "PM" : "AM";
  let time =
    timeToConvert.getHours() +
    ":" +
    timeToConvert.getMinutes() +
    ":" +
    timeToConvert.getSeconds() +
    " " +
    amPm;

  return time;
};
