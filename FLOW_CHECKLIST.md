# Flow Checklist

Manual verification checklist for the current `lastbite-web` mock app. These flows use local/mock state, not live Firebase writes.

## Customer Flow Check
- [ ] Open `/` and verify the landing page loads with working CTA links to `/app`, `/login`, and `/merchant`
- [ ] Open `/login` and verify both entry buttons work: customer goes to `/app`, merchant goes to `/merchant`
- [ ] Open `/register` and verify the mock signup CTA routes into `/app`
- [ ] Open `/app` and verify the customer shell, header cart badge, and mobile bottom navigation render correctly
- [ ] From `/app`, open `/app/search` and verify typing updates product results
- [ ] From `/app`, open category links and verify `/app/categories/[categoryId]` filters products correctly
- [ ] Open a store from home or category flow and verify `/app/stores/[storeId]` shows store details and product list
- [ ] Open a product from any list and verify `/app/products/[productId]` shows price, pickup window, and add-to-cart controls
- [ ] Use quick add on product cards and verify the cart badge increments immediately
- [ ] Add products from two different stores and verify the cart reset confirmation dialog appears
- [ ] Open `/app/cart` and verify quantity update, remove item, and clear cart behaviors work
- [ ] Continue to `/app/checkout`, choose a payment method, place an order, and verify redirect to `/app/orders/[orderId]`
- [ ] Open `/app/orders` and verify active orders and history tabs show the correct items
- [ ] Open an order detail and verify status badge, pickup code, totals, and payment method display correctly
- [ ] Open `/app/profile` and verify summary stats and settings link are visible
- [ ] Open `/app/settings`, trigger demo suspend, and verify customer routes show the suspended state
- [ ] Open `/offline` and verify the offline fallback page renders cleanly

## Merchant Flow Check
- [ ] Open `/merchant` and verify the merchant shell, sidebar navigation, and store summary cards render
- [ ] On `/merchant`, verify recent orders and top products cards link to their management pages
- [ ] Open `/merchant/products` and verify product rows load for the merchant’s store only
- [ ] Enter edit mode on a product and verify price and stock fields update local state
- [ ] Use “เปลี่ยนสถานะ” on a product and verify status cycles through the available values
- [ ] Open `/merchant/orders` and verify only that merchant’s orders are listed
- [ ] Advance an order status and verify the badge text updates immediately in local state
- [ ] Open `/merchant/settings` and verify editing store fields updates the merchant store data in-session
- [ ] Return to `/merchant` after editing settings and verify updated store values are reflected where shown
