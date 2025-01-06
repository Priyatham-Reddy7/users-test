import User from "../models/userModel.js";

export const getUsers = async (req, res) => {
    const user = await User.find();
    res.status(200).json(user);
};

export const createUser = async (req, res) => {
    try {
        // Validate request body
        if (!req.body.id) {
            return res.status(400).send("User ID is required");
        }

        const user = await User.findOne({ id: req.body.id });
        if (user) {
            console.log("User found, updating details");

            // Update user details
            const update = await User.updateOne(
                { id: req.body.id },
                { $set: req.body } // Update all fields in the request body
            );

            console.log("Update result:", update);
            return res.status(200).send("User details modified successfully!");
        } else {
            console.log("User not found, creating a new user");

            // Create a new user
            const newUser = new User(req.body);
            await newUser.save();

            return res.status(201).json("User created successfully!");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({
            error: "An error occurred while processing your request",
        });
    }
};

export const deleteUser = async (req, res) => {
    try {
        // Validate that `id` is provided
        const id = req.params.id;
        if (!id) {
            return res.status(400).send("User ID is required");
        }

        // Attempt to delete the user
        const response = await User.deleteOne({ id: id });

        if (response.deletedCount === 0) {
            // If no user was deleted, return a 404 response
            return res.status(404).send("User not found");
        }

        // Log success and respond
        res.status(200).send(`User with ID ${id} deleted successfully`);
    } catch (error) {
        // Log error and respond with a 500 status
        console.error("Error deleting user:", error);
        res.status(500).json({
            error: "An error occurred while deleting the user",
        });
    }
};
