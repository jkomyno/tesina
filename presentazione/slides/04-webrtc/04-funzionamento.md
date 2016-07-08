## Funzionamento
La Web App:
- ottiene i parametri che compongono l'SDO dal browser
- si occupa di inviare l'SDO ad un altro peer mediante la rete Internet
- ottiene in risposta l'SDO dell'altro peer
- trasferisce entrambi gli SDO allo stack WebRTC residente nel browser
### Una volta ottenuti i parametri necessari, WebRTC stabilisce il link peer-to-peer