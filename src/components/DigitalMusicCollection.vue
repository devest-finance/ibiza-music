<template>
    <div v-if="firstPage" class="container">
      <div class="content">
        <div class="title">
          <div class="logo">
            <img src="../assets/images/streaming/clubmixedLogo.svg"/>
            <div>
              <h1 style="margin-bottom: 0">NFT Music Collection</h1>
              <h2 style="margin-top: 0; color: aqua;" >Your Exclusive Beat Gateway! Discover. Own. Trade. Elevate.</h2>
            </div>
          </div>
          <div class="wallet">
            <div class="terms">
              <a href="termsandconditions.html">Terms and Conditions</a>
              <a href="privacypolicy.html">Privacy Policy</a>
            </div>
            <button v-if="!isConnected && !isNetwork" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect Wallet</button>
            <button v-if="isConnected && !isNetwork" @click="switchNetwork(product.network)"><i class="fa-solid fa-network-wired"></i>Change Network</button>
            <div v-if="isConnected && isNetwork" class="connected">
              <div class="wallet_info">
                <p><strong>Address: </strong> {{ transformAddress(connectedAccount) }} <i @click="copyAccountAddress()" class="fa-regular fa-copy"></i></p>
                <p><strong>Balance: </strong> {{myBalance.toFixed(2)}} {{ network.nativeCurrency.symbol }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="cards_row" v-if="network && price">
          <a href="aboutus.html" style="text-decoration: none;">
            <div class="card_first" style="border-radius:10px;">
              <div class="intro">
                <p><b>Dive into revolutionary realm of NFTs at Clubmixed where you can not only listen but truly own exclusive DJ mixes.</b></p>
                <div>
                  <p><b>Support & Invest in the Artists You Love</b></p>
                  <p style="margin: 0 13%;">Each NFT sale directly benefits the DJs and producers you admire.</p>
                </div>
                <div>
                  <p><b>Exclusive ownership</b></p>
                  <p style="margin: 0 13%;">Say goodbye to the transient nature of streaming platforms.</p>
                </div>
                <div>
                  <p><b>Buy, Sell, and Trade on Your Terms</b></p>
                  <p style="margin: 0 13%;">Through our secure, user-friendly platform, manage your NFT holdings with ease.</p>
                </div>
              </div>
              <button class="first_button">Read More</button>
            </div>
          </a>
          <div @click="changePage(card.link)" class="card" v-for="card of cards" v-bind:class="{ 'active' : card.link }">
            <div class="img_row">
              <img :src="card.image">
            </div>
            <div class="info_row">
              <h1>{{ card.title }}</h1>
              <p>{{ card.artist }}</p>
              <p>{{  card.released }}</p>
              <h1 v-if="card.price">{{card.price}} {{ network.nativeCurrency.symbol }}</h1>
              <p v-if="card.price" style="margin: 0">({{(tokenPrice * card.price).toFixed(2) + ' $'}})</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-if="secondPage" class="container">
      <div class="content">
        <div class="title">
          <div class="logo">
            <img @click="changePage('true')" src="../assets/images/streaming/clubmixedLogo.svg" style="cursor: pointer;"/>
            <div>
              <h1 style="margin-bottom: 0">NFT Music Collection</h1>
              <h2 style="margin-top: 0; color: aqua" >Your Exclusive Beat Gateway! Discover. Own. Trade. Elevate.</h2>
            </div>
          </div>
          <div class="wallet">
            <div class="terms">
              <a href="termsandconditions.html">Terms and Conditions</a>
              <a href="privacypolicy.html">Privacy Policy</a>
            </div>
            <button v-if="!isConnected && !isNetwork" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect Wallet</button>
            <button v-if="isConnected && !isNetwork" @click="switchNetwork(product.network)"><i class="fa-solid fa-network-wired"></i>Change Network</button>
            <div v-if="isConnected && isNetwork" class="connected">
              <div class="wallet_info">
                <p><strong>Address: </strong> {{ transformAddress(connectedAccount) }} <i @click="copyAccountAddress()" class="fa-regular fa-copy"></i></p>
                <p><strong>Balance: </strong> {{myBalance.toFixed(2)}} {{ network.nativeCurrency.symbol }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="product_row">
          <div class="player">
            <div class="player_img">
              <img src="../assets/images/streaming/LennyIbizzare.png">
            </div>
            <div class="audio_player">
              <p v-if="(currentTimeMinutes !== null) && (currentTimeSeconds !== 0)">{{ currentTimeMinutes }}:{{ currentTimeSeconds }}</p>
              <audio ref="audioRef" @timeupdate="handleTimeUpdate" @loadedmetadata="initializeAudioProperties" @ended="next()" autoplay :src="playUrl"></audio>
              <input type="range" id="progress-bar" max="100" v-model="progress" @input="seek">
              <p v-if="durationMinutes && durationSeconds">{{ durationMinutes }}:{{ durationSeconds }}</p>
            </div>
            <div class="player_controls">
              <i :class="{'fa-solid': true, 'fa-shuffle': true, 'icon_on': shuffleOn, 'icon_off': !shuffleOn}" @click="shuffle()"></i>
              <i class="fa-solid fa-backward icon_off" @click="playPrevious()"></i>
              <i :class="{'fa-solid': true, 'fa-pause': playOn, 'fa-play': !playOn, 'icon_off': true, 'icon_primary': true}" @click="playPause()"></i>
              <i class="fa-solid fa-forward icon_off" @click="playNext()"></i>
              <i :class="{'fa-solid': true, 'fa-repeat': true, 'icon_on': repeatOn, 'icon_off': !repeatOn}" @click="repeat()"></i>
            </div>
          </div>
          <div class="info">
            <div class="track_info">
              <div class="title">
                <h1>DEEP TECH SIZZLE</h1>
                <h1 class="price_right">{{ price }} {{ network.nativeCurrency.symbol }}</h1>
              </div>
              <div class="title_info">
                <div>
                  <p><strong>Artist: </strong>Lenny Ibizzare</p>
                  <p><strong>Genre: </strong>Ambient, Electronic</p>
                </div>
                <div class="socials">
                  <a href="https://www.facebook.com/lennyibizarreofficial/"><i class="fa-brands fa-facebook"></i></a> 
                  <a href="https://www.instagram.com/lennyibizarre/"><i class="fa-brands fa-instagram"></i></a>
                  <a href="https://www.linkedin.com"><i class="fa-brands fa-linkedin"></i></a>
                </div>
              </div>
              <p>Ethereal Melodies is a captivating album that takes listeners on a journey through the cosmos. Crafted by the renowned artist Celestial Harmonies, this collection of ambient and experimental tracks evokes a sense of wonder and tranquility</p>
              <div class="progress_bar">
                <div id="fill" class="progress" :style="{ width: percentage + '%' }"></div>
              </div>
              <div class="product_action_row">
                <button class="first_button" @click="purchase()" :disabled="myTicketBalance">Buy ({{ totalAvailable - totalPurchased }}/{{ totalAvailable }})</button>
                <button class="third_button" :disabled="true" @click="sell()">Sell</button>
              </div>
              <div class="tracks">
                <div v-if="tracks.length" class="track_list">
                  <div v-for="(track, index) of tracks" :class="{ 'track': true, 'track_active': track.active }" @click="play(index, track)">
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

  const cards = Array.from({ length: 15 }, (_, i) => i + 1);

  import imageUrl from '@/assets/images/streaming/LennyIbizzare.png';
  import comingSoon from '@/assets/images/streaming/coming.jpg';

  cards[0] = {
    image: imageUrl,
    title: "DEEP TECH SIZZLE",
    artist: "LENNY IBIZZARE",
    released: "15 MAY 2024",
    price: 15.00,
    link: true,
  }
  for(let i = 1; i < cards.length; i++) {
    cards[i] = {
      image: comingSoon,
      title: "Coming Soon",
      artist: "ClubMixed",
      released: "",
      price: "",
      link: false
    };
  }

  
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
  let tokenPrice = ref(0);
  let myTicketBalance = ref(0n);
  let myBalance = ref(0);
  let percentage = ref(0);
  let ticketID = ref("");
  let playUrl = ref("");
  
  const purchased = ref(false);
  const firstPage = ref(true);
  const secondPage = ref(false);
  const shuffleOn = ref(false);
  const repeatOn = ref(false);
  const playOn = ref(false);

  let tracks = ref(null);
  let active_index = ref(null);

  const audioRef = ref(null);
  const currentTimeMinutes = ref("0");
  const currentTimeSeconds = ref("00");
  const durationMinutes = ref("0");
  const durationSeconds = ref("00");
  const progress = ref(0);
  
  onBeforeMount(async () => {
    await getData();

    if (window.ethereum) {
      web3.value = new Web3(window.ethereum);
      contractInstance.value = await new web3.value.eth.Contract(contract.value.abi, product.value.address);
      totalAvailable.value = await contractInstance.value.methods.totalSupply().call();
      totalAvailable.value = Number(totalAvailable.value);
      totalPurchased.value = await contractInstance.value.methods.totalPurchased().call();
      totalPurchased.value = Number(totalPurchased.value);

      percentage.value = (totalAvailable.value - totalPurchased.value) / totalAvailable.value * 100;
    }

    await checkIfConnected();
    await loadTracks();

    await getPrice();
    await fetchTokenPrice();
  });
    
  
  onMounted(() => {
    window.addEventListener('popstate', event => {
      event.preventDefault(); // Prevent the navigation
      firstPage.value = !firstPage.value;
      secondPage.value = !secondPage.value;
    });
    window.onhashchange = function(event) {
      event.preventDefault(); // Prevent the navigation
      firstPage.value = !firstPage.value;
      secondPage.value = !secondPage.value;
    }
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

  async function getPrice() {
    const response = await devest.request("data/get", [
      product.value._id,
      "price", {}]);
    price.value = (((1 / Math.pow(10, network.value.nativeCurrency.decimals))) * response);
  }
  async function fetchTokenPrice() {
      if (!network.value.apiId) {
        console.log("Price in USD not available for this token");
        return;
      } 
      const apiUrl = `https://api.coingecko.com/api/v3/simple/price?ids=${network.value.apiId}&vs_currencies=USD`;
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        tokenPrice.value = data[network.value.apiId].usd;
      } catch (error) {
        console.error('Error fetching token price:', error);
        tokenPrice.value = 'Error';
      }
    }
  async function changePage(doit) {
    if (!doit) return;
    if (!isConnected.value)
      await connectWallet();
    if (!isNetwork.value)
      await switchNetwork(product.value.network);
    if (firstPage.value)
      await checkIfConnected();
    firstPage.value = !firstPage.value;
    secondPage.value = !secondPage.value;
    history.pushState(null, null, window.location.pathname);
  }
  function changeToInfo() {
    window.location.href = "aboutus";
  }
  function shuffle() {
    shuffleOn.value = !shuffleOn.value;
  }
  function repeat() {
    repeatOn.value = !repeatOn.value;
  }

  async function loadTracks() {
      tracks.value = [{
        name: "Computers Have Control",
        duration: "7:39",
        active: false
      },{
        name: "Sgt. Poppers Skronk Quatet",
        duration: "9:06",
        active: false
      }, {
        name: "Balearism",
        duration: "7:17",
        active: false
      }, {
        name:"Gearbox",
        duration: "7:08",
        active: false
      }, {
        name: "Girlz",
        duration: "8:46",
        active: false
      }, {
        name:"Deep Finca",
        duration: "6:47",
        active: false
      }, {
        name:"Psychotropic",
        duration: "9:43",
        active: false
      }, {
        name:"Dirt Groove",
        duration: "7:44",
        active: false
      }, {
        name:"Drivesharf",
        duration: "8:45",
        active: false
      }, {
        name:"Nu York Dub",
        duration: "4:48",
        active: false
      }, {
        name:"Baseheadz United",
        duration: "4:48",
        active: false
      }, {
        name:"Kleptomania",
        duration: "7:15",
        active: false
      },{
        name: "Dawn of The Acid Warrior",
        duration: "6:22",
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
      "Wallet address:\n" + address[0].toLowerCase();
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

  function handleTimeUpdate() {
    if (audioRef.value && audioRef.value.currentTime) {
      currentTimeMinutes.value = Math.floor(audioRef.value.currentTime / 60);
      currentTimeSeconds.value = Math.floor(audioRef.value.currentTime) % 60;
      if (currentTimeSeconds.value < 10) currentTimeSeconds.value = "0" + currentTimeSeconds.value;
      progress.value = Math.floor((100 / audioRef.value.duration) * audioRef.value.currentTime);
    }
  }
  function initializeAudioProperties() {
    if (audioRef.value) {
      durationMinutes.value = Math.floor(audioRef.value.duration / 60);
      durationSeconds.value = Math.floor(audioRef.value.duration) % 60;
      if (durationSeconds.value < 10) durationSeconds.value = "0" + durationSeconds.value;
    }
  }

  function seek() {
    if (audioRef.value) {
      const time = (audioRef.value.duration * progress.value) / 100;
      audioRef.value.currentTime = time;
    }
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
    await checkIfConnected();
    ticketID.value = (totalPurchased.value + 1).toString();
    const ticketPrice = web3.value.utils.toWei(price.value, "ether");
  
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
    if (active_index.value !== null) 
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
        playUrl.value = "https://stream.juice.com.hr/stream/" + index;
        playOn.value = true;
      }
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
        alert("Sorry you are not authorized to watch this stream");
      }
    }
  }

  function playPause() {
    if (active_index.value === null)
      play(0, tracks.value[0]);
    if (playOn.value) {
      audioRef.value.pause();
      playOn.value = false;
    }
    else {
      audioRef.value.play();
      playOn.value = true;
    }
  }
  function playNext() {
    if (repeatOn.value) {
      playUrl.value = "";
      play(active_index.value, tracks.value[active_index.value]);
    }
    else if (shuffleOn.value) {
      const randomIndex = Math.floor(Math.random() * tracks.value.length);
      play(randomIndex, tracks.value[randomIndex]);
    }
    else if (active_index.value !== tracks.value.length - 1)
      play(active_index.value + 1, tracks.value[active_index.value + 1]);
  }
  function playPrevious() {
    if (repeatOn.value) {
      playUrl.value = "";
      play(active_index.value, tracks.value[active_index.value]);
    }
    else if (shuffleOn.value) {
      const randomIndex = Math.floor(Math.random() * tracks.value.length);
      play(randomIndex, tracks.value[randomIndex]);
    }
    else if (active_index.value !== 0) 
      play(active_index.value - 1, tracks.value[active_index.value - 1]);
  }
  function next() {
    if (repeatOn.value) {
      playUrl.value = "";
      play(active_index.value, tracks.value[active_index.value]);
    }
    else if (shuffleOn.value) {
      const randomIndex = Math.floor(Math.random() * tracks.value.length);
      play(randomIndex, tracks.value[randomIndex]);
    }
    else {
      if (active_index.value !== tracks.value.length - 1) 
        play(active_index.value + 1, tracks.value[active_index.value + 1]);
    }
  }

  function transformAddress(address) {
    return address.slice(0, 3) + "..." + address.slice(address.length - 3)
  }
  
  function copyAccountAddress() {
    navigator.clipboard.writeText(connectedAccount.value);
  }
  </script>
  
