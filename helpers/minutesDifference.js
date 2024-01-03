import { differenceInMinutes } from 'date-fns';

export const minutesDifference = (start, end) => {
  const mins = differenceInMinutes(end, start);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  return hours ? `${hours}.${minutes} hours` : `${minutes} minutes`;
};
