export const getAdmin = async (req, res) => {
  try {
  } catch (error) {
    console.log("Error getting admin", error);
    res.status(500).json({ message: error.message });
  }
};
