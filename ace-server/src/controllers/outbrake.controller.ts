import { transformAndValidate } from "class-transformer-validator";
import { getOutbrakeData } from "../repo/outbrake.repo";
import { createUser, getUserByEmail } from "../repo/user.repo";
import { AppCodes } from "../types/enum/appCodes";
import { GetOutbrakeRequestDto } from "../types/request/getOutbrakeRequestDto";
import { RegisterUser } from "../types/request/registerUser";
import { defaultOutbrakeObj } from "../types/default/defaultOutbrakeObj"
import {
  formatValidationErrorMsg,
  generateFailedResponse,
  generateSuccessResponse,
} from "../util/responseWrapper";


export const outbrake = async (request:any, response:any) => {
    await transformAndValidate(GetOutbrakeRequestDto, request.query)
      .then(async (_outbrakeRequest: GetOutbrakeRequestDto | GetOutbrakeRequestDto[]) => {
          const outbrakeRequest = Array.isArray(_outbrakeRequest)? _outbrakeRequest[0]: _outbrakeRequest;
        const outbrakeResults = await getOutbrakeData(outbrakeRequest);
        return response.status(200).send(generateSuccessResponse(outbrakeResults));
      })
      .catch((err) => {
        response
          .status(400)
          .json(
            generateFailedResponse(
              formatValidationErrorMsg(err),
              AppCodes.VALIDATIONFAILED
            )
          );
      });
  };