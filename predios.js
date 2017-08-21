/**
 * @fileoverview predios.js  Este archivo contiene las funciones correspondientes al modulo de predios 
 * @author Ivan Tadeo Huerta <ivantec5sem@gmail.com>
 *
 */

 /**
  * @constant
  * @type {string} url
  * @default
  */
  const url= 'http://localhost:8080/' ;

  /**
  * @constant
  * @type {string} urlConexionCatalogos 
  * @default
  */
  const urlConexionCatalogos =  url+'Probosque/CargaInicial';
  const urlConexionPredios =   url+'Probosque/Predios';
  const urlConexionMultiRegistro =   url+'Probosque/MultiRegistro';
  const urlConexionService =  url+'ServiceBosque/AuditoriasPreventivas';



 /**
  * @constant
  * @type {object jquery} modal 
  * @default
  */

  const modal =  $('#modalFichaDetalle');

   /**
  * @constant
  * @type {object jquery} divContenidoCatalogos 
  * @default
  */

  const divContenidoCatalogos =  $('#divContenidoCatalogos');


/**
  * @constant
  * @type {object jquery} tituloModal 
  * @default
  */

  const tituloModal =   modal.find('#tituloModal');


/**
  * @constant
  * @type {object jquery} detalleMultiRegistro 
  * @default
  */

  const detalleMultiRegistro =   modal.find('#detalleMultiRegistro');


/**
  * @constant
  * @type {object jquery} fichaPrincipal 
  * @default
  */

  const fichaPrincipal =   modal.find('#fichaPrincipal');

/**
  * @constant
  * @type {object jquery} flechaRegreso 
  * @default
  */

  const flechaRegreso =   modal.find('#flechaRegreso');


/**
  * @constant
  * @type {object jquery} multiRegistros 
  * @default
  */

  const multiRegistros =   modal.find('#multiRegistros');

 /**
  * @constant
  * @type {object jquery} cajaDetexto 
  * @default
  */
  const cajaDetexto =  $('#buscar');

/**
  * @constant
  * @type {object jquery} combo 
  * @default
  */
  const combo =  $('#opcionBusqueda'); 


/**
  * @constant
  * @type {object jquery} mensajeError 
  * @default
  */
  const mensajeError =  $('#errormsgBusqueda');

/**
  * @constant
  * @type {Array.<PredioRepresentanteDTO>} arregloDeRepresentantes 
  */
  let arregloDeRepresentantes;  

/**
  * @constant
  * @type {Array.<PredioPoligonosDTO>} arregloDePoligonos 
  */
  let arregloDePoligonos; 


/**
  * @constant
  * @type {object jquery} panelFicha 
  * @default
  */
  let panelFicha =  $('#panelFicha');

/**
  * @constant
  * @type {object jquery} tituloAccion 
  * @default
  */
  let tituloAccion =  panelFicha.find('#tituloAccion');

/**
  * @constant
  * @type {object jquery} bodyPanelFicha 
  * @default
  */
  let bodyPanelFicha =  panelFicha.find('#bodyPanelFicha'); 


/**
  * @constant
  * @type {object jquery} btnAccion 
  * @default
  */
  let btnAccion =  $('#btnAccion'); 

  /**
  * @constant
  * @type {object jquery} rowFind 
  * @default
  */
  let rowFind =  $('#rowFind'); 

  /**
  * @constant
  * @type {object jquery} addOptionMultiRegistro 
  * @default
  */
  let addOptionMultiRegistro = $('#addOptionMultiRegistro');
  /**
  * @type {boolean} multiregistroBandera 
  * @default
  */
  var multiregistroBandera =  false;

  /**
  * @type {array} catalogosRegiones
  */
  var catalogosRegiones;

  /**
  * @type {array} catalogosMunicipio 
  */
  var catalogosMunicipio; 

  /**
  * @type {array} catalogosTipoTenencia 
  */
  var catalogosTipoTenencia;

  /**
  * @type {array} catalogosCuenca 
  */
  var catalogosCuenca;

  /**
  * @type {array} catalogosApn 
  */
  var catalogosApn;

  /**
  * @type {array} catalogosAceptableAaprovechamiento 
  */
  var catalogosAceptableAaprovechamiento;

  /**
  * @type {array} catalogosEstatus 
  */
  var catalogosEstatus;

  /**
  * @type {array} catalogosLocalidades 
  */
  var catalogosLocalidades;


/**
 * @function abrirFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @return  {object}
 */
var abrirFicha = function (data) {
    
    let region = JSON.parse(JSON.stringify(catalogosRegiones));
    let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));
    let tenencia =  JSON.parse(JSON.stringify(catalogosTipoTenencia));
    let estado =  JSON.parse(JSON.stringify(catalogosEstatus));
    let ap =  JSON.parse(JSON.stringify(catalogosAceptableAaprovechamiento));
    let localidades =  JSON.parse(JSON.stringify(catalogosLocalidades));
    multiregistroBandera = true;

    tituloAccion.html('Datos del predio');

    let ficha = htmlFicha(data,'find',region,municipios,localidades,tenencia,estado,ap);
    bodyPanelFicha.html(ficha);

    panelFicha.show();
    validaFormulario('#formularioPredios');
}



/**
 * @function htmlFicha
 * @param  {JSON} data - JSON con los datos del predio
 * @param {Stirng} action - Accion que podra hacer el usuario 
 * @return  {string}
 */
var htmlFicha = (data, action,cRegiones,cMunicipio,cLocalidades,cTipoTenencia,cEstatus,csAceptableAaprovechamiento) =>{
    
    let botones='';
    let disabled='';
    let opcionEjecutar='';

    switch(action){
        case 'add':
            opcionEjecutar = 'add';
            botones = `<button type="submit" class="btn btn-success btn-aceptar">Agregar predio</button>
                   <button type="button" class="btn btn-default btn-reset">Limpiar formulario</button>`;
          break;
        case 'find':
            opcionEjecutar = 'update';
            disabled = 'disabled';
            botones = `<button type="button" class="btn btn-default btn-delete">Eliminar</button>
                      <button type="submit"  class="btn btn-success btn-update">Actualizar</button>`;
          break;
    }
   
    return `<form id="formularioPredios" autocomplete="off" onsubmit="return false;" data-action="${opcionEjecutar}">
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Estado</label>
                        <input type="text" class="form-control" value="México" readonly>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Región</label>
                        <select name="region" class="form-control comboRegiones" ${disabled}>
                            ${contruirComboSimple(cRegiones, data.id_region)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Municipio</label>
                        <select name="municipio" class="form-control comboMunicipio" ${disabled}>
                             ${contruirComboSimple(MunicipiosPorRegion(cMunicipio,data.id_region),data.id_municipio)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Localidad</label>
                        <select name="localidad" class="form-control comboLocalidad" ${disabled}>
                           ${contruirComboSimple(LocalidadPorMunicipio(cLocalidades,data.id_municipio),data.id_localidad)}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Clave Única de Predio</label>
                        <input type="text" id="InputclaveUnicaIdentificacion" name="claveUnicaIdentificacion" class="form-control" value="${getTexto(data.folio)}" readonly>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>SEDEMEX</label>
                        <input type="text" name="sedemex" value="${getTexto(data.cve_sedemex)}" class="form-control">
                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Nombre del Predio</label>
                        <input type="text" name="nombrePredio" value="${getTexto(data.predio)}" class="form-control">
                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Tipo de tenencia de la tierra</label>
                        <select name="tipoTenenciaTierra" class="form-control">
                            ${contruirComboSimple(cTipoTenencia,data.id_tenencia)}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Descripción de cómo llegar al predio</label>
                        <input type="text" name="descripcionComoLlegarPredio" value="${getTexto(data.llegada_predio)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Latitud(UTM)</label>
                        <input type="text" name="latitud" value="${getTexto(data.latitud)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Longitud(UTM)</label>
                        <input type="text" name="longitud" value="${getTexto(data.longitud)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie total (has)</label>
                        <input type="text" name="superficieTotal" value="${getTexto(data.superficie_total)}" class="form-control">
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie cartográfica (has)</label>
                        <input type="text" name="superficieCartografica"  value="${getTexto(data.superficie_cartografica)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie arbolada (has)</label>
                        <input type="text" name="superficieArbolada" value="${getTexto(data.superficie_arbolada)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Superficie otros usos (has)</label>
                        <input type="text" name="superficieOtrosUsos" value="${getTexto(data.superficie_otros)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Cuenca especifica</label>
                         <div class="input-group">
                            <input type="hidden" name="cuencaEspecifica" id="idDeCuencasHidden" value="${getTexto(data.cuenca)}">
                            <input type="text"  name="cuencaEspecificaDescriptivo" value="${getTexto(data.cuenca_descripcion,true)}" class="form-control cuencaEspecifica" readonly>
                              <span class="input-group-btn">
                                    <button type="button" data-catalogo="cuenca" data-select="${getTexto(data.cuenca)}" id="btnCuencaClic" class="btn btn-success ctgo">clic</button>
                              </span>                  
                         </div>
                        
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Área natural protegida</label>
                        <div class="input-group">
                            <input type="hidden" name="areaNaturalProtegida" id="idAreaNaturalProtegidaHidden"  value="${getTexto(data.anp)}">
                            <input type="text" name="areaNaturalProtegidaDescriptivo" value="${getTexto(data.anp_descripcion,true)}" class="form-control areaNaturalProtegida" readonly>
                             <span class="input-group-btn">
                                    <button type="button" data-catalogo="anp" data-select="${getTexto(data.anp)}" id="btnApnClic" class="btn btn-success ctgo">clic</button>
                             </span>  
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Estatus del predio</label>
                        <select name="estatusPredio" class="form-control">
                            ${contruirComboSimple(cEstatus,data.id_estatus)}
                        </select>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Observaciones del predio</label>
                        <input type="text" name="observacionesPredio" value="${getTexto(data.observaciones)}" class="form-control">                        
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Propietario o representante</label>
                        <div class="input-group">
                            <input type="text" name="propietarioRepresentante" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" data-info="${getTexto(data.folio)}" class="btn btn-success multiregistro" data-multi="propietario">Registros</button>
                                </span>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <br>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Polígonos del predio</label>
                        <div class="input-group">
                            <input type="text" name="poligonosPredio" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" class="btn btn-success multiregistro" data-info="${getTexto(data.folio)}" data-multi="poligono" >Registros</button>
                                </span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Imagenes</label>
                        <div class="input-group">
                            <input type="text" name="imagenes" class="form-control" readonly>
                            <span class="input-group-btn">
                                    <button type="button" class="btn btn-success multiregistro" data-info="${getTexto(data.folio)}" data-multi="imagen">Registros</button>
                                </span>
                        </div>
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Registro Forestal Nacional</label>
                        <input type="text" name="registroForestalNacional" value="${getTexto(data.registroforestal_nacional)}" class="form-control">
                    </div>
                    <div class="col-md-3 col-sm-3 col-xs-12">
                        <label>Permiso Aprovechamiento Forestal</label>
                        <select name="permisoAprovechamientoForestal" class="form-control">
                            ${contruirComboSimple(csAceptableAaprovechamiento,data.id_aprovechamiento)}
                        </select>
                    </div>
                </div>
                <div class="row">
                    <br><br>
                    <div class="col-md-offset-5 col-sm-offset-5">
                        ${botones}
                    </div>
                </div>
            </form>
    `;
}

