import {PrismaClient} from "../generated/prisma/client.js"
import {PrismaPg} from "@prisma/adapter-pg"
import "dotenv/config"
const dbString = process.env.DATABASE_URL
if(!dbString){
    throw new Error("Database errro!")
}
const adapter = new PrismaPg({
    connectionString:dbString
})
export const dbClient = new PrismaClient({adapter})
