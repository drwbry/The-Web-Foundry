// Content for the Morning & Night Bakery Delights proof-of-concept (/demo/morning-and-night).
// Transcribed from the prospect's Wix site (morningandnight.wixsite.com/bakerydelights):
// the home page menu and the monthly menu page (november-monthly-menu), November 2026.
// Prices are copied as written there, including the $14.50 frosted full tray.
// Her street address is deliberately left off: it's a home bakery.
//
// Monthly refresh: update flavorOfTheMonth, stands, and any menu items that changed.

export const base = '/demo/morning-and-night';

export const links = {
  emailList: 'https://docs.google.com/forms/d/e/1FAIpQLSftIfYcVyqzbpx1BbxOviCfiYj021mZBT1XWww-hd61b3QlQA/viewform',
  customOrder: 'https://docs.google.com/forms/d/e/1FAIpQLSetGetmbcGHVki0loky0vvQzyyi3HojbJEr1aqbujlLSNYdZQ/viewform',
  instagram: 'https://www.instagram.com/morningandnightbakerydelights',
  facebook: 'https://www.facebook.com/morningandnightbakerydelights/',
  email: 'morningandnightbakerydelights@gmail.com',
  venmo: '@morningandnightbakerydelights',
  currentSite: 'https://morningandnight.wixsite.com/bakerydelights',
};

export const flavorOfTheMonth = {
  month: 'November',
  flavor: 'Cinnamon',
  // Shown under the stand dates. Optional; omit when there's nothing extra to say.
  note: 'Only one sale date this month. If you need more, send a custom order request. The last day to pick up baked goods before Thanksgiving is Monday, November 23.',
};

// ISO dates so the page scripts can mark past stands and highlight the next one.
// Once every stand has passed, the pages switch to a "dates coming soon" message.
export const stands = [
  {
    date: '2026-11-14',
    label: 'Saturday, November 14',
    preorder: 'Nov. 7 to 9',
    specials: ['Cinnamon Coffee Cake Muffins', 'Apple Cinnamon Muffins', 'Blueberry Coffee Cake Muffins', 'Snickerdoodle Cookies', 'Cinnamon Rolls', 'Cinnamon Swirl Bread'],
    alsoAvailable: ['Chocolate Chip Cookies', 'Peanut Butter Cookies', 'Brownie Quartets & Trays'],
  },
];

// `time` drives the sun/moon marker: morning treats vs. evening treats.
// `seasonal` items get the flavor-of-the-month tag.
export const menu = [
  {
    id: 'breads',
    title: 'Breads',
    time: 'morning',
    items: [
      {
        name: 'Cinnamon Swirl Bread',
        seasonal: true,
        prices: [['1-lb loaf', '$10.00'], ['1/2-lb loaf', '$6.00']],
      },
    ],
  },
  {
    id: 'rolls',
    title: 'Cinnamon Rolls',
    time: 'morning',
    items: [
      {
        name: 'Classic Cinnamon Rolls',
        seasonal: true,
        desc: 'Filled with a gooey cinnamon sugar filling and topped with a sweet vanilla glaze. Add cream cheese frosting for $0.50 more per roll.',
        prices: [['Full tray (9 rolls)', '$12.00', 'with frosting $14.50'], ['Small tray (4 rolls)', '$6.00', 'with frosting $8.00']],
      },
    ],
  },
  {
    id: 'muffins',
    title: 'Muffins',
    time: 'morning',
    note: 'Dozen and half dozen orders can mix two or three kinds.',
    items: [
      {
        name: 'Cinnamon Streusel',
        seasonal: true,
        desc: 'Buttery muffins with cinnamon sugar streusel layered in the middle and sprinkled on top.',
      },
      {
        name: 'Blueberry Coffee Cake',
        seasonal: true,
        desc: 'A buttery muffin with juicy blueberries and a sweet cinnamon streusel on top.',
      },
      {
        name: 'Apple Cinnamon',
        seasonal: true,
        desc: 'Buttery muffins studded with apples, with cinnamon sugar streusel in the middle and on top.',
      },
    ],
    prices: [['Half dozen', '$14.00'], ['Individual', '$3.00']],
  },
  {
    id: 'cookies',
    title: 'Cookies',
    time: 'night',
    items: [
      {
        name: 'Chocolate Chip',
        desc: 'Soft, buttery centers, crisp edges, and plenty of chocolate chips.',
        prices: [['10-ct', '$10.00'], ['4-ct', '$5.00']],
      },
      {
        name: 'Peanut Butter or Classic Snickerdoodle',
        seasonal: true,
        desc: 'Same price for either. Peanut butter comes with or without chocolate chips.',
        prices: [['8-ct', '$10.00'], ['3-ct', '$5.00']],
      },
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies',
    time: 'night',
    items: [
      {
        name: 'Brownie Quartet',
        desc: "Fudgy brownies with chocolate chips and a dusting of powdered sugar. The premium mix is 2 classic and 2 topped: celebration (vanilla buttercream and sprinkles), party (chocolate buttercream and candy-coated chocolate chips), or s'mores (toasted mini marshmallows and graham cracker).",
        prices: [['4-ct classic', '$7.00'], ['4-ct classic + premium', '$8.00']],
      },
    ],
  },
];

export const glutenFree = {
  note: 'These treats are made with gluten-free ingredients and can be pre-ordered for every stand. I use fresh gluten-free ingredients, double-clean all tools and surfaces, and bake these items at separate times. My kitchen also handles gluten, so I can\'t guarantee a completely gluten-free environment.',
  items: [
    {
      name: 'Brownies',
      desc: 'Fudgy brownies with powdered sugar (classic) or vanilla or chocolate buttercream (premium).',
      prices: [['16-ct classic', '$30.00'], ['8 classic + 8 premium', '$38.00']],
    },
    {
      name: 'Cinnamon Roll Scones',
      desc: '4.5 oz scones swirled with cinnamon sugar and topped with the same vanilla glaze as the classic rolls.',
      prices: [['2-ct', '$9.00'], ['4-ct', '$16.00']],
    },
    {
      name: 'Marshmallow Crispy Treats',
      desc: 'Plain, or topped with white or dark chocolate.',
      prices: [['8-ct plain', '$12.00'], ['8-ct chocolate topped', '$17.00']],
    },
  ],
};
