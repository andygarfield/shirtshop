# ShirtShop
A shopping app for a t-shirt business

[View Live Demo](http://andygarfield.me/)

## Installation
### Dependencies
On all systems, you'll need [Docker](https://www.docker.com) and [Node.js](https://nodejs.org).

### macOS / *nix
Clone the git repository and build
```bash
git clone https://github.com/andygarfield/shirtshop.git
cd shirtshop
sh build.sh
```

## Running
### Production
A couple settings that need to be set for production
1. Change the `MYSQL_PASSWORD` environemnt variable inside `./docker-compose.prod.yml` to a better password
2. Change the password inside `./server/src/datasources/mysql.datasource.json` to match
3. Get rid of `env="sandbox"` in the PayPal component in the `./client/src/components/TheCartViewer.vue` file to take PayPal out of sandbox mode.

Docker Compose will then run the production stack all at once
```bash
docker-compose -f docker-compose.prod.yml up
```

### Development
You need to change the host in the `./server/src/datasources/mysql.datasource.json` file to `localhost`. While developing, you start the database, the back-end server, and the front-end server seperately. The Vue server is hot-reloading so you can see front-end changes immediately.
```bash
docker-compose -f docker-compose.dev.yml up
```
In a different session
```
cd server
npm start
```
In yet another session
```bash
cd client
npm run serve
```

## Architechture
### Frontend
The client-side is built with Vue + Vuetify. State is managed with the Vuex extension. When the app is first loaded, all of the products are fetched from the `/api/products` endpoint. The page filters are also fetched from the `/api/departments` and `/api/categories` endpoints. Each API call is saved in SessionStorage in such a way that each subsequent request for that resource is pulled from cache. A page refresh clears all the cached API calls.

### Backend
The server-side API layer is built with Loopback 4 while the other server routing is done through Express. Loopback handles each SQL table as its own model. Loopback will automatically name your model classes with an upper-case name. Since this class name is also how it connects to the database, and MySQL table names are case-sensitive, the models are broken by default. If adding a model, you would need to rename the model class instance to match the name and case of the SQL table it refers to.

### Directory structure
```
.
├───client                     # The front-end source directory
│   ├───public                 # Static source files including `index.html`
│   └───src                    # Main front-end source directory
│       ├───auth               # Auth0 service for handing authentication
│       ├───components         # Various Vue components used in rendering the page
│       ├───plugins            # Plugins for Vue
│       └───store              # Vuex functions used in managing app state
└───server                     # Back-end source directory
    ├───public                 # Static assets directory where the built front-end is served from
    └───src                    # Main server source directory
        ├───controllers        # Loopback controllers
        ├───datasources        # Loopback data sources
        ├───models             # Loopback models
        └───repositories       # Loopback repositories
```
