/**
 * Defines the interface for the input payload for the insert method.
 */
// TODO: refactor if needed for other db engines
export interface InsertPayload {
  /**
   * The name of the table to insert data into.
   * @type {string}
   */
  tableName: string;

  /**
   * The column names to insert data into.
   * @type {string[]}
   */
  columns: string[];

  /**
   * The values to insert into the table.
   * @type {any[]}
   */
  values: any[];
}

/**
 * Defines the interface for the input payload for the select method.
 */
// TODO: add support for WHERE clause
export interface SelectPayload {
  /**
   * The name of the table to select data from.
   */
  tableName: string;

  /**
   * The column names to select data from.
   * @type {string[]}
   */
  fields?: string[] | undefined;

  /**
   * The joins to select data from.
   */
  joins?: [Join] | undefined;

  /**
   * The condition to select data from.
   * @type {string}
   */
  condition?: string | undefined;
}

/**
 * Defines the interface for the input payload for the update method.
 */
export interface UpdatePayload {
  /**
   * The name of the table to update data from.
   * @type {string}
   */
  tableName: string;

  /**
   * The column names to update data from.
   */
  columns: string[];

  /**
   * The values to update into the table.
   * @type {any[]}
   */
  values: any[];

  /**
   * The condition to update data from.
   * @type {string}
   * @example "id = 1"
   */
  condition: string;
}

export interface DeletePayload {
  /**
   * The name of the table to delete data from.
   */
  tableName: string;

  /**
   * The condition to delete data from.
   */
  condition: string;
}

interface Contidition {
  /**
   * The column of the condition to update data from.
   */
  column: string;

  /**
   * The operator of the condition to update data from.
   * @type {string}
   */
  operator: string;

  /**
   * The value of the condition to update data from.
   */
  value: any;
}

export interface Join {
  /**
   * The type of join.
   */
  type: string;

  /**
   * The first table name to join.
   */
  tableName1: string;

  /**
   * The second table name to join.
   */
  tableName2: string;

  /**
   * The column of the first table to join.
   */
  column1: string;

  /**
   * The column of the second table to join.
   */
  column2: string;
}
