const { VITE_BASE_URL } = import.meta.env
export const POST: any = {
    GOOGLE_REVIEW: { url: VITE_BASE_URL + "users/create-google-review", method: "POST" },
    TRIPADVISOR_REVIEW: { url: VITE_BASE_URL + "users/create-tripadvisor-review", method: "POST" },
    NEGATIVE_REVIEW: {url: VITE_BASE_URL + "users/create-negative-review", method: "POST"}
}