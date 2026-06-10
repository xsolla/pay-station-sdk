# Xsolla Pay Station SDK

![License](https://img.shields.io/github/license/xsolla/pay-station-sdk)
![Latest release](https://img.shields.io/github/v/release/xsolla/pay-station-sdk)

## Overview

The Xsolla Pay Station SDK is a fully customizable JavaScript payment solution for managing payments in browsers or WebView via Xsolla — without redirecting the user to the hosted Xsolla Pay Station page. The SDK loads a secure iframe (the Core Library) that handles all sensitive user and payment data; public data is exposed to your code through public post-messages.

It is intended for web developers building a branded, embedded checkout using the SDK's payment web components.

## Requirements

- Node.js and npm
- An [Xsolla Publisher Account](https://publisher.xsolla.com) with a configured Pay Station project

## Install

```bash
npm install @xsolla/pay-station-sdk
```

## Usage

After installing the package, initialize the SDK with a payment access token and mount its payment web components inside your checkout UI. See the full [integration guide](https://developers.xsolla.com/sdk/) for the component list, secure components, and supported events.

## Documentation

- Full integration guide: [developers.xsolla.com/sdk](https://developers.xsolla.com/sdk/)
- Developer portal: [developers.xsolla.com](https://developers.xsolla.com)

## Support

- **GitHub Issues:** [github.com/xsolla/pay-station-sdk/issues](https://github.com/xsolla/pay-station-sdk/issues)
- **Developer portal:** [developers.xsolla.com](https://developers.xsolla.com)

## License

Apache License 2.0. See [LICENSE](./LICENSE).
