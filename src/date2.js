(function(){

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

		function addNonWorkingDays(date, days, delim){
			var d = date;
			var toAdd = 0;
			var final = 0;
			var begin = 0;
			for(var i=1;i<=days;i++){
				if(!isWorkingDay(addDays(date,i,delim),delim)){
					toAdd++;
				}
			}

			final = days+toAdd;
			begin = days;
			d = addDays(d,days,delim);

			while(toAdd){
				var last = toAdd;
				toAdd = 0;
				for(var i=begin+1;i<=final;i++){
					if(!isWorkingDay(addDays(d,i-begin,delim),delim)){
						toAdd++;
					}
				}

				var f = final;
				final += toAdd;
				begin = f;
				d = addDays(d,last,delim);
			}

			return addDays(date,final,delim);
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

		function dayOfWeekLetters(date, delim, lang){
			if(lang === 'fr'){
				var x = dayOfWeek(date,delim);
				switch(x){
					case 0: return 'Dim'; break;
					case 1: return 'Lun'; break;
					case 2: return 'Mar'; break;
					case 3: return 'Mer'; break;
					case 4: return 'Jeu'; break;
					case 5: return 'Ven'; break;
					case 6: return 'Sam'; break;
				}
			}
			else{
				var x = dayOfWeek(date,delim);
				switch(x){
					case 0: return 'Sun'; break;
					case 1: return 'Mon'; break;
					case 2: return 'Tue'; break;
					case 3: return 'Wed'; break;
					case 4: return 'Thu'; break;
					case 5: return 'Fri'; break;
					case 6: return 'Sat'; break;
				}
			}
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

		this.addNonWorkingDays = function(days){
			var x = addNonWorkingDays(stringDate,days,delim);
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

		this.dayOfWeekLetters = function(lang){
			return dayOfWeekLetters(stringDate,delim,lang);
		}

		this.dayDifference = function(_date){
			var d = transformDate2ToString(_date);
			return dayDifference(stringDate, d, delim);
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

})();