import { Frame, Section, $ } from "./libs/gui.js";
import Swiper from "./libs/swiper.js";
import { pickRandom, randFrom } from "./libs/rand.js";
import { name } from "./info.js";
import axios from "axios";
import { TOKEN } from "./token.js";

const logic = {};

const win = window, doc = document, 
	  $win = $(win), $doc = $(doc);

function firstWordFromId(element, addClass) {
  var jsIntro = $(element)[0];
  var originalString = jsIntro.innerHTML;
  var splitWords = originalString.split(" ");
  if(splitWords.length < 2) return;
  jsIntro.innerHTML =
    "<span class=" + addClass + ">"
    .concat(splitWords[0], "</span>") + "&#32;" + originalString
    .substr(originalString.indexOf(" ") + 1);
}

function contact(name, subject, message){
	if(!name || !subject || !message) return;
	var text = `Name: ${name};\nSubject: ${subject};\nMessage:\n${message}`;
	
	axios.post(`https://api.telegram.org/${TOKEN}/sendMessage`, {
	  chat_id: 482859236,
	  text,
	})
	.then(response => {
	  $('form').append('<div class="message">Message delivered!</div>');
	})
	.catch(error => {
	  console.log('Sending Failed');
	});
	// axios.post('/contact', { name, subject, message})
	// .then(() => {
	// 	$('form').append('<div class="message">Message delivered!</div>');
	// });
}

logic.init = () => {

	logic.offsetColorchange = new Frame('#skills').offset().top;
	logic.offsetNavShow = new Frame('#about').offset().top;

	logic.offsetSegments = 'hero|about|skills|projects|contact'.split('|').map(item => [item, new Frame('#'+item).offset().top, $('#'+item)]);

	function selectSegment(segment){
		$('[data-target]').removeClass('active');
		$('[data-target="'+segment+'"]').addClass('active');
	}

	$win.on('scroll', (e) => {
		var { scrollTop, scrollHeight, clientHeight } = $('html')[0];

		// If at bottom
		if(scrollTop + clientHeight + 100 >= scrollHeight){}

		if(scrollTop+100 >= logic.offsetColorchange) {
			$(':root').addClass('overscroll');
		} else {
			$(':root').removeClass('overscroll');
		}

		if(scrollTop+100 >= logic.offsetNavShow) {
			$(':root').addClass('nav-fixed');
		} else {
			$(':root').removeClass('nav-fixed');
		}

		logic.offsetSegments.forEach((segment, index) => {
			var next = logic.offsetSegments[index+1] || [null, logic.offsetSegments[logic.offsetSegments.length-1][1]*2];
			if(scrollTop+100 >= segment[1] && scrollTop+100 < next[1]){
				selectSegment(segment[0]);
				if(segment[0] == 'skills'){
					if(segment.done) return;

					segment[2].find('.skill').each(function(){
						$(this).css({
							// left: randFrom(30, 80)+'%',
							// top: randFrom(40, 80)+'%'
							'--moved-rotate': randFrom(45, -45)+'deg'
						});
						$(this).addClass('moved');
					});

					segment.done = true;
				}
			}
		});

	});

	$('.block-title').each(function(){
		firstWordFromId($(this), 'first-word');
	});

	const swiper = new Swiper('.swiper.projects', {
	  speed: 400,
	  slidesPerView: 1,
	  spaceBetween: 10,
	   navigation: {
	    nextEl: '.swiper-button-next',
	    prevEl: '.swiper-button-prev',
	  }
	});

	$('[data-target]').on('click', function(){
		var frame = new Frame('#'+$(this).attr('data-target'));
		$(":root").animate({
			scrollTop: frame.offset().top
		});
	});

	$('.navbar').on('contextmenu', (e) => {
		e.preventDefault();
		$('.navbar').toggleClass('compact');
	});

	$('.xterm-screen').css('width', $('.xterm-screen').closest('.hero-area-terminal').width())

	// \x1B[1;3;31mxterm.js\x1B[0
	var text = [`\x1B[1;3;32mstart \x1B[0m`,
				`intro`,
				'\n\r',
				'Hello, welcome to \x1B[1;3;35m'+name+"\x1B[0m's portfolio",
				'\n\r',
				"This is my portfolio, You can read stuff about me",
				"\n\rYou should also check out my projects.\n\r",
				" $ \x1B[1;3;32mcat \x1B[0mcode.js",
				'\n\r',
				`"use strict";
async function a(t={}) {
    return i({
        type: "pageview",
        options: {
            withReferrer: t.withReferrer
        }
    })
}
async function r(t, e) {
    return i({
        type: "event",
        data: {
            name: t,
            data: e
        },
        options: {
            withReferrer: !0
        }
    })
}
`.replace(/\n/g, '\n\r'),
				'\n\r',
				' $ '].join('')

	var letters = text.split('');
	letters.forEach((letter, index) => setTimeout(() => logic.term.write(letter), (75*index)));

	$('form').on('submit', (e) => {
		e.preventDefault();

		contact($("#name").val().trim(), $("#subject").val().trim(), $("#message").val().trim());
	});
}

export default logic;
