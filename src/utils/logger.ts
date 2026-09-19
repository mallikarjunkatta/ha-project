import winston from "winston";

const appLogger: winston.Logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.combine(
                winston.format.colorize(),
                winston.format.simple(),
            )
        })
    ]
})
export class Logger {
    public static logging: winston.Logger = appLogger;
}