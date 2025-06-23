// controllers/user.controller.js
const User = require('../models/user.model');
const { z } = require('zod');

// Define a schema for the query parameters we expect
const searchQuerySchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional()
}).refine((data) => data.email || data.name, {
  message: "Provide at least email or name"
});

exports.searchUser = async (req, res) => {
    try {
        // 1. Validate the incoming query
        const validationResult = searchQuerySchema.safeParse(req.query);

        if (!validationResult.success) {
            return res.status(400).json({ error: validationResult.error.issues[0].message });
        }

        const { email,name } = validationResult.data;
        const searchCriteria = {
            $or: []
        };

        if (email) {
            searchCriteria.$or.push({ email });
        }

        if (name) {
            searchCriteria.$or.push({ firstName: { $regex: new RegExp(name, 'i') } });
        }

        // 2. Search for the user in the database
        const foundUser = await User.findOne({ email: email });

        // 3. Respond
        if (!foundUser) {
            return res.status(404).json({ message: "Phew! Your partner is not on the list." });
        }

        res.status(200).json(foundUser);

    } catch (error) {
        res.status(500).json({ error: "An unexpected server error occurred." });
    }
};
