# Changelog

## [0.5.1](https://github.com/xsolla/pay-station-sdk/compare/v0.5.0...v0.5.1) (2025-12-09)

### Bug Fixes

- **finance-details:** added cart image checking for broken state ([75aa55c](https://github.com/xsolla/pay-station-sdk/commit/75aa55cc18009d6ea838f56fa139c14a5ede0430))
- **three-ds:** added id for form and challenge window close event ([2141c33](https://github.com/xsolla/pay-station-sdk/commit/2141c33d0f9b7908405961f5fddf81e4c786b19b))

## [0.5.0](https://github.com/xsolla/pay-station-sdk/compare/v0.4.0...v0.5.0) (2025-12-04)

### Features

- **PAYMENTS-26462:** sandbox environment ([74d2512](https://github.com/xsolla/pay-station-sdk/commit/74d251276a9655d7e257449bb541d8985aa7ce14))
- **PAYMENTS-26462:** sandbox environment ([9de2adb](https://github.com/xsolla/pay-station-sdk/commit/9de2adb45ccc4c122fba7bd8153797f06e3c9bc7))
- update README.md ([ce4798f](https://github.com/xsolla/pay-station-sdk/commit/ce4798ff0413a7d88a20a09dacace0f77bc22241))

## [0.4.0](https://github.com/xsolla/pay-station-sdk/compare/v0.3.1...v0.4.0) (2025-12-03)

### Features

- **PAYMENTS-26264:** fix apple pay error message ([a4163c2](https://github.com/xsolla/pay-station-sdk/commit/a4163c2e74be56c6a57771195f5ee55072ccafaa))
- **PAYMENTS-26264:** unify google/apple pay events ([99562e9](https://github.com/xsolla/pay-station-sdk/commit/99562e9d3e46db6773ada91b4ff7251e59adc8c6))
- **three-ds:** added extra step for an external challenge window ([53b1785](https://github.com/xsolla/pay-station-sdk/commit/53b1785d2c5f54b0dfa89bad289daf4d8d320c94))

### Bug Fixes

- **headless-checkout:** fix default settings handling for google pay ([a9eec87](https://github.com/xsolla/pay-station-sdk/commit/a9eec87c20663edeed19bbe61412270a8f42a770))

## [0.3.1](https://github.com/xsolla/pay-station-sdk/compare/v0.3.0...v0.3.1) (2025-11-20)

### Bug Fixes

- add optional external window open event for Apple Pay ([93601d5](https://github.com/xsolla/pay-station-sdk/commit/93601d5f414e2e1f210106337e6b9879467e1e15))
- add support for new Apple Pay window edge cases ([060dd0a](https://github.com/xsolla/pay-station-sdk/commit/060dd0ad303d45f75c6d86fb22238455273f5f28))

## [0.3.0](https://github.com/xsolla/pay-station-sdk/compare/v0.2.1...v0.3.0) (2025-11-18)

### Features

- **PAYMENTS-26178:** feat transactionInitiationType ([52cd6df](https://github.com/xsolla/pay-station-sdk/commit/52cd6df9c9737d1ed3f5192e2383aa7b29572aca))

### Bug Fixes

- **PAYMENTS-25007:** fix readme 3ds link ([c9dd1fe](https://github.com/xsolla/pay-station-sdk/commit/c9dd1fe8d083f9186b7b2f58a9a667a5b8584516))

## [0.2.1](https://github.com/xsolla/pay-station-sdk/compare/v0.2.0...v0.2.1) (2025-11-12)

### Bug Fixes

- **PAYMENTS-26184:** fix spaces in legal texts ([61f3793](https://github.com/xsolla/pay-station-sdk/commit/61f3793ac110dbba99a62987fd35cdc8ab3f7650))

## [0.2.0](https://github.com/xsolla/pay-station-sdk/compare/v0.1.31...v0.2.0) (2025-11-05)

### Features

- **actions:** added a new flag for redirect action - isSameWindowRequired ([1f4a212](https://github.com/xsolla/pay-station-sdk/commit/1f4a212882289d15327df1517f53be9cf8e607a2))
- **google-pay:** userback via flag ([0dfd19f](https://github.com/xsolla/pay-station-sdk/commit/0dfd19f37daa57df32ebf9b38001b41b6bc58f10))

## [0.0.3](https://github.com/xsolla/pay-station-sdk/compare/v0.0.2...v0.0.3) (2023-10-12)

### Features

- add saved methods, user balance ([2f15d74](https://github.com/xsolla/pay-station-sdk/commit/2f15d7423f4161a2f9a26d3c323b73f1a39c2a41))
- added getStatus form method ([e2da1ac](https://github.com/xsolla/pay-station-sdk/commit/e2da1ace995ea04bf73748b970bb2dcb7c75565b))
- added onNextAction form method ([723699b](https://github.com/xsolla/pay-station-sdk/commit/723699b818c3004bca2c82134464f418c7892d0d))
- added status component ([ef04c96](https://github.com/xsolla/pay-station-sdk/commit/ef04c9631644441c5de39fdd77e76cb93487d3e2))
- error handler ([6222745](https://github.com/xsolla/pay-station-sdk/commit/62227455bfdbbdb138473e4ef8ee1959b64fd4c4))
- implement i18n ([c58aae6](https://github.com/xsolla/pay-station-sdk/commit/c58aae642f46c3c5bd2ab641fa18341a6f42a9ba))
- **PAYMENTS-14328:** add payment-methods component ([c9088d3](https://github.com/xsolla/pay-station-sdk/commit/c9088d3636cc4ce4538e321f7bbc444f5289bddc))
- **PAYMENTS-14329:** add readme and PaymentMethods integration example ([66595e7](https://github.com/xsolla/pay-station-sdk/commit/66595e7842f27981dd357e89dc7e667483e7a18a))
- **PAYMENTS-15236:** add finance details component ([9f9708a](https://github.com/xsolla/pay-station-sdk/commit/9f9708a6004f40e8a022f8aa75e4d89c97e6307a))
- **PAYMENTS-15242:** add form initialization ([583db7c](https://github.com/xsolla/pay-station-sdk/commit/583db7c21768d6e9ae44c21ea5314af53e6b424c))
- **PAYMENTS-15244:** add payment-form component ([2d154ad](https://github.com/xsolla/pay-station-sdk/commit/2d154addce263e13d2e03948b934539d9eff6a62))
- **PAYMENTS-15245:** add legal component ([b295418](https://github.com/xsolla/pay-station-sdk/commit/b2954181b92b8a02f2d466ee8a446a6fa336e37c))
- **PAYMENTS-15256:** set secure component styles ([b08aaf3](https://github.com/xsolla/pay-station-sdk/commit/b08aaf3f1f6564ab426270dc861c694e7756f790))
- **PAYMENTS-15270:** form - activate & getStatus ([23d28ef](https://github.com/xsolla/pay-station-sdk/commit/23d28ef1b2c9c6ea4d96292b7c068c02ad376bd3))
- **PAYMENTS-15270:** form - activate & getStatus + tests ([edf95d7](https://github.com/xsolla/pay-station-sdk/commit/edf95d7cc7bf466b827354710903450306fbd2d4))
- **PAYMENTS-15271:** show errors show field state actions ([1b31e0e](https://github.com/xsolla/pay-station-sdk/commit/1b31e0eafd9f3a4910a0502440f43473bedc614c))
- **PAYMENTS-16028:** get status without form init ([90fa9c9](https://github.com/xsolla/pay-station-sdk/commit/90fa9c9188e66a0a48d7bc1daa6394bf28229322))
- **PAYMENTS-16240:** listen control validation ([0fe5a77](https://github.com/xsolla/pay-station-sdk/commit/0fe5a77ceb79522bf46e77105e20bf50e6a99ce3))
- **TextComponent:** show validation errors ([5e53dea](https://github.com/xsolla/pay-station-sdk/commit/5e53dea3ed364831aac7f04411af679af0aec307))
- web components architecture implementation ([65b260e](https://github.com/xsolla/pay-station-sdk/commit/65b260ee12683f4a872390fb00c218ea4856a6ca))

### Bug Fixes

- added legal disclaimer translation ([1d0240e](https://github.com/xsolla/pay-station-sdk/commit/1d0240ec73cca6570e53e7d96ea849cd53355ec2))
- legal check ping messages ([c476097](https://github.com/xsolla/pay-station-sdk/commit/c476097723324a09446611cdb195283d58ec087c))
- **PAYMENTS-15239:** change text component selector ([f1cbbe9](https://github.com/xsolla/pay-station-sdk/commit/f1cbbe9eb976dabace057e45baadde1442016d1d))
- **PAYMENTS-15239:** emit selected method id on li element click ([d113dc8](https://github.com/xsolla/pay-station-sdk/commit/d113dc80352967214287e47094217e2626c12f85))

## [0.0.2](https://github.com/xsolla/pay-station-sdk/compare/v0.0.1...v0.0.2) (2023-09-22)

### Features

- add saved methods, user balance ([2f15d74](https://github.com/xsolla/pay-station-sdk/commit/2f15d7423f4161a2f9a26d3c323b73f1a39c2a41))
- added getStatus form method ([e2da1ac](https://github.com/xsolla/pay-station-sdk/commit/e2da1ace995ea04bf73748b970bb2dcb7c75565b))
- added onNextAction form method ([723699b](https://github.com/xsolla/pay-station-sdk/commit/723699b818c3004bca2c82134464f418c7892d0d))
- added status component ([ef04c96](https://github.com/xsolla/pay-station-sdk/commit/ef04c9631644441c5de39fdd77e76cb93487d3e2))
- error handler ([6222745](https://github.com/xsolla/pay-station-sdk/commit/62227455bfdbbdb138473e4ef8ee1959b64fd4c4))
- implement i18n ([c58aae6](https://github.com/xsolla/pay-station-sdk/commit/c58aae642f46c3c5bd2ab641fa18341a6f42a9ba))
- **PAYMENTS-14328:** add payment-methods component ([c9088d3](https://github.com/xsolla/pay-station-sdk/commit/c9088d3636cc4ce4538e321f7bbc444f5289bddc))
- **PAYMENTS-14329:** add readme and PaymentMethods integration example ([66595e7](https://github.com/xsolla/pay-station-sdk/commit/66595e7842f27981dd357e89dc7e667483e7a18a))
- **PAYMENTS-15236:** add finance details component ([9f9708a](https://github.com/xsolla/pay-station-sdk/commit/9f9708a6004f40e8a022f8aa75e4d89c97e6307a))
- **PAYMENTS-15242:** add form initialization ([583db7c](https://github.com/xsolla/pay-station-sdk/commit/583db7c21768d6e9ae44c21ea5314af53e6b424c))
- **PAYMENTS-15244:** add payment-form component ([2d154ad](https://github.com/xsolla/pay-station-sdk/commit/2d154addce263e13d2e03948b934539d9eff6a62))
- **PAYMENTS-15245:** add legal component ([b295418](https://github.com/xsolla/pay-station-sdk/commit/b2954181b92b8a02f2d466ee8a446a6fa336e37c))
- **PAYMENTS-15270:** form - activate & getStatus ([23d28ef](https://github.com/xsolla/pay-station-sdk/commit/23d28ef1b2c9c6ea4d96292b7c068c02ad376bd3))
- **PAYMENTS-15270:** form - activate & getStatus + tests ([edf95d7](https://github.com/xsolla/pay-station-sdk/commit/edf95d7cc7bf466b827354710903450306fbd2d4))
- **PAYMENTS-15271:** show errors show field state actions ([1b31e0e](https://github.com/xsolla/pay-station-sdk/commit/1b31e0eafd9f3a4910a0502440f43473bedc614c))
- **PAYMENTS-16028:** get status without form init ([90fa9c9](https://github.com/xsolla/pay-station-sdk/commit/90fa9c9188e66a0a48d7bc1daa6394bf28229322))
- **TextComponent:** show validation errors ([5e53dea](https://github.com/xsolla/pay-station-sdk/commit/5e53dea3ed364831aac7f04411af679af0aec307))
- web components architecture implementation ([65b260e](https://github.com/xsolla/pay-station-sdk/commit/65b260ee12683f4a872390fb00c218ea4856a6ca))

### Bug Fixes

- added legal disclaimer translation ([1d0240e](https://github.com/xsolla/pay-station-sdk/commit/1d0240ec73cca6570e53e7d96ea849cd53355ec2))
- legal check ping messages ([c476097](https://github.com/xsolla/pay-station-sdk/commit/c476097723324a09446611cdb195283d58ec087c))
- **PAYMENTS-15239:** change text component selector ([f1cbbe9](https://github.com/xsolla/pay-station-sdk/commit/f1cbbe9eb976dabace057e45baadde1442016d1d))
- **PAYMENTS-15239:** emit selected method id on li element click ([d113dc8](https://github.com/xsolla/pay-station-sdk/commit/d113dc80352967214287e47094217e2626c12f85))
