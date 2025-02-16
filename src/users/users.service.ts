import { Injectable } from '@nestjs/common';
import { CreateUserDto }  from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UsersService {
    private users = [
        {
            id: 1,
            name: 'John Doe',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'Jane Doe',
            role: 'ENGINEER'
        },
        {
            id: 3,
            name: 'Jim Doe',
            role: 'INTERN'
        },
        {
            id: 4,
            name: 'Leo Smith',
            role: 'ADMIN'
        },
        {
            id: 5,
            name: 'Mark Doe',
            role: 'ENGINEER'
        },
        {
            id: 6,
            name: 'Jim Neo',
            role: 'INTERN'
        }
    ]

    findAll(role?: 'INTERN' | 'ENGINEER' | 'ADMIN') {
        if (role) {
            const rolesArray = this.users.filter(user => user.role === role)
            if (rolesArray.length === 0) {
                throw new NotFoundException(`User with role ${role} not found`)
            }
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`) }
        return user
    }

    create(createUserDto: CreateUserDto) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUserId = usersByHighestId[0].id + 1
        const newUser = {id: newUserId, ...createUserDto}
        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...updateUserDto}
            }
            return user
        })
        return this.findOne(id)
    }

    delete(id: number) {
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }

}
