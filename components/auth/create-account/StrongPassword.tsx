interface StrongPasswordProps {
	id: string;
	placeholder: string;
	value: string;
	setValue: (value: string) => void;
}

export default function StrongPassword({
	id,
	placeholder,
	value,
	setValue,
}: StrongPasswordProps) {
	return (
		<div className="w-full">
			<div className="flex">
				<div className="relative flex-1">
					<input
						type="password"
						placeholder={placeholder}
						className="mt-5 w-full border-b border-slate-300 text-xl text-black outline-none focus:border-slate-600"
						value={value}
						onChange={(e) => setValue(e.target.value)}
                        id={id}
                        data-test-id={id}
					/>
					<div
						id={`hs-strong-password-popover-${id}`}
						className="absolute z-10 hidden w-full rounded-lg bg-white p-4 shadow-md"
					>
						<div
							id={`hs-strong-password-in-popover-${id}`}
                            data-hs-strong-password={`{"target": "#${id}", "hints": "#hs-strong-password-popover-${id}", "stripClasses": "hs-strong-password:opacity-100 hs-strong-password-accepted:bg-teal-500 h-2 flex-auto rounded-full bg-blueFrida-500 opacity-50 mx-1", "mode": "popover"}`}
							className="-mx-1 mt-2 flex"
						></div>

						<h4 className="mt-3 text-sm font-semibold text-gray-800">
							Tu contraseña debe contener:
						</h4>

						<ul className="space-y-1 text-sm text-gray-500">
							<li
								data-hs-strong-password-hints-rule-text="min-length"
								className="flex items-center gap-x-2 hs-strong-password-active:text-teal-500"
							>
								<span className="hidden" data-check="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</span>
								<span data-uncheck="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18"></path>
										<path d="m6 6 12 12"></path>
									</svg>
								</span>
								Debe tener al menos 6 caracteres.
							</li>
							<li
								data-hs-strong-password-hints-rule-text="lowercase"
								className="flex items-center gap-x-2 hs-strong-password-active:text-teal-500"
							>
								<span className="hidden" data-check="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</span>
								<span data-uncheck="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18"></path>
										<path d="m6 6 12 12"></path>
									</svg>
								</span>
								Debe contener minúsculas.
							</li>
							<li
								data-hs-strong-password-hints-rule-text="uppercase"
								className="flex items-center gap-x-2 hs-strong-password-active:text-teal-500"
							>
								<span className="hidden" data-check="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</span>
								<span data-uncheck="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18"></path>
										<path d="m6 6 12 12"></path>
									</svg>
								</span>
								Debe contener mayúsculas.
							</li>
							<li
								data-hs-strong-password-hints-rule-text="numbers"
								className="flex items-center gap-x-2 hs-strong-password-active:text-teal-500"
							>
								<span className="hidden" data-check="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</span>
								<span data-uncheck="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18"></path>
										<path d="m6 6 12 12"></path>
									</svg>
								</span>
								Debe contener números.
							</li>
							<li
								data-hs-strong-password-hints-rule-text="special-characters"
								className="flex items-center gap-x-2 hs-strong-password-active:text-teal-500"
							>
								<span className="hidden" data-check="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<polyline points="20 6 9 17 4 12"></polyline>
									</svg>
								</span>
								<span data-uncheck="">
									<svg
										className="size-4 flex-shrink-0"
										xmlns="http://www.w3.org/2000/svg"
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										stroke="currentColor"
										stroke-width="2"
										stroke-linecap="round"
										stroke-linejoin="round"
									>
										<path d="M18 6 6 18"></path>
										<path d="m6 6 12 12"></path>
									</svg>
								</span>
								Debe contener caracteres especiales.
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
}
