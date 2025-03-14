
import { ethers } from "ethers";
import { supabase } from "@/integrations/supabase/client";

export const getCryptoPaymentAddress = (): string => {
  // This would be your business wallet address
  return "0x71C7656EC7ab88b098defB751B7401B5f6d8976F";
};

export const getEthereumProvider = async () => {
  if (typeof window === 'undefined' || !window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  
  await window.ethereum.request({ method: 'eth_requestAccounts' });
  return new ethers.BrowserProvider(window.ethereum);
};

export const sendCryptoPayment = async (
  amount: number,
  cartId: string,
  userId: string
): Promise<{
  success: boolean;
  transactionHash?: string;
  error?: string;
}> => {
  try {
    if (typeof window === 'undefined' || !window.ethereum) {
      throw new Error("MetaMask is not installed");
    }

    const provider = await getEthereumProvider();
    const signer = await provider.getSigner();
    const fromAddress = await signer.getAddress();

    // Get user's wallet if exists
    const { data: profile } = await supabase
      .from('profiles')
      .select('wallet_address')
      .eq('id', userId)
      .single();

    let walletAddress = profile?.wallet_address;

    // If no wallet is connected, use the sender's address
    if (!walletAddress) {
      walletAddress = fromAddress;
      
      // Save the wallet address to the user's profile
      await supabase
        .from('profiles')
        .update({ wallet_address: walletAddress })
        .eq('id', userId);
    }

    // Business wallet address
    const toAddress = getCryptoPaymentAddress();
    
    // Convert amount to wei (ETH has 18 decimals)
    const amountInWei = ethers.parseEther(amount.toString());
    
    // Create transaction
    const tx = await signer.sendTransaction({
      to: toAddress,
      value: amountInWei
    });
    
    // Record the payment in the database
    await supabase.from('crypto_payments').insert({
      user_id: userId,
      cart_id: cartId,
      wallet_address: fromAddress,
      amount,
      currency: 'ETH',
      transaction_hash: tx.hash,
      status: 'pending',
    });
    
    // Wait for the transaction to be confirmed
    await tx.wait();
    
    // Update the payment status to completed
    await supabase.from('crypto_payments').update({
      status: 'completed'
    }).eq('transaction_hash', tx.hash);
    
    return {
      success: true,
      transactionHash: tx.hash
    };
  } catch (error: any) {
    console.error("Crypto payment error:", error);
    return {
      success: false,
      error: error.message || "An error occurred during payment"
    };
  }
};
