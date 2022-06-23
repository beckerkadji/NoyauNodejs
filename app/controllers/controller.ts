import { any } from "joi";
import multer from "multer";
import { Controller } from "tsoa";
import { ValidateError } from "tsoa";


export interface IResponse {
    code : number,

    message ?: string,

    data?: any
}

export class My_Controller extends Controller {


    public validate (schema: any, fields:any) : boolean | object {
        
        const validation  = schema.validate(fields,  { abortEarly: false });
        let errors : any = {};
        if (validation.error){
            for (const field of validation.error.details){
                errors[field.context.key] = field.message
            }
            return errors;
        }else {
            return true
        }
        
    }

    public async uploadFile (file : Express.Multer.File) : Promise <any>{
        const storage  = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, 'tmp/upload')
            },
            filename : (req, file, cb) => {
                
            }
        })

        const upload = multer({ storage: storage})
        return upload
    }



   
}

