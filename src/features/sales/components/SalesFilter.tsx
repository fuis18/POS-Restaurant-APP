// src/components/filtering/SalesFilter.tsx
"use client";
import { Button } from "@/components/ui/button";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { format, startOfWeek, endOfWeek } from "date-fns";
import { CalendarIcon } from "lucide-react";

interface SalesFilterProps {
	setPage: (page: number) => void;
	selectedDate?: { from?: string; to?: string };
	setSelectedDate: (date?: { from?: string; to?: string }) => void;
}

const getCurrentWeekRange = (): DateRange => {
	const now = new Date();
	return {
		from: startOfWeek(now, { weekStartsOn: 0 }), // 0 = domingo
		to: endOfWeek(now, { weekStartsOn: 0 }), // termina en sábado
	};
};

const SalesFilter = ({
	setPage,
	selectedDate,
	setSelectedDate,
}: SalesFilterProps) => {
	const [open, setOpen] = useState(false);
	const [date, setDate] = useState<DateRange | undefined>(() => {
		if (selectedDate?.from && selectedDate?.to) {
			return {
				from: new Date(selectedDate.from),
				to: new Date(selectedDate.to),
			};
		}
		return getCurrentWeekRange();
	});

	const applyFilter = () => {
		setPage(1);
		if (date?.from && date?.to) {
			setSelectedDate({
				from: format(date.from, "yyyy-MM-dd"),
				to: format(date.to, "yyyy-MM-dd"),
			});
		} else {
			setSelectedDate(undefined);
		}
		setOpen(false);
	};

	return (
		<div className="SalesFilter">
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline">
						<CalendarIcon />
						{date?.from && date?.to
							? `${format(date.from, "dd/MM/yyyy")} - ${format(date.to, "dd/MM/yyyy")}`
							: "Seleccionar fecha"}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-4 text-center" align="start">
					<Calendar
						mode="range"
						defaultMonth={date?.from ?? new Date()}
						selected={date}
						onSelect={setDate}
						numberOfMonths={1}
					/>
					<Button className="mt-2" onClick={applyFilter}>
						Filtrar
					</Button>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default SalesFilter;
