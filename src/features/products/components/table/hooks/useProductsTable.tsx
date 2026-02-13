import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { columns } from "../products-columns";
import type { ProductsTableProps } from "@/features/products/types/products.types";

const useProductsTable = ({ data, meta }: ProductsTableProps) => {
	// eslint-disable-next-line react-hooks/incompatible-library
	const table = useReactTable({
		data,
		columns,
		meta,
		getCoreRowModel: getCoreRowModel(),
	});

	return table;
};

export default useProductsTable;
