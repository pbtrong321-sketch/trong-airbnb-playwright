import {} from "@playwright/test"
import { Page } from "@playwright/test"

export class AdminPage {
    readonly page: Page
    readonly siderbarMenu: Locator
    readonly userManagementMenu : Locator
    readonly locationManagementMenu: Locator
    readonly roomManagementMenu: Locator
    readonly bookingManagementMenu: Locator

    constructor(page: Page) {
        this.page = page
        this.siderbarMenu = page.locator('ul[role="menu"]')
        this.userManagementMenu = page.getByRole('link',{ name: 'Quản lý người dùng' })
        this.locationManagementMenu = page.getByRole('link',{ name: 'Quản lý vị trí' })
        this.roomManagementMenu = page.getByRole('link',{ name: 'Quản lý Room' })
        this.bookingManagementMenu = page.getByRole('link',{ name: 'Quản lý Booking' })
        
    }
async navigateToUserManagement() {
    await Promise.all([
        this.page.waitForURL(/.*\/admin/),
        this.userManagementMenu.click()
    ])
}
}