btnAccion.on('click', function(){
     let action = $(this).attr('data-info');

     (action == 'addPredio')? agregarPredio('Consultar un predio','findPredio'): buscarPredio('Agregar predio','addPredio');
});



panelFicha.on('click', '.btn-reset', function(){

    multiregistroBandera = false;
    $('.btn-aceptar').show();
    $(this).html('Limpiar formulario');
    $('.ctgo').removeClass('bloqueado');
    $('#btnCuencaClic,#btnApnClic').attr({'data-select':''});
    $('#formularioPredios').validate().resetForm();
    $("input[type=hidden]").val('');

    $('.multiregistro').attr('data-info','');
    document.getElementById('formularioPredios').reset();
    cleanCombo('.comboMunicipio , .comboLocalidad');

    $('#formularioPredios').find(':input').each(function() {
         $(this).prop('disabled', false);
    });
});

panelFicha.on('click', '.multiregistro', function() {

    let opcion = $(this).attr('data-multi');
    let btnAgregar = $('#addOptionMultiRegistro');
    btnAgregar.attr('data-option', '');

    if (multiregistroBandera) {

        let clavePredio = $(this).attr('data-info');
        btnAgregar.attr('data-option', opcion);
        opcion == 'propietario' ? getPredioRepresentantes(urlConexionMultiRegistro, clavePredio) : (opcion == 'poligono') ? getPredioPoligonos(urlConexionMultiRegistro, clavePredio) : getPredioImagen(urlConexionMultiRegistro, clavePredio);
    
    } else {

        alertaInfo('', '<p>Para agregar multiregistros de ' + opcion + ' guarde primero la ficha de predio. Haciendo <b>clic</b> en el boton <b>Agregar predio</b></p>', 'Información')
    
    }
});

panelFicha.on('click','.btn-delete',function(){
    let clave = $('#formularioPredios').find('#InputclaveUnicaIdentificacion').val();
    
      swal({
        title: '¿ Esta seguro de eliminar el predio '+clave+' ?' ,
        type: 'question',
        html: '<p>Toda la Información relacionada al predio será eliminada</p>',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick: false,
        allowEnterKey: false
    }).then(function() {
        alert('Se esta elimminando');
    })
});

panelFicha.on('change','.comboRegiones', function(){
      let idRegion = parseInt($(this).val());
      let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));

      $('.comboMunicipio').empty();
      let el = contruirComboSimple(MunicipiosPorRegion(municipios,idRegion));
      $('.comboMunicipio').append(el);
      
      cleanCombo('.comboLocalidad');      

});


panelFicha.on('change','.comboMunicipio', function(){
      let idMunicipio = parseInt($(this).val());
      let localidades = JSON.parse(JSON.stringify(catalogosLocalidades));
      
      $('.comboLocalidad').empty();
      let el = contruirComboSimple(LocalidadPorMunicipio(localidades,idMunicipio));
      $('.comboLocalidad').append(el);
});



/*
* @param {array} arg - Catalogo completo de municipios
* @param {String} idRegion - lo que se busca en el arreglo
* @return {array} - Regresa un arreglo filtrado
*/
function MunicipiosPorRegion(arg , idRegion){
    return  arg.filter((datos, index) => datos.region_municipio == idRegion);
}

/*
* @param {array} arg - Catalogo completo localidad
* @param {String} idMunicipio - lo que se busca en el arreglo
* @return {array} - Regresa un arreglo filtrado
*/
function LocalidadPorMunicipio(arg , idMunicipio){
    return  arg.filter((datos, index) => datos.id_municipio == idMunicipio);
}


cajaDetexto.keyup(function(){

    let texto = $(this).val().trim()
    let opcionCombo = combo.val()
    
    resetFormulario();

    if(texto.length == 0){
        mensajeError.html('')
    }else if(texto.length > 0 && opcionCombo == '-2ws'){
        mensajeError.html('Seleccione una opción')
    }else if(texto.length > 4){
        mensajeError.html('')
        getPredios(texto,opcionCombo,urlConexionService)
    }
          
});


combo.change(function() {

    let opcion = $(this).val()
    let texto = cajaDetexto.val().trim()
    

    
    resetFormulario();
    if (opcion != '-2ws' && texto.length > 0) {
        mensajeError.html('')
        getPredios(texto, opcion, urlConexionService)
    } else if (opcion == '-2ws') {
        $('#bodyAllPredios').empty();
    }

});


addOptionMultiRegistro.on('click', function() {
    let opcion = $(this).attr('data-option');
    if (opcion == 'propietario') {
        mostrarDetallePropietario(this);
    }else if(opcion == 'poligono'){
       mostrarDetallePoligono(this);
    }else if(opcion == 'imagen'){
        mostrarDetalleImagen(this);
    }
});

/**
 * @function getTexto
 * @param {String} dato - Campo de la cadena JSON 
 * @param {boolean} bandera - si es el descriptivo de los catalogos separado por comas
 * @return {String}
 */
function getTexto(dato, bandera=false){
  if(bandera){
    return (typeof dato == undefined || dato == null)? '' : dato.replace(/,/g,' ');
  }else{
    return (typeof dato == undefined || dato == null)? '' : dato ;
  }
}




Date.prototype.getMonthFormatted = function() {
  let month = this.getMonth() + 1;
  return month < 10 ? '0' + month : '' + month;
}

Date.prototype.getDiaFormatted = function() {
  let dia = this.getDate();
  return dia < 10 ? '0' + dia : '' + dia;
}


