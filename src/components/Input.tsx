"use client"

import {Color} from "@/types/theme";
import clsx from "clsx";
import {useCallback, useMemo} from "react";

export interface InputProps {
    value?: string;
    onValueChange?: (value: string) => void;
    error?: boolean;
    success?: boolean;
    className?: string;
    label?: string;
    placeholder?: string;
    name?: string;
    required?: boolean
    type?: "text" | "number"
}

interface InputInnerProps extends InputProps {
    color?: Color;
}

const Input = ({color, error, onValueChange, value, success, className, label, ...props}: InputInnerProps) => {
    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (onValueChange)
            onValueChange(e.target.value)
    }, [onValueChange])
    const classNameInput = useMemo(() => clsx(color && `input-${color}`, error && 'input-error', success && 'input-success'),
        [color, error, success])
    return (
        <div className={`form-control w-full max-w-xs ${className}`}>
            {label && <label className={"label"}>
                <span className={"label-text"}>{label}</span>
            </label>}
            <input
                {...props}
                type={"text"}
                className={`input input-bordered w-full max-w-xs ${classNameInput}`}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}


export const PrimaryInput = (props: InputInnerProps) => <Input color={"primary"} {...props}/>