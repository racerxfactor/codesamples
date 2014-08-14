$(document).ready(function() {
	/*Index page*/
	$("#globalHeader").globalNavigation();

	function elementsSize () {
		$(".customLine").width($(".headWrap").offset().left + 150);
		/*==Carousel size==*/
		if ($(".footerBottom").is(":visible")) {
			var winheight = $(window).height() ;

			$(".sliderHeight ").css("height", winheight);
		}
		/*==end:Carousel size==*/
	}
	elementsSize ();
	$(window).resize(function() {
		elementsSize ();
	});
	/*end:Index page*/


/*==For all pages==*/

var secondary = $(".footerInner");
var check = true;
$(window).scroll(function() {

	if(check && $(window).scrollTop() + $(window).height() == $(document).height() ) {
	   secondary.css('min-height', 0);
	   check = false;
       secondary.stop().slideDown();
    }
	if(!check && $(window).scrollTop() + $(window).height() < $(document).height()) {
	    check = true;
	    secondary.slideUp();
	}

});
 if ($(document).height() <= $(window).height() ) {
 	console.log(secondary)
 	secondary.show();
 }
/*==end:For all pages==*/


/*===== globalHeader Background Style / Do not remove ====*/
$("#globalHeader").addClass("globalHeaderBkg");
$("#globalNav ul li ul").addClass("globalHeaderSub1Bkg");
$("#globalNav ul li ul li ul").addClass("globalHeaderSub2Bkg");
$("#globalNav ul li ul li ul li ul").addClass("globalHeaderSub3Bkg");

/*===== Find Jobs Hover =====*/
	$(".findHolder").hover(
    function() { $(this).stop().animate({top:-2},200); },
    function() {
        if ($(this).hasClass("isDown") == false) {
            $(this).stop().animate({top:-5},220);
			}
		}
	);

/*===== Fixed footer Hover =====*/
	$(".footerTop").hover(
		function() { $(".footerTop").stop().animate({height:62},200); },
		function() { $(".footerTop").stop().animate({height:59},220); }
	);

	$('.findHolder').live('Button1ChangedState', function(event) {
		if ($('.boxTop a').hasClass('isDown')) {
				$(".footerTop").hover(
					function() { $(".footerTop").stop().animate({height:357},200); },
					function() { $(".footerTop").stop().animate({height:355},220); }
			);
			}else{
				$(".footerTop").hover(
					function() { $(".footerTop").stop().animate({height:62},200); },
					function() { $(".footerTop").stop().animate({height:59},220); }
				);
			}
		}
	);

	$('.boxTop a').live('Button2ChangedState', function(event) {
		if ($('.boxTop a').hasClass('isUp')) {
				$(".footerTop").hover(
					function() { $(".footerTop").stop().animate({height:355},300); },
					function() { $(".footerTop").stop().animate({height:352},300); }
			);
			}else{
				$(".footerTop").hover(
					function() { $(".footerTop").stop().animate({height:62},200); },
					function() { $(".footerTop").stop().animate({height:59},220); }
				);
			}
		}
	);

/*===== Fin Jobs onClick functionality =====*/
	$(".findHolder").click( function() {

	    if ($(".findHolder").hasClass("isDown") == false) {
	    	$("#findInnerJobsHolder").show();
	        $("#findInnerJobsHolder").stop().animate({top:0},375);

			$(".footerTop").stop().animate({height:56},230, function(){$(".innerBoxes").hide();});
	        $(".innerBoxes").slideUp("fast");
	        $(".boxTop a").removeClass("isUp");
			$(".findHolder a").css({'background-color' : '#32363D',
								    'letter-spacing' : '1px',

									'background-position' : '26px 24px',
									'padding' : '23px 0px 0px 45px',
									'min-width' : '77px'});
			setTimeout(function(){
				$("#globalHeader").removeClass("globalHeaderBkg");
				$("#globalNav ul li ul").removeClass("globalHeaderSub1Bkg");
				$("#globalNav ul li ul li ul").removeClass("globalHeaderSub2Bkg");
				$("#globalNav ul li ul li ul li ul").removeClass("globalHeaderSub3Bkg");

				$("#globalHeader").addClass("globalHeaderBkgOff");
				$("#globalNav ul li ul").addClass("globalHeaderSub1BkgOff");
				$("#globalNav ul li ul li ul").addClass("globalHeaderSub2BkgOff");
				$("#globalNav ul li ul li ul li ul").addClass("globalHeaderSub3BkgOff");
    		},280);

			$('.findHolder a:contains("Find Jobs")').text("Close");
			$('.carouselTitle').stop().animate({opacity: 0});
	    } else {
	        $("#findInnerJobsHolder").stop().animate({top:-720},220, function () {
	        	$(this).hide();
	        });
			$(".findHolder a").css({'background-color' : '#00AEEF',
								    'letter-spacing' : '0px',
									'background-position' : '16px -111px',
									'padding' : '23px 3px 0px 34px',
									'min-width' : '85px'});
			$('.findHolder a:contains("Close")').text("Find Jobs");
			$('.carouselTitle').stop().animate({opacity: 1});
			setTimeout(function(){
				$("#globalHeader").addClass("globalHeaderBkg");
				$("#globalNav ul li ul").addClass("globalHeaderSub1Bkg");
				$("#globalNav ul li ul li ul").addClass("globalHeaderSub2Bkg");
				$("#globalNav ul li ul li ul li ul").addClass("globalHeaderSub3Bkg");

				$("#globalHeader").removeClass("globalHeaderBkgOff");
				$("#globalNav ul li ul").removeClass("globalHeaderSub1BkgOff");
				$("#globalNav ul li ul li ul").removeClass("globalHeaderSub2BkgOff");
				$("#globalNav ul li ul li ul li ul").removeClass("globalHeaderSub3BkgOff");
    		},120);
	    }

	    $(".findHolder").toggleClass("isDown").trigger('Button1ChangedState');
	});

/*===== Fixed Footer onClick functionality =====*/
	$(".boxTop a").click( function(event) {
		event.preventDefault();
    if ($(this).hasClass("isUp") == false) {
		$(".footerTop").stop().animate({height:355},230);

        $(".innerBoxes").slideDown("fast");
		$('.carouselTitle').stop().animate({opacity: .55});

        $("#findInnerJobsHolder").stop().animate({top:-720},220, function () {
	         $(this).hide();
	    });
        $(".findHolder").stop().animate({top:-5},220).removeClass("isDown");
		$(".findHolder a").css({'background-color' : '#00AEEF',
								    'letter-spacing' : '0px',
									'background-position' : '16px -111px',
									'padding' : '23px 3px 0px 34px',
									'min-width' : '85px'});
		$('.findHolder a:contains("Close")').text("Find Jobs");
		$(".infoBlock").show();
		setTimeout(function(){
				$("#globalHeader").addClass("globalHeaderBkg");
				$("#globalNav ul li ul").addClass("globalHeaderSub1Bkg");
				$("#globalNav ul li ul li ul").addClass("globalHeaderSub2Bkg");
				$("#globalNav ul li ul li ul li ul").addClass("globalHeaderSub3Bkg");

				$("#globalHeader").removeClass("globalHeaderBkgOff");
				$("#globalNav ul li ul").removeClass("globalHeaderSub1BkgOff");
				$("#globalNav ul li ul li ul").removeClass("globalHeaderSub2BkgOff");
				$("#globalNav ul li ul li ul li ul").removeClass("globalHeaderSub3BkgOff");
    		},120);
    } else {
		$(".footerTop").stop().animate({height:56},230, function(){$(".innerBoxes").hide();});
        $(".innerBoxes").slideDown("slow");
		$('.carouselTitle').stop().animate({opacity: 1});

    }

    $(".boxTop a").toggleClass("isUp").trigger('Button2ChangedState');
	});

/*==Jobs Dropdown Navigation==*/

	$('.closeFind').live('click', function(){
		$(".findHolder").click();
	});

	$('.jobsDropNav li').first().addClass('aHover');
	$('.jobsDropNav li').first().next().addClass('next');
	$('.jobsDropNav li').last().addClass('last');

	$('.jobsDropNav a').live('click', function(event){
		event.preventDefault();
		$('.jobsDropNav li').removeClass('aHover');
		$('.jobsDropNav li').removeClass('next');
		$('.jobsDropNav li').removeClass('prev');
		$('.jobTab').hide();
		$(this).parents('li').addClass('aHover');
		$(this).parents('li').prev().addClass('prev');
		$(this).parents('li').next().addClass('next');
		$('#'+$(this).attr('href')).show();
		if($('#'+$(this).attr('href')).hasClass('scroll-pane')){
			$('.scroll-pane').jScrollPane();
		}
	});


$('#slider-with-blocks-1').royalSlider({
    transitionType:'slide',
	transitionSpeed:920,
	easeInOut:'easeInOutSine',
    slidesSpacing: 2, 
    sliderDrag:true,
    sliderTouch:true,
   });

 $('.findHolder').hover(
    function() {if($(this).hasClass('isDown')){return false}
        $(".findHolder a ").stop().animate({'background-position-y': '-109px'}); //mouseover
		
    }, 
    function() {if($(this).hasClass('isDown')){return false}
        $(".findHolder a ").stop().animate({'background-position-y': '-111px'}); // mouseout
    }
);
 
  $('.gridBox').hover(
    function() {
        $(this).stop().animate({'background-position-x': '250px'}); //mouseover
    }, 
    function() {
        $(this).stop().animate({'background-position-x': '0px'}); // mouseout
    }
);

});
//end document ready





