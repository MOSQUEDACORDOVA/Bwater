const express = require('express')
const app = express()
const router = require('express').Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const authControllerPY4 = require('../controllers/authControllerpy4');
const dashboardControllerPY4 = require('../controllers/dashboardControllerPY4');
const apiControllerPY4 = require('../controllers/apiPY4');
const maquilaControllerPY4 = require('../controllers/maquilaControllerPY4');
const landingController = require('../controllers/landingController');
const passport = require('passport');

const FileController4 = require('../models/PYT4/upload');
const fileController4 = new FileController4();

// Landing Page
router.get('/', landingController.showLandingPage);

//router.get('//:msg', landingController.showLandingPage);

// Iniciar sesión
router.get('/login', userController.formLogin);
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: 'Usuario o clave invalido.' }), userController.logintemp);

// Cerrar Sesión
router.get('/close-session', userController.closeSesion);

//CUPONERA
router.get('/intro_cuponera', dashboardControllerPY4.introCup);
router.get('/intro_cuponera/:crea', dashboardControllerPY4.introCup);
router.get('/log_cuponera/:registrado', dashboardControllerPY4.introCup);
router.get('/log_cupon/:msg', dashboardControllerPY4.introCup);
router.post('/session_cuponera', dashboardControllerPY4.sessionCuponera);
router.get('/cuponera', authControllerPY4.authenticatedCliente, dashboardControllerPY4.introCupValidate);
router.get('/cuponera/:cat', authControllerPY4.authenticatedCliente, dashboardControllerPY4.introCupValidate);
router.post('/usar_cupon', dashboardControllerPY4.usar_cupon);
router.post('/save_cliente_cuponera', dashboardControllerPY4.save_cliente_cuponera);

//REFERIDOS
router.get('/crea_codigo_ref/:id_referido', dashboardControllerPY4.crea_codigo_ref);
router.get('/referido-bwater/:id_referido', dashboardControllerPY4.formRegReferidos);
router.get('/referido-bwater-exist/:id_referido/:msg', dashboardControllerPY4.formRegReferidos);
router.post('/save_cliente_referido', dashboardControllerPY4.save_cliente_referido);
router.get('/home-referido', authControllerPY4.authenticatedClienteReferido, dashboardControllerPY4.home_referidos);
router.post('/login-referido', dashboardControllerPY4.sessionReferido);
router.post('/reg_pedido_referido', authControllerPY4.authenticatedClienteReferido, dashboardControllerPY4.regPedidoReferido);

//NOTIFICACIONES
router.get('/notificaciones_panel', authControllerPY4.authenticatedUser, dashboardControllerPY4.notificaciones_table);


