# Date2 #

[![npm](https://img.shields.io/npm/v/date-2.svg?style=flat-square&maxAge=600)](https://www.npmjs.com/package/date-2) [![Bower](https://img.shields.io/bower/v/date-2.svg?style=flat-square&maxAge=600)](https://github.com/touir1/Date2) [![npm](https://img.shields.io/npm/dm/date-2.svg?style=flat-square&maxAge=600)](https://www.npmjs.com/package/date-2) [![npm](https://img.shields.io/npm/l/date-2.svg?style=flat-square)]()

Date2 is a Javascript module created to manipulate the date. It was designed to easily manipulate the date and it provides a pretty fair number of functions that are easy to use. This module can be used in a **Javascript** or a **Node.js** application.

[wiki](https://github.com/touir1/Date2/wiki) - [website](https://touir1.github.io/Date2/)

## Dependencies ##

This module was developed in pure javascript so it has **no dependencies**.

## Usage ##

to use Date2 module with javascript you need to:

```html
<script type="text/javascript" src="./date2.js"></script>
```

```javascript
var date = new Date2(); //gives the current date
var date = new Date2('01-01-2017') //detects automatically the separator and it uses DD MM YYYY as a format
var date = new Date2('01-01-2017','-') //the second parameter is optional, it specifies the separator used
```
and for a Node.js application:
```node
var Date2 = require('./date2.js');
var date = new Date2();
```

## Functionalities

```javascript

date.setDelim(delim); // changes the delimitor
date.isWorkingDay(); // returns true if it's saturday or sunday
date.addNonWorkingDays(days); // adds days to the date while ignoring saturday and sunday
date.addDays(days); // adds days to the date
date.removeDays(days); // removes days from the date
date.getJSDate(); // returns the Javascript Date object
date.getDay(); // returns the day of the month as an integer
date.getMonth(); // returns the month
date.getYear(); // returns the year
date.dayOfWeek(); // returns the day of the week as an integer (between 0 and 6)
date.dayOfWeekLetters(langage) // returns the acronym of the day of the week (langage: 'en' / 'fr' and is in english by default)
date.compareDate(date2) // compares between date and date2 (-1: date < date2, 1: date > date2, 0: date == date2)
date.isInRange(date1,date2) // returns true if date between date1 and date2 inclusive
date.dayDifference(date2) // returns the difference in days between date and date2
```

## Changelog

* 1.0.0: the first release

## Authors

* Mohamed Ali Touir
  * Github: [https://github.com/touir1](https://github.com/touir1)
  * Email: [touir.mat@gmail.com](touir.mat@gmail.com)

## License 

Date2 is published under the [MIT license](http://www.opensource.org/licenses/mit-license)

## Special thanks 

underscore.js used from [jashkenas/underscore](https://github.com/jashkenas/underscore).
