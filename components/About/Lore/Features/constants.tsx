import Conservationist from 'public/static/images/About/mr-ching.webp';
import LoveSauceProgram from 'public/static/images/About/love-sauce.webp';
import ConservationistMobile from 'public/static/images/About/mobile/mr-ching.webp';
import LoveSauceProgramMobile from 'public/static/images/About/mobile/love-sauce.webp';

const FEATURES = [
  {
    title: 'THE LOVE SAUCE PROGRAM',
    mobileImage: LoveSauceProgramMobile,
    desktopImage: LoveSauceProgram,
    description: [
      'Being a fishkeeping enthusiast, the Love Sauce Program was conceived by my Mr. Ching as the backbone of his conservationist effort to safeguard and propagate marine life. This phase will introduce unique breeding mechanics for acquiring fish beyond auctions. ',
      "Mix, match, and figure out the best ways to procreate the ideal fish. Utilize these offspring, brimming with potential and hope, to either conserve the species or pulverize and ferment them into that perfect bottle of sauce. I hope you'll make the right choice.",
    ],
  },
  {
    title: 'CONSERVATIONIST PATH',
    mobileImage: ConservationistMobile,
    desktopImage: Conservationist,
    description: [
      "Not all of us are solely driven by the pursuit of profit through suffering. Maybe there's a way to safeguard and still cash in. The conservationist path offers an alternative approach to playing Hashtank. Decisions rooted in game theory and interactions with fellow collectors will be at the heart of this expansion. ",
      'Diverse leaderboard mechanics will introduce fresh challenges and rewards for both factions.',
    ],
  },
];

export { FEATURES };
