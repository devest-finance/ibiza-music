<template>
  <div v-if="firstPage" class="container">
    <div class="content">
      <div class="title">
        <div class="logo">
          <img src="../assets/images/streaming/clubmixedLogo.svg"/>
          <div>
            <h1 style="margin-bottom: 0">NFT Music Collection</h1>
            <h2 style="margin-top: 0; color: aqua;">Your Exclusive Beat Gateway! Discover. Own. Trade. Elevate.</h2>
          </div>
        </div>
        <div class="wallet">
          <div class="terms">
            <a href="faq.html">How to buy</a>
            <a href="termsandconditions.html">Terms and Conditions</a>
            <a href="privacypolicy.html">Privacy Policy</a>
          </div>
          <button id="connectButton" v-if="!isConnected && !isNetwork" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect
            Wallet
          </button>
          <button v-if="isConnected && isNetwork" @click="open()">
            <i style="margin-right: 5px;" class="fa-solid fa-link"></i> Wallet Connected
          </button>
        </div>
      </div>
      <CookieBanner />
      <div class="cards_row">
        <a href="aboutus.html" style="text-decoration: none;">
          <div class="card_first" style="border-radius:10px;">
            <div class="intro">
              <p><b>Dive into revolutionary realm of NFTs at Clubmixed where you can not only listen but truly own
                exclusive DJ mixes.</b></p>
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
                <p style="margin: 0 13%;">Through our secure, user-friendly platform, manage your NFT holdings with
                  ease.</p>
              </div>
            </div>
            <button class="first_button">Read More</button>
          </div>
        </a>
        <div @click="changePage(card)" class="card" v-for="card of cards" v-bind:class="{ 'active' : card.link }">
          <div class="img_row">
            <img :src="card.image">
          </div>
          <div class="info_row">
            <h1>{{ card.title }}</h1>
            <p>{{ card.artist }}</p>
            <p>{{ card.released }}</p>
            <h1 v-if="card.price">{{ card.price }} {{ network?.nativeCurrency.symbol }}</h1>
            <p v-if="card.price && tokenPrice" style="margin: 0">({{ (tokenPrice * card.price).toFixed(2) + ' $' }})</p>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div v-if="secondPage && tracks" class="container">
    <div class="content">
      <div class="title">
        <div class="logo">
          <img @click="changePage({ link: 'true' })" src="../assets/images/streaming/clubmixedLogo.svg" style="cursor: pointer;"/>
          <div>
            <h1 style="margin-bottom: 0">NFT Music Collection</h1>
            <h2 style="margin-top: 0; color: aqua">Your Exclusive Beat Gateway! Discover. Own. Trade. Elevate.</h2>
          </div>
        </div>
        <div class="wallet">
          <div class="terms">
            <a href="faq.html">How to buy</a>
            <a href="termsandconditions.html">Terms and Conditions</a>
            <a href="privacypolicy.html">Privacy Policy</a>
          </div>
          <button v-if="!isConnected && !isNetwork" @click="connectWallet()"><i class="fa-solid fa-wallet"></i>Connect
            Wallet
          </button>
          <button v-if="isConnected && isNetwork" @click="open()">
            <i style="margin-right: 5px;" class="fa-solid fa-link"></i> Disconnect
          </button>
        </div>
      </div>
      <CookieBanner />
      <div class="product_row">
        <div class="player">
          <div class="player_img">
            <img v-bind:src="selectedProduct.image">
          </div>
          <div class="audio_player">
            <p v-if="(currentTimeMinutes !== null) && (currentTimeSeconds !== 0)">{{
                currentTimeMinutes
              }}:{{ currentTimeSeconds }}</p>
            <audio controls style="display: none;" ref="audioRef" @timeupdate="handleTimeUpdate" @loadedmetadata="initializeAudioProperties"
                   @ended="next()" autoplay :src="playUrl"></audio>
            <input type="range" id="progress-bar" max="100" v-model="progress" @input="seek">
            <p v-if="durationMinutes && durationSeconds">{{ durationMinutes }}:{{ durationSeconds }}</p>
          </div>
          <div class="player_controls">
            <i :class="{'fa-solid': true, 'fa-shuffle': true, 'icon_on': shuffleOn, 'icon_off': !shuffleOn}"
               @click="shuffle()"></i>
            <i class="fa-solid fa-backward icon_off" @click="playPrevious()"></i>
            <i :class="{'fa-solid': true, 'fa-pause': playOn, 'fa-play': !playOn, 'icon_off': true, 'icon_primary': true}"
               @click="playPause()"></i>
            <i class="fa-solid fa-forward icon_off" @click="playNext()"></i>
            <i :class="{'fa-solid': true, 'fa-repeat': true, 'icon_on': repeatOn, 'icon_off': !repeatOn}"
               @click="repeat()"></i>
          </div>
        </div>
        <div class="info">
          <div v-if="!isConnected" class="message" style="margin-top: 10px;">
            <span> Please connect your wallet to view all information and access all features. </span>
          </div>
          <div class="track_info">
            <div class="title">
              <h1>{{selectedProduct.title}}</h1>
              <h1 class="price_right">{{ cards[0].price }} {{ network?.nativeCurrency?.symbol }}</h1>
            </div>
            <div class="title_info">
              <div>
                <p><strong>Artist: </strong>{{selectedProduct.artist}}</p>
                <p><strong>Genre: </strong>{{selectedProduct.genre}}</p>
              </div>
              <div class="socials">
                <a target="_blank" href="https://www.facebook.com/lennyibizarreofficial/"><i class="fa-brands fa-facebook"></i></a>
                <a target="_blank" href="https://www.instagram.com/lennyibizarre/"><i class="fa-brands fa-instagram"></i></a>
                <a target="_blank" href="https://www.linkedin.com"><i class="fa-brands fa-linkedin"></i></a>
              </div>
            </div>
            <p v-html="selectedProduct.description"></p>
            <div class="progress_bar">
              <div id="fill" class="progress" :style="{ width: percentage + '%' }"></div>
            </div>
            <div class="product_action_row">
              <button class="first_button" @click="purchase()" :disabled="myTicketBalance || !(totalAvailable - totalPurchased)">Buy Now
                ({{ totalAvailable - totalPurchased }}/{{ totalAvailable }})
              </button>
              <button class="third_button" :disabled="true" @click="sell()">Sell</button>
            </div>
            <br v-if="errMsg"> </br>
            <div v-if="errMsg" class="message">
              <span>{{ errMsg }}</span>
            </div>
            <div class="tracks">
              <div v-if="tracks.length" class="track_list">
                <div v-for="(track, index) of tracks" :class="{ 'track': true, 'track_active': track.active }"
                     @click="play(index, track)">
                  <img v-bind:src="selectedProduct.image"></img>
                  <div class="track_name">
                    <h4>{{ track.name }}</h4>
                    <p>{{ selectedProduct.artist }}</p>
                  </div>
                  <div class="duration">
                    <h4>{{ track.duration }}</h4>
                  </div>
                  <button :disabled="!hasIt()" @click.stop.prevent="download(index)"><i class="fa-solid fa-download"></i></button>
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
import CookieBanner from "./CookieBanner.vue";

