// src/features/types/react-table.d.ts
import "@tanstack/react-table";

declare module "@tanstack/react-table" {
	interface TableMeta<TData> {
		updateCell?: <K extends keyof TData>(
			rowIndex: number,
			columnId: K,
			value: TData[K],
		) => void;
		updateRow?: (rowIndex: number, data: Partial<TData>) => void;
		addRow?: () => void;
		focus?: RegistryFocus;
		upsertProduct?: (
			rowIndex: number,
			product: {
				id: number;
				code: number | string;
				name: string;
				price: number;
			},
			createRow: boolean,
		) => void;
		submit?: () => void;
	}
}
