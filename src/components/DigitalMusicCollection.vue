<template>
    <div v-if="firstPage" class="container">
      <div class="content">
        <div class="title">
          <p>Digital Music Collection</p>
          <button v-if="!isConnected && !isNetwork" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect Wallet</button>
          <button v-if="isConnected && !isNetwork" @click="switchNetwork(product.network)"><i class="fa-solid fa-network-wired"></i>Change Network</button>
          <div v-if="isConnected && isNetwork" class="connected">
            <div class="wallet_info">
              <p><strong>Address: </strong> {{ transformAddress(connectedAccount) }} <i @click="copyAccountAddress()" class="fa-regular fa-copy"></i></p>
              <p><strong>Balance: </strong> {{myBalance.toFixed(5)}} {{ network.nativeCurrency.symbol }}</p>
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
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
          <button v-if="!isConnected" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect Wallet</button>
          <button v-if="isConnected && !isNetwork" @click="switchNetwork(product.network)"><i class="fa-solid fa-network-wired"></i>Change Network</button>
          <div v-if="isConnected && isNetwork" class="connected">
            <div class="wallet_info">
                <p><strong>Address: </strong> {{ transformAddress(connectedAccount) }} <i @click="copyAccountAddress()" class="fa-regular fa-copy"></i></p>
                <p><strong>Balance: </strong> {{myBalance.toFixed(5)}} {{ network.nativeCurrency.symbol }}</p>
            </div>
            <i class="fa-solid fa-ellipsis-vertical"></i>
          </div>
        </div>
        <div class="product_row">
          <div class="player">
            <div class="player_img">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="player_controls">
              <i :class="{'fa-solid': true, 'fa-shuffle': true, 'icon_on': shuffleOn, 'icon_off': !shuffleOn}" @click="shuffle()"></i>
              <i class="fa-solid fa-backward icon_off"></i>
              <i :class="{'fa-solid': true, 'fa-pause': playOn, 'fa-play': !playOn, 'icon_off': true}" @click="playIcon()"></i>
              <i class="fa-solid fa-forward icon_off"></i>
              <i :class="{'fa-solid': true, 'fa-repeat': true, 'icon_on': repeatOn, 'icon_off': !repeatOn}" @click="repeat()"></i>
            </div>
          </div>
          <div class="info">
            <div class="title">
              <h1>DEEP TECH SIZZLE</h1>
              <h1>{{ price }} {{ network.nativeCurrency.symbol }}</h1>
            </div>
            <div class="title_info">
              <p><strong>Artist: </strong>Lenny Ibizzare</p>
              <p><strong>Genre: </strong>Ambient, Electronic</p>
            </div>
            <div class="tracks">
              <div v-if="tracks.length" class="track_list">
                <div v-for="(track, index) of tracks" :class="{ 'track': true, 'track_active': track.active }" @click="play(index, track)">
                  <i class="fa-solid fa-bars"></i>
                  <img src="../assets/images/streaming/LennyIbizzare.png"></img>
                  <div class="track_name">
                    <h4>{{ track.name }}</h4>
                    <p>Lenny Ibizarre</p>
                  </div>
                  <div class="duration">
                    <h4>{{track.duration}}</h4>
                    <p>2024</p>
                  </div>
                </div>
              </div>
            </div>
            <p><strong>Release Date: </strong>25 NOV 2016</p>
            <p>Ethereal Melodies is a captivating album that takes listeners on a journey through the cosmos. Crafted by the renowned artist Celestial Harmonies, this collection of ambient and experimental tracks evokes a sense of wonder and tranquility</p>
            <div class="progress_bar"><strong>Available:</strong> {{ totalAvailable - totalPurchased }}/{{ totalAvailable }}</div>
            <div class="product_action_row">
              <button class="first_button" @click="purchase()">Buy</button>
              <button class="third_button" @click="sell()">Sell</button>
            </div>
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
  let price = ref(0);
  let myTicketBalance = ref(0n);
  let myBalance = ref(0);
  let ticketID = ref("");
  
  const purchased = ref(false);
  const watching = ref(false);
  const firstPage = ref(true);
  const secondPage = ref(false);
  const shuffleOn = ref(false);
  const repeatOn = ref(false);
  const playOn = ref(false);

  let tracks = ref(null);
  let active_index = ref(0);
  
  onBeforeMount(async () => {
    await getData();
  
    web3.value = new Web3(window.ethereum);
    contractInstance.value = await new web3.value.eth.Contract(contract.value.abi, product.value.address);
    totalAvailable.value = await contractInstance.value.methods.totalSupply().call();
    totalPurchased.value = await contractInstance.value.methods.totalPurchased().call();
  
    await checkIfConnected();
    await loadTracks();
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
  
  async function changePage() {
    if (!isConnected.value)
      await connectWallet();
    if (!isNetwork.value)
      await switchNetwork(product.value.network);
    firstPage.value = !firstPage.value;
    secondPage.value = !secondPage.value;

    if (secondPage.value) {
      const response = await devest.request("data/get", [
      product.value._id,
      "price", {}]);
    price.value = (((1 / Math.pow(10, network.value.nativeCurrency.decimals))) * response);
    }
  }
  function shuffle() {
    shuffleOn.value = !shuffleOn.value;
  }
  function repeat() {
    repeatOn.value = !repeatOn.value;
  }
  function playIcon() {
    playOn.value = !playOn.value;
  }

  async function loadTracks() {
      tracks.value = [{
        name: "Computers Have Control",
        duration: "7:39",
        playUrl: "",
        active: true
      },{
        name: "Sgt. Poppers Skronk Quatet",
        duration: "9:06",
        playUrl: "",
        active: false
      }, {
        name: "Balearism",
        duration: "7:17",
        playUrl: "",
        active: false
      }, {
        name:"Gearbox",
        duration: "7:08",
        playUrl: "",
        active: false
      }, {
        name: "Girlz",
        duration: "8:46",
        playUrl: "",
        active: false
      }, {
        name:"Deep Finca",
        duration: "6:47",
        playUrl: "",
        active: false
      }, {
        name:"Psychotropic",
        duration: "9:43",
        playUrl: "",
        active: false
      }, {
        name:"Dirt Groove",
        duration: "7:44",
        playUrl: "",
        active: false
      }, {
        name:"Drivesharf",
        duration: "8:45",
        playUrl: "",
        active: false
      }, {
        name:"Nu York Dub",
        duration: "4:48",
        playUrl: "",
        active: false
      }, {
        name:"Baseheadz United",
        duration: "4:48",
        playUrl: "",
        active: false
      }, {
        name:"Kleptomania",
        duration: "7:15",
        playUrl: "",
        active: false
      },{
        name: "Dawn of The Acid Warrior",
        duration: "6:22",
        playUrl: "",
        active: false
      }]
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
    isConnected.value = false;
    isNetwork.value = false;
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (!accounts) {
          localStorage.removeItem("devest-token");
          await connectWallet();
        }
        else if (accounts[0] === localStorage.getItem("devest-wallet") && localStorage.getItem("devest-token")){
          isConnected.value = true;
          await getCurrentNetwork();
          connectedAccount.value = accounts[0];
          myBalance.value = Number(await web3.value.eth.getBalance(accounts[0]));
          myBalance.value = myBalance.value / Math.pow(10, 18);
          
          myTicketBalance.value = await contractInstance.value.methods.balanceOf(connectedAccount.value).call();
        }
        else if (accounts[0] !== connectedAccount.value) {
          localStorage.removeItem("devest-token");
          await connectWallet();
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
    debugger;
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        connectedAccount.value = accounts[0];
        isConnected.value = true;
        myBalance.value = Number(await web3.value.eth.getBalance(accounts[0]));
        myBalance.value = myBalance.value / Math.pow(10, 18);
        myTicketBalance.value = await contractInstance.value.methods.balanceOf(connectedAccount.value).call();
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

      totalAvailable.value = await contractInstance.value.methods.totalSupply().call();
      totalPurchased.value = await contractInstance.value.methods.totalPurchased().call();
      myBalance.value = Number(await web3.value.eth.getBalance(accounts[0]));
      myBalance.value = myBalance.value / Math.pow(10, 18);
      myTicketBalance.value = await contractInstance.value.methods.balanceOf(connectedAccount.value).call();

    } catch (error) {
      console.log(error);
    }
  }
  
  function play(index, track) {
    debugger;
    console.log(myTicketBalance.value);
    tracks.value[active_index.value].active = false;
    track.active = true;
    active_index.value = index;

    const token = localStorage.getItem("devest-token");
    const wallet = localStorage.getItem("devest-wallet");
    const networkChainId = network.value.chainId;
    const productAddress = product.value.address;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "https://stream.juice.com.hr/authorize");
    xmlhttp.setRequestHeader("signature", token);
    xmlhttp.setRequestHeader("network", networkChainId);
    xmlhttp.setRequestHeader("address", wallet);
    xmlhttp.setRequestHeader("asset", productAddress);
    xmlhttp.withCredentials = true;
    xmlhttp.send();

    if (xmlhttp.readyState === XMLHttpRequest.DONE) {
      return xmlhttp;
    }

    xmlhttp.onreadystatechange = () => {
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 200) {
          track.playUrl = "https://stream.juice.com.hr/stream/" + index;
      }
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
        alert("Sorry you are not authorized to watch this stream");
      }
    }

  }

  function transformAddress(address) {
    return address.slice(0, 5) + "..." + address.slice(address.length - 3)
  }
  
  function copyAccountAddress() {
    navigator.clipboard.writeText(connectedAccount.value);
  }
  </script>
  
  