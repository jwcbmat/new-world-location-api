# API for extracting and converting files from the New World game

This API allows you to extract and convert files from the New World game<br>
to provide information about the location of items and minerals. <br>
It uses the "Pak extracter" and "Datasheet converter" tools to perform these operations.

## Prerequisites

To use this API, you must have the New World game files installed on your system<br>
and have the "Pak extracter" and "Datasheet converter" tools available.<br>
In addition, you must have Node.js and npm installed on your system.

## Installation

1. Clone this repository to your machine:

```bash
git clone https://github.com/jwcbmat/new-world-location-api.git
```

2. Access the API directory:

```bash
cd new-world-location-api
```

3. Install the project dependencies using npm:

```bash
npm install
```

## Usage

To start the API, run the following command:

```bash
npm start
```

The API will be available on port 3000 of your localhost. You can change the default port in the .env file.

## Routes

### GET /extract

Extracts files from the New World game's asset directory using the "Pak extracter". <br>
Optional parameters can be passed as query strings in the request.

Example request:

```bash
curl 'http://localhost:3000/extract?threads=3&filter=.ext1,.ext2&decompress-azcs&fix-luac&hash=./extract/files.sha1'
```

### GET /convert

Converts the files extracted with the "Pak extracter" to JSON format using the "Datasheet converter". Optional parameters can be passed as query strings in the request.

Example request:

```bash
curl 'http://localhost:3000/convert?threads=3&localization=./extract/localization/en-us&keep-structure'
```

## License

This project is licensed under the MIT license. See the LICENSE file for more details.