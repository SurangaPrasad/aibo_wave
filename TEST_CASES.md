# Aibo Wave — Frontend Test Cases

> **Base URLs**  
> Frontend: `http://localhost:3000`  
> Backend API: `http://localhost:8001`  
> Django Admin: `http://localhost:8001/admin/`

---

## Test Accounts (create these first)

| Role   | Email                  | Password     | Notes                        |
|--------|------------------------|--------------|------------------------------|
| Admin  | `admin@aibow.fi`       | `Admin1234!` | ✅ Created (Django superuser) |
| Seller | `seller@aibow.fi`      | `Test1234!`  | ✅ Created (needs vendor approval) |
| User   | `customer@aibow.fi`    | `Test1234!`  | ✅ Created                   |

> **Note:** Registration requires `mobile_number` field (e.g. `"0412345678"`).

**Create the admin account:**
```bash
cd aibo_wave_be/backend
python3 manage.py createsuperuser
```

---

## Legend

| Symbol | Meaning              |
|--------|----------------------|
| ✅     | Expected to pass     |
| ❌     | Expected to fail/block |
| 🔒     | Auth required        |
| 👁      | Visual / UI check    |

---

## 1. Authentication (All Roles)

### 1.1 Registration

| # | Steps | Expected Result |
|---|-------|-----------------|
| R-01 | Go to `/` → click **Sign Up** | Registration modal opens |
| R-02 | Submit empty form | Required field errors shown |
| R-03 | Enter mismatched passwords | Password mismatch error |
| R-04 | Enter valid `email`, `username`, `mobile_number`, `password`, `role=customer` → Submit | ✅ Logged in, modal closes, user chip appears in header |
| R-05 | Repeat R-04 with same email | ❌ "Email already in use" error |
| R-06 | Register with `role=vendor` | ✅ Registered as customer (vendor goes through Become a Seller flow) |

### 1.2 Login

| # | Steps | Expected Result |
|---|-------|-----------------|
| L-01 | Click **Sign In** → submit empty form | Required field errors |
| L-02 | Enter wrong password | ❌ "Invalid credentials" error |
| L-03 | Enter correct `email` + `password` | ✅ JWT stored in localStorage (`aibo_access_token`), user visible in header |
| L-04 | Refresh page after login | ✅ Still logged in (token persisted) |
| L-05 | Open DevTools → Application → localStorage | Keys `aibo_access_token`, `aibo_refresh_token` exist |

### 1.3 Logout

| # | Steps | Expected Result |
|---|-------|-----------------|
| LO-01 | Click user avatar/menu → **Logout** | ✅ Tokens cleared, redirected to `/` |
| LO-02 | Navigate to `/seller` after logout | ❌ Redirected to `/` (auth guard) |
| LO-03 | Navigate to `/become-seller` after logout | ❌ "Sign in to continue" screen shown |

---

## 2. Admin Role

> Login as `admin@aibow.fi`. Access Django Admin at `http://localhost:8001/admin/`.

### 2.1 Django Admin Access

| # | Steps | Expected Result |
|---|-------|-----------------|
| A-01 | Go to `http://localhost:8001/admin/` → login | ✅ Admin dashboard loads |
| A-02 | Navigate to **User Auth → Users** | All registered users listed with `role`, `is_vendor_pending`, `is_superuser` fields visible |
| A-03 | Navigate to **Marketplace → Vendor Wallets** | Wallet records listed with balance fields |
| A-04 | Navigate to **Marketplace → Withdraw Requests** | Withdrawal requests listed with status dropdown |
| A-05 | Navigate to **Marketplace → Wallet Transactions** | Transaction ledger visible (read-only) |

### 2.2 Approve a Vendor Application

> Prerequisite: TC `S-01` completed (seller submitted vendor application).

| # | Steps | Expected Result |
|---|-------|-----------------|
| A-06 | Admin → Users → find `seller@aibow.fi` | `is_vendor_pending = True`, `role = customer` |
| A-07 | Set `role = vendor`, uncheck `is_vendor_pending` → Save | ✅ User is now a vendor |
| A-08 | Login as seller → navigate to `/seller` | ✅ Seller dashboard loads (no redirect) |

