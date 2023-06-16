import {categories} from "@/components/Categories/categories";
import React from "react";
import Category from "@/components/Categories/Category";
import {CalculatorForm} from "@/components/Calculator/CalculatorForm";


export default function Calculator() {
    return <CalculatorForm>
        {Object.keys(categories).map(field => <Category category={categories[field]} key={field}
                                                        categoryKey={field}/>)}
        <button className={"btn btn-primary col-span-full justify-self-center max-w-xl"} type={"submit"}>Oblicz
        </button>
    </CalculatorForm>
}