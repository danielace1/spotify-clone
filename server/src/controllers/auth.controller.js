import User from "../models/user.model.js";

export const authCallback = async (req, res, next) => {
  try {
    const { id, firstName, lastName, imageUrl } = req.body;

    const user = await User.findOne({ clerkId: id });

    if (!user) {
      const newUser = new User({
        clerkId: id,
        fullName: `${firstName} ${lastName}`,
        imageUrl,
      });

      await newUser.save();

      res.status(200).json(newUser);
    } else {
      user.firstName = firstName;
      user.lastName = lastName;
      user.imageUrl = imageUrl;
      await user.save();
    }
  } catch (error) {
    console.log("Error in auth callback", error);
    next(error);
  }
};
