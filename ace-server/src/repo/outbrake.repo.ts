import { ListFormat, OutKeyword } from "typescript";
import pool from "../dbconfig/dbconnector";
import { dbo, table } from "../dbconfig/dbtables";
import { Outbrake } from "../types/model/outbrake.model";
import { GetOutbrakeRequestDto } from "../types/request/getOutbrakeRequestDto";
import { OutbrakeResponse } from "../types/response/outbrakeresponse";

export const getOutbrakeData = async (
  outbrakeRequest: any
): Promise<Outbrake[]> => {
  const client = await pool.connect();
  try {
    const sql =
      outbrakeRequest.country == 0
        ? `SELECT * FROM ${dbo}.${table.outbreak}`
        : `SELECT * FROM ${dbo}.${table.outbreak} WHERE COUNTRY = ${outbrakeRequest.country}`;
    const { rows } = await client.query(sql);
    const response = rows as Outbrake[];
    return response;
  } catch (error) {
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};
