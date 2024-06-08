import {PrismaClient} from "@prisma/client"
declare global{
    var prisma:PrismaClient | undefined
}

//Prisma client ?? to prevent from creating multiple clients
export const db = global.prisma || PrismaClient();