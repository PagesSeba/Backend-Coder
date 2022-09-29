import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import twilio from "twilio";
import { sendEmailToAdmin } from "../utils/messages.js";
import logger from "../loggers.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getHome = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/views/home.html"));
};

const getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/views/login.html"));
};

const getRegister = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/views/signup.html"));
};

const getFailLogin = (req, res) => {
  res.render("login-error", {});
};

const getFailRegister = (req, res) => {
  res.render("signup-error", {});
};

const getProduct = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/views/itemDetail.html"));
};

const getCart = (req, res) => {
  res.sendFile(path.join(__dirname, "../../client/views/cart.html"));
};

const getProfile = (req, res) => {
  res.render("profile", { user: req.session.passport.user });
};

const sendMessage = async (req, res) => {
  const carrito = JSON.parse(req.body.cart);
  const user = req.session.passport.user;
  let message = `Nuevo pedido de ${user.username}\nEmail: ${user.email}\nProductos solicitados:\n`;
  for (let i = 0; i < carrito.length; i++) {
    message += `${carrito[i].title}  $${carrito[i].price}\n`;
  }
  const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
  const options = {
    body: message,
    from: "whatsapp:+14155238886",
    to: `whatsapp:+${process.env.GEO}9${process.env.NUM}`,
  };
  const optionsClient = {
    body: "Su pedido ha sido registrado con exito.\nFur-Cor",
    from: "+15392454158",
    to: `+${process.env.GEO}${user.phoneNumber}`,
  };
  try {
    // E-mail al admin
    await sendEmailToAdmin(
      message,
      `Nuevo pedido de ${user.username}\nEmail: ${user.email}`
    );
    // WhatsApp al admin
    await client.messages.create(options);

    //Mensaje al cliente
    await client.messages.create(optionsClient);
  } catch (error) {
    logger.error(error);
  }
};

export const clientController = {
  getHome,
  getProduct,
  getLogin,
  getRegister,
  getFailLogin,
  getFailRegister,
  getCart,
  getProfile,
  sendMessage,
};
