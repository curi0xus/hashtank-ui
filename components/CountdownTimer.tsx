import Countdown from 'react-countdown';

export const formatCountdownTime = (time: number) => {
  return time.toString().length < 2 ? '0' + time : time;
};

const HashTankCountdownTimer = ({ date, renderer }: any) => {
  return <Countdown date={date} renderer={renderer} />;
};

export default HashTankCountdownTimer;
