const colours = [
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

const users = [];

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
		
		for(let i = 0; i < data.users.length; i++) {
			const s = data.users[i].profile_image_url.replace(/_normal/g, "");
			const img = "<img src = \"" + s + "\"/>";
			const name = data.users[i].name;
			const desc = data.users[i].description;
			const twitter = data.users[i].screen_name;
			const website = data.users[i].url;
			const user = makeUser(img, name, desc, twitter, website);
			users.push(user);
		}
		
	});
	
	$('body').on('mouseover', '.user', function() {
		$(this).parent().append(this);
	});
	
	const modal = document.getElementById('modal');
	
	$('body').on('click', '.user', function(){
  	
		const position = $(this).offset();
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

	$('.filter-button').hover(function() {
		let filter = $(this).attr('id');
		switch (filter) {
			case "ui-filter":
				users.forEach(function(user) {
					if (user.data("desc").match(/ui/)) {
						console.log("match");
					}
					else {
						console.log("no match");
					}
				});
				break;
			case "ux-filter":
				if (user.data("desc").match(/ui/)) {
					console.log("match");
				}
				else {
					console.log("no match");
				}
				break;
			default:

				break;
		}
	});

});

function makeUser(img, name, desc, twitter, website) {

	// vary size for fun
	const divsize = ((Math.random()*150) + 100).toFixed();
	const rndCol = Math.floor(Math.random()*colours.length);

	$newuser = $('<div/>').css({
		'width':divsize+'px',
		'height':divsize+'px',
		'background-color': colours[rndCol]
	});
	
	// make position sensitive to size and document's width
	const posx = (Math.random() * ($(document).width() - divsize)).toFixed();
	const posy = (Math.random() * ($(document).height() + 1500 - (divsize*3)) + 140).toFixed();
	
	$newuser.append(img);
	$newuser.addClass("user");
	$newuser.draggable();
	$newuser.css({
			'position':'absolute',
			'left':posx+'px',
			'top':posy+'px',
			'display':'none'
	}).appendTo( 'body' ).fadeIn(100).delay(1000);

	$newuser.data({"name": name, "desc": desc, "twitter": twitter, "website": website});
  return $newuser;
}
