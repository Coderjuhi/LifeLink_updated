const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    trim: true 
  },

  email: { 
    type: String, 
    required: true, 
    unique: true, 
    lowercase: true, 
    trim: true 
  },

  password: { 
    type: String, 
    required: true 
  },

  accountType: { 
    type: String, 
    enum: ['donor', 'recipient', 'hospital', 'admin'], 
    required: true 
  },

  bloodType: { 
    type: String, 
    enum: ['A+','A-','B+','B-','O+','O-','AB+','AB-'], 
    default: null 
  },

  phone: { 
    type: String, 
    trim: true 
  },

  address: { 
    type: String, 
    trim: true 
  },

  isActive: {
    type: Boolean,
    default: true
  }

}, { timestamps: true });  // ✅ Automatically add createdAt & updatedAt

module.exports = mongoose.model('User', userSchema);
