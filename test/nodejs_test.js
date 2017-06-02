var Date2 = require('../src/date2.min.js');
var date = new Date2('25-03-2016','-');
console.log('date: ' + date);
date.addDays(3);
console.log('date + 3 days: ' + date);
date.removeDays(1);
console.log('date - 1 days: ' + date);
console.log('day of the week: ' + date.dayOfWeek());
console.log('day of week english: ' + date.dayOfWeekLetters('en'));
console.log('day of week francais: ' + date.dayOfWeekLetters('fr'));
console.log('is a working day: ' + date.isWorkingDay());
var date2 = new Date2('25 03 2016');
console.log('second date: ' + date2);
date2.setDelim('-');
console.log('setDelim \'-\': ' + date2);
console.log('day difference: ' + date.dayDifference(date2));
var date3 = new Date2('30 05 2017');
console.log('third date: ' + date3);
console.log(date3 + ' is in Range [' + date2 + ',' + date + '] ?: ' + date3.isInRange(date,date2));
var date3 = new Date2('26-03-2016');
console.log('third date: ' + date3);
console.log(date3 + ' is in Range [' + date2 + ',' + date + '] ?: ' + date3.isInRange(date,date2));