// Dashboard
router.post('/upload-file', fileController4.subirArchivo);
router.get('/errorpy4/:msg', dashboardControllerPY4.error);
router.get('/errorpy4Cuponera/:msg', dashboardControllerPY4.errorCuponera);
router.get('/py4/:id', dashboardControllerPY4.login);
router.get('/homepy4', authControllerPY4.authenticatedUser, dashboardControllerPY4.dashboard);
router.get('/homepy4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.dashboard);
router.get('/prestadospy4', authControllerPY4.authenticatedUser, dashboardControllerPY4.prestados);
router.get('/prestadospy4-2', authControllerPY4.authenticatedUser, dashboardControllerPY4.prestados);
router.get('/loginpy4', dashboardControllerPY4.login);
router.get('/registerpy4/:id', dashboardControllerPY4.register);
router.post('/cambiar_sucursal', dashboardControllerPY4.change_sucursal);



router.get('/historyobserpy4/:clienteId',authControllerPY4.authenticatedUser, dashboardControllerPY4.getHistorialObservaciones);
router.post('/saveObservacionClientePy4',authControllerPY4.authenticatedUser, dashboardControllerPY4.saveHistorialObservaciones);
router.get('/delete_observacionpy4/:id',authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_observacionpy4);
router.get('/array_pedidoPy4', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidos);
router.post('/array_pedidoPy4', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidos);
router.get('/getPedidosbyDaypy4/:diainicio/:diafin', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidospordia);
router.get('/obtenerPedidosReprogramados/:dia', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidosReprogramados);
router.get('/obtenerPedidosVentaRango/:diainicio/:diafin', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidosVentaRango);
router.get('/obtenerPedidosReferidoEntregado/:id_', authControllerPY4.authenticatedUser, dashboardControllerPY4.obtenerPedidosReferidoEntregado);
//PYT-4 
//ZONAS
router.get('/obtenerzonaspy4', dashboardControllerPY4.obtener_zonas);
//**REPORTES */
router.get('/reportes', dashboardControllerPY4.reportes);
router.get('/obetenerdatosgeneralesreportes', dashboardControllerPY4.gerenalReportes);
router.get('/getGastosLit', authControllerPY4.authenticatedUser, dashboardControllerPY4.getGastosLit);
router.post('/createGasto', authControllerPY4.authenticatedUser, dashboardControllerPY4.createGasto);
router.get('/delete_gasto/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.deleteGasto);
router.post('/getGastobyId', authControllerPY4.authenticatedUser, dashboardControllerPY4.getGastobyId);
router.post('/updategasto', authControllerPY4.authenticatedUser, dashboardControllerPY4.updategasto);
//personal
router.get('/personal_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.personal_table);
router.get('/personal_py4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.personal_table);
router.post('/save_personal_py4', dashboardControllerPY4.save_personal);
router.get('/delete_personal/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_personal);
router.post('/editar_personal_id', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_personal);

router.post('/save_personal_py4_edit', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_personal_py4);
router.get('/enordesPersonal/:id/:estado', authControllerPY4.authenticatedUser,dashboardControllerPY4.newEstadoPersonal);

router.get('/editar_usuario/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_usuarios);
router.post('/editar_usuario', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_usuarios);
router.post('/save_usuarios_py4_edit', dashboardControllerPY4.save_usuarios_py4);
router.post('/cambia_pass', dashboardControllerPY4.cambia_pass);

//sucursales
router.get('/sucursales_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.sucursales);
router.get('/sucursales_py4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.sucursales);
router.post('/save_sucursal_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_sucursal);
router.get('/delete_sucursales/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_sucursales);
router.get('/editar_sucursales/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_sucursales);
router.post('/editar_sucursales', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_sucursales);
router.post('/editar_sucursales_save', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_sucursales_save);

//carga inicial
router.get('/carga_inicial_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.carga_inicial);
router.get('/carga_inicial_py4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.carga_inicial);
router.post('/save_carga_init_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_carga_inicial);
router.post('/save_recarga_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_recarga);
router.get('/delete_cargapy4/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_carga);
//ASIGNAR CHOFER
router.post('/save_asig_chofer_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_asignar_chofer);
router.get('/delete_asig_chofer/:id', authController.authenticatedUser, dashboardControllerPY4.delete_asignar_chofer);
router.post('/editar_asig_chofer', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_asig_chofer);
router.post('/save_asig_chofer_edit', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_asignar_chofer_edited);

//Cupones
router.get('/promociones_bw', authControllerPY4.authenticatedUser, dashboardControllerPY4.getCupones);
router.get('/promociones_bw/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.getCupones);
router.post('/crear_cupones', authController.authenticatedUser, dashboardControllerPY4.save_cupon);
router.post('/edit_cupon_id', authController.authenticatedUser, dashboardControllerPY4.editCupon);
router.post('/editar_cupones', authController.authenticatedUser, dashboardControllerPY4.saveCuponEdited);
router.get('/borrar_cupon/:id', authController.authenticatedUser, dashboardControllerPY4.deleteCupon);
router.post('/usar_cupon', dashboardControllerPY4.usar_cupon);

//vehiculos
router.get('/vehiculos_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.vehiculos_table);
router.get('/vehiculos_py4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.vehiculos_table);
router.post('/save_vehiculo_py4', dashboardControllerPY4.save_vehiculos);
router.get('/delete_vehiculos/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_vehiculos);
router.post('/editar_vehiculos', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_vehiculos);
router.post('/save_vehiculos_py4_edit', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_vehiculos_py4);


//CP
router.post('/consultaCP', dashboardControllerPY4.consultaCP);
router.post('/save_cp_new', dashboardControllerPY4.save_cp_new);
//corte
router.get('/corte_py4', authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corteday_py4/:day', authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);
router.get('/corte_py4/:msg', authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_table);

//pedido
router.get('/delete_pedido/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_pedido);
router.get('/editar_pedido/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_pedido);
router.post('/editar_pedido', authControllerPY4.authenticatedUser, dashboardControllerPY4.editar_pedido);



router.get('/delete_cliente/:id', authControllerPY4.authenticatedUser,dashboardControllerPY4.delete_cliente);
router.post('/editar_cliente_id', authControllerPY4.authenticatedUser,dashboardControllerPY4.editar_cliente);
router.get('/cambiaS_pedido/:id/:status', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiaS_pedido);
router.post('/cambiaS_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiaS_pedido);
router.post('/cambia_M_pago', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_M_pago);
router.post('/change_chofer_pedido', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambiachofer_pedido);
router.get('/enordesClient/:id/:estado', authControllerPY4.authenticatedUser,dashboardControllerPY4.newEstadoCliente);
router.post('/cambia_titulo_cliente', authControllerPY4.authenticatedUser,dashboardControllerPY4.cambia_titulo_cliente);

router.get('/cambia_S_pago/:id/:status', authControllerPY4.authenticatedUser, dashboardControllerPY4.cambia_S_pago);
router.post('/cambia_S_pago', authControllerPY4.authenticatedUser, dashboardControllerPY4.cambia_S_pago);
router.post('/verificar_deuda', authControllerPY4.authenticatedUser, dashboardControllerPY4.verifica_deuda_pedido);
router.get('/verificar_deudaT', authControllerPY4.authenticatedUser, dashboardControllerPY4.verifica_deudores);
router.post('/cambia_S_pago_deudor', authControllerPY4.authenticatedUser, dashboardControllerPY4.cambia_S_pago_deudor);

//CopyClipboard
router.get('/ChangeshareStatusPY4/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.ChangeshareStatusPY4);
router.get('/shareStatusPY4', authControllerPY4.authenticatedUser, dashboardControllerPY4.shareStatusPY4);

router.get('/clientesBwater', authControllerPY4.authenticatedUser, dashboardControllerPY4.clientesPage);
router.get('/clientesBwater/:mensaje', authControllerPY4.authenticatedUser, dashboardControllerPY4.clientesPage);
// Etiquetas
router.post('/save_etiqueta', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_etiquetas);
router.get('/delete_etiqueta/:id', authControllerPY4.authenticatedUser, dashboardControllerPY4.delete_etiqueta);

router.get('/actualizar_devueltos/:id_chofer/:cantidad/:id_cliente/:fecha', authControllerPY4.authenticatedUser, dashboardControllerPY4.corte_prestados_table);

// Cerrar Sesión
router.get('/logoutpy4', dashboardControllerPY4.closeSesion);
router.get('/logout_cuponera', dashboardControllerPY4.closeSesioncuponera);
//post
router.post('/loginpyt4', dashboardControllerPY4.sesionstart);
router.post('/save_cliente_py4', dashboardControllerPY4.save_cliente_py4);

router.post('/registrar_usuario', dashboardControllerPY4.reguserPy4);
router.post('/reg_pedido_modal', dashboardControllerPY4.regPedidoPy4);
router.post('/editar_pedido_save', authControllerPY4.authenticatedUser, dashboardControllerPY4.Save_editPedidoPy4);
router.post('/editar_cliente', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_cliente_edit);
router.post('/ad_tag_cliente', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_cliente_edit_tag);
router.post('/change_zone_client', authControllerPY4.authenticatedUser, dashboardControllerPY4.cambia_zona_client);
router.post('/editar_cliente_id_cuponera', authControllerPY4.authenticatedUser, dashboardControllerPY4.save_cliente_edit_cupon);

/** HERE INIT MAQUILA**/
router.get('/maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.maquila_principal);
router.get('/maquila/:msg', authControllerPY4.authenticatedUser, maquilaControllerPY4.maquila_principal);
router.get('/maquila-qr/:id_cliente', authControllerPY4.authenticatedQR, maquilaControllerPY4.maquila_principal);
router.post('/save-cliente-maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.save_clientes_maquila);
router.get('/delete_cliente_maquila/:id', authControllerPY4.authenticatedUser, maquilaControllerPY4.delete_cliente_maquila);
router.post('/editar_cliente_manila', authControllerPY4.authenticatedUser, maquilaControllerPY4.edit_cliente_manila);
router.post('/save-edit-cliente-maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.save_cliente_edit);

router.post('/reg-pedido-maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.save_pedido_maquila);
router.post('/editar_pedido_maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.editar_pedido_maquila);
router.get('/delete_pedido_maquila/:id', authControllerPY4.authenticatedUser, maquilaControllerPY4.delete_pedido_maquila);
router.post('/save-edit-pedido-maquila', authControllerPY4.authenticatedUser, maquilaControllerPY4.save_pedido_edit);

router.get('/ventas-del-dia/:dia_select', authControllerPY4.authenticatedUser, maquilaControllerPY4.ventas_del_dia);

/**API - APP MOVIL */
router.get('/app-home', dashboardControllerPY4.appHome);
router.get('/app-login', dashboardControllerPY4.appLogin);
router.get('/app-pedido', dashboardControllerPY4.appPedido);

router.get('/api/obtenerPedidos/:personalId', apiControllerPY4.obtenerPedidos);
router.get('/api/obtenerPedidos/:personalId/:day', apiControllerPY4.obtenerPedidos);
router.post('/app-loginpyt4', apiControllerPY4.sesionstart);

/* ---FIN PY4---  */


module.exports = router;