import express, { Router } from "express";

import operations from "../controllers/operations.controller";

const router: Router = express.Router();

/**
 * Gets all data from a table.
 */
router.get("/:tableName/:collection?", operations.getFromTable);

/**
 * Inserts data into a table.
 */
router.post("/:tableName/:collection?", operations.insertIntoTable);

/**
 * Updates data in a table.
 */
router.put("/:tableName/:collection?", operations.updateTable);

/**
 * Deletes data from a table.
 */
router.delete("/:tableName/:collection?", operations.deleteFromTable);

export default router;
