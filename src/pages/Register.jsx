import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaPhone, FaHome, FaBuilding, FaMapMarkerAlt, FaCity, FaIdCard, FaTools, FaHeartbeat, FaLocationArrow, FaRoad, FaClock } from 'react-icons/fa';
import toast from 'react-hot-toast';
import '../styles/Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const roleFromUrl = searchParams.get('role') || 'user';
  
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: roleFromUrl,
    age: '',
    gender: '',
    doorNumber: '',
    flatNumber: '',
    buildingName: '',
    street: '',
    landmark: '',
    communityArea: '',
    otherCommunityArea: '',
    pincode: '',
    serviceAreas: '',
    travelDistance: '',
    preferredAreas: '',
    availability: '',
    aadharLast4: '',
    experience: '',
    skills: '',
    emergencyContact: '',
    emergencyPhone: '',
    medicalConditions: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const validatePhone = (phone) => /^[6-9]\d{9}$/.test(phone);
  const validatePincode = (pincode) => /^[1-9][0-9]{5}$/.test(pincode);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!validatePhone(formData.phone)) {
      toast.error('Enter valid Indian mobile number (10 digits starting with 6-9)');
      return;
    }
    
    if (formData.role === 'user') {
      if (!formData.doorNumber || !formData.street || !formData.pincode) {
        toast.error('Please fill all required address fields');
        return;
      }
      if (!formData.communityArea) {
        toast.error('Please select your community area');
        return;
      }
      if (formData.communityArea === "Other" && !formData.otherCommunityArea) {
        toast.error('Please enter your community area name');
        return;
      }
      if (!validatePincode(formData.pincode)) {
        toast.error('Enter valid 6-digit pincode');
        return;
      }
    }
    
    if (formData.role === 'volunteer') {
      if (!formData.serviceAreas) {
        toast.error('Please enter areas where you can serve');
        return;
      }
      if (!formData.travelDistance) {
        toast.error('Please select travel distance');
        return;
      }
    }
    
    setLoading(true);
    
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        role: formData.role,
        age: parseInt(formData.age),
        gender: formData.gender,
        aadharLast4: formData.aadharLast4,
        experience: formData.experience,
        skills: formData.skills.split(',').map(s => s.trim()),
      };
      
      if (formData.role === 'user') {
        const finalCommunityArea = formData.communityArea === "Other" ? formData.otherCommunityArea : formData.communityArea;
        userData.address = {
          doorNumber: formData.doorNumber,
          flatNumber: formData.flatNumber,
          buildingName: formData.buildingName,
          street: formData.street,
          landmark: formData.landmark,
          communityArea: finalCommunityArea,
          pincode: formData.pincode,
          fullAddress: `${formData.doorNumber}, ${formData.flatNumber ? `Flat ${formData.flatNumber}, ` : ''}${formData.buildingName ? `${formData.buildingName}, ` : ''}${formData.street}, ${finalCommunityArea}, Guntur - ${formData.pincode}`
        };
        userData.emergencyContact = formData.emergencyContact;
        userData.emergencyPhone = formData.emergencyPhone;
        userData.medicalConditions = formData.medicalConditions;
      } else {
        userData.serviceAreas = formData.serviceAreas.split(',').map(s => s.trim());
        userData.travelDistance = formData.travelDistance;
        userData.preferredAreas = formData.preferredAreas;
        userData.availability = formData.availability;
      }
      
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }
      
      toast.success('Registration successful! Please login.');
      navigate('/login');
      
    } catch (err) {
      console.error('Registration error:', err);
      toast.error(err.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-header">
          <h2>{formData.role === 'volunteer' ? 'Register as Volunteer' : 'Register as Resident'}</h2>
          <p>Fill all details to join our Guntur community</p>
        </div>
        
        <div className="steps">
          <div className={`step ${step >= 1 ? 'active' : ''}`}><span>1</span> Personal</div>
          <div className={`step ${step >= 2 ? 'active' : ''}`}><span>2</span> {formData.role === 'volunteer' ? 'Service Areas' : 'Address'}</div>
          <div className={`step ${step >= 3 ? 'active' : ''}`}><span>3</span> {formData.role === 'volunteer' ? 'Skills' : 'Emergency'}</div>
        </div>
        
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="step-content">
              <div className="input-group"><FaUser /><input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} required /></div>
              <div className="input-group"><FaEnvelope /><input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} required /></div>
              <div className="input-group"><FaPhone /><input type="tel" name="phone" placeholder="Mobile Number (10 digits)" value={formData.phone} onChange={handleChange} required /></div>
              <div className="row"><div className="input-group"><input type="number" name="age" placeholder="Age" value={formData.age} onChange={handleChange} required /></div><div className="input-group"><select name="gender" value={formData.gender} onChange={handleChange} required><option value="">Gender</option><option value="male">Male</option><option value="female">Female</option></select></div></div>
              <div className="input-group"><FaLock /><input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required /></div>
              <div className="input-group"><FaLock /><input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required /></div>
            </div>
          )}
          
          {step === 2 && (
            <div className="step-content">
              {formData.role === 'user' ? (
                <>
                  <h4>Complete Address (Guntur Community)</h4>
                  <div className="row"><div className="input-group"><FaHome /><input type="text" name="doorNumber" placeholder="Door/House No *" value={formData.doorNumber} onChange={handleChange} required /></div><div className="input-group"><FaBuilding /><input type="text" name="flatNumber" placeholder="Flat/Apt No" value={formData.flatNumber} onChange={handleChange} /></div></div>
                  <div className="input-group"><input type="text" name="buildingName" placeholder="Building/Society Name" value={formData.buildingName} onChange={handleChange} /></div>
                  <div className="input-group"><input type="text" name="street" placeholder="Street Name *" value={formData.street} onChange={handleChange} required /></div>
                  <div className="input-group"><input type="text" name="landmark" placeholder="Nearby Landmark" value={formData.landmark} onChange={handleChange} /></div>
                  <div className="input-group"><FaCity /><select name="communityArea" value={formData.communityArea} onChange={handleChange} required><option value="">Select Community Area</option><option value="Brodipet">Brodipet</option><option value="Lakshmipuram">Lakshmipuram</option><option value="Kothapet">Kothapet</option><option value="Pattabhipuram">Pattabhipuram</option><option value="Guntur Vari Thota">Guntur Vari Thota</option><option value="Nallapadu">Nallapadu</option><option value="Chandramouli Nagar">Chandramouli Nagar</option><option value="Arundelpet">Arundelpet</option><option value="Vidya Nagar">Vidya Nagar</option><option value="Srinivasa Nagar">Srinivasa Nagar</option><option value="Sambasiva Pet">Sambasiva Pet</option><option value="Pedda Kakani">Pedda Kakani</option><option value="Etukuru">Etukuru</option><option value="Gorantla">Gorantla</option><option value="Ankireddypalem">Ankireddypalem</option><option value="Budampadu">Budampadu</option><option value="Chinna Kakani">Chinna Kakani</option><option value="Takkellapadu">Takkellapadu</option><option value="Koritepadu">Koritepadu</option><option value="Suryalanka">Suryalanka</option><option value="Reddy Palem">Reddy Palem</option><option value="Autonagar">Autonagar</option><option value="Brindavan Gardens">Brindavan Gardens</option><option value="Railpet">Railpet</option><option value="Other">Other (Please specify below)</option></select></div>
                  {formData.communityArea === "Other" && (<div className="input-group"><input type="text" name="otherCommunityArea" placeholder="Please enter your community area name" value={formData.otherCommunityArea} onChange={handleChange} required /></div>)}
                  <div className="input-group"><input type="text" name="pincode" placeholder="Pincode (6 digits) *" value={formData.pincode} onChange={handleChange} required pattern="[1-9][0-9]{5}" /></div>
                </>
              ) : (
                <>
                  <h4>Service Information</h4>
                  <div className="input-group"><FaLocationArrow /><textarea name="serviceAreas" placeholder="Areas where you can serve (comma-separated) *" rows="2" value={formData.serviceAreas} onChange={handleChange} required></textarea><small>Example: Brodipet, Lakshmipuram, Kothapet, Koritepadu, etc.</small></div>
                  <div className="input-group"><FaRoad /><select name="travelDistance" value={formData.travelDistance} onChange={handleChange} required><option value="">Maximum travel distance *</option><option value="1 km">Within 1 km</option><option value="2 km">Within 2 km</option><option value="3 km">Within 3 km</option><option value="5 km">Within 5 km</option><option value="10 km">Within 10 km</option><option value="Any">Any distance within Guntur</option></select></div>
                  <div className="input-group"><FaMapMarkerAlt /><textarea name="preferredAreas" placeholder="Preferred areas to serve (optional)" rows="2" value={formData.preferredAreas} onChange={handleChange}></textarea></div>
                  <div className="input-group"><FaClock /><input type="text" name="availability" placeholder="Available days and time (e.g., Weekdays 5PM-9PM, Weekends 9AM-6PM)" value={formData.availability} onChange={handleChange} /></div>
                </>
              )}
            </div>
          )}
          
          {step === 3 && (
            <div className="step-content">
              {formData.role === 'volunteer' ? (
                <>
                  <div className="input-group"><FaIdCard /><input type="text" name="aadharLast4" placeholder="Aadhar (Last 4 digits)" value={formData.aadharLast4} onChange={handleChange} required pattern="[0-9]{4}" /></div>
                  <div className="input-group"><input type="text" name="experience" placeholder="Years of Experience" value={formData.experience} onChange={handleChange} required /></div>
                  <div className="input-group"><FaTools /><textarea name="skills" placeholder="Skills (comma-separated: Elder Care, Tutoring, Cleaning, etc.) *" rows="3" value={formData.skills} onChange={handleChange} required></textarea></div>
                </>
              ) : (
                <>
                  <div className="input-group"><input type="text" name="emergencyContact" placeholder="Emergency Contact Name" value={formData.emergencyContact} onChange={handleChange} required /></div>
                  <div className="input-group"><FaPhone /><input type="tel" name="emergencyPhone" placeholder="Emergency Contact Number" value={formData.emergencyPhone} onChange={handleChange} required /></div>
                  <div className="input-group"><FaHeartbeat /><textarea name="medicalConditions" placeholder="Any medical conditions or special requirements?" rows="3" value={formData.medicalConditions} onChange={handleChange}></textarea></div>
                </>
              )}
            </div>
          )}
          
          <div className="button-group">
            {step > 1 && <button type="button" className="btn-back" onClick={() => setStep(step - 1)}>Back</button>}
            {step < 3 ? <button type="button" className="btn-next" onClick={() => setStep(step + 1)}>Next</button> : <button type="submit" className="btn-submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>}
          </div>
        </form>
        
        <p className="login-link">Already have an account? <Link to="/login">Login here</Link></p>
      </div>
    </div>
  );
};

export default Register;