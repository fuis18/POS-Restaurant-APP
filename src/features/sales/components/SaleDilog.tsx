"use client";

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

import type { SaleItem } from "@/features/sales/types/sales.types";

interface SaleDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	saleItems: SaleItem[] | null;
}

const SaleDialog = ({ open, onOpenChange, saleItems }: SaleDialogProps) => {
	const totalSale =
		saleItems?.reduce(
			(sum, item) => sum + item.price_at_sale * item.quantity,
			0,
		) ?? 0;

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<DialogContent className="max-w-lg max-h-[80vh] flex flex-col">
				<DialogHeader>
					<DialogTitle>Detalle de la venta</DialogTitle>
				</DialogHeader>

				{!saleItems ? (
					<p>Cargando...</p>
				) : (
					<>
						<div className="flex-1 min-h-0 overflow-auto">
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Código</TableHead>
										<TableHead>Producto</TableHead>
										<TableHead>Cantidad</TableHead>
										<TableHead>Precio</TableHead>
										<TableHead>Total</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{saleItems.map((item) => (
										<TableRow key={item.id}>
											<TableCell>{item.code}</TableCell>
											<TableCell>{item.name}</TableCell>
											<TableCell>{item.quantity}</TableCell>
											<TableCell>${item.price_at_sale}</TableCell>
											<TableCell>
												S/.{(item.price_at_sale * item.quantity).toFixed(2)}
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>

						<div className="flex justify-end items-center border-t pt-3">
							<span className="font-semibold">
								Total venta: S/.{totalSale.toFixed(2)}
							</span>
						</div>
					</>
				)}
			</DialogContent>
		</Dialog>
	);
};

export default SaleDialog;
