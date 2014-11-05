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
/*
$(document).ready(function(){
    $.support.cors=true;
    $('form').submit(function(event){
        var num = $('#number').val();
        var text = $('#message').val();
<<<<<<< HEAD
        $.post("./send.py",{message: text, number: num}, function(data) {
            $('button').text('Done');
=======
        $.post("https://stark-ravine-3392.herokuapp.com/send-message",{message: text, number: num}, function(data) {
            $('button').text(data);
>>>>>>> FETCH_HEAD
        });
        event.preventDefault();
    });
});



 */
