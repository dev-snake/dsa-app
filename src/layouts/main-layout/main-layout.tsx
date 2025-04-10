import Header from './header';
import { Outlet } from 'react-router';
interface MainLayoutProps {
    foo: string;
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <>
            <Header foo={props.foo} />
            <Outlet />
        </>
    );
};

MainLayout.defaultProps = {
    foo: 'bar',
};

export default MainLayout;
