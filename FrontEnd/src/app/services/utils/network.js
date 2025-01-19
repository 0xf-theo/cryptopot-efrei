export const networkSetup = ({ network }) =>
  new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      provider
        .request({
          method: "wallet_addEthereumChain",
          params: [
            {
              chainId: `0x${parseInt(network.chainId, 10).toString(16)}`,
              chainName: network.name,
              nativeCurrency: {
                name: "ETH",
                symbol: "ETH",
                decimals: 18,
              },
              rpcUrls: [network.defaultProvider],
              blockExplorerUrls: [network.scanUrl],
            },
          ],
        })
        .then(resolve)
        .catch(reject);
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });

export const getActiveChainId = () =>
  new Promise((resolve, reject) => {
    const provider = window.ethereum;
    if (provider) {
      resolve(provider.networkVersion);
    } else {
      reject(new Error(`window.ethereum is '${typeof provider}'`));
    }
  });
