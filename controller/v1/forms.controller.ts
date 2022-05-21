import { NextFunction,Response } from 'express';
import { IRequest, SuccessRespones,ErrorRespones } from '../../interfaces/vendors/index';
import Forms from '../../models/Forms';
import Joi from "joi";
import i18n from "../../config/i18n";

class FormController {
   
    public static async get(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        
        var form = await Forms.find({status: 1});
        var successRes = new SuccessRespones(
            200,
            i18n.__('formSuccessGetRes'),
            form
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }
   
	public static async formInsertValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
		const schema = Joi.object().keys({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required()
                .messages({
                    'any.required': i18n.__('NameRequired')
                }),
            type: Joi.string()
                    .required()
                    .messages({
                        'any.required': i18n.__('formTypeRequired')
                    }),
            field: Joi.string()
                    .required()
                    .messages({
                        'any.required': i18n.__('formFieldRequired')
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
            
        const form = new Forms({
            name: name,
            // type: req.body.type,
            field: req.body.field,
            step: req.body.step,
            order: req.body.order,//@ts-ignore
            companyId: req.user.companyId._id
        });
    
        var formInsert = await form.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('formSuccessRes'),
            formInsert
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }

    public static async formUpdateValidation(req: IRequest, res:Response, next: NextFunction): Promise<any> {
        
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
            type: Joi.string()
                .required()
                .messages({
                    'any.required': i18n.__('formTypeRequired')
                }),
            field: Joi.string()
                .required()
                .messages({
                    'any.required': i18n.__('formFieldRequired')
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
    
        var formFind = await Forms.findOne({ _id: _id });
        
        if(!formFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('formNotFound'),
                i18n.__('formNotFound')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }

        formFind.name = req.body.name;
        formFind.type = req.body.type;
        formFind.field = req.body.field;
        formFind.step = req.body.step;
        formFind.order = req.body.order;
        
        var formUpdate = await formFind.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('formUpdateSuccessRes'),
            formUpdate
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }

    public static async delete(req: IRequest, res:Response, next: NextFunction): Promise<any>  {
        const _id = req.params.id;
       
        console.log({_id})
        var formFind = await Forms.findOne({ _id: _id,status: 1 });
        
        if(!formFind) {
            var errorRes = new ErrorRespones(
                400,
                i18n.__('formNotFound'),
                i18n.__('formNotFound')
            )
           return res.status((errorRes as ErrorRespones).status).json(errorRes)
        }

        formFind.status = 4;
        var formUpdate = await formFind.save();
        var successRes = new SuccessRespones(
            200,
            i18n.__('formDeleteSuccessRes'),
            formUpdate
        )
        return res.status((successRes as SuccessRespones).status).json(successRes);
        
    }
    
}

export default FormController;