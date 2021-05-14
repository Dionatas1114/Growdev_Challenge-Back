import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    // let msg = ApiResult.parseError(false, `${errorCode}`).message;  // TODO Refactor this
    const schema = Yup.object().shape({
      date: Yup.string().required(
        ApiResult.parseError(false, 'validateRequiredDate').message
      ),
      hour: Yup.string().required(
        ApiResult.parseError(false, 'validateRequiredHour').message
      ),
      status: Yup.boolean().required(
        ApiResult.parseError(false, 'validateRequiredStatus').message
      ),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'validateUser', error.message);
    return res.status(ApiResult.NOT_FOUND).json(response);
  }
};
