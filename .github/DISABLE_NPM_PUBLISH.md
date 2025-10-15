# How to Disable NPM Publishing

The workflow now supports conditional NPM publishing through a GitHub Secret.

## 🔧 Enable/Disable NPM Publishing

### To Disable Publishing

1. Go to your repository on GitHub
2. Navigate to **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Create secret:
   - **Name:** `ENABLE_NPM_PUBLISH`
   - **Value:** `false`
5. Click **"Add secret"**

**Result:** Releases will still be created on GitHub, but packages won't be published to NPM.

### To Enable Publishing (Default Behavior)

**Option 1:** Delete the `ENABLE_NPM_PUBLISH` secret (default is enabled)

**Option 2:** Update the secret value:
1. Go to **Settings** → **Secrets and variables** → **Actions**
2. Click on `ENABLE_NPM_PUBLISH`
3. Click **"Update secret"**
4. Set value to anything except `false` (e.g., `true` or just leave empty)
5. Click **"Update secret"**

## 📋 What Happens When Publishing is Disabled

### ✅ What Still Works:
- ✓ Release PR creation
- ✓ Version bumping in `package.json`
- ✓ CHANGELOG generation
- ✓ Git tag creation
- ✓ GitHub Release creation
- ✓ Package building
- ✓ Slack notifications

### ❌ What is Skipped:
- `npm publish` command

### 📬 Slack Notification Changes:
When disabled, Slack message will show:
```
✅ Release Created (NPM publish disabled)
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
Version: v0.1.32
Release: View on GitHub
NPM: ⚠️ Publishing disabled
```

## 🎯 Use Cases

### When to Disable Publishing:

1. **Testing Release Process**
   - Want to test release workflow without publishing
   - Verify changelog generation
   - Check Slack notifications

2. **Pre-release Validation**
   - Need to review built package before publishing
   - Want to run additional validation
   - Need approval before public release

3. **Temporary Hold**
   - Critical bug found after release creation
   - Waiting for additional changes
   - Coordinating with team

4. **Development Environment**
   - Testing on fork
   - Sandbox environment setup

### When to Keep Enabled (Default):

- Normal production releases
- Automated CI/CD pipeline
- Regular package updates

## 🚀 Quick Commands

```bash
# Check current setting
gh secret list | grep ENABLE_NPM_PUBLISH

# Disable publishing
gh secret set ENABLE_NPM_PUBLISH --body "false"

# Enable publishing (delete secret)
gh secret delete ENABLE_NPM_PUBLISH

# Or enable by setting to true
gh secret set ENABLE_NPM_PUBLISH --body "true"
```

## 🔄 Workflow Diagram

```
Release PR Merged
      ↓
Create Git Tag & GitHub Release
      ↓
Checkout & Setup Node
      ↓
Install Dependencies
      ↓
Build Package
      ↓
Check ENABLE_NPM_PUBLISH
      ├─ Not "false" → Publish to NPM → ✅ Success notification
      └─ Is "false"  → Skip publish   → ✅ Success notification (with warning)
```

## 📝 Manual Publishing

If you disabled auto-publishing and want to publish manually later:

```bash
# 1. Checkout the release tag
git checkout v0.1.32

# 2. Install dependencies
npm ci

# 3. Build package
npm run build

# 4. Publish to NPM
npm publish --access public

# Alternative: Use the lib-publish script
npm run lib-publish
```

## ⚠️ Important Notes

1. **Secret Name:** Must be exactly `ENABLE_NPM_PUBLISH` (case-sensitive)
2. **Disable Value:** Must be exactly `false` (lowercase)
3. **Default Behavior:** If secret doesn't exist, publishing is ENABLED
4. **NPM_TOKEN:** Still required in secrets (even if publishing disabled)
5. **Notifications:** Success notifications will indicate if publishing was skipped

## 🔗 Related Documentation

- [Quick Reference](./QUICK_REFERENCE.md)
- [Release Flow](./RELEASE_FLOW.md)
- [Slack Setup](./SLACK_SETUP.md)

---

**Last Updated:** 2025-10-15  
**Status:** ✅ Available

