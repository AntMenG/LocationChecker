$(function () {
    $("#logpanel").on('submit', function () {
        $.post(
            $(this).attr('action'),
            $(this).serialize(),
            function (data) {
                alert(data);
            }
        );
        return false;
    });
});