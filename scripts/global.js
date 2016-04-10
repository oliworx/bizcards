// 3 Abk�rzungen f�r oft ben�tigte DOM-Funktionen:
function $(str, nr) {return document.getElementsByTagName(str)[nr];}
// findet ein Element
function _$(str) {return document.getElementById(str);}
// findet ein Element
function $$(str) {return document.getElementsByTagName(str);}
// findet alle Elemente
function c(str) {return document.createElement(str);}
// erzeugt ein Element
function txt(str) {return document.createTextNode(str);}
// erzeugt einen Textknoten
var name, name_db, jobtitel,jobtitel_db, firma,firma_db, adresse,adresse_db, telefon,telefon_db, email,email_db, fax,fax_db, kopiert, anzahl; // sp�ter ben�tigte Variablen

window.onload = init; // Nach dem Laden des Dokuments geht's mit init() los

function init() { // startet nach dem Laden des HTML-Dokuments
 // liest einige HTML-Elemente ein:
 name = _$('name');
 jobtitel = _$('jobtitel');
 firma = _$('firma');
 adresse = _$('adresse');
 telefon = _$('telefon');
 email = _$('email');
 fax = _$('fax');
 kopiert=false;
 anzahl=10;
  lesen(); 
}

function kopieren() {
	if (kopiert)
		return;
	card0=_$('vcard0');
	page=$('section',0);
	for (i=1; i< anzahl; i++) {
		kopie = c('div');
		kopie.className=card0.className;
		kopie.id='vcard' + i;
		kopie.innerHTML=card0.innerHTML;
		page.appendChild(kopie);
	}
	kopiert = true;
}
function lesen() { // beim Start, nach dem Speichern oder L�schen ausgel�st
 name_db = readCookie('name'); 
 if (name_db) name.innerHTML=name_db;
 
 jobtitel_db = readCookie('jobtitel'); 
 if (jobtitel_db) jobtitel.innerHTML=jobtitel_db;
 
 firma_db = readCookie('firma'); 
 if (firma_db) firma.innerHTML=firma_db;

 adresse_db = readCookie('adress'); 
 //alert('lesen, adresse_db='+adresse_db);
 if (adresse_db) adresse.innerHTML=adresse_db;

 telefon_db = readCookie('telefon'); 
 if (telefon_db) telefon.innerHTML=telefon_db;

 email_db = readCookie('email'); 
 if (email_db) email.innerHTML=email_db;

 fax_db = readCookie('fax'); 
 if (fax_db) fax.innerHTML=fax_db;
}

function speichern() { // beim Start, nach dem Speichern oder L�schen ausgel�st
 //alert('speichern');
 try { // f�ngt eventuelle Fehler ab
  // speichere den <section>-Inhalt, wenn er sich ge�ndert hat:
  //alert('speichern, text='+text);
  if (name.innerHTML != name_db) createCookie('name', name.innerHTML);
  if (jobtitel.innerHTML != jobtitel_db) createCookie('jobtitel', jobtitel.innerHTML);
  if (firma.innerHTML != firma_db) createCookie('firma', firma.innerHTML);
  if (adresse.innerHTML != adresse_db) {
	createCookie('adress', adresse.innerHTML);
	//alert('Adresse gespeichert:'+adresse.innerHTML);
  } 
  if (telefon.innerHTML != telefon_db) createCookie('telefon', telefon.innerHTML);
  if (email.innerHTML != email_db) createCookie('email', email.innerHTML);
  if (fax.innerHTML != fax_db) createCookie('fax', fax.innerHTML);
 } catch (e) { // wenn Fehler aufgetreten sind:
  alert('Fehler beim Speichern: ' + e);
 }
 lesen(); // lies die aktualisierte Datenbank aus
}
function openPrintDialog() {
	speichern();
	kopieren();
	if (window.print) window.print();
	else alert('Ausdruck nicht m�glich');
}

// Email-Verschl�sselung
function UnCryptMailto( s )
{
	var n = 0;
	var r = "";
	for( var i = 0; i < s.length; i++)
	{
		n = s.charCodeAt( i );
		if( n >= 8364 )
		{
			n = 128;
		}
		r += String.fromCharCode( n - 1 );
	}
	return r;
}

function linkTo_UnCryptMailto( s )
{
	location.href=UnCryptMailto( s );
}

// Styleswitcher
function setActiveStyleSheet(title) {
  var i, a, main;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
      a.disabled = true;
      if(a.getAttribute("title") == title) a.disabled = false;
    }
  }
}

function getActiveStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled) return a.getAttribute("title");
  }
  return null;
}

function getPreferredStyleSheet() {
  var i, a;
  for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
    if(a.getAttribute("rel").indexOf("style") != -1
       && a.getAttribute("rel").indexOf("alt") == -1
       && a.getAttribute("title")
       ) return a.getAttribute("title");
  }
  return null;
}

function createCookie(name,value,days) {
  if (days) {
    var date = new Date();
    date.setTime(date.getTime()+(days*24*60*60*1000));
    var expires = "; expires="+date.toGMTString();
  }
  else expires = "";
  document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
  var nameEQ = name + "=";
  var ca = document.cookie.split(';');
  for(var i=0;i < ca.length;i++) {
    var c = ca[i];
    while (c.charAt(0)==' ') c = c.substring(1,c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
  }
  return null;
}

window.onload = function(e) {
  var cookie = readCookie("style");
  var title = cookie ? cookie : getPreferredStyleSheet();
  setActiveStyleSheet(title);
}

window.onunload = function(e) {
  var title = getActiveStyleSheet();
  createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);