import dotenv from "dotenv";
import { Controller } from "tsoa";
import cloudinary from "cloudinary";
import streamifier from "streamifier"
import sizeOf from "image-size"

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

    /**
     * 
     * @param file 
     * @returns Array of url for multiple upload file or url for single file upload
     */
    public async uploadFile (file : any) : Promise<any> {

        if (Array.isArray(file)){
            const urls : any = [];
            for (const item of file){
                const newPath = await this.cloudinaryImageUploadMethod(item)
                console.log("newPath", newPath)
                urls.push(newPath)
            }
            
            return urls
        }else {
           const url = await this.cloudinaryImageUploadMethod(file)
           return url;
        }

    }  

    private async cloudinaryImageUploadMethod(file : any) : Promise<any> {


        const dimensions :any = sizeOf(file.buffer)

        return new Promise((resolve, rejects) => {
            
            //Check extension for upload file
            if((file.mimetype === 'image/jpg' ) || (file.mimetype === 'mage/jpeg') || (file.mimetype === 'image/png')) {
               
                //Check size
                if(dimensions.height < 1000 || dimensions.width < 1000) {
                    rejects("minimal width image must be 1000 and minamal height must be 1000 ")
                }
                const uploadStream = cloudinary.v2.uploader.upload_stream({
                    folder: "foo",
                    transformation: [
                        {overlay: "grey_hq8zce", width: 0.5, height: 0.08, flags: "relative", opacity: 20, gravity: "east", y:250},
                        {if: "w_gt_2000"},
                        {overlay: {font_family: "Arial", font_size: 50, text: 'author pad'}, opacity: 90, color: "white", y:310 , x:250},
                        {overlay: "whiteBhentImage_s7hclz", width: 750, height:100, y:230, x:100},
                        {if: "else"},
                        {overlay: {font_family: "Arial", font_size: 20, text: 'author name'}, opacity: 90, color: "white", y:275 , x:130},
                        {overlay: "whiteBhentImage_s7hclz", width: 300, height:40, y:240, x:220},
                        {if: "end"}
                    ]
                },
                (error, result) => {
                    if(error){
                        console.log();
                        console.log("** File Upload (Promise)");
                        console.warn(error);
                        rejects(error)
                    } else {
                        console.log();
                        console.log("** File Upload (Promise)");
                        console.log("* public_id for the uploaded image is generated by Cloudinary's service.");
                        let url = result?.secure_url
                        console.log ("result", result)
                        resolve(url)
                    }  
                    
                })
                streamifier.createReadStream(file.buffer).pipe(uploadStream)
                
            } else {
                rejects('You must upload jpg, jpeg or png file !');
            }
           
        })
    }
}

