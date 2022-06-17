import  UserType  from "app/types/userType";
import { Body, Get, Post, Route, Tags } from "tsoa";
import {  My_Controller } from "./controller";

// interface Iuser {
//     name : string,
//     age : number
// }

@Tags("User Controller")
@Route("/user")
export class UserController extends My_Controller {
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
    
    @Post("")
    public async create(
        @Body() body : UserType.userCreateFields
    ): Promise<any> {
        try {
            console.log(body);

            return body;

        }catch(e){
            console.error(e)
        }

    }
}