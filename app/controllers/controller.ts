import dotenv from "dotenv";
import { Controller } from "tsoa";
import cloudinary from "cloudinary";
import axios from "axios";
const FormData =  require("form-data")

dotenv.config();

cloudinary.v2.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUNDINARY_API_SECRET
})


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

    public async uploadFile (image : Express.Multer.File) : Promise <any>{
       


        // const response : any = await axios.post(
        //     `${process.env.CLOUDINARY_DIRECT_UPLOAD}`,
        //     {
        //        file : image,
        //        upload_preset : "hp9kqb3o"
        //     }
        // ).catch((err) =>{
        //     console.warn(err)
        // })
        
        const data : any = {}
        cloudinary.v2.uploader.upload(
            "https://res.cloudinary.com/demo/image/upload/l_fetch:aHR0cHM6Ly9yZXMuY2xvdWRpbmFyeS5jb20vZGVtby9pbWFnZS91cGxvYWQvbG9nb3MvY2xvdWRpbmFyeV9mdWxsX2xvZ29fd2hpdGVfc21hbGwucG5n/fl_layer_apply/sample.jpg" ,
            { tags : "example"})
            .then( (image) => {
            console.log();
            console.log("** File Upload (Promise)");
            console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
            console.log("* " + image.public_id);
            console.log("* " + image.url);
            data.public_id =  image.public_id
            data.url = image.url;

        }).catch((err) => {
            console.log();
            console.log("** File Upload (Promise)");
            if (err) { console.warn(err); }
        })

    
        return  "request";
    }



   
}

