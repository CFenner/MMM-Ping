# MagicMirror-Ping-Module
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](http://choosealicense.com/licenses/mit)

Module to display the network connection on the MagicMirror.

![Ping Module](https://github.com/CFenner/MagicMirror-Ping-Module/blob/master/.github/preview.png)

## Installation

Go to your MagicMirror folder.

```
cd MagicMirror
```

Clone the repository.

```
git clone https://github.com/CFenner/MagicMirror-Ping-Module.git modules/ping
```

## Configuration

Add module configuration to config.js.

```js
{
  module: 'ping',
  position: 'ANY_POSITION',
  config: {}
},
```

|Option|Description|
|---|---|
|`showAlways`|Should the status always be shown or just if the connection is lost?<br><br>**Default value:** `false`|
|`showText`|Should the status text be shown or just the status icon?<br><br>**Default value:** `true`|
|`updateInterval`|How often does the content needs to be fetched? (Seconds)<br><br>**Default value:** `10`|
|`animationSpeed`|Speed of the update animation. (Seconds)<br><br>**Default value:** `0`|
