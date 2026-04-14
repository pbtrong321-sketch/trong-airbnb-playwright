import { Locator, Page } from "@playwright/test";

export class LoginModal {
    readonly page: Page
    readonly modal: Locator
    readonly emailInput: Locator
    readonly passwordInput: Locator
    readonly loginBtn: Locator

    constructor(page: Page) {
        this.page = page
        this.modal = page.locator('.ant-modal-content')
        this.emailInput = this.modal.locator('input[name="email"]')
        this.passwordInput = this.modal.locator('input[name="password"]')
        this.loginBtn = this.modal.locator('button[type="submit"]')
    }
// hàm đăng nhập
     async login(email: string, password: string) {
        await this.emailInput.fill(email)   
        await this.passwordInput.fill(password)
        await this.loginBtn.click()
    }
}


