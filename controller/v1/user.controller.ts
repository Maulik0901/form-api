import { NextFunction,Response } from 'express';
import { IRequest, IResponse, INext } from '../../interfaces/vendors/index';
import User from '../../models/User';
import Joi from "joi";

class Login {
   
   
	public static async registerValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
		const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
        
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
        
            repeat_password: Joi.ref('password'),
        
            access_token: [
                Joi.string(),
                Joi.number()
            ],
        
            birth_year: Joi.number()
                .integer()
                .min(1900)
                .max(2013),
        
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
        })
            // .with('username', 'birth_year')
            // .xor('password', 'access_token')
            // .with('password', 'repeat_password');
        
        
       
        try {
            const value = await schema.validateAsync(req.body);
            console.log({value})
            // next();
            return true
        }
        catch (err) {
            console.log({err})
            // next();
            return true
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

export default Login;