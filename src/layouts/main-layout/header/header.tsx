interface HeaderProps {
    foo: string;
}

const Header = (props: HeaderProps) => (
    <header>
        <h1 className="uppercase py-3 text-center text-white font-bold bg-gray-900">
            AIgorithm & Data Structure simulation.
        </h1>
    </header>
);

Header.defaultProps = {
    foo: 'bar',
};

export default Header;
