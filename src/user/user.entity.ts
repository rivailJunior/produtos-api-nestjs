import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUserAlreadyExist } from './isUserUniqueValidator';

export class User {
  id: number;

  @IsUserAlreadyExist({
    message: 'Nome de usuario precisa ser unico',
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
