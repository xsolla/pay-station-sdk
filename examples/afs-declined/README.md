# AFS Declined Payment Example

This example demonstrates how to handle a payment declined by the **Anti-Fraud System (AFS)**.

## Two Possible Flows

### Flow 1: Error Before Invoice Processing (show_errors)

When AFS blocks a payment **before** processing begins, the SDK returns a `show_errors` action with:

- **Error code**: `1092` (`declinedByAfsAfterInvoiceCreated`)
- **Message**: "Payment via {method} was declined"

```
User submits payment form
        ↓
Payment request sent to backend
        ↓
AFS evaluates transaction
        ↓
AFS DECLINES immediately
        ↓
SDK receives 'show_errors' action with code 1092
        ↓
Display error message to user
```

### Flow 2: Error During Status Check (check_status)

When AFS blocks a payment **after** invoice creation and the transaction enters status checking:

- SDK emits `check_status` action
- `sdk.getStatus()` returns status with `titleClass: "cancel"`
- The SDK now correctly identifies this as a canceled/declined state (not "processing")

```
User submits payment form
        ↓
Payment request sent to backend
        ↓
Invoice created, AFS check begins
        ↓
AFS DECLINES the payment
        ↓
SDK receives 'check_status' action
        ↓
sdk.getStatus() returns:
  - statusState: "processing" (from API)
  - titleClass: "cancel" (indicates declined)
  - SDK maps this to StatusState.isCanceled
        ↓
Display declined status to user
```

**Note:** The second flow was fixed in this PR. Previously, `sdk.getStatus()` would incorrectly return `StatusState.isProcessing` for declined payments because it only checked `statusState` and `isCancelUser`, ignoring `titleClass`.

## How to Trigger AFS Decline (Testing)

### Option 1: Sandbox Test Cards

Use sandbox mode (`sandbox: true`) and specific test card numbers configured to trigger AFS rejection.

### Option 2: AFS Rules in Publisher Account

Configure AFS rules in [Xsolla Publisher Account](https://publisher.xsolla.com/) to block specific patterns:

1. Go to **Pay Station** → **Settings** → **Anti-fraud**
2. Create a rule that blocks payments based on:
   - Card BIN ranges
   - IP addresses
   - Email patterns
   - Amount thresholds
   - Geographic restrictions

### Option 3: Use Known Risk Indicators

Payments with certain characteristics are more likely to be flagged:

- Mismatched billing/IP country
- High-risk countries
- Unusual purchase patterns
- VPN/proxy usage

## Key Implementation Points

### Handling show_errors Action

```javascript
const AFS_DECLINED_ERROR_CODE = 1092;

headlessCheckout.form.onNextAction((nextAction) => {
  if (nextAction.type === 'show_errors') {
    const errors = nextAction.data.errors ?? [];
    
    errors.forEach((error) => {
      if (error.code === AFS_DECLINED_ERROR_CODE) {
        // Handle AFS declined specifically
        showAfsDeclinedMessage(error);
      } else {
        // Handle other errors
        showGenericError(error);
      }
    });
  }
});
```

### Handling check_status Action

```javascript
headlessCheckout.form.onNextAction((nextAction) => {
  if (nextAction.type === 'check_status') {
    // Render status component
    // The SDK will automatically detect declined state via titleClass
    renderStatusComponent();
  }
});

// The StatusComponent internally uses getStatusState() which now checks:
// - status.statusState === 'canceled'
// - status.isCancelUser === true
// - status.titleClass === 'cancel'
// - status.titleClass === 'canceluser'
```

## User Experience Recommendations

When AFS declines a payment:

1. **Don't expose technical details** — avoid mentioning "fraud" to legitimate users
2. **Suggest alternatives** — offer other payment methods
3. **Provide support contact** — let users reach out if they believe it's a false positive
4. **Log for analytics** — track AFS decline rates to tune rules

## Related Error Codes

| Code | Name | Description |
|------|------|-------------|
| 1092 | `declinedByAfsAfterInvoiceCreated` | Payment declined by AFS after invoice was created |
| 2048 | `psWrongResponse` | Payment system returned an error |
| 2001 | `serverIsNotResponding` | Payment system is not responding |

## Running This Example

1. Build the SDK: `npm run build`
2. Start a local server: `npx serve .`
3. Open `http://localhost:3000/pay-station-sdk/examples/afs-declined/`
4. Enter a valid access token in the code
5. Submit a payment that triggers AFS rules
