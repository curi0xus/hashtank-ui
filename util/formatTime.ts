import { fromUnixTime, format } from 'date-fns';

export function formatTime(ts?: any) {
  return ts ? format(new Date(ts), 'HH:mm') : '';
}
