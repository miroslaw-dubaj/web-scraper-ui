# Web Scraper Application (web-scraper-ui)

## Project Description

This application is designed to collect data from a static list of url addresses (config file) with the possibility of individual scraper configuration for a given address. The application utilizes the following technologies:

- Node.js
- Puppeteer
- Cheerio
- axios

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- Node.js

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repo
   ```sh
   git clone https://github.com/miroslaw-dubaj/web-scraper-ui
   ```
2. Install NPM packages
   ```sh
   yarn install
   ```

## Usage

```bash
# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).


### Enable legacy OpenSSL provider.

On Unix-like (Linux, macOS, Git bash, etc.):

`export NODE_OPTIONS=--openssl-legacy-provider`

On Windows command prompt:

`set NODE_OPTIONS=--openssl-legacy-provider`

On PowerShell:

`$env:NODE_OPTIONS = "--openssl-legacy-provider"`

## Credits

This project was developed forward from [Solomon Eseme's Repo](https://github.com/Kaperskyguru/nuxt-web-scraping-puppeteer)

This project was assisted by [GitHub Copilot](https://copilot.github.com/), an AI-powered code completion tool.

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Email: miroslaw@dubaj.dev

Project Link: [https://github.com/miroslaw-dubaj/web-scraper-ui](https://github.com/miroslaw-dubaj/web-scraper-ui)
