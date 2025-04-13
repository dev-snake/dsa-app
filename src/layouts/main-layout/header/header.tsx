import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
    Cloud,
    CreditCard,
    Github,
    Keyboard,
    LifeBuoy,
    LogOut,
    Mail,
    MessageSquare,
    Plus,
    PlusCircle,
    Settings,
    User,
    UserPlus,
    Users,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
interface HeaderProps {
    title: string;
}

const Header = ({ title }: HeaderProps) => {
    return (
        <header className="bg-gray-900 flex justify-between items-center px-12 max-sm:px-8 max-sm:py-2 fixed top-0 w-full z-50 shadow-lg">
            <h1 className="font-silkscreen text-center text-white text-3xl  max-sm:text-xl ">
                Algo<span className="text-orange-400 font-silkscreen">Viz</span>
                <span className="font-silkscreen text-xl  max-sm:text-xs">.dev</span>
            </h1>
            <h1 className="uppercase py-3 text-center text-white font-bold  max-sm:hidden">{title}</h1>
            <div className="">
                <Button
                    variant="ghost"
                    className="border-2 text-white font-silkscreen hover:cursor-pointer"
                >
                    Login
                </Button>
                {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-52 mr-4 mt-2">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User />
                            <span>Profile</span>
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            <Settings />
                            <span>Settings</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>

                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                        <LogOut className='text-red-600' />
                        <span className='text-red-600'>Log out</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu> */}
            </div>
        </header>
    );
};

Header.defaultProps = {
    foo: 'bar',
};

export default Header;
