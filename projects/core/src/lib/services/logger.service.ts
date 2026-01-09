import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    constructor(private config: ConfigService) { }

    log(message: string, ...args: any[]): void {
        if (this.config.enableLogging) {
            console.log(`[LOG] ${message}`, ...args);
        }
    }

    error(message: string, ...args: any[]): void {
        if (this.config.enableLogging) {
            console.error(`[ERROR] ${message}`, ...args);
        }
    }

    warn(message: string, ...args: any[]): void {
        if (this.config.enableLogging) {
            console.warn(`[WARN] ${message}`, ...args);
        }
    }

    info(message: string, ...args: any[]): void {
        if (this.config.enableLogging) {
            console.info(`[INFO] ${message}`, ...args);
        }
    }
}