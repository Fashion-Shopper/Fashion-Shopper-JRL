import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAdminUsers } from "../../store/admin/adminUsers";

const AdminUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAdminUsers());
  }, []);

  const adminUsers = useSelector((state) => state.adminUsers);

  return <pre>{JSON.stringify(adminUsers, null, 2)}</pre>;
};

export default AdminUsers;
