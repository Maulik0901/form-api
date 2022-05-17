import { NextFunction,Response } from 'express';
import { IRequest, SuccessRespones,ErrorRespones } from '../../interfaces/vendors/index';
import Role from '../../models/Role';
import Joi from "joi";
import i18n from "../../config/i18n";

class RoleController {
   
   
	public static async roleInsertValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
		const schema = Joi.object().keys({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'any.required': i18n.__('NameRequired')
                }),
        
        })
       
        try {
            
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

    public static async create(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const name = req.body.name.toLowerCase();
        
    
        const role = new Role({
            name: name            
        });
    
        var roleFind = await Role.findOne({ name: name });
        console.log({roleFind})
        if(roleFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('roleExits'),
                i18n.__('roleExits')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }
        var roleInsert = await role.save();
        var successRes = new SuccessRespones(
            400,
            i18n.__('successRes'),
            roleInsert
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }


    public static async update(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const name = req.body.name.toLowerCase();
        
    
        const role = new Role({
            name: name            
        });
    
        var roleFind = await Role.findOne({ name: name });
        console.log({roleFind})
        if(roleFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('roleExits'),
                i18n.__('roleExits')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }
        var roleInsert = await role.save();
        var successRes = new SuccessRespones(
            400,
            i18n.__('successRes'),
            roleInsert
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }
    
}

export default RoleController;