import { test, expect } from '@playwright/test'

test.describe('Dynamic Web App', () => {
  test('Configuration page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/configuration')
    
    // Check header
    await expect(page.locator('text=Dynamic Web App')).toBeVisible()
    await expect(page.getByRole('link', { name: 'Configuration' })).toBeVisible()
    await expect(page.getByRole('link', { name: 'Preview' })).toBeVisible()
    
    // Check page content
    await expect(page.getByRole('heading', { name: '⚙️ JSON Configurations' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Add new configuration' }).first()).toBeVisible()
    
    // Check sample config is loaded (appears in table)
    await expect(page.getByRole('cell', { name: 'Sample Page' })).toBeVisible()
  })

  test('Preview page loads correctly', async ({ page }) => {
    await page.goto('http://localhost:5173/preview')
    
    // Check header
    await expect(page.locator('text=Dynamic Web App')).toBeVisible()
    
    // Check page content
    await expect(page.getByRole('heading', { name: '👁️ Preview Configurations' })).toBeVisible()
  })

  test('Navigation works between pages', async ({ page }) => {
    await page.goto('http://localhost:5173/configuration')
    
    // Click Preview link
    await page.click('text=Preview')
    await expect(page).toHaveURL('http://localhost:5173/preview')
    
    // Click Configuration link
    await page.click('text=Configuration')
    await expect(page).toHaveURL('http://localhost:5173/configuration')
  })

  test('Add new configuration modal works', async ({ page }) => {
    await page.goto('http://localhost:5173/configuration')
    
    // Wait for the page to fully load
    await page.waitForLoadState('networkidle')
    
    // Click the first "Add new configuration" button in the content area
    await page.locator('main button:has-text("Add new configuration")').first().click()
    
    // Check modal opens
    await expect(page.getByRole('heading', { name: 'Add New Configuration' })).toBeVisible()
    
    // Check form elements
    await expect(page.getByText('JSON Configuration', { exact: true })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Save' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Cancel' })).toBeVisible()
  })

  test('Render JSON in preview page', async ({ page }) => {
    await page.goto('http://localhost:5173/preview')
    
    // Click on Sample Page config
    await page.getByRole('button', { name: /Sample Page/ }).click()
    
    // Check that config is rendered - look for Submit button in the preview
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
  })

  test('Dynamic page route works', async ({ page }) => {
    // Test /page/sample-page route (slugified from "Sample Page")
    await page.goto('http://localhost:5173/page/sample-page')
    
    // Should load the Sample Page config
    await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible()
  })

  test('Dynamic page route 404 for unknown page', async ({ page }) => {
    await page.goto('http://localhost:5173/page/unknown-page')
    
    // Should show 404
    await expect(page.getByRole('heading', { name: 'Page Not Found' })).toBeVisible()
  })
})
