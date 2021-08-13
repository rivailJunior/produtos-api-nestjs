import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { IsUserAlreadyExist } from './isUserUniqueValidator';

export class User {
  id: number;

  @Expose({
    name: 'userName',
  })
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

  @Expose({
    name: 'pws',
  })
  @Exclude({
    toPlainOnly: true,
  })
  @IsNotEmpty({
    message: 'Senha é obrigatório.',
  })
  password: string;

  @IsNotEmpty({
    message: 'Nome completo é obrigatorio!',
  })
  fullname: string;

  @Expose({
    name: 'joinDate',
  })
  registeredAt: Date;
}
