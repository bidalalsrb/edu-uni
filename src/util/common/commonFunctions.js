export function formatDateTime(str) {
    return str.replace("T", " ").slice(0, 16);
}