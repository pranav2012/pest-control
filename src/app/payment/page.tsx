"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";

const paymentMethods = [
	{
		name: "UPI",
		number: "8882002546",
		icon: "fa-solid fa-qrcode",
	},
];

export default function PaymentPage() {
	const [transactionId, setTransactionId] = useState("");

	const handleWhatsAppShare = () => {
		const message = `Hi, I have made a payment with transaction ID: ${transactionId}`;
		const whatsappUrl = `https://api.whatsapp.com/send?phone=918882002546&text=${encodeURIComponent(message)}`;
		window.open(whatsappUrl, "_blank");
	};

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		toast.success("Copied to clipboard!");
	};

	return (
		<div className="min-h-[calc(100vh-110px)] bg-gradient-to-b from-gray-900 via-gray-900 to-gray-900/95 py-12 border-b border-gray-800">
			<div className="container mx-auto px-4">
				<div className="max-w-5xl mx-auto">
					{/* Header Section */}
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-center mb-12">
						<h1 className="text-4xl font-bold text-white mb-3">
							Secure Payment
						</h1>
						<p className="text-gray-300 text-lg max-w-2xl mx-auto">
							Choose your preferred payment method and share the
							transaction details with us
						</p>
					</motion.div>

					{/* Main Content */}
					<div className="grid lg:grid-cols-2 gap-4 lg:gap-8">
						{/* Left Column - Payment Methods */}
						<motion.div
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2 }}
							className="space-y-4 lg:space-y-8">
							{/* Payment Methods Card */}
							<Card className="border-[#B9FB4B]/10 bg-gray-900 shadow-lg">
								<CardHeader className="border-b border-gray-800 bg-gray-900/50 pb-4">
									<CardTitle className="text-white text-xl lg:text-2xl">
										Payment Methods
									</CardTitle>
									<CardDescription className="text-gray-300 text-sm lg:text-base">
										Select any of the following payment
										options
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-4 lg:pt-6">
									<div className="space-y-3 lg:space-y-4">
										{paymentMethods.map((method, index) => (
											<motion.div
												key={method.name}
												initial={{ opacity: 0, x: -20 }}
												animate={{ opacity: 1, x: 0 }}
												transition={{
													delay: 0.1 * index,
												}}
												className="flex items-center justify-between p-3 lg:p-4 rounded-lg border border-gray-800 bg-gray-800/50 hover:bg-gray-800 transition-colors group">
												<div className="flex items-center gap-3 lg:gap-4">
													<div className="bg-[#B9FB4B]/10 p-2.5 lg:p-3 rounded-lg group-hover:bg-[#B9FB4B]/20 transition-colors">
														<i
															className={`${method.icon} text-xl lg:text-2xl text-[#B9FB4B]`}></i>
													</div>
													<div>
														<h3 className="font-medium text-white text-base lg:text-lg">
															{method.name}
														</h3>
														<p className="text-gray-300 text-sm">
															{method.number}
														</p>
													</div>
												</div>
												<Button
													variant="ghost"
													size="sm"
													onClick={() =>
														copyToClipboard(
															method.number
														)
													}
													className="hover:bg-[#B9FB4B]/10 text-[#B9FB4B] hover:text-[#B9FB4B] transition-colors ml-2 shrink-0">
													<i className="fa-regular fa-copy mr-1.5 lg:mr-2"></i>
													<span className="hidden sm:inline">
														Copy
													</span>
												</Button>
											</motion.div>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Transaction Details Card */}
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: 0.4 }}>
								<Card className="border-[#B9FB4B]/10 bg-gray-900 shadow-lg">
									<CardHeader className="border-b border-gray-800 bg-gray-900/50 pb-4">
										<CardTitle className="text-white text-xl lg:text-2xl">
											Share Payment Details
										</CardTitle>
										<CardDescription className="text-gray-300 text-sm lg:text-base">
											After making the payment, please
											share your transaction details with
											us
										</CardDescription>
									</CardHeader>
									<CardContent className="pt-4 lg:pt-6">
										<div className="space-y-4">
											<div className="space-y-2">
												<Label
													htmlFor="transaction-id"
													className="text-white text-sm lg:text-base">
													Transaction ID
												</Label>
												<Input
													id="transaction-id"
													placeholder="Enter your transaction ID"
													value={transactionId}
													onChange={(e) =>
														setTransactionId(
															e.target.value
														)
													}
													className="bg-gray-800 border-gray-700 text-white focus:border-[#B9FB4B] focus:ring-[#B9FB4B] text-base lg:text-lg py-4 lg:py-6"
												/>
											</div>
											<Button
												className="w-full bg-[#B9FB4B] hover:bg-[#B9FB4B]/90 text-gray-900 py-4 lg:py-6 text-base lg:text-lg"
												onClick={handleWhatsAppShare}
												disabled={!transactionId}>
												<i className="fab fa-whatsapp mr-2 text-lg lg:text-xl"></i>
												Share on WhatsApp
											</Button>
										</div>
									</CardContent>
								</Card>
							</motion.div>
						</motion.div>

						{/* Right Column - QR Code */}
						<motion.div
							initial={{ opacity: 0, x: 20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3 }}>
							<Card className="border-[#B9FB4B]/10 bg-gray-900 shadow-lg h-full">
								<CardHeader className="border-b border-gray-800 bg-gray-900/50 pb-4">
									<CardTitle className="text-white text-xl lg:text-2xl">
										Scan QR Code
									</CardTitle>
									<CardDescription className="text-gray-300 text-sm lg:text-base">
										Scan this QR code to make the payment
									</CardDescription>
								</CardHeader>
								<CardContent className="pt-4 lg:pt-6">
									<div className="flex flex-col items-center">
										<div className="relative w-full max-w-[280px] aspect-square mb-6 lg:mb-8 group mx-auto">
											<div className="absolute inset-0 bg-[#B9FB4B]/5 rounded-lg group-hover:bg-[#B9FB4B]/10 transition-colors"></div>
											<Image
												src="/images/paymentQR.png"
												alt="Payment QR Code"
												fill
												className="object-contain p-4"
												priority
											/>
										</div>
										<div className="w-full space-y-4 lg:space-y-6 bg-gray-800/50 p-4 lg:p-6 rounded-lg">
											<div className="space-y-1 lg:space-y-2">
												<p className="text-xs lg:text-sm font-medium text-[#B9FB4B] uppercase tracking-wide">
													Bank Account Name
												</p>
												<p className="text-lg lg:text-xl font-medium text-white whitespace-nowrap">
													Alpha Beneficent Care Pvt.
													Ltd.
												</p>
											</div>
											<div className="space-y-1 lg:space-y-2">
												<p className="text-xs lg:text-sm font-medium text-[#B9FB4B] uppercase tracking-wide">
													UPI ID
												</p>
												<div className="flex items-center justify-between bg-gray-900 p-3 lg:p-4 rounded-lg border border-gray-800">
													<p className="text-base lg:text-lg font-medium text-white whitespace-nowrap overflow-x-auto scrollbar-none">
														9958138256@okbizaxis
													</p>
													<Button
														variant="ghost"
														size="sm"
														onClick={() =>
															copyToClipboard(
																"9958138256@okbizaxis"
															)
														}
														className="hover:bg-[#B9FB4B]/10 text-[#B9FB4B] hover:text-[#B9FB4B] ml-2 shrink-0">
														<i className="fa-regular fa-copy text-base lg:text-lg"></i>
													</Button>
												</div>
											</div>
										</div>
									</div>
								</CardContent>
							</Card>
						</motion.div>
					</div>
				</div>
			</div>
		</div>
	);
}
