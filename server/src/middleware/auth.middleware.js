import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
  try {
    if (!req.auth.userId) {
      return res
        .status(401)
        .json({ message: "Unauthorized - you must be logged in." });
    }

    next();
  } catch (error) {
    console.log("Error in protect route", error);
    res.status(500).json({ message: error.message });
  }
};

export const requireAdmin = async (req, res, next) => {
  try {
    const currentUser = await clerkClient.users.getUser(req.auth.userId);

    const isAdmin =
      process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

    if (!isAdmin) {
      return res
        .status(403)
        .json({ message: "Unauthorized - you must an admin." });
    }

    next();
  } catch (error) {
    console.log("Error in require admin", error);
    res.status(500).json({ message: error.message });
  }
};