$.fn.serializeObject = function()
{
   var o = {};
   var a = this.serializeArray();
   $.each(a, function() {
       if (o[this.name]) {
           if (!o[this.name].push) {
               o[this.name] = [o[this.name]];
           }
           o[this.name].push(this.value || '');
       } else {
           o[this.name] = this.value || '';
       }
   });
   return o;
};


/**
 * @function eliminaElementoSeleccionado
 * @param {array} arr - Array de elementos seleccionados
 * @param {int} item -  opcion a eliminar
 * @return {array} Retorna arreglo con dato eliminado
 */
function eliminaElementoSeleccionado( arr, item ){
    let i = arr.indexOf( item );
    i !== -1 && arr.splice( i, 1 );

    return arr;
};


/**
 * @function agregarPredio
 * @param {String} text - Texto del boton
 * @param {String} clase - class del boton
 * @description Prepara la vista para agregar un nuevo predio.
 */
function agregarPredio(text, clase){

    let region = JSON.parse(JSON.stringify(catalogosRegiones));
    let municipios = JSON.parse(JSON.stringify(catalogosMunicipio));
    let tenencia =  JSON.parse(JSON.stringify(catalogosTipoTenencia));
    let estado =  JSON.parse(JSON.stringify(catalogosEstatus));
    let ap =  JSON.parse(JSON.stringify(catalogosAceptableAaprovechamiento));
    let localidades =  JSON.parse(JSON.stringify(catalogosLocalidades));

    let ficha = htmlFicha({},'add',region,municipios,localidades,tenencia,estado,ap);
    
    multiregistroBandera = false;
    bodyPanelFicha.html(ficha);  

    validaFormulario('#formularioPredios');

    rowFind.hide();
    btnAccion.html(text);
    btnAccion.attr({'data-info':clase});
    tituloAccion.html('Agregar Predio');
    panelFicha.show();

    combo.val('-2ws');
    cajaDetexto.val('');
    mensajeError.html('');
    $('#bodyAllPredios').empty();
}

/**
 * @function buscarPredio
 * @param {String} text -Texto del boton
 * @param {String} clase - class del boton
 * @description Prepara la vista para consultar informacion de un predio.
 */
function buscarPredio(text, clase){
   btnAccion.html(text);
   btnAccion.attr({'data-info':clase});
   panelFicha.hide();
   rowFind.show();
}

/**
 * @function fecha_hoy
 * @return {Date} Regresa la fecha en formato dd/mm/YYYY
 */
function fecha_hoy(){
    let fecha = new Date();
    return `${fecha.getDiaFormatted()}/${fecha.getMonthFormatted()}/${fecha.getFullYear()}`;
}

/**
 * @function fecha_valida
 * @param {Date} f - Fecha 
 * @return {boolean} Si el formato de fecha es correcto regresa true
 */
