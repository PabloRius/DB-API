import {
  DeletePayload,
  InsertPayload,
  SelectPayload,
  UpdatePayload,
} from "../models/Payload";
import { IConnector } from "./IConnector";
import { SelectResponse } from "../models/Response";

import { MongoClient } from "mongodb";

export class MongoDBConnector implements IConnector {
  private client: MongoClient | undefined;

  constructor() {}

  async connect(): Promise<void> {
    console.log("Connect request");
    const uri = "mongodb://mongodb:27017";
    this.client = new MongoClient(uri);

    try {
      await this.client.connect();
      console.log("Connected to the MongoDB database");
    } catch (error) {
      console.error("Error connecting to the MongoDB database:", error);
      throw error;
    }
  }

  async disconnect(): Promise<void> {
    console.log("Disconnect request");
    if (this.client) {
      await this.client.close();
      console.log("Disconnected from the MongoDB database");
    }
  }

  async insert(payload: InsertPayload): Promise<void> {
    console.log("Insert request");
    if (!this.client) {
      throw new Error("Connection to MongoDB not established");
    }

    if (
      !payload.database ||
      !payload.collection ||
      payload.collection == "" ||
      payload.database == ""
    ) {
      throw new Error(
        "Query params are incorrect, mongoDB needs a database and collection name"
      );
    }

    if (payload.values.length <= 0 || payload.columns.length <= 0) {
      throw new Error("Insert request requires, at least, one value");
    }

    const db = this.client.db(payload.database);
    const collection = db.collection(payload.collection);

    for (const value_set of payload.values) {
      if (value_set.length != payload.columns.length) {
        throw new Error(
          "The value sets must have the same length as the number of columns"
        );
      }
      const dataToInsert: { [key: string]: any } = {};
      payload.columns.forEach((column, index) => {
        dataToInsert[column] = value_set[index];
      });
      await collection.insertOne(dataToInsert);
    }

    console.log("Inserted data into MongoDB");
  }

  async update(payload: UpdatePayload): Promise<void> {
    console.log("Update request");
  }

  async delete(payload: DeletePayload): Promise<void> {
    console.log("Delete request");
  }

  async select(payload: SelectPayload): Promise<SelectResponse> {
    console.log("Select request");
    const response: SelectResponse = {
      columns: [],
      values: [],
    };
    return response;
  }
}
