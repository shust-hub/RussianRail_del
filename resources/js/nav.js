$(document).ready(function() {
	//move nav element position according to window width
	moveNavigation();
	$(window).on('resize', function(){
		(!window.requestAnimationFrame) ? setTimeout(moveNavigation, 300) : window.requestAnimationFrame(moveNavigation);
	});

	//mobile version - open/close navigation
	$('.nav-trigger').on('click', function(event){
		event.preventDefault();
		if($('header').hasClass('nav-is-visible')) $('.moves-out').removeClass('moves-out');

		$('header').toggleClass('nav-is-visible');
		$('.navigation').toggleClass('nav-is-visible');
		$('main').toggleClass('nav-is-visible');
	});

	//mobile version - go back to main navigation
	$('.go-back').on('click', function(event){
		event.preventDefault();
		$('.navigation').removeClass('moves-out');
	});

	//open sub-navigation
	$('.navigation__list').on('click', function(event){
		if($(this).hasClass('active')) {
			$('.navigation li').removeClass('active');
			$('.navigation').removeClass('moves-out');
		} else {
			$('.navigation li').removeClass('active');
			$(this).addClass('active');
			$('.navigation').removeClass('moves-out');
			$(this).parent().addClass('moves-out');
		}
	});

	function moveNavigation(){
		var navigation = $('nav');
		var screenSize = checkWindowWidth();
		if ( screenSize ) {
			//desktop screen - insert navigation inside header element
			navigation.detach();
			navigation.insertBefore('.nav-trigger');
		} else {
			//mobile screen - insert navigation after main element
			navigation.detach();
			navigation.insertAfter('main');
		}
	}

	function checkWindowWidth() {
		var mq = window.getComputedStyle(document.querySelector('header'), '::before').getPropertyValue('content').replace(/"/g, '');
		return ( mq == 'mobile' ) ? false : true;
	}
});