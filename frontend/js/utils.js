/* Comment Test Git */

var isEmpty = function(o) {
  return ((o == undefined) || (o == null));
}

Array.prototype.min = function () {
  return this.reduce(function (p, v) {
  	if(p==null)
  		return v;
  	if(v==null)
  		return p;
    return ( p < v ? p : v );
  });
}

Array.prototype.max = function () {
  return this.reduce(function (p, v) {
  	if(p==null)
  		return v;
  	if(v==null)
  		return p;
    return ( p > v ? p : v );
  });
}

Number.prototype.decimalPlaces = function() {
  var match = (''+this).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
  if (!match) { return 0; }
  return Math.max(
       0,
       // Number of digits right of decimal point.
       (match[1] ? match[1].length : 0)
       // Adjust for scientific notation.
       - (match[2] ? +match[2] : 0));
}


Date.prototype.format = function(){
    this._nowFormat = arguments[0] || 'jj/mm/aaaa';
        this._toLen2 = function(_nowStr){
            _nowStr = _nowStr.toString();
                return ('0'+_nowStr).substr(-2,2);
            };
        this._nowFormat = this._nowFormat.replace(/j+/, this._toLen2(this.getDate()));
        this._nowFormat = this._nowFormat.replace(/m+/, this._toLen2(this.getMonth()+1));
        this._nowFormat = this._nowFormat.replace(/a+/, this.getFullYear());
        this._nowFormat = this._nowFormat.replace(/h+/, this._toLen2(this.getHours()));
        this._nowFormat = this._nowFormat.replace(/i+/, this._toLen2(this.getMinutes()));
        this._nowFormat = this._nowFormat.replace(/s+/, this._toLen2(this.getSeconds()));
        return this._nowFormat;
}

String.prototype.formatToDate = function(){
    var endDateJs = this.split("/");
    return new Date(Date.UTC(endDateJs[2], endDateJs[1]-1, endDateJs[0]));
}


String.prototype.formatToDateJSon = function(){
    var endDateJs = this.split("/");
    return new Date(Date.UTC(endDateJs[2],endDateJs[1]-1,endDateJs[0],0,0)).toJSON();
}
