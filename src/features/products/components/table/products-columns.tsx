import type { Product } from "@/features/products/types/products.types";
import type { ColumnDef } from "@tanstack/react-table";
import ActionsCell from "./cells/ActionsRow";
import StateCell from "./cells/StateRow";

export const getColumns = (hasUser: boolean): ColumnDef<Product>[] => {
	const columns: ColumnDef<Product>[] = [
		{
			accessorKey: "code",
			header: "Code",
		},
		{
			accessorKey: "name",
			header: "Nombre",
		},
		{
			accessorKey: "price",
			header: "Precio",
			cell: ({ row }) => (
				<span className="font-semibold">S/.{row.original.price}</span>
			),
		},
	];

	if (hasUser) {
		columns.push({
			accessorKey: "state",
			header: "Estado",
			cell: StateCell,
		});
	}

	columns.push({
		id: "actions",
		header: "Acciones",
		cell: ActionsCell,
	});

	return columns;
};
