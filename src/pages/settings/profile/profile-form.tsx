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
import { zodResolver } from '@hookform/resolvers/zod'
import { PasswordInput } from '@/components/custom/password-input'
import { useLoaderData } from 'react-router-dom'
import GeneralError from '@/pages/errors/general-error'
import { SuccessApiResponse } from '@/helper/api/types'
import { useEffect } from 'react'
import { defaultUserValue } from '@/pages/auth/types'
import { PhoneInput } from '@/components/custom/phone-input'
import { personalInfoFormSchema, passwordFormSchema } from './types'
import useSendRequest from '@/hooks/api/use-send-request'
import { useAuth } from '@/hooks/auth/auth-provider'

type PersonalFormValues = z.infer<typeof personalInfoFormSchema>
type PasswordFormValues = z.infer<typeof passwordFormSchema>

export default function ProfileForm() {
  const { user, setUser } = useAuth()
  const { isLoading: isSubmittingNewProfileInfo, sendRequest: changeProfileInfo } = useSendRequest();
  const { isLoading: isSubmittingNewPassword, sendRequest: changePassword } = useSendRequest();

  const adminDataResponse = useLoaderData() as SuccessApiResponse | Error;

  // If the response wasn't succesfull then render an Error Page
  if (!('success' in adminDataResponse)) {
    return <GeneralError />;
  }

  useEffect(() => {
    if (('user' in adminDataResponse.data)) {
      setUser({ ...adminDataResponse?.data?.user })
    } else {
      setUser(defaultUserValue)
    }
  }, [adminDataResponse])

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

  function handleSubmittingPersonalInfo(data: PersonalFormValues) {

    const reqOptions = { url: "/auth/update-profile", data: data }

    const apiResFuncArgs = {
      successCallback: (res: any) => {
        if (('user' in res.data)) {
          setUser(res?.data?.user)

        } else {
          setUser(defaultUserValue)
        }
      }
    }

    changeProfileInfo({ reqOptions, apiResFuncArgs })

  }

  function handleSubmittingNewPassword(data: PasswordFormValues) {

    changePassword({ reqOptions: { url: "/auth/change-password", data } })
  }

  return (
    <>
      <Form {...personalInfoForm}>
        <form onSubmit={personalInfoForm.handleSubmit(handleSubmittingPersonalInfo)} >

          <div className='space-y-8 pb-8'>

            <FormField
              control={personalInfoForm.control}
              name='name'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
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
                <FormItem className='space-y-1'>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <PhoneInput defaultCountry='EG' placeholder='01099133377' {...field} />
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
          <Button loading={isSubmittingNewProfileInfo} type='submit'>Update personal info</Button>
        </form>
      </Form>

      <Form {...passwordInfoForm}>
        <form onSubmit={passwordInfoForm.handleSubmit(handleSubmittingNewPassword)} className='  pt-8 pb-6'>

          <div className="space-y-5 pb-8">
            <FormField
              control={passwordInfoForm.control}
              name='current_password'
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

          <Button loading={isSubmittingNewPassword} type='submit'>Change password</Button>
        </form>
      </Form>
    </>
  )
}
