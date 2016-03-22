alexa-wol-skill
===

A project for submitting a WOL magic packet from Alexa. Requires a wol-proxy
instance to be running on the intended networks exposing a TCP port from which
the proxy will operate.

Intended Use:

A raspberry pi on a home network accepts commands from Alexa to start a machine
on the network. A handy way to WOL a Steam Machine by voice command. This is a
workaround for an outstanding issue in [DD-WRT Port Forwarding](https://www.dd-wrt.com/phpBB2/viewtopic.php?p=667744).
