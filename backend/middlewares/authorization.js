import asyncHandler from 'express-async-handler';

const isAuthorized = asyncHandler(async (req, res, next) => {
    if (req.session.sudo) {
        next();
    } else {
        res.status(401);
        throw new Error("not authorized");
    }
});

export { isAuthorized };