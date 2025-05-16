import { Router } from "express";
import { getAuditorias } from "../controllers/auditoria";


const router = Router();

router.get("/home", getAuditorias);

router.get("/sign-in", (req, res) => {
  res.send("El singin");
});

router.post("/register", (req, res) => {
  res.send("El register");
});


router.post("/crear-auditoria", (req, res) => {
  res.send("El home");
});
Router.use(express.json());