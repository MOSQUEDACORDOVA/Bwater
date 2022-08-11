const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook');
//var GoogleStrategy = require('passport-google-oauth20').Strategy;
var MixCloudStrategy = require('passport-mixcloud').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;



// Loca strategy - Login con credenciales propios
passport.use('local',
	new LocalStrategy(
		{
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback : true
		},
		async (req,email, password, done) => {
			console.log(req.body.proyect)
// Modelo a auntenticar
var Usuarios = "";
switch (req.body.proyect) {
	case 'PYT4':
		console.log("q")
		Usuarios = require('../models/PYT4/Usuarios');	
		break;
}
			try {
				const usuario = await Usuarios.findOne({
					where: {email}
				});
				if(!usuario.verifyPassword(password)) {
					return done(null, false, {
						message: 'Contraseña incorrecta'
					});
				}
				return done(null, usuario);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);

passport.use('cuponera',
	new LocalStrategy({
		usernameField: 'telefono',
		passwordField: 'pass',
		passReqToCallback : true
	},
		async (req,telefono, password, done) => {
			console.log(req.body)
// Modelo a auntenticar
var Clientes = "";
switch (req.body.proyect) {
	case 'PYT4':
		console.log("q")
		Clientes = require('../models/PYT4/Clientes');	
		break;
	default:
		break;
}
			try {
				const cliente = await Clientes.findOne({
					where: {telefono:telefono}
				});
				return done(null, cliente);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);
passport.use('referido',
	new LocalStrategy({
		usernameField: 'telefono',
		passwordField: 'ref',
		passReqToCallback : true
	},
		async (req,telefono, password, done) => {
			console.log(req.body)
// Modelo a auntenticar
		var Clientes = "";
		Clientes = require('../models/PYT4/Clientes');	
			try {
				const cliente = await Clientes.findOne({
					where: {telefono:telefono, referido_de: req.body.ref}
				});
				return done(null, cliente);
			}catch(err) {
				console.log(err)
				return done(null, false, {
					message: 'Esa cuenta no existe'
				});
			}
		}
	)
);

// Serializar el usuario
passport.serializeUser((usuario, callback) => {
	callback(null, usuario);
});

// Deserializar el usuario
passport.deserializeUser((usuario, callback) => {
	callback(null, usuario);
});

module.exports = passport;