(function(){
  var reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
  var boot=document.getElementById('boot'),out=document.getElementById('out'),f=document.getElementById('f'),
      u=document.getElementById('u'),p=document.getElementById('p'),go=document.getElementById('go'),term=document.getElementById('term');
  var lines=['> bağlantı kuruluyor...','> sunucu: mustio.co','> şifreleme: AES-256 (sözde)','> kimlik bekleniyor<span class="cur"></span>'];
  function add(box,html,cls){var d=document.createElement('div');if(cls)d.className=cls;d.innerHTML=html;box.appendChild(d);return d;}
  function showForm(){f.classList.add('on');u.focus();}
  if(reduce){lines.forEach(function(l){add(boot,l);});showForm();}
  else{var i=0;(function next(){if(i>=lines.length){showForm();return;}add(boot,lines[i++]);setTimeout(next,420);})();}

  var tries=0,pass={u:'root',p:'mustio2026'};
  function lock(sec){
    u.disabled=p.disabled=go.disabled=true;
    var row=add(out,'','red');
    (function tick(){
      if(sec<=0){u.disabled=p.disabled=go.disabled=false;tries=0;row.textContent='> kilit açıldı. tekrar dene.';u.focus();return;}
      row.textContent='> SİSTEM KİLİTLENDİ. '+sec+' sn bekle.';sec--;setTimeout(tick,1000);
    })();
  }
  function seq(steps,done){var k=0;(function n(){if(k>=steps.length){done();return;}add(out,steps[k++]);setTimeout(n,reduce?0:550);})();}

  f.addEventListener('submit',function(e){
    e.preventDefault();
    out.innerHTML='';
    if(u.value.trim()===pass.u&&p.value===pass.p){
      u.disabled=p.disabled=go.disabled=true;
      seq(['> kimlik doğrulanıyor... <span class="dim">[TAMAM]</span>','> oturum anahtarı üretiliyor... <span class="dim">[TAMAM]</span>','> güvenlik duvarı kontrol ediliyor... <span class="dim">[TAMAM]</span>'],function(){
        add(out,'> ERİŞİM VERİLDİ. hoş geldin, root.','red');
      });
    }else{
      tries++;
      term.classList.remove('shake');void term.offsetWidth;term.classList.add('shake');
      add(out,'> ERİŞİM REDDEDİLDİ (deneme '+tries+'/3)','red');
      p.value='';
      if(tries>=3){lock(10);}else{p.focus();}
    }
  });
})();
