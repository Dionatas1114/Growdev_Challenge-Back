import * as Yup from 'yup';
import ApiResult from '../utils/ApiResult';
import { errorMsg } from '../utils/StructureValidatorMessages';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      email: Yup.string()
        .required(errorMsg('validateRequiredEmail'))
        .email(errorMsg('validateValidEmail')),
      name: Yup.string()
        .required(errorMsg('validateRequiredName'))
        .min(8, errorMsg('validateMinCarachtersName'))
        .max(30, errorMsg('validatMaxCarachtersName')),
      type: Yup.boolean().required(errorMsg('validateRequiredUserType')),
      password: Yup.string()
        .required(errorMsg('validateRequiredPassw'))
        .min(6, errorMsg('validateMinCarachtersPassw'))
        .max(8, errorMsg('validateMaxCarachtersPassw')),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'validateUser', error.message);
    return res.status(ApiResult.NOT_FOUND).json(response);
  }
};
