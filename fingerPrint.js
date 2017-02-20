//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

var count = 0;

function fingerPrint(test_data_row){
	var output = Point("buffer",0,0);

	//Put each datapoint into Kalman Filter
	var active_id = []
	for(var i=0; i<test_data_row.beacons.length; i++){
		active_id.push(test_data_row.beacons[i].bid);
		rssiProcess(test_data_row.beacons[i].bid, test_data_row.beacons[i].rssi, test_data_row.beacons.length-i);
	}
	updateLife(active_id);

	//Take the useful entities in the filterList to map reference point


	//Output user location from the filterList
	if((count+1)%output_point==0){ //ouput valid value for every <output_point>
		if(filterList.length>=1){
			var userPt = mapMatch(filterList);
			output = userPt;
		}
	}


	count++;
	if((count)==output_point) count=0;

	return output;  //attribute: name, x, y
}