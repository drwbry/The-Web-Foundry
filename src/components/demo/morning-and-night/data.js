// Content for the Morning & Night Bakery Delights proof-of-concept (/demo/morning-and-night).
// Transcribed from the prospect's Wix site (morningandnight.wixsite.com/bakerydelights)
// in October 2026. Prices are copied as written there, including the $14.50 frosted
// full tray. Her street address is deliberately left off: it's a home bakery.

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
  month: 'October',
  flavor: 'Pumpkin',
};

// ISO dates so the page script can mark past stands and highlight the next one.
export const stands = [
  {
    date: '2026-10-03',
    label: 'Saturday, October 3',
    preorder: 'Sept. 26 to 28',
    specials: ['Pumpkin Chocolate Chip Muffins', 'Spiced Pumpkin Mini Cupcakes'],
    alsoAvailable: ['Cinnamon Swirl Bread', 'Classic Cinnamon Rolls', 'Cinnamon Streusel Muffins', 'Chocolate Chip Cookies', 'Iced Sugar Cookies', 'Brownie Quartets & Trays'],
  },
  {
    date: '2026-10-17',
    label: 'Saturday, October 17',
    preorder: 'Oct. 10 to 12',
    specials: ['Pumpkin Chocolate Chip Muffins', 'Pumpkin Snickerdoodle Cookies', 'Pumpkin Cinnamon Rolls'],
    alsoAvailable: ['Cinnamon Swirl Bread', 'Cinnamon Rolls', 'Blueberry Muffins', 'Peanut Butter Cookies', 'Brownie Quartets'],
  },
  {
    date: '2026-10-31',
    label: 'Saturday, October 31',
    preorder: 'Oct. 24 to 26',
    specials: ['Pumpkin Chocolate Chip Muffins', 'Pumpkin Cinnamon Rolls'],
    alsoAvailable: ['Cinnamon Swirl Bread', 'Cinnamon Rolls', 'Apple Cinnamon Muffins', 'Vanilla Cake Cups', 'Rice Crispy Treats', "Chocolate Chip & S'mores Cookies", 'Iced Sugar Cookies', 'Brownie Quartets'],
  },
];

// `time` drives the sun/moon marker: morning treats vs. evening treats.
export const menu = [
  {
    id: 'breads',
    title: 'Breads',
    time: 'morning',
    items: [
      {
        name: 'Cinnamon Swirl Bread',
        prices: [['1-lb loaf', '$10.00'], ['1/2-lb loaf', '$6.00']],
      },
      {
        name: 'Pumpkin Bread',
        seasonal: true,
        desc: 'Moist, tender pumpkin bread spiced with cinnamon and nutmeg. Order it plain or studded with chocolate chips.',
        prices: [['3/4-lb loaf', '$8.00']],
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
        desc: 'Filled with a gooey cinnamon sugar filling and topped with a sweet vanilla glaze. Add cream cheese frosting for $0.50 more per roll.',
        prices: [['Full tray (9 rolls)', '$12.00', 'with frosting $14.50'], ['Small tray (4 rolls)', '$6.00', 'with frosting $8.00']],
      },
      {
        name: 'Pumpkin Cinnamon Rolls',
        seasonal: true,
        desc: 'Soft, fluffy rolls made with pumpkin in the dough, filled with warm cinnamon sugar and spices, and finished with vanilla glaze.',
        prices: [['Full tray (9 rolls)', '$14.00'], ['Small tray (4 rolls)', '$8.00']],
      },
    ],
  },
  {
    id: 'muffins',
    title: 'Muffins',
    time: 'morning',
    note: 'Dozen and half dozen orders can be split half and half between the two kinds.',
    items: [
      {
        name: 'Pumpkin Muffins',
        seasonal: true,
        desc: 'Warmly spiced with cinnamon and nutmeg. Plain or with chocolate chips.',
      },
      {
        name: 'Blueberry Coffee Cake Muffins',
        desc: 'A buttery muffin with juicy blueberries and a sweet cinnamon streusel on top. Made for your morning coffee.',
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
        prices: [['10-ct', '$10.00'], ['3-ct', '$4.00']],
      },
      {
        name: 'Peanut Butter',
        desc: 'With or without chocolate chips.',
        prices: [['8-ct', '$10.00'], ['3-ct', '$5.00']],
      },
      {
        name: 'Pumpkin Snickerdoodles',
        seasonal: true,
        desc: 'Pumpkin flavor rolled in the classic cinnamon sugar coating.',
        prices: [['8-ct', '$10.00'], ['3-ct', '$5.00']],
      },
      {
        name: 'Classic Snickerdoodles',
        prices: [['12-ct', '$14.00']],
      },
    ],
  },
  {
    id: 'brownies',
    title: 'Brownies & Cakes',
    time: 'night',
    items: [
      {
        name: 'Brownie Quartet',
        desc: "Fudgy brownies with chocolate chips and a dusting of powdered sugar. The premium mix is 2 classic and 2 topped: celebration (vanilla buttercream and sprinkles), party (chocolate buttercream and candy-coated chocolate chips), or s'mores (toasted mini marshmallows and graham cracker).",
        prices: [['4-ct classic', '$7.00'], ['4-ct classic + premium', '$8.00']],
      },
      {
        name: 'Spiced Pumpkin Mini Bundt Cakes',
        seasonal: true,
        desc: 'Light, airy pumpkin angel food cake with seasonal spices in every bite.',
        prices: [['Single', '$4.00'], ['4-ct', '$13.00']],
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
