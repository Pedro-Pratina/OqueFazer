"use client";

import { ChevronDown } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
 
export interface SelectOption<T extends string | number = string> {
  value: T;
  label: string;
}

interface DropDownListProps<T extends string | number = string> {
  options: SelectOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  placeholder?: string;
  className?: string;
}

export function DropDownList<T extends string | number = string>({
  options,
  value,
  onChange,
  placeholder = "Selecione",
  className = "",
}: DropDownListProps<T>) {
    const [open, setOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);
    const rootRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);
    const listId = useId();

    const selected = options.find((o) => o.value === value);

    useEffect(() => {
        const handler = (e: MouseEvent) => {
            if(!rootRef.current?.contains(e.target as Node)) setOpen(false);
        }
        document.addEventListener("mousedown", handler);
        return () => document.removeEventListener("mousedown", handler);
    }, [])


    useEffect(() => {
        if(!open || activeIndex < 0) return;

        listRef.current?.children[activeIndex]?.scrollIntoView({block: "nearest"})
    }, [activeIndex, open])

    const openList = () => {
        setActiveIndex(Math.max(0, options.findIndex((o) => o.value === value)))
        setOpen(true)
    }

    const choose = (opt: SelectOption<T>) => {
        onChange(opt.value)
        setOpen(false)
    }

    const onKeyDown = (e: React.KeyboardEvent) => {
        switch (e.key){
            case "ArrowDown":
                e.preventDefault();
                if(!open) return openList();
                setActiveIndex((i) => Math.min(i + 1, options.length - 1));
                break;
            case "ArrowUp":
                e.preventDefault();
                if(!open) return openList();
                setActiveIndex((i) => Math.max(i - 1, 0));
                break;
            case "Enter":
            case " ":
                e.preventDefault();
                if(!open) return openList();
                if(activeIndex >= 0) choose(options[activeIndex]);
                break;
            case "Escape":
                setOpen(false);
                break;
        }
    };

    return(
        <div ref={rootRef} className={`relative w-full ${className}`}>
            <button
                type="button"
                role="combobox"
                aria-expanded={open}
                aria-controls={listId}
                aria-haspopup="listbox"
                onClick={() => (open ? setOpen(false) : openList())}
                onKeyDown={onKeyDown}
                className="flex h-full w-full items-center justify-between rounded-lg border border-(--line) bg-white px-3 py-2 text-sm text-slate-800 outline-none transition focus-visible:ring-2 focus-visible:ring-violet-300"
            >
                <span className={selected ? "" : "text-slate-400"}>
                    {selected?.label ?? placeholder}
                </span>
                <ChevronDown className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`} />
            </button>

            {
                open && (
                    <ul ref={listRef} id={listId} role="listbox" className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
                        {
                            options.map((opt, i) => {
                                const isSelected = opt.value === value;
                                const isActive = i === activeIndex;

                                return(
                                    <li
                                        key={String(opt.value)}
                                        role="option"
                                        aria-selected={isSelected}
                                        onMouseEnter={() => setActiveIndex(i)}
                                        onClick={() => choose(opt)}
                                        className={[
                                            "cursor-pointer px-3 py-2 text-sm",
                                            isSelected
                                                ? "bg-blue-600 font-medium text-white"
                                                : isActive
                                                ? "bg-slate-100 text-slate-900"
                                                : "text-slate-700",
                                            ].join(" ")}
                                    >{opt.label}</li>
                                )
                            })
                        }
                    </ul>
                )
            }
        </div>
    )
}