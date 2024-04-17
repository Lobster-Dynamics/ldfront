"use client";

import Navbar from "@/components/navbar/Navbar";
import { RootState } from "@/redux/store";
import { loadAuth } from "@/redux/thunks/authThunk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    children: React.ReactNode;
}

export default function layout({ children }: Props) {
    const { auth, cargando } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<any>();
    const router = useRouter();

    useEffect(() => {
        dispatch(loadAuth());
    }, []);

    useEffect(() => {
        if (!auth?.uid && !cargando) {
            router.push("/login");
        }
    }, [cargando, auth, router]);

    return (
        <>
            <Navbar isAuth={false} />
            {children}
        </>
    );
}