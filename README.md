# blocktrace-company
[![Maintainability](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/maintainability)](https://codeclimate.com/github/codeclimate/codeclimate/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/a99a88d28ad37a79dbf6/test_coverage)](https://codeclimate.com/github/codeclimate/codeclimate/test_coverage)
Web application and back-end code for companies to use to interface with the Hyperledger blockchain. This package allows any organization to view their users' personal information, sourced from the encrypted public ledger. Front- and back-end sources are included in `frontend` and submodule`CompanyBackendServer` respectively.

# Introduction
`frontend` contains the web application that can access the current instance of the company's customer data. Authorized staff are able to view and delete entries from the company's database through this web application. The demo is hosted at https://joel-huang.github.io/blocktrace-company. `frontend` includes a login page and the main webapp, and was built with bootstrap CSS elements and a custom styled table.

`CompanyBackendServer` is a [flask]("http://flask.pocoo.org/") back-end application written in Python 3. System tests written in Java and Python are also included. The demo server is hosted at https://shielded-bayou-99151.herokuapp.com, and includes a PostgreSQL database of its customer data along with its staff accounts. Functionality is exposed through the flask RESTful API.

# How to use
`frontend`
* Navigate to the [demo]("https://joel-huang.github.io/blocktrace-company") web app and login as `user1` or `user2` with the demo password `blocktrace`. You should be able to login if no other users are currently logged in.
* Click on `refresh database`, which sends an authenticated HTTP POST request to the `CompanyBackendServer`, and loads it in a heavily CSS-ed table.
* To remove a user from the company's database, click on the `remove` icon on the last column of each row. Confirmation will be requested as this process is non-reversible.   

`backend`
* Host the flask server on something like Heroku. You can access the PostgreSQL database using the methods in the `/Tests` folder to create new staff users, and for debugging purposes.
