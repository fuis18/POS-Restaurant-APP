import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import ProductDialog from "./ProductDialog";
import ImportDialog from "./ProductImportDialog";

interface ProductsOptionsProps {
	loadProducts: () => Promise<void>;
}

const ProductsOptions = ({ loadProducts }: ProductsOptionsProps) => {
	return (
		<ButtonGroup orientation="vertical" className="h-fit">
			<ProductDialog onSuccess={loadProducts}>
				<Button variant="outline">Crear</Button>
			</ProductDialog>

			<ImportDialog onImportSuccess={loadProducts}>
				<Button>Importar</Button>
			</ImportDialog>
		</ButtonGroup>
	);
};

export default ProductsOptions;
