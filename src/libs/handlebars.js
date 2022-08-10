var moment = require('moment'); // require
module.exports = {
	showAlerts: (message = {}, alerts) => {
		const categoria = Object.keys(message);
		console.log(categoria)
		let html = '';

		if(categoria.length) {
			html += '<div class="form-message-container">';
			message[categoria].forEach(error => {
				html += `<p class="form-message form-message-${categoria}">${error}</p>`;
			});
			html += '</div>';
		}

		return alerts.fn().html = html;
	},
	showCurrentMembership: (str1, str2) => {
		if(str1 === str2) {
			return '(actual)';
		}
	},
	showBtnMembership: (str1, str2, btnClass, url, monto, modo) => {
		if(str1 !== str2) {
			return `
			<form action="${url}" method="post">
			<input type="hidden"   name="amount" value="${monto}" id="monto_plan">
			<input type="hidden"   name="modo" value="${modo}" id="modo_plan">
			<input type="hidden"   name="product" value="${str2}" id="tipo_plan">
			<input type="submit"   class="btn btn-block btn-${btnClass}" value="Obtener Plan">
			</form>
			`;
		}
	},

	// --------PY4
	video_img: (fotos) => {

		var formato = fotos.split(".");
		 var out = "";
				console.log(formato)
				if (formato[1] == "mp4" || formato[1] == "ogg" || formato[1] == "webm") {
					out+=	`<video src="../../../dataPY4/img_upload/${fotos}" controls class="video-cu">
					Tu navegador no admite el elemento <code>video</code>.
				  </video> `
				}else{
				   out+=	`	
				   <img src="../../../dataPY4/img_upload/${fotos}"/ class="img-fluid"
				   style="height: 17rem;width:100%">` 
				}
		// console.log(aux[0])
		 return out;
		},
			formatoFecha2: (fecha, user) => {
				var fecha_dia =moment(fecha).locale('es').format("dddd, Do MMMM  YYYY");

						//console.log(fecha_)
					 return fecha_dia;
					},
					formatoFecha: (fecha, user) => {
						const f = new Date(fecha);
						f.toLocaleString()
						 
						var Anyo = f.getFullYear();
						var Mes = ('0' + (f.getMonth()+1)).slice(-2)
						var Dia = f.getDate();
							var fecha_ = Anyo+ '-'+Mes+ '-'+Dia
							
							//console.log(fecha_)
						 return fecha_;
						},
			estadoCupon: (fecha, cantidad) => {
					const f = new Date(fecha);
						Hoy = new Date();

					var estado = "";
					if (Hoy > f) {
						estado = "Caducado"
					}else if (cantidad == 0){
						estado = "Agotado"
					}else{
						estado = "Activo"
					}
						

					 return estado;
			},

			ColorSucursal: (sucursal) => {
				var color = "";
				
				if (sucursal == "Principal" || sucursal == "Activa") {
					color = "green"
				}if(sucursal == "Inactiva" ){
					color = "orange"
				}
				else{
					color = "#06cc60"
				}
				return color;
		},
		mathposition: (posicion) => {
			
			return posicion+1;
	},	
	breaklines: (text) => {
		text = text.replace(/(\r\n|\n|\r)/gm, '<br>');
		return text;
},
	
}