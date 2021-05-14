import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    // let msg = ApiResult.parseError(false, `${errorCode}`).message;  // TODO Refactor this
    const schema = Yup.object().shape({
      email: Yup.string()
        .required(ApiResult.parseError(false, 'validateRequiredEmail').message)
        .email(ApiResult.parseError(false, 'validateValidEmail').message),
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
      type: Yup.boolean().required(
        ApiResult.parseError(false, 'validateRequiredUserType').message
      ),
      password: Yup.string()
        .required(ApiResult.parseError(false, 'validateRequiredPassw').message)
        .min(
          6,
          ApiResult.parseError(false, 'validateMinCarachtersPassw').message
        )
        .max(
          8,
          ApiResult.parseError(false, 'validateMaxCarachtersPassw').message
        ),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'validateUser', error.message);
    return res.status(ApiResult.NOT_FOUND).json(response);
  }
};
