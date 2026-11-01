# Warehouse IMS

A small inventory management project to practice building a full-stack app with React, FastAPI and MongoDB, from the database to deployment.

You can add, edit and delete products, restock or reduce their stock, and see a history log of every change. The dashboard cards show total products, total stock, out of stock and expiring soon. Alert rows list out-of-stock, expiring soon and expired products, and clicking one filters the product list.

**Live demo:** https://warehouse-ims-frontend.vercel.app
**API docs:** https://warehouse-backend-seven.vercel.app/docs

## What I practiced
- FastAPI with Pydantic models, services and CRUD routes
- MongoDB Atlas with PyMongo
- React (hooks, props, a shared refresh key so every component updates after a change)
- Tailwind CSS and turning a Figma layout into code
- Deploying frontend and backend as two Vercel projects, with environment variables and CORS
- Git and GitHub workflow

## Known limitations
- Only one inventory. The title is a constant, and I skipped the multi-inventory and landing page idea to finish on time.
- Search and filtering run in the browser, which is fine for the small starting dataset, but would not scale to a large one.
- The backend is serverless, so the first request after idle time can be slow.
- No login.

## Status
Done for now.

## Data
[The starting data is (source of your starting data).](https://www.kaggle.com/datasets/willianoliveiragibin/grocery-inventory)
