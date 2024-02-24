import {
  DeletePayload,
  InsertPayload,
  SelectPayload,
  UpdatePayload,
} from "../models/Payload";
import { IConnector } from "./IConnector";
import { SelectResponse } from "../models/Response";

export class MongoDBConnector implements IConnector {
  constructor() {}

  async connect(): Promise<void> {
    console.log("Connect request");
  }

  async disconnect(): Promise<void> {
    console.log("Disconnect request");
  }

  async insert(payload: InsertPayload): Promise<void> {
    console.log("Insert request");
  }

  async update(payload: UpdatePayload): Promise<void> {
    console.log("Update request");
  }

  async delete(payload: UpdatePayload): Promise<void> {
    console.log("Update request");
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
