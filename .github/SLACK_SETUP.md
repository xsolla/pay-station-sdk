# Slack Notifications Setup

## 1. Create Slack App and Webhook

### Step 1: Create Slack App
1. Go to https://api.slack.com/apps
2. Click **"Create New App"**
3. Choose **"From scratch"**
4. Enter name: `GitHub Releases` (or any other name)
5. Select your workspace

### Step 2: Activate Incoming Webhooks
1. In app settings, go to **"Incoming Webhooks"**
2. Enable **"Activate Incoming Webhooks"** toggle
3. Click **"Add New Webhook to Workspace"**
4. Select channel for notifications (e.g., `#releases`)
5. Click **"Allow"**

### Step 3: Copy Webhook URL
After creation, you'll see a Webhook URL like:
```
https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXX
```

⚠️ **Important:** Never commit this URL to the repository!

## 2. Add Webhook to GitHub Secrets

1. Go to your GitHub repository
2. Open **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"**
4. Create secret:
   - **Name:** `SLACK_WEBHOOK_URL`
   - **Value:** Paste the copied Webhook URL
5. Click **"Add secret"**

## 3. Notification Types

The system sends **three types** of notifications:

### 📝 Release PR Created
When release-please creates a PR with new version:
- 📝 Header "Release PR Ready for Review"
- Package name
- PR link
- **"Review PR"** button for quick access
- Author name who initiated the release

**Action:** Review the PR and merge it to start the release.

### ✅ Successful Release
After successful release, Slack channel receives:
- ✅ Header "Release Published Successfully"
- Package name: `@xsolla/pay-station-sdk`
- Release version (e.g., `v0.1.32`)
- GitHub Release link
- NPM package link
- Release author name
- Workflow run link

**Action:** None. Time to celebrate! 🎉

### ❌ Release Failed
If something goes wrong, notification includes:
- ❌ Header "Release Failed"
- Package and version info
- Branch and commit info
- **List of failed steps** (e.g., "Build package", "Publish to NPM")
- Warning about action required
- Two buttons:
  - **"View Workflow Logs"** (red) - opens GitHub Actions logs
  - **"View Release"** - opens release page on GitHub

**Action:** Click "View Workflow Logs", fix the issue and retry release.

### Tracked Errors:
1. **Checkout code** - error getting code from repository
2. **Setup Node.js** - error setting up Node.js environment
3. **Install dependencies** - error during `npm ci`
4. **Build package** - error during `npm run build`
5. **Publish to NPM** - error publishing to NPM (most common: token issues or version exists)

## 4. Testing

To test the integration:
1. Make a commit with conventional commit message (e.g., `feat: add new feature`)
2. Merge to `main`
3. Release-please will create a Release PR
4. Merge the Release PR
5. Check Slack channel for notification

## Additional Settings

### Change notification channel
Create a new webhook for another channel in Slack App settings.

### Separate channels for success and errors
You can configure separate channels for urgent alerts:

1. Create second webhook for `#alerts` or `#releases-errors` channel
2. Add to GitHub Secrets: `SLACK_WEBHOOK_URL_ERRORS`
3. Use different webhooks in workflow for success and errors

### Customize message
Edit the `payload` block in `.github/workflows/release-please.yml`

### Add @mentions
In Slack Block Kit you can add mentions:
```json
{
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": "<!channel> New release is available!"
  }
}
```

To mention specific group on errors:
```json
{
  "type": "section",
  "text": {
    "type": "mrkdwn",
    "text": "<!subteam^S12345678> Release failed, please investigate!"
  }
}
```

### Notification Examples

#### 1. Release PR:
```
📝 Release PR Ready for Review
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
PR: #123

A new release PR has been created.
Review and merge it to publish the release.

[Review PR]

Triggered by John Doe
```

#### 2. Successful Release:
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

#### 3. Error:
```
❌ Release Failed
━━━━━━━━━━━━━━━━━━━━━
Package: @xsolla/pay-station-sdk
Version: v0.1.32
Branch: main
Commit: abc123...

Failed Steps:
• Publish to NPM
━━━━━━━━━━━━━━━━━━━━━
⚠️ Action Required: Check the workflow logs and fix the issue.

[View Workflow Logs] [View Release]

Triggered by John Doe
```

## Complete Release Process

For detailed description of the entire release cycle with visual diagram, see [RELEASE_FLOW.md](./RELEASE_FLOW.md)

## Useful Links

- [Slack Block Kit Builder](https://app.slack.com/block-kit-builder) - for creating beautiful messages
- [Slack API: Incoming Webhooks](https://api.slack.com/messaging/webhooks)
- [GitHub Action for Slack](https://github.com/slackapi/slack-github-action)
- [Release Flow Documentation](./RELEASE_FLOW.md) - complete process description

