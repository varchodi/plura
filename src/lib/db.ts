import {PrismaClient} from "@prisma/client"
declare global{
    var prisma:PrismaClient | undefined
}

//Prisma client ?? to prevent from creating multiple clients
export const db = globalThis.prisma || PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;