import { NextFunction,Response } from 'express';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';
import User from '../../models/User';
import Joi from "joi";
import i18n from "../../config/i18n";

class Auth {
   
   
	public static async registerValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        console.log("=========")
		const schema = Joi.object().keys({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'any.required': i18n.__('UserNameRequired')
                }),
        
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        
            repeat_password: Joi.ref('password'),
        
            access_token: [
                Joi.string(),
                Joi.number().required()
            ],
        
            birth_year: Joi.number()
                .integer()
                .min(1900)
                .max(2013).required(),
        
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required()
        })
            // .with('username', 'birth_year')
            // .xor('password', 'access_token')
            // .with('password', 'repeat_password');
        
        
       
        try {
            console.log("adkfjnajsdf",req.body);
            const value = await schema.validate(req.body);
            if(value.error){
                console.log(value.error?.details);    
                next({code: 400,error: value.error?.details})
            } else {
                next();
            }
            
            
            
        }
        catch (err) {
            console.log({err})
            next(err);
            
         }
	}

    public static async register(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const _email = req.body.email;
        const _password = req.body.password;
    
        const user = new User({
            email: _email,
            password: _password
        });
    
        var userFind = await User.findOne({ email: _email });
        
        var userInsert = await user.save();
    
        return res;
        
    }
    
}

export default Auth;