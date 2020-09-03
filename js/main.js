(function () {

    "use strict";

    var body = document.querySelector('body'),
        isMobile = false,
        scrollTopPosition,
        browserYou,
        _winWidth = $(window).outerWidth();

    var genFunc = {

        initialized: false,
        initialize: function () {

            if (this.initialized) return;

            this.initialized = true;

            this.build();
        },

        build: function () {
            // browser
            browserYou = this.getBrowser();
            if (browserYou.platform == 'mobile') {
                isMobile = true;
                document.documentElement.classList.add('mobile');
            } else {
                document.documentElement.classList.add('desktop');
            }
            if ((browserYou.browser == 'ie')) {
                document.documentElement.classList.add('ie');
            }
            if (navigator.userAgent.indexOf("Edge") > -1) {
                document.documentElement.classList.add('edge');
            }
            if (navigator.userAgent.search(/Macintosh/) > -1) {
                document.documentElement.classList.add('macintosh');
            }
            if ((browserYou.browser == 'ie' && browserYou.versionShort < 9) || ((browserYou.browser == 'opera' || browserYou.browser == 'operaWebkit') && browserYou.versionShort < 18) || (browserYou.browser == 'firefox' && browserYou.versionShort < 30)) {
                alert('Обновите браузер');
            }
            if (document.querySelector('.yearN') !== null) {
                this.copyright();
            }
        },
        copyright: function () {
            var yearBlock = document.querySelector('.yearN'),
                yearNow = new Date().getFullYear().toString();
            if (yearNow.length) {
                yearBlock.innerText = yearNow;
            }
        },
        getBrowser: function () {
            var ua = navigator.userAgent;
            var bName = function () {
                if (ua.search(/Edge/) > -1) return "edge";
                if (ua.search(/MSIE/) > -1) return "ie";
                if (ua.search(/Trident/) > -1) return "ie11";
                if (ua.search(/Firefox/) > -1) return "firefox";
                if (ua.search(/Opera/) > -1) return "opera";
                if (ua.search(/OPR/) > -1) return "operaWebkit";
                if (ua.search(/YaBrowser/) > -1) return "yabrowser";
                if (ua.search(/Chrome/) > -1) return "chrome";
                if (ua.search(/Safari/) > -1) return "safari";
                if (ua.search(/maxHhon/) > -1) return "maxHhon";
            }();

            var version;
            switch (bName) {
                case "edge":
                    version = (ua.split("Edge")[1]).split("/")[1];
                    break;
                case "ie":
                    version = (ua.split("MSIE ")[1]).split(";")[0];
                    break;
                case "ie11":
                    bName = "ie";
                    version = (ua.split("; rv:")[1]).split(")")[0];
                    break;
                case "firefox":
                    version = ua.split("Firefox/")[1];
                    break;
                case "opera":
                    version = ua.split("Version/")[1];
                    break;
                case "operaWebkit":
                    bName = "opera";
                    version = ua.split("OPR/")[1];
                    break;
                case "yabrowser":
                    version = (ua.split("YaBrowser/")[1]).split(" ")[0];
                    break;
                case "chrome":
                    version = (ua.split("Chrome/")[1]).split(" ")[0];
                    break;
                case "safari":
                    version = ua.split("Safari/")[1].split("")[0];
                    break;
                case "maxHhon":
                    version = ua.split("maxHhon/")[1];
                    break;
            }
            var platform = 'desktop';
            if (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase())) platform = 'mobile';
            var browsrObj;
            try {
                browsrObj = {
                    platform: platform,
                    browser: bName,
                    versionFull: version,
                    versionShort: version.split(".")[0]
                };
            } catch (err) {
                browsrObj = {
                    platform: platform,
                    browser: 'unknown',
                    versionFull: 'unknown',
                    versionShort: 'unknown'
                };
            }
            return browsrObj;
        },
    };
    genFunc.initialize();

    window.addEventListener('load', function () {

    });

    $(window).on('resize', function () {

    });
    $(window).scroll(function () {
        var top = $(document).scrollTop();
        if (top > 100) {
            $(".go-to-top").fadeIn();
        } else {
            $(".go-to-top").fadeOut();
        }
    });
    /*Function for go to top*/
    $('.go-to-top').click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });
    /*Function for go to top end*/

    /*Function for link scroll*/
    $(document).ready(function() {
        $("a.scrollto").click(function() {
            var elementClick = $(this).attr("href");
            //var destination = $(elementClick).offset().top - ($(window).outerHeight()/2);
            var destination = $(elementClick).offset().top - $(".header").height() - 45;
            jQuery("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            }, 800);
            return false;
        });
    });
    /*Function for link scroll*/

    $(document).ready(function() {
        var className = $('body').attr('class');
        $('html').addClass(className);
    });

    /*Function for same height*/
    function heightBlock() {
        $('.js_height-block').each(function (i, e) {
                var elH = e.getElementsByClassName("height");
                var maxHeight = 0;
                for (var i = 0; i < elH.length; ++i) {
                    elH[i].style.height = "";
                    if (maxHeight < elH[i].clientHeight) {
                        maxHeight = elH[i].clientHeight;
                    }
                }
                for (var i = 0; i < elH.length; ++i) {
                    elH[i].style.height = maxHeight + "px";
                }
            }
        )};

    /*CustomInputNumber start*/
    if(jQuery('.input-number').length) {
        jQuery('.input-number').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.input-number_arrow.next'),
                btnDown = spinner.find('.input-number_arrow.prev'),
                min = input.attr('min'),
                max = input.attr('max');
            btnUp.click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                if(spinner.hasClass("disabled")) {
                } else {
                    var oldValue = parseFloat(input.val());
                    if (oldValue >= max) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue + 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                }
            });
            btnDown.click(function(e) {
                e.stopPropagation();
                e.preventDefault();
                var oldValue = parseFloat(input.val());
                if (oldValue <= min) {
                    var newVal = oldValue;
                } else {
                    var newVal = oldValue - 1;
                }
                spinner.find("input").val(newVal);
                spinner.find("input").trigger("change");
            });
        });
    }
    /*CustomInputNumber end*/

    /* -------------------------------------------------------------------------
    begin Validation
    * ------------------------------------------------------------------------- */

    function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item = form.find("[required]");
        var e = 0;
        var reg = undefined;
        var pass = form.find('.password').val();
        var pass_1 = form.find('.password_1').val();
        var email = false;
        var password = false;
        var password_1 = false;
        var pasword_new = false;
        var phone = false;
        var undef = false;
        var date = false;
        var arr = [];

        console.log("startValidate");


        function mark(object, expression, minSign, maxSign) {
            console.log(object, object.closest('.input-container'));
            if (expression) {
                object.closest('.input-container').addClass(error_class).removeClass(norma_class);
                if (email) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 31) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        } else {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не менее 6 символов');
                        }
                        else if  (object.val().length > 20) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не более 20 символов');
                        }
                        else {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_1) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не менее 6 символов');
                        }
                        else if  (object.val().length > 20) {
                            object.closest('.input-container').find('.text-error').text('Пароль: не более 20 символов');
                        }
                        else {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (pasword_new) {
                    var remPopup = object.closest('.input-container').closest(".popup__remind");
                    if (remPopup.length) {
                        if (remPopup.find(".pasword-old").val()==remPopup.find(".pasword_new").val()&&remPopup.find(".pasword_new").val()!="") {
                            remPopup.find(".pasword_new").closest(".input-container").addClass(error_class).removeClass(norma_class);
                            remPopup.find(".pasword_new").siblings('.text-error').text('Старый и новый пароль совападают. Придумайте новый пароль!');
                        }
                    }
                }
                if (phone) {
                    if (object.val().length != 17) {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (date) {
                    if (object.val().length != 4) {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (undef) {
                    if (object.val().length > 0) {
                        if (object.val().length > minSign && object.val().length < maxSign) {
                            object.closest('.input-container').find('.text-error').text(object.attr("data-error-wrong"));
                        } else {
                            object.closest('.input-container').find('.text-error').text('Введите колличество символов (2-100)');
                        }
                    } else {
                        object.closest('.input-container').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                e++;
            }
            else {
                object.closest('.input-container').addClass(norma_class).removeClass(error_class);
                e = 0;
            }
            arr.push(expression);
        }

        form.find("[required]").each(function () {
            var minSign = $(this).attr("data-minsign");
            var maxSign = $(this).attr("data-maxsign");
            switch ($(this).attr("data-validate")) {
                case "text":
                    reg = new RegExp('^[/-?!()",.а-яА-ЯёЁa-zA-Z_0-9 ]{'+minSign+','+maxSign+'}$');
                    undef = true;
                    mark($(this), !reg.test($.trim($(this).val())), minSign, maxSign);
                    undef = false;
                    //mark($(this), $.trim($(this).val()).length === 0);
                    break;
                case "date":
                    reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                    undef = true;
                    mark($(this), !reg.test($.trim($(this).val())));
                    undef = false;
                    break;
                case "email":
                    reg = /^([A-Za-z0-9_\-\.]{1,10})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                    email = true;
                    if($.trim($(this).val()).length>31) {
                        mark($(this), true);
                    } else {
                        mark($(this), !reg.test($.trim($(this).val())));
                    }
                    email = false;
                    break;
                case "phone":
                    phone = true;
                    reg = /[0-9-()+]{17}$/;
                    mark($(this), !reg.test($.trim($(this).val())));
                    phone = false;
                    break;
                case "pass":
                    password = true;
                    pasword_new = true;
                    reg = /^[a-zA-Z0-9_-]{6,20}$/;
                    mark($(this), !reg.test($.trim($(this).val())));
                    password = false;
                    break;
                case "select2":
                    if ($(this).val()!=null) {
                        mark($(this), false);
                        break;
                    } else {
                        mark($(this), true);
                        break;
                    };
                case "pass1":
                    password_1 = true;
                    reg = /^[a-zA-Z0-9_-]{6,20}$/;
                    mark($(this), (pass_1 !== pass||!reg.test($.trim($(this).val()))));
                    password_1 = false;
                    break;
                case "file":
                    if ($(this).closest(".row-file-input").hasClass("error")) {
                        break;
                    }
                default:
                    reg = new RegExp($(this).attr("data-validate"), "g");
                    mark($(this), !reg.test($.trim($(this).val())));
                    break;
            }
        });

        form.find('.js_valid_radio').each(function () {
            var inp = $(this).find('input.required');
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                $(this).addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                $(this).addClass(norma_class).removeClass(error_class);
            }
        });


        if ($.inArray(true, arr) == -1 && e == 0) {
            return true;
        } else {
            form.find("." + error_class + " input:first").focus();
            return false;
        }
    }

    function validateReset() {
        var form = $('.popup-overlay').find("form");
        var error_class = "error";
        var norma_class = "pass";
        form.find("[required]").each(function (indx, element) {
            $(element).val("");
            $(element).parent('.input-container').removeClass(error_class);
            $(element).parent('.input-container').removeClass(norma_class);
        });
    }

    $('.popup-overlay').click(function() {
        validateReset();
    });

    $('.popup .close-btn').click(function() {
        validateReset();
    });

    $(document).on("change", '.js_validate *[required]', function () {
        $(this).each(function () {
            var valid = validate($(document).find($(this).parents(".js_validate")));
            if (valid == false) {
                console.log("valid not passed");
                return false;
            } else {
                console.log("valid passed1");
                return true;
            }
        });

    });


    $(document).on("click", '.js_validate .btn[type="submit"], .js_click_form', function () {
        var valid = validate($(document).find($(this).parents(".js_validate")));
        if (valid == false) {
            console.log("valid not passed");
            return false;
        } else {
            console.log("valid passed");
            return true;
        }
    });

    /* -------------------------------------------------------------------------
     end Validation
     * ------------------------------------------------------------------------- */

    console.log("endValidate");

    //compare-category__reset
    if ($(".compare-category__table").length) {
        $(".compare-category__reset").on('click', function (e) {
            e.preventDefault();
            var table = $(this).closest(".compare-category__table");
            table.remove();
        });
    }
    //compare-category__reset



    //phone select start
    $('.js__phone-dropdown').on('click', function (e) {
        if($(window).width() <= 1030) {
            e.stopPropagation();
            e.preventDefault();
            $('.popup-overlay').fadeIn(300);
            $('.popup[data-target="popup-call-mobile"]').fadeIn(300);
            $('body').addClass("overflow");
        } else {
            $(this).toggleClass('active').find('.header__phone-dropdown').slideToggle();
            e.stopPropagation();
        }
    });
    $('.js__phone-dropdown a').on('click', function (e) {
        if($(window).width() <= 1030) {
            e.stopPropagation();
            e.preventDefault();
            $('.popup-overlay').fadeIn(300);
            $('.popup[data-target="popup-call-mobile"]').fadeIn(300);
            $('body').addClass("overflow");
        } else {
            $(this).toggleClass('active').find('.header__phone-dropdown').slideToggle();
            e.stopPropagation();
        }
    });
    //phone select end

    //search select start
    if($(window).width() <= 1030) {
        $('.header__search').css("display", "none");
    }

    $('.header__search-icon').on('click', function (e) {
        $(this).toggleClass('active');
        $('.header__search').slideToggle();
    });
    //search select end

    //dropdown select start
    $('.js__dropdown').on('click', function (e) {
        $(this).toggleClass('active').find('.dropdown__dropdown').slideToggle();
        e.stopPropagation();
    });

    $('.js__dropdown a').on('click', function (e) {
        e.preventDefault();
    });
    //dropdown select end

    /*burger start*/
    if($('.header .burger').length) {
        if($(window).width() <= 1030) {
            $('.header .burger').click(function () {
                $('.header .burger').toggleClass('clicked');
                $('.header').toggleClass('active');
                if ($('.header').hasClass("catalog")) {
                    $('.header').removeClass('catalog');
                    $('.header').removeClass('sub-catalog');
                    $('.header__menu-item-main').removeClass('active');
                }
            });
        }
    }
    /*burger end*/

    $('.header .header__catalog .btn').click(function () {
        if($(window).width() <= 1030) {
            $('.header .burger').addClass('clicked');
            $('.header').addClass('active');
            $('.header').addClass('catalog');
            $('.header').removeClass('sub-catalog');
            $('.header__menu-item-main').removeClass('active');
        }
    });
    /*burger end*/

    /*catalog start*/
    $('.header__menu-list-main-header').click(function () {
        if($(window).width() <= 1030) {
            $('.header').toggleClass('catalog');
            $('.header').removeClass('sub-catalog');
            $('.header__menu-item-main').removeClass('active');
        }
    });


    // $('.header__main-link').click(function () {
    //     if($(window).width() <= 1030) {
    //         window.open($(this).attr("href"),"_self");
    //     }
    // });
    //
    // $('.header__menu-item-sub-link, .header__menu-item-main_stock, .header__menu-item-main_new').click(function () {
    //     if($(window).width() <= 1030) {
    //         window.open($(this).attr("href"),"_self");
    //     }
    // });

    $('.header__menu-item-main>.header__main-link').click(function(e) {
        e.preventDefault();
        console.log($(this));
        if($(this).closest(".header__menu-item-main").hasClass("header__menu-item-main_new")||$(this).closest(".header__menu-item-main").hasClass("header__menu-item-main_stock")) {
            window.open($(this).attr("href"),"_self");
            console.log('nopreventDefault');
        } else {
            if($(window).width() <= 1030) {
                $('.header').toggleClass('sub-catalog');
                $(this).closest(".header__menu-item-main").toggleClass('active');
            }
        }
        // if($(window).width() <= 1030) {
        //     if($(this).hasClass("header__menu-item-main_new")||$(this).hasClass("header__menu-item-main_stock")) {
        //         window.open($(this).find(".header__menu-item-sub-link").attr("href"),"_self");
        //     } else {
        //         $('.header').toggleClass('sub-catalog');
        //         $(this).toggleClass('active');
        //     }
        // }
    });
    /*catalog end*/

    // footer item start
    if($(window).width() <= 1030) {
        if($(".footer__content-item").length % 2 == 0) {
            $(".footer__content-item:nth-last-child(1)").addClass("last");
            $(".footer__content-item:nth-last-child(2)").addClass("last");
        } else {
            $(".footer__content-item:nth-last-child(1)").addClass("last");
        }
    }
    // footer item end

    /*tabs start*/
    if ($(".js-tabs").length) {
        $(".js-tabs__button").on('click', function (e) {
            var tabs = $(this).closest(".js-tabs");
            e.preventDefault();
            e.stopPropagation();
            if($(this).hasClass("active")) {
                tabs.removeClass("active");
                $(this).removeClass("active").siblings().removeClass("active");
                tabs.find(".js-tabs__content-block").removeClass("active").eq($(this).index()).removeClass("active");
            }
            else {
                tabs.addClass("active");
                $(this).addClass("active").siblings().removeClass("active");
                tabs.find(".js-tabs__content-block").removeClass("active").eq($(this).index()).addClass("active");
            }
        });
    }
    /*tabs end*/

    /*product-item hover start*/
    if ($(".product-item").length && $(window).width() >= 1030) {
        $(".product-item").on('mouseenter', function (e) {
            // $(".product-item__additional").stop(true).slideUp(300);
            $(this).find(".product-item__additional").slideDown(300);
        });
        $(".product-item").on('mouseleave', function (e) {
            $(".product-item__additional").stop(true).slideUp(300);
            $(this).find(".product-item__additional").slideUp(300);
            //setTimeout(e, 0);
        });
    }
    /*product-item hover end*/

    /*slick start*/
    if ($(".js-main-banner-big").length) {
        $(".js-main-banner-big").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false,
            arrows: true,
            adaptiveHeight: true,
            autoplay: true,
            autoplaySpeed: 5000,
            infinite: true,
            asNavFor: '.js-main-banner-small',
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 690,
                    settings: {
                        arrows: false
                    }
                }
            ]
        });
        $('.js-main-banner-small').slick({
            asNavFor: '.js-main-banner-big',
            dots: false,
            swipe: true,
            centerMode: false,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            focusOnSelect: true,
            arrows: true,
            centerPadding: '0',
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        swipe: false,
                        infinite: true,
                        centerMode: false,
                        slidesToShow: 10,
                        autoSlidesToShow: true,
                        focusOnSelect: true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 690,
                    settings: {
                        slidesToShow: 3,
                        autoSlidesToShow: true,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if ($(".js-about-slider").length) {
        $(".js-about-slider").slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false,
            arrows: true,
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 690,
                    settings: {
                        arrows: true
                    }
                }
            ]
        });
    }

    if ($(".about__products-categories .about__products-categories-item").length>=3) {
        $(".about__products-categories").slick({
            slidesToShow: 3,
            slidesToScroll: 1,
            dots: false,
            focusOnSelect: false,
            arrows: true,
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 993,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 370,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }

    if ($(window).width() <= 993) {
        if ($(".js-main-leaders-slider .main-leaders__item").length>2) {
            $(".main-leaders .main-leaders__wrapper").addClass("slider");
            $(".js-main-leaders-slider").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".js-main-leaders-slider .main-leaders__item").length>4) {
            $(".main-leaders .main-leaders__wrapper").addClass("slider");
            $(".js-main-leaders-slider").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".js-main-leaders-slider .main-leaders__item").length>3) {
            $(".main-leaders .main-leaders__wrapper").addClass("slider");
            $(".js-main-leaders-slider").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    // if ($(".card-page .js-card_accessories-slider .main-leaders__item").length>3) {
    //     $(".card_accessories .main-leaders__wrapper").addClass("slider");
    //     $(".js-card_accessories-slider").slick({
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         centerMode: false,
    //         centerPadding: '0',
    //         dots: false,
    //         focusOnSelect: false,
    //         arrows: true,
    //         adaptiveHeight: true,
    //         prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
    //         nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
    //         responsive: [
    //             {
    //                 breakpoint: 576,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 370,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });
    // }

    if ($(window).width() <= 993) {
        if ($(".card-page .js-card_accessories-slider .main-leaders__item").length>2) {
            $(".card_accessories .main-leaders__wrapper").addClass("slider");
            $(".js-card_accessories-slider").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".card-page .js-card_accessories-slider .main-leaders__item").length>4) {
            $(".card_accessories .main-leaders__wrapper").addClass("slider");
            $(".js-card_accessories-slider").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".card-page .js-card_accessories-slider .main-leaders__item").length>3) {
            $(".card_accessories .main-leaders__wrapper").addClass("slider");
            $(".js-card_accessories-slider").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    // if ($(".card-page .js-card_similar-product-slider .main-leaders__item").length>3) {
    //     $(".card_similar-product .main-leaders__wrapper").addClass("slider");
    //     $(".js-card_similar-product-slider").slick({
    //         slidesToShow: 3,
    //         slidesToScroll: 1,
    //         centerMode: false,
    //         centerPadding: '0',
    //         dots: false,
    //         focusOnSelect: false,
    //         arrows: true,
    //         adaptiveHeight: true,
    //         prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
    //         nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
    //         responsive: [
    //             {
    //                 breakpoint: 576,
    //                 settings: {
    //                     slidesToShow: 2,
    //                     slidesToScroll: 1
    //                 }
    //             },
    //             {
    //                 breakpoint: 370,
    //                 settings: {
    //                     slidesToShow: 1,
    //                     slidesToScroll: 1
    //                 }
    //             }
    //         ]
    //     });
    // }

    if ($(window).width() <= 993) {
        if ($(".card-page .js-card_similar-product-slider .main-leaders__item").length>2) {
            $(".card_similar-product .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".card-page .js-card_similar-product-slider .main-leaders__item").length>4) {
            $(".card_similar-product .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".card-page .js-card_similar-product-slider .main-leaders__item").length>3) {
            $(".card_similar-product .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 3,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    if ($(window).width() <= 993) {
        if ($(".content-page__slider .main-leaders__item").length>2) {
            $(".content-page__slider .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 2,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: false,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else if ($(window).width() > 1030) {
        if ($(".content-page__slider .main-leaders__item").length>4) {
            $(".content-page__slider .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: true,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    } else {
        if ($(".content-page__slider .main-leaders__item").length>3) {
            $(".content-page__slider .main-leaders__wrapper").addClass("slider");
            $(".js-card_similar-product-slider").slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                centerMode: false,
                centerPadding: '0',
                dots: false,
                focusOnSelect: true,
                arrows: true,
                adaptiveHeight: true,
                prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
                nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
                responsive: [
                    {
                        breakpoint: 993,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 370,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        }
    }

    /*card_missing buttons start*/
    if ($('.card_missing').length) {
        $('.card_missing .card-info .product-item__buttons-add button').addClass("disabled");
    }
    /*card_missing buttons end*/


    /*card__info-image start*/
    if ($('.card__image_slider-big').length) {
        $('.card__image_slider-big').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            adaptiveHeight: true,
            arrows: false,
            fade: true,
            asNavFor: '.card__image_slider-small',
            swipe: false,
            responsive: [
                {
                    breakpoint: 1030,
                    settings: {
                        swipe: true
                    }
                },
                {
                    breakpoint: 690,
                    settings: {
                        swipe: true
                    }
                }
            ]
        });
        $('.card__image_slider-small').slick({
            asNavFor: '.card__image_slider-big',
            dots: false,
            swipe: true,
            centerMode: false,
            infinite: false,
            slidesToShow: 4,
            slidesToScroll: 1,
            focusOnSelect: true,
            arrows: true,
            centerPadding: '0',
            adaptiveHeight: true,
            prevArrow:"<button type='button' class='slick-prev'><i class='icon icon-small-left' aria-hidden='true'></i></button>",
            nextArrow:"<button type='button' class='slick-next'><i class='icon icon-small-right' aria-hidden='true'></i></button>",
            responsive: [
                {
                    breakpoint: 1201,
                    settings: {
                        swipe: true,
                        infinite: true,
                        centerMode: false,
                        slidesToShow: 10,
                        autoSlidesToShow: true,
                        focusOnSelect: true,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 690,
                    settings: {
                        swipe: true,
                        slidesToShow: 3,
                        autoSlidesToShow: true,
                        slidesToScroll: 1
                    }
                }
            ]
        });
    }
    /*card__info-image end*/

    /*slick end*/
    if ($("#sort-city").length) {
        $("#sort-city").select2({
        });
    }
    if ($("#sort-np").length) {
        $("#sort-np").select2({
        });
    }
    if ($("#sort-city-courier").length) {
        $("#sort-city-courier").select2({
        });
    }
    $('.js__delivery-pickup').on('click', function () {
        console.log("#sort-city-courier ACTIVE1", $("#sort-city-courier"));
        $("#sort-city-courier").select2({
        });
    });
    $( "#sort-city-courier" ).load(function() {
        console.log("#sort-city-courier ACTIVE2");
        $("#sort-city-courier").select2({
        });
    });
    if ($("#sort-value").length) {
        $("#sort-value").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($("#sort-quantity").length) {
        $("#sort-quantity").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($("#sort-town").length) {
        $("#sort-town").select2({
            minimumResultsForSearch: -1
        });
    }
    if ($(window).width() <= 1030) {
        $(".select").on('select2:open', function (e) {
            console.log("select2:open");
            setTimeout(function () {
                $(document).find(".select2-dropdown").css({'width': '100%', 'min-width': '100%', 'top': '0px', 'position': 'fixed', 'height': '100vh'});
                $(document).find(".select2-results").css({'height':'100%', 'max-height':'unset', 'display':'block', 'z-index':'100'});
                $(document).find(".select2-results__options").css({'height':'100%', 'max-height':'unset', 'display':'block', 'z-index':'100'});
            }, 500);
        });
        $(".select").on('select2:close', function (e) {
            console.log("select2:close");
            $(document).find(".select2-dropdown").css({'width': '0%', 'min-width': '0%', 'top': '0px', 'position': 'static', 'height': '0'});
            $(document).find(".select2-results").css({'height':'0', 'max-height':'0', 'display':'none', 'z-index':'-1'});
            $(document).find(".select2-results__options").css({'height':'0', 'max-height':'0', 'display':'none', 'z-index':'-1'});
        });
    }
    //select2 end

    $('.card-gallery').click(function() {
        $.fancybox.open( $("[data-fancybox]"));
    });

    //body onclick start
    $('body').on('click', function () {
        $('.dropdown__dropdown').slideUp();
        $('.header__phone-dropdown').slideUp();
        $('.js__dropdown').removeClass("active");
        $('.js__phone-dropdown').removeClass("active");
    });
    //body onclick end

    /*range start*/
    jQuery(".catalog__filter_item_range").slider({
        min: jQuery('[data-slider-min]').data('slider-min'),
        max: jQuery('[data-slider-max]').data('slider-max'),
        values: [jQuery('.catalog__filter_item_range').data('from'),jQuery('.catalog__filter_item_range').data('to')],
        range: true,
        stop: function(event, ui) {
            jQuery("input.catalog__filter_item_range_from").val(jQuery(".catalog__filter_item_range").slider("values",0));
            jQuery("input.catalog__filter_item_range_to").val(jQuery(".catalog__filter_item_range").slider("values",1));
            generateFilterUrl('price=' + jQuery(".catalog__filter_item_range").slider("values",0) + '-' + jQuery(".catalog__filter_item_range").slider("values",1));
        },
        slide: function(event, ui){
            jQuery("input.catalog__filter_item_range_from").val(jQuery(".catalog__filter_item_range").slider("values",0));
            jQuery("input.catalog__filter_item_range_to").val(jQuery(".catalog__filter_item_range").slider("values",1));
        }

    }).draggable();
    /*range end*/

    /*filter close-open start*/
    if ($(window).width() <= 1030) {
        $(".catalog__filter").removeClass("open");
        $(".catalog__filter > .catalog__filter_item").removeClass("open");
        $(".catalog__filter .catalog__filter_item > .catalog__filter_item_content").addClass("close");
        $(".main").removeClass("mt0");
        $(".header").removeClass("hidden");
    }
    if ($(".catalog__filter_item").length) {
        if ($(window).width() <= 1030) {
            $(".catalog__filter_item_title").on('click', function (e) {
                if($(this).hasClass("main_title")) {

                } else {
                    $(this).closest(".catalog__filter_item").toggleClass("open");
                    $(this).siblings(".catalog__filter_item_content").toggleClass("close");
                    //e.stopPropagation();
                }
            });
            $(".page__header-filter .btn-filters").on('click', function (e) {
                if ($(window).width() <= 1030) {
                    $(".catalog__filter").addClass("open");
                    $(".catalog__filter > .catalog__filter_item").addClass("open");
                    $(".catalog__filter .main-item > .catalog__filter_item_content").removeClass("close");
                    $(".main").addClass("mt0");
                    $(".header").addClass("hidden");
                    //e.stopPropagation();
                }
            });
            $(".catalog__filter .main_title .plus").on('click', function (e) {
                if ($(window).width() <= 1030) {
                    $(".catalog__filter").removeClass("open");
                    $(".main").removeClass("mt0");
                    $(".header").removeClass("hidden");
                }
            });
        } else {
            $(".catalog__filter_item_title:not(.main_title)").on('click', function (e) {
                $(this).closest(".catalog__filter_item").toggleClass("open");
                $(this).siblings(".catalog__filter_item_content").toggleClass("close");
            });
        }
    }
    if ($(".card__sidebar-item").length) {
        $(".card__sidebar-item_title").on('click', function () {
            $(this).closest(".card__sidebar-item").toggleClass("open");
            $(this).siblings(".card__sidebar-item_content").toggleClass("close");
        });
    }
    /*filter close-open end*/

    //checkbox checked
    if ($(".checkbox-wrapper").length) {
        $(".checkbox-wrapper input[type=checkbox]").on('click', function(){
            $(this).toggleClass("active");
        });
    }
    //checkbox checked

    // card__info range
    if ($(".catalog__filter_item_content").length) {
        var rangeFirst = $(".catalog__filter_item_range span:first-of-type").css("left");
        var rangeLast = $(".catalog__filter_item_range span:last-of-type").css("left");
    }
    // card__info range

    // card__info item :not(.color) checked
    if ($(".catalog__filter_item_content:not(.color) .catalog__filter_item_checkbox").length) {
        $(".catalog__filter_item_content:not(.color) .catalog__filter_item_checkbox input[type=checkbox]").on('click', function(){
            $(this).toggleClass("active");
        });
    }
    // card__info item :not(.color) checked

    // card__info-color checked
    if ($(".card__info-color .catalog__filter_item_checkbox").length) {
        $(".card__info-color .catalog__filter_item_checkbox input[type=checkbox]").on('click', function(){
            if($(this).is(":checked")) {
                $(".card__info-color .catalog__filter_item_checkbox input[type=checkbox]").prop('checked', false);
                $(".card__info-color .catalog__filter_item_input").removeClass("checked");
                $(this).prop('checked', true);
                $(this).closest(".catalog__filter_item_input").addClass("checked");
            }
        });
    }
    // card__info-color checked

    if ($("a.catalog__filter_item_checkbox").length) {
        $("a.catalog__filter_item_checkbox").on('click', function(){
            // location.href = $(this).attr("href");
            window.open($(this).attr("href"),"_self");
        });
    }

    // catalog__info-color checked
    if ($(".catalog__filter .catalog__filter_item_content.color .catalog__filter_item_input input").length) {
        $(".catalog__filter .catalog__filter_item_content.color .catalog__filter_item_input input[type=checkbox]").on('click', function(){
            if($(this).is(":checked")) {
                $(this).closest(".catalog__filter_item_input").addClass("checked");
            } else {
                $(this).closest(".catalog__filter_item_input").removeClass("checked");
            }
        });
    }
    // catalog__info-color checked

    // product-item__stock click
    // if ($(".product-item__stock").length) {
    //     $(".product-item__stock").on('click', function(e){
    //         e.stopPropagation();
    //         e.preventDefault();
    //     });
    // }
    // product-item__stock click

    // page__header-allert click
    if ($(".page__header-allert").length) {
        $(".page__header-allert .icon-close").on('click', function(e){
            $(this).closest(".page__header-allert").removeClass("active");
            e.stopPropagation();
            e.preventDefault();
        });
    }
    // page__header-allert click


    /*Popup start*/
    $('.btn[data-target="order"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-order"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="cart"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-cart"]').fadeIn(300);
        $('body').addClass("overflow");
        e.stopPropagation();
        e.preventDefault();
    });
    $('.btn[data-target="favorite"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-favorite"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="comparison"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-comparison"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="call"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-call"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="mail"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-mail"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="recall"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-recall"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="cart-in"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('.popup[data-target="popup-cart-in"]').fadeIn(300);
        $('body').addClass("overflow");
    });
    $('.btn[data-target="missing"]').on("click", function (e) {
        $('.popup-overlay').fadeIn(300);
        $('.popup[data-target="popup-missing"]').fadeIn(300);
        $('body').addClass("overflow");
    });

    $(document).on("click", "html", function(e) {
        console.log(e.target);
    });

    $('.popup:not(.popup__cart-in)').click(function(e) {
        e.stopPropagation();
    });

    $('.popup').click(function(e) {
        e.stopPropagation();
    });
    function closePopup() {
        $('body').removeClass("overflow");
        $('.popup-overlay').fadeOut(300);
        $('.popup').fadeOut(300);
        setTimeout(function () {
            $('.popup-overlay').fadeOut(500);
        }, 500);
    }
    $('.popup-overlay').click(function() {
        closePopup();
    });
    $('.popup-header__link a').click(function() {
        closePopup();
    });
    $('.popup .close-btn').click(function() {
        closePopup();
    });

    /*Popup end*/

    // input on focus start
    $(document).on("change", '.input-container input,.input-container textarea', function () {
        if ($(this).val()!="") {
            $(document).find(this).closest(".input-container").addClass("filled");
            $(document).find('.input-container input,.input-container textarea').on("blur", function () {
                $(document).find(this).closest(".input-container").addClass("active");
            });
        } else {
            $(document).find(this).closest(".input-container").removeClass("filled");
            $(document).find('.input-container input,.input-container textarea').on("blur", function () {
                $(document).find(this).closest(".input-container").removeClass("active");
            });
        }
    });

    $(document).on("keydown", '.input-container input,.input-container textarea', function () {
        $(document).find(this).closest(".input-container").addClass("active");
    });

    $(document).on("focus", '.input-container input,.input-container textarea', function () {
        $(document).find(this).closest(".input-container").addClass("active");
    });

    $(document).on("blur", '.input-container input,.input-container textarea', function () {
        $(document).find(this).closest(".input-container").removeClass("active");
        $(document).find(this).closest(".input-container").removeClass("filled");
    });
    // input on focus end

    //phone mask
    if ($('input[type="tel"]').length) {
        $.jMaskGlobals = {translation: {
                'n': {pattern: /\d/},
            }
        };
        $('input[type="tel"]').mask('+380(nn)-nnn-nnnn', {
            // placeholder: "+380(--)-------"
        });
    }
    //phone mask

    /* map start*/
    function myMap(mapItem) {
        var coords = mapItem.data('coords').split(/\s*,\s*/);
        var myLatlng = new google.maps.LatLng(coords[0], coords[1]);
        var myCenter = new google.maps.LatLng(coords[0], coords[1]);
        console.log(mapItem[0].id);
        if (mapItem.length > 0) {
            var mapOptions = {
                zoom: 17,
                center: myCenter,
                scrollwheel: false,
                disableDefaultUI: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById(mapItem[0].id), mapOptions);
            var marker = new google.maps.Marker({
                position: myLatlng,
                map: map,
                icon: 'images/marker.png'
            });
        }
    }

    if ($("#map").length) {
        myMap($("#map"));
        console.log(myMap($("#map")));
    }
    if ($("#map-pickup").length) {
        myMap($("#map-pickup"));
    }
    /* map end*/

    // $(".js__map-toggle"), $(".js__map-toggle span").on('click', function(e){
    //     e.stopPropagation();
    //     $(".delivery-map").slideToggle();
    // });
    $(document).on("click", '.js__map-toggle', function () {
        $(document).find($(".delivery-map")).slideToggle();
    });
    // radiobuttons toogle order

    //about__gallery start
    if($(".about__gallery").length) {
        var full=false;

        $('.imgWrap').hover(function () {
            $(this).addClass('current');
            $(this).siblings().addClass('notCurrent');
        }, function () {
            $('.imgWrap').siblings().removeClass('notCurrent');
            $('.imgWrap').removeClass('current');
        });

        $('.imgWrap').click(function () {

            if(!full){
                full = true;
                $(this).addClass('current-full');
                $(this).siblings().addClass('notCurrent-full');
            }
        });

        $('.mfp-close').click(function () {
            full = false;
            $('.imgWrap').siblings().removeClass('notCurrent-full');
            $('.imgWrap').removeClass('current-full');

        });

        $('.gallery').magnificPopup({
            delegate: 'a',
            type: 'image',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true,
                navigateByImgClick: true,
                preload: [0,1]
            }
        });
    }
    //about__gallery end

    //FAQ close open
    $('.faq__content-title').click(function () {
        $(this).closest('.faq__content-li').toggleClass("active");
        $(this).closest('.faq__content-li').find(".faq__content-text").slideToggle();
    });

    var link = window.location.href;
    if(link.indexOf("#faq-anchor")!=-1) {
        var lastIndex = link.length;
        var linkIndex = link.substring(link.indexOf("#faq-anchor"));
        $(linkIndex).addClass("active");
        $(linkIndex).find(".faq__content-text").slideDown(100);
    }
    //FAQ close open


    //card characteristic close open
    if($('.card_characteristic tbody tr').length>6) {
        $('.card_characteristic tfoot').click(function () {
            $(this).toggleClass("active");
            for (var i = 0; i<$(this).closest("table").find("tbody tr").length; i++) {
                if($(this).closest("table").find("tbody tr")[i+6]!=undefined) {
                    $($(this).closest("table").find("tbody tr")[i+6]).fadeToggle();
                }
            }
            if ($(this).hasClass("active")) {
                $(this).find("span").text($(this).find("span").attr('data-hidden'));
            } else {
                $(this).find("span").text($(this).find("span").attr('data-text'));
            }
        });
    } else {
        $('.card_characteristic tfoot').css("display","none");
    }
    //card characteristic close open

    //card description open
    $('.card_description__button').click(function () {
        $(this).closest(".card_description").toggleClass("active");
        if ($(this).closest(".card_description").hasClass("active")) {
            $(this).find("span").text($(this).find("span").attr('data-hidden'));
        } else {
            $(this).find("span").text($(this).find("span").attr('data-text'));
        }
    });
    //card description open

    //adaptive site toggle

    $('.footer__adaptive').click(function () {
        $(this).toggleClass("desktop");
        if ($(this).hasClass("desktop")) {
            $('.footer__adaptive span').text($('.footer__adaptive span').attr('data-hidden'));
            $('meta[name="viewport"]').prop('content', 'width=1250, user-scalable=1, initial-scale=1, maximum-scale=1, minimum-scale=1');
            $('body').css('overflow-x', 'auto');
        } else {
            $('.footer__adaptive span').text($('.footer__adaptive span').attr('data-text'));
            $('meta[name="viewport"]').prop('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            $('body').css('overflow-x', 'hidden');
        }
    });
    //adaptive site toggle

    // input-container delete start
    $('.input-container .delete').click(function() {
        var error_class = "error";
        var inp = $(this).siblings('input');
        var label = $(this).siblings('label');
        inp.val('');
        inp.parent('.input-container').removeClass(error_class);
        inp.parent('.input-container').removeClass("filled");
        if(inp[0].hasAttribute("data-error-existence")) {
            label.text(inp.attr("data-error-existence"));
        } else {
        }
    });
    // input-container delete start

    /*Cut string start*/
    function cutString(string, quantity) {
        string.text(function(i, text) {
            if (text.length >= quantity) {
                text = text.substring(0, quantity);
                var lastIndex = text.lastIndexOf(" ");
                text = text.substring(0, lastIndex) + '...';
            }
            $(this).text(text);
        });
    }

    if ($(".catalog__grid .product-item__content span").length) {
        cutString($(".catalog__grid .product-item__content span"), 85);
    }

    if ($(".slick-list .product-item__content span").length) {
        cutString($(".slick-list .product-item__content span"), 85);
    }

    if ($(".catalog__grid .product-item__title").length) {
        cutString($(".catalog__grid .product-item__title"), 255);
    }

    if ($(".slick-list .product-item__title").length) {
        cutString($(".slick-list .product-item__title"), 255);
    }
    /*Cut string end*/

    // elevateZoom start
    function elevateZoom () {
        if ($(window).width() > 1030) {
            $('.gallery-images .slick-active img').elevateZoom({
                zoomType: "window",
                scrollZoom: "true",
                cursor: "crosshair",
                zoomLevel: 1
            });
        }
    }

    if($('.card__image_loupe').length) {
        elevateZoom ();
        $('.card__image_slider-small-slide').on('click', function(event){
            event.preventDefault();
            $('.gallery-images .slick-active img').removeData('elevateZoom');
            $('.zoomContainer').remove();
            elevateZoom ();
        });

        $('.card__image_loupe .slick-arrow').on('click', function(event){
            event.preventDefault();
            $('.gallery-images .slick-active img').removeData('elevateZoom');
            $('.zoomContainer').remove();
            elevateZoom ();
        });
    }
    // elevateZoom end

    //card auto-fix-sidebar start
    if ($('.catalog .auto-fix-sidebar').length) {
        $('.catalog .auto-fix-sidebar').addClass("auto-fix-sidebar_catalog");
    } else if ($('.card .auto-fix-sidebar').length) {
        $('.card .auto-fix-sidebar').addClass("auto-fix-sidebar_card");
    } else {

    }

    function sidebarScroll() {
        var windowTop = $(window).scrollTop(),
            windowHeight = $(window).outerHeight(),
            headerHeight = header.height(),
            sidebarTop = sidebar.offset().top,
            sidebarBottom = sidebarTop + sidebar.outerHeight(),
            stopTop = $('#stop-top-sidebar').offset().top,
            stopBottom = $('#stop-bottom-sidebar').offset().top,
            sidebarWidth = sidebar.outerWidth(true),
            contentHeight = stopBottom - stopTop,
            sidebarHeight = sidebar.height(),
            windowBottom = windowTop + windowHeight;

        if (windowBottom >= sidebarBottom && !sidebar.hasClass("sidebar-fixed-bottom") && !sidebar.hasClass("sidebar-top")) {
            sidebar[0].setAttribute('style', '');
            sidebar.css("width", sidebarWidth);
            sidebar.removeClass('sidebar-fixed-top');
            sidebar.addClass('sidebar-fixed');
        }
        if (sidebarTop < stopTop && sidebar.hasClass('sidebar-fixed')) {
            sidebar.removeClass('sidebar-fixed');
            sidebar.addClass('sidebar-fixed-top');
            sidebar.css("top", 0);
        }
        if (sidebarBottom >= stopBottom && !sidebar.hasClass('sidebar-top')) {
            sidebar.removeClass('sidebar-fixed');
            sidebar.addClass('sidebar-fixed-bottom');
            sidebar.css("top", contentHeight - sidebarHeight);
        }
        if (sidebarBottom >= stopBottom && sidebar.hasClass('sidebar-top')) {
            sidebar.removeClass('sidebar-top');
            sidebar.addClass('sidebar-fixed-bottom');
            sidebar.css("top", contentHeight - sidebarHeight);
        } else if (sidebarTop >= windowTop + headerHeight && sidebar.hasClass('sidebar-fixed-bottom')) {
            sidebar.removeClass('sidebar-fixed-bottom');
            sidebar.addClass('sidebar-top');
        }
        if (windowTop + headerHeight <= stopTop && sidebar.hasClass('sidebar-top')) {
            sidebar.removeClass('sidebar-top');
            sidebar.addClass('sidebar-fixed-top');
            sidebar.css("top", 0);
        }

    };

    function sidebarСoincidence() {
        var blockArr = [];
        for (var i=0; i<$('.card_content section[id]').length; i++) {
            var blockId = $($('.card_content section[id]')[i]).prop('id');
            if(blockId.indexOf("anchor-")!=-1) {
                blockArr.push(blockId);
            }
        }
        var linkFirst = $($('.card-sidebar__nav-link')[0]),
            blockFirst = $('.card_content section#' + blockArr[0]);
        if(linkFirst.offset().top >= blockFirst.offset().top) {
            for(var i=0; i<$('.card-sidebar__nav-link').length; i++) {
                var link = $($('.card-sidebar__nav-link')[i]),
                    block = $('.card_content section#' + blockArr[i]);
                if(link.attr("href").substring(1, link.attr("href").length)==block.prop('id')) {
                    var linkPosition = link.offset().top,
                        blockHeight = block.outerHeight(),
                        blockTop = block.offset().top,
                        blockBottom = blockTop + blockHeight;
                    if(linkPosition>=blockTop&&linkPosition<blockBottom) {
                        link.addClass("active");
                    } else {
                        link.removeClass("active");
                    }
                }
            }
        } else {
            for(var i=0; i<$('.card-sidebar__nav-link').length; i++) {
                $($('.card-sidebar__nav-link')[i]).removeClass("active");
            }
        }
    };

    var sidebar = $('.auto-fix-sidebar');
    if (sidebar.length && $(window).width() > 1200) {
        var header = $('.header');
        sidebar.parent().css("position","relative");
        function sidebarVariablesInit() {
            setTimeout(function () {
                var windowHeight = $(window).outerHeight();
                var sidebarWidth = sidebar.outerWidth(true);
                var sidebarHeight = sidebar.height();
                var headerHeight = header.height();
                var stopTop = $('#stop-top-sidebar').offset().top;
                var stopBottom = $('#stop-bottom-sidebar').offset().top;
                var contentHeight = stopBottom - stopTop;
                if (sidebarHeight+headerHeight < windowHeight) {
                    if ($('.auto-fix-sidebar_card').length) {
                        $(window).on('scroll', sidebarScroll1);
                        $(window).on('scroll', sidebarСoincidence);
                    } else if ('.auto-fix-sidebar_catalog') {
                        $(window).on('scroll', sidebarScroll1);
                    } else {};
                    function sidebarScroll1() {
                        var windowTop = $(window).scrollTop(),
                            sidebarTop = sidebar.offset().top,
                            sidebarBottom = sidebarTop + sidebar.outerHeight(),
                            windowBottom = windowTop + windowHeight;
                        if (windowTop >= sidebarTop) {
                            sidebar[0].setAttribute('style', '');
                            sidebar.css("width", sidebarWidth);
                            sidebar.removeClass('sidebar-fixed-top');
                            sidebar.addClass('sidebar-top');
                        }
                        if (sidebarBottom >= stopBottom && sidebar.hasClass('sidebar-top')) {
                            sidebar.removeClass('sidebar-top');
                            sidebar.addClass('sidebar-fixed-bottom');
                            sidebar.css("top", contentHeight - sidebarHeight);
                        } else if (sidebarTop >= windowTop + headerHeight && sidebar.hasClass('sidebar-fixed-bottom')) {
                            sidebar.removeClass('sidebar-fixed-bottom');
                            sidebar.addClass('sidebar-top');
                        }
                        if (windowTop + headerHeight <= stopTop && sidebar.hasClass('sidebar-top')) {
                            sidebar.removeClass('sidebar-top');
                            sidebar.addClass('sidebar-fixed-top');
                            sidebar.css("top", 0);
                        }
                    }
                }
                else {
                    if (contentHeight - sidebarHeight > 100) {
                        if ($('.auto-fix-sidebar_card').length) {
                            $(window).on('scroll', sidebarScroll);
                            $(window).on('scroll', sidebarСoincidence);
                        } else if ('.auto-fix-sidebar_catalog') {
                            $(window).on('scroll', sidebarScroll);
                        } else {};
                    }
                }
            }, 500);
        };
        window.addEventListener('load', sidebarVariablesInit());
    };
    //card auto-fix-sidebar end

    [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function() {
            img.removeAttribute('data-src');
        };
    });

    $('.popup .btn').on('click', function(e) {
        console.log(e.target, this);
        var valid = validate($(document).find($(this).parents(".js_validate")));
        if (valid == false) {
            console.log("valid not passed");
            return false;
        } else {
            console.log("valid passed");
            e.preventAction = false;
            return true;
        }
    });

    function deleteCart(data) {
        var product = data;
        var _url = window.location.href.split("/");
        var reload = 0;
        $.ajax({
            url: _url.slice(0, 4).join("/") + "/",
            dataType: "json",
            type: "POST",
            data: "ajax=deleteProductCart&product=" + product + "&reload=" + reload,
            success: function (res) {
                if (res.status == 1) {
                    $('.js_append_content_cart').html(res.cart);
                    $('.js_append_total_cart').html(res.total);
                    if (res.count > 0) {
                        $(".js_cart_count").text(res.count);
                    } else {
                        $('.js_cart_active').addClass('disabled');
                        if ($('.order-page').length > 0) {
                            setTimeout(function (e) {
                                window.location.href = res.link;
                            }, 3000);
                        }
                    }

                    let price = res.data.price;
                    let price_sale = res.data.price_sale;
                    var total = CalculateSumOrder(price, price_sale, $("[name=\"checkout[price][delivery]\"]").val());
                    CalculateFrontOutput(price, price_sale, $("[name=\"checkout[price][delivery]\"]").val(), total);
                }
            }
        });
    }
    function CartReload() {
        var i = 1;
        if(jQuery(document).find('.input-number').length) {
            jQuery(document).find('.input-number').each(function() {
                i++;
                var spinner = jQuery(document).find(this),
                    input = spinner.find('input[type="number"]'),
                    btnUp = spinner.find('.input-number_arrow.next'),
                    btnDown = spinner.find('.input-number_arrow.prev'),
                    min = input.attr('min'),
                    max = input.attr('max');
                btnUp.click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    if(spinner.hasClass("disabled")) {
                    } else {
                        var oldValue = parseFloat(input.val());
                        if (oldValue >= max) {
                            var newVal = oldValue;
                        } else {
                            var newVal = oldValue + 1;
                        }
                        spinner.find("input").val(newVal);
                        spinner.find("input").trigger("change");
                    }
                });
                btnDown.click(function(e) {
                    e.stopPropagation();
                    e.preventDefault();
                    var oldValue = parseFloat(input.val());
                    if (oldValue <= min) {
                        var newVal = oldValue;
                    } else {
                        var newVal = oldValue - 1;
                    }
                    spinner.find("input").val(newVal);
                    spinner.find("input").trigger("change");
                });
            });
        }
    }

    var element = document.getElementsByClassName("popup__cart-in")[0];
    element.addEventListener('click', function(e) {
        e.stopPropagation();
        var link = e.target.closest(".basket-item");
        if(e.target.classList.contains("icon-delete")) {
            var button = e.target.closest(".js_remove_cart").getAttribute('data-delete');
            deleteCart(button);
            e.preventDefault();
            return false;
        } else if (e.target.classList.contains("input-number_arrow")) {
            CartReload();
            e.preventDefault();
            return false;
        } else if(e.target.classList.contains("image")||e.target.classList.contains("basket-item")||e.target.classList.contains("basket-item__wrapper")||e.target.classList.contains("subtitle")||e.target.classList.contains("basket-item__img")||e.target.classList.contains("value")||e.target.classList.contains("currency")) {
            location.href=link.getAttribute('href');
        } else if(e.target.classList.contains("popup__cart-in-link")) {
            location.href=e.target.getAttribute('href');
        } else if(e.target.classList.contains("popup__cart-in-span")) {
            location.href=e.target.parentElement.getAttribute('href');
        }
    });

    $(document).ready(function() {
        if ($('.preloader').length) {
            setTimeout(function () {
                $('.wrapper').addClass("visible");
                $('.preloader').addClass("hide");
                setTimeout(function() {
                    $('.preloader').addClass("none");
                }, 1000);
            }, 1000);
        } else {
            setTimeout(function () {
                $('.wrapper').addClass("visible");
            }, 1000);
        }
    });


})();