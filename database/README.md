Bespoke JSON document read / write module in node using ES6.

The primary aim of the module was to expose the functionality for creating and retrieving "presenter" Objects.

## Usage
```
  import db from 'database';
```

##### Methods:

CREATE

```
  db.createPresenter( presenter, (err, data ) => {
    if( err ) return console.log( err.message );
    console.log( data );
  });
```

GET
```
  db.getPresenters( ( err, data ) => {
    if( err ) return console.log( err.message );
    console.log( data );
  });
```

Disclaimer:

This is far from a robust solution to JSON I/O, I have intentionally named my methods in the service for the purpose readability for the reviewer, taking into account the specific context (SkyBet Presenters) when reading the code both in the unit tests and functional code samples.
