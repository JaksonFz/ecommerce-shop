import { useState } from "react";

interface QuantityInputProps {
    initialQuantity?: number;
    onChange?: (value: number) => void;
    className?: string;
}

export function QuantityInput({
    initialQuantity = 1,
    onChange,
    className = "",
}: QuantityInputProps) {
    const [quantity, setQuantity] = useState(initialQuantity);

    function increase() {
        const newValue = quantity + 1;
        setQuantity(newValue);
        onChange?.(newValue);
    }

    function decrease() {
        if (quantity <= 1) return;
        const newValue = quantity - 1;
        setQuantity(newValue);
        onChange?.(newValue);
    }

    return (
        <div className={`flex items-center gap-2 ${className}`}>
            <button onClick={decrease} className="px-2 border">-</button>
            <span className="w-6 text-center">{quantity}</span>
            <button onClick={increase} className="px-2 border">+</button>
        </div>
    );
}
