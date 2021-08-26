export default {
  //* ------------- AUTH CONTROLLER -------------- */
  incorrectUser: {
    code: 1000,
    message: 'Usuario não encontrado',
  },
  incorrectPassw: {
    code: 1001,
    message: 'Senha incorreta',
  },
  authLogin: {
    code: 1002,
    message:
      'Não foi possível realizar o login. Por favor, confira os dados inseridos e tente novamente.',
  },
  //* ------------- AUTH MIDDLEWARE -------------- */
  tokenNotFound: {
    code: 1005,
    message: 'Token não enviado',
  },
  invalidToken: {
    code: 1006,
    message: 'Token inválido',
  },
  //* ------------- USER CONTROLLER -------------- */
  userIndex: {
    code: 1010,
    message: 'Erro ao buscar todos os usuários',
  },
  userShow: {
    code: 1011,
    message: 'Erro ao buscar usuário pelo UID',
  },
  userStore: {
    code: 1012,
    message: 'Erro ao cadastrar usuário',
  },
  userUpdate: {
    code: 1013,
    message: 'Erro ao atualizar dados do usuário',
  },
  userNameAlreadyRegistered: {
    code: 1014,
    message: 'Já existe Usuário com esse nome',
  },
  userEmailAlreadyRegistered: {
    code: 1015,
    message: 'Já existe Usuário com esse email',
  },
  userUnauth: {
    code: 1016,
    message: 'Você não possui credenciais de administrador',
  },
  validateUser: {
    code: 1017,
    message: 'Erro ao validar dados do usuário',
  },
  //* ------------- CLASS CONTROLLER -------------- */
  classIndex: {
    code: 1020,
    message: 'Erro ao buscar todas as aulas',
  },
  classShow: {
    code: 1021,
    message: 'Erro ao buscar uma aula pelo UID',
  },
  classStore: {
    code: 1022,
    message: 'Erro ao cadastrar uma aula',
  },
  classUpdate: {
    code: 1023,
    message: 'Erro ao atualizar uma aula',
  },
  classDelete: {
    code: 1024,
    message: 'Erro ao deletar uma aula',
  },
  //* ------------- GROWDEVER CONTROLLER -------------- */
  growdeverIndex: {
    code: 1030,
    message: 'Erro ao buscar todos os alunos',
  },
  growdeverShow: {
    code: 1031,
    message: 'Erro ao buscar um aluno pelo UID',
  },
  growdeverStore: {
    code: 1032,
    message: 'Erro ao cadastrar um aluno',
  },
  growdeverUpdate: {
    code: 1033,
    message: 'Erro ao atualizar os dados de um aluno',
  },
  growdeverDelete: {
    code: 1034,
    message: 'Erro ao deletar os dados de um aluno',
  },
  validateGrowdever: {
    code: 1035,
    message: 'Erro ao validar dados do aluno',
  },
  //* ------------- VALIDATORS MESSAGES -------------- */
  // ? ---------------- NAME MESSAGES ----------------- */
  validateRequiredName: {
    code: 1100,
    message: 'É preciso informar um nome',
  },
  validateMinCarachtersName: {
    code: 1101,
    message: 'o nome deve conter no mínimo 8 caracteres',
  },
  validatMaxCarachtersName: {
    code: 1102,
    message: 'o nome não deve exceder 30 caracteres',
  },
  // ? ---------------- EMAIL MESSAGES ----------------- */
  validateRequiredEmail: {
    code: 1105,
    message: 'É preciso informar um e-mail',
  },
  validateValidEmail: {
    code: 1106,
    message: 'Informe um e-mail válido',
  },
  // ? ---------------- PASSW MESSAGES ----------------- */
  validateRequiredPassw: {
    code: 1110,
    message: 'É preciso informar uma senha',
  },
  validateMinCarachtersPassw: {
    code: 1111,
    message: 'a senha deve conter no mínimo 6 caracteres',
  },
  validateMaxCarachtersPassw: {
    code: 1112,
    message: 'a senha não deve exceder 8 caracteres',
  },
  // ? ---------------- PHONE MESSAGES ----------------- */
  validateRequiredPhone: {
    code: 1115,
    message: 'É preciso informar um telefone',
  },
  validateMinCarachtersPhone: {
    code: 1116,
    message: 'o telefone deve conter no mínimo 9 caracteres',
  },
  validateMaxCarachtersPhone: {
    code: 1117,
    message: 'o telefone não deve exceder 15 caracteres',
  },
  // ? ---------------- PROGRAM MESSAGES ----------------- */
  validateRequiredProgram: {
    code: 1120,
    message: 'É preciso informar um programa',
  },
  validateMinCarachtersProgram: {
    code: 1121,
    message: 'o programa deve conter no mínimo 6 caracteres',
  },
  validateMaxCarachtersProgram: {
    code: 1122,
    message: 'o programa não deve exceder 15 caracteres',
  },
  // ? ---------------- OTHER MESSAGES ----------------- */
  validateRequiredUserType: {
    code: 1125,
    message: 'Informe se você é administrador',
  },
  validateRequiredDate: {
    code: 1126,
    message: 'Informe uma data',
  },
  validateRequiredHour: {
    code: 1127,
    message: 'Informe um horário',
  },
  validateRequiredStatus: {
    code: 1128,
    message: 'Informe o status',
  },
};
