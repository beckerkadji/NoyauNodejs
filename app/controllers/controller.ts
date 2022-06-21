import { Controller } from "tsoa";
import { ValidateError } from "tsoa";


export class My_Controller extends Controller {

    public validate (schema: any, fields:any) {
        
        const validation  = schema.validate(fields, {abortEarly : false});
        let errors : any = {};
        if (validation.error){
            for (const field of validation.error.details){
                errors[field.context.key] = field.message
            }
            throw new ValidateError(errors, "Validation error");

        }
        return;
    }
   
}

