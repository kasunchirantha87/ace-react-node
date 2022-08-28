import { transformAndValidate } from "class-transformer-validator";
import { getCoutries } from "../repo/country.repo";
import { AppCodes } from "../types/enum/appCodes";
import { GetOutbrakeRequestDto } from "../types/request/getOutbrakeRequestDto";
import { defaultOutbrakeObj } from "../types/default/defaultOutbrakeObj"
import {
  formatValidationErrorMsg,
  generateFailedResponse,
  generateSuccessResponse,
} from "../util/responseWrapper";

export const countries = async(request:any, response:any) => {
    const countries = await getCoutries();
    return response.status(200).send(generateSuccessResponse(countries));
}