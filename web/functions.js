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
var load_contact= new Array();
var fake_contact_numner=0;

$(document).ready(function(){
    
    if (localStorage["phone"] == undefined) {
        localStorage.removeItem("phone");
        localStorage.removeItem("verifycode");
        var t=setTimeout(function(){
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#intro-page" );
        },10);
    } else {
        if (localStorage["verifycode"] == undefined) {
            localStorage.removeItem("verifycode");
            $('#phone').val(localStorage["phone"]);
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
                    $('#phone').val(localStorage["phone"]);
                    var t=setTimeout(function(){
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#login-page" );
                    },10);
                } else {
                    if (localStorage['block']){
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#you-are-blocked" );
                        checkFlag();
                    }
                    else {
                        
                        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
                        localStorage["phone"]=num;
                        localStorage["verifycode"]=code;
                        pullContact();
                        pullMessages();
                        checkFlag();
                        refreshAuto();
                    }
                }
            });
        }
    }
    $.support.cors=true;
    $('form').submit(function(event){
        var num = $('#number').val();
        var text = $('#message').val();
        //$.post("https://shhnote.herokuapp.com/send-message",{message: text, number: num}, function(data) {
        //    $('button').text("Done");
        //});
        $.post("https://shhnote-dev.herokuapp.com/db/save-message",{number: localStorage["phone"], receiver: num, message: text }, function(data) {
            $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
        });
        event.preventDefault();
    });
    phone_number_regex();
    
});

