
import crypto from 'crypto';

export const handler = async (event) => {
  
          // init
          const inputVerifier = event?.queryStringParameters?.verifier;
          const inputByteSize = event?.queryStringParameters?.bytesize;
          
          console.log('Input event to the lambda ', JSON.stringify(event))
          
          const defaultTokenSize = 43;
          let verifier = null;


          // check if invalid input
          if (inputVerifier && inputByteSize) {
            
              // return if input invalid
              const errorResponse = {
                statusCode: 400,
                body: JSON.stringify({message: "Either pass byteSize or verifier or pass nothing", status: "Bad request"}),
              };
              return errorResponse;
          }
          

          // sanities verifier or generate new verifier
          if (inputByteSize) {
            verifier = generateRandomVerifier(Number(inputByteSize))
          } else {
             if (inputVerifier) {
                verifier = inputVerifier;
              } else {
                verifier = generateRandomVerifier(defaultTokenSize)    
              }
          }

          // collect challenge from verifier
          const challenge = generateChallenge(verifier);
          

          const response = {
            statusCode: 200,
            body: JSON.stringify({ codeVerifier: verifier, codeChallenge: challenge }),
          };
          return response;
};


function generateRandomVerifier(numOfBytes) {
  // return crypto.randomBytes(numOfBytes).toString('base64');
  return crypto.randomBytes(numOfBytes).toString('base64url');
}


function generateChallenge(verifier) {
    const hashAlg = 'sha256';
    // Create the challenge using SHA256 hash and base64url encoding
  return crypto.createHash(hashAlg)
    .update(verifier)
    .digest('base64url');
}