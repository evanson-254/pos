import React, { useState, useRef, useEffect } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { ReusableForm } from "../FetcherForm";
import { useLoaderData } from "react-router";
import type { clientLoader } from "~/routes/inventory/product_update";
import { Combobox, ComboboxContent, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "../ui/combobox";
import { CommandGroup, CommandItem } from "../ui/command";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";


// Define TypeScript structures directly
export interface BranchInventory {
    id: string;
    name: string;
    stock: number | null;
    localPrice: number | null;
    is_active: boolean;
    available: number;
    reason: string,

}

export interface ProductFormValues {
    id: string,
    name: string;
    category_id: number,
    sku: string,
    barcode: string,
    unit: string,
    description: string,
    selling_price: number;
    initialImageUrl: string;
    imageFile: File | null;
    branches: BranchInventory[];
}

interface ProductFormProps {
    defaultValues: Omit<ProductFormValues, "imageFile"> & { initialImageUrl?: string };
}

export const MultiBranchProductForm = ({ defaultValues, }: ProductFormProps) => {
    const data = useLoaderData<typeof clientLoader>();
    const { categories } = data || {};
    return (
        <ReusableForm<ProductFormValues> actionUrl={"/product/update/" + (defaultValues.id || "new")} defaults={defaultValues} resetOnSuccess={() => { }}>
            {({ register, formState: { errors }, watch, control, setValue, reset }, { state, status }) => {
                const { fields } = useFieldArray({ control, name: "branches" });
                //console.log(errors);
                // Core reactive watches
                const globalBasePrice = watch("selling_price") || 0;
                const branchesWatch = watch("branches");

                // Local UI states for image preview and bulk operations
                const [imagePreview, setImagePreview] = useState<string | null>(defaultValues.initialImageUrl || null);
                const [bulkPrice, setBulkPrice] = useState("");
                const [bulkStock, setBulkStock] = useState("");
                // const fileInputRef = useRef<HTMLInputElement>(null);

                // Native Image Handler
                const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const file = e.target.files?.[0];
                    if (file) {
                        setValue("imageFile", file);
                        const reader = new FileReader();
                        reader.onloadend = () => setImagePreview(reader.result as string);
                        reader.readAsDataURL(file);
                    } else {
                        setValue("imageFile", null);
                    }
                };

                // Bulk Apply Functions
                const applyBulkPrice = () => {
                    if (!bulkPrice || parseFloat(bulkPrice) < 0) return;
                    fields.forEach((_, index) => {
                        setValue(`branches.${index}.localPrice`, parseFloat(bulkPrice));
                    });
                    setBulkPrice("");
                };

                const applyBulkStock = () => {
                    if (!bulkStock || parseInt(bulkStock, 10) < 0) return;
                    fields.forEach((_, index) => {
                        setValue(`branches.${index}.stock`, parseInt(bulkStock, 10));
                    });
                    setBulkStock("");
                };
                useEffect(() => {
                    if (defaultValues&& status==200) {
                        reset(defaultValues);
                        setImagePreview(defaultValues.initialImageUrl);
                    }
                }, [defaultValues, status]);
                return (
                    <div className="space-y-8 max-w-6xl mx-auto pb-24 relative text-slate-800">

                        {/* SECTION 1: GLOBAL DATA */}
                        <div className="bg-white  border border-slate-200  p-6">
                            <h2 className="text-xl font-bold mb-1">Global Product Details</h2>
                            <p className="text-sm text-slate-500 mb-6">Core details identical across all physical store locations.</p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                {/* IMAGE UPLOAD COLUMN */}
                                <div className="flex flex-col items-center justify-center border-2 border-dashed border-slate-200 rounded-lg p-4 bg-slate-50 relative group">
                                    {imagePreview ? (
                                        <div className="relative w-full aspect-square max-h-48 rounded-md overflow-hidden">
                                            <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                            <button
                                                type="button"
                                                onClick={() => { setImagePreview(null); setValue("imageFile", null); }}
                                                className="absolute top-2 right-2 bg-red-600 text-white rounded-full p-1 shadow hover:bg-red-700 text-xs px-2"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ) : (
                                        <label htmlFor="product-image-main"
                                            className="flex flex-col items-center justify-center space-y-2 py-8 text-slate-500 hover:text-slate-800"
                                        >

                                            <span className="text-2xl">📷</span>
                                            <span className="text-xs font-semibold">Upload Product Image</span>
                                        </label>

                                    )}
                                    <input
                                        type="file"
                                        id="product-image-main"
                                        accept="image/*"
                                        // {...register("imageFile")}
                                        className="hidden"
                                        onChange={handleImageChange}
                                    />
                                </div>

                                {/* FIELDS COLUMNS */}
                                <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium">Product Name *</label>
                                        <Input
                                            {...register("name", { required: "Product name is required" })}
                                            placeholder="e.g. Wireless Mouse"
                                        />
                                        {errors.name && <span className="text-xs text-red-600">{errors.name.message}</span>}
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium">Default Global Price (ksh) *</label>
                                        <Input
                                            type="number"
                                            step="0.01"
                                            {...register("selling_price", {
                                                required: "Global base price is required",
                                                min: { value: 0, message: "Price cannot be negative" }
                                            })}
                                        />
                                        {errors.selling_price && <span className="text-xs text-red-600">{errors.selling_price.message}</span>}
                                    </div>
                                    <div className=" flex-col space-y-1.5 hidden">
                                        <label className="text-sm font-medium">Unit *</label>
                                        <Input
                                            {...register("unit")}
                                            placeholder="kgs"
                                        />
                                        {errors.unit && <span className="text-xs text-red-600">{errors.unit.message}</span>}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium">Categories *</label>
                                        <Controller
                                            name="category_id"
                                            defaultValue={defaultValues.category_id}
                                            control={control}
                                            rules={{ required: "Category is required!" }}
                                            render={({ field }) => (
                                                <Combobox
                                                    items={categories}
                                                    defaultValue={categories.find((cat: any) => cat.id == defaultValues.category_id)}
                                                    onValueChange={(e: any) => { field.onChange(e.id); }}
                                                    itemToStringValue={(cat) => cat.id}
                                                    itemToStringLabel={(cat) => cat.name}
                                                >
                                                    <ComboboxInput placeholder="choose product category" />
                                                    <ComboboxContent>
                                                        <ComboboxEmpty>No item found</ComboboxEmpty>
                                                        <ComboboxList>
                                                            {/* | sanguine|plagmatic| corelic| melanconic */}
                                                            {(category) => (
                                                                <ComboboxItem key={category.id} value={category}>{category.name}</ComboboxItem>
                                                            )}
                                                        </ComboboxList>

                                                    </ComboboxContent>
                                                </Combobox>
                                            )}
                                        />
                                        {errors.category_id && <span className="text-xs text-red-600">{errors.category_id.message}</span>}
                                    </div>

                                    <div className=" flex-col space-y-1.5 hidden">
                                        <label className="text-sm font-medium">Description:</label>
                                        <Input
                                            {...register("description")}
                                            placeholder="describe..."
                                        />
                                    </div>



                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium">SKU- optional(auto-generate)</label>
                                        <Input
                                            type="text"
                                            placeholder="e.g. LOGI-MX3S-BLK"
                                            {...register("sku")}
                                        />
                                        {errors.sku && <span className="text-xs text-red-600">{errors.sku.message}</span>}
                                    </div>

                                    <div className="flex flex-col space-y-1.5">
                                        <label className="text-sm font-medium">Barcode optional(auto-generate)</label>
                                        <Input
                                            type="text"
                                            {...register("barcode")}
                                        />
                                        {errors.barcode && <span className="text-xs text-red-600">{errors.barcode.message}</span>}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* SECTION 2: BRANCH INVENTORY & OVERRIDES */}
                        <div className="bg-white  border border-slate-200  p-6">
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                                <div>
                                    <h2 className="text-xl font-bold mb-1">Branch Configurations</h2>
                                    <p className="text-sm text-slate-500">Manage localized inventory metrics and branch pricing.</p>
                                </div>

                                {/* BULK ACTIONS TOOLBAR */}
                                <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-2 rounded-lg text-xs self-start">
                                    <span className="font-semibold text-slate-500 px-1">Bulk:</span>
                                    <div className="flex items-center gap-1">
                                        <Input
                                            type="number"
                                            placeholder="Price"
                                            value={bulkPrice}
                                            onChange={(e) => setBulkPrice(e.target.value)}
                                            className="h-8 w-20 text-xs px-2  bg-white"
                                        />
                                        <button type="button" onClick={applyBulkPrice} className="h-8 px-2 bg-slate-200 rounded hover:bg-slate-300 font-medium">Apply</button>
                                    </div>
                                    <span className="text-slate-300 mx-1">|</span>
                                    <div className="flex items-center gap-1">
                                        <Input
                                            type="number"
                                            placeholder="Stock"
                                            value={bulkStock}
                                            onChange={(e) => setBulkStock(e.target.value)}
                                            className="h-8 w-20 text-xs px-2  bg-white"
                                        />
                                        <button type="button" onClick={applyBulkStock} className="h-8 px-2 bg-slate-200 rounded hover:bg-slate-300 font-medium">Apply</button>
                                    </div>
                                </div>
                            </div>

                            {/* INLINE SPREADSHEET GRID */}
                            <div className="overflow-x-auto border rounded-lg">
                                <table className="w-full text-left border-collapse text-sm">
                                    <thead>
                                        <tr className="bg-slate-50 border-b border-slate-200">
                                            <th className="p-3 font-semibold text-slate-600">Branch Name</th>
                                            <th className="p-3 font-semibold text-slate-600 w-24">Status</th>
                                            <th className="p-3 font-semibold text-slate-600 w-24">existing stock</th>
                                            <th className="p-3 font-semibold text-slate-600 w-44">Stock adjust *</th>
                                            <th className="p-3 font-semibold text-slate-600 w-44">Reason</th>
                                            <th className="p-3 font-semibold text-slate-600 w-60">Local Price ($)</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {fields.map((field, index) => {
                                            const rowAvailability = branchesWatch?.[index]?.is_active ?? true;
                                            const localPriceValue = branchesWatch?.[index]?.localPrice;
                                            const isOverridden = localPriceValue !== undefined && localPriceValue !== null && String(localPriceValue) !== "" && Number(localPriceValue) !== Number(globalBasePrice);

                                            return (
                                                <tr key={field.id} className="border-b border-slate-100 hover:bg-slate-50/50">
                                                    {/* Branch Identity */}
                                                    <td className="p-3 font-medium">
                                                        {field.name}
                                                        <input type="hidden" {...register(`branches.${index}.id`)} />
                                                        <input type="hidden" {...register(`branches.${index}.name`)} />
                                                        <input type="hidden" {...register(`branches.${index}.available`)} />
                                                    </td>

                                                    {/* Status Toggle */}

                                                    <td className="p-3">
                                                        <label className="relative inline-flex items-center cursor-pointer">
                                                            <input
                                                                type="checkbox"
                                                                className="sr-only peer"
                                                                {...register(`branches.${index}.is_active`)}
                                                            />
                                                            <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-slate-800"></div>
                                                        </label>
                                                    </td>
                                                    <td className="p-3">
                                                        <span>{watch(`branches.${index}.available`)}</span>
                                                    </td>

                                                    {/* Inline Stock Input */}
                                                    <td className="p-3">
                                                        <input
                                                            type="number"
                                                            className="w-full border rounded px-2 py-1 disabled:bg-slate-100 disabled:text-slate-400"
                                                            disabled={!rowAvailability}
                                                            {...register(`branches.${index}.stock`, {
                                                                required: rowAvailability ? "Branch stock required!" : false,
                                                                min: { value: field.available ? "-" + field.available : 0, message: `Value not less than -${field.available || 0}` }
                                                            })}
                                                        />
                                                        {errors.branches?.[index]?.stock && (
                                                            <span className="text-[11px] text-red-600 block mt-0.5">{errors.branches[index]?.stock?.message}</span>
                                                        )}
                                                    </td>
                                                    <td>
                                                        {field.available ?
                                                            <Controller
                                                                name={`branches.${index}.reason`}
                                                                control={control}
                                                                defaultValue={field.reason}
                                                                rules={{ required: "Reason is required" }}
                                                                render={({ field:customField }) => (
                                                                    <Select defaultValue={field.reason} onValueChange={customField.onChange}>
                                                                        <SelectTrigger aria-invalid={!!errors.branches?.[index]?.reason}>
                                                                            <SelectValue  placeholder="Select a reason" />
                                                                        </SelectTrigger>
                                                                        <SelectContent>
                                                                            <SelectItem value="Expired Product">Expired Product</SelectItem>
                                                                            <SelectItem value="New Arrival">New Arrival</SelectItem>
                                                                            <SelectItem value="Head count mismatch">Head count mismatch</SelectItem>
                                                                            <SelectItem value="Physical shrinkage">Physical shrinkage</SelectItem>
                                                                            <SelectItem value="Damaged product">Damaged product</SelectItem>
                                                                            <SelectItem value="Administrative errors">Administrative errors</SelectItem>
                                                                            <SelectItem value="Other">Other</SelectItem>
                                                                        </SelectContent>
                                                                    </Select>
                                                                )}
                                                            /> :
                                                            <>
                                                                <Input readOnly type="text" {...register(`branches.${index}.reason`)} />
                                                                {/* <span>Inititial</span> */}
                                                            </>
                                                        }
                                                        {errors.branches?.[index]?.reason && (
                                                            <span className="text-[11px] text-red-600 block mt-0.5">{errors.branches[index]?.reason?.message}</span>
                                                        )}
                                                    </td>

                                                    {/* Inline Price with Inheritance Engine */}
                                                    <td className="p-3">
                                                        <div className="flex items-center gap-2 max-w-xs">
                                                            <div className="relative flex-1">
                                                                <input
                                                                    type="number"
                                                                    step="0.01"
                                                                    className={`w-full border rounded px-2 py-1 pr-2 disabled:bg-slate-100 ${isOverridden ? "border-amber-500 font-semibold text-amber-700 bg-amber-50/30" : "text-slate-500"}`}
                                                                    placeholder={globalBasePrice.toString()}
                                                                    disabled={!rowAvailability}
                                                                    {...register(`branches.${index}.localPrice`, {
                                                                        min: { value: 0, message: "Invalid price" },
                                                                        setValueAs: v => v === "" ? null : parseFloat(v)
                                                                    })}
                                                                />
                                                                {isOverridden && (
                                                                    <span className="absolute right-2 top-1.5 text-[9px] uppercase font-extrabold text-amber-600 bg-amber-100 px-1 rounded">
                                                                        .
                                                                    </span>
                                                                )}
                                                            </div>
                                                            {isOverridden && (
                                                                <button
                                                                    type="button"
                                                                    className="text-xs text-slate-400 hover:text-slate-600 font-medium"
                                                                    onClick={() => setValue(`branches.${index}.localPrice`, null)}
                                                                >
                                                                    Reset
                                                                </button>
                                                            )}
                                                        </div>
                                                        {errors.branches?.[index]?.localPrice && (
                                                            <span className="text-[11px] text-red-600 block mt-0.5">{errors.branches[index]?.localPrice?.message}</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* STICKY SAVE BAR */}
                        <div className="fixed bottom-0 left-0 right-0 border-t border-slate-200 bg-white/90 backdrop-blur-md py-4 shadow-md z-50">
                            <div className="max-w-6xl mx-auto px-6 flex justify-end gap-3">
                                <button
                                    type="button"
                                    className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-slate-50 disabled:opacity-50 hidden"
                                >
                                    Cancel
                                </button>
                                <Button
                                    type="submit"
                                    disabled={state != "idle"}
                                // className="px-4 py-2 bg-slate-900 text-white rounded-md text-sm font-medium hover:bg-slate-800  disabled:opacity-50"
                                >
                                    {state != "idle" ? "Saving changes..." : "Save Product Data"}
                                </Button>
                            </div>
                        </div>
                    </div>
                )
            }
            }
        </ReusableForm>

    );
};
