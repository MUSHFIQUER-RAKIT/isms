"use client";
import { useState } from "react";

export default function useGetUser() {
  const [users, setUsers] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    setLoading(true);
    const res = await fetch("/api/dashboard/user");
    const data = await res.json();
    setUsers(data || []);
    setTotal(data.length || 0);
    setLoading(false);
  };

  return { loading, users, total, fetchUsers };
}