let fecha_valida = (f) => /^(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d$/.test(f);


flechaRegreso.on('click', function(e){
      e.preventDefault();
      if($(this).attr('data-option') == 'multiRegistros'){

            tituloModal.html('Detalle');
            flechaRegreso.attr({'data-seccion':'principal','data-option':'principal'});
            detalleMultiRegistro.hide();
            flechaRegreso.hide();
            multiRegistros.hide();
            addOptionMultiRegistro.hide();
            


      }else if($(this).attr('data-option') == 'detalleMultiRegistro'){
            
            if ($(this).attr('data-seccion')=='Propietario'){
                tituloModal.html('Propietarios o Representantes');
            }else if($(this).attr('data-seccion') == 'Poligonos'){
                tituloModal.html('Poligonos');
            }
            flechaRegreso.attr({'data-option':'multiRegistros'});
            flechaRegreso.hide();
            multiRegistros.show();
            detalleMultiRegistro.hide();
            addOptionMultiRegistro.show();

      }
});


/**
 * @function resetFormulario
 */
function resetFormulario() {
    panelFicha.hide();
    tituloAccion.html('');
}


/**
 * @function selectIdPredio
 * @param  {object jquery} element - Objecto DOM 
 */
function selectIdPredio(element) {
    let clave = $(element).attr('id');
    let tiene = $("#" + clave).hasClass('seleccion');    
    
    $("#tabla tr").removeClass('seleccion');
    

    if (tiene) {
        $("#" + clave).removeClass('seleccion');
        multiregistroBandera = false;
        resetFormulario();
    } else {
        
        $("#" + clave).addClass('seleccion');
        getTodosDetallesPredio(urlConexionPredios, clave);
    }
}


/**
 * @function pintaDatosEnFicha
 * @param  {JSON} datos - Contiene los datos de ubicacion del predio
 */
function pintaDatosEnFicha(datos){



}



/**
 * @function agregaCalendario
 * @param  {object jquery} element - Objecto DOM 
 * @param  {String} drops - como se mostrara el calendario
 * @param  {String} idElement - identificador de la caja de texto
 */
function agregaCalendario(element, drops='up') {
    if($(element).length > 0 && typeof($(element).data('daterangepicker')) == 'object') $(element).data('daterangepicker').remove();
    $(element).daterangepicker({
        singleDatePicker: true,
        autoUpdateInput: false,
        showDropdowns: true,

        drops: drops,
        locale: {
            format: "DD/MM/YYYY",

            daysOfWeek: [
                "D",
                "L",
                "M",
                "Mi",
                "J",
                "V",
                "S"
            ],
            monthNames: [
                "Enero",
                "Febrero",
                "Marzo",
                "Abril",
                "Mayo",
                "Junio",
                "Julio",
                "Agosto",
                "Septiembre",
                "Octubre",
                "Noviembre",
                "Diciembre"
            ]

        }

    }, function(chosen_date) {
        let selectorId= this.element.context.id;
        $(element).val(chosen_date.format('DD-MM-YYYY'));
    });
}


/**
 * @function plantillaRepresentates
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaRepresentates(arr){

    arregloDeRepresentantes = arr.slice();
    
    let renglones = '';
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:nombre:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetallePropietario(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Propietario" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(/:folio:/g,value.folio).replace(':nombre:',value.nombre_propietario_representante);
    });

    renglones= (renglones == '')? `<tr><td colspan="5"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Nombre del Propietario</th>
                            <th>Modificar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaPropietario">
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
    return html;
}



/**
 * @function plantillaPoligonos
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaPoligonos(arr){

    arregloDePoligonos = arr.slice();
    
    let renglones = '';
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:folio:</td>
                     <td>:accion_agraria:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetallePoligono(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Poligono" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(/:folio:/g,value.folio).replace(':accion_agraria:',value.accion_agraria);
    });

    renglones= (renglones == '')? `<tr><td colspan="5"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Folio</th>
                            <th>Acción agraría</th>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaPoligono">
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
  
    return html;
    
}


/**
 * @function mostrarDetallePoligono
 * @param  {object} element - objecto  DOM
 */
function mostrarDetallePoligono(element){
    detalleMultiRegistro.html(plantillaDetallePoligono.call(arregloDePoligonos, element));
    tituloModal.html('Poligonos');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    addOptionMultiRegistro.hide();    
    multiRegistros.hide();
    detalleMultiRegistro.show();
    agregaCalendario('.fechaPublicacionDof','down');
    agregaCalendario('.fechaResolucionPresidencial');
    agregaCalendario('.fechaAsambleaProcede');
    validaFormularioPoligono('#formularioPoligono');
}

/**
 * @function plantillaDetallePoligono
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetallePoligono(element){
    let option = $(element).attr('data-action');
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    
    self = '';
    
    if(option == 'agregar'){

        botones = '<button type="submit" id="agregarMultiPoligono" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        valueFolio = $(element).attr('data-info');

    }else if(option == 'update'){
        botones = '<button type="submit" id="actualizarMultiPoligono" class="btn btn-success">Actualizar</button>';

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';
    }

    
    
    let formulario =`<form id="formularioPoligono" onsubmit="return false" autocomplete="off">
                        <div class="form-group" ${display}>
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Consecutivo</label>
                                    <input type="text" class="form-control" name="consecutivo" value="${getTexto(self.consecutivo)}" readonly>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Folio</label>
                                    <input type="text" class="form-control" name="folio" value="${getTexto(self.folio)}" readonly>
                                </div>
                            </div>
                        </div> 

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Acción agraria</label>
                                    <input type="text" class="form-control" name="accionAgraria" value="${getTexto(self.accion_agraria)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de publicación en el DOF</label>
                                    <input type="text" class="form-control fechaPublicacionDof" name="fechaPublicacionDof" value="${getTexto(self.fecha_publicacion_dof)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de resolución presidencial</label>
                                    <input type="text" class="form-control fechaResolucionPresidencial" name="fechaResolucionPresidencial" value="${getTexto(self.fecha_resolucion_presidencial)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fecha de asamblea de procede</label>
                                    <input type="text" class="form-control fechaAsambleaProcede" name="fechaAsambleaProcede" value="${getTexto(self.fecha_asamblea_procede)}">
                                </div>
                            </div>
                        </div> 

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Documento que ampara la propiedad</label>
                                    <input type="text" class="form-control" name="documentoAmparaPropiedad" value="${getTexto(self.documento_ampara_propiedad)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Número del documento que ampara la propiedad</label>
                                    <input type="text" class="form-control" name="numeroDocumentoAmparaPropiedad" value="${getTexto(self.numero_documento_ampara_propiedad)}" >
                                </div>
                            </div>
                        </div>   

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Latitud (UTM)</label>
                                    <input type="text" class="form-control" name="latitud" value="${getTexto(self.latitud)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Longitud (UTM)</label>
                                    <input type="text" class="form-control" name="longitud" value="${getTexto(self.longitud)}">
                                </div>
                            </div>
                        </div>   

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie del polígono (Ha)</label>
                                    <input type="text" class="form-control" name="superficiePoligono" value="${getTexto(self.superficie_poligono)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie cartográfica (Ha)</label>
                                    <input type="text" class="form-control" name="superficieCartografica" value="${getTexto(self.superficie_cartografica)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie arbolada (Ha)</label>
                                    <input type="text" class="form-control" name="superficieArbolada" value="${getTexto(self.superficie_arbolada)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Superficie otros usos (Ha)</label>
                                    <input type="text" class="form-control" name="superficieOtrosUsos" value="${getTexto(self.superficie_otros_usos)}">
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de clima</label>
                                    <select name="tipoClima" class="form-control">
                                          ${contruirComboSimple([], self.id_tipo_clima)}
                                    </select>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de vegetación</label>
                                     <select name="tipoVegetacion" class="form-control">
                                           ${contruirComboSimple([], self.id_tipo_vegetacion)}
                                     </select> 
                                </div>
                            </div>
                        </div>  

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Tipo de fisiografía</label>
                                    <input type="text" class="form-control" name="tipoFisiografia" value="${getTexto(self.tipo_fisiografia)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Corrientes intermitentes</label>
                                    <input type="text" class="form-control" name="corrientesIntermitentes" value="${getTexto(self.corrientes_intermitentes)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Corrientes permanentes</label>
                                    <input type="text" class="form-control" name="corrientesPermanentes" value="${getTexto(self.corrientes_permanentes)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Manantiales y/u ojos de agua</label>
                                    <input type="text" class="form-control" name="manantialesOjoAgua" value="${getTexto(self.manantiales_ojos_agua)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Manantiales y/u ojos de agua que abastecen</label>
                                    <input type="text" class="form-control" name="manantialesOjoAguaAbastecen" value="${getTexto(self.manantiales_ojos_agua_abastecen)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Erosión</label>
                                    <input type="text" class="form-control" name="erosion" value="${getTexto(self.erosion)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Especies arbóreas</label>
                                    <select name="especiesArboreas" class="form-control">
                                           ${contruirComboSimple([], self.id_especies_arboreas)}
                                     </select> 
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Distribución del estrato arbustivo</label>
                                    <input type="text" name="distribucionEstratoArbustivo" class="form-control" value="${getTexto(self.distribucion_estrato_arbustivo)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Distribución de renuevo</label>
                                    <input type="text" class="form-control" name="distribucionRenuevo" value="${getTexto(self.distribucion_renuevo)}">
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Cobertura promedio del arbolado</label>
                                    <input type="text" class="form-control" name="coberturaPromedioArbolado" value="${getTexto(self.cobertura_promedio_arbolado)}">
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Fauna</label>
                                    <input type="text" class="form-control" name="fauna" value="${getTexto(self.fauna)}">
                                </div>

                                <div class="col-md-6 col-sm-6">
                                    <label>Observaciones del polígono</label>
                                    <input type="text" class="form-control" name="observacionesPoligono" value="${getTexto(self.observaciones_poligono)}">
                                </div>
                            </div>
                        </div>
                        <div class="form-group">
                        <div class="row">
                              <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                  ${botones}
                              </div>                            
                        </div>
                    </div>
                    </form>`;
    

    return formulario;
}


/**
 * @function plantillaImagenes
 * @param  {array} arr - Arreglo con objetos JSON
 * @return  {String} retorna una tabla con codigo html
 */
function plantillaImagenes(arr){

    arregloDeImagenes = arr.slice();
    
    let renglones = '';
    let renglon = `<tr class="renglon:consecutivo:">
                     <td>:consecutivo:</td>
                     <td>:descripcion:</td>
                     <td>:fecha:</td>
                     <td><a href="#" download="/:url:/">Ver Imagen</a></td>
                     <td>:campoAsociado:</td>
                     <td><button type="button" class="btn btn-success" data-action="update" data-consecutivo=":consecutivo:" onclick="mostrarDetalleImagen(this)">Actualizar</button></td>
                     <td><button type="button" class="btn btn-default" data-consecutivo=":consecutivo:" data-folio=":folio:" data-info="Imagen" onclick="eliminaMultiRegistro(this)">Eliminar</button></td>
                  </tr>`;

    arr.forEach(function(value){
        renglones+= renglon.replace(/:consecutivo:/g,value.consecutivo).replace(':descripcion:',value.descripcion).replace(':fecha:',value.fecha)
                    .replace(/:url:/,value.url).replace(':campoAsociado:',value.campoasociado).replace(/:folio:/g,value.folio);
    });

    renglones= (renglones == '')? `<tr><td colspan="7"><center>No hay datos registrados</center></td></tr>`: renglones;
    let html = `<div class="table-responsive table-striped table-bordered table-hover">
                    <table class="table">
                        <thead>
                          <tr>
                            <th>Consecutivo</th>
                            <th>Descripción</th>
                            <th>Fecha</th>
                            <th>Imagen</th>
                            <th>Campo Asociado</th>
                            <th>Actualizar</th>
                            <th>Eliminar</th>
                          </tr>
                        </thead>
                        <tbody id="tbodyTablaImagen">
                            ${renglones}
                        </tbody>
                    </table>
                </div>`;
  
    return html;
    
}

/**
 * @function mostrarDetalleImagen
 * @param  {object} element - objecto  DOM
 */

function mostrarDetalleImagen(element) {
    detalleMultiRegistro.html(plantillaDetalleImagen.call(arregloDeImagenes, element));
    addOptionMultiRegistro.hide();
    tituloModal.html('Imagenes');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();
    agregaCalendario('.fechaImagen','down');
    validarFormularioImagen('#formularioImagen');
}

/**
 * @function mostrarDetallePropietario
 * @param  {object} element - objecto  DOM
 */

function mostrarDetallePropietario(element) {
    
    detalleMultiRegistro.html(plantillaDetalleRepresentante.call(arregloDeRepresentantes, element));
    addOptionMultiRegistro.hide();    
    tituloModal.html('Propietarios o Representantes');
    flechaRegreso.attr('data-option', 'detalleMultiRegistro');
    flechaRegreso.show();
    multiRegistros.hide();
    detalleMultiRegistro.show();
    agregaCalendario('.fechaInicioPeriodo');
    agregaCalendario('.fechaFinPeriodo');
    validaFormularioRepresentante('#formularioRepresentante');

}

/**
 * @function plantillaDetalleRepresentante
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetalleRepresentante(element){
    let option = $(element).attr('data-action');
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    
    self = '';
    
    if(option == 'agregar'){

        botones = '<button type="submit" id="agregarMultiPersona" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        valueFolio = $(element).attr('data-info');

    }else if(option == 'update'){
        botones = '<button type="submit" id="actualizarMultiPersona" class="btn btn-success">Actualizar</button>';

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';
    }


    let formulario =`<form id="formularioRepresentante" onsubmit="return false" autocomplete="off">
                        <div class="form-group" ${display}>
                          <div class="row">
                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <label>Consecutivo</label>
                                  <input type="text" class="form-control" name="nombreConsecutivo" value="${getTexto(self.consecutivo)}"  readonly>
                              </div>

                              <div class="col-md-6 col-sm-6 col-xs-12">
                                  <label>Folio</label>
                                  <input type="text" class="form-control" name="nombreFolio" value="${getTexto(valueFolio)}" readonly>
                              </div>
                          </div> 
                      </div>
                    
                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del propietario o representante</label>
                                <input type="text" class="form-control" name="nombrePropietario" value="${getTexto(self.nombre_propietario_representante)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del secretario o representante Legal</label>
                                <input type="text" class="form-control" name="nombreSecretario"  value="${getTexto(self.nombre_secretario_representante_legal)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Nombre del tesorero</label>
                                <input type="text" class="form-control" name="nombreTesorero" value="${getTexto(self.nombre_tesorero)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Curp del propietario o representante</label>
                                <input type="text" class="form-control" name="curpPropietario" value="${getTexto(self.curp_propietario_o_representante)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Inicio del periodo</label>
                                <input type="text"  class="form-control fechaInicioPeriodo" name="inicioPeriodo" value="${getTexto(self.inicio_periodo)}">
                            </div>

                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Fin del periodo</label>
                                <input type="text" class="form-control fechaFinPeriodo" name="finPeriodo" value="${getTexto(self.fin_periodo)}">
                            </div>
                        </div>
                    </div> 

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-6 col-sm-6 col-xs-12">
                                <label>Observaciones de la administración</label>
                                <input type="text" class="form-control" name="observacionesAdministracion" value="${getTexto(self.observaciones_administracion)}">
                            </div>                            
                        </div>
                    </div>

                    <div class="form-group">
                        <div class="row">
                            <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                ${botones}
                            </div>                            
                        </div>
                    </div>
                  </form>
                  `;
    

    return formulario;
}


/**
 * @function plantillaDetalleImagen
 * @param  {object} element - objecto  DOM
 * @return  {String} Retorno el formulario lleno con los detalles
 */
function plantillaDetalleImagen(element){
    let option = $(element).attr('data-action');
    let valueFolio =  ''; 
    let botones = '';
    let display = '';
    
    self = '';
    
    if(option == 'agregar'){

        botones = '<button type="submit" id="agregarMultiImagen" class="btn btn-success">Agregar multiregistro</button>';
        display= 'style="display:none"';
        valueFolio = $(element).attr('data-info');

    }else if(option == 'update'){
        botones = '<button type="submit" id="actualizarMultiImagen" class="btn btn-success">Actualizar</button>';

        let consecutivo = parseInt($(element).attr('data-consecutivo'));
    
        let posicion = arrayObjectIndexOf(this,consecutivo,'consecutivo');

        (posicion > -1)? self = this[posicion] : '';
        (posicion > -1)? valueFolio =  self.folio : valueFolio='';
    }


    let formulario =`<form id="formularioImagen" onsubmit="return false" autocomplete="off">
                        <div class="form-group" ${display}>
                            <div class="row">
                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Consecutivo</label>
                                    <input type="text" class="form-control" name="consecutivo" value="${getTexto(self.consecutivo)}" readonly>
                                </div>

                                <div class="col-md-6 col-sm-6 col-xs-12">
                                    <label>Folio</label>
                                    <input type="text" class="form-control" name="folio" value="${getTexto(self.folio)}" readonly>
                                </div>
                            </div>
                        </div> 

                            <div class="form-group">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Url</label>
                                        <input type="file" name="url"  value="${self.url}" class="form-control">
                                    </div>
                    
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Fecha</label>
                                        <input type="text" name="fecha" value="${getTexto(self.fecha)}" class="form-control fechaImagen">
                                    </div>
                                </div>
                            </div>
                    
                            <div class="from-group">
                                <div class="row">
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Descripción</label>
                                        <input type="text" name="descripcion" value="${getTexto(self.descripcion)}" class="form-control">
                                    </div>
                    
                                    <div class="col-md-6 col-sm-6 col-xs-12">
                                        <label>Campo Asociado</label>
                                        <select name="campoAsociado" class="form-control">
                                              ${contruirComboSimple([], self.campoasociado)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                    
                            <div class="form-group">
                                <div class="row">
                                      <div class="col-md-12 col-sm-12 col-xs-12 text-center">
                                      <br>
                                          ${botones}
                                      </div>
                                </div>
                            </div>
                     </form>`;
    

    return formulario;
}

/**
 * @function contruirComboSimple
 * @param {array} arg - Opciones del catalogo
 * @param {optionSelected} - Si trae un valor seleccionado
 * @return regresa String de html con options del combo
 */
function contruirComboSimple(arg, optionSelected){
    optionSelected = String(optionSelected);
    let posicion = arrayObjectIndexOf(arg, optionSelected, 'value');
    if(posicion != -1) arg[posicion].selected = 'selected';

    let options = '<option value="-1">Seleccione una opción...</option>';
    
    let option = '<option value=":value:" :selected: >:text:</option>';

    $.each(arg, function( index, data ) {
       options+=option.replace(':value:',data.value).replace(':text:',data.text).replace(':selected:',data.selected);
     });
    

    return options;
}


/**
 * @function cleanCombo
 * @param  {String} idCombo - id del combo que se limpiara
 */
function cleanCombo(idCombo){
    $(idCombo).empty();
    let options = '<option value="-1">Seleccione una opción...</option>';
    $(idCombo).append(options);
}




/**
 * @function contruirComboCatalogo
 * @param  {String} idCatalogo - id del combo
 * @param  {array} arg - array con las opciones del catalogo
 * @param  {String}  seleccionados - String de elementos seleccionados
 * @param  {String}  bloqueado - Si el select esta bloqueado o habilitado
 * @return  {String} Retorno el el combo con el catalogo
 */
function contruirComboCatalogo(idCatalogo, arg , seleccionados, bloqueado){
    
    if(seleccionados.startsWith(',')) seleccionados = seleccionados.substr(1);
    
    
    $.each(seleccionados.split(','), function(index, valor){
          let posicion = arrayObjectIndexOf(arg, valor, 'value');
          
          if(posicion >= 0 )arg[posicion].selected='selected';

    });
    
    let options = '';
    let option = '<option value=":value:" :selected: >:text:</option>';

    $.each(arg, function( index, data ) {
       options+=option.replace(':value:',data.value).replace(':text:',data.text).replace(':selected:',data.selected);
     });
    
    let html = `<select multiple="multiple"  class="comboCatalogo" id="${idCatalogo}" ${bloqueado} style="width:100%">
                  ${options}
                </select>`
    return html;
}

/**
 * @function modalCatalogos
 * @param  {String} tituloModal - titulo del modal 
 * @param  {String} idCombo -  id del combo del catalogo que será cargado
 * @param  {array} arg - array con las opciones del catalogo
 * @param  {String} seleccionados - elementos que han sido seleccionados
 * @param  {String} bloqueado - Como aparece el elememto habilitado o  bloqueado
 * @return  {String} Retorna modal con el select de los catalogos
 */
function modalCatalogos(tituloModal, idCombo , arg , seleccionados, bloqueado){

   
   let clone = JSON.parse(JSON.stringify(arg));

   let modal = `
        <!-- Modal -->
        <div id="modalCatalogoCuenca" data-backdrop="static" data-keyboard="false" class="modal fade" role="dialog">
          <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
              <div class="modal-header">
                <button type="button" class="close" data-dismiss="modal">&times;</button>
                <h4 class="modal-title">${tituloModal}</h4>
              </div>
              <div class="modal-body" id="ContenidoCatalogos">
                 ${contruirComboCatalogo(idCombo,clone, seleccionados,bloqueado)}
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-default" data-dismiss="modal">Cerrar</button>
              </div>
            </div>

          </div>
        </div>`;
    return modal;
}




panelFicha.on('click','.ctgo', function(){
    let tipoCatalogo= $(this).attr('data-catalogo');
    let disabled =    ($(this).hasClass('bloqueado')) ? 'disabled' : '';

    let elementosSeleccionados = $(this).attr('data-select') || '';

    if(tipoCatalogo == 'anp'){

        divContenidoCatalogos.html(modalCatalogos('Area natural protegida','comboCatalogosApn',catalogosApn,elementosSeleccionados,disabled));

    }else if (tipoCatalogo == 'cuenca'){

        divContenidoCatalogos.html(modalCatalogos('Cuenca','comboCatalogosCuenca',catalogosCuenca,elementosSeleccionados,disabled));
    }

    addMultiSelect('.comboCatalogo');

   
    $('#modalCatalogoCuenca').modal('show');
});


$('#btnRegresar').on('click',function(){
   window.location.assign("/SIFEM/index.html");
});


$('#btnhelpme').on('click',function(){
    let el = $('#btnAccion');

    let section = el.attr('data-info')|| '';


    let helpMeAdd = `<b>Para agregar un predio</b><br>
                      1.- <br>
                      2.- <br>
                      3.- <br>
                      4.- <br>
                      5.- `;

    let helpMeUpdate = ` <b>Para actualizar un predio</b><br>
                            1.- <br>
                            2.- <br>
                            3.- <br>
                            4.- <br>
                            5.- `;

    let help = (section == 'addPredio')?  helpMeUpdate : helpMeAdd;

    alertaInfo('',help,'Ayuda');
});

/**
 * @function arrayObjectIndexOf
 * @param  {Array.<T>} arr - Arreglo de objectos
 * @param  {string} searchTerm - Valor de a buscar en el areglo
 * @param  {string} property -  Propiedad en la cual se buscará searchTerm
 * @return {number}  indica la posicion del valor buscado
 */
function arrayObjectIndexOf(arr, searchTerm, property) {

    for (let i = 0, len = arr.length; i < len; i++) {
      
        if (arr[i][property] === searchTerm) {
            return i;
        }
    }
    return -1;
}


/**  
 * @function eliminaMultiRegistro
 * @param  {object jquery} el - Boton al que se dio clic
 */
function eliminaMultiRegistro(el){
    let consecutivo = $(el).attr('data-consecutivo');
    let folio = $(el).attr('data-folio');
    let tipoMultiRegistro = $(el).attr('data-info');
    let tableBody = $('#tbodyTabla'+tipoMultiRegistro);
    let tableName = '';

    if(tipoMultiRegistro == 'Propietario'){
        tableName = 'formularios.representante';

    }else if(tipoMultiRegistro == 'Poligono'){
         tableName = 'formularios.poligonos';

    }else if(tipoMultiRegistro == 'Imagen'){
       tableName = 'formularios.imagen';
    }

    swal({
        title: '¿ Esta seguro de eliminar el multiregistro '+consecutivo+' ?' ,
        type: 'question',
        html: '<p>Toda la Información relacionada al multiregistro será eliminada</p>',
        showCancelButton: true,
        confirmButtonColor: '#808B96',
        cancelButtonColor: '#BDBDBD',
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Si!',
        allowOutsideClick: false,
        allowEnterKey: false
    }).then(function() {
        eliminaMultiRegistroAJAX(urlConexionMultiRegistro, 'deleteMultiregistro', tableName, folio , consecutivo, tableBody);
        
    })
}

/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
                                BLOQUE DE PETICIONES AJAX
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/

/**
 * @function getPredios
 * @param  {string} texto - Cadena que va a buscar
 * @param  {string} accion - Contiene getPredio o getRepresentante
 * @param  {string} url - url del service 
 * @return  {object}
 */

function getPredios(texto,accion,url) {
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:accion,text:texto, clave:''},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(resp){

            if(resp.response.sucessfull){
               
            

                let table = document.getElementById("tabla").getElementsByTagName('tbody')[0];
                let cabecera = document.getElementById("headInfo");
                cabecera.innerHTML= 'Descripción';
                table.innerHTML='';

                if(resp.data.length > 0)
                {
                   var i=0;
                   for( var x in resp.data){
                        i+=1;
                        var row = table.insertRow(-1);
                        row.setAttribute("width","100%");
                        row.setAttribute("id",resp.data[x].value);
                        row.setAttribute("onclick","selectIdPredio(this)");
                        var cell1 = row.insertCell(0);
                        var cell2 = row.insertCell(1);
                        var cell3 = row.insertCell(2);
                        var cell4 = row.insertCell(3);
                        var cell5 = row.insertCell(4);
          
                        cell1.setAttribute("width","16%")
                        cell2.setAttribute("width","72%");
                        cell3.setAttribute("width","1%");
                        cell4.setAttribute("width","1%");
                        cell5.setAttribute("width","1%");


                        cell1.innerHTML=resp.data[x].value;
                        cell2.innerHTML=resp.data[x].label;
                    }
                }else{
                        let row = table.insertRow(-1);
                        let cell1= row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        row.insertCell(-1);
                        cell1.setAttribute("width","100%");
                    
                        cell1.innerHTML='<center>No se encontraron predios</center>';
                }
            }else{
                alertaError(resp.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
              
        }

    }); 
   
}



