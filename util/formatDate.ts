import { fromUnixTime, format } from 'date-fns';

export function formatDate(ts?: any) {
  return ts ? format(new Date(ts), 'd.MM.yyyy') : '';
}
