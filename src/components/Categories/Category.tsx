import {CalculatorCategory} from "@/components/Categories/categories";
import {PrimaryInput} from "@/components/Input";
import CategoryAsk from "@/components/Categories/CategoryAsk";

interface CategoryProps {
    category: CalculatorCategory,
    categoryKey: string;
}

export default function Category({
                                     category: {
                                         label,
                                         labelExtended,
                                         labelPrimary,
                                         askLabel,
                                         ask,
                                         onlyExtended,
                                         fields,
                                         required,
                                     },
                                     categoryKey
                                 }: CategoryProps) {
    if (ask)
        return <CategoryAsk askLabel={askLabel ?? ""} fields={fields ?? {}}/>
    return (
        <>
            <p className={"text-base-content"}>{label}</p>
            {!onlyExtended ?
                <PrimaryInput required={required} type={"number"} placeholder={labelPrimary ?? "Podstawa"}
                              name={`${categoryKey}-primary`}/>
                : <div/>}
            <PrimaryInput type={"number"} placeholder={labelExtended ?? "Rozszerzenie"}
                          name={`${categoryKey}-extended`}/>
        </>
    )
}