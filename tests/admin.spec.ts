import { test, expect} from "@playwright/test"
import { HomePage } from "../pages/homePage"
import { LoginModal } from "../pages/LoginModal"
import { AdminPage } from "../pages/adminPage"
import { adminAccount } from "../data/account"

test.describe('Admin Page Tests', () => {
    //beforEch test đăng nhập vào trang admin
    test.beforeEach(async ({ page }) => {
        // login vào trang admin
        const homePage = new HomePage(page)
        await homePage.open()
        // mở modal login
        await homePage.openLoginModal()
        // login với tk hợp lệ
        const loginModal = new LoginModal(page)
        await loginModal.login(adminAccount.email, adminAccount.password)
        // click vào menu To page admin
        await homePage.avtBtn.click()
        const adminMenuItem = page.getByRole('link', { name: 'To page Admin' })
        await adminMenuItem.click()
        

    })
    // tc1 xác nhận đã vào url admin
    test("tc1: Verify admin page URL", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await expect(page).toHaveURL(/.*\/admin/)//url có chứa /admin
        await expect(adminPage.siderbarMenu).toBeVisible()// xác nhận hiển thị menu sidebar
        await expect(adminPage.userManagementMenu).toBeVisible()// xác nhận hiển thị menu quản lý người dùng
        await expect(adminPage.locationManagementMenu).toBeVisible()//  xác nhận hiển thị menu quản lý vị trí
        await expect(adminPage.roomManagementMenu).toBeVisible()//  xác nhận hiển thị menu quản lý room 
        await expect(adminPage.bookingManagementMenu).toBeVisible()//  xác nhận hiển thị menu quản lý booking
    })
    // tc2 xác nhận điều hướng đến trang quản lý người dùng
    test("tc2: Navigate to User Management", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.navigateToUserManagement()
        await expect(page).toHaveURL(/.*\/admin/) //url có chứa /admin
  
    })
    //tc3 xác nhận điều hướng đến trang quản lý vị trí
    test("tc3: Navigate to Location Management", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.locationManagementMenu.click()
        await expect(page).toHaveURL(/.*\/admin\/location/) //url có chứa /admin/location
    })
    //tc4 xác nhận điều hướng đến trang quản lý room
    test("tc4: Navigate to Room Management", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.roomManagementMenu.click()
        await expect(page).toHaveURL(/.*\/admin\/room/) //url có chứa /admin/room
    })
    //tc5 xác nhận điều hướng đến trang quản lý booking
    test("tc5: Navigate to Booking Management", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.bookingManagementMenu.click()
        await expect(page).toHaveURL(/.*\/admin\/booking/) //url có chứa /admin/booking
    })
    //tc6 hiển thị bảng danh sách người dùng trong trang quản lý người dùng
    test("tc6: Verify user list table in User Management page", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.navigateToUserManagement()
        const userTable = page.locator('table') // giả sử bảng danh sách người dùng được hiển thị dưới dạng thẻ <table>
        await expect(userTable).toBeVisible() // xác nhận bảng danh sách người dùng hiển thị
        // có thể thêm các xác nhận khác như kiểm tra số lượng hàng, cột, hoặc dữ liệu cụ thể trong bảng
    })
    //tc7 xác nhận chức năng tìm kiếm người dùng bằng email trong trang quản lý người dùng
         // click vào thanh tìm kiếm vào nhập email cần tìm kiếm
    test("tc7: Verify search user by email in User Management page", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.navigateToUserManagement()
        const searchInput = page.getByPlaceholder('Tìm kiếm') // giả sử có một input tìm kiếm với placeholder 'Tìm kiếm theo email'
        await searchInput.fill(adminAccount.email) // nhập email cần tìm kiếm
        await searchInput.press('Enter') // nhấn Enter để thực hiện tìm kiếm
        // hiển thị danh sách người dùng sau khi tìm kiếm
        await expect(page.locator('table')).toBeVisible() // xác nhận bảng danh sách người dùng hiển thị sau khi tìm kiếm
        // có thể thêm các xác nhận khác như kiểm tra số lượng hàng, cột, hoặc dữ liệu cụ thể trong bảng sau khi tìm kiếm
    
    })  
    //tc8 tìm kiếm theo mã id người dùng trong trang quản lý người dùng
    test("tc8: Verify search user by ID in User Management page", async ({ page }) => {
        const adminPage = new AdminPage(page)
        await adminPage.navigateToUserManagement
        const searchInput = page.getByPlaceholder('Tìm kiếm') // giả sử có một input tìm kiếm với placeholder 'Tìm kiếm
        await searchInput.fill('123') // nhập mã id người dùng cần tìm kiếm
        await searchInput.press('Enter') // nhấn Enter để thực hiện tìm kiếm
        // hiển thị danh sách người dùng sau khi tìm kiếm
        await expect(page.locator('table')).toBeVisible() // xác nhận bảng danh sách người dùng hiển thị sau khi tìm kiếm
    })

    
    

    

})