/**
 * @function getTodosDetallesPredio
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getTodosDetallesPredio(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPredio',clavePredio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            if(data.response.sucessfull){
                abrirFicha(data.data[0]);
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
              alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');      
        }

    }); 
}

/**
 * @function getPredioRepresentantes
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioRepresentantes(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getRepresentantes',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                tituloModal.html('Propietarios o Representantes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Propietario'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaRepresentates(data.data));
                modal.modal('show');
            }else{
                alertaError(data.response.message);
            }
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');           
        }

    }); 
}


/**
 * @function getPredioImagen
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioImagen(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getImagenes',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
           
            if(data.response.sucessfull){
                tituloModal.html('Imagenes');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'imagenes'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                flechaRegreso.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaImagenes(data.data));
                modal.modal('show');
            }else{
                alertaError(data.response.message);
            }
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');           
        }

    }); 
}


/**
 * @function getPredioPoligonos
 * @param  {string} clave - Clave del predio
 * @param  {string} url - url del service 
 */
function getPredioPoligonos(url,clave) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'getPoligonos',folio:clave},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
             
            if(data.response.sucessfull){
                tituloModal.html('Poligonos');
                flechaRegreso.attr({'data-option':'multiRegistros','data-seccion':'Poligonos'});
                addOptionMultiRegistro.attr({'data-info': clave});
                detalleMultiRegistro.hide();
                flechaRegreso.hide();
                multiRegistros.show();
                addOptionMultiRegistro.show();
                multiRegistros.html(plantillaPoligonos(data.data));
                modal.modal('show');
            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}


