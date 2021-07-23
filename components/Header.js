import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import { useSession, signOut } from 'next-auth/client';


function Header() {
    const [session] = useSession();
    return (
        <div className='flex items-center sticky top-0 z-50 px-4 py-2 shadow-md bg-white'>
            <Button color="blue"
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className=" h-20 w-20 border-0"
            >
                <Icon name="menu" size="3xl"></Icon>
            </Button>
            <Icon name="description" size="5xl" color="blue"></Icon>
            <h1 className="ml-2 text-gray-700 text-2xl">Markdown Docs</h1>
            <div className="mx-5 md:mx-20 flex flex-grow items-center px-5 py-2 bg-gray-100 text-gray-600 focus-within:text-gray-600 focus-within:shadow-md">
                <Icon name="search" size="3xl" color="gray"> </Icon>
                <input type="text" placeholder="Search" className="flex-grow px-5 bg-transparent outline-none" />
            </div>

            <img loading="lazy" className="cursor-pointer h-12 w-12 rounded-full ml-2"
                src={session?.user?.image}
            />
            <Button color="gray"
                onClick={signOut}
                buttonType="outline"
                rounded={true}
                iconOnly={true}
                ripple="dark"
                className=" h-20 w-20 border-0"
            >
                Logout
            </Button>


        </div>

    )
}

export default Header
