# QA Checklist — Skeleton

> Adapta este skeleton a los flujos de tu aplicación.
> Cada sección corresponde a un área funcional.
> Cada item es un test que el agente de QA debe ejecutar.

---

## How to use

- Execute each section in order
- Mark each item: ✅ PASS, ❌ FAIL (create finding), ⏭️ SKIP (with reason)
- For browser tests: use Playwright MCP (navigate, snapshot, click, fill_form, etc.)
- For API tests: use fetch or Playwright network inspection
- For DB tests: use your database MCP tool (execute_sql)
- Log failures as structured findings in `docs/quality/findings/open.md`
- After completing all sections, update the summary counts in open.md

---

## 1. Landing / Public Pages

### 1.1 Content and layout
- [ ] Navigate to main URL — page loads without errors
- [ ] Key sections render correctly
- [ ] CTAs navigate to correct destinations

### 1.2 i18n (if applicable)
- [ ] Primary language — no broken keys
- [ ] Secondary language — no broken keys
- [ ] Language switcher works

### 1.3 SEO and meta
- [ ] Page has `<title>` tag
- [ ] Open Graph meta tags present
- [ ] No broken meta tags

---

## 2. Authentication

### 2.1 Registration
- [ ] Registration form loads with all required fields
- [ ] Submit with valid data → account created, redirect to app
- [ ] Verify in DB: user/tenant row created correctly

### 2.2 Registration — validation
- [ ] Empty required fields → validation error
- [ ] Invalid email → validation error
- [ ] Weak password → validation error
- [ ] Duplicate email → appropriate error

### 2.3 Login
- [ ] Valid credentials → redirect to dashboard/app
- [ ] Wrong password → error shown
- [ ] Non-existent email → error shown

### 2.4 Logout
- [ ] Logout → session destroyed, redirect to public page
- [ ] Access protected route after logout → redirect to login

### 2.5 Session protection
- [ ] Access protected routes without auth → redirect to login
- [ ] API routes without auth → 401

---

## 3. Core Application Flow

### 3.1 Main CRUD
- [ ] Create entity → appears in list, verify in DB
- [ ] Read/list entities → correct data displayed
- [ ] Update entity → changes saved, verify in DB
- [ ] Delete entity → removed from list, verify in DB

### 3.2 Business logic
- [ ] Primary workflow executes correctly end-to-end
- [ ] Edge cases handled (empty states, limits, errors)
- [ ] Data consistency maintained across operations

---

## 4. API Security

### 4.1 Auth enforcement
- [ ] All protected API routes → 401 without auth
- [ ] Webhook routes use signature verification (not JWT)

### 4.2 Data isolation
- [ ] User A cannot access User B's data via API
- [ ] Internal fields not leaked in API responses

### 4.3 Input validation
- [ ] Invalid/malformed input → 400 with safe error message
- [ ] Error responses do not leak internal details

### 4.4 Security headers
- [ ] X-Frame-Options present
- [ ] X-Content-Type-Options: nosniff
- [ ] Strict-Transport-Security (HSTS)
- [ ] Content-Security-Policy present

---

## 5. Billing / Payments (if applicable)

### 5.1 Subscription flow
- [ ] Checkout redirects to payment provider
- [ ] Webhook processes payment correctly
- [ ] Plan/status updated in DB after payment

### 5.2 Usage tracking
- [ ] Usage correctly tracked and displayed
- [ ] Limits enforced when exceeded

---

## 6. Responsive / Mobile

- [ ] App renders correctly at 375px (mobile)
- [ ] App renders correctly at 768px (tablet)
- [ ] App renders correctly at 1280px+ (desktop)
- [ ] Navigation adapts to screen size

---

## 7. Error Handling

- [ ] Error boundaries prevent white screens
- [ ] Loading states shown during data fetches
- [ ] Network errors show user-friendly messages

---

## 8. Findings Verification

> For each finding with status FIXED_PENDING_VERIFICATION:
> Verify the fix, then update status in findings files.

- [ ] (list findings to verify here)

---

## Summary

| Section | Passed | Failed | Skipped | Total |
|---|---|---|---|---|
| 1. Public Pages | | | | |
| 2. Auth | | | | |
| 3. Core Flow | | | | |
| 4. API Security | | | | |
| 5. Billing | | | | |
| 6. Responsive | | | | |
| 7. Error Handling | | | | |
| 8. Findings | | | | |
| **TOTAL** | | | | |

## Verdict

- [ ] PASS — merge-ready
- [ ] FAIL — needs fixes (list blocking findings)
