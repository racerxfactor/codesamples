$(document).ready(function(){

    var pathToLocations;
    var searchBox = $('#filtersSearch');
    var locations;

    $.ajax({
        type: "GET",
        url: "js/locations.json",
        dataType: "json",
        contentType: "application/json",
        success: function(data) {
            if(data) {
                locations = data.countries;
                $('#countryList').remove();
                $('<ul id="countryList" class="searchList"></ul>').appendTo(searchBox);
                var html = '<li><a href="#" rel="All">All</a></li>';
                for(var elem in locations){
                    html += '<li>';
                    html += '<a href="'+elem+'">'+locations[elem].name+'</a>';
                    html += '</li>';
                }//for
                $('#countryList').html(html);
            }//if
        },
        error: function(xhr, status, error) {
            alert(xhr.status);
        }
    });

    $('#countryList li a').live('click', function(event){
        event.preventDefault();
        var id = $(this).attr('href');
        $('#countryList li').removeClass('cur');
        $(this).parent().addClass('cur');
        $('#textBox').text($(this).text());
        $('#countryList').hide();
        if ($(this).attr('rel') == 'All') {
            $('.filters .filter').find('a[rel=All]').click();
            $('#cities').hide();
            return false;
        }//if
        cities(id);
    });

    $('.filterButton').live('click', function(){
        $('.searchList').hide();
        $(this).parent().find('.searchList').toggle();
    });

    $('#citiesList li a').live('click', function(event){
        event.preventDefault();
        $('#citiesList li').removeClass('cur');
        $(this).parent().addClass('cur');
        $('#cityTextBox').text($(this).text());
        $('#citiesList').hide();
        $('#newFilterElem').remove();
        $(this).clone().hide().attr('id', 'newFilterElem').appendTo('.filters .filter');
        initFilters();
        $('#newFilterElem').click();
        hideFlip();
    });

    function cities(id){
        $('#citiesList').remove();
        //$('#cities .textBlobk').text(locations[id].cities[0]);
        var html = '<ul id="citiesList" class="searchList">';
        for (var i=0; i<locations[id].cities.length; i++){
            var cl = locations[id].cities[i].toLowerCase();
            cl = cl.replace(' ', '-'); 
            html += '<li>';
            html += '<a href="#" rel="'+cl+'" title="">'+locations[id].cities[i]+'</a>';
            html += '</li>';
        }   
        html += '</ul>';
        $(html).appendTo($('#cities'));
        $('#cities').show();
        if(locations[id].cities.length <= 1){
            $('#cities .textBlobk').text(locations[id].cities[0]);
            $('#cities .filterButton').hide();
            $('#newFilterElem').remove();
            $('#citiesList a:first').clone().hide().attr('id', 'newFilterElem').appendTo('.filters .filter');
            initFilters();
            $('#newFilterElem').click();
            hideFlip();
        }else{
            $('#cities .textBlobk').text('Choose city');
            $('#cities .filterButton').show();
        }
    }//func

    $('.filter a').click(function(){
        $('#cities').hide();
        $('#textBox').text('Country');
        $('.searchList .cur').removeClass( 'cur' );
        hideFlip();
    });

    /*$('.filters .container ul li').live('click', function(event){
        event.preventDefault();
        $('.containerInfo').hide();
        $('.showInfo').removeClass('showInfo');
        var box = $(this).find('.containerInfo');
        var left = (box.innerWidth() - $(this).width()) / 2;
        var top = (box.innerHeight() - $(this).height()) / 2;
        $(this).addClass('showInfo');
        box.css({'top': -top, 'left': -left}).show();
    });*/

    // If an event gets to the body
    $("body").click(function(){
      //$('.containerInfo').hide();
      $('.searchList').hide();
      //$('.showInfo').removeClass('showInfo');
    });

    // Prevent events from getting pass
    /*$(".containerInfo, .showInfo").click(function(e){
      e.stopPropagation();
    });*/

    $(".filters .container li .containerInfo").click(function(event){
        var $this = $(this);   
        if(!$this.hasClass('openFlip') && typeof $this.parent().find(".infoBox")[0] != 'undefined'){
            hideFlip();
            //event.preventDefault();
            $this.parent().css('z-index', '30');
            $this.flippy({
                color_target:"#400095",
                content:$this.parent().find(".infoBox"),
                direction:"LEFT",
                duration:"800",
                onStart : function(){
                    $this.children().clone().addClass('oldInfo').hide().appendTo($this.parent());
                },
                onFinish: function(){
                    $this.addClass('openFlip');
                    var infoboxWidth = 280;
                    var box = $this.find('.infowrap');
                    var infoboxHeight = box.innerHeight();
                    var left = (infoboxWidth - $this.width()) / 2;
                    var top = (infoboxHeight - $this.height()) / 2;
                    $this.stop().animate({'top': -top, 'left': -left, 'width': infoboxWidth, 'min-height': infoboxHeight}, 300);
                    $this.addClass('info');
                }
            });
            return false;
        }//if
    });

    $(".filters .container li .containerInfo a").live('click', function(e){
        e.stopPropagation();
    });

    $('.openFlip').live('click', function(e){
        $this = $(this);
        $this.parent().css('z-index', '20');
        $this.flippy({
            color_target:"#ffffff",
            content:$this.parent().find(".oldInfo"),
            direction:"RIGHT",
            duration:"800",
            onMidway  : function(){
            },
            onFinish: function(){
                $this.removeClass('info');
                $this.removeClass('openFlip');
                var infoboxWidth = $this.parent().width();
                var infoboxHeight = $this.parent().height();
                var left = (infoboxWidth - $this.width()) / 2;
                var top = (infoboxHeight - $this.height()) / 2;
                $this.stop().animate({'top': 0, 'left': 0, 'width': infoboxWidth, 'min-height': infoboxHeight}, 300);
                $this.parent().find(".oldInfo").appendTo($this).fadeIn();
                $this.css('position', 'absolute');
                $this.parent().css('z-index', '1');
            }
        });
        return false;

    });

    

});

function hideFlip(){
    $('.openFlip').each(function(){
        $this = $(this);
        var infoboxWidth = $this.parent().width();
        var infoboxHeight = $this.parent().height();
        $this.stop().animate({'top': 0, 'left': 0, 'width': infoboxWidth, 'min-height': infoboxHeight}, 300);
        $this.children().fadeOut( 300, function(){
            $this.children().remove();
            $this.parent().find(".oldInfo").appendTo($this).fadeIn(300);
            $this.removeClass('openFlip');
            $this.removeClass('info');
            $this.css({'position': 'absolute','background': '#fff'});
            $this.parent().css('z-index', '1');
        });
    });
    
}

function initFilters(){
    $('.filters.teams').filters({
        css3: {
            init: false
        },
        // use this piece of code to get a fake flip animation, this doesn't have the fade option though, maybe you see something i don't
        //css3: {
            //transform: {
                //scale: '0',
                //rotate: '-90deg',
                //skew: '45deg'
            //}
        //},            
        move: {
            init: true,
            easing: 'easeInQuad',
            duration: 400
        },
        fade: {
            duration: [400, 400],
            opacity: [.1, 1]
        }
    });
}//func

$(function(){
	

	
});

window.onload = function(){
	$('.filters .container li img').vAlign();
    initFilters();
}

$.fn.vAlign = function() {
	return this.each(function(i){
	var ah = $(this).height();
	var ph = $(this).parent().height();
	var mh = (ph - ah) / 2;
	$(this).css('margin-top', mh);
	});
};