import { NextFunction,Response } from 'express';
import { IRequest, SuccessRespones,ErrorRespones } from '../../interfaces/vendors/index';
import jwt from "jsonwebtoken";
import User from '../../models/User';
import Joi from "joi";
import i18n from "../../config/i18n";
import jwtSecrate from '../../config/jwtSecrate';

class Auth {
   
   
	public static async registerValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
		const schema = Joi.object().keys({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'any.required': i18n.__('UserNameRequired')
                }),
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        
            roleId: Joi.string()                
                       .required(),

            companyId: Joi.string()                
                          .required()
        })
           
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
            name: req.body.name,
            email: _email,
            password: _password,
            roleId: req.body.roleId,
            companyId: req.body.companyId
        });
    
        var userFind = await User.findOne({ email: _email });
        if(userFind){
            var errorRes = new ErrorRespones(
                400,
                i18n.__('UserExits'),
                i18n.__('UserExits')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }
        var userInsert = await user.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('UserSuccessRes'),
            userInsert
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }

    public static async loginValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
		const schema = Joi.object().keys({           
            email: Joi.string()
                .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),        
        })
           
        try {            
            const value = await schema.validate(req.body);
            if(value.error){                  
                next({code: 400,error: value.error?.details})
            } else {
                next();
            }            
        }
        catch (err) {            
            next(err);            
        }
	}
    public static async login(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        try {
            const _email = req.body.email;
            const _password = req.body.password;
        
            const user = new User({           
                email: _email,
                password: _password,
            });
        
            var userFind = await User.findOne({ email: _email }).populate([{path: "companyId"},{path: "roleId"}]);
            if(!userFind){
                var errorRes = new ErrorRespones(
                    400,
                    i18n.__('UserNotFound'),
                    i18n.__('UserNotFound')
                )
               return res.status((errorRes as ErrorRespones).status).json(errorRes)
            }
    
            var comparePaasword = await userFind.comparePassword(_password,userFind.password);
            if(!comparePaasword){            
                var errorRes = new ErrorRespones(
                    400,
                    i18n.__('UserPasswordWrong'),
                    i18n.__('UserPasswordWrong')
                )
               return res.status((errorRes as ErrorRespones).status).json(errorRes)
            }
    
            var token = jwt.sign({name: userFind.name,email: userFind.email,companyId: userFind.companyId}, jwtSecrate);
            userFind = JSON.parse(JSON.stringify(userFind));
            
            if(userFind && userFind.password){
                delete userFind.password;
            }
            if(userFind){
                userFind['token'] = token;
            }
    
            var successRes = new SuccessRespones(
                200,
                i18n.__('UserSuccessRes'),
                userFind
            )
            return res.status((successRes as SuccessRespones).status).json(successRes);
            
        }catch(err){
            console.log({err})
            next({code: 400,error: err});
        }
       
    }
    
}

export default Auth;