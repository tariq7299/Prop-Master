import { UserAuthForm } from './components/user-auth-form'
import ViteLogo from '@/assets/vite.svg'
import PropMasterLogo from '@/assets/prop-master-high-resolution-logo-white-transparent.svg'

export default function SignIn() {
  return (
    <>
      <div className='container relative grid h-svh flex-col items-center justify-center lg:max-w-none lg:grid-cols-2 lg:px-0'>
        <div className='relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex'>
          <div className='absolute inset-0 bg-zinc-900' />

          <div className='relative z-20 flex items-center text-lg font-medium gap-4'>

            <img
              src={PropMasterLogo}
              className=''
              width={80}
              height={80}
              alt='real state'
            />
            Prop Master
          </div>

          <img
            src="/public/images/poster1.png"
            className='relative m-auto '
            // width={301}
            // height={60}
            alt='real state'
          />

        </div>

        <div className='lg:p-8'>
          <div className='mx-auto flex w-full flex-col justify-center space-y-2 sm:w-[350px]'>
            <div className='flex flex-col space-y-2 text-left'>
              <h1 className='text-2xl font-semibold tracking-tight'>Login</h1>
              <p className='text-sm text-muted-foreground'>
                Enter your email and password below <br />
                to log into your account
              </p>
            </div>
            <UserAuthForm />

          </div>
        </div>
      </div>
    </>
  )
}
