# Release Flow & Slack Notifications

This document describes the complete release cycle with automatic Slack notifications.

## 🔄 Complete Release Cycle

```
┌─────────────────────────────────────────────────────────────────┐
│  1. Development: commits with Conventional Commits              │
│     feat: add new payment method                                │
│     fix: resolve checkout bug                                   │
│     docs: update API documentation                              │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  2. Pull Request → main                                         │
│     → GitHub Actions runs check.yml                             │
│     → Checks: lint + tests                                      │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  3. Merge to main                                               │
│     → GitHub Actions runs release-please.yml                    │
│     → Release-please analyzes commits                           │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  4. Release-please creates/updates Release PR                   │
│     ✉️  Slack: "📝 Release PR Ready for Review"                 │
│     • "Review PR" button                                        │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│  5. Merge Release PR                                            │
│     → Release-please automatically:                             │
│       • Creates git tag                                         │
│       • Creates GitHub Release                                  │
│       • Starts NPM publication                                  │
└─────────────────────────────────────────────────────────────────┘
                              ↓
                    ┌─────────┴─────────┐
                    │                   │
                 SUCCESS              FAILURE
                    │                   │
                    ↓                   ↓
    ┌───────────────────────┐   ┌───────────────────────┐
    │ ✅ Successful publish │   │ ❌ Publication error  │
    │                       │   │                       │
    │ Slack notification:   │   │ Slack notification:   │
    │ • Version             │   │ • Version             │
    │ • GitHub links        │   │ • Failed steps        │
    │ • NPM link            │   │ • "View Logs" button  │
    └───────────────────────┘   │ • "View Release" btn  │
                                └───────────────────────┘
```

## 📬 Slack Notification Types

### 1️⃣ Release PR Created
**Trigger:** Release-please created/updated PR with new version

**When:** After merge to `main` with conventional commits

**Message:**
```
📝 Release PR Ready for Review
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
PR: #123

A new release PR has been created. 
Review and merge it to publish the release.

[Review PR ⬆️]

Triggered by John Doe
```

### 2️⃣ Release Successfully Published
**Trigger:** Release created and package published to NPM

**When:** After merging Release PR

**Message:**
```
✅ Release Published Successfully
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
Version: v0.1.32
Release: View on GitHub
NPM: View on NPM
━━━━━━━━━━━━━━━━━━━━━
Released by John Doe • View workflow
```

### 3️⃣ Release Failed
**Trigger:** Any release step failed

**When:** Error in checkout, build, or publish

**Message:**
```
❌ Release Failed
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
Version: v0.1.32
Branch: main
Commit: abc123def456

Failed Steps:
• Publish to NPM
━━━━━━━━━━━━━━━━━━━━━
⚠️ Action Required: Check the workflow logs and fix the issue.

[View Workflow Logs 🔴] [View Release]

Triggered by John Doe
```

## 🛠️ Tracked Steps (for errors)

| Step | Description | Common Error Causes |
|------|-------------|-------------------|
| **Checkout code** | Getting code from repository | Permission issues |
| **Setup Node.js** | Setting up Node.js environment | Wrong version |
| **Install dependencies** | `npm ci` | Dependency conflicts, lockfile |
| **Build package** | `npm run build` | TypeScript errors, webpack issues |
| **Publish to NPM** | `npm publish` | ❗ **Most common:** NPM_TOKEN issues, version exists |

## ⚙️ Setup

See [SLACK_SETUP.md](./SLACK_SETUP.md) for detailed instructions.

**Quick:**
1. Create Slack Webhook
2. Add `SLACK_WEBHOOK_URL` to GitHub Secrets
3. Done!

## 🎯 Best Practices

### Conventional Commits
Use correct prefixes for automatic version determination:

- `feat:` → **minor** version (0.1.0 → 0.2.0)
- `fix:` → **patch** version (0.1.0 → 0.1.1)
- `BREAKING CHANGE:` → **major** version (0.1.0 → 1.0.0)
- `docs:`, `chore:`, `style:` → no version change

### Commit Examples:
```bash
# New feature (minor bump)
git commit -m "feat: add Apple Pay support"

# Bug fix (patch bump)
git commit -m "fix: resolve payment validation issue"

# Breaking change (major bump)
git commit -m "feat!: redesign payment API

BREAKING CHANGE: Payment method structure has changed"

# No version impact
git commit -m "docs: update installation guide"
```

### Error Response

When receiving error notification:

1. **Click "View Workflow Logs"** - check error details
2. **Identify cause:**
   - Test error? → Fix code
   - NPM error? → Check token or version
   - Build error? → Check TypeScript/webpack
3. **Fix issue** in new commit
4. Release-please will automatically update PR

### Release Rollback

If release published but contains critical bug:

```bash
# 1. Unpublish version from NPM (within 72 hours)
npm unpublish @xsolla/pay-station-sdk@0.1.32

# 2. Delete tag and release in GitHub
git tag -d v0.1.32
git push origin :refs/tags/v0.1.32

# 3. Fix bug and restart release
```

## 🔍 Debugging

### No notifications?

1. **Check secret:** GitHub Settings → Secrets → `SLACK_WEBHOOK_URL`
2. **Check webhook:** Try sending test message via curl:
   ```bash
   curl -X POST YOUR_WEBHOOK_URL \
     -H 'Content-Type: application/json' \
     -d '{"text":"Test message"}'
   ```
3. **Check workflow logs:** GitHub Actions → latest run → "Send ... notification" step

### Release-please not creating PR?

1. **Check conventional commits:** Must have `feat:` or `fix:`
2. **Check branch:** Commits must be in `main`
3. **Check permissions:** workflow must have `contents: write`

## 📚 Additional Resources

- [Conventional Commits](https://www.conventionalcommits.org/)
- [Release Please Documentation](https://github.com/google-github-actions/release-please-action)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder)
- [Semantic Versioning](https://semver.org/)

