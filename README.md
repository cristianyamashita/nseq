# nseq

## Introduction
nseq is a module to simplify the usage of callbacks at Node.Js.<br>
This module will not replace the call backs usage, but will simplify it.<br>
Also will reduce the number of infinite indentations, when need to make many functions that depends from call back.

## Install
```sh
npm install nseq
```

## Example of how it works
```javascript
var nseq = require('nseq');
// 1 - Create a new instance
s = new nseq();
// 2 - Do a sequence of functions
s.do([
  function(self) {
    // 3 -  Do any callback execution
    any_call_back_execution(function() {
      // 4 - When complete, call self.next
      self.next();
    });
  },
  function(self) {
    // 5 - Continue executing the callbacks as you need.
    any_other_call_back_execution(function(name, date_of_birth) {
      // 6 - Do what you need, before from call the next.
      var age = dob2a(date_of_birth);
      // 7 - Set arguments for the next sequence
      self.next(name, age);
    });
  },
  function(self, name, age) {
    // 8 - Arguments passed in the last sequence will arrive in the current
    // 9 - Continue your code....
    self.next();
  }
]);
```


## Methods
### constructor([options])
Constructor can be used to set parameters to be used in the sequences.
##### Parameter
```options``` : (optional): An object with variables.<br>
Each variable will be accessible as ```self.name_of_variable```
##### Return
Null
##### Example
```javascript

var s = new nseq({
     "test_number": 1,
     "test_string"   : "myVal"
  });
s.add([
  function (self) {
    console.log("Number",self.test_number);
    console.log("String",self.test_string);
  },
...
```

### add(function_array_list)
Add sequences with out execute.
##### Parameter
```function_array_list``` :  A list of functions to be executed.
##### Return
nseq object will be returned, what allow to chain other methods.
##### Example
```javascript
var s = new nseq();
s.add([
  function (self) {
    console.log("This is my 1st sequence");
    self.next();
  },function (self) {
    console.log("This is my 2nd sequence");
    self.next();
  },function (self) {
    console.log("This is my 3rd sequence");
    self.next();
  }
]);
```

### do([function_array_list])
Execute the list of sequences.<br>
If a ```function_array_list``` be passed, then first add this to the list of sequences, and then execute.<br>
##### Parameter
```function_array_list``` (optional) : A list of functions to be executed.
##### Return
nseq object will be returned, what allow to chain other methods.
##### Example
```javascript
var s = new nseq();
s.do([
  function (self) {
    console.log("This is my 1st sequence");
    self.next();
  },function (self) {
    console.log("This is my 2nd sequence");
    self.next();
  },function (self) {
    console.log("This is my 3rd sequence");
    self.next();
  }
]);
```

### clone()
Colne an existing nseq object.<br>
Useful to run the same sequence of functions with different parameters. 
##### Note:
This method may not with work with old version of NodeJS, tested with v5.10.0
##### Parameter
None.
##### Return
A new nseq object.
##### Example
```javascript
var s = new nseq();
s.add([
  function (self) {
    console.log("This is my 1st sequence, with user name:", self.username);
    self.next();
  },function (self) {
    console.log("This is my 2nd sequence, with user name:", self.username);
    self.next();
  }
]);
s.username = "Jhon";
var s2 = s.clone();
s2.username = "Ana";
s.do();
s2.do2();
```

### end = function
Set the ```end``` propriety with a function to be executed with all sequences finish.
##### Example
```javascript
var s = new nseq();
s.end = function(self,data){
  console.log("My Data", data);
};
s.add([
  function (self) {
    console.log("This is my 1st sequence");
    self.next();
  },function (self) {
    console.log("This is my 2nd sequence");
    self.next();
  },function (self) {
    console.log("This is my 3rd sequence");
    # As there are no more sequences, then it will call `end` function.
    self.next({"number":123});
  }
]);
```




## More Examples

### Simple example

```javascript
s = new nseq();
s.do([
  function(self) {
    var num = 1;
    // Example of a setTimeout call back
    setTimeout {
      function() {
        num = num + 1;
        // When complete the task, call self.next, passing any argument.
        self.next(num);
      }
    }
  },
  function(self, num) {
    // The arguments passed in the previous sequence will arrive in the next.
    // In this example, is the "num"

    // Do any other task
    num = num + 1;

    // Can call more sequences if needed.
    self.next(num);
  }
]);
```
### Full example
```javascript
var nseq = require('nseq');
// Create a new instance
s = new nseq();

// ...
connection.connect();

// Add the functions sequence, but with out execute.
s.add([
  function(self) {
    // Get user id
    connection.query('SELECT user_id from user_table where name=?', [self.username], function(err, rows, fields) {
      if (err) throw err;
      self.next(rows[0].user_id);
    });
  },
  function(self, user_id) {
    // Get session_id
    connection.query('SELECT session_id from session_table where id=?', [user_id], function(err, rows, fields) {
      if (err) throw err;
      if(rows.length > 0){
        self.next(rows[0].session_id, user_id);  
      }else{
        self.end("session not found");
      }
    });
  },
  function(self, session_id, user_id) {
    // Get user data
    connection.query('SELECT * from data_table where session=? and user=?', [session_id, user_id], function(err, rows, fields) {
      self.end(err, rows[0]);
    });
  }
]);
// Set parameters, it will be accessible as self.username
s.username = "petter";
// Set a function, to when finish.
s.end = function(err,data){
  if (err) throw err;
  console.log("user data:", data);
}
// Start the execution
s.do();
```
## Todo
 - Fix the clone for older versions of NodeJS.
 - Improve the tests.
 - Improve the examples.
