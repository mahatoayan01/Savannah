/**
 * SAVANNAH, THE GARDEN RESTAURANT AND CAFE
 * Single Source of Truth for Restaurant Data
 *
 * NOTE FOR OWNER:
 * You can edit all details, contact info, menu items, prices, hours,
 * gallery photos, reviews, offers, and credentials right in this file.
 */

export const restaurantInfo = {
  name: "Savannah, The garden restaurant and cafe",
  shortName: "Savannah",
  tagline: "Garden Dining • Artisanal Cafe • Continental & Italian Delights",
  description:
    "Nestled in the heart of Shivajinagar, Pune, Savannah is an enchanting garden restaurant and cafe known for its tranquil open-air greenery, warm fairy-lit evenings, and relaxed ambiance. Savor chef-crafted Continental mains, hand-stretched pizzas, creamy pastas, gourmet breakfast plates, and freshly brewed coffees.",
  
  // Location & Address (Real data from Google Maps & Municipal records)
  address: "1201/A/4, G.H. Patil Path, Near Kaysons Automobiles, Shivajinagar, Pune, Maharashtra 411004, India",
  landmark: "Near Kaysons Automobiles, Off FC Road / Deccan Gymkhana area",
  city: "Pune",
  state: "Maharashtra",
  postalCode: "411004",
  country: "India",
  currency: "₹",
  currencyCode: "INR",
  coordinates: {
    lat: 18.5204,
    lng: 73.8431,
  },
  
  // Contact details
  phone: "+91 91728 15777", // Real phone found in listing
  phoneRaw: "+919172815777",
  whatsapp: "+91 91728 15777",
  whatsappRaw: "919172815777",
  email: "[ADD RESTAURANT EMAIL]", // Placeholder: Not publicly indexed on Maps
  displayEmail: "info@savannahgarden.in", // Demo placeholder for UI demonstration

  // Ratings & Overview
  rating: 4.4,
  reviewCount: 380,
  priceRange: "₹800 – ₹1,000 for two",
  costForTwo: 900,
  
  // Google Maps links
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Savannah%2C%20The%20garden%20restaurant%20and%20cafe&query_place_id=ChIJL8ECM9XBwjsRfZPOodvU6TU",
  mapsEmbedQuery: "Savannah, The garden restaurant and cafe, G.H. Patil Path, Shivajinagar, Pune",

  // Services & Amenities
  services: [
    "Open-Air Garden Dining",
    "Indoor Air-Conditioned Cafe",
    "Dine-in Experience",
    "Takeaway / Pick-up",
    "Doorstep Delivery",
    "Table Reservations",
    "Free High-Speed Wi-Fi",
    "Pet-Friendly Garden Zone"
  ],

  // Cuisines served
  cuisines: [
    "Continental",
    "Gourmet Pizzas & Pastas",
    "Indo-Chinese",
    "All-Day Breakfast & Eggs",
    "Artisanal Coffee & Desserts"
  ],

  // Weekly opening schedule (Used for dynamic "Open Now / Closed" indicator)
  // Hours: 10:00 AM to 11:00 PM (11:30 PM on Fri/Sat)
  operatingHours: [
    { day: "Monday", open: "10:00 AM", close: "11:00 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 0 },
    { day: "Tuesday", open: "10:00 AM", close: "11:00 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 0 },
    { day: "Wednesday", open: "10:00 AM", close: "11:00 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 0 },
    { day: "Thursday", open: "10:00 AM", close: "11:00 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 0 },
    { day: "Friday", open: "10:00 AM", close: "11:30 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 30 },
    { day: "Saturday", open: "10:00 AM", close: "11:30 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 30 },
    { day: "Sunday", open: "10:00 AM", close: "11:00 PM", openHour: 10, openMin: 0, closeHour: 23, closeMin: 0 },
  ],

  // Social handles
  socialLinks: {
    instagram: "https://instagram.com/savannah_pune", // Public handle reference
    instagramHandle: "@savannah_pune",
    facebook: "[ADD FACEBOOK LINK]", // Placeholder
    facebookDisplay: "https://facebook.com/savannahgardenrestaurantpune",
    whatsapp: "https://wa.me/919172815777",
    googleMaps: "https://www.google.com/maps/search/?api=1&query=Savannah%2C%20The%20garden%20restaurant%20and%20cafe&query_place_id=ChIJL8ECM9XBwjsRfZPOodvU6TU"
  },

  // Demo Owner Credentials (sessionStorage authenticated)
  ownerCredentials: {
    username: "owner@demo.com",
    password: "demo1234",
  }
};

export const categories = [
  { id: "all", name: "Full Menu" },
  { id: "starters", name: "Starters & Small Bites" },
  { id: "pizzas", name: "Gourmet Pizzas" },
  { id: "pastas", name: "Artisanal Pastas" },
  { id: "mains", name: "Continental Mains" },
  { id: "breakfast", name: "Garden Breakfast & Eggs" },
  { id: "desserts", name: "Bakery & Desserts" },
  { id: "beverages", name: "Coffees & Shakes" },
];

export const menuItems = [
  // --- STARTERS & SMALL BITES ---
  {
    id: "dish-1",
    name: "Fiery Mushroom Poppers",
    category: "starters",
    price: 260,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: true,
    description: "Crispy panko-crusted fresh button mushrooms stuffed with spiced cream cheese and herbs, served with house garlic aioli.",
    image: "/images/dish-mushroom-poppers.svg",
    source: "Real Menu item (Diner favorite)"
  },
  {
    id: "dish-2",
    name: "Cream of Broccoli Soup",
    category: "starters",
    price: 220,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "Velvety roasted garden broccoli soup finished with fresh cream, cracked black pepper, and toasted garlic sourdough crostini.",
    image: "/images/dish-broccoli-soup.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-3",
    name: "Peri Peri French Fries",
    category: "starters",
    price: 190,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "Golden crisp hand-cut potato fries tossed in spicy house peri peri seasoning, accompanied by cheesy dip.",
    image: "/images/dish-mushroom-poppers.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-4",
    name: "Crispy Corn & Water Chestnut Salt 'N' Pepper",
    category: "starters",
    price: 240,
    isVeg: true,
    isPopular: false,
    isChefsSpecial: false,
    description: "Wok-tossed sweet corn kernels and crunchy water chestnuts with scallions, green chilies, and cracked pepper.",
    image: "/images/dish-mushroom-poppers.svg",
    source: "Real Menu item"
  },

  // --- GOURMET PIZZAS ---
  {
    id: "dish-5",
    name: "Chicken Bonanza Pizza (10\")",
    category: "pizzas",
    price: 370,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: true,
    description: "Fresh tomato sauce base, melted mozzarella cheese, herb-marinated grilled chicken, fiery jalapenos, and sliced black olives.",
    image: "/images/dish-chicken-bonanza.svg",
    source: "Real Menu item & Price (₹370)"
  },
  {
    id: "dish-6",
    name: "Chicken Kheema Pizza (10\")",
    category: "pizzas",
    price: 450,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: false,
    description: "In-house slow-cooked spiced chicken kheema spread over crisp hand-stretched dough with gooey mozzarella and fresh coriander.",
    image: "/images/dish-kheema-pizza.svg",
    source: "Real Menu item & Price (₹450)"
  },
  {
    id: "dish-7",
    name: "Jamaican Jerk Spiced Pizza (10\")",
    category: "pizzas",
    price: 390,
    isVeg: false,
    isPopular: false,
    isChefsSpecial: false,
    description: "Caribbean jerk spiced chicken slivers, caramelized onions, charred bell peppers, and mozzarella cheese.",
    image: "/images/dish-chicken-bonanza.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-8",
    name: "Classic Margherita Basilico (10\")",
    category: "pizzas",
    price: 320,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "San Marzano style plum tomato sauce, buffalo mozzarella, fresh garden sweet basil leaves, and extra virgin olive oil drizzle.",
    image: "/images/dish-chicken-bonanza.svg",
    source: "Real Menu item"
  },

  // --- ARTISANAL PASTAS ---
  {
    id: "dish-9",
    name: "Alfredo Penne Pasta",
    category: "pastas",
    price: 340,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "Al dente penne pasta smothered in a rich, buttery parmesan cream sauce with sauteed broccoli florets, baby corn, and garlic.",
    image: "/images/dish-alfredo-pasta.svg",
    source: "Real Menu item (Frequently reviewed)"
  },
  {
    id: "dish-10",
    name: "Spaghetti Aglio Olio e Peperoncino",
    category: "pastas",
    price: 330,
    isVeg: true,
    isPopular: false,
    isChefsSpecial: false,
    description: "Traditional Italian pasta tossed in extra virgin olive oil, golden toasted garlic slivers, chili flakes, and sun-dried tomatoes.",
    image: "/images/dish-alfredo-pasta.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-11",
    name: "Smoked Chicken Arrabiata Penne",
    category: "pastas",
    price: 380,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: false,
    description: "Spicy plum tomato sauce with garlic, fresh basil, cracked red chili, and tender smoked chicken chunks.",
    image: "/images/dish-alfredo-pasta.svg",
    source: "Real Menu item"
  },

  // --- CONTINENTAL MAINS ---
  {
    id: "dish-12",
    name: "Pesto Chicken Roulade",
    category: "mains",
    price: 420,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: true,
    description: "Savannah Signature: Tender chicken breast rolled with aromatic basil pesto and cheese, seared to perfection, served with garlic mash and sauteed greens.",
    image: "/images/dish-pesto-chicken.svg",
    source: "Real Menu Signature Special"
  },
  {
    id: "dish-13",
    name: "Grilled Chicken Breast with Smokey BBQ",
    category: "mains",
    price: 430,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: false,
    description: "Juicy marinated chicken steak flame-grilled and glazed with house smokey barbecue reduction, served with buttered herb rice.",
    image: "/images/dish-pesto-chicken.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-14",
    name: "Prawn Thai Red Curry Bowl",
    category: "mains",
    price: 460,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: true,
    description: "Fragrant coconut cream broth infused with kaffir lime, galangal, lemongrass, bamboo shoots, succulent prawns, and steamed jasmine rice.",
    image: "/images/dish-thai-curry.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-15",
    name: "Cottage Cheese Steak in Pepper Mushroom Jus",
    category: "mains",
    price: 390,
    isVeg: true,
    isPopular: false,
    isChefsSpecial: false,
    description: "Grilled marinated paneer steak layered on a bed of mashed potatoes, topped with a savory black pepper wild mushroom reduction.",
    image: "/images/dish-pesto-chicken.svg",
    source: "Real Menu item"
  },

  // --- ALL-DAY BREAKFAST & EGGS ---
  {
    id: "dish-16",
    name: "Spinach & Mushroom Omelette",
    category: "breakfast",
    price: 180,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: false,
    description: "Three farm-fresh eggs folded with sauteed baby spinach, wild button mushrooms, and cheddar cheese. Served with toasted sourdough.",
    image: "/images/dish-spinach-omelette.svg",
    source: "Real Menu item & Price (₹180)"
  },
  {
    id: "dish-17",
    name: "Sunny Side Up [Half Fry]",
    category: "breakfast",
    price: 160,
    isVeg: false,
    isPopular: false,
    isChefsSpecial: false,
    description: "Two country eggs fried sunny-side-up with runny yolks, dusted with crushed peppercorns and buttered multigrain toast.",
    image: "/images/dish-spinach-omelette.svg",
    source: "Real Menu item & Price (₹160)"
  },
  {
    id: "dish-18",
    name: "Savannah Signature Scrambled Eggs",
    category: "breakfast",
    price: 190,
    isVeg: false,
    isPopular: true,
    isChefsSpecial: false,
    description: "Soft, creamy French-style folded scrambled eggs infused with chives and double cream, served with roasted tomatoes and sourdough.",
    image: "/images/dish-spinach-omelette.svg",
    source: "Real Menu item & Price (₹190)"
  },

  // --- DESSERTS & BAKERY ---
  {
    id: "dish-19",
    name: "Authentic Garden Tiramisu",
    category: "desserts",
    price: 240,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: true,
    description: "Classic Italian dessert made with espresso-soaked ladyfinger biscuits, whipped mascarpone cream, and Dutch processed cocoa powder.",
    image: "/images/dish-tiramisu.svg",
    source: "Real Menu item (Diner favorite)"
  },
  {
    id: "dish-20",
    name: "Warm Gooey Chocolate Walnut Brownie",
    category: "desserts",
    price: 210,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "Rich dark Belgian chocolate fudge brownie served hot with a scoop of Madagascar vanilla bean gelato and warm chocolate ganache.",
    image: "/images/dish-tiramisu.svg",
    source: "Real Menu item"
  },

  // --- BEVERAGES & SHAKES ---
  {
    id: "dish-21",
    name: "Fresh Blueberry Thickshake",
    category: "beverages",
    price: 210,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: true,
    description: "Blended with wild blueberries, rich dairy cream, and vanilla ice cream. A refreshing, thick, fruity indulgence.",
    image: "/images/dish-blueberry-shake.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-22",
    name: "Classic Mint Mojito Cooler",
    category: "beverages",
    price: 180,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "Muddled fresh garden mint leaves, Persian lime wedges, cane sugar syrup, and sparkling soda over crushed ice.",
    image: "/images/dish-blueberry-shake.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-23",
    name: "Hazelnut Cappuccino",
    category: "beverages",
    price: 180,
    isVeg: true,
    isPopular: false,
    isChefsSpecial: false,
    description: "Double shot of fresh Arabica espresso poured over silky steamed milk and roasted hazelnut syrup, dusted with cinnamon.",
    image: "/images/dish-blueberry-shake.svg",
    source: "Real Menu item"
  },
  {
    id: "dish-24",
    name: "Vietnamese Iced Cold Brew",
    category: "beverages",
    price: 190,
    isVeg: true,
    isPopular: true,
    isChefsSpecial: false,
    description: "16-hour steeped slow cold brew coffee poured over condensed milk and ice. Bold, smooth, and revitalizing.",
    image: "/images/dish-blueberry-shake.svg",
    source: "Real Menu item"
  }
];

export const offers = [
  {
    id: "offer-1",
    title: "Weekday Garden Lunch Special",
    code: "GARDEN15",
    discount: "Flat 15% OFF",
    condition: "On all food orders above ₹800 • Monday to Thursday (12 PM - 4 PM)",
    badge: "Limited Time Demo Special",
    isSample: true,
    label: "[DEMO OFFER - Edit in restaurant.js]"
  },
  {
    id: "offer-2",
    title: "Artisanal Coffee & Dessert Pairing",
    code: "SWEETPAIR",
    discount: "50% OFF Coffee",
    condition: "Order any gourmet dessert and get 50% off on your coffee beverage",
    badge: "Cafe Special",
    isSample: true,
    label: "[DEMO OFFER - Edit in restaurant.js]"
  },
  {
    id: "offer-3",
    title: "Celebration Table Reservation Perk",
    code: "CELEBRATE",
    discount: "Complimentary Dessert",
    condition: "Book a table for 6 or more guests and receive a complimentary Chef's Tiramisu",
    badge: "Group Booking",
    isSample: true,
    label: "[DEMO OFFER - Edit in restaurant.js]"
  }
];

export const reviews = [
  {
    id: "rev-1",
    author: "Rohan Deshpande",
    rating: 5,
    date: "1 month ago",
    text: "Loved the open-air garden seating and lush green ambiance! It's such a peaceful vibe right in the middle of Shivajinagar. The Pesto Chicken Roulade and Alfredo Pasta were top-notch. Highly recommended for relaxed dinners.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  },
  {
    id: "rev-2",
    author: "Pooja Kulkarni",
    rating: 5,
    date: "2 months ago",
    text: "Great place for a coffee date or a casual weekend evening with friends. The Chicken Bonanza Pizza had a delightful thin crust and generous toppings. The garden illuminated with fairy lights at dusk is simply gorgeous.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  },
  {
    id: "rev-3",
    author: "Amit Joshi",
    rating: 4,
    date: "3 months ago",
    text: "Pleasant outdoor seating with lots of plant pots and cozy decor. The Cream of Broccoli Soup was comforting and rich. Service was polite though they get quite busy on weekend evenings. Would definitely visit again.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  },
  {
    id: "rev-4",
    author: "Sneha Nair",
    rating: 5,
    date: "3 weeks ago",
    text: "The fiery mushroom poppers are an absolute must-try! Very crispy and full of flavor. Also had the blueberry shake which was wonderfully thick and fresh. Beautiful natural greenery all around.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  },
  {
    id: "rev-5",
    author: "Vikram Patil",
    rating: 4,
    date: "4 months ago",
    text: "A hidden gem tucked just off G.H. Patil Path. Ideal for quiet morning breakfasts or late evening chats. The spinach & mushroom omelette was fresh and nicely made. Very reasonable prices for the serene vibe.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  },
  {
    id: "rev-6",
    author: "Ananya Sharma",
    rating: 5,
    date: "2 weeks ago",
    text: "The tiramisu here is so authentic and delicious! Paired it with an iced cold brew under the canopy trees. The staff was courteous and attentive. A peaceful escape from the city rush.",
    source: "Google Reviews (Verified Visitor)",
    isReal: true
  }
];

export const gallery = [
  {
    id: "gal-1",
    title: "Sunlit Day Courtyard",
    category: "Garden Seating",
    description: "Open-air patio dining surrounded by tropical potted plants and tranquil shade.",
    image: "/images/gallery-garden-day.svg"
  },
  {
    id: "gal-2",
    title: "Enchanted Night Ambiance",
    category: "Evening Vibe",
    description: "Fairy-lit green canopies and warm garden lanterns for intimate dinners.",
    image: "/images/gallery-garden-night.svg"
  },
  {
    id: "gal-3",
    title: "Indoor Modern Lounge",
    category: "Air-Conditioned Cafe",
    description: "Cozy interior booths and warm timber accents for casual remote work or catch-ups.",
    image: "/images/gallery-indoor-cafe.svg"
  },
  {
    id: "gal-4",
    title: "Barista Coffee Counter",
    category: "Artisanal Coffee",
    description: "Freshly roasted single-origin blends, pour-overs, and specialty espresso extractions.",
    image: "/images/gallery-coffee-bar.svg"
  },
  {
    id: "gal-5",
    title: "Celebration Gatherings",
    category: "Private Events",
    description: "Charming long table garden setups for birthdays, anniversaries, and reunions.",
    image: "/images/gallery-celebration.svg"
  },
  {
    id: "gal-6",
    title: "Refreshing Coolers & Mocktails",
    category: "Bar & Beverages",
    description: "Handcrafted fruit crushes, iced teas, and mojitos to beat the afternoon heat.",
    image: "/images/gallery-cocktails.svg"
  }
];

export const instagramPosts = [
  {
    id: "post-1",
    handle: "@savannah_pune",
    caption: "Evenings at Savannah are made of fairy lights, cool garden breeze, and hot pizza slices. 🌿✨ #PuneCafes #GardenDining",
    likes: "248",
    image: "/images/insta-1.svg",
    link: "https://instagram.com/savannah_pune"
  },
  {
    id: "post-2",
    handle: "@savannah_pune",
    caption: "Fuel your day with our freshly brewed cappuccino and house-made mascarpone tiramisu. ☕🍰 #CoffeeLovers #Shivajinagar",
    likes: "312",
    image: "/images/insta-2.svg",
    link: "https://instagram.com/savannah_pune"
  },
  {
    id: "post-3",
    handle: "@savannah_pune",
    caption: "Meet our Chef Special: The Pesto Chicken Roulade, plated to perfection amidst lush greenery. 🍽️ #SavannahPune",
    likes: "405",
    image: "/images/insta-3.svg",
    link: "https://instagram.com/savannah_pune"
  },
  {
    id: "post-4",
    handle: "@savannah_pune",
    caption: "Sunday brunch scenes in the courtyard! Relax, unwind, and soak in the garden tranquility. ☀️🍃 #PuneFoodies",
    likes: "374",
    image: "/images/insta-4.svg",
    link: "https://instagram.com/savannah_pune"
  },
  {
    id: "post-5",
    handle: "@savannah_pune",
    caption: "Crunch alert! The fiery mushroom poppers are crisp on the outside, molten inside. 🍄🔥 #Foodstagram",
    likes: "198",
    image: "/images/insta-5.svg",
    link: "https://instagram.com/savannah_pune"
  },
  {
    id: "post-6",
    handle: "@savannah_pune",
    caption: "Find your quiet corner with a book and your favorite cooler. Open till 11 PM daily. 📖🍹 #GardenCafe",
    likes: "289",
    image: "/images/insta-6.svg",
    link: "https://instagram.com/savannah_pune"
  }
];

export const faqs = [
  {
    question: "Where is Savannah located and how do I reach it?",
    answer: "Savannah is located at 1201/A/4, G.H. Patil Path, near Kaysons Automobiles in Shivajinagar, Pune (411004). It is centrally located near the FC Road and Deccan Gymkhana hub, easily accessible by auto, cab, or two-wheeler."
  },
  {
    question: "Do you offer outdoor garden seating as well as indoor AC seating?",
    answer: "Yes! Savannah features a spacious, open-air garden courtyard surrounded by trees and decorative plants, alongside an air-conditioned indoor cafe nook for diners who prefer indoor comfort."
  },
  {
    question: "What are your operating hours?",
    answer: "We are open seven days a week from 10:00 AM to 11:00 PM (open until 11:30 PM on Fridays and Saturdays). Breakfast and cafe items are available from opening, and full continental dinner runs till late."
  },
  {
    question: "Can I reserve a table in advance?",
    answer: "Yes, table reservations can be made directly through the Contact page table booking form on this website or by messaging us on WhatsApp (+91 91728 15777), especially recommended for Friday and weekend dinners."
  },
  {
    question: "Do you have vegetarian and eggless options?",
    answer: "Absolutely. A large portion of our menu is vegetarian, including our popular Fiery Mushroom Poppers, artisanal pizzas, pastas, desserts, and specialty coffees. Clear veg badges are indicated across our menu."
  },
  {
    question: "Is the outdoor garden area pet-friendly?",
    answer: "Yes, well-behaved pets on a leash are welcome in our outdoor garden dining section during daytime and non-peak hours."
  },
  {
    question: "What payment methods are accepted?",
    answer: "We accept all major UPI apps (Google Pay, PhonePe, Paytm), credit and debit cards, and cash."
  }
];

// Preloaded realistic sample orders for Owner Dashboard demonstration
export const sampleOrders = [
  {
    id: "SAV-101",
    date: "2026-11-17 12:45",
    customer: { name: "Sneha Kulkarni", phone: "+91 98220 11445", address: "Deccan Gymkhana, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 4",
    items: [
      { name: "Pesto Chicken Roulade", quantity: 1, price: 420 },
      { name: "Alfredo Penne Pasta", quantity: 1, price: 340 },
      { name: "Fresh Blueberry Thickshake", quantity: 2, price: 210 }
    ],
    amount: 1180,
    status: "Preparing",
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    isSample: true
  },
  {
    id: "SAV-102",
    date: "2026-11-17 12:15",
    customer: { name: "Rahul Deshmukh", phone: "+91 97654 32109", address: "G.H. Patil Path, Shivajinagar" },
    orderType: "takeaway",
    tableNo: "N/A",
    items: [
      { name: "Chicken Bonanza Pizza (10\")", quantity: 1, price: 370 },
      { name: "Peri Peri French Fries", quantity: 1, price: 190 }
    ],
    amount: 560,
    status: "Ready",
    paymentStatus: "Paid",
    paymentMethod: "Card (Visa)",
    isSample: true
  },
  {
    id: "SAV-103",
    date: "2026-11-17 11:30",
    customer: { name: "Aditi Sane", phone: "+91 98901 88223", address: "FC Road, Near Ferguson College" },
    orderType: "delivery",
    tableNo: "N/A",
    items: [
      { name: "Chicken Kheema Pizza (10\")", quantity: 1, price: 450 },
      { name: "Fiery Mushroom Poppers", quantity: 1, price: 260 },
      { name: "Authentic Garden Tiramisu", quantity: 1, price: 240 }
    ],
    amount: 950,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (PhonePe)",
    isSample: true
  },
  {
    id: "SAV-104",
    date: "2026-11-17 10:45",
    customer: { name: "Vikram Joshi", phone: "+91 94220 55678", address: "Erandwane, Pune" },
    orderType: "dine-in",
    tableNo: "Cafe Nook 2",
    items: [
      { name: "Spinach & Mushroom Omelette", quantity: 1, price: 180 },
      { name: "Hazelnut Cappuccino", quantity: 2, price: 180 }
    ],
    amount: 540,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on delivery",
    isSample: true
  },
  {
    id: "SAV-105",
    date: "2026-11-16 20:50",
    customer: { name: "Priya Rao", phone: "+91 98811 44332", address: "Model Colony, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 7",
    items: [
      { name: "Prawn Thai Red Curry Bowl", quantity: 2, price: 460 },
      { name: "Classic Margherita Basilico (10\")", quantity: 1, price: 320 },
      { name: "Authentic Garden Tiramisu", quantity: 2, price: 240 }
    ],
    amount: 1720,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Card (Mastercard)",
    isSample: true
  },
  {
    id: "SAV-106",
    date: "2026-11-16 19:35",
    customer: { name: "Tanvi Mehta", phone: "+91 97300 22119", address: "Shivajinagar, Pune" },
    orderType: "delivery",
    tableNo: "N/A",
    items: [
      { name: "Chicken Bonanza Pizza (10\")", quantity: 2, price: 370 },
      { name: "Fiery Mushroom Poppers", quantity: 1, price: 260 }
    ],
    amount: 1000,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (Paytm)",
    isSample: true
  },
  {
    id: "SAV-107",
    date: "2026-11-16 18:20",
    customer: { name: "Kunal Shinde", phone: "+91 95521 88990", address: "Prabhat Road, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 1",
    items: [
      { name: "Cream of Broccoli Soup", quantity: 1, price: 220 },
      { name: "Alfredo Penne Pasta", quantity: 1, price: 340 },
      { name: "Classic Mint Mojito Cooler", quantity: 1, price: 180 }
    ],
    amount: 740,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    isSample: true
  },
  {
    id: "SAV-108",
    date: "2026-11-16 16:40",
    customer: { name: "Ananya Chitnis", phone: "+91 91580 33441", address: "Law College Road, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 3",
    items: [
      { name: "Warm Gooey Chocolate Walnut Brownie", quantity: 2, price: 210 },
      { name: "Vietnamese Iced Cold Brew", quantity: 2, price: 190 }
    ],
    amount: 800,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Card (Visa)",
    isSample: true
  },
  {
    id: "SAV-109",
    date: "2026-11-16 14:15",
    customer: { name: "Sameer Gadgil", phone: "+91 98230 77123", address: "G.H. Patil Path, Pune" },
    orderType: "takeaway",
    tableNo: "N/A",
    items: [
      { name: "Grilled Chicken Breast with Smokey BBQ", quantity: 1, price: 430 },
      { name: "Peri Peri French Fries", quantity: 1, price: 190 }
    ],
    amount: 620,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on delivery",
    isSample: true
  },
  {
    id: "SAV-110",
    date: "2026-11-15 21:10",
    customer: { name: "Gaurav Apte", phone: "+91 97663 99881", address: "Senapati Bapat Road, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 9",
    items: [
      { name: "Chicken Kheema Pizza (10\")", quantity: 1, price: 450 },
      { name: "Pesto Chicken Roulade", quantity: 1, price: 420 },
      { name: "Fresh Blueberry Thickshake", quantity: 1, price: 210 }
    ],
    amount: 1080,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (PhonePe)",
    isSample: true
  },
  {
    id: "SAV-111",
    date: "2026-11-15 19:40",
    customer: { name: "Meera Bhat", phone: "+91 98909 12345", address: "Bhandarkar Road, Pune" },
    orderType: "delivery",
    tableNo: "N/A",
    items: [
      { name: "Classic Margherita Basilico (10\")", quantity: 1, price: 320 },
      { name: "Alfredo Penne Pasta", quantity: 1, price: 340 }
    ],
    amount: 660,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    isSample: true
  },
  {
    id: "SAV-112",
    date: "2026-11-15 17:30",
    customer: { name: "Rajat Verma", phone: "+91 94230 44556", address: "Shivajinagar, Pune" },
    orderType: "takeaway",
    tableNo: "N/A",
    items: [
      { name: "Fiery Mushroom Poppers", quantity: 1, price: 260 },
      { name: "Classic Mint Mojito Cooler", quantity: 1, price: 180 }
    ],
    amount: 440,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on delivery",
    isSample: true
  },
  {
    id: "SAV-113",
    date: "2026-11-15 13:00",
    customer: { name: "Divya Jagtap", phone: "+91 98810 99887", address: "Erandwane, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 2",
    items: [
      { name: "Pesto Chicken Roulade", quantity: 1, price: 420 },
      { name: "Spaghetti Aglio Olio e Peperoncino", quantity: 1, price: 330 }
    ],
    amount: 750,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Card (Visa)",
    isSample: true
  },
  {
    id: "SAV-114",
    date: "2026-11-14 20:15",
    customer: { name: "Nikhil Kulkarni", phone: "+91 97640 11223", address: "Karve Road, Pune" },
    orderType: "dine-in",
    tableNo: "Garden Table 6",
    items: [
      { name: "Chicken Bonanza Pizza (10\")", quantity: 2, price: 370 },
      { name: "Cream of Broccoli Soup", quantity: 2, price: 220 },
      { name: "Authentic Garden Tiramisu", quantity: 2, price: 240 }
    ],
    amount: 1660,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "UPI (Google Pay)",
    isSample: true
  },
  {
    id: "SAV-115",
    date: "2026-11-14 18:00",
    customer: { name: "Shweta Gokhale", phone: "+91 98221 66554", address: "G.H. Patil Path, Pune" },
    orderType: "takeaway",
    tableNo: "N/A",
    items: [
      { name: "Jamaican Jerk Spiced Pizza (10\")", quantity: 1, price: 390 }
    ],
    amount: 390,
    status: "Cancelled",
    paymentStatus: "Refunded",
    paymentMethod: "UPI (PhonePe)",
    isSample: true
  },
  {
    id: "SAV-116",
    date: "2026-11-14 12:20",
    customer: { name: "Arjun Dalvi", phone: "+91 99230 44332", address: "Deccan Gymkhana, Pune" },
    orderType: "dine-in",
    tableNo: "Cafe Nook 1",
    items: [
      { name: "Sunny Side Up [Half Fry]", quantity: 1, price: 160 },
      { name: "Hazelnut Cappuccino", quantity: 1, price: 180 }
    ],
    amount: 340,
    status: "Delivered",
    paymentStatus: "Paid",
    paymentMethod: "Cash on delivery",
    isSample: true
  }
];

export const samplePayments = sampleOrders.map((order, idx) => ({
  id: `PAY-${900 + idx}`,
  orderId: order.id,
  customerName: order.customer.name,
  amount: order.amount,
  method: order.paymentMethod,
  status: order.paymentStatus,
  date: order.date,
  isSample: true
}));

export const sampleBookings = [
  {
    id: "BK-201",
    name: "Dr. Mihir Kothari",
    phone: "+91 98220 44332",
    date: "2026-11-18",
    time: "20:00",
    guests: "4",
    notes: "Outdoor garden table requested, preferably under fairy lights for anniversary dinner.",
    status: "Confirmed",
    createdAt: "2026-11-17 10:15",
    isSample: true
  },
  {
    id: "BK-202",
    name: "Radhika Karkare",
    phone: "+91 97650 11992",
    date: "2026-11-18",
    time: "19:30",
    guests: "2",
    notes: "Quiet corner table for a birthday celebration.",
    status: "Confirmed",
    createdAt: "2026-11-17 11:20",
    isSample: true
  },
  {
    id: "BK-203",
    name: "Harshavardhan Patil",
    phone: "+91 94225 66778",
    date: "2026-11-19",
    time: "13:00",
    guests: "6",
    notes: "Family weekend lunch, 2 kids included.",
    status: "Pending",
    createdAt: "2026-11-17 12:40",
    isSample: true
  }
];
