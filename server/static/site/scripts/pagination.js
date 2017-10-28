String.prototype.formatUnicorn = String.prototype.formatUnicorn ||
function () {
    "use strict";
    var str = this.toString();
    if (arguments.length) {
        var t = typeof arguments[0];
        var key;
        var args = ("string" === t || "number" === t) ?
            Array.prototype.slice.call(arguments)
            : arguments[0];

        for (key in args) {
            str = str.replace(new RegExp("\\{" + key + "\\}", "gi"), args[key]);
        }
    }

    return str;
};

var CSApp={};
CSApp.total_list=[];
CSApp.init_tile_info=function(){
	CSApp.total_list.push(CSApp.create_tile({
		link:"/pdfViewer/web/viewer.html?doc=asclepius",
		image_src:"site/images/moon.jpg",
		image_alt:"Asclepius",
		title:"Asclepius",
		tag: "Writing [13 pages]",
		type: 'writing-tag',
		date_added: Date.parse("October 28, 2017"),
		desc:"Isolated on a remote lunar research station, Rebecca engrossed herself in her work. However, the arrival of a near earth object might spell doom for her and her team."
	}));
	CSApp.total_list.push(CSApp.create_tile({
		link:"/pdfViewer/web/viewer.html?doc=run",
		image_src:"site/images/running.jpg",
		image_alt:"Run for Your Life",
		title:"Run for Your Life",
		tag: " Writing [6 pages] ",
		type: 'writing-tag',
		date_added: Date.parse("October 28, 2017"),
		desc: "Its a long run. Spencer has done ten miles before, but as night falls and the moon comes out, will he be ready for what happens next?"
	}));
	CSApp.total_list.push(CSApp.create_tile({
		link:"https://dawn-of-man.herokuapp.com/",
		image_src:"site/images/dawn-of-man.jpg",
		image_alt:"Dawn of Man",
		title:"Dawn of Man",
		tag: " Game [Text-Simulation] ",
		type: "game-tag",
		date_added: Date.parse("October 28, 2017"),
		desc: "A Text-Based simulation of an early neolithic village. As headman of the village, take control of production, defense and daily life."
	}));
	CSApp.total_list.push(CSApp.create_tile({
		link:"http://animusmined.nfshost.com/",
		image_src:"site/images/animus-mined.jpg",
		image_alt:"Animus Mined",
		title:"Animus Mined",
		tag: " Game [Mining Side-scroller] ",
		type: "game-tag",
		date_added: Date.parse("October 28, 2017"),
		desc: "Animus Mined is a 2-d space themed mining game made in Unity. You play as a NASA mining robot tasked with retrieving what scans indicate may be an alien artifact."
	}));
}
CSApp.create_html=function(obj){
	var toReturn=""+
    "<div class='w3-third w3-container w3-margin-bottom'>"+
      "<a href='{link}'>"+
      	"<img src='{image_src}' alt='{image_alt}' class='w3-hover-opacity grid-image'>"+
      "</a>"+
      "<div class='w3-container w3-white grid-tile'>"+
      	"<div class='grid-header'>"+
	        "<div class='grid-header-left'>"+
	        	"<p><b>{title}</b></p>"+
	       	"</div>"+
	       	"<div class='grid-header-right {type}'>"+
	       		"<p>{tag}</p>"+
	       	"</div>"+
	    "</div>"+
        "<p>{desc}</p>"+
      "</div>"+
    "</div>";
    return toReturn.formatUnicorn(obj);

}
CSApp.create_tile=function(obj){
	obj.html=CSApp.create_html(obj);
	return obj;
}

CSApp.init_grid=function(){
	toReturn="";

	for(i=0;i<CSApp.total_list.length;i+=1){
		if (i%3==0){
			toReturn+="<div class='w3-row-padding'>";
			closed=false;
		}
		toReturn+=CSApp.total_list[i].html;
		if (i%3==2){
			toReturn+="</div>";
			closed=true;
		}
	}
	if(!closed){
		toReturn+="</div>";
	}
	document.getElementById("insertion").innerHTML=toReturn;
}
CSApp.init=function(){
	CSApp.init_tile_info();
	window.onload = function () {
		CSApp.init_grid();
	}
}


CSApp.init();
console.log(CSApp);

