import {
  aglaonema,
  agave,
  cactus,
  desk1,
  desk2,
  hero,
  plantain,
  sansevieria,
  swiss,
  avatarCarol,
  avatarLula,
  avatarRonnie,
  avatarShelly,
} from "./assets/images";
export const HERO_BG = '/src/assets/images/hero_bg_1782552386673.jpg';

export const TRENDY_PLANTS = [
  {
    id: 'trendy-1',
    title: 'For Your Desks Decorations',
    text: 'I recently added a beautiful desk decoration plant to my workspace, and it has made such a positive difference!',
    price: 'Rs. 599/-',
    image: desk1,
  },
  {
    id: 'trendy-2',
    title: 'For Your Desks Decorations',
    text: 'The greenery adds a touch of nature and serenity to my desk, making it feel more inviting and calming',
    price: 'Rs. 399/-',
    image: desk2,
  }
];

export const TOP_SELLING_PLANTS = [
  {
    id: 'top-1',
    name: 'Aglaonema plant',
    description: 'The Aglaonema plant, commonly known as Chinese Evergreen known for its attractive foliage and ease of care',
    price: 'Rs. 300/-',
    image: aglaonema,
    category: 'Indoor'
  },
  {
    id: 'top-2',
    name: 'Plantain Lilies',
    description: 'Hostas are primarily grown for their lush, decorative leaves, which come in a wide variety of shapes, sizes,',
    price: 'Rs. 380/-',
    image: plantain,
    category: 'Lush'
  },
  {
    id: 'top-3',
    name: 'Cactus',
    description: 'It is known for their ability to thrive in arid environments',
    price: 'Rs. 259/-',
    image:cactus,
    category: 'Succulent'
  },
  {
    id: 'top-4',
    name: 'Swiss cheese Plant',
    description: 'It is a popular tropical houseplant known for its distinctive, perforated leaves',
    price: 'Rs. 400/-',
    image: swiss,
    category: 'Indoor'
  },
  {
    id: 'top-5',
    name: 'Sansevieria plant',
    description: 'It is a popular indoor plant admired for its striking appearance and low-maintenance nature.',
    price: 'Rs. 450/-',
    image:sansevieria,
    category: 'Indoor'
  },
  {
    id: 'top-6',
    name: 'Agave plant',
    description: 'The Agave plant is a genus of succulent plants known for their striking rosette of thick, fleshy leaves and architectural forms.',
    price: 'Rs. 359/-',
    image: agave,
    category: 'Succulent'
  }
];

export const REVIEWS = [
  {
    id: 'review-1',
    name: 'Shelly Russel',
    rating: 5,
    avatar: avatarShelly,
    text: 'Just got my hands on some absolutely awesome plants, and I couldn\'t be happier!'
  },
  {
    id: 'review-2',
    name: 'Lula Rolfson',
    rating: 5,
    avatar:avatarLula,
    text: 'Each one has its own unique charm and personality, and they\'ve already started brightening up my space. The vibrant colors and fresh greenery make such a huge difference in my home.'
  },
  {
    id: 'review-3',
    name: 'Carol Huels',
    rating: 5,
    avatar: avatarCarol,
    text: 'It\'s like bringing a little piece of nature indoors. Definitely worth the investment—my plant collection has never looked better!'
  }
];

export const HERO_REVIEW = {
  name: 'Ronnie Hamill',
  rating: 5,
  avatar:avatarRonnie,
  text: 'I can\'t express how thrilled I am with my new natural plants! They bring such a fresh and vibrant energy to my home.'
};

export const O2_PLANTS_SLIDES = [
  {
    id: 'o2-1',
    title: 'We Have Small And Best O2 Plants Collection\'s',
    subtext: 'Oxygen-producing plants, often referred to as "O2 plants," are those that release oxygen into the atmosphere through the process of photosynthesis.\n\nMany plants can help filter out pollutants and toxins from the air, such as formaldehyde, benzene, and trichloroethylene. This makes the air cleaner and healthier to breathe.',
    image: aglaonema,
  },
  {
    id: 'o2-2',
    title: 'Purify Your Living Room Air Today',
    subtext: 'Indoor species like Snake plants and Aglaonema are nature\'s silent purifiers. Keeping them in high-traffic spaces guarantees high oxygen output and continuous pollutant absorption.\n\nThey require minimum care but return maximum respiratory health benefits.',
    image: sansevieria,
  },
  {
    id: 'o2-3',
    title: 'Lush Foliage for Mental Serenity',
    subtext: 'Beautiful structural leaves have been proven to reduce stress, lower blood pressure, and boost workplace focus.\n\nAdding an O2 plant to your study or desk creates a serene microclimate of deep focus and fresh, natural oxygen.',
    image: plantain,
  }
];
