export const environment = {
  production: true,
  apiUrl: 'http://localhost:8000',
  network: {
    name: 'xai-testnet',
    chainId: 38383,
    defaultProvider: 'https://testnet-v2.xai-chain.net/rpc/xaidd3920b8ecd8dacba2f3bcaa30e29',
    scanUrl: 'https://testnet-explorer-v2.xai-chain.net/',
    contracts: {
      Factory: '0xD957A33bD1C073b4a944537B73bD6826873f0474',
      Usdc: '0x7d57A692bdA9E7aE488f1de861bF87e45F457FE3',
    },
  },
};
