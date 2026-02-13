// src/features/registry/components/RegistryPage.tsx
import { useState } from "react";
import type { Registry } from "../types/registry.types";
import RegistryTable from "./RegistryTable";
import RegistryOptions from "./RegistryOptions";
import { useRegistryState } from "../hooks/useRegistryState";
import { useRegistryActions } from "../hooks/useRegistryActions";
import useRegistryFocus from "../hooks/useRegistryFocus";
import { useSubmitRegistry } from "../hooks/useSubmitRegistry";

export const RegistryPage = () => {
	const { data, setData, total } = useRegistryState();
	const focus = useRegistryFocus();
	const { addRow, deleteRows, updateCell, updateRow, upsertProduct } =
		useRegistryActions(setData, focus);
	const { submit } = useSubmitRegistry({
		data,
		total,
		setData,
		focus,
	});

	const [selectedRows, setSelectedRows] = useState<Registry[]>([]);

	return (
		<main className="RegistryPage-container">
			<div>
				<RegistryTable
					data={data}
					meta={{ updateCell, updateRow, addRow, focus, upsertProduct, submit }}
					onSelectionChange={setSelectedRows}
				/>

				<div className="flex justify-end items-center">
					<span className="mr-4 font-bold">Total: S/. {total.toFixed(2)}</span>
				</div>
			</div>

			<RegistryOptions
				onSubmit={submit}
				onDelete={() => deleteRows(selectedRows)}
				disableDelete={selectedRows.length === 0}
			/>
		</main>
	);
};
