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
CSApp.page=2;
CSApp.ROWSIZE=3;
CSApp.NUMROWS=2;
CSApp.GRIDSIZE=CSApp.ROWSIZE*CSApp.NUMROWS;
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
	CSApp.total_list.push(CSApp.create_tile({
		link:"/pdfViewer/web/viewer.html?doc=anemptyvirus",
		image_src:"site/images/virus.jpg",
		image_alt:"An Empty Virus",
		title:"An Empty Virus",
		tag: "Writing [3 pages]",
		type: "writing-tag",
		date_added: Date.parse("October 28, 2017"),
		desc: "Within the underground research facility of a psychic collective, a technology meant to help millions goes horribly wrong."
	}));
	for(var i=0;i<10;i+=1){
		CSApp.total_list.push(CSApp.fake_tile(i));
	}
}
CSApp.fake_tile=function(num){
	return CSApp.create_tile({
		link:"/pdfViewer/web/viewer.html?doc=anemptyvirus",
		image_src:"site/images/virus.jpg",
		image_alt:"An Empty Virus",
		title:"TEST "+num,
		tag: "Writing [3 pages]",
		type: "writing-tag",
		date_added: Date.parse("October 28, 2017"),
		desc: "Within the underground research facility of a psychic collective, a technology meant to help millions goes horribly wrong."
	})
};
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
	var toReturn="";
	var start=CSApp.GRIDSIZE*CSApp.page;
	var closed;
	for(var i=start;i<(start+CSApp.GRIDSIZE) && (i<CSApp.total_list.length);i+=1){
		if (i%CSApp.ROWSIZE==0){
			toReturn+="<div class='w3-row-padding'>";
			closed=false;
		}
		toReturn+=CSApp.total_list[i].html;
		if (i%CSApp.ROWSIZE==(CSApp.ROWSIZE-1)){
			toReturn+="</div>";
			closed=true;
		}
	}
	if(!closed){
		toReturn+="</div>";
	}
	document.getElementById("insertion").innerHTML=toReturn;
}

CSApp.incr_page=function(){
	var num_pages=Math.floor(CSApp.total_list.length/CSApp.GRIDSIZE)+1;
	var max_page_index=num_pages-1;
	if(CSApp.page<max_page_index){
		CSApp.page+=1;
		CSApp.refresh_nav_grid();
	}
}
CSApp.decr_page=function(){
	if(CSApp.page>0){
		CSApp.page-=1;
		CSApp.refresh_nav_grid();
	}
}
CSApp.set_page=function(new_page_index){
	var num_pages=Math.floor(CSApp.total_list.length/CSApp.GRIDSIZE)+1;
	var max_page_index=num_pages-1;
	if(new_page_index>=0 && new_page_index<=max_page_index){
		CSApp.page=new_page_index;
		CSApp.refresh_nav_grid();
	}else{
		console.log("WRONG "+new_page_index);
	}
}
CSApp.refresh_nav_grid=function(){
	CSApp.generate_nav();
	CSApp.init_grid();
}

CSApp.generate_nav=function(){
	var left_bound="<a id='nav-left' href='#' class='w3-bar-item w3-button w3-hover-black'>&laquo;</a>";
	var right_bound="<a id='nav-right' href='#' class='w3-bar-item w3-button w3-hover-black'>&raquo;</a>";
	var toReturn=left_bound;
	var num_pages=Math.floor(CSApp.total_list.length/CSApp.GRIDSIZE)+1;
	for(var i=0;i<num_pages;i+=1){
		var selected="<a href='#' class='w3-bar-item w3-black w3-button page-link'>"+(i+1)+"</a>";
		var page_link="<a href='#' class='w3-bar-item w3-button w3-hover-black page-link'>"+(i+1)+"</a>";
		if (i==CSApp.page){
			toReturn+=selected;
		}else{
			toReturn+=page_link;
		}
	}
	toReturn+=right_bound;
	document.getElementById("nav-insertion").innerHTML=toReturn;
	document.getElementById("nav-left").onclick=CSApp.decr_page;
	document.getElementById("nav-right").onclick=CSApp.incr_page;
	var page_links=document.getElementsByClassName("page-link");
	for(var j=0; j<page_links.length; j+=1){
		var cur_link=page_links[j];
		page_links[j].onclick=function(){CSApp.set_page(parseInt(page_links[j].innerText));};
	}
}
CSApp.init=function(){
	CSApp.init_tile_info();
	window.onload = function () {
		CSApp.refresh_nav_grid();
	}
}


CSApp.init();
console.log(CSApp);

