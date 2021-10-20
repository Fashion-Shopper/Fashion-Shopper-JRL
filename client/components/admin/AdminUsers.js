import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../../store/admin/adminUsers";

const AdminUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, []);

  const users = useSelector((state) => state.users);

  return <pre>{JSON.stringify(users, null, 2)}</pre>;
};

export default AdminUsers;
