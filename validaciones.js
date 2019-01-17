/*
* METODOS DE VALIDACION
* Autor: Diego Loachamin
* Motivo:
* Los metodos de validaciones aqui detallados
* se realizan en base a la necesidad del negocio
* metodos de validacion:
*   datetimenow -> Permite obtener la fecha y hora actual del cliente
*   dateYear -> crea options para un select donde muestre los años desde 2000 - actual_año
*   datenow -> Obtiene la fecha actual del cliente
*   validarDocumento -> Permite la validacion del RUC/CEDULA publicos, privados, sociedades
*   validarEmail -> Valida el email mediante id de input
*   validarEmailAvanzado -> Valida email mediante el event
*   value_required -> inserta asterisco(*) color rojo para campos obligatorios
*   setInputFilter -> Permite validar solo numeros enteros
*   validar_formato_xls -> Permite validar los formatos definidos en la funcion (xsl/xslx, etc)
*/    






    /**
     * FUNCION DATETIME
     * Obtiene la fecha y hora actual del clientSide
     *  "2018-02-02 16:08:53"
     */    
    function datetimenow(){

       
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" +today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;
      
      return dateTime;
    }

    function dateYear(){
      
      var today = new Date();
      var actual = today.getFullYear();
      var inicio = 2000;
      total_años = actual - inicio;
      contador =0;
      option='';
      for(i=0; i<=total_años; i++){

        option_value = inicio+contador;
        option += '<option value="'+option_value+'">'+option_value+'</option>';
        contador = contador+1;
      }
      return option;
    }//end function 


    /**
     * FUNCION DATETIME
     * Obtiene la fecha y hora actual del clientSide
     * Ejemplo de retorno: "2018-02-02"
     */    
    function datenow(){

      var today = new Date();
      var date = today.getFullYear()+'-'+(("0" + (today.getMonth() + 1)).slice(-2))+'-'+today.getDate();

     return date;

   }//end function datenow



    /**
     * FUNCION VALIDAR DOCUMENTO
     * Permite validar ruc, cedula, 
     * sociedades publicas, privadas
     * uso: <input type="text" onblur="validarDocumento($(this).val())">
     *  la funcion se ejecuta en el evento onblur
     */
    function validarDocumento(numero) {          
  
    /* alert(numero); */
      var suma = 0;      
      var residuo = 0;      
      var pri = false;      
      var pub = false;            
      var nat = false;      
      var numeroProvincias = 22;                  
      var modulo = 11;
       
      /* Verifico que el campo no contenga letras */                  
      var ok=1;
      for (i=0; i<numero.length && ok==1 ; i++){
         var n = parseInt(numero.charAt(i));
         if (isNaN(n)) ok=0;
      }
      if (ok==0){
         swal("No puede ingresar caracteres en el número", "", "info");         
         return false;
      }
                  
      if (numero.length < 10 ){    
        swal("El número ingresado no es válido ", "", "info");
        // alert('El número ingresado no es válido');                  
         return false;
      }
     
      /* Los primeros dos digitos corresponden al codigo de la provincia */
      provincia = numero.substr(0,2);      
      if (provincia < 1 || provincia > numeroProvincias){           
         swal('El código de la provincia (dos primeros dígitos) es inválido', "", "info");
        return false;       
      }
      /* Aqui almacenamos los digitos de la cedula en variables. */
      d1  = numero.substr(0,1);         
      d2  = numero.substr(1,1);         
      d3  = numero.substr(2,1);         
      d4  = numero.substr(3,1);         
      d5  = numero.substr(4,1);         
      d6  = numero.substr(5,1);         
      d7  = numero.substr(6,1);         
      d8  = numero.substr(7,1);         
      d9  = numero.substr(8,1);         
      d10 = numero.substr(9,1);                
         
      /* El tercer digito es: */                           
      /* 9 para sociedades privadas y extranjeros   */         
      /* 6 para sociedades publicas */         
      /* menor que 6 (0,1,2,3,4,5) para personas naturales */ 
      if (d3==7 || d3==8){           
         swal('El tercer dígito ingresado es inválido', "", "info");                     
         return false;
      }         
         
      /* Solo para personas naturales (modulo 10) */         
      if (d3 < 6){           
         nat = true;            
         p1 = d1 * 2;  if (p1 >= 10) p1 -= 9;
         p2 = d2 * 1;  if (p2 >= 10) p2 -= 9;
         p3 = d3 * 2;  if (p3 >= 10) p3 -= 9;
         p4 = d4 * 1;  if (p4 >= 10) p4 -= 9;
         p5 = d5 * 2;  if (p5 >= 10) p5 -= 9;
         p6 = d6 * 1;  if (p6 >= 10) p6 -= 9; 
         p7 = d7 * 2;  if (p7 >= 10) p7 -= 9;
         p8 = d8 * 1;  if (p8 >= 10) p8 -= 9;
         p9 = d9 * 2;  if (p9 >= 10) p9 -= 9;             
         modulo = 10;
      }         
      /* Solo para sociedades publicas (modulo 11) */                  
      /* Aqui el digito verficador esta en la posicion 9, en las otras 2 en la pos. 10 */
      else if(d3 == 6){           
         pub = true;             
         p1 = d1 * 3;
         p2 = d2 * 2;
         p3 = d3 * 7;
         p4 = d4 * 6;
         p5 = d5 * 5;
         p6 = d6 * 4;
         p7 = d7 * 3;
         p8 = d8 * 2;            
         p9 = 0;            
      }         
         
      /* Solo para entidades privadas (modulo 11) */         
      else if(d3 == 9) {           
         pri = true;                                   
         p1 = d1 * 4;
         p2 = d2 * 3;
         p3 = d3 * 2;
         p4 = d4 * 7;
         p5 = d5 * 6;
         p6 = d6 * 5;
         p7 = d7 * 4;
         p8 = d8 * 3;
         p9 = d9 * 2;            
      }
                
      suma = p1 + p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9;                
      residuo = suma % modulo;                                         
      /* Si residuo=0, dig.ver.=0, caso contrario 10 - residuo*/
      digitoVerificador = residuo==0 ? 0: modulo - residuo;                
      /* ahora comparamos el elemento de la posicion 10 con el dig. ver.*/                         
      if (pub==true){           
         if (digitoVerificador != d9){                          
            swal('El ruc de la empresa del sector público es incorrecto.', "", "info");            
            return false;
         }                  
         /* El ruc de las empresas del sector publico terminan con 0001*/         
         if ( numero.substr(9,4) != '0001' ){                    
            swal('El ruc de la empresa del sector público debe terminar con 0001', "", "info");
            return false;
         }
      }         
      else if(pri == true){         
         if (digitoVerificador != d10){                          
            swal('El ruc de la empresa del sector privado es incorrecto.', "", "info");
            return false;
         }         
         if ( numero.substr(10,3) != '001' ){                    
            swal('El ruc de la empresa del sector privado debe terminar con 001', "", "info");
            return false;
         }
      }      
      else if(nat == true){         
         if (digitoVerificador != d10){                          
            swal('El número de cédula de la persona natural es incorrecto.', "", "info");
            return false;
         }         
         if (numero.length >10 && numero.substr(10,3) != '001' ){                    
            swal('El ruc de la persona natural debe terminar con 001', "", "info");
            return false;
         }
      }      
      return true;   
      
   }//end function validarDocumento
   
   


   /**************************************************/
   /********FUNCION VALIDAR EMAIL*********************/
   /*************************************************/

    function validarEmail(email) {

      expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if ( !expr.test(email) )
          swal("Error: Correo Incorrecto", "", "info");
  

    }//end function validarEmail



    // Establece  campos requeridos class="value_required"
    $( '<span style="color:red;">*</span>' ).insertBefore( ".value_required" );


    //Retornar mayusculas
    //ejemplo de uso <input type="text" class="uppercase">
    $(document).on('keyup', ".uppercase", function () {
      $(this).val(function (_, val) {
          return val.toUpperCase();
      });
    });

    //retorna letra capital
    //ejemplo de uso <input type="text" class="capitalize_input">
    $('.capitalize_input').on('keyup', function (e) {
      var txt = $(this).val();
      $(this).val(txt.replace(/^(.)|\s(.)/g, function ($1) {
        return $1.toUpperCase( );
      }));
    });


    /* VALIDAR SOLO NUMEROS ENTEROS */
    //ejemplo de uso <input type="text" class="only_int_numbers">
    $(".only_int_numbers").keypress (function (event) {
        if ((event.which < 32) || (event.which > 126)) return true; 
        return jQuery.isNumeric ($(this).val () + String.fromCharCode (event.which));
    });// numeric.keypress;


    /**
     * Permite obtener el token de django
     * 
     */
    function getCookie(name) {
      
      var cookieValue = null;
      if (document.cookie && document.cookie != '') {
          var cookies = document.cookie.split(';');
          for (var i = 0; i < cookies.length; i++) {
              var cookie = jQuery.trim(cookies[i]);
              // Does this cookie string begin with the name we want?
              if (cookie.substring(0, name.length + 1) == (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                  break;
              }
          }
      }
      //RETORNANDO EL TOKEN
      return cookieValue;

    }//end function getCookie



    function validar_fecha() {

        var input = document.getElementById("fecha_inicio");
        var fin = document.getElementById("fecha_fin");

        var today = new Date();
        // Set month and day to string to add leading 0
        var day = new String(today.getDate());
        var mon = new String(today.getMonth()+1); //January is 0!
        var yr = today.getFullYear();

          if(day.length < 2) { day = "0" + day; }
          if(mon.length < 2) { mon = "0" + mon; }

          var date = new String( yr + '-' + mon + '-' + day );

        input.disabled = false;
        input.setAttribute('min', date);
        fin.disabled = false;
        fin.setAttribute('min', date);

    }//end function validar_fecha

    
    /**
     * Permite controlar el formato
     * admitido en input type file ejemplo:
     * <input type="file" onchange="validar_formato_xls(this);">
     */
    function validar_formato_xls(sender){

        var validExts = new Array(".xlsx", ".xls");
        var fileExt = sender.value;
        fileExt = fileExt.substring(fileExt.lastIndexOf('.'));
        if (validExts.indexOf(fileExt) < 0) {
          //mensaje
          swal("Formato invalido " ,"Los formatos admitidos son: xls, xlsx  !!","warning");
          //null el input file
          $("#"+sender.id).val(null);
        }
        else return true;

    }//end function validar_formato

    
    //cambiar aspecto modal
    $('.modal').on('show.bs.modal', function (e) {
        $('.modal-header').attr('style','background-color: #367fa9;')
      
    }) 

   $('.modal').on('show.bs.modal', function (e) {
        $('.modal-footer').attr('style','background-color: #367fa9;')
      
    }) 
    
    
    //aplicar tema global admin-lte
    //$('.skin-blue').removeClass('skin-blue').addClass('skin-green');


    //cambiar el color btn grabar datos
    $('.btn-primary').removeClass('btn-primary').addClass('btn-default');

    //cambiar color btn salir
    $('.btn-danger').removeClass('btn-danger').addClass('btn-default');

  //btn_cerrarsesion
  window.addEventListener("load", function(){
    document.getElementById("btn_cerrarsesion").onclick = function(){
        //confirmacion salir del sistema
        swal({
          title: "Desea salir del sistema ?",
          text: "",
          icon: "info",
          buttons: ['No','Si'],
          dangerMode: true,
        })
        .then((willDelete) => {
          if (willDelete) {
            window.location.replace("/logout");
          } else {
            return false;
          }
        });
   
      }//end function onclick
  });
  //cerrar session




function callAjax(type, url, parameters, successCallback) {

    $.ajax({
        type: type,
        url: url,
        data: JSON.stringify(parameters),
        contentType: 'application/json;',
        dataType: 'json',
        success: successCallback,
        error: function(jqXHR, textStatus, errorThrown) {
        if (jqXHR.status === 0) {
          alert('Not connect: Verify Network');

          } else if (jqXHR.status == 404) {

            alert('Requested page not found [404] ');

          } else if (jqXHR.status == 500) {

            alert('Internal Server Error [500]');

          } else if (textStatus === 'parsererror') {

            alert('Requested JSON parse failed.');

          } else if (textStatus === 'timeout') {

          alert('Time out error');

          } else if (textStatus === 'abort') {
            alert('Ajax request aborted.');

          } else {
          alert('Uncaught Error: ' + jqXHR.responseText);
          }//end if 
    });

}//end function CallMethod
