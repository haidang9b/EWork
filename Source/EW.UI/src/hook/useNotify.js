import { useDispatch } from "react-redux";
import { notificationActions } from "../components/Notification/notification.slice";

const useNotify = () => {
    const dispatch = useDispatch();
    const setNotify = (notify) => {
        dispatch(notificationActions.setNotify(notify));
    };
    return { setNotify };
};

export default useNotify;
