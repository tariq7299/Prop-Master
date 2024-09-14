import { z } from 'zod'

export const newAdminSignUpSchema = z
  .object({
    name: z
      .string()
      .min(1, { message: 'Please enter your name' })
      .min(5, { message: 'Your name must be at least 5 characters long' }),
    email: z
      .string()
      .min(1, { message: 'Please enter your email' })
      .email({ message: 'Invalid email address' }),
    phone_number: z
      .string()
      .length(13, { message: 'Please enter a valid phone number' }),
    company: z
      .string()
      .optional(),
    password: z
      .string()
      .min(1, {
        message: 'Please enter your password',
      })
      .min(7, {
        message: 'Password must be at least 7 characters long',
      }).refine((password) => /[A-Z]/.test(password), {
        message: "Password must contain at least one uppercase character",
      })
      .refine((password) => /[a-z]/.test(password), {
        message: "",
      })
      .refine((password) => /[0-9]/.test(password), { message: "Password must contain at least one number" })
      .refine((password) => /[!@#$%^&*]/.test(password), {
        message: "Password must contain at least on special character like '!', '@' or '#' ",
      }),
    password_confirmation: z.string(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: "Passwords don't match.",
    path: ['password_confirmation'],
})

export const adminLoginSchema =  z.object({
   email: z
   .string()
   .min(1, { message: 'Please enter your email' })
   .email({ message: 'Invalid email address' }),
 password: z
   .string()
   .min(1, {
     message: 'Please enter your password',
   })
   .min(7, {
     message: 'Password must be at least 7 characters long',
   }),
})



export type IsLoadingCustom<type> = {
    status: boolean,
    message: string,
    type: type
}