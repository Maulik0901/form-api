import { NextFunction,Response } from "express";
import { IRequest, SuccessRespones,ErrorRespones } from '../interfaces/vendors/index';
import jwt from "jsonwebtoken";
import i18n from "../config/i18n";
import jwtSecrate from "../config/jwtSecrate";
class AuthMiddelware {
    public static async basicAuthUser(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        try {
            
            if(req.headers.authorization){
                var decoded = jwt.verify(req.headers.authorization, jwtSecrate);
                console.log({decoded})
                if(decoded){ //@ts-ignore
                    req.user = decoded;                    
                } else {
                    next({code: 403,error: i18n.__("TokenRequired")});
                }
                next();
            } else {
                
                next({code: 403,error: i18n.__("TokenRequired")});
            }

        } catch(err){
            console.log({err})
            next(err);
        }
    }


}

export default AuthMiddelware;