/**
 * @function insertPredio
 * @param  {object JSON} datosPredios - Datos del formulario de predio
 * @param  {string} url - url del service 
 * @param {String} btn - selector del boton al que se hace clic para mostrar el modal
 * @param {String} btnReset - selector del boton reset
 * @param {String} btnAgregar - selector del boton para agregar predio
 * @param {String} botonesMultiRegistros - Selectores de botones multiregistros
 * @param {String} formulario - selector del formulario
 */
function insertPredio(url,datosPredios, btn, formulario, btnReset, btnAgregar, botonesMultiRegistros) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'insertPredio', formularioPrincipal: datosPredios},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            
            if(data.response.sucessfull){
                $('#InputclaveUnicaIdentificacion').val(data.data);

                $(formulario).find(':input').each(function() {
                    
                    if($(this).attr('type') != 'button' && $(this).attr('type') != 'submit') $(this).prop('disabled', true);
                });

                multiregistroBandera = true;
                $(btnAgregar).hide();
                $(btnReset).html('Agregar otro predio');
                $(btn).addClass('bloqueado');
                $(botonesMultiRegistros).attr('data-info',data.data);
                alertaExito(data.response.message);

            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}




/**
 * @function updatePredio
 * @param  {object JSON} datosPredios - Datos del formulario de predio
 * @param {String} formulario - selector del formulario
 */
function updatePredio(url,datosPredios) { 
    $.ajax({
        type: 'POST',
        url: url,
        data: {action:'updatePredio', formularioPrincipal: datosPredios},
        dataType: 'json',
        beforeSend: function (data) {
        },
        success: function(data){
            console.log(data);
            if(data.response.sucessfull){
                
                alertaExito(data.response.message);

            }else{
                alertaError(data.response.message);
            }
           
        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');         
        }

    }); 
}

/**
 * @function cargaCatalogos
 * @param  {string} url - url del service 
 * @param  {string} action - accion
 * @param {String} tableName - nombre de la tabla
 */

