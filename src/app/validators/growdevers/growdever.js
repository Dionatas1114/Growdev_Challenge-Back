import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    function errorMsg(msg) {
      return ApiResult.parseError(false, `${msg}`).message;
    }

    const schema = Yup.object().shape({
      name: Yup.string()
        .required(errorMsg('validateRequiredName'))
        .min(8, errorMsg('validateMinCarachtersName'))
        .max(30, errorMsg('validatMaxCarachtersName')),
      email: Yup.string()
        .required(errorMsg('validateRequiredEmail'))
        .email(errorMsg('validateValidEmail')),
      phone: Yup.string()
        .required(errorMsg('validateRequiredPhone'))
        .min(9, errorMsg('validateMinCarachtersPhone'))
        .max(15, errorMsg('validateMaxCarachtersPhone')),
      program: Yup.string()
        .required(errorMsg('validateRequiredProgram'))
        .min(6, errorMsg('validateMinCarachtersProgram'))
        .max(15, errorMsg('validateMaxCarachtersProgram')),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(
      false,
      'validateGrowdever',
      error.message
    );
    return res.status(ApiResult.NOT_FOUND).json(response);
  }
};
