const passport = require("passport");
const router = require("express").Router();
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt-nodejs");
const Op = Sequelize.Op;
const crypto = require("crypto");

// Formulario de inicio de sesión
exports.formLogin = (req, res) => {
  const { error } = res.locals.messages;
  res.render("login", {
    pageName: "Login",
    layout: "page-form",
    error,
  });
};

exports.formLoginBack = (req, res) => {
  const { error } = res.locals.messages;
  var product = req.params.product;
  var monto = req.params.monto;
  var modo = req.params.modo;
  console.log(modo);

  res.render("login_back", {
    pageName: "Login",
    layout: "page-form",
    modo,
    monto,
    product,
    error,
  });
};

// Iniciar sesión
exports.loginUser = passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  badRequestMessage: "Ambos campos son obligatorios",
});

exports.logintemp = (req, res) => {
  console.log(req.user.tipo);
  let tipo = req.user.tipo  
  if (tipo == 'Empresa') {
    res.redirect('/dashboard')
  }
  if (tipo == 'Cliente') {
    res.redirect('/dash_cliente')
  }
  if (tipo == 'Administrador') {
    res.redirect('/dashboard')
  }
       
};

exports.forgot_password = (req, res) => {
  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
  });
};

// Formulario de registro
exports.formCreateUser = (req, res) => {
  res.render("register", {
    pageName: "Registrate",
    layout: "page-form",
  });
};
exports.formCreateUser_client = (req, res) => {
  res.render("reg_cliente", {
    pageName: "Registrate",
    layout: "page-form",
  });
};
exports.formCreateUser_empres = (req, res) => {
  res.render("reg_empresa", {
    pageName: "Registrate",
    layout: "page-form",
  });
};

// Crear usuario en la base de datos
exports.createUser = async (req, res) => {
  const { name_, email_, password, confirmPassword } = req.body;
  
  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("reg_admin", {
      pageName: "Registrate",
      dashboardPage: true,
      logo:true, 
      crea_usuario:true,
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name: name_, email: email_, password: password, tipo: 'Administrador'
    });

    res.redirect("/usuarios_a");
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("register", {
      dashboardPage: true,
      logo:true, 
      crea_usuario:true,
      messages: req.flash(),
    });
  }
};

exports.createUser_client = async (req, res) => {
  const { name_client,  email_client, password, confirmPassword, bank_id,cuenta_num } = req.body;

  // La contraseña y cofirmar contraseña no son iguales
  if (password !== confirmPassword) {
    req.flash("error", "Las contraseñas no son iguales");

    return res.render("reg_cliente", {
      pageName: "Registro Cliente",
      layout: "page-form",
      messages: req.flash(),
    });
  }
  try {
    await Usuarios.create({
      name: name_client, email: email_client, password: password, banco: bank_id,cuenta: cuenta_num, tipo: 'Cliente'
    });

    res.redirect("/login");
  } catch (err) {
    console.log(err);
    if (err.errors) {
      req.flash(
        "error",
        err.errors.map((error) => error.message)
      );
    } else {
      req.flash("error", "Error desconocido");
    }
    res.render("reg_cliente", {
      pageName: "Registrate",
      layout: "page-form",
      messages: req.flash(),
    });
  }
};

// Actualizar usuario en la base de datos
exports.UpdateUser = async (req, res) => {
  let tipo = req.user.tipo;
  console.log(tipo)
  let dash_cliente = false
  if (tipo  == "Cliente") {
    dash_cliente = true
  }
  const {
    photo1,
userid,
name,
email,
new_password,
confirm_password,
  } = req.body;

  if (!new_password && !confirm_password) {
    UpdUser.actualizarUser(userid, name, email, photo1)
      .then(() => {
        //console.log(result);
      })
      .catch((err) => {
        return res.status(500).send("Error actualizando" + err);
      });
    //redirect('/dashboard');
    const usuario = await Usuarios.findOne({ where: { email } });
    // "user" is the user with newly updated info
    //const user = res.locals.user;
    console.log(req.user);
    req.user.name = name;
    req.user.email = email;
    req.user.photo = photo1;
    console.log(req.user.name);
    if (tipo == 'Empresa') {
      res.redirect('/dashboard')
    }
    if (tipo == 'Administrador') {
      res.redirect('/dashboard')
    }
    if (tipo == 'Cliente') {
      res.redirect('/dash_cliente')
    }
  } else {
    if (new_password !== confirm_password) {
      req.flash("error", "Las contraseñas no son iguales");

      return res.render("micuenta", {
        pageName: "Actualizar Perfil",
        dashboardPage: true,
        dash_cliente,
        messages: req.flash(),
      });
    } else {
      var  e_new_password = bcrypt.hashSync(new_password, bcrypt.genSaltSync(10));
      UpdUser.actualizarpassW(userid, e_new_password)
        .then(() => {})
        .catch((err) => {
          return res.status(500).send("Error actualizando" + err);
        });
      //redirect('/dashboard');
      const usuario = await Usuarios.findOne({ where: { email } });
      if (tipo == 'Empresa') {
        res.redirect('/dashboard')
      }
      if (tipo == 'Cliente') {
        res.redirect('/dash_cliente')
      }
      if (tipo == 'Administrador') {
        let msg = "Se actualizó el usuario con éxito"
        res.redirect('/usuarios_a/'+ msg)
      }
    }
  }
};

// Formulario de buscar cuenta
exports.formSearchAccount = (req, res) => {
  res.render("search-account", {
    pageName: "Buscar Cuenta",
    layout: "page-form",
  });
};

// Enviar token si el usuario es valido
exports.sendToken = async (req, res) => {
  // verificar si el usuario existe
  const { email } = req.body;
  const usuario = await Usuarios.findOne({ where: { email } });

  if (!usuario) {
    req.flash("error", "No existe esa cuenta");
    res.redirect("/search-account");
  }

  // Usuario existe
  usuario.token = crypto.randomBytes(20).toString("hex");
  usuario.expiration = Date.now() + 3600000;

  // Guardarlos en la BD
  await usuario.save();

  // Url de reset
  const resetUrl = `https://${req.headers.host}/search-account/${usuario.token}`;

  res.redirect("/resetpass/" + usuario.token + "/" + email);
  console.log(resetUrl);
};

exports.resetPasswordForm = async (req, res) => {
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
    },
  });

  // no se encontro el usuario
  if (!usuario) {
    req.flash("error", "No válido");
    res.redirect("/search-account");
  }

  // Formulario para generar password
  res.render("reset-password", {
    pageName: "Restablecer contraseña",
    layout: "page-form",
  });
};

// Cambiar el password
exports.updatePassword = async (req, res) => {
  // Verifica token y fecha de expiracion-
  const usuario = await Usuarios.findOne({
    where: {
      token: req.params.token,
      expiration: {
        [Op.gte]: Date.now(),
      },
    },
  });

  if (!usuario) {
    req.flash("error", "No valido");
    res.redirect("search-account");
  }

  // Hashear el password
  usuario.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
  usuario.token = null;
  usuario.expiration = null;

  // Guardamos el nuevo password
  await usuario.save();

  req.flash("success", "Tu contraseña se modifico correctamente");
  res.redirect("/login");
};

// Cerrar sesión
exports.closeSesion = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};



exports.upload = function (req, res) {
  res.render("upload", {
    title: "ejemplo de subida de imagen por HispaBigData",
  });
};
