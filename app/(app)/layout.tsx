"use client";

import Navbar from "@/components/navbar/Navbar";
import PageLoader from "@/components/PageLoader/PageLoader";
import { ChangeElement } from "@/redux/slices/stackSlice";
import { RootState } from "@/redux/store";
import { loadAuth } from "@/redux/thunks/authThunk";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useWebSocket from "react-use-websocket";
import { toast, ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
	children: React.ReactNode;
}

export default function Layout({ children }: Props) {
	const { auth, cargando } = useSelector((state: RootState) => state.auth);
	const dispatch = useDispatch<any>();

	const { sendMessage, lastMessage, readyState } = useWebSocket(
		`${process.env.NEXT_PUBLIC_NOTIFICATIONS_WEBSOCKET}?auth_token=${auth !== null && auth !== undefined ? auth.token : "dummy"}`,
	);

	useEffect(() => {
		if (lastMessage != null) {
			const messageData = JSON.parse(lastMessage.data);
			console.log(messageData);
			if (messageData.event_type === "DOCUMENT_CREATED") {
				dispatch(ChangeElement(String(messageData.data.document_id)));

				toast.info(
					<div>
						<strong>Nuevo Documento Creado</strong>
						<p>Haga click aqui para acceder al documento!</p>
					</div>,
					{
						position: "top-right",
						onClick: () => {
							window.open(
								`/documento?id=${messageData.data.document_id}`,
								"_blank",
							);
						},
						transition: Slide,
						icon: (
							<span role="img" aria-label="document">
								📄
							</span>
						),
						autoClose: 8000,
						style: {
							backgroundColor: "#ffffff",
							border: "1px solid #7B20C3",
                            color: "#AC73D9",
						},
						progressStyle: {
							background: "#7B20C3",
						},
					},
				);
			}
		}
	}, [lastMessage, dispatch]);

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
			<ToastContainer />
			<div id="portal-root" />
		</>
	);
}
