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

		data.users.sort(compareTime);
		console.log(data.users);
		//let {0 : a ,length : l, [l - 1] : b} = data.users;
		//console.log(a, b)
		const first = Date.parse(data.users[0].created_at);
		const last = Date.parse(data.users[data.users.length-1].created_at);
		const followers = getMinMaxFollowers(data.users);


		for(let i = 0; i < data.users.length; i++) {
			const s = data.users[i].profile_image_url.replace(/_normal/g, "");
			const img = "<img src = \"" + s + "\"/>";
			const name = data.users[i].name;
			const desc = data.users[i].description;
			const twitter = data.users[i].screen_name;
			const website = data.users[i].url;
			const dateNum = Date.parse(data.users[i].created_at) - first; // adjust the offset of the date time in order to compute the fractional of the range
			const dateRange = last - first;
			const dateFraction = dateNum / dateRange;
			// range of size: 200
			const followerNum = data.users[i].followers_count - followers.min;
			const followerFraction = followerNum / (followers.max - followers.min);

			const user = makeUser(img, name, desc, twitter, website, dateFraction, followerFraction);
			users.push(user);
		}

	});



	$('body').on('mouseover', '.user', function() {
		const rndCol = Math.floor(Math.random()*colours.length);
		//$(this).css({backgroundColor: colours[rndCol]});
		$(this).css( {boxShadow: '-10px 10px 25px 0 rgba(0, 0, 0, 0.15)'});
		$(this).parent().append(this);
	});

	$('body').on('mouseout', '.user', function() {
		$(this).css( {boxShadow: '0 0 5px 0 rgba(0, 0, 0, 0.1'});

		//$(this).css({backgroundColor: 'white'});
		//$(this).parent().append(this);
	});

	$('body').on('mouseover', '.main', function() {
		const rndCol = Math.floor(Math.random()*colours.length);
		$(this).css('color', colours[rndCol]);
		//$(this).css({backgroundColor: 'white'});
		//$(this).parent().append(this);
	});




	const modal = document.getElementById('modal');

	$('body').on('click', '.user', function(){

		const position = $(this).offset();



		if(position.left > $(document).width() * 0.5) {
			position.left = position.left - (($('.popup').width() / 100) * $(document).width());
		} else {
			position.left = position.left + ($(this).width() * 0.7);
		}

		if(position.top > $(document).width() * 0.9) {
			//position.top = position.top -
		}

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


	$('.filter-button').click(function() {

			$('.filter-button').each(function() {
				$(this).css({backgroundColor: '#f1f1f1'});
				$(this).css('color', '#000');
			});

		let filter = $(this).attr('id');
		switch (filter) {
			case "product-filter":
			$(this).css({backgroundColor: '#ba44dc'});

			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/product/i)) {
						$(this).css({backgroundColor: '#f09cac'});
						$(this).addClass("pink");
						$(this).removeClass("white");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						//$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).parent().append(this);
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");

						//$(this).css({background: 'none'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).css({backgroundColor: 'white'});
						$(this).fadeTo("slow", 0.33);
					}
				});
				break;
			case "ux-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
				if ($(this).data("desc").match(/ux/i)) {
					console.log("match: " + $(this).data("desc"));
					$(this).css({backgroundColor: '#2e33ff'});
					$(this).addClass("blue");
					//$(this).removeClass("blue");
					$(this).removeClass("yellow");
					$(this).removeClass("brightgreen");
					$(this).removeClass("deepblue");
					$(this).removeClass("pink");
					$(this).removeClass("purple");
					$(this).removeClass("red");
					$(this).removeClass("palegreen");
					$(this).removeClass("palepink");
					$(this).removeClass("white");
					$(this).parent().append(this);
					$(this).fadeTo("slow", 1);
				}
				else {
					console.log("no match");
					$(this).css({backgroundColor: 'white'});
					$(this).removeClass("blue");
					$(this).removeClass("yellow");
					$(this).removeClass("brightgreen");
					$(this).removeClass("deepblue");
					$(this).removeClass("pink");
					$(this).removeClass("purple");
					$(this).removeClass("red");
					$(this).removeClass("palegreen");
					$(this).removeClass("palepink");

					$(this).addClass("white");
					$(this).fadeTo("slow", 0.33);
				}
				});
				break;

			case "ceo-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/(founder|ceo)/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).css({backgroundColor: '#ffdf89'});
						$(this).addClass("yellow");
						$(this).removeClass("blue");
						//$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");

						$(this).parent().append(this);
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
			case "graphic-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/(graphic|visual)/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).css({backgroundColor: '#319cf6'});
						$(this).addClass("deepblue");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						//$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");

						$(this).parent().append(this);
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
			case "ill-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/(illustrator|zines|draw|artist|illustration|art|paint)/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).css({backgroundColor: '#a531f6'});
						$(this).addClass("brightgreen");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						//$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");
						$(this).parent().append(this);
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
			case "director-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/director/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).parent().append(this);
						$(this).css({backgroundColor: '#ffee2e'});
						$(this).addClass("purple");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						//$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
			case "developer-filter":
			$(this).css({backgroundColor: '#ba44dc'});
			$(this).css('color', '#fff');
			$('.user').each(function() {
					if ($(this).data("desc").match(/(developer|code|program)/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).parent().append(this);
						$(this).css({backgroundColor: '#692eff'});
						$(this).addClass("red");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						//$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
					case "entr-filter":
					$(this).css({backgroundColor: '#ba44dc'});
					$(this).css('color', '#fff');
					$('.user').each(function() {
					if ($(this).data("desc").match(/(entrepreneur|business)/i)) {
						console.log("match: " + $(this).data("desc"));
						$(this).parent().append(this);
						$(this).css({backgroundColor: '#ff2e3d'});
						$(this).addClass("palegreen");
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						//$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).removeClass("white");
						$(this).fadeTo("slow", 1);
					}
					else {
						console.log("no match");
						$(this).css({backgroundColor: 'white'});
						$(this).removeClass("blue");
						$(this).removeClass("yellow");
						$(this).removeClass("brightgreen");
						$(this).removeClass("deepblue");
						$(this).removeClass("pink");
						$(this).removeClass("purple");
						$(this).removeClass("red");
						$(this).removeClass("palegreen");
						$(this).removeClass("palepink");
						$(this).addClass("white");
						$(this).fadeTo("slow", 0.33);
					}
					});
					break;
					case "game-filter":
					$(this).css({backgroundColor: '#ba44dc'});
					$(this).css('color', '#fff');
					$('.user').each(function() {
							if ($(this).data("desc").match(/(game)/i)) {
								console.log("match: " + $(this).data("desc"));
								$(this).parent().append(this);
								$(this).css({backgroundColor: '#2eff9f'});
								$(this).addClass("palepink");
								$(this).removeClass("blue");
								$(this).removeClass("yellow");
								$(this).removeClass("brightgreen");
								$(this).removeClass("deepblue");
								$(this).removeClass("pink");
								$(this).removeClass("purple");
								$(this).removeClass("red");
								$(this).removeClass("palegreen");
								//$(this).removeClass("palepink");
								$(this).removeClass("white");
								$(this).fadeTo("slow", 1);
							}
							else {
								console.log("no match");
								$(this).css({backgroundColor: 'white'});
								$(this).removeClass("blue");
								$(this).removeClass("yellow");
								$(this).removeClass("brightgreen");
								$(this).removeClass("deepblue");
								$(this).removeClass("pink");
								$(this).removeClass("purple");
								$(this).removeClass("red");
								$(this).removeClass("palegreen");
								$(this).removeClass("palepink");
								$(this).addClass("white");
								$(this).fadeTo("slow", 0.33);
							}
							});
							break;
			default:

				break;
		}


		});

	});