function cargaCatalogos(url, action, tableName) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, tableName: tableName },
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {

            if (data.response.sucessfull) {
                sessionStorage['catalogos'] = JSON.stringify(data.data);


                let objecto = JSON.parse(JSON.stringify(data.data));

                $.each(objecto, function(index, value) {
                    if (value.name_catalog == 'catalogos.tipotenenciatierra') {
                        catalogosTipoTenencia = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.municipio') {
                        catalogosMunicipio = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.cuenca') {
                        catalogosCuenca = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.anp') {
                        catalogosApn = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.aceptable_aprovechamiento') {
                        catalogosAceptableAaprovechamiento = objecto[index].catalogo;
                    } else if (value.name_catalog == 'catalogos.estatus') {
                        catalogosEstatus = objecto[index].catalogo;
                    } else if(value.name_catalog == 'catalogos.localidad'){
                        catalogosLocalidades = objecto[index].catalogo;
                    }else if(value.name_catalog == 'catalogos.region'){
                        catalogosRegiones = objecto[index].catalogo;
                    }

                });

            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}


/**
 * @function eliminaMultiRegistroAJAX
 * @param  {string} url - url del service 
 * @param  {string} action - accion a realizar 
 * @param {String} tableName - nombre de la tabla de multiRegistro
 * @param {String} consecutivo - id del multiRegistro que se quiere eliminar
 * @param {String} tableBodyMultiRegistro - id del de la tabla del multiRegistro
 */

function eliminaMultiRegistroAJAX(url, action, tableName, folio , consecutivo, tableBodyMultiRegistro) {
    $.ajax({
        type: 'POST',
        url: url,
        data: { action: action, table_name: tableName , folio:folio, consecutivo : consecutivo},
        dataType: 'json',
        beforeSend: function(data) {},
        success: function(data) {
            if (data.response.sucessfull) {
               tableBodyMultiRegistro.find('.renglon'+consecutivo).remove();
               alertaExito(data.response.message);
            } else {
                alertaError(data.response.message);
            }

        },
        error: function(err) {
            alertaError('Vuelva a intentarlo. Si el problema continúa contacte con soporte');
        }

    });
}

/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
                                BLOQUE DE MENSAJES DE ALERTAS
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/


var alertaError = function(mensaje) {
  swal({
        title: "Ocurrio un error",
        text: mensaje,
        type: "error",
        confirmButtonColor: "#F78181",
        confirmButtonText: "Aceptar",
        closeOnConfirm: false,
        allowOutsideClick:false,
        allowEnterKey:false
  });
}


var alertaInfo = function(mensaje='',html='',titulo="Información") {
    swal({
        title: titulo,
        text: mensaje,
        html: html,
        type: "info",
        confirmButtonText: "Aceptar"
    });
}

var alertaExito = function(mensaje) {
    swal({
        title: "Exito!",
        text: mensaje,
        type: "success",
        confirmButtonColor: "#04B431",
        confirmButtonText: "Aceptar"
    });
}





/*****************************************************************************************************
******************************************************************************************************
******************************************************************************************************
******************************************************************************************************
             BLOQUE DE VALIDACIONES FORMULARIO Y CARGA DE PLUGIN AL ELEMENTOS DEL DOM
******************************************************************************************************
******************************************************************************************************
*****************************************************************************************************/

/*
 * @function validarFormularioImagen
 * @param {Object jquery} element - Es el id del formulario de imagenes
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validarFormularioImagen(element) {
    if ($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            url: {
                required: true
            },

            fecha: {
                required: true,
                empty: true,
                maxlength: 15
            },

            descripcion: {
                required: true,
                empty: true,
                maxlength: 255
            },

            campoAsociado: {
                valueNotEquals: '-1'
            }
        },

        messages: {
            url: {
                required: 'Campo requerido'
            },

            fecha: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 15 caracteres'
            },

            descripcion: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            campoAsociado: {
                valueNotEquals: 'Seleccione una opción'
            }
        },

        submitHandler: function(form) {
            return false;
        }
    });
}

/*
 * @function validaFormularioPoligono
 * @param {Object jquery} element - Es el id del formulario de poligono
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validaFormularioPoligono(element) {
    if ($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            accionAgraria: {
                required: true,
                empty: true,
                maxlength: 255
            },

            fechaPublicacionDof: {
                required: true,
                empty: true
            },

            fechaResolucionPresidencial: {
                required: true,
                empty: true
            },

            fechaAsambleaProcede: {
                required: true,
                empty: true
            },

            documentoAmparaPropiedad: {
                required: true,
                empty: true,
                maxlength: 255
            },

            numeroDocumentoAmparaPropiedad: {
                required: true,
                empty: true,
                maxlength: 255
            },

            latitud: {
                required: true,
                numeros: true,
                maxlength: 7
            },

            longitud: {
                required: true,
                numeros: true,
                maxlength: 7
            },

            superficiePoligono: {
                required: true,
                decimales: true
            },

            superficieCartografica: {
                required: true,
                decimales: true
            },

            superficieArbolada: {
                required: true,
                decimales: true
            },

            superficieOtrosUsos: {
                required: true,
                decimales: true
            },

            tipoClima: {
                valueNotEquals: '-1'
            },

            tipoVegetacion: {
                valueNotEquals: '-1'
            },

            tipoFisiografia: {
                required: true,
                empty: true,
                maxlength: 255
            },

            corrientesIntermitentes: {
                required: true,
                empty: true,
                maxlength: 255
            },

            corrientesPermanentes: {
                required: true,
                empty: true,
                maxlength: 255
            },

            manantialesOjoAgua: {
                required: true,
                empty: true,
                maxlength: 255
            },

            manantialesOjoAguaAbastecen: {
                required: true,
                empty: true,
                maxlength: 255
            },

            erosion: {
                required: true,
                empty: true,
                maxlength: 255
            },

            especiesArboreas: {
                valueNotEquals: '-1'
            },

            distribucionEstratoArbustivo: {
                required: true,
                empty: true,
                maxlength: 255
            },

            distribucionRenuevo: {
                required: true,
                empty: true,
                maxlength: 255
            },

            coberturaPromedioArbolado: {
                required: true,
                empty: true,
                maxlength: 255
            },

            fauna: {
                required: true,
                empty: true,
                maxlength: 255
            },

            observacionesPoligono: {
                required: true,
                empty: true,
                maxlength: 255
            }
        },

        messages: {
            accionAgraria: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            fechaPublicacionDof: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios'
            },

            fechaResolucionPresidencial: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios'
            },

            fechaAsambleaProcede: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios'
            },

            documentoAmparaPropiedad: {
                required: 'Campo requerido',
                empty: 'No deje espacios',
                maxlength: 'Maximo 255 caracteres'
            },

            numeroDocumentoAmparaPropiedad: {
                required: 'Campo requerido',
                empty: 'No deje espacios',
                maxlength: 'Maximo 255 caracteres'
            },

            latitud: {
                required: 'Campo requerido',
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 7 caracteres'
            },

            longitud: {
                required: 'Campo requerido',
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 7 caracteres'
            },

            superficiePoligono: {
                required: 'Campo requerido',
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieCartografica: {
                required: 'Campo requerido',
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieArbolada: {
                required: 'Campo requerido',
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieOtrosUsos: {
                required: 'Campo requerido',
                decimales: 'Ingrese formato correcto 0.00'
            },

            tipoClima: {
                valueNotEquals: 'Seleccione una opción'
            },

            tipoVegetacion: {
                valueNotEquals: 'Seleccione una opción'
            },

            tipoFisiografia: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            corrientesIntermitentes: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            corrientesPermanentes: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            manantialesOjoAgua: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            manantialesOjoAguaAbastecen: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            erosion: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            especiesArboreas: {
                valueNotEquals: 'Seleccione una opción'
            },

            distribucionEstratoArbustivo: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            distribucionRenuevo: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            coberturaPromedioArbolado: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            fauna: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            observacionesPoligono: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            }
        },

        submitHandler: function(form) {
            alert('Todo bien para poligonos');
            return false;
        }
    });

}


/*
 * @function validaFormularioRepresentante
 * @param {Object jquery} element - Es el id del formulario de representante
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */

function validaFormularioRepresentante(element) {
    if($(element).length > 0) $(element).validate().destroy();

    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            nombrePropietario: {
                required: true,
                empty: true,
                maxlength: 255
            },

            nombreSecretario: {
                required: true,
                empty: true,
                maxlength: 255
            },

            nombreTesorero: {
                required: true,
                empty: true,
                maxlength: 255
            },

            curpPropietario: {
                required: true,
                empty: true,
                maxlength: 255
            },

            inicioPeriodo: {
                required: true,
                empty: true,
                maxlength: 255
            },

            finPeriodo: {
                required: true,
                empty: true,
                maxlength: 255
            },

            observacionesAdministracion: {
                required: true,
                empty: true,
                maxlength: 255
            }
        },

        messages: {
            nombrePropietario: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            nombreSecretario: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            nombreTesorero: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            curpPropietario: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            inicioPeriodo: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            finPeriodo: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            },

            observacionesAdministracion: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 255 caracteres'
            }
        },

        submitHandler: function(form) {
            alert('Todo ben para representante');
            return false;
        }
    });
}

