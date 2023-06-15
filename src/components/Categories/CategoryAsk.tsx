"use client"

import {Categories} from "@/components/Categories/categories";
import {useState} from "react";
import Checkbox from "@/components/Checkbox";
import Category from "@/components/Categories/Category";

interface CategoryAskProps {
    askLabel: string;
    fields: Categories
}

export default function CategoryAsk({askLabel, fields}: CategoryAskProps) {
    const [checked, setChecked] = useState(false)
    return (
        <>
            <Checkbox label={askLabel} onChecked={setChecked} className={"col-span-full w-fit"}/>
            {checked && Object.keys(fields).map(field => <Category category={fields[field]} key={field}
                                                                   categoryKey={field}/>)}
        </>
    )
}