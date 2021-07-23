<script>
    import { ethers } from "ethers";
    import axios from "axios";

    const backendUri = "http://localhost:4000/";

    // Keep track of auth state
    let authToken = null;

    const handleLogin = async () => {
        try {
            // Get the nonce from backend
            const nonceBody = await axios.get(backendUri + "token");
            const nonce = nonceBody.data.toString();

            // Get the Ethereum object from the MetaMask extension
            const { ethereum } = window;

            // If MetaMask does not exist warn user
            if (!(ethereum && ethereum.isMetaMask)) {
                alert("You must have the Metamask extensioin installed.");
            } else {
                // Get the provider and signer
                const provider = new ethers.providers.Web3Provider(ethereum);
                const signer = provider.getSigner();
                // Sign the nonce
                const signature = await signer.signMessage(nonce);

                // Get Ethereum accounts
                const accounts = await ethereum.request({
                    method: "eth_accounts",
                });
                // Get the address of the first account
                const firstAccountAddress = accounts[0];

                // Post the signature to backend
                const response = await axios.post(backendUri + "auth", {
                    address: firstAccountAddress,
                    signature: signature,
                    nonce: nonce,
                });

                // Set authToken
                authToken = response.data;
            }
        } catch (e) {
            console.log(e);
        }
    };
</script>

<div>
    {#if !authToken}
        <div
            class="rounded font-bold w-48 m-auto px-2 py-1 bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600"
        >
            <button on:click={handleLogin}> Login With MetaMask </button>
        </div>
    {:else}
        <p>Your authotization token is:</p>
        <p>{authToken}</p>
    {/if}
</div>
