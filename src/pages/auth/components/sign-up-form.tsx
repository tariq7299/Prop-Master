import { HTMLAttributes, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/custom/button'
import { PasswordInput } from '@/components/custom/password-input'
import { cn } from '@/lib/utils'
import { PhoneInput } from '@/components/custom/phone-input'
import axios from 'axios'
import { handleApiError } from '@/helper/api-requests/handleApiError'
import { useToast } from '@/components/ui/use-toast'

interface SignUpFormProps extends HTMLAttributes<HTMLDivElement> { }

const newAdminUserSchema = z
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


export function SignUpForm({ className, ...props }: SignUpFormProps) {
  const [isLoading, setIsLoading] = useState(false)


  const { toast } = useToast()

  const form = useForm<z.infer<typeof newAdminUserSchema>>({
    resolver: zodResolver(newAdminUserSchema),
    defaultValues: {
      name: '',
      email: '',
      phone_number: '',
      company: '',
      password: '',
      password_confirmation: '',
    },
  })

  function onSubmit(data: z.infer<typeof newAdminUserSchema>) {
    setIsLoading(true)
    console.log("data", data)

    const signUpHandler = async (authData: z.infer<typeof newAdminUserSchema>) => {

      try {


        // console.log("import.meta.env.development.VITE_API_URL", import.meta.env.development.VITE_API_URL)
        console.log("authData", authData)

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}/auth/admin/register`,
          authData
        );

        console.log("response", response)

        // const res = response.data;

        // Cookies.set('token', res.token);


      } catch (error: unknown) {

        if (axios.isAxiosError(error)) {
          // Now TypeScript knows this is an AxiosError
          handleApiError(error, toast);
        } else {
          // Handle non-Axios errors
          console.error('An unexpected error occurred:', error);
        }
      } finally {
        setIsLoading(false)
      }

    };

    signUpHandler(data)


    setTimeout(() => {
      setIsLoading(false)
    }, 3000)

  }

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid gap-2'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder='Tariq Sarhan...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder='tariq.7299@example.com' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='phone_number'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput defaultCountry='EG' placeholder='331 766 152' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='company'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder='Prop Master...' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password_confirmation'
              render={({ field }) => (
                <FormItem className='space-y-1'>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <PasswordInput placeholder='********' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className='mt-2' loading={isLoading}>
              Create Account
            </Button>


          </div>
        </form>
      </Form>
    </div>
  )
}
