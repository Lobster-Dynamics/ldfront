"use client";

import Navbar from "@/components/navbar/Navbar";
import PageLoader from "@/components/PageLoader/PageLoader";
import { RootState } from "@/redux/store";
import { loadAuth } from "@/redux/thunks/authThunk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
    children: React.ReactNode;
}

export default function Layout({ children }: Props) {
    const { auth, cargando } = useSelector((state: RootState) => state.auth);

    const dispatch = useDispatch<any>();
    const router = useRouter();

    useEffect(() => {
        dispatch(loadAuth());
    }, [dispatch]);

    useEffect(() => {
        if (auth?.uid && !cargando) {
            router.push("/file-explorer");
        }
    }, [cargando, auth, router]);

    if (cargando || auth?.uid) {
        return <PageLoader />;
    }

    return (
        <>
            <Navbar isAuth={true} />
            {children}
        </>
    );
}