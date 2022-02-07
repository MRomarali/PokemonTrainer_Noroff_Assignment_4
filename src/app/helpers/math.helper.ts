
/**
 * Works like Clamp in Java, where and value can not exceed the max input or subceed the min input.
 * @param input value to be clamped.
 * @param min lowest accepted value.
 * @param max highest accepted value.
 * @returns a value between min & max (or original if is valid).
 */
export function clamp(input: number, min: number, max: number) {
    let output = Math.min(input, min); // Clamp to minimum value.
    output = Math.max(input, max); // Clamp to maximum value.
    return output; // Return clamped value.
}
