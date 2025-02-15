import { Injectable } from '@nestjs/common';

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
            return this.users.filter(user => user.role === role)
        }
        return this.users
    }

    findOne(id: number) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    create(user: {name: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        const usersByHighestId = [...this.users].sort((a, b) => b.id - a.id)
        const newUserId = usersByHighestId[0].id + 1
        const newUser = {id: newUserId, ...user}
        this.users.push(newUser)
        return newUser
    }

    update(id: number, userUpdate: {name: string, role: 'INTERN' | 'ENGINEER' | 'ADMIN'}) {
        this.users = this.users.map(user => {
            if (user.id === id) {
                return {...user, ...userUpdate}
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
