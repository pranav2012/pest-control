'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const paymentMethods = [
  {
    name: 'Paytm',
    number: '9958138256',
    icon: 'fa-brands fa-google-pay',
  },
  {
    name: 'Google Pay',
    number: '9958138256',
    icon: 'fa-brands fa-google-pay',
  },
  {
    name: 'Phone Pay',
    number: '9958138256',
    icon: 'fa-solid fa-mobile-screen-button',
  },
  {
    name: 'UPI',
    number: '9958138256@paytm',
    icon: 'fa-solid fa-qrcode',
  },
];

export default function PaymentPage() {
  const [transactionId, setTransactionId] = useState('');

  const handleWhatsAppShare = () => {
    const message = `Hi, I have made a payment with transaction ID: ${transactionId}`;
    const whatsappUrl = `https://api.whatsapp.com/send?phone=918882002546&text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="min-h-[calc(100vh-110px)] bg-gray-50/50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#075e54] mb-3">
              Secure Payment
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Choose your preferred payment method and share the transaction details with us
            </p>
          </motion.div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Payment Methods */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-8"
            >
              {/* Payment Methods Card */}
              <Card className="border-[#075e54]/10 shadow-lg">
                <CardHeader className="border-b border-[#075e54]/10 bg-[#075e54]/5 pb-4">
                  <CardTitle className="text-[#075e54] text-2xl">Payment Methods</CardTitle>
                  <CardDescription className="text-base">
                    Select any of the following payment options
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    {paymentMethods.map((method, index) => (
                      <motion.div
                        key={method.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 * index }}
                        className="flex items-center justify-between p-4 rounded-lg border border-[#075e54]/10 hover:bg-[#25D366]/5 transition-colors group"
                      >
                        <div className="flex items-center gap-4">
                          <div className="bg-[#075e54]/10 p-3 rounded-lg group-hover:bg-[#075e54]/20 transition-colors">
                            <i className={`${method.icon} text-2xl text-[#075e54]`}></i>
                          </div>
                          <div>
                            <h3 className="font-medium text-[#075e54] text-lg">{method.name}</h3>
                            <p className="text-gray-600">{method.number}</p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyToClipboard(method.number)}
                          className="hover:bg-[#25D366]/10 hover:text-[#075e54] transition-colors"
                        >
                          <i className="fa-regular fa-copy mr-2"></i>
                          Copy
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
                transition={{ delay: 0.4 }}
              >
                <Card className="border-[#075e54]/10 shadow-lg">
                  <CardHeader className="border-b border-[#075e54]/10 bg-[#075e54]/5 pb-4">
                    <CardTitle className="text-[#075e54] text-2xl">Share Payment Details</CardTitle>
                    <CardDescription className="text-base">
                      After making the payment, please share your transaction details with us
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="transaction-id" className="text-[#075e54] text-base">
                          Transaction ID
                        </Label>
                        <Input
                          id="transaction-id"
                          placeholder="Enter your transaction ID"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          className="border-[#075e54]/20 focus:border-[#25D366] focus:ring-[#25D366] text-lg py-6"
                        />
                      </div>
                      <Button
                        className="w-full bg-[#25D366] hover:bg-[#25D366]/90 text-white py-6 text-lg"
                        onClick={handleWhatsAppShare}
                        disabled={!transactionId}
                      >
                        <i className="fab fa-whatsapp mr-2 text-xl"></i>
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
              transition={{ delay: 0.3 }}
            >
              <Card className="border-[#075e54]/10 shadow-lg h-full">
                <CardHeader className="border-b border-[#075e54]/10 bg-[#075e54]/5 pb-4">
                  <CardTitle className="text-[#075e54] text-2xl">Scan QR Code</CardTitle>
                  <CardDescription className="text-base">
                    Scan this QR code to make the payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center">
                    <div className="relative w-72 h-72 mb-8 group">
                      <div className="absolute inset-0 bg-[#075e54]/5 rounded-lg group-hover:bg-[#075e54]/10 transition-colors"></div>
                      <Image
                        src="/images/paymentQR.png"
                        alt="Payment QR Code"
                        fill
                        className="object-contain p-4"
                        priority
                      />
                    </div>
                    <div className="w-full space-y-6 bg-[#075e54]/5 p-6 rounded-lg">
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[#075e54] uppercase tracking-wide">Bank Account Name</p>
                        <p className="text-xl font-medium">Deepak Samuel</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-sm font-medium text-[#075e54] uppercase tracking-wide">UPI ID</p>
                        <div className="flex items-center justify-between bg-white p-4 rounded-lg border border-[#075e54]/10">
                          <p className="text-lg font-medium">9958138256@paytm</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyToClipboard('9958138256@paytm')}
                            className="hover:bg-[#25D366]/10 hover:text-[#075e54] ml-4"
                          >
                            <i className="fa-regular fa-copy text-lg"></i>
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