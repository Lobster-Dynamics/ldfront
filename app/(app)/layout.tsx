"use client";

import Navbar from "@/components/navbar/Navbar";
import PageLoader from "@/components/PageLoader/PageLoader";
import { deleteElement } from "@/redux/slices/stackSlice";
import { RootState } from "@/redux/store";
import { loadAuth } from "@/redux/thunks/authThunk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import Swal from "sweetalert2";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { auth, cargando } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<any>();

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		`${process.env.NEXT_PUBLIC_NOTIFICATIONS_WEBSOCKET}?auth_token=${auth !== null && auth !== undefined ? auth.token : "dummy"}`,
        {
            shouldReconnect: (event) => true
        }
	);

	useEffect(() => {
		if (lastMessage != null) {
            const messageData = JSON.parse(lastMessage.data);
			console.log("NOTIFICATION",lastMessage.data);
			Swal.fire({
				icon: "info",
				title: "Recieved Notification",
				text: "Recieved notification",
			});

         dispatch(deleteElement(String(messageData.data.document_id)));
		}
	}, [lastMessage,dispatch]);


	const router = useRouter();

	useEffect(() => {
		if (!auth) dispatch(loadAuth());
	}, [dispatch, auth]);

	useEffect(() => {
		if (!auth?.uid && !cargando) {
			router.push("/login");
		}
	}, [cargando, auth, router]);

	if (cargando || !auth?.uid) {
		return <PageLoader />;
	}

	return (
		<>
			<Navbar isAuth={false} />
			{children}
			<div id="portal-root" />
		</>
	);
}
