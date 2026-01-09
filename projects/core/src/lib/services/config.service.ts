import { Injectable } from '@angular/core';
import { environment } from '../config/environment';
import { Environment } from '../config/environment.interface';

@Injectable({
    providedIn: 'root'
})
export class ConfigService {
    private config: Environment = environment;

    get production(): boolean {
        return this.config.production;
    }

    get apiUrl(): string {
        return this.config.apiUrl;
    }

    get apiTimeout(): number {
        return this.config.apiTimeout;
    }

    get enableLogging(): boolean {
        return this.config.enableLogging;
    }

    get remotes() {
        return this.config.remotes;
    }

    get features() {
        return this.config.features;
    }

    getApiEndpoint(path: string): string {
        return `${this.apiUrl}/${path}`;
    }

    getRemoteUrl(remoteName: string): string | undefined {
        return this.config.remotes?.[remoteName];
    }

    isFeatureEnabled(feature: keyof Environment['features']): boolean {
        return this.config.features?.[feature] ?? false;
    }
}