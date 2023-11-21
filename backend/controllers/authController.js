import Admin from "../models/Admin.js";
import asyncHandler from 'express-async-handler';

const GetAuth = asyncHandler(async (req, res) => {
    if (req.session.sudo) {
        res.status(200).send({ ...req.session.admin });
    } else {
        res.status(400).send({ message: "unauthorized" });
    }
})

const PostLogin = asyncHandler(async (req, res) => {
    const { email, passphrase } = req.body;
    // todo: Much needed validation!
    const admin = await Admin.findOne({ email: email });

    if (admin && admin.passphrase === passphrase) {
        req.session.sudo = true;
        req.session.admin = {
            _id: admin._id,
            email
        }
        res.status(200).send({ message: "successfully entered sudo mode" })
    } else {
        res.status(401);
        throw new Error("Unauthorized.");
    }
});

const GetLogout = asyncHandler(async (req, res) => {
    req.session.destroy(err => {
        if (err) {
            res.status(500).json({ success: false, message: err });
        } else {
            res.status(200).json({ success: true, message: "Logged out" });
        }   
    })
});

export default { GetAuth, PostLogin, GetLogout };