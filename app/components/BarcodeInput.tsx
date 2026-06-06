import React, { useState, useRef, useEffect } from "react";
import { Input } from "~/components/ui/input";

export default function BarcodeScannerInput({ onProductScanned }: { onProductScanned: (barcode: string) => void }) {
    const [barcode, setBarcode] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    // Keep the input focused automatically so the clerk doesn't have to keep clicking it
    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!barcode.trim()) return;

        // Trigger parent callback function to search Laravel API
        onProductScanned(barcode);

        // Clear input for the next item scan
        setBarcode("");
    };

    return (
        <form onSubmit={handleSubmit} className="w-full max-w-sm flex gap-2">
            <Input
                ref={inputRef}
                type="text"
                placeholder="Scan item barcode here..."
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                className="font-mono"
                autoComplete="off"
            />
        </form>
    );
}



export function useGlobalBarcodeScanner(onScanSuccess: (barcode: string) => void) {
    const bufferRef = useRef<string>("");
    const lastKeyTimeRef = useRef<number>(Date.now());

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const currentTime = Date.now();

            // Hardware scanners type incredibly fast (usually less than 30ms between characters)
            // This threshold helps differentiate human typing from a barcode scan
            const timeDiff = currentTime - lastKeyTimeRef.current;
            lastKeyTimeRef.current = currentTime;

            // If the pause between keystrokes is too long, reset the stream buffer
            if (timeDiff > 50) {
                bufferRef.current = "";
            }

            // Check if the scanner hit the final 'Enter' key signaling end of scan code
            if (event.key === "Enter") {
                if (bufferRef.current.length > 3) {
                    // Avoid false triggers on random enters
                    event.preventDefault();
                    event.stopPropagation();
                    onScanSuccess(bufferRef.current);
                    bufferRef.current = ""; // Reset buffer
                }
                return;
            }

            // Ignore functional control keys (Shift, Alt, etc.)
            if (event.key.length === 1) {
                bufferRef.current += event.key;
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [onScanSuccess]);
}
