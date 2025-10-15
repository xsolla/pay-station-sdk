# GitHub Automation & Documentation

This directory contains GitHub workflows and release automation documentation.

## 📚 Documentation

### 🚀 Getting Started
- **[Quick Reference](./QUICK_REFERENCE.md)** ⭐ - Quick guide for releases (start here!)
- **[Release Flow](./RELEASE_FLOW.md)** - Complete release process with visual diagrams
- **[Slack Setup](./SLACK_SETUP.md)** - Configure Slack notifications
- **[Disable NPM Publishing](./DISABLE_NPM_PUBLISH.md)** - How to skip NPM publishing for testing

## 🤖 GitHub Actions Workflows

### Active Workflows

#### [`check.yml`](./workflows/check.yml)
**Trigger:** Pull Request  
**Purpose:** Code quality check before merge

```yaml
Jobs:
  - lint: ESLint + Stylelint
  - tests: Karma unit tests
Environment: Node 18
```

#### [`release-please.yml`](./workflows/release-please.yml)
**Trigger:** Push to `main`  
**Purpose:** Automatic release creation and NPM publication

```yaml
Stages:
  1. Analyze commits → Create/Update Release PR
  2. On PR merge → Create release + Publish to NPM
  3. Send Slack notifications (success/failure)
```

## 🎯 Quick Start

### For Developers

```bash
# 1. Clone repository
git clone <repo-url>
cd pay-station-sdk

# 2. Install dependencies
npm ci

# 3. Make commits with conventional commit format
git commit -m "feat: add new feature"
git commit -m "fix: resolve bug"

# 4. Create PR → checks run automatically
# 5. After merge to main → Release PR created automatically
# 6. Merge Release PR → release published automatically
```

### For Administrators

```bash
# 1. Configure GitHub Secrets
#    - NPM_TOKEN (required)
#    - SLACK_WEBHOOK_URL (optional)

# 2. Protect main branch
#    Settings → Branches → Add rule
#    - Require PR reviews
#    - Require status checks (lint, tests)

# 3. Setup Slack (optional)
#    See SLACK_SETUP.md
```

## 📝 Conventional Commits Format

```bash
# Commit types and their version impact:
feat:     # Minor version (0.1.0 → 0.2.0)
fix:      # Patch version (0.1.0 → 0.1.1)
feat!:    # Major version (0.1.0 → 1.0.0)
docs:     # No version change
chore:    # No version change
```

**Examples:**
```bash
feat: add Apple Pay support
fix: resolve payment validation bug
feat!: redesign payment API

BREAKING CHANGE: Payment structure changed
docs: update integration guide
chore: update dependencies
```

## 🔔 Slack Notifications

### Notification Types:

| Event | Icon | When Sent |
|-------|------|-----------|
| Release PR created | 📝 | After push to main with feat/fix |
| Release successful | ✅ | After successful NPM publication |
| Release failed | ❌ | On error at any step |

### Setup
See detailed instructions in [SLACK_SETUP.md](./SLACK_SETUP.md)

## 🛠️ Troubleshooting

### Release PR not being created?
1. ✓ Check commit format (`feat:`, `fix:`)
2. ✓ Check commits are in `main`
3. ✓ Check workflow permissions

### NPM publication failing?
1. ✓ Check `NPM_TOKEN` in Secrets
2. ✓ Check version doesn't already exist
3. ✓ Check logs in GitHub Actions

### Slack notifications not arriving?
1. ✓ Check `SLACK_WEBHOOK_URL` in Secrets
2. ✓ Test webhook via curl
3. ✓ Check Slack App permissions

Complete debugging guide: [RELEASE_FLOW.md - Debugging Section](./RELEASE_FLOW.md#🔍-debugging)

## 📊 Metrics

### Before Automation:
- 🕐 Release time: ~15 minutes
- 👤 Manual steps: 5+
- 🐛 Errors: not tracked
- 📢 Notifications: none

### After Automation:
- 🕐 Release time: ~5 minutes (**66% ↓**)
- 👤 Manual steps: 1 (only PR review) (**80% ↓**)
- 🐛 Errors: detailed tracking + notifications
- 📢 Notifications: 3 types in Slack

## 🔗 Useful Links

### External Resources
- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Release Please Documentation](https://github.com/google-github-actions/release-please-action)
- [Semantic Versioning](https://semver.org/)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder)

### Internal Resources
- [Main README](../README.md)
- [Package on NPM](https://www.npmjs.com/package/@xsolla/pay-station-sdk)

## 📞 Support

### Questions about releases?
1. Read [Quick Reference](./QUICK_REFERENCE.md)
2. Check [Release Flow](./RELEASE_FLOW.md)
3. Ask in Slack channel

### Found a bug in automation?
1. Check logs in GitHub Actions
2. Create issue with `ci/cd` tag
3. Describe problem and attach logs

---

**Documentation version:** 1.0  
**Last update:** 2025-10-15  
**Status:** ✅ Production Ready