/*
 * @function validaFormulario
 * @param {Object jquery} element - Es el id del formulario de predios
 * @description Este metodo prepara el formulario y agrega los plugin a los elementos del dom
 */
function validaFormulario(element) {
    if($(element).length > 0) $(element).validate().destroy();
    
    
    $(element).validate({
        errorElement: 'span',
        wrapper: 'label',
        rules: {
            region: {
                valueNotEquals: '-1'
            },

            municipio: {
                valueNotEquals: '-1'
            },

            localidad: {
                valueNotEquals: '-1'
            },

            sedemex: {
                numeros: true,
                maxlength: 8
            },

            nombrePredio: {
                required: true,
                empty: true,
                maxlength: 200
            },

            tipoTenenciaTierra: {
                valueNotEquals: '-1'
            },

            latitud: {
                required: true,
                numeros: true,
                maxlength: 7
            },

            longitud: {
                required: true,
                numeros: true,
                maxlength: 7
            },

            superficieTotal: {
                decimales: true
            },

            superficieCartografica: {
                decimales: true
            },

            superficieArbolada: {
                decimales: true
            },

            superficieOtrosUsos: {
                decimales: true
            },

            estatusPredio: {
                valueNotEquals: '-1'
            },

            registroForestalNacional: {
                maxlength: 30
            },

            permisoAprovechamientoForestal: {
                valueNotEquals: '-1'
            }
        },
        messages: {
            region: {
                valueNotEquals: 'Seleccione una opción'
            },

            municipio: {
                valueNotEquals: 'Seleccione una opción'
            },

            localidad: {
                valueNotEquals: 'Seleccione una opción'
            },

            sedemex: {
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 8 caracteres'
            },

            nombrePredio: {
                required: 'Campo requerido',
                empty: 'No deje espacios vacios',
                maxlength: 'Maximo 200 caracteres'
            },

            tipoTenenciaTierra: {
                valueNotEquals: 'Seleccione una opción'
            },

            latitud: {
                required: 'Campo requerido',
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 7 caracteres'
            },

            longitud: {
                required: 'Campo requerido',
                numeros: 'Ingrese solo números',
                maxlength: 'Maximo 7 caracteres'
            },

            superficieTotal: {
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieCartografica: {
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieArbolada: {
                decimales: 'Ingrese formato correcto 0.00'
            },

            superficieOtrosUsos: {
                decimales: 'Ingrese formato correcto 0.00'
            },

            estatusPredio: {
                valueNotEquals: 'Seleccione una opción'
            },

            registroForestalNacional: {
                maxlength: 'Maximo 30 caracteres'
            },

            permisoAprovechamientoForestal: {
                valueNotEquals: 'Seleccione una opción'
            }
        },

        submitHandler: function(form) {
           
            let idCuencas = $('#btnCuencaClic').attr('data-select').trim() || '';
            let idApn = $('#btnApnClic').attr('data-select').trim() || '';
            let operacion = $(form).attr('data-action') || '';

            if(idCuencas.startsWith(','))idCuencas = idCuencas.substr(1);
            if(idApn.startsWith(','))idApn = idApn.substr(1);
            
            $('#idDeCuencasHidden').val(idCuencas);
            $('#idAreaNaturalProtegidaHidden').val(idApn);
            let datos = { 'formulario' : []};
            datos.formulario.push($(form).serializeObject());

            if( operacion == 'add'){
               insertPredio(urlConexionPredios,JSON.stringify(datos),'.ctgo','#formularioPredios','.btn-reset','.btn-aceptar','.multiregistro');
            }else if(operacion == 'update'){
               updatePredio(urlConexionPredios,JSON.stringify(datos));
            }else{
              alert('Acción no disponible');
            }
            

            return false;
        }
    });

}

function addMultiSelect(el) {
   if($(el).hasClass('select2-hidden-accessible')) $(el).select2('destroy'); 

   let tipoCatalogo =  $(el).attr('id'); 
   

   $(el).select2({
     placeholder: 'Haga clic aquí '
   }).on('select2:select', function (evt) {
        let valor = String(evt.params.data.id);
      

       if(tipoCatalogo == 'comboCatalogosCuenca'){
          let cajaDeTexto =  $('.cuencaEspecifica');
          let btn = $('#btnCuencaClic');
          let valores = btn.attr('data-select') || '';

          cajaDeTexto.val(cajaDeTexto.val()+' '+evt.params.data.text.trim());

          btn.attr('data-select',valores+','+valor);

       }else if(tipoCatalogo == 'comboCatalogosApn'){

          let cajaDeTexto =  $('.areaNaturalProtegida');
          cajaDeTexto.val(cajaDeTexto.val()+' '+evt.params.data.text.trim());
         
          let btn = $('#btnApnClic');
          let valores = btn.attr('data-select') || '';

          btn.attr('data-select',valores+','+valor);
       }
       
   }).on('select2:unselect', function (evt) {
        let valor = String(evt.params.data.id);

        if(tipoCatalogo == 'comboCatalogosCuenca'){

          let cajaDeTexto =  $('.cuencaEspecifica');
          let btn = $('#btnCuencaClic');
          let valoresSeleccionados = btn.attr('data-select') || '';

          if(valoresSeleccionados.startsWith(',')) valoresSeleccionados = valoresSeleccionados.substr(1);

          let res = eliminaElementoSeleccionado(valoresSeleccionados.split(','),valor).join();

          btn.attr('data-select',res);
          

          cajaDeTexto.val(cajaDeTexto.val().replace(evt.params.data.text,'').trim());

      

       }else if(tipoCatalogo == 'comboCatalogosApn'){

          let cajaDeTexto =  $('.areaNaturalProtegida');
          let btn = $('#btnApnClic');
          let valoresSeleccionados = btn.attr('data-select') || '';

          if(valoresSeleccionados.startsWith(',')) valoresSeleccionados = valoresSeleccionados.substr(1);

          let res = eliminaElementoSeleccionado(valoresSeleccionados.split(','),valor).join();

          btn.attr('data-select',res);

          cajaDeTexto.val(cajaDeTexto.val().replace(evt.params.data.text,'').trim());
          
       }
   });

}

jQuery.validator.addMethod("valueNotEquals",
    function(value, element, arg) {
        return arg != value;
    }
);

jQuery.validator.addMethod("numeros",
    function(value, element) {
        return this.optional(element) || /^[0-9]+$/.test(value);
    });

jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    }
);

jQuery.validator.addMethod("empty",
    function(value, element) {
        return !/^\s*$/.test(value);
    }
);

jQuery.validator.addMethod("decimales",
    function(value, element) {
        return this.optional(element) || /^[0-9]{1,9}(\.[0-9]{2})+$/.test(value);
    }
);

function catalogos() {


    if (typeof(sessionStorage) == undefined || sessionStorage.length==0 || sessionStorage['catalogos'] == null) {
        cargaCatalogos(urlConexionCatalogos, 'getCatalogos', 'formularios.principal_info');
    }

    let comprueba = sessionStorage['catalogos'] || undefined;

    if(comprueba !=undefined && sessionStorage.length>0)
    {
        let objecto = JSON.parse(sessionStorage['catalogos']);

        $.each(objecto, function(index, value) {
            if (value.name_catalog == 'catalogos.tipotenenciatierra') {
                catalogosTipoTenencia = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.municipio') {
                catalogosMunicipio = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.cuenca') {
                catalogosCuenca = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.anp') {
                catalogosApn = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.aceptable_aprovechamiento') {
                catalogosAceptableAaprovechamiento = objecto[index].catalogo;
            } else if (value.name_catalog == 'catalogos.estatus') {
                catalogosEstatus = objecto[index].catalogo;
            } else if(value.name_catalog == 'catalogos.localidad'){
               catalogosLocalidades = objecto[index].catalogo;
            }else if(value.name_catalog == 'catalogos.region'){
               catalogosRegiones = objecto[index].catalogo;
            }

        });

    }

}


  catalogos();











