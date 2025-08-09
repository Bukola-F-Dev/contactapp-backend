const Contact = require('../models/contactModel');

// Create Contact
exports.createContact = async (req, res) => {
  try {
    const contact = await Contact.create(req.body);
    res.status(201).json(contact);
  } catch (error) {
    // Handle MongoDB duplicate key error
    if (error.code === 11000) {
      const duplicatedField = Object.keys(error.keyValue)[0];
      const message = `Oops! The ${duplicatedField} "${error.keyValue[duplicatedField]}" is already in use. Please use a different one.`;
      return res.status(400).json({ message });
    }

    // General error 
    res.status(400).json({ message: error.message });
  }
};

// Contact List
exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Read one
exports.getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Update
exports.updateContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json(contact);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete
exports.deleteContact = async (req, res) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Contact not found' });
    res.json({ message: 'Contact deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Search by name or email
exports.searchContacts = async (req, res) => {
  const { name, email } = req.query;

  const filter = [];

  if (name) {
    filter.push({ name: { $regex: name, $options: 'i' } });
  }

  if (email) {
    filter.push({ email: { $regex: email, $options: 'i' } });
  }

  try {
    const contacts = await Contact.find(filter.length ? { $or: filter } : {});
    res.json(contacts);
  }catch (error) {
    console.log("CREATE CONTACT ERROR:", error);

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({
        message: `A contact with this ${field} already exists.`,
      });
    }

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ message: messages.join(", ") });
    }

    res.status(500).json({ message: "Something went wrong." });
  }
};

