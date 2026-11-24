const st=QS.map(()=>"p");let i=0,msg="";
const norm=s=>s.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"");
function hablar(t){speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(t);u.lang="es-ES";u.rate=0.9;speechSynthesis.speak(u)}
const rosco=document.getElementById("rosco"),centro=document.getElementById("centro"),R=160;
const btns=QS.map((q,k)=>{const b=document.createElement("button");b.className="letra";b.textContent=q.l;
 const a=k/QS.length*2*Math.PI-Math.PI/2;b.style.left=(R+4+R*Math.cos(a))+"px";b.style.top=(R+4+R*Math.sin(a))+"px";
 b.onclick=()=>{if(st[k]==="p")i=k;hablar(q.t+" por "+q.l+". "+q.d);pintar()};rosco.appendChild(b);return b});
function sig(){for(let k=1;k<=QS.length;k++){const j=(i+k)%QS.length;if(st[j]==="p")return j}return i}
function pintar(){const fin=!st.includes("p");
 btns.forEach((b,k)=>b.className="letra "+(st[k]!=="p"?st[k]:"")+(k===i&&!fin?" actual":""));
 const ok=st.filter(s=>s==="ok").length,ko=st.filter(s=>s==="ko").length;
 document.getElementById("ok").textContent=ok;document.getElementById("ko").textContent=ko;
 document.getElementById("f").style.display=fin?"none":"flex";
 centro.innerHTML=fin?`<b>¡Fin del rosco!</b><p>${ok} aciertos · ${ko} errores</p><button onclick="location.reload()">Jugar de nuevo</button>`
 :`<small>${QS[i].t} por <b>${QS[i].l}</b></small><b>${QS[i].d}</b><small>${msg}</small>`}
function responder(pasa){const r=document.getElementById("r");
 if(pasa)msg="Pasapalabra";else{if(!r.value.trim())return;const b=norm(r.value)===norm(QS[i].a);st[i]=b?"ok":"ko";msg=b?"¡Correcto!":"Era: "+QS[i].a;hablar(b?"¡Correcto!":"Era "+QS[i].a)}
 r.value="";i=sig();pintar();r.focus()}
document.getElementById("f").onsubmit=e=>{e.preventDefault();responder(false)};
document.getElementById("pasa").onclick=()=>responder(true);pintar();