### 2.3 Reject / Manage a Vendor Application

| # | Steps | Expected Result |
|---|-------|-----------------|
| A-09 | Admin → Users → find a pending user → leave `is_vendor_pending = True`, set `role = customer` → Save | User stays as customer, can re-apply |
| A-10 | Admin → Marketplace → Withdraw Requests → open a pending request → change status to `approved` → Save | 👁 Status updated; seller's UI will reflect change |
| A-11 | Change withdraw request status to `paid` + add admin notes | 👁 Notes appear in seller's withdrawal history table |
| A-12 | Change withdraw request status to `rejected` + add admin notes | 👁 Rejection reason visible to seller |

### 2.4 Mark an Order as Paid (API)

> This simulates a payment webhook. Use curl or Postman.

| # | Steps | Expected Result |
|---|-------|-----------------|
| A-13 | `POST /marketplace/orders/<order_id>/mark-paid/` with admin JWT | ✅ `{"status":"success","message":"Order ... marked as paid"}` |
| A-14 | Repeat same order_id | ❌ `409 Conflict` — "Order is already marked as paid" |
| A-15 | Use invalid order_id `abc` | ❌ `400 Bad Request` — "Invalid order ID" |
| A-16 | After A-13 → Admin → Vendor Wallets → find seller | Balance increased by `order_subtotal × 0.90` (after 10% commission) |

---

## 3. Seller Role

> Login as `seller@aibow.fi`. Must complete steps S-01–S-03 (apply → admin approves → re-login) before accessing `/seller`.

### 3.1 Become a Seller (Multi-Step Form)

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-01 | Go to `/become-seller` while logged out | 👁 "Sign in to continue" screen |
| S-02 | Login as `customer@aibow.fi` → go to `/become-seller` | ✅ Step 1 form loads |
| S-03 | Step 1: leave store name blank → click **Continue** | ❌ Continue button disabled |
| S-04 | Step 1: enter Store Name `"Sunrise Crafts"` | Slug auto-populates as `sunrise-crafts` |
| S-05 | Edit slug manually to `"SUNRISE crafts!"` | Slug sanitised to `sunrise-crafts` (lowercase, no special chars) |
| S-06 | Click **Continue** → Step 2 | Business Info form loads |
| S-07 | Step 2: select **Company** radio | Highlighted with orange border |
| S-08 | Enter invalid URL in Website field | Browser/HTML5 validation error |
| S-09 | Click **Continue** → Step 3 | Review card shows all entered data |
| S-10 | Step 3: uncheck Terms checkbox → click **Submit Application** | Submit button disabled |
| S-11 | Check Terms → click **Submit Application** | ✅ Success screen: "Application Submitted!" |
| S-12 | Submit again (same account) | ❌ Error: "already pending" or "already a vendor" |
| S-13 | Admin approves (TC A-07) → re-login as seller | ✅ No more pending state |

### 3.2 Seller Dashboard — Overview (`/seller`)

> Requires role = vendor (admin must approve first).

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-14 | Navigate to `/seller` as vendor | ✅ Seller sidebar + Overview page loads |
| S-15 | Navigate to `/seller` as customer role | ❌ Redirected to `/` |
| S-16 | 👁 Check stat cards | "Total Products", "Total Orders", "Revenue", "Pending Orders" cards visible |
| S-17 | Resize to mobile (< 768px) | Sidebar collapses; hamburger menu appears in top-left |
| S-18 | Tap hamburger → tap a nav item | Sidebar closes after navigation |

### 3.3 Seller Products (`/seller/products`)

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-19 | Click **My Products** in sidebar | Products table loads (empty on first use) |
| S-20 | Click **Add Product** / go to product creation | Product upload form (or placeholder if not yet built) |
| S-21 | Create a product via `POST /marketplace/products/` API (or UI) | Product appears in table |
| S-22 | Click **Delete** on a product | ✅ Product removed from list (soft-delete) |
| S-23 | Delete non-existent product | ❌ Error toast shown |

