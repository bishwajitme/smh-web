# EC Utbildning / Sälj & Marknadshögskolan

## Intro
Repo för:
- ecutbildning.se
- smhsverige.se

Båda sidorna bygger på samma kod, men med olika stilsättning

## Dependencies
- Running Wordpress with WP-API (http://wp-api.org/)

## Install
```
npm install

EC-dev:
npm run dev-ec
EC-build to stage:
npm run stage-ec
EC-build:
npm run build-ec

SMH-dev:
npm run dev-smh
SMH-build to stage:
npm run stage-smh
SMH-build:
npm run build-smh

open http://localhost:3000
```

## Test
```
npm run test
```

## Config
- `/config.ec.js`
- `/config.smh.js`

# smh-web
