import { expect, test } from '@playwright/test'

const blogUrlPattern = /.*blog/
const docsUrlPattern = /.*docs/
const experiencePattern = /experience/i

test.describe('Navigation', () => {
  test('should navigate to the blog page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Blog')

    await expect(page).toHaveURL(blogUrlPattern)
  })

  test('should navigate to the docs page', async ({ page }) => {
    await page.goto('/')

    await page.click('text=Docs')

    await expect(page).toHaveURL(docsUrlPattern)
  })

  test('should have a working home link', async ({ page }) => {
    await page.goto('/blog')

    await page.click('text=WW')

    await expect(page).toHaveURL('/')
  })
})

test.describe('Homepage', () => {
  test('should display the main heading', async ({ page }) => {
    await page.goto('/')

    const heading = page.locator('h1')
    await expect(heading).toBeVisible()
  })

  test('should display experience section', async ({ page }) => {
    await page.goto('/')

    const experienceSection = page.getByText(experiencePattern).first()
    await expect(experienceSection).toBeVisible()
  })
})
