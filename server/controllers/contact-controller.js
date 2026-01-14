const  contactModel  = require("../models/contact-model");

const contact = async (req, res) => {
  try {
    const { username, email, message } = req.body;

    // Basic validations
    if (!username || !email || !message) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Save contact message
    const sendContact = await contactModel.create({ username, email, message });

    return res.status(200).json({
      message: "Your message has been sent",
      data: sendContact,
    });
  } catch (error) {
    console.error("CONTACT ERROR 👉", error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
};

//get all contact message 
// Get all contact messages
const getAllMessage = async (req, res) => {
  try {
    const allMessage = await contactModel.find().sort({ createdAt: -1 });

    if (!allMessage || allMessage.length === 0) {
      return res.status(200).json({
        message: "No messages found",
        data: [],
      });
    }

    return res.status(200).json({
      message: "All messages fetched successfully",
      data: allMessage,
    });
  } catch (error) {
    console.error("CONTACT ERROR 👉", error.message);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};


module.exports = { contact, getAllMessage};
