export default {
  //AUTH CONTROLLER
  incorrectUser: {
    code: 1007,
    message: 'Usuario não encontrado',
  },
  incorrectPassw: {
    code: 1008,
    message: 'Senha incorreta',
  },
  authLogin: {
    code: 1009,
    message:
      'Não foi possível realizar o login. Por favor, confira os dados inseridos e tente novamente.',
  },
  //AUTH MIDDLEWARE
  tokenNotFound: {
    code: 1010,
    message: 'Token não enviado',
  },
  invalidToken: {
    code: 1011,
    message: 'Token inválido',
  },
  //USER CONTROLLER
  userIndex: {
    code: 1000,
    message: 'Erro o buscar todos os usuários',
  },
  userShow: {
    code: 1001,
    message: 'Erro o buscar usuário pelo UID',
  },
  userStore: {
    code: 1002,
    message: 'Erro ao cadastrar usuário',
  },
  userUpdate: {
    code: 1003,
    message: 'Erro ao atualizar dados do usuário',
  },
  userAlreadyRegistered: {
    code: 1004,
    message: 'Usuário já cadastrado',
  },
  userUnauth: {
    code: 1005,
    message: 'Você não possui credenciais de administrador',
  },
  validateUser: {
    code: 1006,
    message: 'Erro ao validar dados do usuário',
  },
  //CLASS CONTROLLER
  classIndex: {
    code: 1020,
    message: 'Erro ao buscar todas as aulas',
  },
  classShow: {
    code: 1021,
    message: 'Erro ao buscar uma aula',
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
  //GROWDEVER CONTROLLER
  growdeverIndex: {
    code: 1030,
    message: 'Erro ao buscar todos os alunos',
  },
  growdeverShow: {
    code: 1031,
    message: 'Erro ao buscar um aluno',
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
};
