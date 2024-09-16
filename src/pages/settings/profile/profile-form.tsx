import { z } from 'zod'
import { Link } from 'react-router-dom'
import { useFieldArray, useForm } from 'react-hook-form'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/custom/password-input'
import { useLoaderData } from 'react-router-dom'
import { handleApiError } from '@/helper/api-requests/handleApiError'
import { handleApiSuccess } from '@/helper/api-requests/handleApiSuccess'
import axios from 'axios'
import GeneralError from '@/pages/errors/general-error'
import { SuccessApiResponse } from '@/helper/api-requests/types'
import useLocalStorage from '@/hooks/use-local-storage'
import { Admin } from '@/pages/auth/types'
import { useEffect, useMemo } from 'react'


const profileFormSchema = z.object({
  username: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z
    .string({
      required_error: 'Please select an email to display.',
    })
    .email(),
  bio: z.string().max(160).min(4),
  urls: z
    .array(
      z.object({
        value: z.string().url({ message: 'Please enter a valid URL.' }),
      })
    )
    .optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

// This can come from your database or API.
const defaultValues: Partial<ProfileFormValues> = {
  bio: 'I own a computer.',
  urls: [
    { value: 'https://shadcn.com' },
    { value: 'http://twitter.com/shadcn' },
  ],
}

const defaultUserValue = {
  name: "",
  phone_number: "",
  email: "",
  company: null,
  device_id: null,
  role_id: null,
  id: null,
  role: {
    id: null,
    name: null,
  }
}


export default function ProfileForm() {
  const adminDataResponse = useLoaderData() as { response: SuccessApiResponse, success: boolean };
  console.log("adminDataResponse", adminDataResponse);

  if (!adminDataResponse.success) {
    return <GeneralError />;
  }


  const [user, setUser] = useLocalStorage<Admin>({
    key: 'user',
    defaultValue: defaultUserValue
  })

  useEffect(() => {
    setUser(adminDataResponse?.response?.data?.data?.user)
    console.log("userds", user);
  }, [adminDataResponse.response])

  // useMemo


  // cosnt useMemo(() => {

  // setUser(adminDataResponse?.response?.data?.data?.user)
  // })


  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues,
    mode: 'onChange',
  })



  const { fields, append } = useFieldArray({
    name: 'urls',
    control: form.control,
  })

  function onSubmit(data: ProfileFormValues) {
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >

        <div className='space-y-8 pb-8'>

          <FormField
            control={form.control}
            name='name'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  {/* value={adminDataResponse?.response?.data?.data?.user?.name} */}
                  <Input placeholder='Your name' {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name='email'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Select a verified email to display' />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value='m@example.com'>m@example.com</SelectItem>
                    <SelectItem value='m@google.com'>m@google.com</SelectItem>
                    <SelectItem value='m@support.com'>m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage verified email addresses in your{' '}
                  <Link to='/examples/forms'>email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name='company'
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company</FormLabel>
                <FormControl>
                  <Input placeholder='Prop Master...' {...field} />
                </FormControl>
                <FormDescription>
                  This is the name that will be displayed on your profile and in
                  emails.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type='submit'>Update personal info</Button>
      </form>

      <form onSubmit={form.handleSubmit(() => { })} className='  pt-8 pb-6'>

        <div className="space-y-5 pb-8">
          <FormField
            control={form.control}
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
        </div>

        <Button type='submit'>Change password</Button>
      </form>
    </Form>
  )
}
