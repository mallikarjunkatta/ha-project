import path from "path";
import  * as dotEnv from 'dotEnv'

interface EnvVars {
    BASEURL: string;
}

export class Config{
    private EnvVars;

    constructor() {
        const env = process.env.TEST_ENV || 'LOCAL'; 
        const envFileName = env === 'LOCAL' ? '. env.local' : env
        const envFilePath = path.resolve(__dirname, '..', '..', 'resources', envFileName)
        dotEnv.config({path: envFilePath})

        this.EnvVars = {

        }
    }
}