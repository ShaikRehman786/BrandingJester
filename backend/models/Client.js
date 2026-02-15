const mongoose = require("mongoose");

// Stores company / client details
const clientSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPerson: {
      type: String,
      trim: true,
      
    },

    logo:{
        type:String,
        required: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      trim: true,
    },

},
  { timestamps: true }
);

module.exports = mongoose.model("Client", clientSchema);
