import { useDispatch } from "react-redux";
import { notificationActions } from "../components/Notification/notification.slice";
/**
 * Hook support for set data to notify, turn on notify
 * @returns function set notify
 */
const useNotify = () => {
    const dispatch = useDispatch();
    const setNotify = (notify) => {
        dispatch(notificationActions.setNotify(notify));
    };
    return { setNotify };
};

export default useNotify;
