/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
/*
 * 
 * Created 10/31/2014 20:34
 * Author: Yaliang
 */

function onDeviceReady() {
    if (device.platform === 'iOS' && parseFloat(device.version) >= 7.0) {
        document.body.style.marginTop = "20px";
    }
}

document.addEventListener('deviceready', onDeviceReady, false);

$(document).ready(function(){
    if (localStorage["phone"] == undefined) {
        localStorage.removeItem("phone");
        localStorage.removeItem("verifycode");
        var t=setTimeout(function(){
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#login-page" );
        },10);
    } else {
        if (localStorage["verifycode"] == undefined) {
            localStorage.removeItem("verifycode");
            $('#phone').val(parseInt(localStorage["phone"]));
            var t=setTimeout(function(){
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#login-page" );
            },10);
        } else {
            num=localStorage["phone"];
            code=localStorage["verifycode"];
            $.post("https://shhnote-dev.herokuapp.com/db/check-verifyCode",{number: num, verifycode: code}, function(data) {
                console.log(data);
                if (data.toString().substr(0, 4).localeCompare('true')) {
                    localStorage.removeItem("verifycode");
                    $('#phone').val(parseInt(localStorage["phone"]));
                    var t=setTimeout(function(){
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#login-page" );
                    },10);
                } else {
                    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
                    localStorage["phone"]=num;
                    localStorage["verifycode"]=code;
                }
            });
        }
    }
    $.support.cors=true;
    $('form').submit(function(event){
        var num = $('#number').val();
        var text = $('#message').val();
        $.post("https://shhnote.herokuapp.com/send-message",{message: text, number: num}, function(data) {
            $('button').text("Done");
        });
        event.preventDefault();
    });
    $('#phone').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $phone = $(this);
        console.log($phone);
        // Auto-format- do not expose the mask as the user begins to type
        if (key !== 8 && key !== 9) {
            if ($phone.val().length === 4) {
                $phone.val($phone.val() + ')');
            }
            if ($phone.val().length === 5) {
                $phone.val($phone.val() + ' ');
            }           
            if ($phone.val().length === 9) {
                $phone.val($phone.val() + '-');
            }
        }

        // Allow numeric (and tab, backspace, delete) keys only
        return (key == 8 || key == 9 || key == 46 || (key >= 48 && key <= 57) || (key >= 96 && key <= 105));    
    });
    $('#phone').bind('focus click', function () {
            $phone = $(this);
            if ($phone.val().length === 0) {
                $phone.val('(');
            }   else {
                var val = $phone.val();
                $phone.val('').val(val); // Ensure cursor remains at the end
            }
    });

    $('#phone').blur(function () {
        $phone = $(this);

        if ($phone.val() === '(') {
            $phone.val('');
        }
    });
    var t=setTimeout(function(){
        $('.responsive').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }]
        });
    },10);
});

function create_new_user(num) {
    if (num.length<14) {
        $('#phone-number-incorrect').popup("open");
        return;
    };
    $.post("https://shhnote-dev.herokuapp.com/db/new-user",{number: num}, function(data) {
        console.log ( data );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#sign-up-page" );
    });
}

function check_user(num) {
    $.post("https://shhnote-dev.herokuapp.com/db/check-user-exist",{number: num}, function(data) {
        console.log ( data );
    });
}

function send_verifyCode(num) {
    $.post("https://shhnote-dev.herokuapp.com/db/send-verifyCode",{number: num}, function(data) {
        console.log ( data );
        if (data.toString().substr(0, 10).localeCompare('verifycode')) {
            create_new_user(num);
        } else {
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#verify-page" );
        }
    });
}

function check_verifyCode(num,code) {
    $.post("https://shhnote-dev.herokuapp.com/db/check-verifyCode",{number: num, verifycode: code}, function(data) {
        console.log(data);
        if (data.toString().substr(0, 4).localeCompare('true')) {
            $('#verifyCode').val("");
            $('#popup-verify-code-incorrect').popup("open");
        } else {
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
            localStorage["phone"]=num;
            localStorage["verifycode"]=code;
        }
    });
}

function save_username(num,name) {
    $.post("https://shhnote-dev.herokuapp.com/db/save-user-name",{number: num, name: name}, function(data) {
        console.log ( data );
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#verify-page" );
    });
}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         