$(function () {
    $("#logpanel").on('submit', function () {
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function (data) {
                if (data == "/") {
                    window.location = "/";
                } else {
                    alert(data);
                }
            }
        );
        return false;
    });
});