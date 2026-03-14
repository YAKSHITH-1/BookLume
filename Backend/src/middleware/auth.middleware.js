import  jwt from 'jsonwebtoken';

import User from '../../models/User.js';




const protectroute = async (req,res,next) => {

    try {
        const authHeader = req.headers.authorization;
        
        const token = authHeader?.replace("Bearer ","")?.trim();

        if(!token){
            return res.status(401).json({message:"No token provided, authorization denied"});
        }

        const decoded = jwt.verify(token,process.env.JWT_SECRET);

       

        const user = await User.findById(decoded.userId).select("-password");

        if(!user){
            return res.status(401).json({message:"User not found, authorization denied"});
        }

        req.user = user;
        next();

    } catch (error) {
       
        return res.status(401).json({message: `Token is not valid, authorization denied: ${error.message}`});
    }

}

export default protectroute;