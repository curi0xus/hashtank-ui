import GradeD from 'public/static/images/About/sauces/gunk.webp';
import GradeB from 'public/static/images/About/sauces/grade-b.webp';
import GradeC from 'public/static/images/About/sauces/grade-c.webp';
import GradeA from 'public/static/images/About/sauces/grade-a.webp';

const SAUCES = [
  {
    grade: 'D',
    gradeName: 'gunk',
    gradeColor: '#9A9FB0',
    boxProps: {
      h: ['35vh', '35vh', '35vh', '55vh'],
      w: 'fit-content',
      ml: ['0vw', '0vw', '0vw', '10vw'],
      mb: ['5vh', '5vh', '5vh', 0],
    },
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: 'auto',
        height: '100%',
      },
    },
    description: [
      "This repugnant sludge is so vile that even the most oblivious consheepmer steers clear of it. Toss it into the industrial waste pile where it belongs, and let's return to some real capitalism.",
    ],
    img: GradeD,
  },
  {
    grade: 'C',
    gradeName: 'standard',
    gradeColor: 'brand.900',
    boxProps: {
      h: ['35vh', '35vh', '35vh', '55vh'],
      w: 'fit-content',
      ml: ['0vw', '0vw', '0vw', '10vw'],
      mb: ['5vh', '5vh', '5vh', 0],
    },
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: 'auto',
        height: '100%',
      },
    },
    description: [
      'A modest, everyday condiment cherished by hundreds of millions, now infused with an extra zing of radiation.',
      'Witness the perfect marriage of consumerism and mass production.',
    ],
    img: GradeC,
  },
  {
    grade: 'B',
    gradeName: 'premium',
    gradeColor: '#A0FF56',
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: 'auto',
        height: '100%',
      },
    },
    boxProps: {
      h: ['35vh', '35vh', '35vh', '55vh'],
      w: 'fit-content',
      ml: ['0vw', '0vw', '0vw', '10vw'],
      mb: ['5vh', '5vh', '5vh', 0],
    },
    description: [
      "Same stuff different packaging. It's amazing how a marketing department can transform product value in the eyes of the consheepmers.",
      'Truly, an ode to the capitalist ideal.',
    ],
    img: GradeB,
  },
  {
    grade: 'A',
    gradeName: 'artisanal',
    gradeColor: '#B276FF',
    imageProps: {
      width: 368,
      height: 1006,
      style: {
        width: 'auto',
        height: '100%',
      },
    },
    boxProps: {
      h: ['35vh', '35vh', '35vh', '55vh'],
      w: 'fit-content',
      ml: ['0vw', '0vw', '0vw', '10vw'],
      mb: ['5vh', '5vh', '5vh', 0],
    },
    description: [
      'Perfected over generations in some exotic locale, these families have never heard of fair labor, let alone human rights, but boy, do they know fish sauce. Bringing together the highest of tastes for both your aesthetic appreciation and your taste buds.',
      'Harmony incarnate, umami in every drip.',
    ],
    img: GradeA,
  },
];

export { SAUCES };