import {onMounted, ref, watch} from "vue";
import {Devest} from "../assets/js/devest-app";
import {BrowserProvider, formatUnits, Contract, ethers} from 'ethers';
import {
  useWeb3Modal,
  createWeb3Modal,
  defaultConfig,
  useWeb3ModalAccount,
  useWeb3ModalProvider,
} from "@web3modal/ethers/vue";

const devest = new Devest();

// 1. Your WalletConnect CCloud project ID
const projectId = '0dfce5c85275438e96a2888b268c0895'

const metadata = {
  name: 'Clubmixed',
  description: 'Buy Music NFTs',
  url: 'https://nft.clubmixed.com', // origin must match your domain & subdomain
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  enableEIP6963: true, // true by default
  enableInjected: true, // true by default
  enableCoinbase: true, // true by default
  defaultChainId: 1, // used for the Coinbase SDK
});

const web3Modal = createWeb3Modal({
  ethersConfig,
  chains: [{
    chainId: 137,
    name: 'Polygon',
    currency: 'MATIC',
    explorerUrl: 'https://polygon-rpc.com/',
    rpcUrl: "https://polygon-rpc.com/"
  }],
  projectId,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  enableOnramp: true // Optional - false as default
});
const modal = useWeb3Modal();
//


const props = defineProps({
  product_id: String,
});

