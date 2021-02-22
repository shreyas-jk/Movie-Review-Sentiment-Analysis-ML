"use strict";
$(document).ready(function() {
    togglemenu();
    menuhrres();
    var vw = $(window)[0].innerWidth;
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();
    $(".mobile-menu").on('click', function() {
        var $this = $(this);
        $this.toggleClass('on');
    });
    $("#mobile-collapse").on('click', function() {
        $(".pcoded-navbar").toggleClass("navbar-collapsed");
    });

    $(".search-btn").on('click', function() {
        var $this = $(this);
        $(".main-search").addClass('open');
        $(".main-search .form-control").css({
            'width': '90px'
        });
    });
    $(".search-close").on('click', function() {
        var $this = $(this);
        $(".main-search").removeClass('open');
        $(".main-search .form-control").css({
            'width': '0'
        });
    });
    // Menu scroll
    if (!$('.pcoded-navbar').hasClass('theme-horizontal')) {
        var vw = $(window)[0].innerWidth;
        if (vw < 992 || $('.pcoded-navbar').hasClass('menupos-static')) {
            var px = new PerfectScrollbar('.navbar-content', {
                wheelSpeed: .5,
                swipeEasing: 0,
                suppressScrollX: !0,
                wheelPropagation: 1,
                minScrollbarLength: 40,
            });
        }else{
            var px = new PerfectScrollbar('.navbar-content', {
                wheelSpeed: .5,
                swipeEasing: 0,
                suppressScrollX: !0,
                wheelPropagation: 1,
                minScrollbarLength: 40,
            });
        }
    }

    // close card
    $(".card-option .close-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass('anim-close-card');
        $this.parents('.card').animate({
            'margin-bottom': '0',
        });
        setTimeout(function() {
            $this.parents('.card').children('.card-block').slideToggle();
            $this.parents('.card').children('.card-body').slideToggle();
            $this.parents('.card').children('.card-header').slideToggle();
            $this.parents('.card').children('.card-footer').slideToggle();
        }, 600);
        setTimeout(function() {
            $this.parents('.card').remove();
        }, 1500);
    });
    // reload card
    $(".card-option .reload-card").on('click', function() {
        var $this = $(this);
        $this.parents('.card').addClass("card-load");
        $this.parents('.card').append('<div class="card-loader"><i class="pct-loader1 anim-rotate"></div>');
        setTimeout(function() {
            $this.parents('.card').children(".card-loader").remove();
            $this.parents('.card').removeClass("card-load");
        }, 3000);
    });
    // collpased and expaded card
    $(".card-option .minimize-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        var card = $(port).children('.card-block').slideToggle();
        var card = $(port).children('.card-body').slideToggle();
        if (!port.hasClass('full-card')) {
            $(port).css("height", "auto");
        }
        $(this).children('a').children('span').toggle();
    });
    // full card
    $(".card-option .full-card").on('click', function() {
        var $this = $(this);
        var port = $($this.parents('.card'));
        port.toggleClass("full-card");
        $(this).children('a').children('span').toggle();
        if (port.hasClass('full-card')) {
            $('body').css('overflow', 'hidden');
            $('html,body').animate({
                scrollTop: 0
            }, 1000);
            var elm = $(port, this);
            var off = elm.offset();
            var l = off.left;
            var t = off.top;
            var docH = $(window).height();
            var docW = $(window).width();
            port.animate({
                'marginLeft': l - (l * 2),
                'marginTop': t - (t * 2),
                'width': docW,
                'height': docH,
            });
        } else {
            $('body').css('overflow', '');
            port.removeAttr('style');
            setTimeout(function() {
                $('html,body').animate({
                    scrollTop: $(port).offset().top
                }, 500);
            }, 400);
        }
    });
    // apply matchHeight to each item container's items

    // remove pre-loader start
    setTimeout(function() {
        $('.loader-bg').fadeOut('slow', function() {
            $(this).remove();
        });
    }, 400);
    // remove pre-loader end

});

// ===============
$(window).resize(function() {
    togglemenu();
    menuhrres();
});
// menu [ horizontal configure ]
function menuhrres() {

}

