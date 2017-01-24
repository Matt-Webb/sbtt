The key things I have tried to address in this test are:

* A standalone module which has basic I/O in JSON using nodes out-of-the-box `fs` module.
* A module written in ES6/ES2015
* A reasonable level of test coverage
* Address security without using using a SQL/NoSQL solution

Things under an 8 hour constraint I have failed to address sufficiently / at all:
* scalability, this very crude read / write example is poor, there is no write queuing, no data indexing, read streaming etc.
* caching, this could have be easily added using reddis, a key value store.
    * i.e https://www.npmjs.com/package/express-redis-cache
* full test coverage:
    * if no file is supplied or the file is deleted. Ooops
    * multiple writes (locked file). Ka boom!
* build process (using either webpack or gulp)

#### _Important_
The frontend is entirely boilerplate, I take no credit for this, this can be found here: https://auth0.com/docs/quickstart/webapp/nodejs

Requirements:
* Node v6+
https://nodejs.org/en/

Or via a Version Manager:
* NVM https://github.com/creationix/nvm
* N https://github.com/tj/n

```
npm install
```

This is important, the main database directory is the 'magic' has been performed, this is all written in ES6 and I have slotted it into a ES5 boilerplate.

```
npm run transpile
```

Run project
```
npm start
```

Run tests
```
npm tests
```

Please review code written in the `database` directory, here I have decoupled each module (service, util, model) and exposed a basic api at the root of this directory.
