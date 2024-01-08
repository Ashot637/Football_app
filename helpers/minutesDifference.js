import { differenceInMinutes } from 'date-fns';
import i18n from '../languages/i18n';

export const minutesDifference = (start, end) => {
  const mins = differenceInMinutes(end, start);
  const hours = Math.floor(mins / 60);
  const minutes = mins % 60;

  const getHoursTitle = (lang) => {
    switch (lang) {
      case 'am':
        return 'ժամ';
      case 'ru':
        return 'часа';
      default:
        return 'hours';
    }
  };

  const getMinutesTitle = (lang) => {
    switch (lang) {
      case 'am':
        return 'րոպե';
      case 'ru':
        return 'минут';
      default:
        return 'minutes';
    }
  };

  return hours
    ? `${hours}.${minutes} ${getHoursTitle(i18n.language)}`
    : `${minutes} ${getMinutesTitle(i18n.language)}`;
};
