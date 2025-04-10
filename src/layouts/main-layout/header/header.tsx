interface HeaderProps {
    foo: string;
}

const Header = (props: HeaderProps) => (
    <header className="">
        <h1 className="uppercase py-4 text-center text-white font-bold bg-[#1E1E2F]">
            AIgorithm & Data Structure simulation.
        </h1>
    </header>
);

Header.defaultProps = {
    foo: 'bar',
};

export default Header;
