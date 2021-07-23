import Button from '@material-tailwind/react/Button';
import Image from '@material-tailwind/react/Image';
import { signIn } from 'next-auth/client';
function Login() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <Image src="/mg.jpg"
                height="300"
                width="550"
                objectFit="contain"
            >
            </Image>

            <h1 className="mt-8 font-semibold text-4xl text-gray-800 ">Markdown Editor </h1>
            <Button className="w-44 mt-10" color="blue" buttonType="filled" ripple="light"
                onClick={signIn}>
                Sign in
                </Button>

            <h5 className="mt-8 font-semibold text-sm text-gray-800 ">Made with ♥ by Ashish Thapa </h5>
        </div>
    )
}

export default Login