const cards = Array.from({length: 15}, (_, i) => i + 1);

import imageUrlLenny from '@/assets/images/streaming/LennyIbizzare.png';
import imageUrlCoolyG from '@/assets/images/streaming/coolyg.jpg';
import comingSoon from '@/assets/images/streaming/coming.jpg';

cards[0] = {
  _id: "664f549c643970cb99f66fb3",
  image: imageUrlLenny,
  title: "DEEP TECH SIZZLE",
  artist: "Lenny Ibizzare",
  genre: "Ambient, Electronic",
  released: "15 MAY 2024",
  description: "In a rare turn of events we hear by bring you a selection of unreleased tracks from the elusive vault of the musical chameleon that is Lenny Ibizarre. The tunes, which stretches over 12 years of production, is a tasteful selection of groovy outliers most of whom had never seen the light of day until now. Enjoy the ride through a sprawling variety of deep electronic tech-house gems." +
      "<br>Titles:&nbsp;<br>Computers Have Control 7:39, Sgt Poppers Skronk Quatet 9:06, Balearism 7:17, Gearbox 7:08, Girlz 8:46, Deep Finca 6:47, Psychotropic 9:43, Dirt Groove 7:44, Drivesharf 8:45, Nu York Dub 4:48, Baseheadz United 4:48, Kleptomania 7:15, Dawn of The Acid Warrior 6:22",
  price: 15.00,
  link: true,
};
cards[1] = {
  _id: "667c27bf86af34871f76e6dc",
  image: imageUrlCoolyG ,
  title: "NFT Mix",
  artist: "COOLY G",
  released: "30 JUNE 2024",
  description: "1. Bomboclaat (Cooly G), 2. Korallrevnlen (Try Anything Cooly G Mix), 3. Oi Dirty (COOLY G ft. DVA), 4. Molly (Cooly G), 5. Love Again (Cooly G), 6. Gritting (Cooly G),\n" +
      "7. Dis Tribal Boy (Cooly G), 8. Akai (Cooly G), 9. Last Night (Cooly G), 10. The Sore Party (Cooly G Cooldub), 11. Trippin B (Cooly G), 12. Telepathy (Cooly G),\n" +
      "13. Broken Boy (Cooly G), 14. Magnetic (Cooly G), 15. Waybay (Cooly G), 16. Craze Refix (Cooly G), 17. Wat Airtime (Cooly G), 18. Love Dub Remix (Cooly G)",
  price: 15.00,
  link: true,
}

for (let i = 2; i < cards.length; i++) {
  cards[i] = {
    image: comingSoon,
    title: "Coming Soon",
    artist: "ClubMixed",
    released: "",
    price: "",
    link: false,
  };
}

let isConnected = ref(false);
let isNetwork = ref(false);
let connectedAccount = ref("");
let product = ref(null);
let contract = ref(null);
let network = ref(null);
let contractInstance = ref(null);
let chainID = ref("");
let totalAvailable = ref(0n);
let totalPurchased = ref(0n);
let errMsg = ref("");
let tokenPrice = ref(0);
let myTicketBalance = ref(0n);
let myBalance = ref(0);
let percentage = ref(0);
let ticketID = ref("");
let playUrl = ref("");
let cookieSet = ref(1);

let selectedProduct = ref(null);

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

