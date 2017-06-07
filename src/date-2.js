(function(){

	var lang = "en";
	var langAttr = {
		'fr': {
			'daysLetterShort': ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
			'daysLetterFull': ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
			'monthsLetterShort': ['Jan','Fév','Mar','Avr','Mai','Jun','Jul','Aoû','Sep','Oct','Nov','Déc'],
			'monthsLetterFull': ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
		},
		'en': {
			'daysLetterShort': ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'],
			'daysLetterFull': ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
			'monthsLetterShort': ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
			'monthsLetterFull': ['January','February','March','April','May','June','July','August','September','October','November','December']
		}
	}

	var Date2 = function(_date, _delim) {
		
		/** Attribute **/

		var date = new Date(),
		delim = '/',
		stringDate = dateToString(date,delim);

		/** Constructor **/

		if(_date !== undefined){
			if(_delim === undefined){
				var found = false;
				var d = '';
				var counting = 0;
				var verif = true;
				for(var i=0;i<_date.length;i++){
					if(_date[i] > '9' || _date[i] < '0'){
						if(!found){
							counting++;
							found = true;
							d = _date[i];
						}
						else{
							if(counting === 1){
								if(d === _date[i]){
									counting ++;
								}
								else{
									verif = false;
									break;
								}
							}
							else{
								verif = false;
								break;
							}
						}
					}
				}
				if(verif && counting === 2){
					delim = d;
					stringDate = _date;
					var tmp = stringDate.split(delim);
					date = new Date(tmp[2]+delim+tmp[1]+delim+tmp[0]);
				}
			}
			else{

				var tmp = _date.split(_delim);
				if(tmp.length === 3){
					var verif = true;
					for(var i=0;i<3;i++){
						if(isNaN(tmp[i])){
							verif = false;
							break;
						}
					}
					if(verif){
						delim = _delim;
						stringDate = _date;
						date = new Date(tmp[2]+delim+tmp[1]+delim+tmp[0]);
					}
				}
			}
		}

		/** RPIVATE **/

		function isWorkingDay(date, delim){
			var d = dayOfWeek(date,delim);
			return d != 0 && d!=6;
		}

		function addWorkingDays(date, days, delim){
			if(days === 0)
				return date;
			var toAdd = days;
			var weekDay = dayOfWeek(date,delim);
			var d = date;

			if(weekDay===0){
				d = addDays(d,1,delim);
				weekDay = dayOfWeek(d,delim);
			}
			else if(weekDay===6){
				d = addDays(d,2,delim);
				weekDay = dayOfWeek(d,delim);
			}
			if(toAdd<=6-weekDay){
				return addDays(d,toAdd,delim);
			}
			else{
				d = addDays(d,6-weekDay+2,delim);
				toAdd -= 6-weekDay;
				var weeks = Math.floor(toAdd / 5);
				var left = toAdd % 5;
				if(left ===0){
					return addDays(d,(weeks-1)*7 + 5,delim);
				}
				else{
					return addDays(d,weeks*7 + left,delim);
				}
			}
		}

		function removeWorkingDays(date, days, delim){
			if(days === 0)
				return date;
			var toRemove = days;
			var weekDay = dayOfWeek(date,delim);
			var d = date;

			if(weekDay===0){
				d = removeDays(d,2,delim);
				weekDay = dayOfWeek(d,delim);
			}
			else if(weekDay===6){
				d = removeDays(d,1,delim);
				weekDay = dayOfWeek(d,delim);
			}
			if(toRemove < weekDay){
				return removeDays(d,toRemove,delim);
			}
			else{
				d = removeDays(d,weekDay+2,delim);
				toRemove -= weekDay;
				var weeks = Math.floor(toRemove/5);
				var left = toRemove % 5;
				if(left === 0){
					return removeDays(d,(weeks-1)*7 + 5,delim);
				}
				else{
					return removeDays(d,weeks*7 + left,delim);
				}
			}
		}

		function nextWorkingDay(date,delim){
			var weekDay = dayOfWeek(date,delim);
			if(weekDay === 0){
				return addDays(date,1,delim);
			}
			else if(weekDay ===6){
				return addDays(date,2,delim);
			}
			else if(weekDay ===5){
				return addDays(date,3,delim);
			}
			else{
				return addDays(date,1,delim);
			}
		}

		function previousWorkingDay(date,delim){
			var weekDay = dayOfWeek(date,delim);
			if(weekDay === 0){
				return removeDays(date,2,delim);
			}
			else if(weekDay === 1){
				return removeDays(date,3,delim);
			}
			else{
				return removeDays(date,1,delim);
			}
		}

		function addDays(date,days,delim){
			var d = stringToDate(date,delim);
			return dateToString( new Date(d.setTime( d.getTime() + days * 86400000 )), delim);
		}

		function removeDays(date,days,delim){
			var d = stringToDate(date,delim);
			return dateToString( new Date(d.setTime( d.getTime() - days * 86400000 )), delim);
		}

		function stringToDate(date, delim){
			var result = new Date();
			var tmp = date.split(delim);
			result.setDate(tmp[0]);
			result.setUTCMonth(tmp[1]-1);
			result.setFullYear(tmp[2]);
			return result;
		}

		function getDates(startDate, stopDate,delim) {
			var dateArray = new Array();
			var currentDate = startDate;
			while (compareDate(currentDate, '<=', stopDate, delim) ){
				dateArray.push( currentDate );

				currentDate = addDays(currentDate,1,delim);
			}
			return dateArray;
		}

		function getDay(date, delim){
			var tmp = date.split(delim);
			return parseInt(tmp[0]);
		}

		function getMonth(date, delim){
			var tmp = date.split(delim);
			return parseInt(tmp[1]);
		}

		function getYear(date, delim){
			var tmp = date.split(delim);
			return parseInt(tmp[2]);
		}

		function dayOfWeek(date, delim){
			var d = stringToDate(date,delim);
			return d.getDay();
		}

		function compareDate(first, sign, second, delim){

			var tmp = first.split(delim);
			var debut = [parseInt(tmp[0]),parseInt(tmp[1]),parseInt(tmp[2])];

			tmp = second.split(delim);
			var fin = [parseInt(tmp[0]),parseInt(tmp[1]),parseInt(tmp[2])];

			var d = debut[2]*372 + debut[1]*31 + debut[0];
			var f = fin[2]*372 + fin[1]*31 + fin[0];

			switch(sign){
				case '>=':
				return d >= f;
				case '<=':
				return d <= f;
				case '>':
				return d > f;
				case '<':
				return d < f;
				case '=':
				return d == f;
			}
		}

		function inRangeDate(first, second, totest, delim){
			var tmp = first.split(delim);
			var debut = [parseInt(tmp[0]),parseInt(tmp[1]),parseInt(tmp[2])];

			tmp = second.split(delim);
			var fin = [parseInt(tmp[0]),parseInt(tmp[1]),parseInt(tmp[2])];

			tmp = totest.split(delim);
			var test = [parseInt(tmp[0]),parseInt(tmp[1]),parseInt(tmp[2])];

			var sumDebut = debut[2]*372 + debut[1]*31 + debut[0];
			var sumFin = fin[2]*372 + fin[1]*31 + fin[0];
			var sumTest = test[2]*372 + test[1]*31 + test[0];

			if(sumDebut > sumFin){
				sumDebut = sumDebut + sumFin;
				sumFin = sumDebut - sumFin;
				sumDebut = sumDebut - sumFin;
			};

			return (sumTest >= sumDebut) && (sumTest <= sumFin);
		}

		function dateToString(date, delim){
			return ( (date.getDate()>9)?date.getDate():'0'+date.getDate() )
			+delim
			+ ( ((date.getUTCMonth()+1)>9)?(date.getUTCMonth()+1): ('0'+(date.getUTCMonth()+1)) )
			+delim
			+date.getFullYear();
		}

		function dayOfWeekLetterShort(date, delim){
			var x = dayOfWeek(date,delim);
			if(lang === 'fr'){
				return langAttr.fr.daysLetterShort[x];
			}
			else{
				return langAttr.en.daysLetterShort[x];
			}
		}

		function dayOfWeekLetterFull(date, delim){
			var x = dayOfWeek(date,delim);
			if(lang === 'fr'){
				return langAttr.fr.daysLetterFull[x];
			}
			else{
				return langAttr.en.daysLetterFull[x];
			}
		}

		function monthLetterShort(date,delim){
			var x = getMonth(date,delim);
			if(lang === 'fr'){
				return langAttr.fr.monthsLetterShort[x];
			}
			else{
				return langAttr.en.monthsLetterShort[x];
			}
		}

		function monthLetterFull(date,delim){
			var x = getMonth(date,delim);
			if(lang === 'fr'){
				return langAttr.fr.monthsLetterFull[x];
			}
			else{
				return langAttr.en.monthsLetterFull[x];
			}
		}

		function toStringFormatted(date,delim,format){
			var util = [
			[''+getDay(date,delim),date.split(delim)[0],dayOfWeekLetterShort(date,delim),dayOfWeekLetterFull(date,delim)],
			[''+getMonth(date,delim),date.split(delim)[1],monthLetterShort(date,delim),monthLetterFull(date,delim)],
			['',''+(getYear(date,delim)%100),'',''+getYear(date,delim)]
			];
			var pointer = {table: -1, index: 0};
			var result = '';
			var f = format.toLowerCase();
			for(var i=0;i<f.length;i++){
				var go = true;
				var incorrect = [false,false,false,false];
				var now = 0;
				if(f[i] == 'd'){
					now = 0;
				}
				else if(f[i] == 'm'){
					now = 1;
				}
				else if(f[i] == 'y'){
					now = 2;
					incorrect[0] = incorrect[2] = true;
				}
				else{
					go = false;
				}

				if(go){
					if(pointer.table != -1){
						if(pointer.table!=now){
							if(incorrect[pointer.index]){
								throw "Date Format Exception: The date format is incorrect";
							}
							result += util[pointer.table][pointer.index];
							pointer.table = now;
							pointer.index = 0;
						}
						else if(pointer.index<3){
							pointer.index++;
							if(i == f.length-1){
								if(incorrect[pointer.index]){
									throw "Date Format Exception: The date format is incorrect";
								}
								result += util[pointer.table][pointer.index];
							}
						}
						else{
							throw "Date Format Exception: The date format is incorrect";
						}
					}
					else{
						pointer.table = now;
						pointer.index = 0;
					}
				}
				else{
					if(pointer.table != -1){
						if(incorrect[pointer.index]){
							throw "Date Format Exception: The date format is incorrect";
						}
						result+= util[pointer.table][pointer.index] + f[i];
						pointer.table = -1;
					}
					else{
						result += f[i];
					}
				}
			}

			return result;
		}

		function dayDifference(date1, date2, delim){
			var d1 = new Date(),
			d2 = new Date();

			if(compareDate(date1,'>',date2,delim)){
				d2 = stringToDate(date1,delim);
				d1 = stringToDate(date2,delim);
			}
			else{
				d1 = stringToDate(date1,delim);
				d2 = stringToDate(date2,delim);
			}

			return parseInt((d2 - d1) / (1000 * 60 * 60 * 24));
		}

		function update(dateString){
			stringDate = dateString;
			var tmp = stringDate.split(delim);
			date = new Date(tmp[2]+delim+tmp[1]+delim+tmp[0]);
		}

		function transformDate2ToString(date2){
			var s = date2.toString();
			var tmp = s.split(s[2]);
			return tmp[0] + delim + tmp[1] + delim + tmp[2];
		}

		/** PUBLIC **/

		this.setDelim = function(d){
			if((''+d).length == 0)
				throw "Delimitor Length Exception: The delimitor provided have a length of zero";
			var tmp = stringDate.split(delim);
			delim = d;
			stringDate = tmp[0]+d+tmp[1]+d+tmp[2];
		}

		this.toString = function(){
			return stringDate;
		}

		this.isWorkingDay = function(){ 
			return isWorkingDay(stringDate,delim);
		};

		this.addWorkingDays = function(days){
			var x = addWorkingDays(stringDate,days,delim);
			update(x);
		}

		this.removeWorkingDays = function(days){
			var x = removeWorkingDays(stringDate,days,delim);
			update(x);
		}

		this.addDays = function(days){
			var x = addDays(stringDate,days,delim);
			update(x);
		}

		this.removeDays = function(days){
			var x = removeDays(stringDate,days,delim);
			update(x);
		}

		this.getJSDate = function(){
			return date;
		}

		this.getDay = function(){
			return getDay(stringDate,delim);
		}

		this.getMonth = function(){
			return getMonth(stringDate,delim);
		}

		this.getYear = function(){
			return getYear(stringDate,delim);
		}

		this.dayOfWeek = function(){
			return dayOfWeek(stringDate,delim);
		}

		this.compareDate = function(date){
			var toCompare = transformDate2ToString(date);

			if(compareDate(stringDate,'>',toCompare,delim))
				return 1;
			else if(compareDate(stringDate,'<',toCompare,delim))
				return -1;
			else
				return 0;
		}

		this.isInRange = function(firstDate, secondDate){
			var first = transformDate2ToString(firstDate);
			var second = transformDate2ToString(secondDate);
			return inRangeDate(first,second,stringDate,delim);
		}

		this.dayOfWeekLetterShort = function(){
			return dayOfWeekLetterShort(stringDate,delim);
		}

		this.dayOfWeekLetterFull = function(){
			return dayOfWeekLetterFull(stringDate,delim);
		}

		this.monthLetterShort = function(){
			return monthLetterShort(stringDate,delim);
		}

		this.monthLetterFull = function(){
			return monthLetterFull(stringDate,delim);
		}

		this.dayDifference = function(_date){
			var d = transformDate2ToString(_date);
			return dayDifference(stringDate, d, delim);
		}

		this.getNextDay = function(){
			return new Date2(addDays(stringDate,1,delim));
		}

		this.nextDay = function(){
			var x = addDays(stringDate,1,delim);
			update(x);
		}

		this.getPreviousDay = function(){
			return new Date2(removeDays(stringDate,1,delim));
		}

		this.previousDay = function(){
			var x = removeDays(stringDate,1,delim);
			update(x);
		}

		this.getNextWorkingDay = function(){
			return new Date2(nextWorkingDay(stringDate,delim));
		}

		this.nextWorkingDay = function(){
			var x = nextWorkingDay(stringDate,delim);
			update(x);
		}

		this.getPreviousWorkingDay = function(){
			return new Date2(previousWorkingDay(stringDate,delim));
		}

		this.previousWorkingDay = function(){
			var x = previousWorkingDay(stringDate,delim);
			update(x);
		}

		this.setLangage = function(newLang){
			if(newLang.trim().toLowerCase()!=="fr" && newLang.trim().toLowerCase()!=="en")
				throw 'Incompatible Langage Exception: ' + "This module only accepts English('en') or French('fr') langages";
			lang = newLang.trim().toLowerCase();
		}

		this.getLangage = function(){
			return lang;
		}

		this.toStringFormatted = function(format){
			return toStringFormatted(stringDate,delim,format);
		}

		/*if (obj instanceof Date2) return obj;
		if (!(this instanceof Date2)) return new Date2(obj);*/
		
	};



	/** This part is copied from Underscore.js 1.8.3 with modification **/
	// Create a safe reference to the Date2 object for use below.

	var root = this;

	// Export the Date2 object for **Node.js**, with
	// backwards-compatibility for the old `require()` API. If we're in
	// the browser, add `Date2` as a global object.
	if (typeof exports !== 'undefined') {
		if (typeof module !== 'undefined' && module.exports) {
			exports = module.exports = Date2;
		}
		exports.Date2 = Date2;
	} else {
		root.Date2 = Date2;
	}

	/** End copie **/

}());