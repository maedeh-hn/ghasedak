import { format, getTime, formatDistanceToNow } from 'date-fns';
import moment from "jalali-moment";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date) {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}


export function fDateJalali(date) {
  try {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format('YYYY/MM/DD')
  } catch (e) {
    return null
  }
}

export function fDateTimeJalali(date) {
  try {
    return moment(date, 'YYYY-MM-DDTHH:mm:ss').locale('fa').format('HH:mm YYYY/MM/DD');
  } catch (e) {
    return null
  }
}

export function fDateTimeToDate(date) {
  try {
    let result = moment(date, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DD');
    return result === 'Invalid date' ? '' : result
  } catch (e) {
    return null
  }
}


export function fDateTimeToUTC(date) {
  try {
    let result = moment(date, 'YYYY-MM-DDTHH:mm:ss').format('YYYY-MM-DDTHH:mm:ss.sssZ');
    return result === 'Invalid date' ? '' : result
  } catch (e) {
    return null
  }
}
