import { useState } from "react";
import iconUp from "../assets/arrow_drop_up.svg"
import iconDown from "../assets/arrow_drop_down.svg"

export function SortDropdown({ sort, order, onChange }) {
    const [open, setOpen] = useState(false);

    const updateSort = (value) => onChange({sort: value, order});
    const updateOrder = (value) => onChange({sort, order: value});

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setOpen(!open)}
                className="px-3 py-2 text-white bg-indigo-800 rounded hover:bg-indigo-900"
            >
                Sort by
                {!open && (<img src={iconUp} alt="up" className="inline"/>)}
                {open && (<img src={iconDown} alt="down" className="inline"/>)}
            </button>

            {open && (
                <div className="absolute mt-2 bg-white shadow-lg border rounded py-3 w-48">
                <div className="flex flex-col gap-1">
                    <label className={`px-3 py-1 ${sort === "pet_name" ? "bg-gray-300" : ""}`}>
                    <input
                        type="radio"
                        name="sort"
                        className="peer hidden"
                        value="pet_name"
                        onChange={() => updateSort("pet_name")}
                        checked={sort === "pet_name"}
                    />
                    Pet Name
                    </label>

                    <label className={`px-3 py-1 ${sort === "appointment_date" ? "bg-gray-300" : ""}`}>
                    <input
                        type="radio"
                        name="sort"
                        className="peer hidden"
                        value="appointment_date"
                        onChange={() => updateSort("appointment_date")}
                        checked={sort === "appointment_date"}
                    />
                    Date
                    </label>

                    <label className={`px-3 py-1 ${sort === "owner_name" ? "bg-gray-300" : ""}`}>
                    <input
                        type="radio"
                        name="sort"
                        className="peer hidden"
                        value="owner_name"
                        onChange={() => updateSort("owner_name")}
                        checked={sort === "owner_name"}
                    />
                    Owner
                    </label>
                </div>

                <hr className="my-2" />

                <div className="flex flex-col gap-1">
                    <label className={`px-3 py-1 ${order === "ASC" ? "bg-gray-300" : ""}`}>
                    <input
                        type="radio"
                        name="order"
                        className="peer hidden"
                        value="ASC"
                        onChange={() => updateOrder("ASC")}
                        checked={order === "ASC"}
                    />
                    Asc
                    </label>

                    <label className={`px-3 py-1 ${order === "DESC" ? "bg-gray-300" : ""}`}>
                    <input
                        type="radio"
                        name="order"
                        className="peer hidden"
                        value="DESC"
                        onChange={() => updateOrder("DESC")}
                        checked={order === "DESC"}
                    />
                    Desc
                    </label>
                </div>
                </div>
            )}
        </div>
    );
}

export default SortDropdown;
