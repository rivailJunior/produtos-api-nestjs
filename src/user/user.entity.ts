import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class User {
  id: number;

  @IsNotEmpty({
    message: 'Nome do usuário é obrigatório.',
  })
  @IsString({
    message: 'Nome do usuário precisa ser uma string.',
  })
  name: string;

  @IsEmail(
    {},
    {
      message: 'Email precisa ser um endereço de email válido.',
    },
  )
  @IsEmail()
  email: string;

  @IsNotEmpty({
    message: 'Senha é obrigatório.',
  })
  password: string;

  @IsNotEmpty({
    message: 'Nome completo é obrigatorio!',
  })
  fullname: string;

  registeredAt: Date;
}
