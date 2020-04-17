
export function timeStampToDateTime(timestamp: number) {
        const date = new Date(timestamp);
        const y = date.getFullYear();
        var m = date.getMonth();
        const d = date.getDay();
        const time = date.toTimeString().substr(0, 8);
        return y + "-" + (m < 10 ? "0" + m : m) + "-" + (d < 10 ? "0" + d : d) + " " + time;
    }
