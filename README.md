# Metamask Authentication Example

This repository hosts solution to a coding challenge which asks to implement a auth flow using the Metamask extension.

The flow is something like the following

- user clicks on Login Button
- the frontend queries a backend API endpoint for a nonce string
- the frontend queries the MetaMask extension for associated ETH accounts and signs the nonce
- the frontend queries another backend API endpoint with the nonce, signature, and current ETH address (extracted from MetaMask)
- the backend validates the address with the recovered address from the signature and sends back a authorization token
- the auth token is displayed in the frontend

This ensures the address extracted from MetaMask extension, and the address that was used to sign the nonce is the same.

### Stack

`pnpm` has been used as the node package manager, `vite` is the frontend build tool.
