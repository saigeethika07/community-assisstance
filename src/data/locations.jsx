// ============================================
// COMMUNITY APP - LOCAL LOCATIONS ONLY
// Focus on one specific community/neighborhood
// ============================================

// Main Community Name
export const communityName = "Sri Sai Nagar Community";

// Community Local Areas (within the community)
export const communityLocalAreas = [
  "Main Street Area",
  "Temple Street",
  "Market Road",
  "Park View Colony",
  "Garden Apartments",
  "Lakshmi Nagar",
  "Sai Ram Colony",
  "Venkateswara Colony",
  "Shanti Nagar",
  "Srinagar Colony",
  "Gayatri Nagar",
  "Rama Krishna Puram",
  "Sai Baba Colony",
  "Balaji Nagar",
  "Nagarjuna Apartments"
];

// Streets within the community
export const communityStreets = [
  "1st Main Road",
  "2nd Cross Road",
  "Temple Street",
  "Market Street",
  "Park Lane",
  "Garden Road",
  "Lake View Road",
  "Community Center Road",
  "School Road",
  "Hospital Road",
  "Bus Stand Road",
  "Railway Gate Road"
];

// Blocks/Sections within the community
export const communityBlocks = [
  "A Block", "B Block", "C Block", "D Block", "E Block",
  "F Block", "G Block", "H Block", "I Block", "J Block",
  "North Wing", "South Wing", "East Wing", "West Wing",
  "Central Wing"
];

// House Numbers/Ranges
export const houseNumberRanges = {
  start: 1,
  end: 500,
  prefixes: ["H.No", "Plot No", "Flat No", "Villa No", "House No"]
};

// Landmarks within community
export const communityLandmarks = [
  "Near Community Hall",
  "Opposite Temple",
  "Beside Park",
  "Next to School",
  "Behind Hospital",
  "Near Water Tank",
  "Opposite Police Station",
  "Beside Shopping Complex",
  "Near Bus Stop",
  "Opposite Playground"
];

// Pincodes for the community
export const communityPincodes = [
  "530001", "530002", "530003", "530004", "530005",
  "530016", "530017", "530018", "530020", "530022"
];

// Complete address fields structure for community
export const getAddressFields = () => ({
  doorNo: "",
  flatNo: "",
  blockName: "",
  buildingName: "",
  street: "",
  localArea: "",
  landmark: "",
  city: "Visakhapatnam",
  district: "Visakhapatnam",
  state: "Andhra Pradesh",
  pincode: "530001"
});

// Get all local areas
export const getLocalAreas = () => communityLocalAreas;

// Get all streets
export const getStreets = () => communityStreets;

// Get all blocks
export const getBlocks = () => communityBlocks;

// Get all landmarks
export const getLandmarks = () => communityLandmarks;

// Get random house number
export const getRandomHouseNumber = () => {
  const prefix = houseNumberRanges.prefixes[Math.floor(Math.random() * houseNumberRanges.prefixes.length)];
  const number = Math.floor(Math.random() * (houseNumberRanges.end - houseNumberRanges.start + 1)) + houseNumberRanges.start;
  return `${prefix} ${number}`;
};

// Validate pincode
export const validatePincode = (pincode) => {
  const pincodeRegex = /^[1-9][0-9]{5}$/;
  return pincodeRegex.test(pincode);
};

// Validate Indian mobile number
export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

// For backward compatibility with existing code
export const indianStates = [
  { id: "ap", name: "Andhra Pradesh" }
];

export const andhraDistricts = ["Visakhapatnam"];
export const telanganaDistricts = [];

export const getCitiesByDistrict = (district) => {
  return communityLocalAreas;
};

// Get full address as string
export const formatAddress = (address) => {
  const parts = [
    address.doorNo,
    address.flatNo,
    address.blockName,
    address.buildingName,
    address.street,
    address.localArea,
    address.landmark,
    `${address.city}, ${address.district}`,
    address.state,
    address.pincode
  ].filter(part => part && part.trim() !== "");
  
  return parts.join(", ");
};

// Get short address for display
export const getShortAddress = (address) => {
  const parts = [
    address.doorNo,
    address.street,
    address.localArea
  ].filter(part => part && part.trim() !== "");
  
  return parts.join(", ");
};