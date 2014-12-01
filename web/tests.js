/*QUnit.test( "hello test", function( assert ) {
  assert.ok( 1 == "1", "Passed!" );
});*/
function isEven(val){
    return val %2 == 0;
}

function checkUserCreated(num){
    var iswrong;
    var $wrongPhoneNum = $("#phone-number-incorrect");
    $wrongPhoneNum.on("popup",function (){
        iswrong = 0; 
    })
    create_new_user(num);
    return iswrong; 
    
}

test('isEven()',function(){
    ok(isEven(0), 'Zero is an even number');
    ok(isEven(2), 'So is two');
    ok(isEven(-4), 'So is negative four');
    ok(!isEven(1), 'One is not an even number');
    ok(!isEven(-7), 'Neither is negative seven');
    ok(!isEven(6), '6 should be even');
})

test('create_new_user', function(){
    ok(!checkUserCreated(0), 'The user was not created');
})     