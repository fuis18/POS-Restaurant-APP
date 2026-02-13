import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { Product } from "@/features/products/types/products.types";
import type { CellContext } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import ProductDialog from "@/features/products/components/ProductDialog";

export default function ActionsCell({
	row,
	table,
}: CellContext<Product, unknown>) {
	const product = row.original;
	const meta = table.options.meta;

	const handleDelete = async () => {
		await meta?.onDelete?.(product.id);
	};

	const handleReactivate = async () => {
		await meta?.onReactivate?.(product.id);
	};

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{product.state ? (
					<ButtonGroup
						orientation="vertical"
						aria-label="Media controls"
						className="h-fit w-full"
					>
						<ProductDialog product={product}>
							<Button variant="ghost" className="w-full justify-start">
								Editar
							</Button>
						</ProductDialog>

						<DropdownMenuItem
							variant="destructive"
							className="text-sm font-medium cursor-pointer px-4"
							onClick={handleDelete}
						>
							Eliminar
						</DropdownMenuItem>
					</ButtonGroup>
				) : (
					<DropdownMenuItem
						className="text-green-600 font-medium"
						onClick={handleReactivate}
					>
						Reactivar
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
