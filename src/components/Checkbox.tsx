interface CheckboxProps {
    label: string;
    onChecked: (checked: boolean) => void;
    className?: string;
}

export default function Checkbox({onChecked, label, className}: CheckboxProps) {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (onChecked) onChecked(e.target.checked)
    }
    return <div className={`form-control ${className}`}>
        <label className="label cursor-pointer">
            <span className="label-text">{label}</span>
            <input type="checkbox" className="checkbox checkbox-primary" onChange={onChange}/>
        </label>
    </div>
}