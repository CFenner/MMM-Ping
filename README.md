# MagicMirror-Ping-Module
<p>
<a href="http://choosealicense.com/licenses/mit"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

Module to check the network connection on the MagicMirror.

![Sonos Module](https://github.com/CFenner/MagicMirror-Ping-Module/blob/master/.github/preview.png)

## Installation

Go to your MagicMirror folder.

`cd MagicMirror`

Clone the repository.

`git clone https://github.com/CFenner/MagicMirror-Ping-Module.git modules/ping`

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
|`updateInterval`|How often does the content needs to be fetched? (Minutes)<br><br>**Default value:** `10`|
|`animationSpeed`|Speed of the update animation. (Seconds)<br><br>**Default value:** `1`|
