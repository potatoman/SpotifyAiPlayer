import fs from 'fs'

export function generateScript(apiList, prompt) {
    return `Here are the details for the api endpoints that you requested: ${apiList} 
    Generate a javascript script that fulfills the users request using only the endpoints I've provided: ${prompt}.
    Assume that the access token should be read from a file called access_token.txt and your response should be just the javascript script with no other text, as in you shouldn't say anything, give me just the script and nothing else.
    Fill in the full url in the script, with https://api.spotify.com/v1 as the base url. You should get the device id in case there is no active spotify player with the following api call:  
    /me/player:
    get:
      tags:
      - Player
      operationId: get-information-about-the-users-current-playback
      summary: |
        Get Playback State
      description: |
        Get information about the user's current playback state, including track or episode, progress, and active device.
      parameters:
      - $ref: '#/components/parameters/QueryMarket'
      - $ref: '#/components/parameters/QueryAdditionalTypes'
      responses:
        "200":
          $ref: '#/components/responses/OneCurrentlyPlaying'
        "204":
          description: Playback not available or active
        "401":
          $ref: '#/components/responses/Unauthorized'
        "403":
          $ref: '#/components/responses/Forbidden'
        "429":
          $ref: '#/components/responses/TooManyRequests'
      security:
      - oauth_2_0:
        - user-read-playback-state.
        Make sure that you use imports instead of require statements. Use the field uris instead of context_uri if you're playing a song. Be very careful with trackID's vs UUID's. Be careful to provide only the script and no other text and make the script be able to execute all the calls. Be careful with parameters to make sure they aren't undefined. The field to get the device id is .data.device not .data.device.id. Do not use example values, use actual values that you find. Remember to store the UUID in a global variable so that you can use it anywhere in the script.
        Use functions to ensure that you read the access token from the file successfully since it is an async function and it is possible that you continue on with your script before you have the access token.`
  }

export function generateEndpoints(prompt) {
const apiList = fs.readFileSync('output.txt', 'utf-8')
return `Pretend you are a spotify helper bot. Ignore all of your previous knowledge of the spotify api. I'm going to provide you with all of the api endpoints that you can use to fulfill the user's request.
Here is the list api's that you can use: ${apiList}.

Given the following prompt which api endpoints are required to fulfill the request: ${prompt}. If the prompt involves making a new playlist, you do not need to follow the playlist, you need to create a new playlist for the user. The user will already be following the playlist. If the request involves a playlist, be sure to inlcude the "Get Current User's Profile" so that you will be able to get the userID. 
Reply with the list of endpoints in the following format and I will give you more information about what they do:
[
    {"endpoint": "endpoint name", "method": "method name"}
].`
}