### 3.4 Seller Orders (`/seller/orders`)

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-24 | Click **Orders** in sidebar | Orders table loads |
| S-25 | 👁 Check status badges | `pending` = yellow, `shipped` = blue, `delivered` = green, `cancelled` = red |
| S-26 | When no orders exist | 👁 Empty state shown (table with no rows or empty message) |

### 3.5 Seller Withdrawals (`/seller/withdrawals`)

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-27 | Click **Withdrawals** in sidebar | Wallet page loads; 4 balance cards visible |
| S-28 | Balance is `$0.00` | "Request Payout" button is disabled; "Minimum balance $50.00 required" hint visible |
| S-29 | After TC A-16 (balance ≥ $50) → refresh | "Request Payout" button becomes enabled |
| S-30 | Click **Request Payout** → form opens | Amount, Bank Name, Account Holder, Account Number, IBAN fields visible |
| S-31 | Enter amount less than $50 (e.g. `$10`) | HTML5 min validation prevents submission |
| S-32 | Enter amount greater than balance | ❌ Error: "Insufficient balance" from API |
| S-33 | Enter valid amount + bank details → Submit | ✅ Toast: "Withdrawal request submitted!"; request appears in history table with status `pending` |
| S-34 | Check **Recent Transactions** section | Debit entry appears for the withdrawal amount |
| S-35 | Check **Withdrawal History** table | Row with correct amount, date, status `pending` |

### 3.6 Seller Settings (`/seller/settings`)

| # | Steps | Expected Result |
|---|-------|-----------------|
| S-36 | Click **Settings** in sidebar | Profile edit form pre-populated with current data |
| S-37 | Clear first name → Save | ❌ Required field validation |
| S-38 | Update first name → Save | ✅ Toast success; header user chip reflects new name |
| S-39 | Click **Change Password** | Password change form appears |
| S-40 | Enter wrong current password | ❌ Error: "Current password is incorrect" |
| S-41 | Enter correct current password + new password (mismatch confirm) | ❌ Password mismatch error |
| S-42 | Enter correct current + matching new passwords | ✅ Password changed; auto re-login or prompt to login |

---

## 4. User (Customer) Role

> Login as `customer@aibow.fi`.

### 4.1 Marketplace Browsing — Public (`/marketplace`)

| # | Steps | Expected Result |
|---|-------|-----------------|
| U-01 | Go to `/marketplace` while logged out | ✅ Product grid loads (public) |
| U-02 | 👁 Check product cards | Image, name, price, vendor name visible |
| U-03 | Check URL after page loads | Query params like `?page=1` visible |

### 4.2 Filters & Search

| # | Steps | Expected Result |
|---|-------|-----------------|
| U-04 | Type in **Search** box → press Enter | URL updates to `?search=<term>`; grid refilters |
| U-05 | Click a **Category** in left sidebar | URL updates to `?category=<name>`; only matching products shown |
| U-06 | Enter vendor name in **Vendor** field | URL updates to `?vendor=<name>` |
| U-07 | Combine search + category filters | URL has both params; grid shows intersection |
| U-08 | Click **Clear All** filters | All query params removed; full grid shown |
| U-09 | On mobile (< 768px) — open filter panel | Filter toggle button visible; panel slides open |

### 4.3 Shopping Cart

| # | Steps | Expected Result |
|---|-------|-----------------|
| U-10 | Click **Add to Cart** on any product | ✅ Button changes to "In cart ×1" with orange badge |
| U-11 | Click **Add to Cart** again (same product) | Count increments: "In cart ×2" |
| U-12 | Add product from a different vendor | 👁 Cart is grouped by vendor (separate VendorCart entries) |
| U-13 | Refresh page | ✅ Cart persists (Zustand localStorage key `aibo-cart`) |
| U-14 | Open DevTools → Application → localStorage → `aibo-cart` | Vendor-grouped cart JSON present |

### 4.4 Profile

| # | Steps | Expected Result |
|---|-------|-----------------|
| U-15 | Navigate to `/dashboard` | Dashboard loads with user info |
| U-16 | Click profile section | Current user data displayed |

