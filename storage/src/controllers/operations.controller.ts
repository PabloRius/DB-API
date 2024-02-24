import { Request, Response, NextFunction } from "express";

import { IConnector, getConnector } from "../connectors/IConnector";
import {
  DeletePayload,
  InsertPayload,
  Join,
  SelectPayload,
  UpdatePayload,
} from "../models/Payload";

const databaseType = process.env.DATABASE_TYPE || "mongodb";
const databaseConnector: IConnector = getConnector(databaseType);

/**
 * Inserts data into a table.
 * @param req
 * @param res
 * @param next
 */
async function insertIntoTable(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get the table name and data from the request
    const tableName = req.params.tableName;
    const data = req.body;

    // create a InsertPayload object
    const payload: InsertPayload = {
      tableName: tableName,
      columns: Object.keys(data),
      values: [Object.values(data)],
    };

    // insert the data
    await databaseConnector.connect();
    await databaseConnector.insert(payload);
    await databaseConnector.disconnect();

    // return a 201 CREATED status
    res.status(201).json({});
  } catch (error) {
    next(error);
  }
}

/**
 * Gets all data from a table.
 * @param req
 * @param res
 * @param next
 */
async function getFromTable(req: Request, res: Response, next: NextFunction) {
  try {
    // get the table name and data from the request
    const tableName = req.params.tableName;
    const data = req.query;

    // check if the request contains a fields query parameter
    let fields: string[] | undefined;
    if (data.fields) {
      fields = data.fields.toString().split(",");
    }

    // check if the request contains a condition query parameter
    let condition: string | undefined;
    if (data.condition) {
      condition = data.condition.toString();
    }

    // check if the request contains a joins query parameter
    let joins: Array<any> = [];
    if (data.joins) {
      if (typeof data.joins === "string") {
        // Id data.joins is a string, split it and add it to the joins array
        const joinParts = data.joins.split(",");
        if (joinParts.length === 5) {
          const [type, tableName1, tableName2, column1, column2] = joinParts;
          joins.push({
            type,
            tableName1,
            tableName2,
            column1,
            column2,
          });
        }
      } else if (Array.isArray(data.joins)) {
        // if data.joins is an array, iterate over it and add each element to the joins array
        data.joins.forEach((join) => {
          if (typeof join === "string") {
            const joinParts = join.split(",");
            if (joinParts.length === 5) {
              const [type, tableName1, tableName2, column1, column2] =
                joinParts;
              joins.push({
                type,
                tableName1,
                tableName2,
                column1,
                column2,
              });
            }
          }
        });
      }
    }
    // create a SelectPayload object
    const payload: SelectPayload = {
      tableName: tableName,
      fields: fields,
      condition: condition,
      joins: joins as [Join],
    };

    // retrieve the data
    await databaseConnector.connect();
    const result = await databaseConnector.select(payload);
    await databaseConnector.disconnect();
    res.status(200).json(result);
  } catch (error) {
    await databaseConnector.disconnect();
    next(error);
  }
}

/**
 * Updates data in a table.
 * @param req
 * @param res
 * @param next
 */
async function updateTable(req: Request, res: Response, next: NextFunction) {
  try {
    // get the table name and data from the request
    const tableName = req.params.tableName;
    const data = req.body;

    // create a InsertPayload object
    const payload: UpdatePayload = {
      tableName: tableName,
      columns: Object.keys(data.values),
      values: Object.values(data.values),
      condition: data.condition,
    };

    // insert the data
    await databaseConnector.connect();
    await databaseConnector.update(payload);
    await databaseConnector.disconnect();

    // return a 200 OK status
    res.status(200).json({});
  } catch (error) {
    next(error);
  }
}

async function deleteFromTable(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // get the table name and data from the request
    const tableName = req.params.tableName;
    const data = req.body;

    // create a InsertPayload object
    const payload: DeletePayload = {
      tableName: tableName,
      condition: data.condition,
    };

    // insert the data
    await databaseConnector.connect();
    const result = await databaseConnector.delete(payload);
    await databaseConnector.disconnect();

    // return a 200 OK status
    res.status(204).json({});
  } catch (error) {
    next(error);
  }

  //Select response
}

export default {
  getFromTable,
  insertIntoTable,
  updateTable,
  deleteFromTable,
};
