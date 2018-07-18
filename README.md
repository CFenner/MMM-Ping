# MagicMirror-Ping-Module
<p>
<a href="http://choosealicense.com/licenses/mit"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

Module to check the network connection on the MagicMirror.

![Ping Module](https://github.com/CFenner/MagicMirror-Ping-Module/blob/master/.github/preview.png)
![Ping Module](https://github.com/AgP42/MMM-Ping/blob/master/.github/ping.png)

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

```js
                {
                        module: 'ping',
                        position: 'top_left',
                        header: "Surveillance WiFi",
                        config: {
                                updateInterval: 1,
                                showAlways: true,
                                showAbsoluteTime: true
                        }
                },
```

|Option|Description|
|---|---|
|`showAlways`|Should the status always be shown or just if the connection is lost?<br><br>**Default value:** `false`|
|`updateInterval`|How often does the content needs to be fetched? (Minutes)<br><br>**Default value:** `10`|
|`animationSpeed`|Speed of the update animation. (Seconds)<br><br>**Default value:** `1`|
|`showAbsoluteTime`|Add or not the last Absolute Time where the ping was successfull. In case of total freeze of the screen, still possible to know the last update<br><br>**Default value:** `false`|
|`AbsoluteTimeFormat`|Format to display the AbsoluteTime<br><br>**Default value:** `dd - HH:mm:ss`|
