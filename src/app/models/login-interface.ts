import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'El email es requerido'),
  password: z.string().min(1, 'La contraseña es requerida'),

});

export interface LoginInterface extends z.infer<typeof LoginSchema> { }
