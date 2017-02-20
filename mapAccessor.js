//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

function mapMatch(filter_list){
	var result = new Point('hi',0,0);

	var min = 1000;

	var cal_id = [], cal_rssi = [];
	for(var i=0; i<filter_list.length; i++){
		cal_id.push(filter_list[i].BeaconID);
		cal_rssi.push(filter_list[i].RSSI);
	}

	//for(var i=0; i<referencePoint.length; i++){
		for(var i=0; i<accessPoint.length; i++){
		// var reference_rssi = getReferenceRSSI(cal_id,referencePoint[i]);
		var reference_rssi = getReferenceRSSI(cal_id,accessPoint[i].beacons);

		var temp = euclideanDistance(cal_rssi,reference_rssi);

		if(temp < min){
			min = temp;
			// result = new Point('cal_location',referencePoint[i].x,referencePoint[i].y);
			result = new Point('cal_location',accessPoint[i].x,accessPoint[i].y);
		}
	}
	return result;
}

//get the rssi list from reference points
// function getReferenceRSSI(idArr,refArr){
// 	var result = [];
// 	for(var i=0; i<idArr.length; i++){
// 		for(var j=1; j<=objectLength(refArr)-2; j++){
// 			if(idArr[i]==j) result.push(refArr[j]);
// 		}
// 	}
// 	return result;
// }
function getReferenceRSSI(idArr,refArr){
	var result = [];
	for(var i=0; i<idArr.length; i++){
		for(var j=0; j<objectLength(refArr); j++){
			if(idArr[i]==refArr[j].bid) result.push(refArr[j].rssi);
		}
	}
	return result;
}

function euclideanDistance(arr1,arr2){
	var sum =0;
	for(var i=0; i<arr1.length; i++){
		sum += sq(arr1[i]-arr2[i]);
	}
 	return sqrt(sum/arr1.length);
}

