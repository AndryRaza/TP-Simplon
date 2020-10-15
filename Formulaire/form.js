window.onload = function () {
    $('#register').click(validation_bordure);
}

function validation_bordure(){
    $('input').not($('input[type="radio"]')).each(function(){
        if ($(this).val() == '') {
           $(this).css('box-shadow','0 0 1px 2px red');
        } 
        else {
            $(this).css('box-shadow','0 0 1px 2px green');
        }
    })
    
    $('select').each(function(){
        if ($(this).val() == '' || $(this).val() == 'Choose option') {
           $(this).css('box-shadow','0 0 1px 2px red');
        } 
        else {
            $(this).css('box-shadow','0 0 1px 2px green');
        }
    })
}
