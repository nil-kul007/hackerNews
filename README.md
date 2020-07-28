# React Server Side Reendring Application

- Server-side rendering with code splitting (via the excellent [React Loadable](https://github.com/thejameskyle/react-loadable) package)
- Server-side data fetching and client-side hydration
- React Router
- Conditionally load pollyfills -- only ship bloat to outdated browsers
- React Helmet for dynamic manipulation of the document `<head />`
- Dev server with hot reloading styles
- Jest and react-testing-library ready to test the crap out of some stuff
- CSS Modules, Sass, and autoprefixer
- Run-time environment variables
- Node.js clusters for improved performance under load (in production)
- Prettier and ESLint run on commit
- Docker-ized for production like a bawsss

## Initial setup

- `npm install`

## Development

- `npm run start:local`
  - Start the dev server at [http://localhost:3000](http://localhost:3000)
- `npm test`
  - Start `jest` in watch mode

## Production

- `npm run build && npm run start:prod`
  - Bundle the JS and fire up the Express server for production
- `npm run docker`
  - Build and start a local Docker image in production mode (mostly useful for debugging)