onMounted(async () => {
  window.addEventListener('popstate', event => {
    event.preventDefault();
    firstPage.value = !firstPage.value;
    secondPage.value = !secondPage.value;
  });
  window.onhashchange = function (event) {
    event.preventDefault();
    firstPage.value = !firstPage.value;
    secondPage.value = !secondPage.value;
  }

  //await getData();

  const info = useWeb3ModalAccount();
  if (info.isConnected.value)
    await setupConnection();

  // Watch for changes to the 'address' ref
  watch(info.address, async (newValue, oldValue) => {
    if (!newValue) {
      localStorage.removeItem("devest-token");
      localStorage.removeItem("devest-wallet");
      window.location.reload();
    }
  });
  watch(info.isConnected, async (newValue, oldValue) => {
    await setupConnection();
  });
});

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

async function changePage(card) {
  if (!card.link) return;

  this.getData(card._id);

  firstPage.value = !firstPage.value;
  secondPage.value = !secondPage.value;
  selectedProduct.value = card;
  history.pushState(null, null, window.location.pathname);
}

function shuffle() {
  shuffleOn.value = !shuffleOn.value;
}

function repeat() {
  repeatOn.value = !repeatOn.value;
}
function open() {
  modal.open();
}

async function loadTracks() {
  try {
    const trackPromises = product.value.media.map(async (mediaItem) => {
      const res = await devest.request("data/getTrackData", [mediaItem, {}]);
      return {
        name: res.title,
        duration: res.duration,
        active: false,
      };
    });

    tracks.value = await Promise.all(trackPromises);
  } catch (error) {
    console.error("Error loading tracks:", error);
  }
}

async function createToken() {
  if (localStorage.getItem("devest-token")) {
    console.log('Token already exists!');
    return;
  }
  console.log("Creating the token...");

  const mes = await message(connectedAccount.value);
  console.log("Message:", mes);
  try {
    const { walletProvider } = useWeb3ModalProvider();
    const ethersProvider = new BrowserProvider(walletProvider.value);

    const signer = await ethersProvider.getSigner()
    const signature = await signer?.signMessage(mes);

    console.log("New token created!");
    localStorage.setItem("devest-token", signature);
    localStorage.setItem("devest-wallet", connectedAccount.value);
  } catch (error) {
    console.error("Error creating token:", error);
  }
}

async function message(address) {
  if (!connectedAccount.value) return;
  return "Welcome to DeVest\n" +
      "Click to sign-in and accept the DeVest Terms of Service: https://devest.finance/tos\n" +
      "This request will not trigger a blockchain transaction or cost any gas fees.\n" +
      "Your authentication status will reset after 24 hours.\n" +
      "Wallet address:\n" + address.toLowerCase();
}

async function setupConnection() {
  //await getData();
  const info = useWeb3ModalAccount();

  if (!info.isConnected.value)
    return;

  connectedAccount = info.address;
  chainID = info.chainId;
  isConnected = info.isConnected;
  isNetwork.value = true;

  console.log("Address:", connectedAccount.value);
  console.log("Chain ID:", chainID.value);
  console.log("Is Connected:", isConnected.value);

  if (isConnected.value){
    // fetch balance
    const { walletProvider } = useWeb3ModalProvider();
    const ethersProvider = new BrowserProvider(walletProvider.value)

    const balance = await ethersProvider.getBalance(connectedAccount.value);
    const formattedBalance = formatUnits(balance, 'ether');
    myBalance.value = Number(formattedBalance);

    // create token
    if (connectedAccount.value && !localStorage.getItem("devest-token")) {
      await createToken();
    }

    /*
      const signer = await ethersProvider.getSigner();
      contractInstance.value = new Contract("0x56F46Ae0B3f8Aba3C4cf5f7924C482719314384F", contract.value.abi, signer)
      myTicketBalance.value = await contractInstance.value.balanceOf(connectedAccount.value);
      totalAvailable.value = await contractInstance.value.totalSupply();
      totalAvailable.value = Number(totalAvailable.value);
      totalPurchased.value = await contractInstance.value.totalPurchased();
      totalPurchased.value = Number(totalPurchased.value);
      percentage.value = (totalAvailable.value - totalPurchased.value) / totalAvailable.value * 100;
    */
  }
}

