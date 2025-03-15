
export type PropertyImage = {
  url: string;
  alt: string;
};

export type Property = {
  id: string;
  title: string;
  address: string;
  neighborhood?: string;
  price: string;
  priceDropInfo?: string;
  rentalOption?: string;
  estimatedPayment: string;
  status: 'forSale' | 'forRent' | 'sold';
  beds: number;
  baths: number;
  sqft?: number;
  pricePerSqft?: string;
  built?: number;
  hoaFee?: string;
  daysOnMarket?: number;
  belowListPrice?: string;
  description: string;
  features?: string[];
  highlights?: string[];
  images: PropertyImage[];
  mainImage: string;
  position: {
    lat: number;
    lng: number;
  };
  listingAgent: {
    name: string;
    license?: string;
    company: string;
  };
  coListingAgent?: {
    name: string;
    license?: string;
    company: string;
  };
};

const propertyData: Property[] = [
  {
    id: '1',
    title: 'Renovated 2 Bedroom Condo with Golf Views',
    address: '573 Normandy L, Delray Beach, FL 33484',
    neighborhood: 'Kings Point Neighborhood',
    price: '$190,000',
    priceDropInfo: '$50K PRICE DROP',
    estimatedPayment: '$1,630/month',
    status: 'forSale',
    beds: 2,
    baths: 2,
    description: 'Renovated 2 Bedroom, 2 Bathroom Condo with Stunning Golf and Water Views in Kings Point Golf and Country Club, a 55+ Community! Welcome to your ideal seasonal getaway or retirement haven! This meticulously updated condo boasts a complete renovation from top to bottom. Features include a gorgeous kitchen with pantry, brand new appliances, and a private laundry room. The home is equipped with accordion hurricane shutters and offers an enclosed patio. Pet-friendly and with countless amenities such golf, tennis courts, pickleball, 2 clubhouses, 6 pools (including 2 indoors), a gym, library, and a 1200-seat theater, there\'s something for everyone.',
    features: [
      'Renovated Kitchen',
      'Private Laundry Room',
      'Accordion Hurricane Shutters',
      'Enclosed Patio',
      'Golf and Water Views'
    ],
    highlights: [
      'Complete Renovation',
      'Brand New Appliances',
      'Pet-Friendly',
      '55+ Community',
      'Numerous Amenities'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/0230486483-386178671/573-normandy-l-delray-beach-fl.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/0330486483-386178671/573-normandy-l-delray-beach-fl-3.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/6330486483-386178671/573-normandy-l-delray-beach-fl-5.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/0430486483-386178671/573-normandy-l-delray-beach-fl-6.jpg', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/211/9430486483-386178671/573-normandy-l-delray-beach-fl-8.jpg', alt: 'Bedroom' },
      { url: 'https://images.homes.com/listings/211/3530486483-386178671/573-normandy-l-delray-beach-fl-9.jpg', alt: 'Bathroom' },
      { url: 'https://images.homes.com/listings/211/5530486483-386178671/573-normandy-l-delray-beach-fl-10.jpg', alt: 'Second Bedroom' },
      { url: 'https://images.homes.com/listings/211/0630486483-386178671/573-normandy-l-delray-beach-fl-11.jpg', alt: 'Second Bathroom' },
      { url: 'https://images.homes.com/listings/211/3630486483-386178671/573-normandy-l-delray-beach-fl-12.jpg', alt: 'Laundry Room' },
      { url: 'https://images.homes.com/listings/211/5630486483-386178671/573-normandy-l-delray-beach-fl-13.jpg', alt: 'Enclosed Patio' },
      { url: 'https://images.homes.com/listings/211/8630486483-386178671/573-normandy-l-delray-beach-fl-14.jpg', alt: 'Exterior View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/0230486483-386178671/573-normandy-l-delray-beach-fl.jpg',
    position: {
      lat: 26.450762,
      lng: -80.124861
    },
    listingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '2',
    title: 'Charming 1 Bed Condo in 45+ Community',
    address: '4310 NW 12th Ct Unit 106, Lauderhill, FL 33313',
    price: '$150,000',
    estimatedPayment: '$1,319/month',
    status: 'forSale',
    beds: 1,
    baths: 1,
    sqft: 730,
    pricePerSqft: '$205',
    description: 'This charming 1 Bed 1 Bath Unit on the 1st floor is now available For Sale in 45+ community. It features a screened balcony, in-unit Washer and Dryer, and 1 assigned parking conveniently located right in front of your door. The property is situated in a safe, up-and-coming neighborhood in Lauderhill, just minutes from I-95, the Turnpike, grocery stores, banks, schools, and colleges. With a minimum age requirement of 45yo to purchase and shockingly low HOA fees, this is an excellent opportunity to live in a well-connected and vibrant area that can rent up to $2,000/month furnished as well. Easy to Show! Seller is Motivated! And will sell fully furnished as-is at full asking price! Contact me for Showing Now!',
    features: [
      'Screened Balcony',
      'In-unit Washer and Dryer',
      'Assigned Parking',
      'Low HOA Fees',
      '45+ Community'
    ],
    highlights: [
      'First Floor Unit',
      'Fully Furnished Option',
      'Safe Neighborhood',
      'Excellent Location',
      'Investment Potential'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/2140162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/3340162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-2.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/4440162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-3.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/3640162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-4.jpg', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/211/8740162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-5.jpg', alt: 'Bedroom' },
      { url: 'https://images.homes.com/listings/211/4840162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-6.jpg', alt: 'Bathroom' },
      { url: 'https://images.homes.com/listings/211/6940162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-7.jpg', alt: 'Screened Balcony' },
      { url: 'https://images.homes.com/listings/211/9050162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106-8.jpg', alt: 'Exterior View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/2140162324-872306491/4310-nw-12th-ct-lauderhill-fl-unit-106.jpg',
    position: {
      lat: 26.149732,
      lng: -80.206152
    },
    listingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '3',
    title: 'Spacious 2 Bed Home with Impact Windows',
    address: '4801 NW 13th Ave, Pompano Beach, FL 33064',
    neighborhood: 'Crystal Lake Neighborhood',
    price: '$440,000',
    priceDropInfo: '$45K PRICE INCREASE',
    estimatedPayment: '$3,182/month',
    status: 'forSale',
    beds: 2,
    baths: 2,
    description: 'Welcome to this spacious 2 Bed 2 Bath 1 Garage single family home with IMPACT WINDOWS, located in a highly desirable Deerfield Beach neighborhood. Nestled in a peaceful community with all ages welcome LOW HOA, this property is just minutes away from Deerfield Beach\'s pristine coastline, premier shopping centers, top-rated restaurants, school districts and convenient access to major highways, including I-95 and the Florida Turnpike. Brand New Roof in 2022! New Water Heater 2021! New Stove 2022! Nice Large Screened in Patio with no Rear Neighbors. New Accordion Shutters on All Windows Except Patio. Don\'t Miss a chance to invest in this great opportunity serving you as a new primary home, rental investment or a flip! Easy to Show! Schedule a Showing Today!',
    features: [
      'Impact Windows',
      'Single Family Home',
      'Garage',
      'Low HOA',
      'Large Screened Patio'
    ],
    highlights: [
      'Brand New Roof (2022)',
      'New Water Heater (2021)',
      'New Stove (2022)',
      'Accordion Shutters',
      'No Rear Neighbors'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/9484019224-843693291/4801-nw-13th-ave-pompano-beach-fl.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/212/3684019224-843693291/4801-nw-13th-ave-pompano-beach-fl-2.jpg?t=p', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/212/4784019224-843693291/4801-nw-13th-ave-pompano-beach-fl-4.jpg?t=p', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/212/2884019224-843693291/4801-nw-13th-ave-pompano-beach-fl-5.jpg?t=p', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/212/2984019224-843693291/4801-nw-13th-ave-pompano-beach-fl-7.jpg?t=p', alt: 'Bedroom' },
      { url: 'https://images.homes.com/listings/211/8984019224-843693291/4801-nw-13th-ave-pompano-beach-fl-8.jpg', alt: 'Bathroom' },
      { url: 'https://images.homes.com/listings/212/4094019224-843693291/4801-nw-13th-ave-pompano-beach-fl-9.jpg?t=p', alt: 'Second Bedroom' },
      { url: 'https://images.homes.com/listings/212/3194019224-843693291/4801-nw-13th-ave-pompano-beach-fl-11.jpg?t=p', alt: 'Second Bathroom' },
      { url: 'https://images.homes.com/listings/212/6194019224-843693291/4801-nw-13th-ave-pompano-beach-fl-12.jpg?t=p', alt: 'Patio' },
      { url: 'https://images.homes.com/listings/212/1294019224-843693291/4801-nw-13th-ave-pompano-beach-fl-13.jpg?t=p', alt: 'Exterior View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/9484019224-843693291/4801-nw-13th-ave-pompano-beach-fl.jpg',
    position: {
      lat: 26.288418,
      lng: -80.132714
    },
    listingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '4',
    title: 'Art Deco District 2 Bed Corner Unit',
    address: '1219 Meridian Ave Unit 4, Miami Beach, FL 33139',
    neighborhood: 'Flamingo Neighborhood',
    price: '$375,000',
    estimatedPayment: '$3,374/month',
    status: 'forSale',
    beds: 2,
    baths: 1,
    description: 'Very well priced 2bed 1bath condo corner unit available now in the heart of Miami Beach Art Deco District. Charming condo with compact & updated kitchen, rare washer and dryer in-unit, wood floors, central AC, comes unfurnished, rented on 1 year lease for $2,600/m until April 2025. Very bright condo with natural sun light in a fenced historic art deco building with secured lobby entry, surrounded by fruit trees, facing Flamingo Park tennis courts, close distance to the beach and famous Lincoln road, restaurants, shops and entertainment. Street parking available. Excellent location! Don\'t miss the opportunity to make this unit your new home! Or Perfect Investment! Fast approval. Schedule showing today on ShowingTime. Call listing agents for any questions!',
    features: [
      'Updated Kitchen',
      'In-unit Washer and Dryer',
      'Wood Floors',
      'Central AC',
      'Corner Unit'
    ],
    highlights: [
      'Art Deco District',
      'Bright with Natural Light',
      'Secured Lobby Entry',
      'Near Flamingo Park',
      'Close to Beach'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/9732946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/0832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-2.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/2832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-4.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/5832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-7.jpg', alt: 'Bedroom' },
      { url: 'https://images.homes.com/listings/211/6832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-8.jpg', alt: 'Second Bedroom' },
      { url: 'https://images.homes.com/listings/211/7832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-9.jpg', alt: 'Bathroom' },
      { url: 'https://images.homes.com/listings/211/8832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-10.jpg', alt: 'Building Exterior' },
      { url: 'https://images.homes.com/listings/211/9832946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4-11.jpg', alt: 'Neighborhood View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/9732946214-203366191/1219-meridian-ave-miami-beach-fl-unit-4.jpg',
    position: {
      lat: 25.785697,
      lng: -80.139344
    },
    listingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '5',
    title: 'Spacious 3 Bed Home in Pine Tree Village',
    address: '10982 Greentrail Dr S, Boynton Beach, FL 33436',
    neighborhood: 'Pine Tree Neighborhood',
    price: '$485,000',
    priceDropInfo: '$75K PRICE DROP',
    rentalOption: '$3,500 per month',
    estimatedPayment: '$3,400/month',
    status: 'forSale',
    beds: 3,
    baths: 2,
    description: 'A lovely 3-bedroom, 2-bathroom home greets you with charming curb appeal and a wide entrance. These single-family homes have 2340 square feet of actual living area and come with a fully attached two-car garage. The home features an open design and a sunroom with wide windows constructed in 2019. The Master Suite features a king-size bed, two huge closets, and a recently renovated master bath with double sinks. The front windows look out over a tranquil, green pond, which is ideal for relaxation. The backyard is ideal for hosting outdoor events. PTV-Pine Tree Village is a hidden gem in Palm Beach County and the top active 55+ community in Boynton Beach.',
    features: [
      'Open Design',
      'Sunroom with Wide Windows (2019)',
      'Master Suite with King-Size Bed',
      'Two Huge Closets',
      'Renovated Master Bath'
    ],
    highlights: [
      '2340 Square Feet Living Area',
      'Two-Car Garage',
      'Green Pond View',
      'Spacious Backyard',
      '55+ Community'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/5131421483-246575671/10982-greentrail-dr-s-boynton-beach-fl.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/9231421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-10.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/1331421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-12.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/5331421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-16.jpg', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/211/8331421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-19.jpg', alt: 'Master Bedroom' },
      { url: 'https://images.homes.com/listings/211/9331421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-20.jpg', alt: 'Master Bathroom' },
      { url: 'https://images.homes.com/listings/211/0431421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-21.jpg', alt: 'Second Bedroom' },
      { url: 'https://images.homes.com/listings/211/1431421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-22.jpg', alt: 'Third Bedroom' },
      { url: 'https://images.homes.com/listings/211/2431421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-23.jpg', alt: 'Second Bathroom' },
      { url: 'https://images.homes.com/listings/211/3431421483-246575671/10982-greentrail-dr-s-boynton-beach-fl-24.jpg', alt: 'Sunroom' }
    ],
    mainImage: 'https://images.homes.com/listings/211/5131421483-246575671/10982-greentrail-dr-s-boynton-beach-fl.jpg',
    position: {
      lat: 26.512936,
      lng: -80.085957
    },
    listingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '6',
    title: 'Fully Furnished Beach Bungalow',
    address: '822 Lenox Ave Unit 4, Miami Beach, FL 33139',
    neighborhood: 'Flamingo Neighborhood',
    price: '$2,250 per month',
    estimatedPayment: '$2,250/month',
    status: 'forRent',
    beds: 1,
    baths: 1,
    sqft: 500,
    built: 1935,
    description: 'Charming fully updated & furnished beach bungalow style villa 1B/1B. Gated community with 1 assigned parking space, washer & dryer in the unit, newly painted walls, new impact windows, remodeled wood floors, bathroom. Located away from noise but walking distance to beach and Lincoln Road, Whole Foods, Target, Best Buy & Publix. Wifi included, No Pets allowed. Please Use ShowingTime for All Showing Requests. Contact Listing Agents for More Information. Also, available for 6 months up to 1 year lease.',
    features: [
      'Fully Furnished',
      'Gated Community',
      'Assigned Parking',
      'In-unit Washer and Dryer',
      'Impact Windows'
    ],
    highlights: [
      'Newly Painted',
      'Remodeled Wood Floors',
      'Updated Bathroom',
      'WiFi Included',
      'Walking Distance to Beach'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/0972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/1972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-2.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/2972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-3.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/4972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-5.jpg', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/211/5972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-6.jpg', alt: 'Bedroom' },
      { url: 'https://images.homes.com/listings/211/6972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-7.jpg', alt: 'Bathroom' },
      { url: 'https://images.homes.com/listings/211/7972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-8.jpg', alt: 'Exterior View' },
      { url: 'https://images.homes.com/listings/211/8972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-9.jpg', alt: 'Neighborhood View' },
      { url: 'https://images.homes.com/listings/211/9972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4-10.jpg', alt: 'Street View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/0972056214-916366191/822-lenox-ave-miami-beach-fl-unit-4.jpg',
    position: {
      lat: 25.779423,
      lng: -80.140127
    },
    listingAgent: {
      name: 'Burak Kus',
      license: '3595722',
      company: 'Related ISG Realty, LLC.'
    },
    coListingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  },
  {
    id: '7',
    title: 'Luxury 2 Bed Condo in Pointe South',
    address: '1401 S Federal Hwy Unit 2010, Boca Raton, FL 33432',
    neighborhood: 'Pointe South',
    price: '$410,000',
    estimatedPayment: '$2,800/month',
    status: 'sold',
    beds: 2,
    baths: 2,
    sqft: 1366,
    pricePerSqft: '$300',
    hoaFee: '$450/mo',
    daysOnMarket: 9,
    belowListPrice: '4%',
    description: 'Very Rare Investor Special - Large 2B2B Condo with Two Balconies in Prime East Boca Location. Don\'t Miss Out! Rents Right Away! Instant Income Up to $4,000/Month. Turnkey Stylishly Furnished or Unfurnished. Steps Away from Mizner Park, Mandarin Oriental, Publix, shops and New Developments! Minutes Walking to the Beach, Resorts, Royal Palm Yacht & Country Club! Newly Remodeled, Freshly Painted. Pearl Tile Porcelain Floors. Bright & Spacious Modern Kitchen, All New Stainless Steel Appliances, Quartz Countertops, Waterfall Island and All White Cabinets & 360 LED Lights. Large Walk-In Closets, New Master Bath w/Vanity, W/D, Storage. Pets Ok! All Ages Welcome! Just As Good For A New Primary or Winter Escape Seasonal Rental. Low HOA! Assessments Paid In Full. Go With Your Highest & Best Offer!',
    features: [
      'Two Balconies',
      'Prime East Boca Location',
      'Large 2 Bed, 2 Bath',
      'Turnkey Furnished Option',
      'Low HOA'
    ],
    highlights: [
      'Newly Remodeled',
      'Pearl Tile Porcelain Floors',
      'Modern Kitchen',
      'New Stainless Steel Appliances',
      'Quartz Countertops'
    ],
    images: [
      { url: 'https://images.homes.com/listings/211/9077865982-225473541/pointe-south-boca-raton-fl-unit-2010.jpg', alt: 'Property Exterior' },
      { url: 'https://images.homes.com/listings/211/0177865982-225473541/pointe-south-boca-raton-fl-unit-2010-2.jpg', alt: 'Living Area' },
      { url: 'https://images.homes.com/listings/211/1177865982-225473541/pointe-south-boca-raton-fl-unit-2010-3.jpg', alt: 'Kitchen' },
      { url: 'https://images.homes.com/listings/211/2177865982-225473541/pointe-south-boca-raton-fl-unit-2010-4.jpg', alt: 'Dining Area' },
      { url: 'https://images.homes.com/listings/211/4177865982-225473541/pointe-south-boca-raton-fl-unit-2010-6.jpg', alt: 'Master Bedroom' },
      { url: 'https://images.homes.com/listings/211/5177865982-225473541/pointe-south-boca-raton-fl-unit-2010-7.jpg', alt: 'Master Bathroom' },
      { url: 'https://images.homes.com/listings/211/6177865982-225473541/pointe-south-boca-raton-fl-unit-2010-8.jpg', alt: 'Second Bedroom' },
      { url: 'https://images.homes.com/listings/211/7177865982-225473541/pointe-south-boca-raton-fl-unit-2010-9.jpg', alt: 'Second Bathroom' },
      { url: 'https://images.homes.com/listings/211/8177865982-225473541/pointe-south-boca-raton-fl-unit-2010-10.jpg', alt: 'Balcony View' }
    ],
    mainImage: 'https://images.homes.com/listings/211/9077865982-225473541/pointe-south-boca-raton-fl-unit-2010.jpg',
    position: {
      lat: 26.342863,
      lng: -80.075251
    },
    listingAgent: {
      name: 'Anastasia Krasun Voropaieva',
      license: '3524077',
      company: 'Related ISG Realty, LLC.'
    }
  }
];

export default propertyData;
