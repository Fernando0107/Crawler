var datatemp = null;
$(document).ready(function () {
    bloquear();
    cargarCategoria(2);
    $("#frmPregunta").validarForm();
    $(".tipopregunta").css({
        display: "none"
    });

    $('#cbxTipoPregunta').on('change', function () {
        onChangeTipoPregunta($(this).val());
    });

    $("#uploadImg").on("change", function (e) {
        cargaImagen(e);
    });


    $("#frmPregunta").submit(function (e) {
        validarFormulario();
        e.preventDefault();
    });

    $('input[name=dificultad]').on("change", function (e) {
        if (this.checked) {
            $("#divContDificultad").removeClass("has-error");
            $("#smDificultad").css({
                display: "none"
            });
        }
    });

    desbloquear();
});

function cargarCategoria(opcion, seleccionados) {
    var url = "../controller/base.php";
    $.post(url, {
        opcion: "categoria",
        metodo: "listado",
    }, function (data) {
        if (data != null) {
            if (opcion == 1) {
                cargaComboCategoria($("#cbxFiltroCategoria"), data, seleccionados);
            } else {
                cargaComboCategoria($("#cbxCategoria"), data, seleccionados);
            }

        }
    });
}

function onChangeTipoPregunta(tipo) {
    $(".tipopregunta").css({
        display: "none"
    });
    $("#divMultiple").find('input:text').val('');
    $("#divUnicaOpcion").find('input:text').val('');

    $('input[name=opcMultiple]:checked').prop('checked', false);
    $('input[name=respuestaUnica]:checked').prop('checked', false);

    if (tipo == 1) {
        $("#divVF").css({
            display: ""
        });
    } else if (tipo == 2) {
        $('#divMultiple').css({
            display: ""
        });
    } else if (tipo == 3) {
        $('#divUnicaOpcion').css({
            display: ""
        });
    }
}

function cargaImagen(input) {
    var target = input.target;
    if (target.files && target.files[0]) {
        var reader = new FileReader();
        reader.readAsDataURL(target.files[0]);
        if (target.files && target.files[0]) {
            reader.onload = function (e) {
                setTimeout(function () {
                    $("#imgCategoria").attr('src', e.target.result);
                }, 300);

            };
        }
    }
}

function cargaComboCategoria(parent, data, seleccionado) {
    var lstCat = $.parseJSON(data);
    parent.empty();
    parent.append('<option selected="selected" value=" ">Seleccion un valor</option>');
    $.each(lstCat, function (key, item) {
        if (seleccionado == item.TRVCATEGORIAID) {
            parent.append('<option selected="selected" value="' + item.TRVCATEGORIAID + '">' + item.NOMBRE + '</option>');
        } else {
            parent.append('<option value="' + item.TRVCATEGORIAID + '">' + item.NOMBRE + '</option>');
        }

    });

}

function validarFormulario() {
    var valido = false;
    $("#divContDificultad").removeClass("has-error");
    $("#smDificultad").css({
        display: "none"
    });

    var dificultadSeleccionada = $('input[name=dificultad]:checked').val();
    $('#frmPregunta').data('bootstrapValidator').validate();
    valido = $('#frmPregunta').data('bootstrapValidator').isValid();

    if (valido == true && dificultadSeleccionada !== undefined) {
        var respuestas = validarRespuestas();
        if (respuestas) {
            if ($("#mdlTitulo").html() == 'Editar') {
                editarPregunta();
            } else {
                agregarPregunta();
            }
        }


    } else {
        if (dificultadSeleccionada == undefined) {
            $("#divContDificultad").addClass("has-error");
            $("#smDificultad").css({
                display: ""
            });
        }
        $('#frmPregunta').data('bootstrapValidator').validate();
    }
}

