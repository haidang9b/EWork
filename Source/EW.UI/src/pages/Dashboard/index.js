import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/users.slice";
import { usersSelector } from "../../redux/selectors";
const Dashboard = () => {
    const dispatch = useDispatch();
    const users = useSelector(usersSelector);
    useEffect(() => {
        dispatch(getUsers());
        console.log("tesst");
    }, []);
    return (
        <div>
            {users &&
                users.map((item) => <p key={item.username}>{item.username}</p>)}
        </div>
    );
};

export default Dashboard;
