export default {
    methods: {
        getErrorMessage(error) {
            if (error.response) {
                return error.response.data.data.message;
            } else {
                return "Terjadi kesalahan. Silahkan coba ulang lain kali.";
            }
        }
    }
}