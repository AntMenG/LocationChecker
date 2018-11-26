$( function () {
    // close the session
    $("#cs").on('click', function () {
        $.post('/cs', {
            status : 'exit'
        }, function (data) {
            window.location = '/';
        });
    });
    // open the actions panel
    $("#menu > button").on('click', function () {
        var panel = $(this).attr('data-action');
        $("#menu > button").removeClass("active");
        $(this).addClass('active');
        $("#space").addClass('blur');
        $('#actions').css('display','block');
        $('#actions > section').css('display','none');
        $('#actions #' + panel).css('display','block');
    });
    // close the actions panel
    $('.closeP').on('click', function () {
        closeP();
    });
    function closeP () {
        $("#space").removeClass('blur');
        $('#actions').css('display','none');
        $("#menu > button").removeClass("active");
    }

    // Registrar Usuario
    $("#regUsuario").on("submit", function () {
        $.post($(this).attr('action'), $(this).serialize(), function (data) {
            alert(data);
        });
        return false;
    });

});