import * as Yup from 'yup';
import ApiResult from '../../utils/ApiResult';

export default async (req, res, next) => {
  try {
    const schema = Yup.object().shape({
      login: Yup.string()
        .email('Informe um e-mail válido')
        .required('Informe seu e-mail'),
      password: Yup.string()
        .min(8, 'A senha deve conter no mínimo 8 caracteres')
        .required('Informe sua senha'),
    });

    await schema.validate(req.body);
    return next();
  } catch (error) {
    const response = ApiResult.parseError(false, 'validateUser', error.message);
    return res.status(ApiResult.BAD_REQUEST).json(response);
  }
};
