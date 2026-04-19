const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
require('dotenv').config();

const User = require('./models/User');

const volunteers = [
  // Elder Care (5)
  { name: "Rajesh Kumar", email: "rajeshkumar@gmail.com", phone: "9876543210", password: "password123", role: "volunteer", age: 34, gender: "male", skills: ["Elder Care"], experience: "8", serviceAreas: ["Brodipet"], travelDistance: "5 km", availability: "Mon-Sat 9AM-6PM", verified: true },
  { name: "Suresh Babu", email: "sureshbabu@gmail.com", phone: "9988776655", password: "password123", role: "volunteer", age: 52, gender: "male", skills: ["Elder Care"], experience: "12", serviceAreas: ["Kothapet"], travelDistance: "3 km", availability: "24/7 Available", verified: true },
  { name: "Venkatesh Rao", email: "venkateshrao@gmail.com", phone: "9494949494", password: "password123", role: "volunteer", age: 48, gender: "male", skills: ["Elder Care"], experience: "10", serviceAreas: ["Pattabhipuram"], travelDistance: "4 km", availability: "Mon-Fri 8AM-8PM", verified: true },
  { name: "Lakshmi Devi", email: "lakshmidevi@gmail.com", phone: "9704704704", password: "password123", role: "volunteer", age: 55, gender: "female", skills: ["Elder Care"], experience: "15", serviceAreas: ["Guntur Vari Thota"], travelDistance: "2 km", availability: "All days 7AM-7PM", verified: true },
  { name: "Srinivas Acharya", email: "srinivasacharya@gmail.com", phone: "9012345678", password: "password123", role: "volunteer", age: 60, gender: "male", skills: ["Elder Care"], experience: "20", serviceAreas: ["Nallapadu"], travelDistance: "6 km", availability: "Mon-Sat 9AM-5PM", verified: true },

  // Child Care (5)
  { name: "Priyanka Reddy", email: "priyankareddy@gmail.com", phone: "9876543220", password: "password123", role: "volunteer", age: 28, gender: "female", skills: ["Child Care"], experience: "5", serviceAreas: ["Chandramouli Nagar"], travelDistance: "3 km", availability: "Mon-Fri 4PM-8PM", verified: true },
  { name: "Swathi Priya", email: "swathipriya@gmail.com", phone: "9876543221", password: "password123", role: "volunteer", age: 26, gender: "female", skills: ["Child Care"], experience: "4", serviceAreas: ["Arundelpet"], travelDistance: "2 km", availability: "Weekdays 9AM-5PM", verified: true },
  { name: "Anjali Sharma", email: "anjali.sharma@gmail.com", phone: "9876543222", password: "password123", role: "volunteer", age: 30, gender: "female", skills: ["Child Care"], experience: "6", serviceAreas: ["Vidya Nagar"], travelDistance: "4 km", availability: "Mon-Sat 8AM-6PM", verified: true },
  { name: "Meera Nair", email: "meeranair@gmail.com", phone: "9876543223", password: "password123", role: "volunteer", age: 32, gender: "female", skills: ["Child Care"], experience: "7", serviceAreas: ["Srinivasa Nagar"], travelDistance: "5 km", availability: "All days 9AM-7PM", verified: true },
  { name: "Divya Bharathi", email: "divyabharathi@gmail.com", phone: "9876543224", password: "password123", role: "volunteer", age: 27, gender: "female", skills: ["Child Care"], experience: "4", serviceAreas: ["Sambasiva Pet"], travelDistance: "3 km", availability: "Weekdays 3PM-7PM", verified: true },

  // House Cleaning (5)
  { name: "Lakshmi Narayana", email: "lakshminarayana@gmail.com", phone: "9876543225", password: "password123", role: "volunteer", age: 42, gender: "male", skills: ["House Cleaning"], experience: "10", serviceAreas: ["Pedda Kakani"], travelDistance: "5 km", availability: "Mon-Sat 8AM-5PM", verified: true },
  { name: "Manga Devi", email: "mangadevi@gmail.com", phone: "9876543226", password: "password123", role: "volunteer", age: 38, gender: "female", skills: ["House Cleaning"], experience: "8", serviceAreas: ["Etukuru"], travelDistance: "4 km", availability: "Weekdays 9AM-4PM", verified: true },
  { name: "Rama Rao", email: "ramarao@gmail.com", phone: "9876543227", password: "password123", role: "volunteer", age: 45, gender: "male", skills: ["House Cleaning"], experience: "12", serviceAreas: ["Gorantla"], travelDistance: "6 km", availability: "All days 7AM-6PM", verified: true },
  { name: "Sita Mahalakshmi", email: "sitamahalakshmi@gmail.com", phone: "9876543228", password: "password123", role: "volunteer", age: 40, gender: "female", skills: ["House Cleaning"], experience: "9", serviceAreas: ["Ankireddypalem"], travelDistance: "3 km", availability: "Mon-Fri 8AM-4PM", verified: true },
  { name: "Narayana Murthy", email: "narayanamurthy@gmail.com", phone: "9876543229", password: "password123", role: "volunteer", age: 50, gender: "male", skills: ["House Cleaning"], experience: "15", serviceAreas: ["Budampadu"], travelDistance: "7 km", availability: "Mon-Sat 8AM-8PM", verified: true },

  // House Repairs (5)
  { name: "Venkatesh Rao", email: "venkateshrao2@gmail.com", phone: "9876543230", password: "password123", role: "volunteer", age: 42, gender: "male", skills: ["House Repairs"], experience: "10", serviceAreas: ["Chinna Kakani"], travelDistance: "5 km", availability: "Mon-Fri 8AM-8PM", verified: true },
  { name: "Ramesh Naidu", email: "rameshnaidu@gmail.com", phone: "9876543231", password: "password123", role: "volunteer", age: 42, gender: "male", skills: ["House Repairs"], experience: "5", serviceAreas: ["Takkellapadu"], travelDistance: "3 km", availability: "Weekends only", verified: true },
  { name: "Surya Prakash", email: "suryaprakash@gmail.com", phone: "9876543232", password: "password123", role: "volunteer", age: 52, gender: "male", skills: ["House Repairs"], experience: "14", serviceAreas: ["Koritepadu"], travelDistance: "8 km", availability: "Mon-Sat 6AM-6PM", verified: true },
  { name: "Mohan Krishna", email: "mohankrishna@gmail.com", phone: "9876543233", password: "password123", role: "volunteer", age: 40, gender: "male", skills: ["House Repairs"], experience: "6", serviceAreas: ["Suryalanka"], travelDistance: "4 km", availability: "Mon-Fri 8AM-5PM", verified: true },
  { name: "Bala Krishna", email: "balakrishna@gmail.com", phone: "9876543234", password: "password123", role: "volunteer", age: 53, gender: "male", skills: ["House Repairs"], experience: "14", serviceAreas: ["Reddy Palem"], travelDistance: "10 km", availability: "24/7 Available", verified: true },

  // Tutoring (5)
  { name: "Priyanka Reddy", email: "priyankareddy2@gmail.com", phone: "9876543235", password: "password123", role: "volunteer", age: 28, gender: "female", skills: ["Tutoring"], experience: "5", serviceAreas: ["Autonagar"], travelDistance: "3 km", availability: "Mon-Fri 4PM-8PM", verified: true },
  { name: "Swathi Priya", email: "swathipriya2@gmail.com", phone: "9876543236", password: "password123", role: "volunteer", age: 26, gender: "female", skills: ["Tutoring"], experience: "4", serviceAreas: ["Brindavan Gardens"], travelDistance: "2 km", availability: "Weekdays 9AM-5PM", verified: true },
  { name: "Anjali Sharma", email: "anjali.sharma2@gmail.com", phone: "9876543237", password: "password123", role: "volunteer", age: 30, gender: "female", skills: ["Tutoring"], experience: "6", serviceAreas: ["Railpet"], travelDistance: "4 km", availability: "Mon-Sat 8AM-6PM", verified: true },
  { name: "Meera Nair", email: "meeranair2@gmail.com", phone: "9876543238", password: "password123", role: "volunteer", age: 32, gender: "female", skills: ["Tutoring"], experience: "7", serviceAreas: ["Brodipet"], travelDistance: "5 km", availability: "All days 9AM-7PM", verified: true },
  { name: "Divya Bharathi", email: "divyabharathi2@gmail.com", phone: "9876543239", password: "password123", role: "volunteer", age: 27, gender: "female", skills: ["Tutoring"], experience: "4", serviceAreas: ["Lakshmipuram"], travelDistance: "3 km", availability: "Weekdays 3PM-7PM", verified: true },

  // Cooking Help (5)
  { name: "Lakshmi Devi", email: "lakshmidevi2@gmail.com", phone: "9876543240", password: "password123", role: "volunteer", age: 38, gender: "female", skills: ["Cooking Help"], experience: "8", serviceAreas: ["Kothapet"], travelDistance: "3 km", availability: "Mon-Sat 9AM-5PM", verified: true },
  { name: "Padmavathi", email: "padmavathi@gmail.com", phone: "9876543241", password: "password123", role: "volunteer", age: 50, gender: "female", skills: ["Cooking Help"], experience: "7", serviceAreas: ["Pattabhipuram"], travelDistance: "4 km", availability: "Mon-Fri 10AM-4PM", verified: true },
  { name: "Sita Mahalakshmi", email: "sitamahalakshmi2@gmail.com", phone: "9876543242", password: "password123", role: "volunteer", age: 40, gender: "female", skills: ["Cooking Help"], experience: "9", serviceAreas: ["Guntur Vari Thota"], travelDistance: "5 km", availability: "Mon-Fri 8AM-4PM", verified: true },
  { name: "Annapurna", email: "annapurna@gmail.com", phone: "9876543243", password: "password123", role: "volunteer", age: 44, gender: "female", skills: ["Cooking Help"], experience: "10", serviceAreas: ["Nallapadu"], travelDistance: "3 km", availability: "Mon-Fri 8AM-3PM", verified: true },
  { name: "Bhagya Lakshmi", email: "bhagyalakshmi@gmail.com", phone: "9876543244", password: "password123", role: "volunteer", age: 41, gender: "female", skills: ["Cooking Help"], experience: "9", serviceAreas: ["Chandramouli Nagar"], travelDistance: "4 km", availability: "Mon-Fri 9AM-5PM", verified: true },

  // Medical Assistance (5)
  { name: "Rajesh Kumar", email: "rajeshkumar2@gmail.com", phone: "9876543245", password: "password123", role: "volunteer", age: 34, gender: "male", skills: ["Medical Assistance"], experience: "8", serviceAreas: ["Arundelpet"], travelDistance: "5 km", availability: "Mon-Sat 9AM-6PM", verified: true },
  { name: "Srinivas Acharya", email: "srinivasacharya2@gmail.com", phone: "9876543246", password: "password123", role: "volunteer", age: 60, gender: "male", skills: ["Medical Assistance"], experience: "20", serviceAreas: ["Vidya Nagar"], travelDistance: "6 km", availability: "Mon-Sat 9AM-5PM", verified: true },
  { name: "Lakshmi Devi", email: "lakshmidevi3@gmail.com", phone: "9876543247", password: "password123", role: "volunteer", age: 55, gender: "female", skills: ["Medical Assistance"], experience: "15", serviceAreas: ["Srinivasa Nagar"], travelDistance: "2 km", availability: "All days 7AM-7PM", verified: true },
  { name: "Hema Latha", email: "hemalatha@gmail.com", phone: "9876543248", password: "password123", role: "volunteer", age: 47, gender: "female", skills: ["Medical Assistance"], experience: "10", serviceAreas: ["Sambasiva Pet"], travelDistance: "4 km", availability: "All days 8AM-6PM", verified: true },
  { name: "Bala Krishna", email: "balakrishna2@gmail.com", phone: "9876543249", password: "password123", role: "volunteer", age: 53, gender: "male", skills: ["Medical Assistance"], experience: "14", serviceAreas: ["Pedda Kakani"], travelDistance: "8 km", availability: "24/7 Available", verified: true },

  // Grocery Shopping (5)
  { name: "Mohan Krishna", email: "mohankrishna2@gmail.com", phone: "9876543250", password: "password123", role: "volunteer", age: 32, gender: "male", skills: ["Grocery Shopping"], experience: "3", serviceAreas: ["Etukuru"], travelDistance: "4 km", availability: "Monday-Saturday: 10 AM - 6 PM", verified: true },
  { name: "Sai Kiran", email: "saikiran@gmail.com", phone: "9876543251", password: "password123", role: "volunteer", age: 33, gender: "male", skills: ["Grocery Shopping"], experience: "3", serviceAreas: ["Gorantla"], travelDistance: "3 km", availability: "Weekends only", verified: false },
  { name: "Vinay Kumar", email: "vinaykumar@gmail.com", phone: "9876543252", password: "password123", role: "volunteer", age: 28, gender: "male", skills: ["Grocery Shopping"], experience: "4", serviceAreas: ["Ankireddypalem"], travelDistance: "5 km", availability: "Weekdays 3PM-7PM", verified: true },
  { name: "Naveen Kumar", email: "naveenkumar@gmail.com", phone: "9876543253", password: "password123", role: "volunteer", age: 38, gender: "male", skills: ["Grocery Shopping"], experience: "8", serviceAreas: ["Budampadu"], travelDistance: "6 km", availability: "Mon-Fri 8AM-4PM", verified: true },
  { name: "Lokesh Yadav", email: "lokeshyadav@gmail.com", phone: "9876543254", password: "password123", role: "volunteer", age: 35, gender: "male", skills: ["Grocery Shopping"], experience: "6", serviceAreas: ["Chinna Kakani"], travelDistance: "4 km", availability: "Mon-Sat 8AM-6PM", verified: true }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    await User.deleteMany({ role: 'volunteer' });
    console.log('✅ Cleared existing volunteers');
    
    let count = 0;
    for (const v of volunteers) {
      // Hash the password (convert "password123" to secure hash)
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(v.password, salt);
      v.password = hashedPassword;
      
      const user = new User(v);
      await user.save();
      count++;
      console.log(`✅ Added (${count}/40): ${v.name}`);
    }
    
    console.log(`\n✅ Added ${count} volunteers to database`);
    console.log('\n📋 VOLUNTEER LOGIN CREDENTIALS:');
    console.log('=================================');
    console.log('Email: any of the above emails');
    console.log('Password: password123');
    console.log('=================================');
    console.log('\n🔒 Passwords are stored as HASHED values in database');
    console.log('   Original "password123" → Hashed (cannot be reversed)');
    process.exit(0);
  } catch (err) {
    console.error('❌ Error:', err);
    process.exit(1);
  }
}

seedDatabase();