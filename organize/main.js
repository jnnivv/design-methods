var colours = [
	"#eeacac",
	"#f6cea8",
	"#f7e697",
	"#c7eeab",
	"#abd5ee",
	"#c3d9e6",
	"#d4c3e6",
	"#d9cadc",
	"#e5bccb",
	"#edc8c8",
	"#ffdcaa",
	"#d2ede3",
	"#d2daed"
];

$(document).ready(function() {
	
	$.ajaxSetup({
		beforeSend: function(xhr) {
			if (xhr.overrideMimeType) {
				xhr.overrideMimeType("application/json");
			}
		}
	});
	
	// populate profiles

	$.getJSON("twitter306.json" , function(data) {
		console.log(data.users[5]);
		
		for(var i = 0; i < data.users.length; i++) {
			var s = data.users[i].profile_image_url.replace(/_normal/g, "");
			var img = "<img src = \"" + s + "\"/>";
			var name = data.users[i].name;
			var desc = data.users[i].description; 
			var twitter = data.users[i].screen_name;
			var website = data.users[i].url;
			makeDiv(img, name, desc, twitter, website);
		}
		
	});
	
	$("div.main").css('opacity', '1');
					
	$('body').on('mouseover', '.user', function(){
		$(this).parent().append(this);
	});
			
	var modal = document.getElementById('modal');
			
	$('body').on('click', '.user', function(){
  		
		var position = $(this).offset();
		console.log(position);
		$('#modal').css(position);
		modal.style.display = "block";
		console.log($(this).data("desc"));
		$('.text').empty();
		$('.text').append("<span class=\"name\">" + $(this).data("name") + "</span> <br>");
		$('.text').append("<span class=\"desc\">" + $(this).data("desc") + "</span><br>");
		$('.text').append("<span class=\"twitter\"><a href=\"http://twitter.com/" + $(this).data("twitter")
			+ "\" target=\"new\">"
			+ "@" + $(this).data("twitter") + "</a></span><br>");

		if($(this).data("website") != null) {
			$('.text').append("<span class=\"web\"><a href=\"" + $(this).data("website") + "\"  target=\"new\">Website</a></span><br>");
		}
  		
	});
	
	$('span.close').on('click', function() {
		modal.style.display = "none";
	});

});


function makeDiv(img, name, desc, twitter, website) {

	// vary size for fun
	var divsize = ((Math.random()*150) + 100).toFixed();
	var hex = Math.round(Math.random()*10).toString(16);
	var color = '#'+ hex + hex + hex;
	var rndCol = Math.floor(Math.random()*colours.length);

	$newdiv = $('<div/>').css({
		'width':divsize+'px',
		'height':divsize+'px',
		'background-color': colours[rndCol],
		//'border-radius': 5+'px',
	});
	
	// make position sensitive to size and document's width
	var posx = (Math.random() * ($(document).width() - divsize)).toFixed();
	var posy = (Math.random() * ($(document).height() + 1500 - (divsize*3)) + 90).toFixed();
	
	$newdiv.append(img);
	$newdiv.addClass("user");
	$newdiv.draggable();
	$newdiv.css({
			'position':'absolute',
			'left':posx+'px',
			'top':posy+'px',
			'display':'none'
	}).appendTo( 'body' ).fadeIn(100).delay(1000);

	$newdiv.data({"name": name, "desc": desc, "twitter": twitter, "website": website});
   
}
