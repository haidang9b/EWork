import { accessTokenCurrentSelector } from "../redux/selectors";
import { useSelector } from "react-redux";

const getUserFromToken = (token) => {
    try {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            atob(base64)
                .split("")
                .map(function (c) {
                    return (
                        "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
                    );
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    } catch (e) {
        return null;
    }
};
const useAuth = () => {
    let token = useSelector(accessTokenCurrentSelector);

    return {
        user: getUserFromToken(token),
    };
};

export default useAuth;
