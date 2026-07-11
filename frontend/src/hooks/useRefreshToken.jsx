import axiosClient from "../api/axiosClient";
const useRefreshToken = () => {
    const refresh = async () => {
        const response = await axiosClient.get("/token/refresh/");
        return response.data.access;
    }
    return { refresh };
};

export default useRefreshToken;