function phone_number_regex(){
    $('#phone, #newContactPhone').keydown(function (e) {
        var key = e.charCode || e.keyCode || 0;
        $phone = $(this);
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
    $('#phone, #newContactPhone').bind('focus click', function () {
            $phone = $(this);
            if ($phone.val().length === 0) {
                $phone.val('(');
            }   else {
                var val = $phone.val();
                $phone.val('').val(val); // Ensure cursor remains at the end
            }
    });

    $('#phone, #newContactPhone').blur(function () {
        $phone = $(this);

        if ($phone.val() === '(') {
            $phone.val('');
        }
    });
}

function refreshAuto(){
    var t=setTimeout(function(){
        pullMessages();
        checkFlag();
        refreshAuto();
    },1000);
}

function ini_contact(){
        $('.responsive').slick({
            dots: true,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 4,
            responsive: [{
                breakpoint: 1024,
                settings: {
                    slidesToShow: 7,
                    slidesToScroll: 7,
                    infinite: true,
                    dots: true
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 6,
                    slidesToScroll: 6
                }
            }, {
                breakpoint: 480,
                settings: {
                    slidesToShow: 5,
                    slidesToScroll: 5
                }
            }]
        });
};

function get_fake_contact(){
    $.post("https://shhnote-dev.herokuapp.com/fake_contact_number", function(data){

        fake_contact_number = parseInt(data);
        for (i=0; i<fake_contact_number; i++) {
            load_contact[i]=false;
            $.post("https://shhnote-dev.herokuapp.com/fake_contact",{contact_id:i},function(data){
                var fake_contact = JSON.parse(data);
                $('.responsive').append("<div id='contact_"+fake_contact.id+"'style='display:none; height: 130px; line-height:130px; text-align:center; background-color:"+'#'+Math.floor(Math.random()*16777215).toString(16)+"' onclick='fill_fake_contact(\""+fake_contact.phone+"\")'>"+fake_contact.abbr+"</div>");
                load_contact[fake_contact.id]=true;
            })
        };
        check_fake_contact_loaded();
    });
}

function check_fake_contact_loaded(){
    var t=setTimeout(function() {
        var loaded = true;
        for (i=0; i<fake_contact_number; i++) {
            if (load_contact[i]==false) {
                loaded = false;
                break;
            }
        }
        if (loaded==true) {
            ini_contact();
            for (i=0; i<fake_contact_number; i++) {
                $("#contact_"+i).show();
            };
        } else {
            check_fake_contact_loaded();
        }
    },100);
}

function fill_fake_contact(num){
    $('#number').val(num);
}

function fill_contact(num,name){
    $('#contactname').val(name);
    $('#number').val(num);
}

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
            if (localStorage['block']==true)
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#you-are-blocked" );
            else{
                $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
            }
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

function save_to_database(num, receiver, message) {
    $.post("https://shhnote-dev.herokuapp.com/db/save-message",{number: num, receiver: receiver, message: message }, function(data) {
        console.log ( data );
    });
}
var message;    
var currentMessageNumber;
function pullMessages(){        
    $.post("https://shhnote-dev.herokuapp.com/db/get-unread-message",{number: localStorage["phone"]}, function(data) {
        message = JSON.parse(data);
        if (message.length!=0) {
            var text=document.getElementById('tmess');
            currentMessageNumber=0;
            text.innerHTML=message[0].mtext;
            $("#inbox-panel-flag").click(function(){
                blockContact(message[0].mid);
                nextMessage(message[0].mid);
            });
            $("#inbox-panel-dismiss").click(function(){
                nextMessage(message[0].mid);
            });
        }
    });
}           

function pullContact(){
    $.post("https://shhnote-dev.herokuapp.com/db/get-contact",{number: localStorage["phone"]}, function(data) {
        var contact = JSON.parse(data);
        //console.log(data);
        //console.log(contact);
        for (var i=0; i<contact.length; i++){
            //"<div id='contact_"+fake_contact.id+"'style='display:none; height: 130px; line-height:130px; text-align:center; background-color:"+'#'+Math.floor(Math.random()*16777215).toString(16)+"' onclick='fill_fake_contact(\""+fake_contact.phone+"\")'>"+fake_contact.abbr+"</div>"
            $('#user-contact-list').append("<li class='ui-screen-hidden'><a href='#send-page' onclick='fill_contact(\""+contact[i].contactphone+"\",\""+contact[i].contactname+"\")'>"+contact[i].contactname+"</a></li>");
        }
    })
}

function createContact(contactName, contactPhone){
    $.post("https://shhnote-dev.herokuapp.com/db/create-new-contact",{number: localStorage["phone"], contactName: contactName, contactPhone: contactPhone}, function(data) {
        console.log ( data );
        $('#user-contact-list').append("<li class='ui-screen-hidden'><a href='#send-page' onclick='fill_contact(\""+contactPhone+"\",\""+contactName+"\")'>"+contactName+"</a></li>");
        console.log('oncreatecontact');
        $( ":mobile-pagecontainer" ).pagecontainer( "change", "#chat-page" );
    })
}

function blockContact(MID){
    $.post("http://shhnote-dev.herokuapp.com/db/blockContact",{MID: MID}, function(data){
        $('#inbox-panel-flag').addClass("redButton");
    })
}

function checkFlag() {
    $.post("http://shhnote-dev.herokuapp.com/db/checkFlag",{number: localStorage["phone"]}, function(data){
        console.log(data);
        if (!(data.toString().localeCompare('666'))) {
            localStorage['block']=true;
            $(":mobile-pagecontainer").pagecontainer("change", "#you-are-blocked");
        } else {
            localStorage['block']=false;
        }
    })
}

function nextMessage(MID){
    $.post("http://shhnote-dev.herokuapp.com/db/nextMessage",{MID: MID}, function(data){
        if (!(data.toString().localeCompare('0'))) {
            currentMessageNumber = currentMessageNumber+1;
            if (currentMessageNumber<message.length) {
                var text=document.getElementById('tmess');
                text.innerHTML=message[currentMessageNumber].mtext;
                $( "#inbox-panel-dismiss").unbind( "click" );
                $( "#inbox-panel-flag").unbind( "click" );
                $("#inbox-panel-flag").click(function(){
                    blockContact(message[currentMessageNumber].mid);
                    nextMessage(message[currentMessageNumber].mid);
                });
                $("#inbox-panel-dismiss").click(function(){
                    nextMessage(message[currentMessageNumber].mid);
                });
                $("#inbox-panel-flag").removeClass("redButton");
            } else {
                var text=document.getElementById('tmess');
                text.innerHTML="You have no new messages.";
                $( "#inbox-panel-dismiss").unbind( "click" );
                $( "#inbox-panel-flag").unbind( "click" );
                $("#inbox-panel-flag").removeClass("redButton");
            }
        }
    })
}
//ownernumber
//checkFlag