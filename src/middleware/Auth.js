import jwt from 'jsonwebtoken';

const verifyToken = async (req, res, next) => {
    const token = req?.headers['authorization'] ? req.headers['authorization'].split(' ')[1] : null
    console.log('req headers',token)
    if (!token) {
        return res.status(401).send({ message: "No token provided!" });
    }
    try {
        const decoded = jwt.verify(token,process.env.TOKEN_KEY);
        req.user = decoded;
    }
    catch (err) {
        return res.status(403).send({ message: "Unauthorized!" });
    }

    next()
}

export {
    verifyToken
}
