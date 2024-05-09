<template>
    <div v-if="firstPage" class="container">
      <div class="content">
        <div class="title">
          <p>Digital Music Collection</p>
          <button @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect Wallet</button>
        </div>
        <div class="cards_row">
          <div class="card">
            <div class="img_row">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="info_row">
              <h1>Deep Tech Sizzle</h1>
              <p>Lenny Ibizzare</p>
              <p>Released: 25 Nov 2016</p>
              <h1>9,99$</h1>
            </div>
            <div class="action_row">
              <button class="first_button" @click="changePage()">Play</button>
              <button class="second_button" @click="changePage()">Buy</button>
              <button class="third_button"  @click="changePage()">Sell</button>
            </div>
          </div>
          <div class="card">
            <div class="img_row">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="info_row">
              <h1>Deep Tech Sizzle</h1>
              <p>Lenny Ibizzare</p>
              <p>Released: 25 Nov 2016</p>
              <h1>9,99$</h1>
            </div>
            <div class="action_row">
              <button class="first_button" @click="changePage()">Play</button>
              <button class="second_button" @click="changePage()">Buy</button>
              <button class="third_button"  @click="changePage()">Sell</button>
            </div>
          </div>
          <div class="card">
            <div class="img_row">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="info_row">
              <h1>Deep Tech Sizzle</h1>
              <p>Lenny Ibizzare</p>
              <p>Released: 25 Nov 2016</p>
              <h1>9,99$</h1>
            </div>
            <div class="action_row">
              <button class="first_button" @click="changePage()">Play</button>
              <button class="second_button" @click="changePage()">Buy</button>
              <button class="third_button"  @click="changePage()">Sell</button>
            </div>
          </div>
          <div class="card">
            <div class="img_row">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="info_row">
              <h1>Deep Tech Sizzle</h1>
              <p>Lenny Ibizzare</p>
              <p>Released: 25 Nov 2016</p>
              <h1>9,99$</h1>
            </div>
            <div class="action_row">
              <button class="first_button" @click="changePage()">Play</button>
              <button class="second_button" @click="changePage()">Buy</button>
              <button class="third_button"  @click="changePage()">Sell</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="secondPage" class="container">
      <div class="content">
        <div class="title">
          <p><span @click="changePage()"><</span>Digital Music Collection</p>
          <button>Connect Wallet</button>
        </div>
        <div class="product_row">
          <div class="player">
            <div class="player_img">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="player_controls">
              <i class="fa-solid fa-shuffle"></i>
              <i class="fa-solid fa-backward"></i>
              <i class="fa-solid fa-play"></i>
              <i class="fa-solid fa-forward"></i>
              <i class="fa-solid fa-repeat"></i>
            </div>
          </div>
          <div class="info">
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
  import { Devest } from "../assets/js/devest-app"
  const devest = new Devest();
  import Web3 from "web3";
  
  const props = defineProps({
    product_id: String,
  });
  
  const isConnected = ref(false);
  const isNetwork = ref(false);
  const connectedAccount = ref("");
  let product = ref(null);
  let contract = ref(null);
  let network = ref(null);
  let web3 = ref(null);
  let contractInstance = ref(null);
  let chainID = ref("");
  let totalAvailable = ref(0n);
  let totalPurchased = ref(0n);
  let myBalance = ref(0n);
  let ticketID = ref("");
  const linkCopied = ref(false);
  
  const purchased = ref(false);
  const watching = ref(false);
  const firstPage = ref(true);
  const secondPage = ref(false);
  
  onBeforeMount(async () => {
    await getData();
  
    web3.value = new Web3(window.ethereum);
    contractInstance.value = await new web3.value.eth.Contract(contract.value.abi, product.value.address);
    totalAvailable.value = await contractInstance.value.methods.totalSupply().call();
    totalPurchased.value = await contractInstance.value.methods.totalPurchased().call();
  
    await checkIfConnected();
  });
    
  
  onMounted(() => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    }
    if (window.ethereum) {
      window.ethereum.on("chainChanged", handleNetworkChange);
    }
  });
  
  onUnmounted(() => {
    if (window.ethereum) {
      window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
    }
  });
  
  function changePage() {
    firstPage.value = !firstPage.value;
    secondPage.value = !secondPage.value;
  }
  
  async function createToken() {
    if (localStorage.getItem("devest-token")) {
      console.log('Token already exists!');
      return;
    }
    console.log("Creating the token...");
  
    const mes = await message();
    console.log("Message:", mes);
    try {
      const signature = await web3.value.eth.personal.sign(mes, connectedAccount.value, "");
  
      console.log("New token created!")
      localStorage.setItem("devest-token", signature);
      localStorage.setItem("devest-wallet", connectedAccount.value);
    } catch (error) {
      console.error("Error creating token:", error);
    }
  }
  
  async function message() {
    if (!connectedAccount.value) return;
    const address = await web3.value.eth.getAccounts();
    return "Welcome to DeVest\n" +
      "Click to sign-in and accept the DeVest Terms of Service: https://devest.finance/tos\n" +
      "This request will not trigger a blockchain transaction or cost any gas fees.\n" +
      "Your authentication status will reset after 24 hours.\n" +
      "Wallet address:\n" + address[0];
  }
  
  
  async function checkIfConnected() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (!accounts) {
          localStorage.removeItem("devest-token");
          await connectWallet();
          isConnected.value = true;
        }
        else if (accounts[0] === localStorage.getItem("devest-wallet") && localStorage.getItem("devest-token")){
          isConnected.value = true;
          await getCurrentNetwork();
          connectedAccount.value = accounts[0];
          myBalance.value = await contractInstance.value.methods.balanceOf(connectedAccount.value).call();
        }
        else if (accounts[0] !== connectedAccount.value) {
          localStorage.removeItem("devest-token");
          await connectWallet();
          isConnected.value = true;
        }
        else if (accounts[0] === connectedAccount.value && !localStorage.getItem("devest-token")) {
          await createToken();
        }
      } catch (error) {
        console.error("Error checking for connected account:", error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  }
  
  async function connectWallet() {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        connectedAccount.value = accounts[0];
        isConnected.value = true;
        myBalance.value = await contractInstance.value.methods.balanceOf(connectedAccount.value).call();
        await createToken();
        await getCurrentNetwork();
        console.log("Connected account:", connectedAccount.value);
      } catch (error) {
        console.error("User denied account access or an error occurred:", error);
      }
    } else {
      console.log("MetaMask is not installed!");
    }
  }
  
  async function switchNetwork(chainId) {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: chainId }],
        });
        console.log(`Switched to the network with chainId ${chainId}`);
        isNetwork.value = true;
      } catch (switchError) {
        console.error("Failed to switch the network:", switchError);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  }
  
  async function handleAccountsChanged() {
    await checkIfConnected();
  }
  
  function handleNetworkChange(chainId) {
    console.log("Network changed to:", chainId);
    window.location.reload();
  }
  
  async function getData() {
    try {
      const res = await devest.request("data/getData", [props.product_id, {}]);
      product.value = res.payload.product;
      contract.value = res.payload.contract;
      network.value = res.payload.network;
    } catch (error) {
      console.log(error);
    }
  }
  async function getCurrentNetwork() {
    if (window.ethereum) {
      try {
        chainID = await window.ethereum.request({ method: "eth_chainId" });
        console.log(`Connected to network => Chain ID: ${chainID}`);
  
        if (chainID === product.value.network) isNetwork.value = true;
        else isNetwork.value = false;
      } catch (error) {
        console.error("Failed to get network:", error);
      }
    } else {
      console.log("MetaMask is not installed.");
    }
  }
  
  async function purchase() {
    ticketID.value = (totalPurchased.value + 1n).toString();
    const ticketPrice = web3.value.utils.toWei(product.value.initPrice, "ether");
  
    try {
      await contractInstance.value.methods.purchase(ticketID.value).send({from: connectedAccount.value, value: ticketPrice});
      purchased.value = true;
    } catch (error) {
      console.log(error);
    }
  }
  
  async function watch() {
    const token = localStorage.getItem("devest-token");
    const wallet = localStorage.getItem("devest-wallet");
    const productAddress = product.value.address;
    const networkChainID = network.value.chainId;
  
    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://stream.juice.com.hr/authorize");
    xmlhttp.setRequestHeader("signature", token);
    xmlhttp.setRequestHeader("network", networkChainID);
    xmlhttp.setRequestHeader("address", wallet);
    xmlhttp.setRequestHeader("asset", productAddress);
    xmlhttp.withCredentials = true;
    xmlhttp.send();
  
    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      return xmlhttp;
    }
  
    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
        watching.value = true;
      }
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
        alert("Sorry you are not authorized to watch this stream");
      }
    }
  }
  
  function copyProductAddress() {
    navigator.clipboard.writeText(product.value.address);
    linkCopied.value = true
    setTimeout(() => {
      linkCopied.value = false;
    }, 2000);
  }
  </script>
  
  