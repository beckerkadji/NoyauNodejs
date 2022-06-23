import { Body, FormField, Get, Post, Route, Tags, UploadedFile, Request } from "tsoa";
import {  IResponse, My_Controller } from "./controller";
import { ResponseHandler } from "../../src/config/responseHandler";
import code from "../../src/config/code";
import PostType from "../types/postType";
import { postSchema } from "../validations/post.validation";
const response = new ResponseHandler()

@Tags("Post Controller")
@Route("/post")

export class postController extends My_Controller {

    @Post("")
    public async create(
        @FormField() title : string,
        @FormField() description : string,
        @UploadedFile() image : Express.Multer.File,
    ): Promise<IResponse> {
        try {
        //    const validate =  this.validate(postSchema, body)
        //    if(validate !== true)
        //        return response.liteResponse(code.VALIDATION_ERROR, 'Validation error', validate)
        let uploaded = await this.uploadFile(image)
        console.log("upload", uploaded)
            
            
            return response.liteResponse(code.SUCCESS, "User created with success !", )
        }catch(e){
            return response.catchHandler(e)
        }

    }
}