/*==Global navigation penetration ==*/
$.fn.globalNavigation  = function(){
	var navHolder = $(this);
		navHolder.find("li:has(ul)").hover(function () {
			$(this).toggleClass("showArrow");
			$(this).children("ul:first").toggleClass("showUl");
			var visibleUl =  navHolder.find("ul > li ul:visible").size() * 60 + 50;
			navHolder.css("height", visibleUl);
			var linePosition = visibleUl - 10;
			$(".purpleLine").css("top", linePosition);

	});
};
/*==end:Global navigation penetration==*/

$(function() {
    if (window.PIE) {
        $('.purpleBtn a').each(function() {
            PIE.attach(this);
        });
    }
});


/*==Global navigation penetration ==*/
$.fn.globalNavigation  = function(){
	var navHolder = $(this);
		var i = 1;
		var height = 56;
		var elem;
		var interval;
		var cloneline = $('.customLine').clone().hide();

		$('#globalNav li').hover(function (e) {
			$(this).toggleClass("showArrow");
			$(this).parent("ul").addClass("customHover");
			if(typeof $(this).children('ul') != 'undefined'){
				$('#globalHeader > .customLine').hide();
				cloneline.show().appendTo($(this).children('ul'));
				cloneline.width($(".headWrap").offset().left + 150);
			}

		},function(){
			$(this).parent("ul").removeClass("customHover");
			$(this).toggleClass("showArrow");
			cloneline.show().appendTo($(this).parent());
		});
};
/*==end:Global navigation penetration==*/

