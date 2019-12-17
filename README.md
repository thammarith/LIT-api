# LINE LIFF API

## Prerequisites

Make sure you have the following installed:

- Git
- Node.js
- NPM

## Installation

Clone the repository using

```bash
git clone https://github.com/thammarith/LIT-api.git
cd LIT-api/
```

Install the dependencies using

```bash
npm install
```

### Deploy on Heroku

In order to make it function properly, it is strongly advised to deploy this to Heroku or the host of your choice.

Run

```bash
heroku create
```

Note the name of `https://{NAME_OF_THE_APP}.herokuapp.com` since it is needed to configure the backend (product management)

Run

```bash
git push heroku master
```

to deploy on Heroku

## Running the app

Visit `https://{NAME_OF_THE_APP}.herokuapp.com` to make sure that it runs properly

## Configure other repository

### LINE-LIFF

On the `LIT-LIFF` repository, change the `apiUrl` in `LIT-LIFF/public/connect-api.js` to `https://{NAME_OF_THE_APP}.herokuapp.com` that you got from the earlier steps

### LIT-backend

On the `LIT-backend`, change the `host` variable in `LIT-backend/src/config.js` to `{NAME_OF_THE_APP}.herokuapp.com` that you got from the earlier steps
