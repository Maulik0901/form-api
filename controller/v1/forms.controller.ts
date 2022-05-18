import { NextFunction,Response } from 'express';
import { IRequest, SuccessRespones,ErrorRespones } from '../../interfaces/vendors/index';
import Company from '../../models/Company';
import Joi from "joi";
import i18n from "../../config/i18n";

class FormController {
   
    public static async get(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        
        var company = await Company.find({status: 1});
        var successRes = new SuccessRespones(
            200,
            i18n.__('companySuccessGetRes'),
            company
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }
   
	public static async companyInsertValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
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
                // next({code: 400,error: value.error?.details})
                next({code: 400,message: value.error?.details[0].message,error: value.error?.details})
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
            
        const company = new Company({
            name: name            
        });
    
        var companyFind = await Company.findOne({ name: name });
        
        if(companyFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('companyNotFound'),
                i18n.__('companyNotFound')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }
        var companyInsert = await company.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('companySuccessRes'),
            companyInsert
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }

    public static async companyUpdateValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
		const schema = Joi.object().keys({
            _id: Joi.string()
                    .alphanum()
                    .required()
                    .messages({
                        'any.required': i18n.__('IdRequired')
                    }),
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
                next({code: 400,message: value.error?.details[0].message,error: value.error?.details})
            } else {
                next();
            }

        }
        catch (err) {
            console.log({err})
            next(err);
            
         }
	}
    public static async update(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const _id = req.body._id;
        const name = req.body.name.toLowerCase();
    
        var companyFind = await Company.findOne({ _id: _id });
        
        if(!companyFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('companyNotFound'),
                i18n.__('companyNotFound')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }

        companyFind.name = name;
        var companyUpdate = await companyFind.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('companyUpdateSuccessRes'),
            companyUpdate
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }

    public static async delete(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const _id = req.params.id;
       
        console.log({_id})
        var companyFind = await Company.findOne({ _id: _id,status: 1 });
        
        if(!companyFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('companyNotFound'),
                i18n.__('companyNotFound')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }

        companyFind.status = 4;
        var roleUpdate = await companyFind.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('companyDeleteSuccessRes'),
            roleUpdate
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }
    
}

export default FormController;