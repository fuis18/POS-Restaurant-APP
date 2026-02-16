import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
	return (
		<header className="flex justify-around p-2">
			<Button asChild>
				<Link to="/">Registro</Link>
			</Button>
			<Button asChild>
				<Link to="/products">Productos</Link>
			</Button>
			<Button asChild>
				<Link to="/sales">Ventas</Link>
			</Button>
			<Button>
				<Link to="/login">Login</Link>
			</Button>
		</header>
	);
};

export default Header;
