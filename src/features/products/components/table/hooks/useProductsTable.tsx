import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getColumns } from "../products-columns";
import type { ProductsTableProps } from "@/features/products/types/products.types";
import { useUserStore } from "@/store/userStore";

const useProductsTable = ({ data, meta }: ProductsTableProps) => {
	const { user } = useUserStore();
	const columns = getColumns(!!user);

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
