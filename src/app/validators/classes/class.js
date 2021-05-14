import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    function errorMsg(msg) {
      return ApiResult.parseError(false, `${msg}`).message;
    }

    const schema = Yup.object().shape({
      date: Yup.string().required(errorMsg('validateRequiredDate')),
      hour: Yup.string().required(errorMsg('validateRequiredHour')),
      status: Yup.boolean().required(errorMsg('validateRequiredStatus')),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'validateUser', error.message);
    return res.status(ApiResult.NOT_FOUND).json(response);
  }
};
