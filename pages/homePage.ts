import {} from '@playwright/test'
import { Locator, Page } from "@playwright/test";

export class HomePage {
    readonly page: Page
    readonly baseURL = 'https://demo5.cybersoft.edu.vn/'
    // locator button avt ở header
    readonly avtBtn: Locator
    // locator login button ở header
    readonly loginMenuBtn: Locator

    constructor (page: Page) {
        this.page = page
        // button img có class h-10 nằm trong button
        this.avtBtn = this.page.locator('button:has(img.h-10)')
    //    nút đăng nhập trong menu
        this.loginMenuBtn = this.page.getByRole('button', { name: 'Đăng Nhập' })

    }

    // hàm mở trang chủ
    async open() {
        await this.page.goto(this.baseURL)
    }
    // hàm mở popup dăng nhập
    async openLoginModal() {
        await this.avtBtn.click()
        await this.loginMenuBtn.click()
    }
}