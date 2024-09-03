import Money from 'public/static/images/About/money.webp';
import Bottles from 'public/static/images/About/bottles.webp';

const OPPORTUNITIES = [
  {
    grade: 'profit',
    gradeName: 'sell',
    gradeColor: 'brand.900',
    boxProps: {
      w: '60%',
      mb: ['5vh', '5vh', '5vh', '3.5vh'],
    },
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: '100%',
        height: 'auto',
      },
    },
    description: [
      'Place your fish sauce on supermarket chains for consumers to relish. A predetermined estimate of profit split will be presented to you when choosing this option. In the alpha phase, this stands as one of the sole methods to generate SHELL Tokens from the game loop. Alternatively, you can sell your bottles on markets like OpenSea to other players and collectors.',
    ],
    img: Money,
  },
  {
    grade: 'enjoyment',
    gradeName: 'redemption',
    gradeColor: 'brand.900',
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: '100%',
        height: 'auto',
      },
    },
    boxProps: {
      display: 'flex',
      justifyContent: 'center',
      w: '70%',
      mb: ['5vh', '5vh', '5vh', '6.5vh'],
    },
    description: [
      'Each bottle of sufficient quality may be redeemed for a physical, real-world bottle. Apart from acquiring a custom-made bottle of fish sauce, redemptions may, at times, yield unique assets enhancing critical game mechanics to be integrated in future phases.',
      'Redeeming a bottle of the ever-elusive Artisanal Sauce will also grant access to the coveted Fish Sauce Club, offering a variety of benefits, including merch drops, as HASHTANK matures.',
    ],
    img: Bottles,
  },
];

export { OPPORTUNITIES };
