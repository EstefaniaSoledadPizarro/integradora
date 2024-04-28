import { Router } from "express";
import { productManagerDB } from "../dao/productManagerDB.js";
import messageManagerDB from "../dao/messageManagerDB.js";
import cartManagerDB from "../dao/cartManagerDB.js";

const router = Router();
const productService = new productManagerDB();
const cartService = new cartManagerDB();

router.get("/", (req, res) => {
  res.render("home", {
    title: "Home",
    style: "index.css",
  });
});

router.get("/register", (req, res) => {
  if (req.session.user) {
    res.redirect("/user");
  }
  res.render("register", {
    title: "Register",
    style: "index.css",
    failRegister: req.session.failRegister ?? false,
  });
});

router.get("/user", async (req, res) => {
  try {
    const userId = req.session.user._id;
    const user = await userModel.findById(userId).populate("cart").lean();
    res.render("user", {
      title: "Usuario",
      style: "index.css",
      user: req.session.user,
      cart: user.cart?.products || [],
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/products", async (req, res) => {
  let { limit = 5, page = 1 } = req.query;

  res.render("products", {
    title: "Productos",
    style: "index.css",
    products: await productService.getAllProducts(limit, page),
  });
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realTimeProducts", {
    title: "Productos",
    style: "index.css",
    products: await productService.getAllProducts(),
  });
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await messageManagerDB.getAllMessages();
    res.render("messageService", {
      title: "Chat",
      style: "index.css",
      messages: messages,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/cart", async (req, res) => {
  const cartId = req.params.cid;
  try {
    const cart = await cartService.getProductsFromCartByID(cartId);
    res.render("cart", {
      title: "Cart",
      style: "index.css",
      cartId: cartId,
      products: cart.products,
      user: req.user,
    });
  } catch (error) {
    console.error(error);
  }
});

export default router;
