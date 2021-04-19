# score-service

This document uses `https://xcoins-score-api.herokuapp.com/` as a placeholder that represents
the base URL where this service is deployed. Replace accordingly.


## `GET /:coin/address/:address/`

Return information about that coins score.

Status codes:

- `200 OK`: Success.
- `404 Something went wrong`: Error happen on fetching data from API.

Response payload:

On success, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `coin`: which coin is used for getting response.
- `score`: how much score for that coin.
- `date`: which date and time for got response from API.

Sample response:

```json
{
    "message": "Success",
    "data": {
        "coin": "btc",
        "score": "2",
        "date": "2021-04-05T06:24:37.799Z",
        "output_count": null
    }
}
```

On failure, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `data`: null.

Sample response:

```json
{
    "message": "Something went wrong",
    "data": null
}
```

`curl` examples:

```bash
curl --silent https://xcoins-network-api.herokuapp.com/api/v1/BTC/address/0x440bA45D053C443BC3aaEefC2E2BF36Fa91F9E9c
```

## `GET /:coin/txid/:txid`

Return information about that coin score based on transaction id.

Status codes:

- `200 OK`: Success.
- `404 Something went wrong`: Error happen on fetching data from API.

Response payload:

On success, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `coin`: which coin is used for getting response.
- `score`: how much score for that coin.
- `date`: which date and time for got response from API.

Sample response:

```json
{
    "message": "Success",
    "data": {
        "coin": "btc",
        "score": "0",
        "date": "2021-04-05T06:24:37.799Z",
    }
}
```

On failure, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `data`: null.

Sample response:

```json
{
    "message": "Something went wrong",
    "data": null
}
```

`curl` examples:

```bash
curl --silent https://xcoins-network-api.herokuapp.com/api/v1/BTC/txid/0x440bA45D053C443BC3aaEefC2E2BF36Fa91F9E9c
```