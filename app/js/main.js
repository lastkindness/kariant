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
            var destination = $(elementClick).offset().top - ($(window).outerHeight()/2);
            jQuery("html:not(:animated),body:not(:animated)").animate({
                scrollTop: destination
            }, 800);
            return false;
        });
    });
    /*Function for link scroll*/

    /*CustomInputNumber start*/
    if(jQuery('.input-number').length) {
        jQuery('.input-number').each(function() {
            var spinner = jQuery(this),
                input = spinner.find('input[type="number"]'),
                btnUp = spinner.find('.input-number_arrow.next'),
                btnDown = spinner.find('.input-number_arrow.prev'),
                min = input.attr('min'),
                max = input.attr('max');
            spinner.click(function (e) {
               e.stopPropagation();
               e.preventDefault();
            });
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

    //tub_block click
    if ($(".tub_filter").length) {
        $(".tub_filter .tub_header li").on('click', function () {
            $(this).addClass("active").siblings().removeClass("active");
            $(".main_cont .tub_body").hide().eq($(this).index()).show();
        });
    }
    //tub_block click

    //basket-item remove
    $(".basket-item__remove").on('click', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $('.popup[data-target="popup-product-delete"]').fadeIn(300);
        $(this).closest('.basket-item').addClass('del');
    });
    //basket-item remove

    $(".js__product-delete").on('click', function (e) {
        $('.popup[data-target="popup-product-delete"]').fadeOut(300);
        $('.basket-item.del').remove();
    });

    $(".js__product-delete-reset").on('click', function (e) {
        $('.popup[data-target="popup-product-delete"]').fadeOut(300);
        $('.basket-item.del').removeClass('del');
    });

    /* -------------------------------------------------------------------------
        begin Validation
        * ------------------------------------------------------------------------- */
    $(document).ready(function () {

        $(document).on("change", '.js_validate *[required]', function () {
            $(this).each(function () {
                var valid = validate($(document).find($(this)));
                if (valid == false) {
                    console.log("valid not passed");
                    return false;
                } else {
                    console.log("valid passed");
                }
            });

        });


        $('.js_validate .btn[type="submit"]').on("click", function () {
            //console.log($(document).find($(this).parents(".js_validate")));
            var valid = validate($(document).find($(this).parents(".js_validate")));
            //console.log($(this).closest(".js_validate"));
            if (valid == false) {
                console.log("valid not passed");
                return false;
            } else {
                console.log("valid passed");
            }
        });


    });

    function formatValidate(inputFile) {
        function showMsg(massage) {
            $($($($(inputFile)[0]).siblings(".text-error"))[0]).text(massage);
            $(inputFile[0]).closest(".input-container__file").addClass("error");
            return false;
        }

        var format = [".pdf", ".txt", ".doc", ".docx", ".rtf", ".odt"];

        console.log((inputFile)[0].files.length!=1);
        if ((inputFile)[0].files.length!=1) {
            //console.log($($(inputFile)[0]).attr("data-error-existence"));
            showMsg($($(inputFile)[0]).attr("data-error-existence"));
            return false;
        } else {
            var file = (inputFile)[0].files;
            var fileName = file[0].name;
            //console.log(file[0].size/1024/1024);
            if ((file[0].size/1024/1024) < 5) {
                for (var i = 0; i < format.length; i++) {
                    if (-1 !== fileName.indexOf(format[i])) {
                        $($(inputFile)[0]).closest(".input-container__file").removeClass("error");
                        $($(inputFile)[0]).closest(".input-container__file").addClass("pass");
                        $($(inputFile)[0]).siblings(".text-error").text("");
                        return true;
                    } else {
                        showMsg($($(inputFile)[0]).attr("data-error-type"));
                    }
                }
            }
            else {
                showMsg($($(inputFile)[0]).attr("data-error-size"));
            }
        }
    }


    function validate(form) {
        var error_class = "error";
        var norma_class = "pass";
        var item = form.find("[required]");
        var e = 0;
        var reg = undefined;
        var pass = $('.password').val();
        var pass1 = $('.password_1').val();
        var passold = $('.password_old').val();
        var email = false;
        var password = false;
        var password_1 = false;
        var password_old = false;
        var phone = false;
        var undef = false;
        var date = false;
        var number = false;
        var arr = [];

        function mark(object, expression, minSign, maxSign) {
            if (expression) {
                object.parent('div').addClass(error_class).removeClass(norma_class);
                if (email) {
                    ///console.log(object.val());
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 37) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        } else {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_old) {
                    //console.log(object.val());
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==pass||object.val()==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            } else if (object.val()!==pass1) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                //console.log(object.val(), passold);
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (password_1) {
                    if (object.val().length > 0) {
                        if (object.val().length < 6) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-min"));
                        }
                        else if  (object.val().length > 20) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-max"));
                        }
                        else {
                            if(object.val()==passold) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-old"));
                            }  else if (object.val()!==pass) {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong-new"));
                            } else {
                                object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                            }
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                if (phone) {
                    //console.log(object.val());
                    if (object.val().length != 17) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (date) {
                    //console.log(object.val());
                    if (object.val().length != 4) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (number) {
                    //console.log(object.val());
                    if (object.val().length < 4 ||object.val().length > 100) {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                    }
                }
                if (undef) {
                    //console.log(object.val());
                    if (object.val().length > 0) {
                        if (object.val().length > minSign && object.val().length < maxSign) {
                            object.parent('div').find('.text-error').text(object.attr("data-error-wrong"));
                        } else {
                            object.parent('div').find('.text-error').text('Введите колличество символов (2-100)');
                        }
                    } else {
                        object.parent('div').find('.text-error').text(object.attr("data-error-empty"));
                    }
                }
                //console.log("expression=true");
                e++;
            } else {
                if($(object[0]).hasClass("select")) {
                    if($(object[0]).prop("selectedIndex")!=0) {
                        object.parent('div').addClass(norma_class).removeClass(error_class);
                        e = 0;
                    } else {
                        object.parent('div').addClass(error_class).removeClass(norma_class);
                        e = 0;
                    }
                } else {
                    object.parent('div').addClass(norma_class).removeClass(error_class);
                    e = 0;
                    //console.log("expression=false");
                }
            }
            arr.push(expression);
        }

        if(form.hasClass('js_validate')) {
            var field = form.find("[required]"),
                select = form.find('.js_valid_select'),
                radio = form.find('.js_valid_radio'),
                file = form.find('.input-container__file'),
                checkbox = form.find('.js_valid_checkbox');
            field.each(function () {
                var dataValidate = $(this).attr("data-validate");
                caseDataValidate(dataValidate, $(this));
            });
            select.each(function () {
                validSelect($(this).find('select option'));
            });
            radio.each(function () {
                validRadio($(this).find('input[type="radio"]'));
            });
            checkbox.each(function () {
                validCheckbox($(this).find('input[type="checkbox"]'));
            });
            file.each(function () {
                validFile($(this).find('input[type="file"]'));
            });
        } else {
            var dataValidate =  form.attr("data-validate"),
                inputContainer = form.closest('.input-container'),
                field = form,
                select = inputContainer.find('select option'),
                radio = inputContainer.find('input[type="radio"]'),
                file = inputContainer.find('input[type="file"]'),
                checkbox = inputContainer.find('input[type="checkbox"]');
            //console.log(checkbox);
            if(inputContainer.hasClass('js_valid_select')) {
                validSelect(select);
            }
            else if(inputContainer.hasClass('js_valid_radio')) {
                validRadio(radio);
            }
            else if(inputContainer.hasClass('js_valid_checkbox')) {
                validCheckbox(checkbox);
            }
            else if(inputContainer.hasClass('input-container__file')) {
                validFile(file);
            }
            else {
                caseDataValidate(dataValidate, field);
            }
        }

        function caseDataValidate(dataValidate, fieldIn) {
            var minSign = fieldIn.attr("data-minsign");
            var maxSign = fieldIn.attr("data-maxsign");
            //console.log(dataValidate, fieldIn);
            switch (dataValidate) {
                case "text":
                    reg = new RegExp('^[\/\'"?!,.А-Яа-яёЁЇїІіЄєҐґa-zA-Z_0-9 -]{'+minSign+','+maxSign+'}$');
                    undef = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())), minSign, maxSign);
                    undef = false;
                    break;
                case "date":
                    reg = /^\d{2,10}[,.]?\d{2,10}[,.]?\d{2,10}$/;
                    date = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    date = false;
                    break;
                case "number":
                    //reg = /^\d+$/;
                    reg = new RegExp('^[0-9]{'+minSign+','+maxSign+'}$');
                    number = true;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    number = false;
                    break;
                case "email":
                    reg = /^([A-Za-z0-9_\-\.]{1,15})+\@([A-Za-z0-9_\-\.]{1,10})+\.([A-Za-z]{2,10})$/;
                    email = true;
                    if($.trim(fieldIn.val()).length>37) {
                        mark(fieldIn, true);
                    } else {
                        mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    }
                    email = false;
                    break;
                case "phone":
                    phone = true;
                    reg = /[0-9-()+]{17}$/;
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    phone = false;
                    break;
                case "passold":
                    password_old = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    //console.log(passold, pass, pass1);
                    mark(fieldIn, (passold==pass||!reg.test($.trim(fieldIn.val()))||passold==pass1));
                    password_old = false;
                    break;
                case "pass":
                    password = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold==pass));
                    password = false;
                    break;
                case "pass1":
                    password_1 = true;
                    reg = /^[a-zA-Z0-9!#@_\-|]{6,20}$/;
                    mark(fieldIn, (pass1 !== pass||!reg.test($.trim(fieldIn.val()))||passold == pass1));
                    password_1 = false;
                    break;
                case "file":
                    formatValidate(fieldIn);
                case "select2":
                    if (fieldIn.val()!=null||fieldIn.val()!=undefined||fieldIn.val()!="0") {
                        mark(fieldIn, false);
                        break;
                    } else {
                        mark(fieldIn, true);
                        break;
                    };
                default:
                    reg = new RegExp(fieldIn.attr("data-validate"), "g");
                    mark(fieldIn, !reg.test($.trim(fieldIn.val())));
                    break;
            }
        }

