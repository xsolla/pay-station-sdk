# Quick Reference: Releases & Slack Notifications

## 🚀 Making a Release

### Step 1: Create commits with Conventional Commits
```bash
# Feature (minor version bump: 0.1.0 → 0.2.0)
git commit -m "feat: add new payment method"

# Bug fix (patch version bump: 0.1.0 → 0.1.1)
git commit -m "fix: resolve validation issue"

# Breaking change (major version bump: 0.1.0 → 1.0.0)
git commit -m "feat!: redesign API

BREAKING CHANGE: Payment structure changed"
```

### Step 2: Merge to main
```bash
git push origin main
```
→ **Slack notification:** 📝 "Release PR Ready for Review"

### Step 3: Review & Merge Release PR
→ **Automatic:**
- Git tag created
- GitHub Release published
- NPM package published
- **Slack notification:** ✅ "Release Published Successfully"

## 📬 Slack Notifications

| Trigger | Icon | Message | Action |
|---------|------|---------|--------|
| Release PR created | 📝 | "Release PR Ready for Review" | Review and merge PR |
| Release successful | ✅ | "Release Published Successfully" | Celebrate! 🎉 |
| Release failed | ❌ | "Release Failed" + failed steps | Check logs and fix |

## ⚙️ Optional: Disable NPM Publishing

To test releases without publishing to NPM:

1. Go to GitHub **Settings** → **Secrets** → **Actions**
2. Create secret: `ENABLE_NPM_PUBLISH` = `false`
3. Releases will still be created, but won't publish to NPM

**Full guide:** [DISABLE_NPM_PUBLISH.md](./DISABLE_NPM_PUBLISH.md)

## 🔧 Troubleshooting

### Release PR not created?
- ✓ Check commits have `feat:` or `fix:` prefix
- ✓ Check commits are in `main` branch
- ✓ Check workflow has `contents: write` permission

### NPM publish failed?
- ✓ Check `NPM_TOKEN` is valid in GitHub Secrets
- ✓ Check version doesn't already exist
- ✓ Check package builds successfully locally

### Slack notifications not working?
- ✓ Check `SLACK_WEBHOOK_URL` in GitHub Secrets
- ✓ Test webhook with curl:
  ```bash
  curl -X POST YOUR_WEBHOOK_URL \
    -H 'Content-Type: application/json' \
    -d '{"text":"Test"}'
  ```

## 📊 Commit Types → Version Impact

| Commit Type | Version Change | Example |
|-------------|----------------|---------|
| `feat:` | Minor (0.1.0 → 0.2.0) | `feat: add Apple Pay` |
| `fix:` | Patch (0.1.0 → 0.1.1) | `fix: resolve bug` |
| `feat!:` or `BREAKING CHANGE:` | Major (0.1.0 → 1.0.0) | `feat!: redesign API` |
| `docs:`, `chore:`, `style:` | No change | - |

## 🔗 Links

- 📖 [Full Release Flow](./RELEASE_FLOW.md)
- ⚙️ [Slack Setup Guide](./SLACK_SETUP.md)
- 🌐 [Conventional Commits](https://www.conventionalcommits.org/)
- 📦 [NPM Package](https://www.npmjs.com/package/@xsolla/pay-station-sdk)

## 🆘 Need Help?

1. Check [RELEASE_FLOW.md](./RELEASE_FLOW.md) for detailed process
2. Check [SLACK_SETUP.md](./SLACK_SETUP.md) for Slack configuration
3. Check GitHub Actions logs for error details
4. Contact the team in Slack

