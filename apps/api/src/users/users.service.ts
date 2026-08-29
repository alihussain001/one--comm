import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    
    createUser(name: string){
        return{
            message: "User created sucessfully",
            name,
        }
    }
}
