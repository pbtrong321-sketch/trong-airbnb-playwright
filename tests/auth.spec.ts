import { test, expect } from '@playwright/test'
import { LoginModal } from '../pages/LoginModal'
import { HomePage } from '../pages/homePage'
import { adminAccount } from '../data/account'

test.describe('Authentication Tests', () => {
    test('Login with valid account', async ({ page }) => {
        const homePage = new HomePage(page)
        await homePage.open()
        await homePage.openLoginModal()
        // login với tk hợp lệ
        const loginModal = new LoginModal(page)
        await loginModal.login(adminAccount.email, adminAccount.password)

        //case 1 hiển thị tên người dùng
        await expect(homePage.avtBtn).toContainText(adminAccount.name)
        //case 2 hiển thị vai trò menu To page admin
        await homePage.avtBtn.click()
        const adminMenuItem = page.getByRole('link', { name: 'To page Admin' })
        await expect(adminMenuItem).toBeVisible()
        
    })  
    
})