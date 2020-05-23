function tekst(msg,ctrlwidth)
{
msg = " "+msg
newmsg = msg
while (newmsg.length < ctrlwidth) {newmsg += msg}
document.write ('<form name="Tekst">')
document.write ('<input name="tekst" value= "'+newmsg+'" size= '+ctrlwidth+' id="spanticker" style="margin-top: auto;"/>')
document.write ('</form>')
prokrutka()
}
function prokrutka()
{
NowMsg=document.Tekst.tekst.value
NowMsg=NowMsg.substring(1,NowMsg.length)+NowMsg.substring(0,1)
document.Tekst.tekst.value = NowMsg
bannerid=setTimeout("prokrutka()", 300)
}

tekst("Бегущая строка в JavaScript", 160)