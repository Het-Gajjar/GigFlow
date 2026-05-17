import express from "express";
import leadController from "./controller/lead.controller.js";
import checkAdmin from "./middleware/isAdmin.js";

const leadRouter = express.Router();

leadRouter.post("/create", checkAdmin, leadController.createTask);
leadRouter.get('/myTask', checkAdmin, leadController.getMyTask)
leadRouter.put('/updateTask/:id', checkAdmin, leadController.updateTask)
leadRouter.delete('/deleteTask/:id', checkAdmin, leadController.deleteTask)





export default leadRouter;