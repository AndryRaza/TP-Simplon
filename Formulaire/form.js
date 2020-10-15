window.onload = function () {
    $('#register').click(validation_bordure);
}

function validation_bordure(){
    $('input[type="text"]').each(function(){
        if ($(this).val() == '') {
           $(this).css('box-shadow','0 0 1px 2px red');
        } 
        else {
            $(this).css('box-shadow','0 0 1px 2px green');
        }
    })
}
