
import time
from playwright.sync_api import sync_playwright

def verify_home_changes():
    with sync_playwright() as p:
        # Launch browser
        browser = p.chromium.launch(headless=True)
        context = browser.new_context(viewport={'width': 1280, 'height': 800})
        page = context.new_page()

        try:
            print("Navigating to home...")
            page.goto("http://localhost:4200/en/")

            # Wait for content to load
            page.wait_for_selector('jsl-home', timeout=10000)

            # 1. Verify Chat Bubble (Global)
            print("Checking Chat Bubble...")
            # It might be in app.html
            chat_bubble = page.locator('jsl-chat-bubble')
            if chat_bubble.count() > 0:
                print(f"Chat bubble found: {chat_bubble.count()} instance(s).")
                if chat_bubble.first.is_visible():
                    print("Chat bubble is visible.")
                else:
                    print("Chat bubble is hidden (might differ based on scroll or init).")
            else:
                print("Chat bubble NOT found.")

            # 2. Verify Image Comparison
            print("Checking Image Comparison...")
            image_comparison = page.locator('jsl-image-comparison')
            if image_comparison.count() > 0:
                image_comparison.scroll_into_view_if_needed()
                time.sleep(1)
                if image_comparison.is_visible():
                    print("Image comparison component is visible.")
                else:
                    print("Image comparison component found but not visible.")
            else:
                print("Image comparison component NOT found.")

            # 3. Verify Search Shortcut Hint
            print("Checking Search Shortcut Hint...")
            # Open search via click to see the hint
            search_trigger = page.locator('.search-trigger')
            if search_trigger.is_visible():
                search_trigger.click()
                time.sleep(1)

                search_overlay = page.locator('app-search-overlay')
                if search_overlay.is_visible():
                     print("Search overlay opened.")

                     # Check for hint text
                     hint = page.locator('.shortcut-hint')
                     if hint.is_visible():
                         print(f"Shortcut hint is visible: {hint.inner_text()}")
                     else:
                         print("Shortcut hint NOT visible.")

                     # Close it
                     page.keyboard.press("Escape")
                else:
                     print("Search overlay did NOT open.")
            else:
                print("Search trigger not visible.")

            # 4. Verify Social Proof Toast
            print("Waiting for Social Proof Toast (waiting 15s more)...")
            time.sleep(15)
            # Correct selector: .toast-container .toast
            toast = page.locator('.toast-container .toast')
            if toast.count() > 0:
                print(f"Toast found: {toast.first.inner_text()}")
            else:
                print("No toast found yet.")

            # Take final screenshot
            page.screenshot(path="final_verification.png")

        except Exception as e:
            print(f"Error: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_home_changes()
