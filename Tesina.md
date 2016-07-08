<h1><p align="center">Schiabel Alberto</p></h1>
<h2><p align="center">ITTS V. Volterra - <i>5°A 2015/2016</i></p></h2>
<h1><p align="center"><blockquote>Integrazione del modello Agile con ReactJS e Redux</blockquote></p></h2>
<h1 ><p align="center">Progetto: "Applicazione dedicata al trasferimento dati istantaneo"</p></h1>


----------

<br />  
<br />  
<br />  
<br />  
<br />  
<br />
<h6><p align="right">1/29<p></h6>


##Indice dei contenuti

  * [Premessa](#premessa)
  * [Ambiente di sviluppo](#ambiente-di-sviluppo)
  * [Redux](#redux)
    * [Perché Redux](#perché-redux)
    * [Action](#action)
    * [Reducer](#reducer)
    * [Store](#store)
    * [Immutabilità](#immutabilità)
  * [Metodologia di Progettazione](#metodologia-di-progettazione)
    * [Critica del modello a cascata](#critica-del-modello-a-cascata)
    * [PDD](#pdd)
    * [Agile](#agile)
    * [Scrum](#scrum) 
    * [Relazione Redux - Agile](#relazione-redux-agile) 
  * [WebRTC](#webrtc)
    * [Signaling](#signaling)
    * [Funzionamento](#funzionamento)
    * [STUN](#stun)
    * [TURN](#turn)
    * [ICE](#ice)
    * [API](#api)
    * [Sicurezza](#sicurezza)
  * [Test del programma](#test-del-programma)
    * [Framework dedicati al Test](#framework-dedicati-al-test)
    * [Assertion](#assertion)
    * [Test Helper](#test-helper)
    * [Lancio del Test](#lancio-del-test)
  * [OAuth2](#oauth2)
  * [Conclusioni](#conclusioni)
  * [Riferimenti](#riferimenti)

<br />
<h6><p align="right">Indice dei contenuti - 2/29<p></h6>


#<i class="icon-doc-text-inv"></i>**Premessa**
<p align="justify">Sono una persona che è sempre stata affascinata davanti ai prodigi della tecnologia moderna, e non sopporto l'idea di subire passivamente ogni innovazione. Da anni il mio obiettivo è arricchire le mie conoscenze sviluppando nuove competenze per **poter creare nuovi utilizzi del web**, ed espanderlo oltre i limiti attuali.</p>


<p align="justify">Nonostante io riconosca la validità delle tecnologie più consolidate, mi dedico continuativamente all'incessante ricerca del framework più innovativo, solido e supportato, ed ho dedicato buona parte di quest'anno scolastico allo studio approfondito dello stack NodeJS e di ReactJS, una libreria dedicata allo sviluppo di interfacce utente e alla creazione di componenti riutilizzabili. Inoltre, grazie all'**esperienza di lavoro** diretta che ho vissuto, grazie alla realizzazione di due applicazioni **Android** (una per l'associazione AVIS e l'altra per il comune di San Stino di Livenza), ho avuto modo di apprezzare in prima persona i vantaggi di una metodologia di progettazione orientata ai prototipi, come nel caso di **Agile**.</p>

<p align="justify">Ho una vera e propria ossessione per la chiarezza e la concisione del codice che scrivo, per la scelta dei migliori strumenti dedicati al Front-End ed al Back-End disponibili *sulla piazza*, e per la modularità all'interno delle mie applicazioni, Web o Mobile che siano. Ritengo infatti sia opportuno abituarmi fin da subito alle modalità di lavoro adottate dai team di sviluppatori, favorendo la realizzazione di componenti in parallelo. Inoltre, da numerosi anni faccio parte della community di condivisione dati peer-to-peer e ho contribuito con la distribuzione di file audio composti e prodotti da me.</p>

<p align="justify">Ho dunque deciso di dedicarmi alla realizzazione di un progetto che coinvolga lo stack che più mi ha colpito ed appassionato con la metodologia di progettazione e realizzazione che mi è stata utile in prima persona in ambito lavorativo. Per riuscire nel mio obiettivo, ho studiato ed applicato tutte le *good practices* utilizzate attualmente in ambito industriale, nel tentativo di distaccarmi dall'ambiente scolastico in visione di una futura postazione di lavoro nell'ambito della progettazione e realizzazione di sistemi informatici.</p>

<h6><p align="right">Premessa - 3/29<p></h6>

#<i class="icon-cog"></i>**Ambiente di sviluppo**

<p align="justify">Per poter organizzare nella maniera più ordinata e produttiva la realizzazione del progetto, ho utilizzato alcuni degli strumenti più all'avanguardia, di cui desidero citare i principali.</p>

- **npm**: letteralmente "Node Package Manager", è il più importante raccoglitore online di librerie javascript client e server side.
- **ReactJS**: tipicamente riconosciuta come la "V" dell'architettura Model-View-Controller, è una libreria sviluppata da Facebook che consente la creazione di interfacce utente tramite componenti riutilizzabili, ed è fortemente incentrata nella gestione degli stati e degli eventi di ognuno dei suddetti componenti. I componenti sono renderizzati come HTML e sono scritti con una particolare sintassi chiamata JSX.
- **Babel**: convertitore JavaScript per supportare la nuova sintassi di ES6/ES7 (New-generation JS) anche nei browser meno aggiornati che supportano solo ES5 (Vanilla JS).
- **Webpack**: *module bundler*, ovvero è uno strumento dedicato alla generazione di risorse statiche partendo da moduli con dipendenze.
- **Mocha**: framework dedicato alla scrittura di test automatizzati.
- **Sublime Text**: editor multipiattaforma con supporto ESLint. Grazie al supporto di plugin di terze parti è comparabile ad un IDE come IntelliJ Webstorm.



<p align="justify">Webpack, in particolare, grazie all'integrazione con numerosissimi plugin a disposizione, è lo strumento ideale per automatizzare la fase di assemblaggio, grazie alla possibilità di creare due configurazioni diverse: una per il debug durante lo sviluppo, e l'altra per l'ambiente *production*.</p>

> <i class="icon-tag"></i>**Nota**
> I componenti precedentemente citati sono utilizzati anche da grandi aziende come **Facebook**, **Instagram**, **Yahoo**, **Dropbox** e **Netflix**.

<br />
<br />
<h6><p align="right">Ambiente di sviluppo - 4/29<p></h6>


#**Redux**


<p align="justify">Redux è uno strumento per la gestione dello stato dei dati e delle interfacce utente, ed è dedicato alle applicazioni Web o Mobile scritte in JavaScript. In particolare, esso è ottimo per le **SPA** (Single Page Applications), poiché spesso non è facile poter ottenere lo stato di ogni singolo componente (*ad esempio*: sapere che oggetto è selezionato in una tab view) e distribuire tale informazione tra i componenti padri e figli.</p>


<p align="justify">Redux centralizza ogni stato dell'applicazione in un singolo store (che può essere inteso come un database a documenti locale), che è rappresentato come un grafo di tipo *Object*.</p>

![Redux image](https://i.imgur.com/jXjIqri.png)

##Perché Redux?

<p align="justify">Redux è nato come un miglioramento del pattern Flux, sviluppato da Facebook, e lo ripropone in una struttura più chiara, sicura e performante.</p>

<h6><p align="right">Redux - 5/29<p></h6>

Ecco i più importanti punti di forza di Redux:

- La creazione di un grafo centralizzato dei vari stati dell'applicazione garantisce una maggiore chiarezza del codice, e consente di evitare interazioni tra store diversi, diminuendo la complessità operazionale e concettuale.
- Tale grafo è immutabile, il che garantisce ottimizzazioni a livello di performance
- È *framework-agnostic*, ovvero può essere applicato a framework javascript diversi come jQuery, AngularJS ed EmberJS, nonostante sia stato pensato appositamente per la libreria ReactJS.

##Action

<p align="justify">Le **Actions** sono l'unica fonte di popolamento dello Store: esse hanno il compito di inviare dati dell'applicazione a quest'ultimo tramite il metodo *dispatch()*.</p>


<p align="justify">Esse sono rappresentate da un oggetto standard che deve necessariamente contenere la proprietà *type*, che specifica il tipo dell'azione da lanciare.</p>

```javascript
import * as types from './actionConstants';

function addXyz(payload) {
  return {
    type: types.XYZ_CONSTANT_ACTION,
    payload
  }
}
```


<p align="justify">Se al posto di Redux io avessi utilizzato Flux, la funzione generatrice dell'Action avrebbe invocato l'azione stessa nel seguente modo:</p>

```javascript
import * as types from './actionConstants';

function addXyzWithDispatch(payload) {
```
<h6><p align="right">Redux - 6/29<p></h6>
<br />
```javascript
  const action = {
    type: types.XYZ_CONSTANT_ACTION,
    payload
  }
  dispatch(action)
}
```

> <i class="icon-tag"></i>**Nota**
> Per convenzione (e per ridurre le probabilità di errori di battitura in fase di sviluppo) tali tipi sono spesso definiti come stringhe costanti.

##Reducer

<p align="justify">Il compito del **Reducer** (letteralmente: riduttore) è quello di specificare come lo stato dell'applicazione deve cambiare in risposta ad una Action.</p>


<p align="justify">Esso è dunque una funzione *pura* che accetta come argomenti lo stato precedente ed un'azione, e ritorna come risultato il nuovo stato.</p>

```javascript
(previousState, action) => newState
```

Per tale ragione un Reducer non deve **MAI**:
- modificare gli argomenti
- causare effetti collaterali, come ad esempio invocare API
- chiamare funzioni *non pure*, come ad esempio *Date.now()* o *Math.random()*

Esempio di un Reducer valido:

```javascript
/* @param  state   valore di default pari ad "initialState"
 * @param  action  azione da lanciare che genererà un nuovo stato
 * @return         "nuovo stato" nel caso in cui l'azione sia di un
 *                 tipo riconosciuto, "vecchio stato" altrimenti
 */
```

<h6><p align="right">Redux - 7/29<p></h6>

```javascript
function xyzReducer(state = initialState, action) {
  switch (action.type) {
    case XYZ_CONSTANT_ACTION:
      return (
      /* opzionalmente posso usare lo Spread Operator di ES6:
       * { ...state, xyzValue: action.xyz}
       */
        Object.assign({}, state, 
          {
            xyzValue: action.xyz
          }
        )
      )
    default:
      return state
  }
}
```

> <i class="icon-tag"></i>**Nota**
> Per **funzione pura** si intende che essa non deve assolutamente produrre effetti collaterali che esulano dallo scopo della funzione stessa.

##Store

<p align="justify">È il componente col compito più semplice: immagazzinare dati. Esso è l'unico contenitore di informazioni relative ai diversi componenti, il che aiuta incredibilmente nella gestione di un'applicazione complessa.
Lo **Store** in Redux ha quindi le seguenti responsabilità:</p>

- mantenere immutato lo stato dell'applicazione
- consentire l'accesso allo stato tramite il metodo *getState()*
- consentire allo stato di essere aggiornato in maniera sicura mediante il metdoo *dispatch(action)*
- registrare eventuali listener di eventi tramite *subscribe(listener)*
- abilitare middleware tramite il metodo *applyMiddleware*

<h6><p align="right">Redux - 8/29<p></h6>

> <i class="icon-tag"></i>**Nota**
> Per **middleware** si intende un insieme di software in grado di fungere da intermediario tra il programma principale e gli altri componenti.


##Immutabilità

<p align="justify">È importante precisare che **per immutabilità dello store non si intende l'impossibilità di modificare i dati salvati**; semplicemente, per poter salvare lo stato globale non sarà possibile sovrascrivere quello precedente, ma si dovrà salvare un nuovo oggetto (che erediti comunque le caratteristiche dallo stato precedente).</p>


<p align="justify">Per questo motivo, per ottenere una nuova versione dello stato non è possibile utilizzare metodi che modifichino il valore dell'oggetto *state* - come ad esempio state.push(newValue) -; si dovrà bensì ricorrere al travaso di tutte le proprietà aggiornate dell'oggetto *oldState* in *newState*.</p>


<p align="justify">Nell'esempio di utilizzo del Reducer ho utilizzato *Object.assign()*, il cui primo argomento deve essere un'oggetto vuoto (che in JavaScript si definisce con *{}*) in cui verrà copiato il contenuto degli argomenti a seguire.
Un'approccio meno verboso è l'utilizzo dello Spread Operator introdotto in ES6, che ottempera il medesimo scopo.</p>

> <i class="icon-tag"></i>**Nota**
> In JavaScript, ogni tipo è passato come argomento ad una funzione per valore, tranne nel caso degli oggetti. Il metodo push(), invece, modifica un oggetto come se quest'ultimo venisse passato per indirizzo.


<br />
<br />
<br />
<h6><p align="right">Redux - 9/29<p></h6>


#**Metodologia di Progettazione**

##Critica del modello a cascata

<p align="justify">Secondo il modello Waterfall (a cascata), l'**analisi**, la **progettazione**, la **codifica** ed il **test** sono quattro fasi distinte di un progetto software, ed i membri del team dovevano seguire alla lettera la documentazione creata a priori, durante giorni interi di riunioni. Questo approccio era valido quando anche una lieve modifica al progetto poteva portare ad un aumento esponenziale dei costi; tuttavia, oggi non è affatto così.</p>

![waterfall](http://i.imgur.com/Gmf1Qkw.png)

Ecco le conseguenze negative del modello a cascata:
#### Scarsa qualità


<p align="justify">Essendo le diverse fasi separate cronologicamente, nel caso in cui la deadline sia vicina, la fase che ne risente è sempre la fase di test, poiché è l'unica rimasta da completare (o addirittura da iniziare). Ciò portava i progettisti a non investire tempo a sufficienza nel collaudo del proprio software, con ovvie ripercussioni sulla qualità e stabilità generale.</p>

<h6><p align="right">Metodologia di Progettazione - 10/29<p></h6>

#### Mancata visione d'insieme


<p align="justify">Col modello Waterfall non si ha a disposizione un prodotto funzionante fintantoché le 4 fasi non sono state completate. Ciò comporta un'elevata probabilità di disorientamento, poiché non si è mai certi di quanto tempo possa richiedere una determinata fase.</p>
#### Elevato rischio

- Rischio di attività: impossibilità di stilare un preventivo temporale preciso 
- Rischio tecnico: impossibilità di testare il design e la stabilità del software fino all'ultimo stadio del progetto
- Rischio di progetto: impossibilità di verificare passo passo se la qualità del prodotto in output corrisponda agli standard prefissati

> <i class="icon-tag"></i>**Nota**
> Ricordo che la gestione del rischio avviene in 5 diversi modi:
> - **Prevenzione**: intervenire per evitare che un evento si verifichi
> - **Riduzione**: intervenire per ridurre la probabilità e/o la gravità del rischio
> - **Trasferimento**: mettere in atto delle misure che trasferiscano su altri soggetti o situazioni il rischio di
progetto
> - **Contingenza**: approntare piani da mettere in atto solo in presenza di un rischio
> - **Accettazione**: decidere di accettare e convivere con il rischio senza ulteriori interventi

#### Staticità


<p align="justify">La struttura del modello a cascata non supporta alcuna modifica al piano di progetto iniziale per una questione economico-temporale legata alla necessità di rifare ore ed ore di riunioni anche solo per capire cosa ci sia che non vada nel progetto iniziale. Inoltre, nei termini del morale del team di lavoro, ogni deviazione veniva percepita come un accumularsi di incertezze e dubbi sul progetto stesso.</p>

<h6><p align="right">Metodologia di Progettazione - 11/29<p></h6>

##Agile


<p align="justify">Il modello a Cascata conserva la sua validità nella progettazione di prodotti Web statici, che in tutta probabilità subiranno pochissimi (o meglio: nessuno) cambiamenti durante il processo di sviluppo. Tuttavia, il contesto attuale non è affatto improntato sulla staticità, anzi: ogni cosa che ci circonda, a partire dal software disponibile sul Web, è estremamente dinamica ed evolutiva. La metodologia di gestione progettuale chiamata **Agile** è nata infatti allo scopo di gestire progetti di natura dinamica, incentivando possibili svolte rapide (*pivoting*) in caso di necessità senza revisionare interamente il PID, come avverrebbe con il modello a Cascata. Inoltre, al contrario di quest'ultimo, il modello Agile si incentra sulla consegna continua di prototipi, sul miglioramento costante dei propri risultati e sulla flessibilità dei propri obiettivi.</p>


<p align="justify">La più famosa metodologia di progettazione derivante da Agile è chiamata Scrum, ed insieme ad altre (come ad esempio Extreme Programming (XP) e Lean) poggia le sue fondamenta sull'*Agile Manifesto* e sui suoi 12 principi chiave, che si focalizzano sulle persone, le comunicazioni, il prodotto e la flessibilità.</p>


<p align="justify">Il modello Agile Programming prevede un continuo contatto con il cliente (o utente) in cicli continui di release intermedie atte a facilitare la richiesta di requisiti e la soluzione di eventuali problemi o dubbi emersi dallo
sviluppo. Non vi è una vera documentazione scritta (e mandatoria) come nel caso del modello Waterfall, poiché il codice viene già scritto secondo convenzioni standard tali da permetterne in maniera estremamente rapida (agile) l’analisi.</p>


<p align="justify">La bellezza di questo **approccio orientato ai prototipi** sta nel fatto che questi ultimi sono molto più semplici da capire per chiunque, specialmente per le persone prive di spiccate conoscenze tecnico-teoriche (come ad esempio nel caso dei clienti). Ciò permette quindi a tutti gli **stakeholder** di ottenere risultati immediati (invece di attendere settimane o mesi) e di richiedere eventuali modifiche in corso d'opera nel caso in cui alcuni punti dell'intervista iniziale al committente siano stati male interpretati, oppure se ci dovessero essere lamentele da parte della community di utenti.</p>

<br />
<h6><p align="right">Metodologia di Progettazione - 12/29<p></h6>

![Agile](http://i.imgur.com/YT1H4Wk.png)

##Scrum


<p align="justify">Scrum è la più famosa astrazione della metodologia Agile in ambito software ed è dedicata alla gestione del processo di produzione.</p>


<p align="justify">L'idea di base di Scrum è che è inutile avere un resoconto dettagliato e completo di tutto ciò che è necessario fare per realizzare un progetto, se il team di progetto è in grado di risolvere la problematica verificatasi.
Per questa ragione, le riunioni dedicate alla pianificazione dello "sprint" seguente devono esprimere il risultato desiderato per il prossimo ciclo, invece di definire una boriosa serie di definizioni e criteri, come nel caso di altri tipi di metodologie di progettazione.</p>


<p align="justify">Scrum si affida ad una squadra di lavoro che deve avere necessariamente la capacità di auto-organizzarsi, senza che un capo decida quale persona debba fare una certa operazione o come un imprevisto debba essere risolto: questi sono aspetti che il team intero deve chiarire e risolvere.</p>

<h6><p align="right">Metodologia di Progettazione - 13/29<p></h6>

> <i class="icon-tag"></i>**Nota**
> Nel mondo Agile, si definisce **sprint** un periodo di tempo definito durante il quale una specifica serie di operazioni deve essere conclusa.


<p align="justify">Durante la riunione scrum giornaliera, che solitamente non dura più di 15 minuti, ogni membro del team di lavoro deve rispondere alle seguenti tre domande:</p>

 1. *Cos'ho fatto ieri che possa aver portato la squadra di sviluppo software al raggiungimento dell'obiettivo immediato?*
 2. *Cosa farò oggi per aiutare la mia squadra a raggiungere il medesimo obiettivo?*
 3. *Noto qualche impedimento che possa ostacolare un membro del team?*

##Relazione ReactJS - Redux - Agile


<p align="justify">Uno dei principi chiave di Agile è quello di realizzare in maniera continua e costante prodotti che abbiano almeno le funzionalità basilari pronte all'uso, per poi affinarle di release in release fintantoché il cliente (che è interpellato direttamente dopo ogni ciclo di produzione) non esprima la propria soddisfazione, momento in cui il team di progetto potrà dichiarare concluso lo sviluppo e dedicarsi invece alla manutenzione per un tempo definito.</p>


<p align="justify">Per gli sviluppatori ciò si traduce naturalmente nel bisogno di creare **componenti semplici ed altamente modulabili**, ed è proprio qui che ReactJS dimostra la sua forza. Ma non è tutto: con un numero di componenti in crescente aumento (a mano a mano che vengono effettuati cicli di sviluppo Agile) diventa via via sempre più difficile tenere sotto controllo la gestione delle azioni di ogni singolo componente, il trasferimento degli status tra varie parti dell'app e la gestione dello stato generale dell'applicazione. Per tale ragione, e per le ragioni espresse nei paragrafi dedicati all'**architettura Redux**, ritengo sia estremamente importante per un team di progetto dedicato alla realizzazione di una **SPA** (*Single Page Application*) avere la capacità di astrarre le operazioni di ogni componente e modulare l'applicazione in maniera tale che essa possa scalare senza ulteriori interventi futuri. È altresì importante che il **collaudo** di ogni componente (e delle sue interazioni con gli altri componenti) avvenga man mano che l'applicazione viene realizzata.</p>

<h6><p align="right">Metodologia di Progettazione - 14/29<p></h6>


<p align="justify">È senz'altro fondamentale eliminare ogni forma possibile di **bug** e malfunzionamenti, specie in un'applicazione Web, in quanto una poco attenta gestione delle richieste HTTP o WS può portare a fenomeni gravi come *memory leaks* e latenze superiori ai 3 secondi, che allontanano inevitabilmente gli utenti dalla piattaforma stessa. Grazie a Redux, il tempo impiegato per ragionare sulle cause di un bug è estremamente minimizzato grazie alla suddivisione dei compiti tra Action, Reducer e Store, e a strumenti open source come **ReduxDevTools**, che forniscono una panoramica dettagliata sugli stati dell'applicazione e sulle interazioni tra componenti. Quando si utilizza Agile è prioritario che tutto funzioni alla perfezione, anche se il prodotto realizzato è ancora povero di contenuti.</p>

![agile-benefits](http://i.imgur.com/z63Fbo0.png)


<p align="justify">Inoltre, in termini economici, per una Web Agency l'utilizzo della metodologia Agile (e dei suoi derivati) riduce nettamente il processo di sviluppo di un'applicazione web. Infatti, l'abbattimento del processo di realizzazione fino ai minimi termini consente di individuare ed aggirare i *colli di bottiglia* ed i **tempi morti del progetto**, rendendo l'intera operazione quanto più efficiente ed orientata ai risultati possibile.</p>

<br />
<br />
<br />
<br />
<br />
<h6><p align="right">Metodologia di Progettazione - 15/29<p></h6>

#**WebRTC**


<p align="justify">**WebRTC** è l'acronimo di *Web Real Time Communications*: si tratta di un nuovo standard di comunicazione in tempo reale che supporta stream multimediali, binari e testuali.
La comunicazione avviene tramite una complessa architettura protocollare che fa della connessione peer-to-peer (**P2P**) il suo punto cardine.</p>

## Signaling


<p align="justify">Nonostante la comunicazione peer-to-peer sia per definizione serverless, vi è la necessita di un apparato lato server che garantisca lo **stabilimento della sessione** tra due o più peer tramite handshake: questo processo è chiamato **Signaling**.</p>


<p align="justify">In WebRTC, il concetto di signaling è astratto, in quanto non è stato definito un protocollo unico per stabilire la sessione. Dunque, per scambiare gli **SDO** (*Session Description Objects*) è possibile usare il protocollo preferito, come ad esempio:</p>

- **WebSockets**
- **Google Cloud Messaging**
- **XHR** (*XMLHTTPRequest*)
- **SIP** (*Session Initiation Protocol*)
- **XMPP** (*Extensible Messaging and Presence Protocol*)


<p align="justify">Gli SDO contengono parametri necessari a stabilire la connessione, come ad esempio il *codec* da utilizzare nel caso di uno stream, le misure di sicurezza da applicare, oltre alle informazioni di rete per attivare la **route peer-to-peer**. Il processo di raccolta informazioni relative alla rete in WebRTC si basa sullo standard **JSEP** (*Javascript Session Establishment Protocol*).</p>

<br />
<h6><p align="right">WebRTC - 16/29<p></h6>
##Funzionamento

![webrtc1](http://imgur.com/WPqrmbc.png)

<p align="justify">Le modalità di funzionamento di WebRTC possono essere riassunte nei seguenti passaggi:</p>

- l'applicazione ottiene i parametri che compongono il Session Description Object dal browser
- l'app si occupa di inviare l'SDO ad un altro peer mediante la rete Internet
- l'applicazione ottiene in risposta l'SDO dell'altro peer
- l'app trasferisce entrambi gli SDO allo stack WebRTC residente nel browser
- una volta ottenuti i parametri necessari, WebRTC stabilisce il link peer-to-peer


<p align="justify">Inoltre, per consentire il completo instradamento della sessione peer-to-peer sono necessarie altre infrastrutture server, ma questo accorgimento non sarebbe stato necessario se esistessero solo indirizzi IP pubblici.</p>

<br />
<br />
<br />
<h6><p align="right">WebRTC - 17/29<p></h6>

![WebRTC-ideal](http://i.imgur.com/DVcsGOf.png)


<p align="justify">In un sistema ideale - per WebRTC, almeno - ogni endpoint possiederebbe un indirizzo IP pubblico, che invierebbe ad un altro peer direttamente attraverso il cloud, in maniera tale da stabilire il collegamento direttamente tra i peer stessi. Tuttavia, nell'era odierna in cui sono in utilizzo i **NAT** l'instaurazione della sessione è leggermente più complicato.</p>

![WebRTC-real](http://i.imgur.com/2A78Z4r.png)

<h6><p align="right">WebRTC - 18/29<p></h6>


<p align="justify">I *Network Address Translator* si occupano di distribuire indirizzi IP privati all'interno di una rete locale, e tali indirizzi non sono utili ai fini della comunicazione globale; **non è possibile stabilire una connessione peer-to-peer a meno che non vengano utilizzati indirizzi IP pubblici**.</p>

##STUN


<p align="justify">Per tale ragione WebRTC prevede la presenza degli **STUN**, ovvero *Session Traversal Utilities for Network Address Translators*. Il compito primario di uno STUN è esaminare le richieste in entrata, estrapolare l'indirizzo IP pubblico di provenienza e inoltrarle alla fonte del messaggio.</p>

> Lo STUN permette ad un endpoint di rispondere alla domanda *"Qual è il mio IP pubblico?"*.


<p align="justify">Una volta conclusa la procedura di acknoledgement del proprio indirizzo IP pubblico, il peer non necessita più dello STUN, che quindi non avrà alcuna parte attiva nel flusso dati della comunicazione WebRTC, e non richiederà costose QoS al livello delle architetture cloud.</p>

![WebRTC-stun](http://i.imgur.com/vvGjtMv.png)

<h6><p align="right">WebRTC - 19/29<p></h6>

##TURN


<p align="justify">Vi sono alcuni rari casi in cui l'utilizzo di uno STUN non consente comunque l'instaurazione del collegamento peer-to-peer. I principali casi in cui il solo uso di STUN può rivelarsi inefficace sono:</p>

- **Firewall** del peer restrittivo
- **NAT** del peer che non ammette l'arrivo di pacchetti da un'origine sconosciuta (come nel caso di un NAT Simmetrico)


<p align="justify">Per tali ragioni lo standard WebRTC prevede la presenza di un ulteriore server, chiamato **TURN** (*Traversal Using Relays around NAT*). Esso richiede però che tutti i dati della comunicazione tra i due endpoint attraversino il TURN stesso, rendendolo di fatto una sorta di buffer cloud che consuma la bandwidth del server e aliena il concetto di link peer-to-peer.</p>

![enter image description here](http://imgur.com/ci6Zeh2.png)


<p align="justify">È importante definire che i TURN vengono impiegati solo come ultima spiaggia, nelle situazioni in cui l'utilizzo di server di tipo STUN sia insufficiente.</p>

<h6><p align="right">WebRTC - 20/29<p></h6>


<p align="justify">Secondo le statistiche fornite da **Google**, in un'applicazione WebRTC (attualmente accessibile da circa 1 miliardo di host) l'**86%** dei dati trasmessi è realmente peer-to-peer, mentre il restante 14% ripiega sull'utilizzo di TURN.</p>

| STUN | TURN |
| :----------------------| :----------------	|
| **Economico** | Costi elevati di mantenimento		|
| **QoS non vincolante** | QoS vincolante   |
| Può avere problemi con firewall e NAT simmetrici     | **Funziona sempre**       |

##ICE


<p align="justify">Il protocollo che coordina il coinvolgimento di STUN e TURN è chiamato **ICE** (*Interactive Connectivity Establishment*). ICE permette ai diversi endpoint (chiamati anche "Agenti") di scoprire abbastanza informazioni relative alla loro rispettiva topologia di rete per trovare uno o più percorsi mediante i quali essi possono comunicare.</p>


<p align="justify">Inoltre, ICE permette che ogni *agente* utilizzi un qualsiasi server STUN (o TURN): essi non devono necessariamente connettersi allo stesso server per avviare la comunicazione.</p>

##API

La API di WebRTC permettono di svolgere tre categorie di operazioni:

 1. Acquisizione audio e/o video: **MediaStream**
 2. Trasmissione audio e/o video: **RTCPeerConnection**
 3. Trasmissione di qualsiasi altro tipo di dati: **RTCDataChannel**
 
<br />
<h6><p align="right">WebRTC - 21/29<p></h6>

> <i class="icon-tag"></i>**Nota**
> Si definisce **API** (*Application Programming Interface*) quell'insieme di procedure dedicate agli sviluppatori per integrare ed interagire con determinate funzionalità di un'applicazione.

####MediaStream

- Rappresenta un flusso audio/video
- Può contenere più tracce (esempio: 1 traccia video e 2 tracce audio per la resa stereo)
- Utilizza il getter *navigator.getUserMedia()*

####RTCPeerConnection

Abilita la comunicazione audio e video tra i diversi peer. **RTCPeerConnection** si occupa di:

- Elaborazione del segnale (riduzione rumore di fondo)
- Gestione del codec e della compressione
- Comunicazione peer-to-peer
- Sicurezza
- Gestione della banda disponibile

####RTCDataChannel

Abilita la comunicazione bidirezionale di qualsiasi tipo di dati tra i diversi peer.
**RTCDataChannel** dispone di:

- Stessa API usata dai WebSockets
- Latenza estremamente contenuta
- Due diverse modalità di trasporto: *affidabile* o *non affidabile*
- Sicurezza

<br />
<br />
<br />
<h6><p align="right">WebRTC - 22/29<p></h6>
##Sicurezza

- Crittografia AES automatica a 128 bit, sia per lo stream audio/video, sia per lo scambio di file
- Richiesta esplicita dei permessi che riguardano la cattura di flussi multimediali, come ad esempio la registrazione audio tramite microfono o video tramite webcam
- Sandbox all'interno dei browser supportati (Chrome, Firefox, Opera, Edge)

Per quanto riguarda i protocolli utilizzati da WebRTC, essi sono HTTPS, SRTP e DTLS.

>**HTTPS** (*HyperText Transport Protocol Secure*): utilizzato per crittografare lo scambio degli SDO durante la fase di **Signaling**.
>**SRTP** (*Secure Real-time Transport Protocol*): impiegato nella comunicazione audio/video in tempo reale. 
>**DTLS** (*Datagram Transport Layer Security*): utilizzato per proteggere il trasferimento dei file in WebRTC.

----------


#**Test del programma**

<p align="justify">Per ogni sviluppatore in ambito Front-End è indispensabile predisporre una serie di test automatizzati: questi ultimi hanno il compito fondamentale di rivelare alcune possibili problemi o lacune nel codice sorgente senza nemmeno aprire la Web App nel browser. I framework di Web Testing offrono validi strumenti per verificare la corretta funzionalità di un sito, l'assenza di falle relative alla sicurezza, la compatibilità con i browser principali e così via.</p>

<br />
<h6><p align="right">Test del programma - 23/29<p></h6>

##Framework dedicati al Test

I principali strumenti disponibili per il testing automatizzato di applicazioni JavaScript/NodeJS sono:

- **Mocha**: testing framework estremamente personalizzabile; dispone inoltre di una ricca community di sviluppatori disposti ad offrire supporto tecnico.
- **Jasmine**: questo strumento propone una sintassi semplice e chiara come Mocha, ma non è facilmente configurabile.
- **Tape**: framework che fa della semplicità e della sinteticità i suoi punti di forza.
- **AVA**: libreria molto valida per il testing IO, che consente il testing parallelo (grazie alla natura asincrona di NodeJS) nonostante JavaScript sia un linguaggio single-threaded.


<p align="justify">In particolare, sono rimasto colpito da Mocha ed AVA, con un'iniziale propensione verso quest'ultimo. Ecco un rapido confronto delle qualità di questi due framework che mi ha portato a scegliere Mocha:</p>

| Mocha  					 |Ava |
| :----------------------| :----------------	|
| Seriale 					| **Concorrente**		|
| Assertion non incluso | **Assertion incluso**   |
| ES6 non incluso     | **ES6 incluso**       |
| **Hot Running incluso** | Hot running non incluso |
| **Stacktrace dettagliato** | Stacktrace conciso |
| **Collaudato e maturo** | Nuovo |


<p align="justify">Nonostante io sia un amante delle tecnologie e degli strumenti più moderni, non dispongo di esperienza sufficiente per dedicarmi all'apprendimento di un framework poco documentato, non molto conosciuto, e soprattutto non ancora collaudato e verificato da una community di rilievo, al contrario di Mocha.</p>

<h6><p align="right">Test del programma - 24/29<p></h6>

> <i class="icon-tag"></i>**Nota**
> Le funzionalità in grassetto sono preferibili rispetto alle altre.

##Assertion


<p align="justify">Col termine *assertion* si indica un'espressione di tipo booleano che deve restituire come risultato sempre *TRUE*. Nel caso in cui il valore ritornato sia *FALSE*, il test fallisce, allertando un bug nel programma.</p>


<p align="justify">Come libreria di assertion (che in Mocha non è presente se non tramite plugin) ho utilizzato **Expect**, molto simile a Chai, ma con una sintassi più immediatamente leggibile.</p>

##Test Helper


<p align="justify">Per poter agevolare il controllo del corretto funzionamento dell'applicazione ReactJS e dei singoli componenti, esiste la libreria **React Test Utils**, fornita e supportata direttamente da Facebook; tuttavia necessita di altre librerie aggiuntive ed è dotata di API il cui scopo è poco chiaro, in quanto il team di Facebook ha utilizzato nomi improbabili e *verbosi* per definire i metodi, come ad esempio **scryRenderedDOMComponentWithClass**.</p>


<p align="justify">Ho dunque impiegato **Enzyme**, utility fornita da AirBnB dotata di un'eccellente API jQuery-like il cui scopo è quello di fungere da wrapper dell'API di *React Test Utils* e di **JSDOM**, che permette di testare interazioni col DOM direttamente da NodeJS, senza bisogno di utilizzare il browser.</p>


> <i class="icon-tag"></i>**Nota**
> Per **DOM** (Document Object Model) si intende la struttura logica dei documenti HTML ed XML e la procedura con cui essi sono invocati e manipolati

Ecco un esempio di test su un componente ReactJS:
<h6><p align="right">Test del programma - 25/29<p></h6>

```javascript
import React from 'react';
import { mount, shallow } from 'enzyme';

describe('<ComponentXYZ />', () => {
  it('calls componentDidMount', () => {
    const wrapper = mount(<ComponentXYZ />);
    expect(ComponentXYZ .prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
```

##Lancio del Test

<p align="justify">Trattandosi di un'applicazione estremamente modulata, ho utilizzato i test automatizzati sia per i collaudi intermedi, sia per il collaudo finale. Per poterli eseguire comodamente dal terminale, ho definito un micro script all'interno del file *package.json*, che contiene tutti i riferimenti alle dipendenze (librerie reperite grazie a npm) dell'applicazione, una serie di metadati personalizzabili e una lista di comandi eseguibili da npm:</p>

```bash
# package.json
"scripts": {
  ...,
  "test": "mocha --reporter spec tools/testSetup.js \"src/**/*.test.js\"",
  "test:watch": "npm run test -- --watch"
}
```
L'output di un test positivo sarà simile a:
```bash
$ npm test
[===========================]
1 passing (950ms)
[===========================]
2 passing (1350ms)
```
<h6><p align="right">Test del programma - 26/29<p></h6>

#**OAuth2**

<p align="justify">OAuth 2 è un framework molto utile nell'ambito delle autorizzazioni, in quanto permette alle app Web, Desktop e Mobile di ottenere un accesso limitato agli account degli utente tramite un provider HTTPS, come ad esempio Google, Twitter o Github.</p>

![enter image description here](https://i.imgur.com/8LpFqRb.png)


<p align="justify">OAuth 2 permette di evitare di costruire una soluzione ad hoc per il login ed il signin degli utenti, e funziona delegando ad un servizio di terze parti affidabile il compito di identificare univocamente l'utente, risparmiando agli sviluppatori il compito di organizzare un database proprietario per il mantenimento dei dati degli utenti che accedono al loro Web Service.</p>

Ecco gli step che segue una tipica integrazione di OAuth2 all'interno di una Web App:

 - Il client invia una richiesta di autorizzazione al server, il quale deve garantire che il client sia legittimato ad usare il suo servizio web
 - Il server relativo all'applicazione reindirizza l'utente alla schermata di accesso del **provider** scelto (*Google*, *Twitter*, *Facebook*, ...)
<br />
<h6><p align="right">OAuth2 - 27/29<p></h6>

 - Il content provider verifica l'identità dell'utente e richiede il permesso di leggere i dati del profilo, come ad esempio nominativo, email ed età
 - Il content provider reindirizza l'utente al server dell'applicazione, e notifica il server stesso dell'esito dell'autenticazione
 - In caso di successo, l'applicazione ottiene un codice di autorizzazione
 - A questo punto, l'app effettua una richiesta nei confronti del content provider, richiedendo un **token di accesso** in cambio del precedente codice di autorizzazione
 - L'app può ora effettuare operazioni e richieste nei limiti espressi dai permessi del content provider del quale possiede il token di accesso

> <i class="icon-tag"></i>**Nota**
> Ogni scambio (client -> server, server -> content provider) include un processo di validazione del codice di autorizzazione

----------

#**Conclusioni**

<p align="justify">La realizzazione di questo progetto è stata fondamentale per affinare le mie capacità di programmazione di Web App con il framework ReactJS + Redux. Ringrazio inoltre la community di sviluppatori di **GitHub** e **StackOverflow**, sempre pronti a rispondere ai meno esperti in caso di necessità, fornendo sempre valide motivazioni e spiegazioni.</p>

I seguenti obiettivi sono stati raggiunti:

- creazione interfaccia utente
- routing del sito dinamico
- autenticazione tramite OAuth2
- logging asincrono di alcuni dati relativi agli utenti in un database NoSQL remoto
- data analysis grazie a Google Analytics
- applicazione della tecnologia WebRTC
- verifica funzionamento tramite test automatici

<br />
<h6><p align="right">Conclusioni - 28/29<p></h6>

Questa tesina ed il codice sorgente del progetto sono reperibili al seguente indirizzo web: https://github.com/jkomyno/tesina.

Questo documento è stato scritto nel metalinguaggio MarkDown ed è stato renderizzato in PDF grazie al servizio [stackedit.io](https://stackedit.io).

#**Link e riferimenti**
https://facebook.github.io/react - "A JavaScript library for building user interfaces"
https://facebook.github.io/react-native - "A framework for building native apps using React"
http://redux.js.org/ - "A predictable state container for JavaScript apps"
https://babeljs.io/ - "Next generation JavaScript compiler"
https://webpack.github.io/ - "JavaScript module bundler"
https://webrtc.org/web-apis - "APIs for Real Time Communication"
http://firebase.google.com - "Google's BAAS"
http://www.agilemanifesto.org - "Agile Project Management's Fundament"
https://blog.udemy.com/agile-vs-waterfall/ - "Agile VS Waterfall"
https://rubygarage.org/blog/why-do-you-need-agile-software-development - "Why do you need Agile software development"
http://survivejs.com/webpack/advanced-techniques/configuring-react/ - "Learn how to use Webpack in ReactJS" 
https://reactjsnews.com/how-to-make-your-react-apps-10x-faster - "ReactJS community driven site"
https://github.com/reactjs/react-redux - "Official React bindings for Redux"
http://tools.ietf.org - "Internet Engineering Task Force"
https://mochajs.org/ - "The fun, simple, flexible JavaScript test framework"

----------
<br />
<br />
<br />
<h6><p align="right">Link e Riferimenti - 29/29<p></h6>

  [1]: http://math.stackexchange.com/
  [2]: http://daringfireball.net/projects/markdown/syntax "Markdown"
  [3]: https://github.com/jmcmanus/pagedown-extra "Pagedown Extra"
  [4]: http://meta.math.stackexchange.com/questions/5020/mathjax-basic-tutorial-and-quick-reference
  [5]: https://code.google.com/p/google-code-prettify/
  [6]: http://highlightjs.org/
  [7]: http://bramp.github.io/js-sequence-diagrams/
  [8]: http://adrai.github.io/flowchart.js/