// js_valid_select
        function validSelect(inp) {
            //console.log(inp);
            var rezalt = 0;
            for (var i = 1; i < inp.length; i++) {
                //console.log($(inp[i]).is('selected'));
                if ($(inp[i]).is('selected') === true||$(inp[i]).prop('selected') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_radio
        function validRadio(inp) {
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
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_checkbox
        function validCheckbox(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                //console.log($(inp[i]).is(':checked'));
                if ($(inp[i]).is(':checked') === true) {
                    rezalt = 1;
                    break;
                } else {
                    rezalt = 0;
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };

// js_valid_file
        function validFile(inp) {
            var rezalt = 0;
            for (var i = 0; i < inp.length; i++) {
                if (formatValidate(inp) == true) {
                    rezalt = 1;
                    //console.log("rezalt1");
                    break;
                } else {
                    rezalt = 0;
                    //console.log("rezalt0");
                }
            }
            if (rezalt === 0) {
                inp.closest('.input-container').addClass(error_class).removeClass(norma_class);
                e = 1;
            } else {
                inp.closest('.input-container').addClass(norma_class).removeClass(error_class);
            }
        };
// js_valid_rating
        form.find('.js-rating').each(function (indx, rating) {
            var i = 0;
            $(rating).find(".star").each(function (indx, star) {
                if($(star).hasClass("active")) {
                    i++;
                } else {
                }
            });
            if (i>0) {
                $(this).addClass(norma_class).removeClass(error_class);
            } else {
                $(rating).addClass(error_class).removeClass(norma_class);
                e = 1;
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

    /* -------------------------------------------------------------------------
     end Validation
     * ------------------------------------------------------------------------- */


    //dropdown select start
    $('.js__dropdown').on('click', function (e) {
        var thisItem = $(this);
        function dropdownToggle() {
            //console.log('dropdownToggle');
            $(thisItem).toggleClass('active');
            $(thisItem).find('.dropdown__dropdown').slideToggle();
            e.stopPropagation();
        }
        if($(window).width() > 993) {
            dropdownToggle();
        } else if($(window).width() <= 993 && $(this).closest('.header__currency').length==false) {
            dropdownToggle();
            //console.log($(window).width() <= 993, $(this).closest('.header__currency').length==false);
        }
    });

    $('.js__dropdown a').on('click', function (e) {
        e.preventDefault();
    });
    //dropdown select end

    /*burger start*/
    if($('.header .burger').length) {
        if($(window).width() <= 993) {
            $('.header .burger').click(function () {
                $('html').toggleClass('mobile-menu');
                if($('.header .burger').hasClass('is-active')) {
                    $('.header__menu-list-wrapper').each(function (index, item) {
                        setTimeout(function () {
                            $(item).removeClass('active');
                        }, 10);
                    });
                    $('.header__menu-list-sub').each(function (index, item) {
                        setTimeout(function () {
                            $(item).removeClass('active');
                        }, 10);
                    });
                }
            });
        }
    }
    /*burger end*/

    /*header scroll*/
    $(document).on( 'scroll', function(){
        if($(window).scrollTop()>0) {
            $('body').addClass('scroll');
        } else {
            $('body').removeClass('scroll');
        }
    });
    /*header scroll*/

    /*header__nav drop start*/
    $(".header__menu-list-sub").closest('.header__menu-item').addClass('drop');
    function menuHeight(e) {
        setTimeout(function () {
            var arr = [];
            $(".header__menu-item-main").each(function (index, item) {
                $(item).find(".header__menu-list-sub").each(function (index2, item2) {
                    arr.push(item2.offsetHeight);
                    if(Math.max.apply(null, arr)<$(item).find(".header__menu-list-popular")[0].offsetHeight) {
                        $(item2).css('height', $(item).find(".header__menu-list-popular")[0].offsetHeight);
                    } else {
                        $(item2).css('height', Math.max.apply(null, arr));
                    }
                });
            });
        }, 10);
    }
    if ($(window).width() > 993) {
        menuHeight();
    }

    window.addEventListener('resize', function(event){
        if ($(window).width() > 993) {
            menuHeight();
            $('.header').removeClass('mobile');
        }
    });

    if ($(window).width() <= 993) {
        $('.header').addClass('mobile');
        $('.header__menu-item').on('click', function (e) {
            e.stopPropagation();
            $(this).find(">.header__menu-list-sub").addClass('active');
            $(this).find(">.header__menu-list-wrapper").addClass('active');
            $(this).find(">.header__menu-list-wrapper>.container>.header__menu-list-holder>.header__menu-list-sub").addClass('active');
        });
        $('.header__menu-list-sub .back').on('click', function (e) {
            e.stopPropagation();
            if($(this).parent().parent().parent().parent().parent().hasClass('header__menu-list-wrapper')) {
                $(this).closest(".header__menu-list-wrapper").removeClass('active');
                $(this).closest(".header__menu-list-sub").removeClass('active');
            } else {
                $(this).closest(".header__menu-list-sub").removeClass('active');
            }
        });
        $('.header__menu-item.drop>a').on('click', function (e) {
            e.preventDefault();
        });
    }
    /*header__nav drop end*/

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

    //body onclick start
    $('body').on('click', function () {
        if ($(window).width() > 993) {
            $('.dropdown__dropdown').slideUp();
        };
        $('.header__phone-dropdown').slideUp();
        $('.js__dropdown').removeClass("active");
        $('.js__phone-dropdown').removeClass("active");
        $('.search__suggestions-container-open').addClass("search__suggestions-container").removeClass("search__suggestions-container-open");
        $('.search__input').val('');
    });
    //body onclick end

    //search close-open
    $('.header__search .close').on('click', function () {
        $('div[data-target="popup-search"]').fadeOut(300);
    });
    $('.search').on('click', function (e) {
       e.stopPropagation();
    });
    $('.search').on('blur', function () {
        $(this).find('.search__input').val('');
        $(this).find('.search__suggestions-container').removeClass("search__suggestions-container-open");
    });

    $('.search__input').on('keyup', function () {
        //console.log($(this).closest('.search').find('.search__suggestions-container'));
        $(this).closest('.search').find('.search__suggestions-container').addClass("search__suggestions-container-open");
    });
    $('.search__input').on('blur', function () {
        $(this).closest('.search').find('.search__suggestions-container').removeClass("search__suggestions-container-open");
    });
    //search close-open

    /*range start*/
    jQuery(".catalog__filter_item_range").slider({
        min: jQuery('[data-slider-min]').data('slider-min'),
        max: jQuery('[data-slider-max]').data('slider-max'),
        step: 0.1,
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

    });
    /*range end*/

    /*filter close-open start*/
    if ($(window).width() <= 1030) {
        $(".catalog__filter").removeClass("open");
        $(".catalog__filter > .catalog__filter_item").removeClass("open");
        $(".catalog__filter .catalog__filter_item > .catalog__filter_item_content").addClass("close");
    }
    if ($(".catalog__filter_item").length) {
        if ($(window).width() <= 1030) {
            $(".catalog__filter_item_title").on('click', function (e) {
                $(this).closest(".catalog__filter_item").toggleClass("open");
                $(this).siblings(".catalog__filter_item_content").toggleClass("close");
                e.stopPropagation();
            });
            $(".catalog__filter .main_title").on('click', function (e) {
                if ($(window).width() <= 1030) {
                    $(".catalog__filter").toggleClass("open");
                    e.stopPropagation();
                }
            });
        } else {
            $(".catalog__filter_item_title:not(.main_title)").on('click', function (e) {
                //console.log(e.target);
                $(this).closest(".catalog__filter_item").toggleClass("open");
                $(this).siblings(".catalog__filter_item_content").toggleClass("close");
                e.stopPropagation();
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

    //filer reset
    $(".catalog__filter .reset").on('click', function(e){
        e.stopPropagation();
    });
    //filer reset

    //checkbox checked
    if ($(".checkbox-wrapper").length) {
        $(".checkbox-wrapper input[type=checkbox]").on('click', function(){
            $(this).toggleClass("active");
        });
    }
    $(".catalog__filter_item_content .catalog__filter_item_checkbox input[type=checkbox]").on('click', function(){
        $(this).toggleClass("active");
    });
    //checkbox checked

    // card__info range
    if ($(".catalog__filter_item_content").length) {
        var rangeFirst = $(".catalog__filter_item_range span:first-of-type").css("left");
        var rangeLast = $(".catalog__filter_item_range span:last-of-type").css("left");
    }
    // card__info range

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
            window.open($(this).attr("href"));
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

    /*slick end*/

    if ($("#sort-city").length) {
        // $(document).ajaxComplete(function() {
        //     var sortCity = $("#sort-city").select2({
        //       placeholder: ""
        //     });
        // });
        var sortCity = $("#sort-city").select2({
            placeholder: ""
        });
        $(".js-programmatic-sort-city").on("click", function () {
            var id = $(this).data("id");
            console.log(id, sortCity.val(id));
            sortCity.val(id).trigger("change");
        });
    }

    if ($("#sort-np").length) {
        // $(document).ajaxComplete(function() {
        //     $("#sort-np").select2({
        //     });
        // });
        $("#sort-np").select2({
        });
    }

    if ($("#sort-js").length) {
        // $(document).ajaxComplete(function() {
        //     $("#sort-np").select2({
        //     });
        // });
        $("#sort-js").select2({
        });
    }

    //select2 end


    /*Popup start*/
    $('*[data-target="phone"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('.popup[data-target="popup-phone"]').fadeIn(300);
    });
    $('div[data-target="search"]').on("click", function (e) {
        e.preventDefault();
        $('.popup').fadeOut(100);
        $('div[data-target="popup-search"]').fadeIn(300);
    });
    $('.btn[data-target="cart"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('div[data-target="popup-cart"]').fadeIn(300);
    });
    $('.btn[data-target="missing"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('div[data-target="popup-missing"]').fadeIn(300);
    });
    $('*[data-target="cart-in"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('div[data-target="popup-cart-in"]').fadeIn(300);
        $("html").addClass("mobile-menu");
        $("body").addClass("overflow");
    });
    $('*[data-target="log"]').on("click", function (e) {
        e.preventDefault();
        $('.popup-overlay').fadeIn(300);
        $('.popup').fadeOut(100);
        $('div[data-target="popup-log"]').fadeIn(300);
    });

    $('.popup:not(.popup__cart-in)').click(function(e) {
        e.stopPropagation();
    });
    function closePopup(thisIt) {
        var popup = thisIt.closest('.popup');
        popup.fadeOut(300);
        setTimeout(function () {
            $('.popup-overlay').fadeOut(300);
        }, 500);
        $("html").removeClass("mobile-menu");
        $("body").removeClass("overflow");
    }
    $('.popup-overlay').click(function() {
        closePopup($(this));
    });
    $('.popup-header__link a').click(function() {
        closePopup($(this));
    });
    $('.popup .close-btn').click(function() {
        closePopup($(this));
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
        $('input[type="tel"]').mask('+38(0nn)-nnn-nnnn', {
            placeholder: "+38(0 _ _ ) _ _ _ _ _ _ _"
        });
    }
    //phone mask

    //main-instagram__img height
    if($('.main-instagram__img li').length) {
        function heightInstagram() {
            $('.main-instagram__img li').each(function (index, item) {
                var width = $(item).outerWidth();
                $(item).css("height", width+'px');
            });
        };
        heightInstagram();
        window.addEventListener('resize', function(event){
            heightInstagram();
        });
    }
    //main-instagram__img height

    console.log(Math.round($('#grid img').length/3));

    // order discount
    $('.order__sidebar-info-discount .title').click(function(e) {
        $(this).closest('.order__sidebar-info-discount').toggleClass('active');
    });
    // order discount

    // order radio-container
    $('.order_content__wrapper .radio-container').click(function(e) {
        var input = $(this).find('input');
        $(input).closest('.form-group-radio').find('.radio-container').removeClass('active');
        if(input.prop("checked")) {
            input.closest('.radio-container').addClass('active');
        } else {
            input.closest('.radio-container').removeClass('active');
        }
    });

    $('.order_content__comment .comment').click(function(e) {
        $(this).closest('.order_content__comment').toggleClass('active');
    });
    // order radio-container

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
    }
    /* map end*/

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

    if ($(".product-item__title").length) {
        //cutString($(".product-item__title"), 40);
    }
    /*Cut string end*/

    // product-item one click
        $('.product-item div[data-target="one-click"]').click(function(e) {
            e.preventDefault();
            $('.popup').fadeOut(100);
            $('.popup-overlay').fadeIn(300);
            $('div[data-target="popup-one-click"]').fadeIn(300);
        });
    // product-item one click

    //product-item hover
    $('.product-item').mouseenter(function(e) {
        $(this).addClass('active');
    });
    $('.product-item').mouseleave(function(e) {
        $(this).removeClass('active');
    });
    //product-item hover

    //product-item
    if($('.product-item').length) {
        setTimeout(function () {
            $('.product-item').each(function (index, item) {
                var height = $(item).find('.product-item__drop').outerHeight()+$(item).outerHeight();
                $(item).find('.product-item__colors').css("height", height+'px');
                $(item).find('.product-item__right').css("height", height+'px');
            });
        }, 200);
    }
    //product-item

    // swiper
    /*slider main page*/
    var swiper = new Swiper('.js-main-banner.swiper-container', {
        slidesPerView: 1,
        pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
        },
        navigation: {
            nextEl: '.js-main-banner .swiper-button-next',
            prevEl: '.js-main-banner .swiper-button-prev',
        }
    });
    /*slider main page*/

    /*slider main page*/
    var swiper = new Swiper('.js-main-sale.swiper-container', {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        pagination: {
            type: 'progressbar',
            el: '.swiper-pagination',
        },
        navigation: {
            nextEl: '.main-sale .swiper-button-next',
            prevEl: '.main-sale .swiper-button-prev',
        },
        breakpoints: {
            576: {
                slidesPerView: 2,
                spaceBetween: 0
            },
            769: {
                slidesPerView: 3,
                spaceBetween: 0
            },
            1200: {
                slidesPerView: 4,
                spaceBetween: 0,
            }
        }
    });
    /*slider main page*/

    //img[data-src] lazy load
    $(window).load(function () {
        [].forEach.call(document.querySelectorAll('img[data-src]'), function(img) {
            img.setAttribute('src', img.getAttribute('data-src'));
            img.onload = function() {
                img.removeAttribute('data-src');
            };
        });
    });
    //img[data-src] lazy load

    //burger
    $( ".js-hamburger" ).click(function() {
        $( ".js-hamburger" ).toggleClass('is-active');
    });
    //burger

    //header__offer
    $( ".header__offer .close" ).click(function() {
        $(this).closest('.header__offer').fadeOut();
    });
    //header__offer

    //main-products hover links
    if($( ".main-products" ).length) {
        $($( ".main-products__img img")[0]).addClass('active');
        $($( ".main-products__list a")[0]).addClass('active');
        $( ".main-products__list a").each(function (index, item) {
            $(item).mouseenter(function(e) {
                $( ".main-products__img img").each(function (indexImg, itemImg) {
                    $(itemImg).removeClass('active');
                    $($( ".main-products__list a")[indexImg]).removeClass('active');
                });
                $(this).addClass('active');
                $($( ".main-products__img img")[index]).addClass('active');
            });
            $(item).mouseleave(function(e) {
                $($( ".main-products__list a")[index]).removeClass('active');
                $($( ".main-products__list a")[0]).addClass('active');
                $($( ".main-products__img img")[index]).removeClass('active');
                $($( ".main-products__img img")[0]).addClass('active');
            });
        });
    }
    //main-products hover links


    //footer__list mobile
    $( ".footer__list .title" ).click(function() {
        $(this).closest('.footer__list').toggleClass('active');
    });

    //footer__list height
    if($('.footer')) {
        footerHeight();
        window.addEventListener('resize', function(event){
            footerHeight();
        });
        function footerHeight() {
            setTimeout(function () {
                if($(window).width() > 768) {
                    var height = $('.footer-bottom').outerHeight();
                    $(".footer-push").css('height', height + 'px');
                } else {
                    $(".footer-push").css('height', 'auto');
                }
            }, 500);
        }
    }


    /*---------------- Инициализация фильтра -----------------*/
    $(document).on("click", "[data-filter]", function () {
        generateFilterUrl($(this).attr("data-filter"), $(this).attr("type"));
        return false;
    });
    $(document).on("click", "[data-price]", function () {
        var priceMin = parseFloat($("[name*='min']").val());
        var priceMax = parseFloat($("[name*='max']").val());
        generateFilterUrl('price='+priceMin+'-'+priceMax);
        return false;
    });
    /*---------------- Инициализация фильтра -----------------*/

    /*---------------- Генератор URL фильтра -----------------*/
    function generateFilterUrl(filter, type) {
        if (type === undefined) {
            type = 'checkbox';
        }
        var newFilters = [];
        var searchFilter = true;
        // Текущий урл
        var _url   = window.location.pathname;
        var _get   = window.location.search;
        var regex  = /\/f\/(.*)/i;
        // Текущие фильтры
        _filterUrl = _url.match(regex);
        if (_filterUrl) {
            // Переданный фильтр
            var filter = filter.split("=");
            _filterArr = _filterUrl[0].split('/');
            // Список текущих фильтров
            _filters   = _filterArr[2].split(';');
            for (var i = 0; i < _filters.length; i++) {
                // Если текущий фильтр совпал с переданным, добавляем или заменяем значение
                var _filter = _filters[i].split("=");
                if (filter[0] == _filter[0]) {
                    searchFilter = false;
                    _values = _filter[1].split(',');
                    // Проверить существует ли значение в массиве
                    _index = _values.indexOf(filter[1]);
                    if (_index != -1) {
                        _values.splice(_index, 1);
                    } else {
                        _values.push(filter[1]);
                    }
                    // Если тип радио, всё равно удаляем значение
                    if (type == 'radio') {
                        _values = [];
                        _values.push(filter[1]);
                    }
                    // Если цена, всё равно удаляем значение
                    if (filter[0] == 'price') {
                        _values = [];
                        _values.push(filter[1]);
                    }
                    // Если в массиве что то осталось
                    if (_values.length > 0) {
                        _values.sort();
                        _filter[1]  = $.unique(_values).join(',');
                        _filters[i] = _filter.join('=');
                        newFilters.push(_filters[i]);
                    }
                } else {
                    newFilters.push(_filters[i]);
                }
            }
            // Если текущий фильтр не совпал ни с одним из существующих
            if (searchFilter) {
                newFilters.push(filter.join('='));
            }
            // Если есть хоть какие то фильтры
            if (newFilters.length > 0) {
                newFilters.sort();
                var _newUrl = _url.slice(0, -_filterUrl[0].length)+'/f/'+newFilters.join(';')+'/';
            } else {
                var _newUrl = _url.slice(0, -_filterUrl[0].length)+'/';
            }
        } else {
            var _newUrl = _url+'f/'+filter+'/';
        }
        if($(window).width() > 1030) {
            if (_get.length > 0) {
                window.location.href = _newUrl+_get;
            } else {
                window.location.href = _newUrl;
            }
        } else {
            if (_get.length > 0) {
                history.pushState(null, null, _newUrl+_get);
            } else {
                history.pushState(null, null, _newUrl);
            }
            return false;
        }

    }
    /*---------------- Генератор URL фильтра -----------------*/


    /*----------------- Форматирование цены ------------------*///
    function priceFormat(n) {

        /* Фикс округления в JS */
        n = n * 100;
        n = n.toFixed(2);
        n = Math.round(n);
        n = n / 100;
        /* Фикс округления в JS */
        //console.log(n);
        return n.toFixed(0).replace(/./g, function (c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? "&nbsp;" + c : c;
        });
    }
    /*----------------- Форматирование цены ------------------*///


    /*----------------- Поиск вывод результатов дропдаун ------------------*///
    $('input[name="q"]').on('propertychange input', function(e) {
        var valueChanged = false;

        if (e.type=='propertychange') {
            valueChanged = e.originalEvent.propertyName=='value';
        } else {
            valueChanged = true;
        }
        if (valueChanged) {
            /* Code goes here */
            var query = $(this).val();
            $.ajax({
                url: '/partial_search?q='+query,
                success: function(data){
                    if(data) {
                        $('.search__suggestions-container').addClass('search__suggestions-container-open');
                        $('.search__suggestions-container').html(data);
                    } else {
                        $('.search__suggestions-container').removeClass('search__suggestions-container-open');
                    }

                }
            })
        }
    });
    /*----------------- Поиск вывод результатов дропдаун ------------------*///

    //wishlist active
    $(".main .icon-wishlist-empty").click(function(e) {
        e.preventDefault();
        if($(this).hasClass('active')) {
            $(this).removeClass('active');
            $('.popup').fadeOut(100);
            $('.popup-overlay').fadeIn(300);
            $('div[data-target="popup-favorite-del"]').fadeIn(300);
        } else {
            $(this).addClass('active');
            $('.popup').fadeOut(100);
            $('.popup-overlay').fadeIn(300);
            $('div[data-target="popup-favorite"]').fadeIn(300);
        }
    });
    //wishlist active

    //preloader
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