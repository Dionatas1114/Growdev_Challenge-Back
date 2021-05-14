import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    // let msg = ApiResult.parseError(false, `${errorCode}`).message;  // TODO Refactor this
    const schema = Yup.object().shape({
      name: Yup.string()
        .required(ApiResult.parseError(false, 'validateRequiredName').message)
        .min(
          8,
          ApiResult.parseError(false, 'validateMinCarachtersName').message
        )
        .max(
          30,
          ApiResult.parseError(false, 'validatMaxCarachtersName').message
        ),
      email: Yup.string()
        .required(ApiResult.parseError(false, 'validateRequiredEmail').message)
        .email(ApiResult.parseError(false, 'validateValidEmail').message),
      phone: Yup.string()
        .required(ApiResult.parseError(false, 'validateRequiredPhone').message)
        .min(
          9,
          ApiResult.parseError(false, 'validateMinCarachtersPhone').message
        )
        .max(
          15,
          ApiResult.parseError(false, 'validateMaxCarachtersPhone').message
        ),
      program: Yup.string()
        .required(
          ApiResult.parseError(false, 'validateRequiredProgram').message
        )
        .min(
          6,
          ApiResult.parseError(false, 'validateMinCarachtersProgram').message
        )
        .max(
          15,
          ApiResult.parseError(false, 'validateMaxCarachtersProgram').message
        ),
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
