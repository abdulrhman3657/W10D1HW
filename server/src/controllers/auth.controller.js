import User from "../models/user.model.js"
import bcrypt from "bcryptjs";
import { generateTokens } from "../services/auth.service.js";

export const signup = async (req, res) => {
    try {

        const { email, password } = req.body;

        const checkUser = await User.findOne({ email:email });
        
        if (checkUser) {
            res.status(400).json({ message: "user already exists" });
            return
        }

        const salt = await bcrypt.genSalt(11);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = new User({
            email: email,
            passwordHash: hashedPassword
        })

        await user.save();

        console.log(user)

        const { accessToken, refreshToken } = await generateTokens(user)

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(201).json({
            status: 'success',
            data: {
                // Remove password from output
                user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                },
                accessToken,
                refreshToken,
            },
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}

export const signin = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email:email });
        
        if (!user) {
            res.status(401).json({ message: "invalid email or password" });
            return
        }

        const checkPassword = await bcrypt.compare(password, user.passwordHash);

        if (!checkPassword) {
            res.status(401).json({ message: "Invalid credentials" });
            return
        }

        const { accessToken, refreshToken } = await generateTokens(user)

        // Set cookies
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure: false,
            maxAge: 15 * 60 * 1000, // 15 minutes
        });

        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: false,
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        });

        res.status(200).json({
            status: 'success',
            data: {
                // Remove password from output
                user: {
                id: user.id,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
                },
                accessToken,
                refreshToken,
            },
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}

export const signout = async (req, res) => {
    try {

        res.cookie('accessToken', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        });
        res.cookie('refreshToken', 'none', {
            expires: new Date(Date.now() + 5 * 1000),
            httpOnly: true,
        });

        res.status(200).json({
            status: 'success',
            message: 'Signed out successfully',
        });
        
    } catch (error) {
        console.log(error)
        res.status(400).json({
            error: error
        })
    }
}