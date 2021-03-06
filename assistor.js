//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon


//Class & object
function Point(name="", x=0, y=0){
	this.name = name;
	this.x = x;
	this.y = y;
}

Point.prototype.getInfo = function() {
    return this.name+" ( "+this.x+", "+this.y+" )";
};

function objectLength(a){
	var count = 0;
	var i;

	for (i in a) {
	    if (a.hasOwnProperty(i)) {
	        count++;
	    }
	}

	return count;
}

//Math
function sq(a){
	return Math.pow(a,2);
}

function sqrt(a){
	return Math.sqrt(a);
}



