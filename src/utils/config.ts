import path from "path";
import  * as dotenv from 'dotenv'
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
        const envFileMap: Record<string, string> = {
            LOCAL: '.env.local',
            STAGING: '.env.staging',
            PROD: '.env.prod',
            PRS: '.env.prs',
        };
        const envKey = (process.env.TEST_ENV || 'LOCAL').toUpperCase();
        const envFileName = envFileMap[envKey] ?? '.env.local';
        const envFilePath = path.resolve(__dirname, '..', '..', 'resources', envFileName)
        dotenv.config({path: envFilePath});

        this.envVars = {
            HEADLESS: process.env.HEADLESS === 'false' ? false : true,
            TEST_ENV: envKey,
            TEST_BROWSER_VIEWPORT: process.env.TEST_BROWSER_VIEWPORT || '{"width": 1920, "height":1080}',
            BASEURL: process.env.BASEURL || ''
        }
    }

    get testEnv(): string {
        return this.envVars.TEST_ENV;
    }
    get headless(): boolean {
        return this.envVars.HEADLESS;
    }
    get testBrowserViewPort(): ViewportSize {
        return JSON.parse(this.envVars.TEST_BROWSER_VIEWPORT)
    }
    get baseUrl(): string {
        return this.envVars.BASEURL;
    }

    
}