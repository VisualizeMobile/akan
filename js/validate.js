/*global jQuery:false */
jQuery(document).ready(function($) {
"use strict";

	//Contact
	$('#btn-submit').click(function(){
		var ferror = false, 
		emailExp = /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i;
        
		$(document).find('.input-textfield').each(function(){ // run all inputs
            console.log('11');
			var i = $(this); // current input
			var rule = i.attr('data-rule');

			if( rule !== undefined ){
			var ierror=false; // error flag for current input
			var pos = rule.indexOf( ':', 0 );
			if( pos >= 0 ){
				var exp = rule.substr( pos+1, rule.length );
				rule = rule.substr(0, pos);
			}else{
				rule = rule.substr( pos+1, rule.length );
			}
			
			switch( rule ){
				case 'required':
				if( i.val()==='' ){ ferror=ierror=true; }
				break;
				
				case 'maxlen':
				if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
				break;

				case 'email':
				if( !emailExp.test(i.val()) ){ ferror=ierror=true; }
				break;

				case 'checked':
				if( !i.attr('checked') ){ ferror=ierror=true; }
				break;
				
				case 'regexp':
				exp = new RegExp(exp);
				if( !exp.test(i.val()) ){ ferror=ierror=true; }
				break;
			}
				i.next('.validation').html( ( ierror ? (i.attr('data-msg') !== undefined ? i.attr('data-msg') : 'Entrada errada') : '' ) ).show('blind');
			}
		});
        
		$(document).find('.input-textarea').each(function(){ // run all inputs

			var i = $(this); // current input
			var rule = i.attr('data-rule');

			if( rule !== undefined ){
                var ierror=false; // error flag for current input
                var pos = rule.indexOf( ':', 0 );
                if( pos >= 0 ){
                    var exp = rule.substr( pos+1, rule.length );
                    rule = rule.substr(0, pos);
                }else{
                    rule = rule.substr( pos+1, rule.length );
                }

                switch( rule ){
                    case 'required':
                    if( i.val()==='' ){ ferror=ierror=true; }
                    break;

                    case 'maxlen':
                    if( i.val().length<parseInt(exp) ){ ferror=ierror=true; }
                    break;
                }
                    i.next('.validation').html( ( ierror ? (i.attr('data-msg') != undefined ? i.attr('data-msg') : 'Entrada errada') : '' ) ).show('blind');
			}
		});
        
		if(ferror == false) {
            var form_message = "NOME = " + $('#form-name').val() + "<br/>"
                                + "E-MAIL = " + $('#form-email').val() + "<br/>"
                                + "ASSUNTO = " + $('#form-subject').val() + "<br/><br/>"
                                + "------------------------------------------------------------------------------------------------------------------------------------ <br/> <br/>"
                                + $('#form-message').val().replace(/\r\n|\r|\n/g,"<br/>") + "<br/> <br/>"
                                + "------------------------------------------------------------------------------------------------------------------------------------ <br/> <br/>";
                
            $.ajax({
                type: "POST",
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                data: {
                    'key': 'Mt0tQQjbVGoIOxeIDItIkw',
                    'message': {
                      'from_email': $('#form-email').val(),
                      'to': [
                          {
                            'email': 'equipevisualizemobile@gmail.com',
                            'type': 'to'
                          }
                        ],
                      'autotext': 'true',
                      'subject': "[CONTATO-WEB] " + $('#form-name').val() + " - " + $('#form-subject').val(),
                      'html': form_message
                    }
                }
          }).done(function() {
            $("#sendmessage").show('blind');        
            $("#sendmessage").delay(10000).hide('blind'); 
            $('html,body').animate({scrollTop: $("#sendmessage").offset().top - 100}, 'slow');
            
//            $(document).find('.input-textfield').each(function() {
//                $(this).val('');
//            });
//            $(document).find('.input-textarea').each(function() {
//                $(this).val('');
//            });
          }).fail(function() {
            alert( "Erro ao enviar o e-mail. Verifique sua conexão com a internet ou tente novamente mais tarde.");
          });
            

        }    
	});

});