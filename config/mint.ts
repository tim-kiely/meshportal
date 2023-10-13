import type { AssetMetadata } from "@meshsdk/core";

export const costLovelace = "10000000";

export const bankWalletAddress = `addr_test1qzmwuzc0qjenaljs2ytquyx8y8x02en3qxswlfcldwetaeuvldqg2n2p8y4kyjm8sqfyg0tpq9042atz0fr8c3grjmysm5e6yx`;

export const assetsMetadata: { [id: string]: AssetMetadata } = {
  "0": {
    name: "Shareholder Token",
    image: "ipfs://QmRzicpReutwCkM6aotuKjErFCUD213DpwPq6ByuzMJaua",
    mediaType: "image/jpg",
    description: "This token equates to 1 Pondrop Share",
  }
};
