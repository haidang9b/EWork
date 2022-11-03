import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers, usersSelector } from "../../redux/users.slice";
import { isLoadingSelector } from "../../redux/selectors";
import Loading from "../../components/Loading";
const Dashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    const isLoading = useSelector(isLoadingSelector);
    useEffect(() => {
        dispatch(getUsers());
    }, []);
    return (
        <div>
            {isLoading && <Loading />}
            {users.users &&
                users.users.map((item) => (
                    <p key={item.username}>{item.username}</p>
                ))}
        </div>
    );
};

export default Dashboard;
