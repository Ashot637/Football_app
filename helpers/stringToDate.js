const { setSeconds, setHours, setMinutes } = require('date-fns');
// export const stringToDate = (dateString, timeString, addHours = 0, addMinutes = 0) => {
//   const parsedDate = new Date(dateString);

//   const [hours, minutes] = timeString.split(':').map((num) => parseInt(num));
//   const updatedDate = setHours(parsedDate, hours + addHours);
//   const jsDate = setMinutes(updatedDate, minutes + addMinutes);
//   const jsDateWithSeconds = setSeconds(jsDate, 0);

//   return jsDateWithSeconds;
// };


export const stringToDate = (dateString, timeString, durationMinutes = 0) => {
  const parsedDate = new Date(dateString);
  const [hours, minutes] = timeString.split(":").map((num) => parseInt(num));

  const totalMinutes = minutes + durationMinutes;
  const additionalHours = Math.floor(totalMinutes / 60); 
  const finalMinutes = totalMinutes % 60;

  const updatedDate = setHours(parsedDate, hours + additionalHours);
  const jsDate = setMinutes(updatedDate, finalMinutes);
  const jsDateWithSeconds = setSeconds(jsDate, 0);

  return jsDateWithSeconds;
};
