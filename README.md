# networkfee-service

This document uses `https://xcoins-network-api.herokuapp.com/` as a placeholder that represents
the base URL where this service is deployed. Replace accordingly.


## `GET /:coin/:address/fee`

Return information about that coin network fees.

Status codes:

- `200 OK`: Success.
- `404 Something went wrong`: Error happen on fetching data from API.

Response payload:

On success, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `coin`: which coin is used for getting response.
- `fee`: how much network fee for that coin.
- `date`: which date and time for got response from API.
- `output_count`: if it's present return output transaction's count otherwise return null.

Sample response:

```json
{
    "message": "Success",
    "data": {
        "coin": "eth",
        "fee": "0.002709",
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
curl --silent https://xcoins-network-api.herokuapp.com/api/v1/BTC/0x440bA45D053C443BC3aaEefC2E2BF36Fa91F9E9c/fee
```

## `GET /:coin/:address/fee/slow`

Return information about that coin slow network fees.

Status codes:

- `200 OK`: Success.
- `404 Something went wrong`: Error happen on fetching data from API.

Response payload:

On success, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `coin`: which coin is used for getting response.
- `fee`: how much slow network fee for that coin.
- `date`: which date and time for got response from API.
- `output_count`: if it's present return output transaction's count otherwise return null.

Sample response:

```json
{
    "message": "Success",
    "data": {
        "coin": "eth",
        "fee": "0.002709",
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
curl --silent https://xcoins-network-api.herokuapp.com/api/v1/BTC/0x440bA45D053C443BC3aaEefC2E2BF36Fa91F9E9c/fee/slow
```

## `GET /:coin/:address/fee/:output`

Return information about that coin network fees for 2 outputs.

Status codes:

- `200 OK`: Success.
- `404 Something went wrong`: Error happen on fetching data's from API.

Response payload:

On success, you'll get a json object with the following keys:

- `message`: whether success or failure.
- `coin`: which coin is used for getting response.
- `fee`: it return 1 input to 2 transactions network fee.
- `date`: which date and time for got response from API.
- `output_count`: if it's present return output transaction's count otherwise return null.

Sample response:

```json
{
    "message": "Success",
    "data": {
        "coin": "btc",
        "fee": "0.00032946",
        "date": "2021-04-05T06:36:32.621Z",
        "output_count": "2"
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

If output is Not a Number it will return response like this:

Sample response:

```json
{
    "message": "Output must be Number Only",
    "data": null
}
```

`curl` examples:

```bash
curl --silent https://xcoins-network-api.herokuapp.com/api/v1/BTC/0x440bA45D053C443BC3aaEefC2E2BF36Fa91F9E9c/fee/2
```