/**/
function validarRespuestas() {
    var valido = false;
    var tipo = $("#cbxTipoPregunta").val();
    if (tipo == 1) {
        valido = true;
    } else if (tipo == 2) { // tipo opcion múltiple, única opción
        var sel = $('input[name=opcMultiple]:checked');
        if (sel == undefined || (sel != null && sel.length == 0)) {
            showMsn("Información", "Debe seleccionar al menos una respuesta como correcta", null, null, false);
            valido = false;
        } else {
            valido = true;
        }

    } else if (tipo == 3) {
        var sel = $('input[name=respuestaUnica]:checked');
        if (sel == undefined || (sel != null && sel.length == 0)) {
            showMsn("Información", "Debe seleccionar la respuesta correcta", null, null, false);
            valido = false;
        } else {
            valido = true;
        }
    }

    return valido;

}

function agregarPregunta() {
    bloquear();

    var nombre = $("#txtPregunta").val();
    var categoria = $("#cbxCategoria").val();
    var dificultad = $("#divDificultad").find(".btn-outline-secondary.active").find("input:radio:first").val();

    var data = new Object();
    data.pregunta = nombre;
    data.estado = "ALTA";
    data.categoria = categoria;
    data.dificultad = dificultad;
    data.pregunta = $("#txtPregunta").val();



    var respuesta = new Object();
    respuesta.respuestas = [];
    var index = 0;
    var resp = null;

    var tipo = $("#cbxTipoPregunta").val();
    /*Tipo verdadero y falso*/
    if (tipo == 1) {
        data.tipopregunta = 1;
        var correcta = 0;
        if ($("#rdoVerdadero").prop('checked') == true) {
            correcta = 1;
        }
        resp = new Object();
        resp.respuesta = "";
        resp.correcta = correcta;
        respuesta.respuestas[0] = resp;

    } else if (tipo == 2) { // tipo opcion múltiple, única opción
        data.tipopregunta = 2;
        //respuesta 1
        resp = new Object();
        resp.respuesta = $("#txtRespM1").val();
        resp.correcta = $("#chkResp1").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[0] = resp;

        //respuesta 2
        resp = new Object();
        resp.respuesta = $("#txtRespM2").val();
        resp.correcta = $("#chkResp2").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[1] = resp;

        //respuesta 3
        resp = new Object();
        resp.respuesta = $("#txtRespM3").val();
        resp.correcta = $("#chkResp3").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[2] = resp;

        //respuesta 4
        resp = new Object();
        resp.respuesta = $("#txtRespM4").val();
        resp.correcta = $("#chkResp4").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[3] = resp;

    } else if (tipo == 3) {
        data.tipopregunta = 3;
        //respuesta 1
        resp = new Object();
        resp.respuesta = $("#txtRespU1").val();
        resp.correcta = $("#rdoResp1").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[0] = resp;

        //respuesta 2
        resp = new Object();
        resp.respuesta = $("#txtRespU2").val();
        resp.correcta = $("rdoResp2").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[1] = resp;

        //respuesta 3
        resp = new Object();
        resp.respuesta = $("#txtRespU3").val();
        resp.correcta = $("#rdoResp3").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[2] = resp;

        //respuesta 4
        resp = new Object();
        resp.respuesta = $("#txtRespU4").val();
        resp.correcta = $("#rdoResp4").prop('checked') == true ? 1 : 0;
        respuesta.respuestas[3] = resp;

    }


    var jsonPregunta = JSON.stringify(data);
    var jsonRespuesta = JSON.stringify(respuesta);

    var url = "../controller/base.php";

    $.post(url, {
        opcion: "pregunta",
        metodo: "agregar",
        data: jsonPregunta,
        dataRespuesta: jsonRespuesta
    }, function (data) {
        if (data != null) {
            desbloquear();
            if (data == "OK") {
                showMsn("Información", "Pregunta agregada exitosamente", null, null, false);
            } else {
                showMsn("Información", "Ocurrió un error al agregar la información.", null, null, false);
            }
        }
    });
}