//editer: Jack Mooltham
//FYP: Automatic Parking Space Allocation and
// Indoor Parking Lot Navigation System with Beacon

//temp delete after array input work//
var test_data = []; //{beacons:{bid, rssi}}

for(var i=0; i<ppts.length; i++){
	var temp = [];
	for(key in ppts[i]){
		temp.push({bid:key, rssi:ppts[i][key]});
	}
	test_data.push({beacons:temp});
}

window.onload = main();

function main(){
	printc();

	var count = 0;

	var timer = setInterval( function(){
		//Input test data
		if(count<ppts.length){
		///////////Start Code////////////
			//input data into algorithm
			var userPoint = fingerPrint(test_data[count]); //change back to test_data when array works
			//output point for each <output_rate>
			if(userPoint != Point()){
				printv((count+1)+" "+userPoint.getInfo());
				printnl();
			}
		///////////End Code//////////////
			count++;
		} else{
			printv("End of sample");
			clearInterval(timer);
		}
		}, beacon_response_time);

	printv("Done~");
	printnl();
}

//HTML Output
function printc(){
	document.getElementById("output").innerHTML = "";
}

function printnl(){
	document.getElementById("output").innerHTML += "<br/>";
}

function printv(a){
	document.getElementById("output").innerHTML += a;
}

function printa(arr){
	for (var i = 0; i < arr.length ; i++) {
		document.getElementById("output").innerHTML += arr[i]+" ";
	};
	document.getElementById("output").innerHTML += "<br/>";
}

function printFilter(){
  for(var i=0; i<filterList.length; i++){
    printv("( ID: "+filterList[i].BeaconID
    +" ,Conuter: "+filterList[i].counter
    +" ,RSSI: "+parseInt(filterList[i].RSSI*10)/10
    +" ,Distance: "+parseInt(filterList[i].Distance*10)/10
    +" ,life: "+filterList[i].life
    +" )"
  );
    printnl();
  }
}

//Line Chart
function plotLine(title,line0,line1,Container){
	var chart = new CanvasJS.Chart(Container,
    {
      title:{
     	 text: title
      },
      axisX:{
        title: "Data Point",
        interval: 50
     },
       data: [
      	{ type: "scatter", dataPoints: line0 }
      	,{ type: "scatter", dataPoints: line1 }
      ]
    });
    chart.render();	
}

//Canvas Functions
function drawBackground(picture){
	var c=document.getElementById("myCanvas");
    var ctx=c.getContext("2d");
    ctx.fillStyle = "#212830";
	ctx.fillRect(0, 0, c.width, c.height);
    var img = document.getElementById('background');
    ctx.drawImage(img,150,150);
}

function drawPoint(Bisect, color="white",size=1,fill='none'){
	var x = Bisect.x;
	var y = Bisect.y;

	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.strokeStyle=color;
	ctx.beginPath();
	ctx.arc(x+150, depth_pixel-y+150, size, 0, 2 * Math.PI);
	ctx.stroke();
	if(fill=='filled'){
		ctx.fillStyle = color;
		ctx.fill();
	}else{
		ctx.beginPath();
		ctx.arc(x+150, depth_pixel-y+150, 1, 0, 2 * Math.PI);
		ctx.stroke();
		ctx.beginPath();
		ctx.arc(x+150, depth_pixel-y+150, (size-1)/2, 0, 2 * Math.PI);
		ctx.stroke();
	}

}

function drawMap(activeBeacon,calPoint,calPoint1){
	//Background
	var beacon_color = 'grey';
	var active_beacon_color = 'HotPink';
	var real_location_color = 'LemonChiffon';
	var cal_location_color = 'Chartreuse';

	drawBackground("floorPlan");
	//Beacon Location
	drawPoint(new Point(1,0,177),beacon_color,size=10,'filled');
	drawPoint(new Point(2,0,311),beacon_color,size=10,'filled');
	drawPoint(new Point(3,156,400),beacon_color,size=10,'filled');
	drawPoint(new Point(4,156,0),beacon_color,size=10,'filled');
	drawPoint(new Point(5,311,267),beacon_color,size=10,'filled');
	drawPoint(new Point(6,311,133),beacon_color,size=10,'filled');
	//Working Beacon
	drawPoint(new Point(activeBeacon[0],beaconDeployment[activeBeacon[0]].x,beaconDeployment[activeBeacon[0]].y),active_beacon_color,size=9);
	drawPoint(new Point(activeBeacon[1],beaconDeployment[activeBeacon[1]].x,beaconDeployment[activeBeacon[1]].y),active_beacon_color,size=9);
	drawPoint(new Point(activeBeacon[2],beaconDeployment[activeBeacon[2]].x,beaconDeployment[activeBeacon[2]].y),active_beacon_color,size=9);
	//calcalted location
	drawPoint(calPoint,cal_location_color,size=10,"filled");
	//Real Location
	drawPoint(new Point('real',222,111),real_location_color,size=10);
	
}


