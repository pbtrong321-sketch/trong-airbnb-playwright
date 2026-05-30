import { test, expect } from '@playwright/test'
import { HomePage } from '../pages/homePage'
import { LoginModal } from '../pages/LoginModal'
import { adminAccount } from '../data/account'
import { AdminPage } from '../pages/AdminPage'


test.describe('Admin page', () => {

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)

    await homePage.open()
    await homePage.openLoginModal()

    const loginModal = new LoginModal(page)
    await loginModal.login(adminAccount.email, adminAccount.password)

    await homePage.avatarBtn.click()

    const adminMenuItem = page.getByRole('link', { name: /To page Admin/i })
    await expect(adminMenuItem).toBeVisible()
    await adminMenuItem.click()
  })

  test('test case 1: kiểm tra URL sau khi vào trang admin', async ({ page }) => {
    const adminPage = new AdminPage(page)

    await expect(page).toHaveURL(/\/admin$/)
    await expect(adminPage.userManagementMenu).toBeVisible()
    await expect(adminPage.locationManagementMenu).toBeVisible()
    await expect(adminPage.roomManagementMenu).toBeVisible()
    await expect(adminPage.bookingManagementMenu).toBeVisible()
  })
})