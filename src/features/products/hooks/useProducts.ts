import { useEffect, useState } from "react";
import type { Product } from "../types/products.types";
import { CONFIG } from "@/constants/config";
import {
	getAllProducts,
	getProductsCount,
	reactivateProduct,
	softDeleteProduct,
} from "../repository/products.repository";
import { usePagination } from "@/hooks/usePagination";

const useProducts = () => {
	const [products, setProducts] = useState<Product[]>([]);

	// --------------------
	// PAGINATION
	// --------------------
	const [totalPages, setTotalPages] = useState(1);
	const { page, setPage } = usePagination(totalPages);

	const limit = CONFIG.LIMIT;
	const offset = (page - 1) * limit;

	const reloadProducts = () => getAllProducts(limit, offset).then(setProducts);

	const updateTotalPages = async () => {
		const total = await getProductsCount();
		setTotalPages(Math.ceil(total / limit));
	};

	const reloadAll = async () => {
		await Promise.all([reloadProducts(), updateTotalPages()]);
	};

	// --------------------
	// ACTIONS
	// --------------------
	const handleDelete = async (id: number) => {
		console.log(id);
		await softDeleteProduct(id);
		await reloadProducts();
	};

	const handleReactivate = async (id: number) => {
		await reactivateProduct(id);
		await reloadProducts();
	};

	// --------------------
	// EFFECTS
	// --------------------
	useEffect(() => {
		getAllProducts(limit, offset).then(setProducts);
		getProductsCount().then((total) => {
			setTotalPages(Math.ceil(total / limit));
		});
	}, [limit, offset, page]);

	return {
		// data
		products,
		page,
		setPage,
		totalPages,
		// actions
		reloadAll,
		handleDelete,
		handleReactivate,
	};
};
export default useProducts;
