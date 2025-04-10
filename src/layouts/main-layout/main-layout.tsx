import Header from './header';
import { useState, useEffect, useReducer } from 'react';
import { Button } from '@/components/ui/button';
import { useAppContext } from '@/hooks/useAppContext';
interface MainLayoutProps {
    foo: string;
}
const ChildComponent = () => {
    const { theme } = useAppContext();
    useEffect(() => {
        console.log('🚀 Mounted');

        return () => {
            console.log('❌ Unmounted');
        };
    }, []);
    return <div className="child-component">Child Component - Theme: {theme}</div>;
};
function reducer(state: { count: number }, action: { type: string; payload?: number }) {
    console.log('🚀 ~ file: main-layout.tsx:16 ~ reducer ~ action:', action);
    console.log('🚀 ~ file: main-layout.tsx:16 ~ reducer ~ state:', state);
    switch (action.type) {
        case 'increment':
            return { count: state.count + 1 };
        case 'decrement':
            return { count: state.count - 1 };
        case 'set':
            return { count: action.payload || 0 };
        default:
            return state;
    }
}
const MainLayout = (props: MainLayoutProps) => {
    const { toggleTheme, setLanguage } = useAppContext();
    const [isShow, setIsShow] = useState(false);
    const [state, dispatch] = useReducer(reducer, { count: 0 });

    return (
        <div className="main-layout-component">
            <Header foo={props.foo} />
            <div className="mt-5">
                <h1>Main Layout</h1>
                <h1>Giá trị: {state.count}</h1>
                <button onClick={() => dispatch({ type: 'increment' })}>Tăng</button>
                <button onClick={() => dispatch({ type: 'decrement' })}>Giảm</button>
                <Button
                    className="cursor-pointer"
                    onClick={() => dispatch({ type: 'set', payload: 1 })}
                >
                    Toggle
                </Button>
                {/* <div>{isShow && <ChildComponent />}</div>
                <Button className="cursor-pointer" onClick={() => setIsShow(!isShow)}>
                    Toggle
                </Button>
                <Button className="cursor-pointer mr-2" onClick={() => setLanguage('en')}>
                    Set Language
                </Button>
                <Button className="cursor-pointer" onClick={() => toggleTheme()}>
                    Set Theme
                </Button> */}
            </div>
        </div>
    );
};

MainLayout.defaultProps = {
    foo: 'bar',
};

export default MainLayout;
