interface FooterProps {
    title: string;
}

const Footer = ({ title }: FooterProps) => (
    <footer className=" text-white text-center ">
        <span className="text-xs bg-gray-900 block py-2 font-silkscreen text-orange-400">&copy; {title}</span>
    </footer>
);

Footer.defaultProps = {
    foo: 'bar',
};

export default Footer;
