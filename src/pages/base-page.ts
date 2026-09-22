import { Page } from '@playwright/test';

/**
 * Shared base class for page objects.
 * Holds the Playwright `page` handle so subclasses don't have to
 * redeclare the same field/constructor boilerplate.
 */
export abstract class BasePage {
    constructor(protected readonly page: Page) {}
}
