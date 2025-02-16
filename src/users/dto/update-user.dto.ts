// import { IsOptional, IsEnum, IsString } from 'class-validator';


// export class UpdateUserDto {
//     @IsOptional()
//     name: string;

//     @IsOptional()
//     role: 'INTERN' | 'ENGINEER' | 'ADMIN';
// }

import { CreateUserDto } from "./create-user.dto";
import { PartialType } from "@nestjs/mapped-types"

export class UpdateUserDto extends PartialType(CreateUserDto) { }