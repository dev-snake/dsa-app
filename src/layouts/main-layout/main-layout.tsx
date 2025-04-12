import Header from './header';
import Footer from './footer';
import { Outlet } from 'react-router';
interface MainLayoutProps {
    foo: string;
}

const MainLayout = (props: MainLayoutProps) => {
    return (
        <>
            <Header title="AIgorithm & Data Structure simulation." />
            <Outlet />
            <Footer title='Developed by Dang Van Hau.' />
        </>
    );
};

MainLayout.defaultProps = {
    foo: 'bar',
};

export default MainLayout;
