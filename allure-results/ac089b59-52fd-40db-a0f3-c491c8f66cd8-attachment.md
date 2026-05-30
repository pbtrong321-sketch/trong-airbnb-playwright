# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: booking.spec.ts >> BOOKING TEST >> TC_BK_005 - Refresh reset dữ liệu
- Location: tests/booking.spec.ts:93:7

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://demo5.cybersoft.edu.vn/rooms/ho-chi-minh", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test";
  2   | import { BookingPage } from "../pages/BookingPage";
  3   | import { LoginModal } from "../pages/LoginModal";
  4   | import { userAccount } from "../data/account";
  5   | import { HomePage } from "../pages/homePage";
  6   | 
  7   | 
  8   | test.describe("BOOKING TEST", () => {
  9   | 
  10  |   // ================= BEFORE EACH =================
  11  |   test.beforeEach(async ({ page }) => {
  12  |     const homePage = new HomePage(page)
  13  |     await homePage.open()
  14  |     await homePage.openLoginModal()
  15  |   // login với tk hợp lệ
  16  |     const loginModal = new LoginModal(page)
  17  |     await loginModal.login(userAccount.email, userAccount.password)
  18  |     await expect(homePage.avatarBtn).toBeVisible();
  19  | 
  20  |   // vào địa điểm cần muốn tới 
> 21  |     await page.goto("https://demo5.cybersoft.edu.vn/rooms/ho-chi-minh")
      |                ^ Error: page.goto: Test ended.
  22  |   // chọn phòng bất kỳ để vào trag detail
  23  |     await page.getByRole("link").filter({hasText: /phòng/i}).first().click();
  24  |     // đợi load trang detail
  25  |    
  26  |     await expect(page).toHaveURL("https://demo5.cybersoft.edu.vn/room-detail/1")
  27  | });
  28  | 
  29  |  
  30  |   test("TC_BK_001 - Booking thành công", async ({ page }) => {
  31  |     const bookingPage = new BookingPage(page);
  32  | 
  33  |     await bookingPage.selectDate(30,31);
  34  | 
  35  |     await bookingPage.increaseGuest(2);
  36  | 
  37  |     await bookingPage.clickBooking();
  38  | 
  39  |     await bookingPage.confirmBooking();
  40  |     await expect(bookingPage.message).toBeVisible();
  41  |     
  42  | 
  43  |   });
  44  | 
  45  | 
  46  | 
  47  |   test("TC_BK_002 - Booking trùng lịch", async ({ page }) => {
  48  |     const bookingPage = new BookingPage(page);
  49  | 
  50  |     await page.goto("https://demo5.cybersoft.edu.vn/room-detail/1");
  51  | 
  52  |     await bookingPage.selectDate(31, 31);
  53  |     await bookingPage.increaseGuest(2);
  54  | 
  55  |     await bookingPage.clickBooking();
  56  |     await bookingPage.confirmBooking();
  57  |     const message = page.locator(".ant-notification-notice-description");
  58  |     await expect(message).toBeVisible();
  59  |     // fail vì dữ liệu test vẫn thực hiện booking thành công nê không thể test trùng lịch
  60  |   
  61  |   });   
  62  |   // test("TC_BK_003 - Booking thất bại ngày đã qua", async ({ page }) => {
  63  |   //   const bookingPage = new BookingPage(page);
  64  | 
  65  |   //   await page.goto("https://demo5.cybersoft.edu.vn/room-detail/1");
  66  | 
  67  |   //   await bookingPage.selectDate(15, 17);
  68  |   //   await bookingPage.increaseGuest(2);
  69  | 
  70  |   //   await bookingPage.clickBooking();
  71  |   //   await bookingPage.confirmBooking();
  72  |   //   const message = page.locator(".ant-notification-notice-description");
  73  |   //   await expect(message).toBeVisible({ timeout: 30000 });
  74  |   // }) // bị khoá button chọn phòng những ngày đã qua
  75  |   
  76  | 
  77  |   
  78  |   test("TC_BK_004 - Vượt số khách", async ({ page }) => {
  79  |     const bookingPage = new BookingPage(page);
  80  | 
  81  |     await page.goto("https://demo5.cybersoft.edu.vn/room-detail/1");
  82  | 
  83  |     await bookingPage.selectDate(31,31);
  84  |     await bookingPage.increaseGuest(3);
  85  |   
  86  |     const message = page.locator(".ant-message-custom-content").last();
  87  | 
  88  |     await expect(message).toBeVisible({ timeout: 30000 });
  89  | 
  90  |     await expect(message).toContainText(/tối đa/i);
  91  |   });
  92  | 
  93  |   test("TC_BK_005 - Refresh reset dữ liệu", async ({ page }) => {
  94  |     const bookingPage = new BookingPage(page);
  95  | 
  96  |     await page.goto("https://demo5.cybersoft.edu.vn/room-detail/1");
  97  | 
  98  |     await bookingPage.selectDate(29, 31);
  99  |     await bookingPage.increaseGuest(2);
  100 | 
  101 |     await page.reload();
  102 | 
  103 |     await expect(page.locator("text=Nhận phòng")).toBeVisible();
  104 |   });
  105 |   
  106 | 
  107 |     
  108 | })
  109 | test("TC_BK_006 - Chưa login", async ({ page }) => {
  110 |     //
  111 |     const bookingPage = new BookingPage(page);
  112 |     await page.goto("https://demo5.cybersoft.edu.vn/room-detail/1");
  113 |     await bookingPage.selectDate(31, 31);
  114 |     await bookingPage.increaseGuest(2);
  115 |     await bookingPage.clickBooking();
  116 |     await bookingPage.confirmBooking();
  117 |     await expect(page.getByText(/vui lòng đăng nhập/i)).toBeVisible();
  118 |   })
  119 | 
```