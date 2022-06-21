import { Body, Get, Post, Route, Tags } from "tsoa";

import {  My_Controller } from "./controller";
import UserType from "../types/userType";
import { userSchema } from "../validations/user.validation";


@Tags("User Controller")
@Route("/user")
export class UserController extends My_Controller {

    @Post("")
    public async create(
        @Body() body : UserType.userCreateFields
    ): Promise<any> {
        try {
            this.validate(userSchema, body)

            return

        }catch(e){
            console.error(e)
        }

    }
    @Get("")
    public async getALL() : Promise<any> {
        try {
            const data : any = [
                {   
                     "nom" : "becker",
                     "age" : 21
                },
                {
                    "nom" : "becker",
                    "age" : 21
                } 
            ]
            console.log(data)
            return data

        }catch(e){
            console.error(e)
        }
    } 
}