export default {
    data: () => ({
        msPerMinute: 60 * 1000,
        msPerHour: 60 * 60 * 1000,
        msPerDay: 24 * 60 * 60 * 1000,
        msPerMonth: 30 * 24 * 60 * 60 * 1000,
        msPerYear: 365 * 24 * 60 * 60 * 1000
    }),
    methods: {
        getTimestampToRelativeTime(originalTimestamp) {
            let current = new Date();
            let previous = new Date(originalTimestamp);

            let elapsed = current - previous;

            if (elapsed < this.msPerMinute) {
                return `${Math.round(elapsed / 1000)} detik lalu`
            } else if (elapsed < this.msPerHour) {
                return `${Math.round(elapsed / this.msPerMinute)} menit lalu`
            } else if (elapsed < this.msPerDay) {
                return `${Math.round(elapsed / this.msPerHour)} jam lalu`
            } else if (elapsed < this.msPerMonth) {
                return `${Math.round(elapsed / this.msPerDay)} hari lalu`
            } else if (elapsed < this.msPerYear) {
                return `${Math.round(elapsed / this.msPerMonth)} bulan lalu`
            } else {
                return `${Math.round(elapsed / this.msPerMonth)} tahun lalu`
            }
        }
    }
}