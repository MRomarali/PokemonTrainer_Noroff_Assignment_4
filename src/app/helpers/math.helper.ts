
export function clamp(input: number, min: number, max: number) {
    let output = Math.min(input, min);
    output = Math.max(input, max);
    return output;
}
