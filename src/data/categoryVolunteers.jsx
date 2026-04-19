import { indianVolunteers, getVolunteersByCategory } from './indianVolunteers';

// Category-wise sorted volunteers (20+ each)
export const volunteersByCategory = {
  "Elder Care": getVolunteersByCategory("Elder Care"),
  "Child Care": getVolunteersByCategory("Child Care"),
  "House Cleaning": getVolunteersByCategory("House Cleaning"),
  "House Repairs": getVolunteersByCategory("House Repairs"),
  "Tutoring": getVolunteersByCategory("Tutoring"),
  "Cooking Help": getVolunteersByCategory("Cooking Help"),
  "Medical Assistance": getVolunteersByCategory("Medical Assistance"),
  "Grocery Shopping": getVolunteersByCategory("Grocery Shopping")
};

export const getAllVolunteers = () => indianVolunteers;

export const getVolunteersByCategory = (category) => {
  return volunteersByCategory[category] || [];
};

export const getCategoryCount = () => {
  const counts = {};
  Object.keys(volunteersByCategory).forEach(cat => {
    counts[cat] = volunteersByCategory[cat].length;
  });
  return counts;
};