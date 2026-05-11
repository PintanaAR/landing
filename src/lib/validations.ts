import { z } from 'zod'

export const contactSchema = z.object({
  firstName: z.string().min(2, 'Ingrese su nombre'),
  lastName: z.string().min(2, 'Ingrese su apellido'),
  email: z.string().email('Email inválido'),
  phone: z.string().optional(),
  province: z.string().optional(),
  branches: z.string().optional(),
  message: z.string().optional(),
})

export type ContactInput = z.infer<typeof contactSchema>