async function connectWallet() {
  await modal.open();
}

async function handleTimeUpdate() {
  if (audioRef.value.currentTime === 0)
    cookieSet.value = 1;
  else if (cookieSet.value - currentTimeMinutes.value !== 1)
    cookieSet.value = currentTimeMinutes.value + 1;
  if (audioRef.value && audioRef.value.currentTime) {
    currentTimeMinutes.value = Math.floor(audioRef.value.currentTime / 60);
    currentTimeSeconds.value = Math.floor(audioRef.value.currentTime) % 60;
    if (currentTimeSeconds.value < 10) currentTimeSeconds.value = "0" + currentTimeSeconds.value;
    progress.value = Math.floor((100 / audioRef.value.duration) * audioRef.value.currentTime);
  }

  if (Math.floor(audioRef.value.currentTime) % 60 === 0 && cookieSet.value === currentTimeMinutes.value) {
    authorize();
    cookieSet.value++;
  }
    
}

function initializeAudioProperties() {
  if (audioRef.value) {
    durationMinutes.value = Math.floor(audioRef.value.duration / 60);
    durationSeconds.value = Math.floor(audioRef.value.duration) % 60;
    if (durationSeconds.value < 10) durationSeconds.value = "0" + durationSeconds.value;
  }
}

function hasIt(){
  return myTicketBalance.value > 0;
}

async function download(track) {

  await authorizeSync();

  const url = `https://nft.clubmixed.com/download/${track}`;
  const loadingIndicator = document.getElementById('loadingIndicator');

  // Create a temporary iframe
  const iframe = document.createElement('iframe');
  iframe.style.display = 'none';
  iframe.src = url;

  // Append the iframe to the body
  document.body.appendChild(iframe);

  // Remove the iframe after the download has started
  iframe.onload = () => {
    document.body.removeChild(iframe);
  };

 }


function seek() {
  if (audioRef.value) {
    const time = (audioRef.value.duration * progress.value) / 100;
    audioRef.value.currentTime = time;
  }
}

async function getData(_id) {
  try {
    const res = await devest.request("data/getData", [_id, {}]);
    product.value = res.payload.product;
    contract.value = res.payload.contract;
    network.value = res.payload.network;
    await loadTracks();
    await fetchTokenPrice();


    const { walletProvider } = useWeb3ModalProvider();
    const ethersProvider = new BrowserProvider(walletProvider.value)

    // ----
    const signer = await ethersProvider.getSigner();
    contractInstance.value = new Contract(product.value.address, contract.value.abi, signer)
    myTicketBalance.value = await contractInstance.value.balanceOf(connectedAccount.value);
    myTicketBalance.value = Number(myTicketBalance.value);
    totalAvailable.value = await contractInstance.value.totalSupply();
    totalAvailable.value = Number(totalAvailable.value);
    totalPurchased.value = await contractInstance.value.totalPurchased();
    totalPurchased.value = Number(totalPurchased.value);
    percentage.value = (totalAvailable.value - totalPurchased.value) / totalAvailable.value * 100;

  } catch (error) {
    console.log(error);
  }
}

async function purchase() {
  await setupConnection();
  ticketID.value = (totalPurchased.value + 1).toString();
  let fee = "0.3"; //await devest.request("data/get", [props.product_id, "platformFee", {}]);
  //let price = "15300000000000000000"; //await devest.request("data/get", [props.product_id, "price", {},]);
  //price = ethers.formatEther(Number(price).toString());
  const finalPrice = "15360000000000000000"; //Number(fee) + Number(price);

  try {
    const res = await contractInstance.value.purchase(ticketID.value, {
    value: finalPrice,
    from: connectedAccount.value
  });
  } catch (error) {
    console.log(error);
    errMsg.value = "Insufficient balance to complete the transaction. \nPlease ensure you have enough balance to cover the cost and gas fees."
    setTimeout(() => {
      errMsg.value = "";
    }, 4000);
  }
  totalPurchased.value = await contractInstance.value.totalPurchased();
  totalPurchased.value = Number(totalPurchased.value);
  percentage.value = (totalAvailable.value - totalPurchased.value) / totalAvailable.value * 100;
  myTicketBalance.value = await contractInstance.value.balanceOf(connectedAccount.value);
}

