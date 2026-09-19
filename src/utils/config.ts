import path from "path";
import  * as dotEnv from 'dotEnv'
import { ViewportSize } from "@playwright/test";

interface EnvVars {
    BASEURL: string;
    HEADLESS: boolean;
    TEST_ENV: string;
    TEST_BROWSER_VIEWPORT: string;

}

export class Config{
    private envVars: EnvVars;

    constructor() {
        const env = process.env.TEST_ENV || 'LOCAL'; 
        const envFileName = env === 'LOCAL' ? '. env.local' : env
        const envFilePath = path.resolve(__dirname, '..', '..', 'resources', envFileName)
        dotEnv.config({path: envFilePath});

        this.envVars = {
            HEADLESS: process.env.HEADLESS === 'false' ? false : true,
            TEST_ENV: process.env.TEST_ENV || 'STAGING',
            TEST_BROWSER_VIEWPORT: process.env.TEST_BROWSER_VIEWPORT || '{"width": 1920, "height":1080}',
            BASEURL: process.env.BASEURL || ''
        }
    }

    get testEnv(): string {
        return this.envVars.TEST_ENV;
    }
    get testBrowserViewPort(): ViewportSize {
        return JSON.parse(this.envVars.TEST_BROWSER_VIEWPORT)
    }
    get baseUrl(): string {
        return this.envVars.BASEURL;
    }

    
}