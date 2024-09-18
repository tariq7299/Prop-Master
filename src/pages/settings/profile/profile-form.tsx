import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/custom/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/use-toast'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/custom/password-input'
import { useLoaderData } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import { SuccessApiResponse } from '@/helper/api-requests/types'
import useLocalStorage from '@/hooks/use-local-storage'
import { Admin } from '@/pages/auth/types'
import { useEffect } from 'react'
import { defaultUserValue } from '@/pages/auth/types'


const personalInfoFormSchema = z.object({
  name: z
    .string()
    .min(5, { message: 'Your name must be at least 5 characters long' }),
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email({ message: 'Invalid email address' }),
  company: z
    .string()
    .optional(),
  phone_number: z
    .string()
    .length(13, { message: 'Please enter a valid phone number' }),
})

const passwordFormSchema = z.object({
  current_password: z
    .string()
    .min(1, {
      message: 'Please enter your password',
    }),
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

type PersonalFormValues = z.infer<typeof personalInfoFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function ProfileForm() {

  const adminDataResponse = useLoaderData() as SuccessApiResponse | Error;

  console.log("adminDataResponse", adminDataResponse);

  // If the response wasn't succesfull then render an Error Page
  if (!('success' in adminDataResponse)) {
    return <GeneralError />;
  }

  const [user, setUser] = useLocalStorage<Admin>({
    key: 'user',
    defaultValue: defaultUserValue
  })

  useEffect(() => {
    if (('user' in adminDataResponse.data)) {
      setUser({ ...adminDataResponse?.data?.user, company: adminDataResponse.data.user.company || "" })
    }
    console.log("userds", user);
  }, [adminDataResponse])

  // This can come from your database or API.
  const defaultValues: PersonalFormValues = {
    name: user.name,
    email: user.email,
    phone_number: user.phone_number,
    company: user.company,
  }

  const personalInfoForm = useForm<PersonalFormValues>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const passwordInfoForm = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordFormSchema),
    mode: 'onChange',
  })


  function onSubmit(data: PersonalFormValues) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }



  return (
    <Form {...personalInfoForm}>
      <form onSubmit={personalInfoForm.handleSubmit(onSubmit)} >

        <div className='space-y-8 pb-8'>

          <FormField
            control={personalInfoForm.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* value={adminDataResponse?.response?.data?.data?.user?.name} */}
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormDescription>
                  Your Name which appear in your info
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={personalInfoForm.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder='name@example.com...' {...field} />
                </FormControl>
                <FormDescription>
                  You can change your email address from here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={personalInfoForm.control}
            name='phone_number'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder='01099122332..' {...field} />
                </FormControl>
                <FormDescription>
                  You can change your phone number from here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={personalInfoForm.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder='Prop Master...' {...field} />
                </FormControl>
                <FormDescription>
                  You can change your company from here
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Update personal info</Button>
      </form>

      <form onSubmit={passwordInfoForm.handleSubmit(() => { })} className='  pt-8 pb-6'>

        <div className="space-y-5 pb-8">
          <FormField
            control={passwordInfoForm.control}
            name='password'
            render={({ field }) => (
              <FormItem className='space-y-1'>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <PasswordInput placeholder='********' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={passwordInfoForm.control}
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
            control={passwordInfoForm.control}
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
        </div>

        <Button type='submit'>Change password</Button>
      </form>

    </Form>
  )
}
