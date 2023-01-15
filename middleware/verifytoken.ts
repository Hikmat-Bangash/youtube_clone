import jwt from "jsonwebtoken";
import { Request, Response} from "express";
import { createError } from "../HandleError";
import dotenv from 'dotenv'
dotenv.config();


const JWT: string = "HIKMATKHANBANGASH";

// in typescript
export const verifyToken = (req: Request, res: Response, next: any) => {
   
    const token: any = req.cookies.access_token;
     
    console.log(token)

    if (!token) return next(createError(401, "You are not authenticated!"));

    jwt.verify(token, JWT, (err: jwt.VerifyErrors | null, user:any) => {
        if (err) return next(createError(403, "Token is not valid!"));

        req.user = user;
        next()
    });
};

//  in plain javascript
// export const verifyToken = (req ,res, next) => {
//   const token= req.cookies.access_token;
//   if (!token) return next(createError(401, "You are not authenticated!"));

//   jwt.verify(
//     token,
//     "HIKMATKHANBANGASH",
//     (err, user) => {
//       if (err) return next(createError(403, "Token is not valid!"));

//       req.user = user;
//       next();
//     }
//   );
// };