# StyleMatch

This project is a fashion shopping website with a style quiz, Amazon India affiliate product suggestions, and a simple Express backend.

What this app does:
- lets a user choose a category and age group on the home page
- saves that choice in the browser with localStorage
- opens a My Style page with products from Amazon India
- shows product cards, price filters, and Amazon affiliate links
- keeps Amazon keys in a .env file instead of frontend code

## 1) Install

Open a terminal in the project folder and run:

```bash
npm install
```

## 2) Set up your Amazon keys

Create a file called `.env` in the project root. You can copy the sample file:

```bash
copy .env.example .env
```

Then open `.env` and add your real Amazon values:

```env
PORT=3001
ACCESS_KEY=your_access_key
SECRET_KEY=your_secret_key
PARTNER_TAG=your_associate_tag
```

Important:
- keep this file private
- do not put these values in frontend React files
- the backend reads them securely from the server

## 3) Run the app

For local development, start both the backend and the frontend together:

```bash
npm run dev
```

This runs:
- backend API on http://localhost:3001
- frontend app on http://localhost:5173

If you want to run only the backend:

```bash
npm run server
```

If you want to build the frontend for production:

```bash
npm run build
```

## 4) Main app flow

1. Open the home page
2. Pick a category and age group
3. Click “See My Style”
4. The app saves your choices in localStorage and sends you to My Style
5. The page calls the backend API to fetch Amazon products
6. Product cards show the image, title, price, and a Buy on Amazon button

## 5) Project file guide (easy explanation)

- `src/App.jsx` — tells the app which page to show for each URL
- `src/pages/Home.jsx` — home page with the style selector form
- `src/pages/MyStyle.jsx` — the page showing filtered Amazon product cards
- `src/affiliate-style.css` — the styling for the selector and product cards
- `src/index.css` — the older app styling used across the project
- `src/main.jsx` — loads the app into the browser
- `server/index.js` — Express backend that talks to the Amazon Product Advertising API
- `.env.example` — sample file with the keys needed for the backend
- `.gitignore` — hides local secret files like `.env`
- `vite.config.js` — config for the React app and the API proxy
- `package.json` — lists project scripts and dependencies

## 6) Backend API details

The server exposes this endpoint:

```http
GET /api/products?gender=Women&age=Adult%2018-35&type=shirts
```

It builds a search keyword from your selected values and calls Amazon Product Advertising API 5.0.

It returns only the fields needed by the frontend:
- title
- image URL
- price
- DetailPageURL

## 7) Amazon affiliate note

The app uses the Amazon product DetailPageURL directly, so the affiliate tag is already included. The button opens in a new tab with:

```html
rel="nofollow sponsored noopener" target="_blank"
```

Page footer includes:

> As an Amazon Associate I earn from qualifying purchases.

## 8) Safety and limits

- credentials are kept in `.env`
- rate limiting is enabled in the backend
- responses are cached for 1 hour to reduce extra Amazon calls
- loaders, empty states, and error states are included

## 9) Useful commands

```bash
npm install
npm run dev
npm run build
npm run server
```

If you want to change the look of the product cards or homepage, edit the CSS files in `src/` and refresh the browser.

## 10) Important notes

- This app uses real Amazon product search data, so it needs valid Amazon API credentials.
- Without valid credentials, the backend will show a friendly error instead of crashing.
- The website is mobile friendly and designed to work well on phones and tablets.

