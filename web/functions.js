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

$(document).ready(function(){
    $.support.cors=true;
    $('form').submit(function(event){
        var text = $('input').val();
        $.post("http://shhnote.net78.net/send-message.php",{message: text}, function(data) {
            $('h1').text(data);
        });
        event.preventDefault();
    });
});



