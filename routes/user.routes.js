import { Router } from "express";
import { registerUser ,loginUser,deleteUser,updateAccount} from "../controllers/user.controllers.js";
import { getUserId } from "../middlewares/auth.middleware.js";
const router=Router();
console.log("the registeruser is ",registerUser)
router.route('/register').post(registerUser);
router.route('/login').post(getUserId,loginUser);
router.route('/delete').post(getUserId,deleteUser);
router.route('/update').post(getUserId,updateAccount);
export default router;

