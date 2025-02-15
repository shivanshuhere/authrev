import ApiResponse from "../Utils/ApiResponse.js";
import ErrorResponse from "../Utils/ErrorResponse.js";
import User from "../Models/user.model.js";

const generateAccessAndRefreshToken = async (user) => {
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();
    return { accessToken, refreshToken };
};

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
        res.json(
            new ErrorResponse(
                400,
                "Something went wrong while registering user",
                error
            )
        );
    }
}

export async function login(req, res) {
    const { email, password } = req.body;
    if ([email, password].some((filed) => filed.trim() === ""))
        throw new ErrorResponse(400, "All fields are required");

    try {
        let user = await User.findOne({ email });
        if (!user) {
            throw new ErrorResponse(400, "User does not exists");
        }

        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new ErrorResponse(400, "Wrong credentials");
        }
        const { accessToken, refreshToken } =
            await generateAccessAndRefreshToken(user);
        const options = {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        };
        user = User.findById(user._id).select("-password");
        return res
            .status(200)
            .json(new ApiResponse(200, "User registered", user))
            .setCookie("accessToken", accessToken, options)
            .setCookie("refreshToken", refreshToken, options);
    } catch (error) {
        console.log("error: ", error);
        res.status(400).json(
            new ErrorResponse(
                400,
                "Something went wrong while logging in : ",
                error
            )
        );
    }
}
