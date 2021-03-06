const mongoose = require("mongoose");
const Hotel = require("./models/Hotel");
const User = require("./models/User");
const keys = require("./config/keys");

const hotels = [
  {
    name: "Sunshine Suites",
    type: "Beach Resort",
    street: {
      streetName: "Esterley Tibbetts Highway",
      streetNumber: 1465,
      postalCode: "KY1-1201"
    },
    city: "Safehaven",
    country: "Cayman Islands",
    telephone: "+1-345-9493000",
    email: "info@sunshinesuites.com",
    site: "www.sunshinesuites.com",
    stars: 4,
    rooms: {
      roomNumber: 132,
      roomTypes: [
        {
          roomTypeName: "Studio Suite",
          roomTypeDescription:
            "One King bed with pillow top mattress. 265 square feet. Located on all floors. Fully equipped kitchen with full-sized refrigerator, two-burner stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair. 27-inch television with U.S. cable channels. Free wireless internet access. Bathroom with shower and tub. Ceiling fan and louvered windows in addition to air conditioning.",
          roomImage:
            "https://sunshinesuites.com/wp-content/uploads/sunshine-suites-room-king-600x399.jpg",
          bedType: "Double",
          price: 150,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: false
          }
        },
        {
          roomTypeName: "Deluxe Suite",
          roomTypeDescription:
            "Two queen beds with pillow top mattresses. 345 square feet. Located on all floors. Fully equipped kitchen with full-sized refrigerator, two-burner stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair. 27-inch television with U.S. cable channels. Free wireless internet access. Bathroom with shower and tub. Ceiling fan and louvered windows in addition to air conditioning.",
          roomImage:
            "https://sunshinesuites.com/wp-content/uploads/sunshine-suites-room-double-600x399.jpg",
          bedType: "Double",
          price: 175,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: false
          }
        },
        {
          roomTypeName: "One Bedroom Suite",
          roomTypeDescription:
            "One king bed with pillow top mattress in bedroom area, and a single sleeper sofa bed in living room area. Garden, pool, or courtyard view. 394 square feet. Fully equipped kitchen with full-sized refrigerator, stove top, microwave, toaster, coffeemaker, and cookware. Two-seater dining table. Reading chair and coffee table. Two TVs (one in bedroom) television with U.S. cable channels. Free wireless internet. Bathroom with shower and tub. Ceiling fan & AC.",
          roomImage:
            "https://sunshinesuites.com/wp-content/uploads/sunshine-suites-room-suite-600x399.jpg",
          bedType: "Single",
          price: 200,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: false
          }
        }
      ]
    },
    bars: true,
    restaurants: true,
    firstImage:
      "https://sunshinesuites.com/wp-content/uploads/sunshine-suites-resort-pool.jpg",
    secondImage:
      "https://sunshinesuites.com/wp-content/uploads/sunshine-suites-grounds.jpg",
    thirdImage:
      "https://sunshinesuites.com/wp-content/uploads/Sunshine-Luxury-Cabanas.jpg"
  },
  {
    name: "Batty Langley's",
    type: "Hotel",
    street: {
      streetName: "Folgate Street",
      streetNumber: 12,
      postalCode: "E1 6BX"
    },
    city: "London",
    country: "England",
    telephone: "+44-20-73774390",
    email: "reservations@battylangleys.co.uk",
    site: "www.battylangleys.com",
    stars: 5,
    rooms: {
      roomNumber: 29,
      roomTypes: [
        {
          roomTypeName: "Club Double",
          roomTypeDescription:
            "In your Club Double room you'll find a 17th Century carved oak bed or a Georgian four poster. Windows are hung with heavy silk curtains or wooden shutters. The bathroom has restored Vintage plumbing fixtures and fittings, with either a cast iron roll-top bath or a period style shower. All rooms are air-conditioned and have complimentary Wi-Fi, flat screen television, mini bar, safe and REN toiletries.",
          roomImage:
            "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_Batty%20Langleys-Club%20Double-JohnDoyle1-1920x1045Cropped%2043335841.jpg",
          bedType: "Double",
          price: 700,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: true
          }
        },
        {
          roomTypeName: "Superior Double",
          roomTypeDescription:
            "The beds are either 17th Century carved oak or Georgian four posters. We take bathrooms seriously. Ours have restored period fittings, many with cast iron roll-top baths, restored Vintage showers and high level cisterns. All rooms are air-conditioned and have complimentary Wi-Fi, flat screen television, mini bar, safe and REN toiletries.",
          roomImage:
            "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_Superior-Double-Bed.jpg",
          bedType: "Double",
          price: 800,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: true
          }
        },
        {
          roomTypeName: "Luxury Double",
          roomTypeDescription:
            "The beds here are either 17th Century carved oak or Georgian four posters. The bathrooms have restored period fittings, many with cast iron roll-top baths, Vintage showers and high level cisterns. All rooms are air-conditioned and have complimentary Wi-Fi, flat screen television, mini bar, safe and REN toiletries.",
          roomImage:
            "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_Luxury-Double-Bathroom-door.jpg",
          bedType: "Double",
          price: 900,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: true
          }
        },
        {
          roomTypeName: "Deluxe Terrace",
          roomTypeDescription:
            "Batty Langley's private chamber in the hotel is very much to his taste, complete with four-poster bed, walk-in shower, roll-top bath and a stylish terrace with lots of room to entertain. The concealed flat screen TV with Apple and media hub technology are details he may well have overlooked… As with all our rooms, air conditioning, WiFi, personal safe, stylish well-stocked mini bar and luxurious REN toiletries are of course all there for you to enjoy.",
          roomImage:
            "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_Suite-Batty-Langley.jpg",
          bedType: "Double",
          price: 1000,
          services: {
            wifi: true,
            bathtub: true,
            ac: true,
            bar: true,
            tv: true,
            safe: true
          }
        },
        {
          roomTypeName: "The Box Room",
          roomTypeDescription:
            "The bed is a super-sumptuous French Regence showpiece. The shower and loo are tucked away in elegant, mahogany-panelled alcoves, while the vanity unit looks just like an 18th century china cupboard. There's a delightful view from the south-facing window, and even a compact desk with every conceivable tech connection to the world outside. With air-conditioning, complimentary Wi-Fi, flat screen television and REN toiletries.",
          roomImage:
            "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_Box%20room%20bed.jpg",
          bedType: "Single",
          price: 500,
          services: {
            wifi: true,
            bathtub: false,
            ac: true,
            bar: false,
            tv: true,
            safe: false
          }
        }
      ]
    },
    bars: true,
    restaurants: false,
    firstImage:
      "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_The-Library.jpg",
    secondImage:
      "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_The-Tapestry-Room.jpg",
    thirdImage:
      "https://www.hazlittshotel.com/cdn/hazlitt/website/content/images/1920x1045_the-tapesty-room-window.jpg"
  }
];

const users = [
  {
    email: "john@sunshinesuites.com",
    password: "john",
    firstName: "John",
    lastName: "Doe",
    picture: "",
    role: "manager",
    hotel: "Sunshine Suites"
  },
  {
    email: "jane@sunshinesuites.com",
    password: "jane",
    firstName: "Jane",
    lastName: "Doe",
    picture: "",
    role: "receptionist",
    hotel: "Sunshine Suites"
  },
  {
    email: "jane@battylangleys.co.uk",
    password: "jane",
    firstName: "Jane",
    lastName: "Doe",
    picture: "",
    role: "manager",
    hotel: "Batty Langley's"
  },
  {
    email: "john@battylangleys.co.uk",
    password: "john",
    firstName: "John",
    lastName: "Doe",
    picture: "",
    role: "receptionist",
    hotel: "Batty Langley's"
  }
];

mongoose.connect(keys.mongoURI);

hotels.map(data => {
  const hotel = new Hotel(data);
  hotel.save();
});

users.map(data => {
  const user = new User(data);
  user.save();
});