function authorize() {
  const token = localStorage.getItem("devest-token");
  const wallet = localStorage.getItem("devest-wallet");
  const networkChainId = network.value.chainId;
  const productAddress = product.value.address;

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `https://nft.clubmixed.com/authorize/${(new Date().getTime())}`);
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
      console.log("New cookie assigned")
    }
    if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
      alert("Sorry you are not authorized to watch this stream");
    }
  }
}

function play(index, track) {
  if (active_index.value !== null)
    tracks.value[active_index.value].active = false;

  track.active = true;
  active_index.value = index;

  // track index
  try {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: track.name,
        artist: "Lenny Ibizzare",
        album: 'DEEP TECH SIZZLE FROM THE VAULT', // Optional
        artwork: [
          {src: '/assets/LennyIbizzare-BmHPN7nV.png', sizes: '512x512', type: 'image/jpeg'},
        ]
      });
    }
  } catch (ex){
    console.log(ex);
  }

  const token = localStorage.getItem("devest-token");
  const wallet = localStorage.getItem("devest-wallet");
  const networkChainId = network.value.chainId;
  const productAddress = product.value.address;

  const xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", `https://nft.clubmixed.com/authorize/${(new Date().getTime())}`);
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
      playUrl.value = "https://nft.clubmixed.com/stream/" + index;
      playOn.value = true;
    }
    if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
      alert("Sorry you are not authorized to watch this stream");
    }
  }
}

async function authorizeSync(){
  return new Promise( (resolve, reject) => {
    const token = localStorage.getItem("devest-token");
    const wallet = localStorage.getItem("devest-wallet");
    const networkChainId = network.value.chainId;
    const productAddress = product.value.address;

    const xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", `https://nft.clubmixed.com/authorize/${(new Date().getTime())}`);
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
        resolve(true);
      }
      if (xmlhttp.readyState === XMLHttpRequest.DONE && xmlhttp.status === 403) {
        resolve(false);
      }
    }
  });
}

function playPause() {
  if (active_index.value === null)
    play(0, tracks.value[0]);
  if (playOn.value) {
    audioRef.value.pause();
    playOn.value = false;
  } else {
    audioRef.value.play();
    playOn.value = true;
  }
}

function playNext() {
  if (repeatOn.value) {
    playUrl.value = "";
    play(active_index.value, tracks.value[active_index.value]);
  } else if (shuffleOn.value) {
    const randomIndex = Math.floor(Math.random() * tracks.value.length);
    play(randomIndex, tracks.value[randomIndex]);
  } else if (active_index.value !== tracks.value.length - 1)
    play(active_index.value + 1, tracks.value[active_index.value + 1]);
}

function playPrevious() {
  if (repeatOn.value) {
    playUrl.value = "";
    play(active_index.value, tracks.value[active_index.value]);
  } else if (shuffleOn.value) {
    const randomIndex = Math.floor(Math.random() * tracks.value.length);
    play(randomIndex, tracks.value[randomIndex]);
  } else if (active_index.value !== 0)
    play(active_index.value - 1, tracks.value[active_index.value - 1]);
}

function next() {
  if (repeatOn.value) {
    playUrl.value = "";
    play(active_index.value, tracks.value[active_index.value]);
  } else if (shuffleOn.value) {
    const randomIndex = Math.floor(Math.random() * tracks.value.length);
    play(randomIndex, tracks.value[randomIndex]);
  } else {
    if (active_index.value !== tracks.value.length - 1)
      play(active_index.value + 1, tracks.value[active_index.value + 1]);
  }
}
</script>

