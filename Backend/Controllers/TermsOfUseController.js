import TermOfUseModel from "../Models/TermsOfUse.js";

// Get the terms of use
export const getTermsOfUse = async (req, res) => {
  try {
    const terms = await TermOfUseModel.findOne(); // Always find the first document
    if (!terms) {
      return res.status(404).json({ message: "Terms of use not found." });
    }
    res.json(terms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching terms of use", error });
  }
};

// Update the terms of use
export const updateTermsOfUse = async (req, res) => {
  const { content } = req.body;
  try {
    const updatedTerms = await TermOfUseModel.findOneAndUpdate(
      {}, // Update the first document found
      { content },
      { new: true } // Return the updated document
    );
    if (!updatedTerms) {
      return res.status(404).json({ message: "Terms of use not found." });
    }
    res.json(updatedTerms);
  } catch (error) {
    res.status(500).json({ message: "Error updating terms of use", error });
  }
};
