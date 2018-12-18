$(function () {
    $("#logpanel").on('submit', function () {
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function (data) {
                if (data[0] == "/") {
                    window.location = data;
                } else {
                    $('#log_notify').text(data);
                    $('#log_notify').css('display','inherit');
                    var myVar;
                    myVar = setTimeout(function(){ 
                        $('#log_notify').css('display','none');
                        clearTimeout(myVar);
                    }, 3000);
                }
            }
        );
        return false;
    });
});