// menu [ compact ]
function togglemenu() {
    var vw = $(window)[0].innerWidth;
    if ($(".pcoded-navbar").hasClass('theme-horizontal') == false) {
        if (vw <= 1200 && vw >= 992) {
            $(".pcoded-navbar").addClass("navbar-collapsed");
        }
        if (vw < 992) {
            $(".pcoded-navbar").removeClass("navbar-collapsed");
        }
    }
}
// ===============

// toggle full screen
function toggleFullScreen() {
    var a = $(window).height() - 10;

    if (!document.fullscreenElement && // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement) { // current working methods
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
        }
    } else {
        if (document.cancelFullScreen) {
            document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    }
    $('.full-screen > i').toggleClass('icon-maximize');
    $('.full-screen > i').toggleClass('icon-minimize');
}
// =============   layout builder   =============
$.fn.pcodedmenu = function(settings) {
    var oid = this.attr("id");
    var defaults = {
        themelayout: 'vertical',
        MenuTrigger: 'click',
        SubMenuTrigger: 'click',
    };
    var settings = $.extend({}, defaults, settings);
    var PcodedMenu = {
        PcodedMenuInit: function() {
            PcodedMenu.HandleMenuTrigger();
            PcodedMenu.HandleSubMenuTrigger();
            PcodedMenu.HandleOffset();
        },
        HandleSubMenuTrigger: function() {
            var $window = $(window);
            var newSize = $window.width();
            if ($('.pcoded-navbar').hasClass('theme-horizontal') == true) {
                if (newSize >= 768) {
                    var $dropdown = $(".pcoded-inner-navbar .pcoded-submenu > li.pcoded-hasmenu");
                    $dropdown.off('click').off('mouseenter mouseleave').hover(
                        function() {
                            $(this).addClass('pcoded-trigger');
                        },
                        function() {
                            $(this).removeClass('pcoded-trigger');
                        }
                    );
                } else {
                    var $dropdown = $(".pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li");
                    $dropdown.off('mouseenter mouseleave').off('click').on('click',
                        function() {
                            var str = $(this).closest('.pcoded-submenu').length;
                            if (str === 0) {
                                if ($(this).hasClass('pcoded-trigger')) {
                                    $(this).removeClass('pcoded-trigger');
                                    $(this).children('.pcoded-submenu').slideUp();
                                } else {
                                    $('.pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                    $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                    $(this).addClass('pcoded-trigger');
                                    $(this).children('.pcoded-submenu').slideDown();
                                }
                            } else {
                                if ($(this).hasClass('pcoded-trigger')) {
                                    $(this).removeClass('pcoded-trigger');
                                    $(this).children('.pcoded-submenu').slideUp();
                                } else {
                                    $('.pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                    $(this).closest('.pcoded-submenu').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                    $(this).addClass('pcoded-trigger');
                                    $(this).children('.pcoded-submenu').slideDown();
                                }
                            }
                        });
                    $(".pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li").on('click', function(e) {
                        e.stopPropagation();
                        alert( "click call" );
                        var str = $(this).closest('.pcoded-submenu').length;
                        if (str === 0) {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-hasmenu li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        } else {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-hasmenu li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-submenu').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        }
                    });
                }
            }
            switch (settings.SubMenuTrigger) {
                case 'click':
                    $('.pcoded-navbar .pcoded-hasmenu').removeClass('is-hover');
                    $(".pcoded-inner-navbar .pcoded-submenu > li > .pcoded-submenu > li").on('click', function(e) {
                        e.stopPropagation();
                        var str = $(this).closest('.pcoded-submenu').length;
                        if (str === 0) {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        } else {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-submenu > li > .pcoded-submenu > li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-submenu').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        }
                    });
                    $(".pcoded-submenu > li").on('click', function(e) {
                        e.stopPropagation();
                        var str = $(this).closest('.pcoded-submenu').length;
                        if (str === 0) {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-hasmenu li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        } else {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('.pcoded-hasmenu li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-submenu').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        }
                    });
                    break;
            }
        },
        HandleMenuTrigger: function() {
            var $window = $(window);
            var newSize = $window.width();
            if ($('.pcoded-navbar').hasClass('theme-horizontal') == true) {
                var $dropdown = $(".pcoded-inner-navbar > li");
                if (newSize >= 768) {
                    $dropdown.off('click').off('mouseenter mouseleave').hover(
                        function() {
                            $(this).addClass('pcoded-trigger');
                            if ($('.pcoded-submenu', this).length) {
                                var elm = $('.pcoded-submenu:first', this);
                                var off = elm.offset();
                                var l = off.left;
                                var w = elm.width();
                                var docH = $(window).height();
                                var docW = $(window).width();

                                var isEntirelyVisible = (l + w <= docW);
                                if (!isEntirelyVisible) {
                                    var temp = $('.sidenav-inner').attr('style');
                                    $('.sidenav-inner').css({'margin-left': (parseInt(temp.slice(12, temp.length - 3)) - 80)});
                                    $('.sidenav-horizontal-prev').removeClass('disabled');
                                } else {
                                    $(this).removeClass('edge');
                                }
                            }
                        },
                        function() {
                            $(this).removeClass('pcoded-trigger');
                        }
                    );
                } else {
                    $dropdown.off('mouseenter mouseleave').off('click').on('click',
                        function() {
                            if ($(this).hasClass('pcoded-trigger')) {
                                $(this).removeClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideUp();
                            } else {
                                $('li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                                $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                                $(this).addClass('pcoded-trigger');
                                $(this).children('.pcoded-submenu').slideDown();
                            }
                        }
                    );
                }
            }
            switch (settings.MenuTrigger) {
                case 'click':
                    $('.pcoded-navbar').removeClass('is-hover');
                    $(".pcoded-inner-navbar > li:not(.pcoded-menu-caption) ").on('click', function() {
                        if ($(this).hasClass('pcoded-trigger')) {
                            $(this).removeClass('pcoded-trigger');
                            $(this).children('.pcoded-submenu').slideUp();
                        } else {
                            $('li.pcoded-trigger').children('.pcoded-submenu').slideUp();
                            $(this).closest('.pcoded-inner-navbar').find('li.pcoded-trigger').removeClass('pcoded-trigger');
                            $(this).addClass('pcoded-trigger');
                            $(this).children('.pcoded-submenu').slideDown();
                        }
                    });
                    break;
            }
        },
        HandleOffset: function() {
            switch (settings.themelayout) {
                case 'horizontal':
                    var trigger = settings.SubMenuTrigger;
                    if (trigger === "hover") {
                        $("li.pcoded-hasmenu").on('mouseenter mouseleave', function(e) {
                            if ($('.pcoded-submenu', this).length) {
                                var elm = $('.pcoded-submenu:first', this);
                                var off = elm.offset();
                                var l = off.left;
                                var w = elm.width();
                                var docH = $(window).height();
                                var docW = $(window).width();

                                var isEntirelyVisible = (l + w <= docW);
                                if (!isEntirelyVisible) {
                                    $(this).addClass('edge');
                                } else {
                                    $(this).removeClass('edge');
                                }
                            }
                        });
                    } else {
                        $("li.pcoded-hasmenu").on('click', function(e) {
                            e.preventDefault();
                            if ($('.pcoded-submenu', this).length) {
                                var elm = $('.pcoded-submenu:first', this);
                                var off = elm.offset();
                                var l = off.left;
                                var w = elm.width();
                                var docH = $(window).height();
                                var docW = $(window).width();

                                var isEntirelyVisible = (l + w <= docW);
                                if (!isEntirelyVisible) {
                                    $(this).toggleClass('edge');
                                }
                            }
                        });
                    }
                    break;
                default:
            }
        },
    };
    PcodedMenu.PcodedMenuInit();
};
$("#pcoded").pcodedmenu({
    MenuTrigger: 'click',
    SubMenuTrigger: 'click',
});
// menu [ Mobile ]
$("#mobile-collapse,#mobile-collapse1").click(function(e) {
    var vw = $(window)[0].innerWidth;
    if (vw < 992) {
        $(".pcoded-navbar").toggleClass('mob-open');
        e.stopPropagation();
    }
});
$(window).ready(function() {
    var vw = $(window)[0].innerWidth;
    $(".pcoded-navbar").on('click tap', function(e) {
        e.stopPropagation();
    });
    $('.pcoded-main-container,.pcoded-header').on("click", function() {
        if (vw < 992) {
            if ($(".pcoded-navbar").hasClass("mob-open") == true) {
                $(".pcoded-navbar").removeClass('mob-open');
                $("#mobile-collapse,#mobile-collapse1").removeClass('on');
            }
        }
    });
    // mobile header
    $("#mobile-header").on('click', function() {
        $(".navbar-collapse,.m-header").slideToggle();
    });
});
