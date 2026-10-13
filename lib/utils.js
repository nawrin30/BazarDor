export function bnNumber(value) {
    return String(value).replace(/[0-9]/g, (d) => "০১২৩৪৫৬৭৮৯"[Number(d)]);
}
export function money(value) {
    return bnNumber(new Intl.NumberFormat("en-IN").format(Math.round(value)));
}
export function changeText(value) {
    if (value === 0)
        return "—০.০%";
    return `${value > 0 ? "▲" : "▼"} ${bnNumber(Math.abs(value).toFixed(1))}%`;
}
