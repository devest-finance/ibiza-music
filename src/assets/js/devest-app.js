export class Devest {
  getChainIdHexFromDec(chainId) {
    return "0x" + parseInt(chainId).toString(16);
  }

  getNetworkFromChainIdDec(chain) {
    const chainDecimal = parseInt(chain, 10);
    switch (chainDecimal) {
      case 1:
        return "ETH";
      case 56:
        return "BSC";
      case 97:
        return "BSCtest";
      case 5:
        return "GETH";
      case 137:
        return "Polygon";
      case 80001:
        return "Polygon Testnet";
      case 500:
        return "Camino";
      case 501:
        return "Camino TestNet";
      case 245022934:
        return "Solana";
      case 245022926:
        return "Solana TestNet";
      case 84531:
        return "Base TestNet";
      case 8453:
        return "Base";
      case 280:
        return "zkSync TestNet";
      case 324:
        return "zkSync Era";
    }
  }

  getChainIdHexFromNetwork(network) {
    switch (network) {
      case "ETH":
        return "0x1";
      case "BSC":
        return "0x38";
      case "BSCtest":
        return "0x61";
      case "GETH":
        return "0x5";
      case "Polygon":
        return "0x89";
      case "Polygon Testnet":
        return "0x13881";
      case "Camino":
        return "0x1f4";
      case "Camino TestNet":
        return "0x1f5";
      case "Solana":
        return "0xe9ac0d6";
      case "Solana TestNet":
        return "0xe9ac0ce";
      case "Base TestNet":
        return "0x14a33";
      case "Base":
        return "0x2105";
      case "zkSync TestNet":
        return "0x118";
      case "zkSync Era":
        return "0x144";
    }
  }
  addToMetamask(token_address, token_symbol, token_decimals, token_image_path) {
    // Add the token to MetaMask
    try {
      window.ethereum.request({
        method: "wallet_watchAsset",
        params: {
          type: "ERC20",
          options: {
            address: token_address,
            symbol: token_symbol,
            decimals: token_decimals,
            image: "https://devest.web.juice.com.hr/" + token_image_path, // Replace with the URL of the token logo image
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
  async request(jurl, params) {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authentication: localStorage.getItem("devest-token"),
        wallet: localStorage.getItem("devest-wallet"),
      },
      body: JSON.stringify(params),
    };
    return fetch(
      "https://devest.app/gateway/" + jurl,
      requestOptions
    ).then((response) => response.json());
  }
  async upload(jurl, params, file) {
    const tempParams = params.map((param, index) =>
      typeof param == "object"
        ? `${index}=` + JSON.stringify(param)
        : `${index}=` + param
    );
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": file.type,
        authentication: localStorage.getItem("devest-token"),
        wallet: localStorage.getItem("devest-wallet"),
      },
      body: file,
    };
    const response = await fetch(
      window.location.protocol + "/gateway/" + jurl + "?" + tempParams.join("&"),
      requestOptions
    );
    return await response.json();
  }
}