function compareTime(a, b) {

	if(Date.parse(a.created_at) > Date.parse(b.created_at)) {
		return 1;
	}

	if(Date.parse(a.created_at) < Date.parse(b.created_at)) {
		return -1;
	}

	return 0;
}

function getMinMaxFollowers(users) {
	let minFollowers = Number.MAX_VALUE;
	let maxFollowers = Number.MIN_VALUE;

	users.forEach(function(user) {
		minFollowers = Math.min(minFollowers, user.followers_count);
		maxFollowers = Math.max(maxFollowers, user.followers_count);
	});

	return {
		min: minFollowers,
		max: maxFollowers
	}

}

function makeUser(img, name, desc, twitter, website, dateFraction, followerFraction) {

	// vary size for fun
	var divsize = ((Math.random()*100) + 100).toFixed();
	if($(document).width() >= 2300) {
		divsize *= 2;
	} else if ($(document).width() >= 1800 && $(document).width() < 2300) {
		divsize *= 1.4;
	} else if ($(document).width() > 1500 && $(document).width() < 1800) {
		divsize *= 1.2;
	}
	//100 + (500*followerFraction);
	//

	const rndCol = Math.floor(Math.random()*colours.length);

	$newuser = $('<div/>').css({
		'width':divsize+'px',
		'height':divsize+'px',
		//'border': '1px solid #888',
		'box-shadow': '0 0 5px 0 rgba(0, 0, 0, 0.1)',
		'background-color': 'white'//colours[rndCol]
	});

	// make position sensitive to size and document's width
	const posx = (Math.random() * ($(document).width() - divsize)).toFixed();
	var posy;
if($(document).height() > 1400) {
	posy = 650 + (dateFraction*$(document).height());
} else {
	posy = 400 + (dateFraction*$(document).height());
}

	//400 + (dateFraction*$(document).height());
	//
	//(Math.random() * ($(document).height() + 700 - (divsize*3)) + 140).toFixed();

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
