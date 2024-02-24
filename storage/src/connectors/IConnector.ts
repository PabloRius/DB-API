import {
  DeletePayload,
  InsertPayload,
  SelectPayload,
  UpdatePayload,
} from "../models/Payload";
import { SelectResponse } from "../models/Response";
import { MongoDBConnector } from "./MongoDBConnector";

/**
 * Defines the interface for a database connector.
 */
export interface IConnector {
  /**
   * Connects to the database.
   * @returns {Promise<void>}
   * @memberof IConnector
   * @throws {Error} If the connection fails.
   */
  connect(): Promise<void>;

  /**
   * Disconnects from the database.
   * @returns {Promise<void>}
   * @memberof IConnector
   * @throws {Error} If the disconnection fails.
   * @throws {Error} If the connection is not established.
   */
  disconnect(): Promise<void>;

  /**
   * Inserts data into the database.
   * @param {string} tableName The name of the table to insert data into.
   * @param {any} data The data to insert.
   */
  insert(payload: InsertPayload): Promise<void>;

  /**
   * Updates data in the database.
   */
  update(payload: UpdatePayload): Promise<void>;

  /**
   * Deletes data from the database.
   * @param tableName
   * @param data
   */
  delete(payload: DeletePayload): Promise<any>;

  /**
   * Gets data from the database.
   * @param tableName Table name to select from.
   * @param data
   */
  select(payload: SelectPayload): Promise<SelectResponse>;
}

/**
 * Returns a database connector based on the connector type.
 * @param connectorType
 * @returns {IConnector} The database connector.
 */
export function getConnector(connectorType: string): IConnector {
  switch (connectorType) {
    case "mongodb":
      console.log("Case MongoDB");

      return new MongoDBConnector();
    default:
      console.error("Connector type: ", connectorType);
      throw new Error("Invalid connector type.");
  }
}
