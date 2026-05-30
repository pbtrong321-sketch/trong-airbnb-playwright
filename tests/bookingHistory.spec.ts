import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { LoginModal } from '../pages/LoginModal'
import { userAccount } from '../data/account'

test.describe('Booking history tests', () => {
    test("Kiểm tra lịch sử thuê phòng ", async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.open()
        await homePage.openLoginModal()
        // login với tk hợp lệ
        const loginModal = new LoginModal(page)
        await loginModal.login(userAccount.email, userAccount.password)

        await homePage.avatarBtn.click()
        const dashboardMenuItem = page.getByRole('link', { name: 'Dashboard' })
        await dashboardMenuItem.click()
        await expect(page).toHaveURL(/.*\/info-user/)
        // lịch sử đã thuê phòng hiện ở table 
        const bookingHistory = page.getByRole("heading", {name:"Phòng đã thuê"})
        await expect(bookingHistory).toBeVisible()

    })
})