### 4.5 Become a Seller (from Customer)

| # | Steps | Expected Result |
|---|-------|-----------------|
| U-17 | Go to `/become-seller` while logged in as customer | ✅ Multi-step form loads |
| U-18 | Complete all steps → Submit | ✅ Success screen; `is_vendor_pending = True` set in backend |
| U-19 | Go to `/become-seller` again (pending) | ❌ Error: "Application already pending" |

---

## 5. Navigation & Layout

| # | Steps | Expected Result |
|---|-------|-----------------|
| N-01 | Check main header nav links | Home, About, Marketplace, Societies, Stories visible |
| N-02 | Click **Marketplace** in nav | `/marketplace` page loads |
| N-03 | On mobile → check hamburger menu | All nav links accessible |
| N-04 | Logged-in user → check header | User chip / avatar visible (not auth buttons) |
| N-05 | Logged-out user → check header | **Sign In** / **Sign Up** buttons visible |

---

## 6. API Boundary Tests (via curl or Postman)

### 6.1 Authentication Guards

| # | Endpoint | Scenario | Expected |
|---|----------|----------|----------|
| API-01 | `GET /marketplace/vendor/wallet/` | No token | `401 Unauthorized` |
| API-02 | `GET /marketplace/vendor/wallet/` | Customer token (non-vendor) | `403 Forbidden` |
| API-03 | `GET /marketplace/vendor/wallet/` | Vendor token | `200 OK` with wallet data |
| API-04 | `POST /marketplace/vendor/withdrawals/` | Amount = `$30` (below min) | `400 Bad Request` — minimum $50 |
| API-05 | `POST /marketplace/vendor/withdrawals/` | Amount > balance | `400 Bad Request` — insufficient balance |
| API-06 | `POST /auth/vendor-application/` | Already a vendor | `400 Bad Request` |
| API-07 | `POST /auth/vendor-application/` | Already pending | `400 Bad Request` |

### 6.2 Commission Calculation (after TC A-13)

| # | Scenario | Expected |
|---|----------|----------|
| API-08 | Order subtotal = `$100.00` | Vendor wallet credited `$90.00` (10% = `$10.00`) |
| API-09 | Order subtotal = `$33.33` | Commission = `$3.33`, vendor earns `$30.00` (rounded to 2dp) |
| API-10 | Sub-order with vendor_id not yet having a wallet | Wallet auto-created via `get_or_create` → then credited |

---

## 7. Edge Cases & Error States

| # | Scenario | Expected Result |
|---|----------|-----------------|
| E-01 | Backend is down → load `/marketplace` | Error state shown (not blank white screen) |
| E-02 | Invalid JWT in localStorage → refresh page | Auto-logout or token refresh attempt |
| E-03 | Seller navigates to `/seller` with expired token | Redirect to `/` (auth guard) |
| E-04 | User manually navigates to `/seller/withdrawals` without vendor role | Redirected to `/` |
| E-05 | `POST /marketplace/orders/INVALID_ID/mark-paid/` | `400 Bad Request` — "Invalid order ID" |
| E-06 | Marketplace page with no products matching filters | Empty state (no crash) |
| E-07 | Withdrawal form: bank_name blank | ❌ Required field prevents submission |
| E-08 | Store slug with spaces / capitals in Become a Seller | Auto-sanitised to lowercase hyphenated slug |

---

## Test Execution Order (Recommended)

```
1. Create admin account (createsuperuser)
2. Register customer@aibow.fi         → TC R-04
3. Register seller@aibow.fi           → TC R-04
4. Auth tests                          → TC L-01 to LO-03
5. Seller applies                      → TC S-02 to S-12
6. Admin approves seller               → TC A-06 to A-08
7. Seller dashboard tests              → TC S-14 to S-42
8. Admin marks order paid              → TC A-13 to A-16
9. Seller withdrawal tests             → TC S-27 to S-35
10. Customer marketplace tests         → TC U-01 to U-19
11. API boundary tests                 → TC API-01 to API-10
12. Edge case tests                    → TC E-01 to E-08
```
