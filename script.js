$(document).ready(function(){

$("[name='my-checkbox']").bootstrapSwitch();

API="http://gainsight.0x10.info/api/image?page_no=";	////API declaration
var i=0;
json="";
NProgress.configure({ easing: 'ease', speed: 500 });	////nprogress compare

callapi();

$('div').on('hover', 'img.lazy', function() {			////Add tooltip to all DOM Images
 $('[data-toggle="tooltip"]').tooltip(); 
});

$('div').on('click', 'img.lazy', function() {			////Add piechart to all DOM Images on click
        

        	if(typeof(Storage) !== "undefined") {
			   	if (localStorage.clickcount) {			 // Code for localStorage/sessionStorage.
		            localStorage.clickcount = Number(localStorage.clickcount)+1;
		        } else {
		            localStorage.clickcount = 1;
		        }										
		        document.getElementById("lik").innerHTML= localStorage.clickcount;
			} else {
			    alert("Sorry No Web Storage support");
			}
		    var name=$(this).attr('name');
		    var d1=parseInt($(this).attr('d1'),10);
		    var d2=parseInt($(this).attr('d2'),10);
		    var d3=parseInt($(this).attr('d3'),10);

		    var p1 = d1/(d1+d2+d3)*100;
		    var p2 = d2/(d1+d2+d3)*100;
		    var p3 = d3/(d1+d2+d3)*100;

		   var chart = new CanvasJS.Chart("chartContainer",
			{
				title:{
					text:"Image:"+name
				},
		                animationEnabled: true,
				legend:{
					verticalAlign: "center",
					horizontalAlign: "left",
					fontSize: 20,
					fontFamily: "Helvetica"        
				},
				theme: "theme2",
				data: [
				{        
					type: "pie",       
					indexLabelFontFamily: "Garamond",       
					indexLabelFontSize: 20,
					indexLabel: "{label} {y}%",
					startAngle:-20,      
					showInLegend: true,
					toolTipContent:"{legendText} {y}%",
					dataPoints: [
						{  y: p1.toFixed(2), legendText:"USA", label: "USA" },
						{  y: p2.toFixed(2), legendText:"China", label: "China" },
						{  y: p3.toFixed(2), legendText:"India", label: "India" },
					]
				}
				]
			});
			chart.render();
    });

   	

function callapi(){								////Infinite Scroll function to load images 

	var link=API+i;
	NProgress.start();
	$.getJSON(link, function (json) {

	    id=0;
	    var act = json;
	    $.each(act,function(){
	    	

	    	var name = this['name'];
	    	var url =this['url'];
	    	var d1 =this['demographic'].USA;
	    	var d2 =this['demographic'].China;
	    	var d3 =this['demographic'].India;

	    	$('#0').append("<img src='"
	    		+url+"' class='img-responsive img-thumbnail lazy ' data-toggle='tooltip' 
	    		title='Click Twice to Like' name='"+name+"' style='height:200px; width:200px' 
	    		d1='"+d1+"' d2='"+d2+"' d3='"+d3+"'></img>");

	    });  
	});

	$("img.lazy").lazyload({
	   event: "scrollstop"
	});
	i++;
	NProgress.done();
}

$('#imgcont').bind('scroll', function () {												////Check Condition for infinite scroll
        if ($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight) {
        	
        	if($("[name='my-checkbox']").is(':checked'))								///// check status of toggle button
            	callapi();
                   
		}
});
	
console.clear();																	////Added Profile 
console.log("--------------------> Pratik Shenoy <----------------------");
console.log("Profile");
console.log("http://be.net/ps48");
console.log("http://in.linkedin.com/in/pshenoy36");
console.log("http://fb.com/ps48");
});




