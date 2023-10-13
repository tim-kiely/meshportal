import Head from "next/head";
import { CardanoWallet, MeshBadge, useWallet } from "@meshsdk/react";
import { createTransaction, signTransaction } from "../backend";
import { useState } from "react";

export default function Home() {
  const { wallet, connected } = useWallet();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  async function startMining() {
    setLoading(true);
    try {
      const recipientAddress = await wallet.getChangeAddress();
      const utxos = await wallet.getUtxos();

      const { assetName, maskedTx, originalMetadata } = await createTransaction(
        recipientAddress,
        utxos
      );

      const signedTx = await wallet.signTx(maskedTx, true);

      const { appWalletSignedTx } = await signTransaction(
        assetName,
        signedTx,
        originalMetadata
      );

      const txHash = await wallet.submitTx(appWalletSignedTx);

      setTxHash(txHash);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  }

  return (
    <div className="container">
      <Head>
        <title>Pondrop</title>
        <meta name="description" content="Pondrop" />
        <link
          rel="icon"
          href="https://meshjs.dev/favicon/favicon-32x32.png"
        />
        <link
          href="https://meshjs.dev/css/template.css"
          rel="stylesheet"
          key="mesh-demo"
        />
      </Head>

      <main className="main">
        <h1 className="title">
          Pondrop Web 3.0
        </h1>

        <div className="demo">
          {connected ? (
            <button
              type="button"
              onClick={() => startMining()}
              disabled={loading}
            >
                {loading ? "Creating transaction..." : "Mint Shareholder Token"}
              </button>
            
          ) : (
            <CardanoWallet />
          )}
          {txHash && (
            <div>
              <p>Successful, transaction hash:</p>
              <code>{txHash}</code>
            </div>
          )}
        </div>

        
      </main>

      <footer className="footer">
        <MeshBadge dark={true} />
      </footer>
    </div>
  );
}
