import { Octokit,App } from "octokit";
import "dotenv/config.js"

export const octoClient = async(token:string): Promise<Octokit>=>{
   return  new Octokit({auth:token});  
}

