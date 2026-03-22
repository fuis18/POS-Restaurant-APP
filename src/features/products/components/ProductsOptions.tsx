import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";
import ProductDialog from "./ProductDialog";
import ImportDialog from "./ProductImportDialog";
import { exportProductsCsv } from "../service/exportProductsCsv";

interface ProductsOptionsProps {
	loadProducts: () => Promise<void>;
}

const ProductsOptions = ({ loadProducts }: ProductsOptionsProps) => {
	return (
		<ButtonGroup orientation="vertical" className="h-fit">
			<ProductDialog onSuccess={loadProducts}>
				<Button>Crear</Button>
			</ProductDialog>

			<ImportDialog onImportSuccess={loadProducts}>
				<Button variant="outline">Importar</Button>
			</ImportDialog>

			<Button variant="outline" onClick={exportProductsCsv}>
				Exportar
			</Button>
		</ButtonGroup>
	);
};

export default ProductsOptions;
