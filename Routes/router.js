import express from "express";
import { getAllUsers,registerUser,getSingleUser, deleteUser, updateUser } from "../Controllers/userController.js";

const router=new express.Router();


//User Routes==========================================

router.get("/api/user/getAllUsers",getAllUsers);
router.post("/api/user/register",registerUser);
router.get("/api/user/getSingleUser/:id",getSingleUser);
router.get("/api/user/updateUser/:id",updateUser);
router.delete("/api/user/deleteUser/:id",deleteUser);

export default router;