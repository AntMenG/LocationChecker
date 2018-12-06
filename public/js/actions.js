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
        if (panel != "regEP") {
            $("#space").addClass('blur');
            $("#list-content").css('display','block');
            $("#finderEmpleados").css('display','block');
            $("#actions").removeClass("actionsEdif");
        } else {
            $("#list-content").css('display','none');
            $("#finderEmpleados").css('display','none');
            $("#space").removeClass('blur');
            $("#actions").addClass("actionsEdif");
        }
        $(this).addClass('active');
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
        $("#list-content").css('display','block');
        $("#finderEmpleados").css('display','block');
    }

    // Registrar Usuario
    $("#regUsuario").on("submit", function () {
        $("#regUsuario input[type='submit']").attr("disabled", true);
        var horario = [];
        // Selecciona un elemento input o select
        function input (string) {
            var input = "#regUsuario [name='" + string + "']";
            return input;
        }
        // Selecciona todos los select corespondientes a horario
        var h = $("#regUsuario .horario");
        h.each(function( item ) {
            if ($(this).val()) {
                // Crea el JSON Array de horario
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
        // Asignamos datos de usuario a enviar
        var datos = {
            id: $(input('id')).val(),
            nombre: $(input('nombre')).val(),
            apellido: $(input('apellido')).val(),
            carrera: $(input('carrera')).val(),
            tipo_usuario: $(input('tipo_usuario')).val(),
            horario
        };
        // Enviamos todo a la ruta 
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

    // Registrar Edificio
    $("#regEdificio").on("submit", function () {
        var name = $("input[name='enombre']").val();
        var coords = $("#coordI").val();
        if (name) {
            if (!coords) {
                alert("No has seleccionado un edificio");
            } else {

            }
        }
        return false;
    });

});