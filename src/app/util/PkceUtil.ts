// Function to generate random base64 URL encoded string
function generateRandomString(length: number): string {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return btoa(String.fromCharCode(...array))
    .replace(/\+/g, '-') // Replace '+' with '-' for URL safety
    .replace(/\//g, '_') // Replace '/' with '_' for URL safety
    .replace(/=+$/, ''); // Remove trailing '=' characters
}

// Function to generate SHA-256 hash
async function sha256(plainText: string): Promise<ArrayBuffer> {
  const encoder = new TextEncoder();
  const data = encoder.encode(plainText);
  return await window.crypto.subtle.digest("SHA-256", data);
}

// Function to generate base64url encoded string from ArrayBuffer
function base64urlencode(arrayBuffer: ArrayBuffer): string {
  const byteArray = new Uint8Array(arrayBuffer);
  const string = String.fromCharCode(...byteArray);
  return btoa(string)
    .replace(/\+/g, '-') // Replace '+' with '-' for URL safety
    .replace(/\//g, '_') // Replace '/' with '_' for URL safety
    .replace(/=+$/, ''); // Remove trailing '=' characters
}

export async function generatePkce(tokenSize: number = 43, codeVerifier?: string): Promise<{ codeVerifier: string; codeChallenge: string }> {
  // Use the provided codeVerifier if available, otherwise generate a random one
  const codeVerifierToUse = codeVerifier || generateRandomString(tokenSize);

  const hashedVerifier = await sha256(codeVerifierToUse);
  const codeChallenge = base64urlencode(hashedVerifier);

  return { codeVerifier: codeVerifierToUse, codeChallenge };
}

// Example usage
(async () => {
  const { codeVerifier, codeChallenge } = await generatePkce(48);
  console.log("Code Verifier:", codeVerifier);
  console.log("Code Challenge:", codeChallenge);
})();