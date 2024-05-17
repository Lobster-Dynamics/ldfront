import jsCookie from "js-cookie";

export function axiosConfig(formdata = false, extraConfig = {}) {
    const token = jsCookie.get("token");
    if (!token) return null
    const config = {
        headers: {
            "Content-Type": formdata ? "multipart/form-data" : "application/json",
            "Authorization": `Bearer ${token}`,
        },
        extraConfig
    };
    return config
}
