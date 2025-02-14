import ApiResponse from "../Utils/ApiResponse.js";
import ErrorResponse from "../Utils/ErrorResponse.js";
import User from "../Models/user.model.js";

export async function register(req, res) {
    const { email, password, username } = req.body;
    const profile = req.file.path;
    console.log("profile :", profile);

    if (
        [email, password, username, profile].some(
            (filed) => filed.trim() === ""
        )
    )
        throw new ErrorResponse(400, "All fields are required");

    let user;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            throw new ErrorResponse(400, "User already exists");
        }
        user = await User.create({
            email,
            password,
            username,
            profile,
        });
        await user.save();
        return res.status(200).json(new ApiResponse(200, "User registered"));
    } catch (error) {
        throw new ErrorResponse(
            400,
            "Something went wrong while registering user",
            error
        );
    }
}
