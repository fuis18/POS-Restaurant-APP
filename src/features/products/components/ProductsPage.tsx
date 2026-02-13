import PagTable from "@/components/PaginationTable";
import useProducts from "../hooks/useProducts";
import ProductsTable from "./ProductsTable";
import ProductsOptions from "./ProductsOptions";

export const ProductsPage = () => {
	const {
		products,
		page,
		setPage,
		totalPages,
		reloadAll,
		handleDelete,
		handleReactivate,
	} = useProducts();

	return (
		<main className="ProductsPage-container">
			<div>
				<ProductsTable
					data={products}
					meta={{
						onDelete: handleDelete,
						onReactivate: handleReactivate,
					}}
				/>
				<PagTable page={page} setPage={setPage} totalPages={totalPages} />
			</div>
			<ProductsOptions loadProducts={reloadAll} />
		</main>
	);
};
