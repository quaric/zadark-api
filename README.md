# ZaDark API

ZaDark is an extension that helps you enable Dark Mode for Zalo PC and Web. ZaDark is available on Windows, macOS, Chrome, Safari, Edge and Firefox.

> ZaDark là tiện ích giúp kích hoạt Dark Mode (Chế độ tối) cho Zalo PC và Web. ZaDark có mặt trên Windows, macOS, Chrome, Safari, Edge và Firefox.

## Get Started

### Config ENV

Create an .env file with the following content:

```bash
TRANSLATE_API_KEY=YOUR_API_KEY
TRANSLATE_LIMIT_REQUEST_PER_DAY=10
TRANSLATE_MAX_TEXT_LENGTH=3000
REDIS_URL=
PORT=5555
```

### Install packages

```bash
yarn install
```

### Run

```bash
# Development
yarn dev

# Production
yarn start
```

## License

ZaDark's source code is freely available for use, modification and distribution under the permissions, limitations and conditions listed in the [Mozilla Public License 2.0](./LICENSE).

## Acknowledgments
- https://cloud.google.com/nodejs/docs/reference/translate/latest#using-the-client-library
- https://express-rate-limit.mintlify.app/
- https://expressjs.com/en/guide/behind-proxies.html
- https://redis.io/docs/about/

---

> © 2025 Quaric Co., Ltd.
