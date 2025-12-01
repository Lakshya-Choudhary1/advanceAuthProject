import{Router} from "express"
import { signup ,login , logout, verifyEmail, forgotPassword ,resetPassword,checkAuth} from "../controllers/auth.controllers.js";
import {verifyToken} from "../middleware/verifyToken.js";
const authRoute = Router();


authRoute.get('/check-auth',verifyToken , checkAuth);

authRoute.post('/login',login);
authRoute.get('/logout',logout);
authRoute.post('/signup',signup);

authRoute.post('/verify-email',verifyEmail);

authRoute.post('/forgot-password',forgotPassword);
authRoute.post('/reset-password/:id',resetPassword);

export default authRoute;