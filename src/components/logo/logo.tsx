import ROUTES from "@/constants/routes";
import { Link } from "react-router-dom";
interface LogoProps {
    foo: string;
}

const Logo = (_props: LogoProps) => (
    <Link to={ROUTES.PUBLIC.HOME} className="font-silkscreen text-center text-white text-3xl  max-sm:text-xl ">
        Algo<span className="text-orange-400 font-silkscreen">Viz</span>
        <span className="font-silkscreen text-xl  max-sm:text-xs">.dev</span>
    </Link>
);

Logo.defaultProps = {
    foo: 'bar',
};

export default Logo;
