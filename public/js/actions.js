$( function () {
    // close all actions
    $(document).keyup(function(e) {
        if(e.which == 27){
            closeP();
        }
    });

    $("#select_photo").click( function(){
        $("#Photo_panel").css('display','block');
    });
    $('#CI').click( function(){
        $("#CCI").click();
    });
    $('.image-editor').cropit({
        imageState: {
            src: $("#photo_user").attr("src"),
        },
    });
    $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
    });
    $('.export').click(function() {
        var imageData = $('.image-editor').cropit('export', {
        type: 'image/jpeg',
        quality: .9,
        originalSize: false
        });
    });
    $("#send-photo").on('click', function(){
        var imageData = $('.image-editor').cropit('export', {
            type: 'image/jpeg',
            quality: .9,
            originalSize: false
        });
        $("#IMG").val(imageData);
        $.post( "/photo", { image: imageData})
        .done(function( data ) {
            var photo = $("#photo-space").attr("data-pic");
            $("#photo_user").attr(
                'src', 
                photo + '?' + Math.random()
            );
            closeP();
        });
    });
    $("#Photo_panel").on("click", function (e) {
        if (
            (e.clientX >= 10 && e.clientX <= 210 &&
            e.clientY >= 10 && e.clientY <= 210) || 
            e.clientX == undefined || e.clientY == undefined
        ) {

        } else {
            closeP();
        }
    });
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
        $("#Photo_panel").css('display','none');
        $("#menu > button").removeClass("active");
    }

    // Registrar Usuario
    $("#regUsuario").on("submit", function () {
        $("#regUsuario input[type='submit']").attr("disabled", true);
        var horario = [];
        function input (string) {
            var input = "#regUsuario [name='" + string + "']";
            return input;
        }
        var h = $("#regUsuario .horario");
        h.each(function( item ) {
            if ($(this).val()) {
                var datos = $(this).attr('name');
                datos = datos.split('_');
                var json = {
                    usuario_id: $(input('id')).val(),
                    hora: datos[1],
                    dia: datos[0],
                    edificio: $(this).val()
                }
                horario.push(json);
            }
        });
        var datos = {
            id: $(input('id')).val(),
            nombre: $(input('nombre')).val(),
            apellido: $(input('apellido')).val(),
            carrera: $(input('carrera')).val(),
            tipo_usuario: $(input('tipo_usuario')).val(),
            horario
        };
        $.post($(this).attr('action'), datos, function (data) {
            var response = JSON.parse(data);
            if (response.status == "done") {
                $("#list-content").append(`
                    <a href="/usuario/${datos.id}">
                        <div id="img">
                            <img src="/upload/user_pic/avatar.jpg" alt="">
                        </div>
                        <div class="text">
                            <span>${datos.nombre} ${datos.apellido}</span>
                            <span>${datos.id}</span>
                        </div>
                    </a>
                `);
                $("#regUsuario .horario").val('');
                $("#regUsuario input[type='text']").val('');
                $("#regUsuario input[type='number']").val('');
                $("#regUsuario input[type='select']").val('');
            }            
            alert(response.text);
        });
        $("#regUsuario input[type='submit']").attr("disabled", false);
        return false;
    });

});