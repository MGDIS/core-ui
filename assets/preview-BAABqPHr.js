const __vite__fileDeps=["./mg-action-more_36.entry-m4JCIYfR.js","./index-00abd8c1-BezloQTm.js","./_commonjsHelpers-BosuxZz1.js","./v4-CQkTLCs1.js","./index.es-BuLHp7aJ.js","./iframe-C5Zn6oI-.js","./mg-loader.entry-DZljuGC7.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{c as W,g as vi,a as yi}from"./_commonjsHelpers-BosuxZz1.js";import{v as hi}from"./v4-CQkTLCs1.js";import{s as bi,t as Ti}from"./index.es-BuLHp7aJ.js";import{_ as dt}from"./iframe-C5Zn6oI-.js";var Ne={},ue=function(e){return e&&e.Math===Math&&e},A=ue(typeof globalThis=="object"&&globalThis)||ue(typeof window=="object"&&window)||ue(typeof self=="object"&&self)||ue(typeof W=="object"&&W)||ue(typeof W=="object"&&W)||function(){return this}()||Function("return this")(),mn={},$=function(e){try{return!!e()}catch{return!0}},xi=$,O=!xi(function(){return Object.defineProperty({},1,{get:function(){return 7}})[1]!==7}),wi=$,Ze=!wi(function(){var e=(function(){}).bind();return typeof e!="function"||e.hasOwnProperty("prototype")}),$i=Ze,Pe=Function.prototype.call,L=$i?Pe.bind(Pe):function(){return Pe.apply(Pe,arguments)},Co={},Lo={}.propertyIsEnumerable,Ro=Object.getOwnPropertyDescriptor,ki=Ro&&!Lo.call({1:2},1);Co.f=ki?function(t){var n=Ro(this,t);return!!n&&n.enumerable}:Lo;var Qe=function(e,t){return{enumerable:!(e&1),configurable:!(e&2),writable:!(e&4),value:t}},_o=Ze,zo=Function.prototype,Wt=zo.call,Si=_o&&zo.bind.bind(Wt,Wt),k=_o?Si:function(e){return function(){return Wt.apply(e,arguments)}},jo=k,Ii=jo({}.toString),Ai=jo("".slice),J=function(e){return Ai(Ii(e),8,-1)},Ei=k,Pi=$,Di=J,gt=Object,qi=Ei("".split),Oi=Pi(function(){return!gt("z").propertyIsEnumerable(0)})?function(e){return Di(e)==="String"?qi(e,""):gt(e)}:gt,ie=function(e){return e==null},Mi=ie,Ci=TypeError,xe=function(e){if(Mi(e))throw new Ci("Can't call method on "+e);return e},Li=Oi,Ri=xe,le=function(e){return Li(Ri(e))},mt=typeof document=="object"&&document.all,S=typeof mt>"u"&&mt!==void 0?function(e){return typeof e=="function"||e===mt}:function(e){return typeof e=="function"},_i=S,D=function(e){return typeof e=="object"?e!==null:_i(e)},ft=A,zi=S,ji=function(e){return zi(e)?e:void 0},we=function(e,t){return arguments.length<2?ji(ft[e]):ft[e]&&ft[e][t]},Bi=k,fn=Bi({}.isPrototypeOf),Hi=typeof navigator<"u"&&String(navigator.userAgent)||"",Bo=A,vt=Hi,Zn=Bo.process,Qn=Bo.Deno,ea=Zn&&Zn.versions||Qn&&Qn.version,ta=ea&&ea.v8,M,Ve;ta&&(M=ta.split("."),Ve=M[0]>0&&M[0]<4?1:+(M[0]+M[1]));!Ve&&vt&&(M=vt.match(/Edge\/(\d+)/),(!M||M[1]>=74)&&(M=vt.match(/Chrome\/(\d+)/),M&&(Ve=+M[1])));var vn=Ve,na=vn,Fi=$,Ni=A,Vi=Ni.String,Ho=!!Object.getOwnPropertySymbols&&!Fi(function(){var e=Symbol("symbol detection");return!Vi(e)||!(Object(e)instanceof Symbol)||!Symbol.sham&&na&&na<41}),Wi=Ho,Fo=Wi&&!Symbol.sham&&typeof Symbol.iterator=="symbol",Ui=we,Gi=S,Ki=fn,Yi=Fo,Ji=Object,No=Yi?function(e){return typeof e=="symbol"}:function(e){var t=Ui("Symbol");return Gi(t)&&Ki(t.prototype,Ji(e))},Xi=String,yn=function(e){try{return Xi(e)}catch{return"Object"}},Zi=S,Qi=yn,el=TypeError,et=function(e){if(Zi(e))return e;throw new el(Qi(e)+" is not a function")},tl=et,nl=ie,tt=function(e,t){var n=e[t];return nl(n)?void 0:tl(n)},yt=L,ht=S,bt=D,al=TypeError,ol=function(e,t){var n,a;if(t==="string"&&ht(n=e.toString)&&!bt(a=yt(n,e))||ht(n=e.valueOf)&&!bt(a=yt(n,e))||t!=="string"&&ht(n=e.toString)&&!bt(a=yt(n,e)))return a;throw new al("Can't convert object to primitive value")},Vo={exports:{}},aa=A,rl=Object.defineProperty,hn=function(e,t){try{rl(aa,e,{value:t,configurable:!0,writable:!0})}catch{aa[e]=t}return t},il=A,ll=hn,oa="__core-js_shared__",ra=Vo.exports=il[oa]||ll(oa,{});(ra.versions||(ra.versions=[])).push({version:"3.37.1",mode:"global",copyright:"© 2014-2024 Denis Pushkarev (zloirock.ru)",license:"https://github.com/zloirock/core-js/blob/v3.37.1/LICENSE",source:"https://github.com/zloirock/core-js"});var bn=Vo.exports,ia=bn,Tn=function(e,t){return ia[e]||(ia[e]=t||{})},sl=xe,cl=Object,nt=function(e){return cl(sl(e))},ul=k,pl=nt,dl=ul({}.hasOwnProperty),z=Object.hasOwn||function(t,n){return dl(pl(t),n)},gl=k,ml=0,fl=Math.random(),vl=gl(1 .toString),xn=function(e){return"Symbol("+(e===void 0?"":e)+")_"+vl(++ml+fl,36)},yl=A,hl=Tn,la=z,bl=xn,Tl=Ho,xl=Fo,oe=yl.Symbol,Tt=hl("wks"),wl=xl?oe.for||oe:oe&&oe.withoutSetter||bl,I=function(e){return la(Tt,e)||(Tt[e]=Tl&&la(oe,e)?oe[e]:wl("Symbol."+e)),Tt[e]},$l=L,sa=D,ca=No,kl=tt,Sl=ol,Il=I,Al=TypeError,El=Il("toPrimitive"),Pl=function(e,t){if(!sa(e)||ca(e))return e;var n=kl(e,El),a;if(n){if(t===void 0&&(t="default"),a=$l(n,e,t),!sa(a)||ca(a))return a;throw new Al("Can't convert object to primitive value")}return t===void 0&&(t="number"),Sl(e,t)},Dl=Pl,ql=No,Wo=function(e){var t=Dl(e,"string");return ql(t)?t:t+""},Ol=A,ua=D,Ut=Ol.document,Ml=ua(Ut)&&ua(Ut.createElement),wn=function(e){return Ml?Ut.createElement(e):{}},Cl=O,Ll=$,Rl=wn,Uo=!Cl&&!Ll(function(){return Object.defineProperty(Rl("div"),"a",{get:function(){return 7}}).a!==7}),_l=O,zl=L,jl=Co,Bl=Qe,Hl=le,Fl=Wo,Nl=z,Vl=Uo,pa=Object.getOwnPropertyDescriptor;mn.f=_l?pa:function(t,n){if(t=Hl(t),n=Fl(n),Vl)try{return pa(t,n)}catch{}if(Nl(t,n))return Bl(!zl(jl.f,t,n),t[n])};var R={},Wl=O,Ul=$,Go=Wl&&Ul(function(){return Object.defineProperty(function(){},"prototype",{value:42,writable:!1}).prototype!==42}),Gl=D,Kl=String,Yl=TypeError,j=function(e){if(Gl(e))return e;throw new Yl(Kl(e)+" is not an object")},Jl=O,Xl=Uo,Zl=Go,De=j,da=Wo,Ql=TypeError,xt=Object.defineProperty,es=Object.getOwnPropertyDescriptor,wt="enumerable",$t="configurable",kt="writable";R.f=Jl?Zl?function(t,n,a){if(De(t),n=da(n),De(a),typeof t=="function"&&n==="prototype"&&"value"in a&&kt in a&&!a[kt]){var o=es(t,n);o&&o[kt]&&(t[n]=a.value,a={configurable:$t in a?a[$t]:o[$t],enumerable:wt in a?a[wt]:o[wt],writable:!1})}return xt(t,n,a)}:xt:function(t,n,a){if(De(t),n=da(n),De(a),Xl)try{return xt(t,n,a)}catch{}if("get"in a||"set"in a)throw new Ql("Accessors not supported");return"value"in a&&(t[n]=a.value),t};var ts=O,ns=R,as=Qe,$e=ts?function(e,t,n){return ns.f(e,t,as(1,n))}:function(e,t,n){return e[t]=n,e},Ko={exports:{}},Gt=O,os=z,Yo=Function.prototype,rs=Gt&&Object.getOwnPropertyDescriptor,$n=os(Yo,"name"),is=$n&&(function(){}).name==="something",ls=$n&&(!Gt||Gt&&rs(Yo,"name").configurable),Jo={EXISTS:$n,PROPER:is,CONFIGURABLE:ls},ss=k,cs=S,Kt=bn,us=ss(Function.toString);cs(Kt.inspectSource)||(Kt.inspectSource=function(e){return us(e)});var Xo=Kt.inspectSource,ps=A,ds=S,ga=ps.WeakMap,gs=ds(ga)&&/native code/.test(String(ga)),ms=Tn,fs=xn,ma=ms("keys"),kn=function(e){return ma[e]||(ma[e]=fs(e))},at={},vs=gs,Zo=A,ys=D,hs=$e,St=z,It=bn,bs=kn,Ts=at,fa="Object already initialized",Yt=Zo.TypeError,xs=Zo.WeakMap,We,ye,Ue,ws=function(e){return Ue(e)?ye(e):We(e,{})},$s=function(e){return function(t){var n;if(!ys(t)||(n=ye(t)).type!==e)throw new Yt("Incompatible receiver, "+e+" required");return n}};if(vs||It.state){var _=It.state||(It.state=new xs);_.get=_.get,_.has=_.has,_.set=_.set,We=function(e,t){if(_.has(e))throw new Yt(fa);return t.facade=e,_.set(e,t),t},ye=function(e){return _.get(e)||{}},Ue=function(e){return _.has(e)}}else{var Q=bs("state");Ts[Q]=!0,We=function(e,t){if(St(e,Q))throw new Yt(fa);return t.facade=e,hs(e,Q,t),t},ye=function(e){return St(e,Q)?e[Q]:{}},Ue=function(e){return St(e,Q)}}var ke={set:We,get:ye,has:Ue,enforce:ws,getterFor:$s},Sn=k,ks=$,Ss=S,qe=z,Jt=O,Is=Jo.CONFIGURABLE,As=Xo,Qo=ke,Es=Qo.enforce,Ps=Qo.get,va=String,ze=Object.defineProperty,Ds=Sn("".slice),qs=Sn("".replace),Os=Sn([].join),Ms=Jt&&!ks(function(){return ze(function(){},"length",{value:8}).length!==8}),Cs=String(String).split("String"),Ls=Ko.exports=function(e,t,n){Ds(va(t),0,7)==="Symbol("&&(t="["+qs(va(t),/^Symbol\(([^)]*)\).*$/,"$1")+"]"),n&&n.getter&&(t="get "+t),n&&n.setter&&(t="set "+t),(!qe(e,"name")||Is&&e.name!==t)&&(Jt?ze(e,"name",{value:t,configurable:!0}):e.name=t),Ms&&n&&qe(n,"arity")&&e.length!==n.arity&&ze(e,"length",{value:n.arity});try{n&&qe(n,"constructor")&&n.constructor?Jt&&ze(e,"prototype",{writable:!1}):e.prototype&&(e.prototype=void 0)}catch{}var a=Es(e);return qe(a,"source")||(a.source=Os(Cs,typeof t=="string"?t:"")),e};Function.prototype.toString=Ls(function(){return Ss(this)&&Ps(this).source||As(this)},"toString");var er=Ko.exports,Rs=S,_s=R,zs=er,js=hn,X=function(e,t,n,a){a||(a={});var o=a.enumerable,r=a.name!==void 0?a.name:t;if(Rs(n)&&zs(n,r,a),a.global)o?e[t]=n:js(t,n);else{try{a.unsafe?e[t]&&(o=!0):delete e[t]}catch{}o?e[t]=n:_s.f(e,t,{value:n,enumerable:!1,configurable:!a.nonConfigurable,writable:!a.nonWritable})}return e},ot={},Bs=Math.ceil,Hs=Math.floor,Fs=Math.trunc||function(t){var n=+t;return(n>0?Hs:Bs)(n)},Ns=Fs,rt=function(e){var t=+e;return t!==t||t===0?0:Ns(t)},Vs=rt,Ws=Math.max,Us=Math.min,Gs=function(e,t){var n=Vs(e);return n<0?Ws(n+t,0):Us(n,t)},Ks=rt,Ys=Math.min,tr=function(e){var t=Ks(e);return t>0?Ys(t,9007199254740991):0},Js=tr,In=function(e){return Js(e.length)},Xs=le,Zs=Gs,Qs=In,ya=function(e){return function(t,n,a){var o=Xs(t),r=Qs(o);if(r===0)return!e&&-1;var i=Zs(a,r),l;if(e&&n!==n){for(;r>i;)if(l=o[i++],l!==l)return!0}else for(;r>i;i++)if((e||i in o)&&o[i]===n)return e||i||0;return!e&&-1}},ec={includes:ya(!0),indexOf:ya(!1)},tc=k,At=z,nc=le,ac=ec.indexOf,oc=at,ha=tc([].push),nr=function(e,t){var n=nc(e),a=0,o=[],r;for(r in n)!At(oc,r)&&At(n,r)&&ha(o,r);for(;t.length>a;)At(n,r=t[a++])&&(~ac(o,r)||ha(o,r));return o},An=["constructor","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","toLocaleString","toString","valueOf"],rc=nr,ic=An,lc=ic.concat("length","prototype");ot.f=Object.getOwnPropertyNames||function(t){return rc(t,lc)};var ar={};ar.f=Object.getOwnPropertySymbols;var sc=we,cc=k,uc=ot,pc=ar,dc=j,gc=cc([].concat),mc=sc("Reflect","ownKeys")||function(t){var n=uc.f(dc(t)),a=pc.f;return a?gc(n,a(t)):n},ba=z,fc=mc,vc=mn,yc=R,hc=function(e,t,n){for(var a=fc(t),o=yc.f,r=vc.f,i=0;i<a.length;i++){var l=a[i];!ba(e,l)&&!(n&&ba(n,l))&&o(e,l,r(t,l))}},bc=$,Tc=S,xc=/#|\.prototype\./,Se=function(e,t){var n=$c[wc(e)];return n===Sc?!0:n===kc?!1:Tc(t)?bc(t):!!t},wc=Se.normalize=function(e){return String(e).replace(xc,".").toLowerCase()},$c=Se.data={},kc=Se.NATIVE="N",Sc=Se.POLYFILL="P",or=Se,Oe=A,Ic=mn.f,Ac=$e,Ec=X,Pc=hn,Dc=hc,qc=or,Ie=function(e,t){var n=e.target,a=e.global,o=e.stat,r,i,l,s,u,c;if(a?i=Oe:o?i=Oe[n]||Pc(n,{}):i=Oe[n]&&Oe[n].prototype,i)for(l in t){if(u=t[l],e.dontCallGetSet?(c=Ic(i,l),s=c&&c.value):s=i[l],r=qc(a?l:n+(o?".":"#")+l,e.forced),!r&&s!==void 0){if(typeof u==typeof s)continue;Dc(u,s)}(e.sham||s&&s.sham)&&Ac(u,"sham",!0),Ec(i,l,u,e)}},Oc=J,rr=Array.isArray||function(t){return Oc(t)==="Array"},Mc=TypeError,Cc=9007199254740991,Lc=function(e){if(e>Cc)throw Mc("Maximum allowed index exceeded");return e},Rc=O,_c=R,zc=Qe,jc=function(e,t,n){Rc?_c.f(e,t,zc(0,n)):e[t]=n},Bc=I,Hc=Bc("toStringTag"),ir={};ir[Hc]="z";var En=String(ir)==="[object z]",Fc=En,Nc=S,je=J,Vc=I,Wc=Vc("toStringTag"),Uc=Object,Gc=je(function(){return arguments}())==="Arguments",Kc=function(e,t){try{return e[t]}catch{}},it=Fc?je:function(e){var t,n,a;return e===void 0?"Undefined":e===null?"Null":typeof(n=Kc(t=Uc(e),Wc))=="string"?n:Gc?je(t):(a=je(t))==="Object"&&Nc(t.callee)?"Arguments":a},Yc=k,Jc=$,lr=S,Xc=it,Zc=we,Qc=Xo,sr=function(){},cr=Zc("Reflect","construct"),Pn=/^\s*(?:class|function)\b/,eu=Yc(Pn.exec),tu=!Pn.test(sr),pe=function(t){if(!lr(t))return!1;try{return cr(sr,[],t),!0}catch{return!1}},ur=function(t){if(!lr(t))return!1;switch(Xc(t)){case"AsyncFunction":case"GeneratorFunction":case"AsyncGeneratorFunction":return!1}try{return tu||!!eu(Pn,Qc(t))}catch{return!0}};ur.sham=!0;var nu=!cr||Jc(function(){var e;return pe(pe.call)||!pe(Object)||!pe(function(){e=!0})||e})?ur:pe,Ta=rr,au=nu,ou=D,ru=I,iu=ru("species"),xa=Array,lu=function(e){var t;return Ta(e)&&(t=e.constructor,au(t)&&(t===xa||Ta(t.prototype))?t=void 0:ou(t)&&(t=t[iu],t===null&&(t=void 0))),t===void 0?xa:t},su=lu,cu=function(e,t){return new(su(e))(t===0?0:t)},uu=$,pu=I,du=vn,gu=pu("species"),mu=function(e){return du>=51||!uu(function(){var t=[],n=t.constructor={};return n[gu]=function(){return{foo:1}},t[e](Boolean).foo!==1})},fu=Ie,vu=$,yu=rr,hu=D,bu=nt,Tu=In,wa=Lc,$a=jc,xu=cu,wu=mu,$u=I,ku=vn,pr=$u("isConcatSpreadable"),Su=ku>=51||!vu(function(){var e=[];return e[pr]=!1,e.concat()[0]!==e}),Iu=function(e){if(!hu(e))return!1;var t=e[pr];return t!==void 0?!!t:yu(e)},Au=!Su||!wu("concat");fu({target:"Array",proto:!0,arity:1,forced:Au},{concat:function(t){var n=bu(this),a=xu(n,0),o=0,r,i,l,s,u;for(r=-1,l=arguments.length;r<l;r++)if(u=r===-1?n:arguments[r],Iu(u))for(s=Tu(u),wa(o+s),i=0;i<s;i++,o++)i in u&&$a(a,o,u[i]);else wa(o+1),$a(a,o++,u);return a.length=o,a}});var dr={},Eu=nr,Pu=An,Du=Object.keys||function(t){return Eu(t,Pu)},qu=O,Ou=Go,Mu=R,Cu=j,Lu=le,Ru=Du;dr.f=qu&&!Ou?Object.defineProperties:function(t,n){Cu(t);for(var a=Lu(n),o=Ru(n),r=o.length,i=0,l;r>i;)Mu.f(t,l=o[i++],a[l]);return t};var _u=we,zu=_u("document","documentElement"),ju=j,Bu=dr,ka=An,Hu=at,Fu=zu,Nu=wn,Vu=kn,Sa=">",Ia="<",Xt="prototype",Zt="script",gr=Vu("IE_PROTO"),Et=function(){},mr=function(e){return Ia+Zt+Sa+e+Ia+"/"+Zt+Sa},Aa=function(e){e.write(mr("")),e.close();var t=e.parentWindow.Object;return e=null,t},Wu=function(){var e=Nu("iframe"),t="java"+Zt+":",n;return e.style.display="none",Fu.appendChild(e),e.src=String(t),n=e.contentWindow.document,n.open(),n.write(mr("document.F=Object")),n.close(),n.F},Me,Be=function(){try{Me=new ActiveXObject("htmlfile")}catch{}Be=typeof document<"u"?document.domain&&Me?Aa(Me):Wu():Aa(Me);for(var e=ka.length;e--;)delete Be[Xt][ka[e]];return Be()};Hu[gr]=!0;var lt=Object.create||function(t,n){var a;return t!==null?(Et[Xt]=ju(t),a=new Et,Et[Xt]=null,a[gr]=t):a=Be(),n===void 0?a:Bu.f(a,n)},Uu=I,Gu=lt,Ku=R.f,Qt=Uu("unscopables"),en=Array.prototype;en[Qt]===void 0&&Ku(en,Qt,{configurable:!0,value:Gu(null)});var Yu=function(e){en[Qt][e]=!0},Ae={},Ju=$,Xu=!Ju(function(){function e(){}return e.prototype.constructor=null,Object.getPrototypeOf(new e)!==e.prototype}),Zu=z,Qu=S,ep=nt,tp=kn,np=Xu,Ea=tp("IE_PROTO"),tn=Object,ap=tn.prototype,fr=np?tn.getPrototypeOf:function(e){var t=ep(e);if(Zu(t,Ea))return t[Ea];var n=t.constructor;return Qu(n)&&t instanceof n?n.prototype:t instanceof tn?ap:null},op=$,rp=S,ip=D,Pa=fr,lp=X,sp=I,nn=sp("iterator"),vr=!1,Y,Pt,Dt;[].keys&&(Dt=[].keys(),"next"in Dt?(Pt=Pa(Pa(Dt)),Pt!==Object.prototype&&(Y=Pt)):vr=!0);var cp=!ip(Y)||op(function(){var e={};return Y[nn].call(e)!==e});cp&&(Y={});rp(Y[nn])||lp(Y,nn,function(){return this});var yr={IteratorPrototype:Y,BUGGY_SAFARI_ITERATORS:vr},up=R.f,pp=z,dp=I,Da=dp("toStringTag"),st=function(e,t,n){e&&!n&&(e=e.prototype),e&&!pp(e,Da)&&up(e,Da,{configurable:!0,value:t})},gp=yr.IteratorPrototype,mp=lt,fp=Qe,vp=st,yp=Ae,hp=function(){return this},bp=function(e,t,n,a){var o=t+" Iterator";return e.prototype=mp(gp,{next:fp(+!a,n)}),vp(e,o,!1),yp[o]=hp,e},Tp=k,xp=et,wp=function(e,t,n){try{return Tp(xp(Object.getOwnPropertyDescriptor(e,t)[n]))}catch{}},$p=D,kp=function(e){return $p(e)||e===null},Sp=kp,Ip=String,Ap=TypeError,Ep=function(e){if(Sp(e))return e;throw new Ap("Can't set "+Ip(e)+" as a prototype")},Pp=wp,Dp=D,qp=xe,Op=Ep,hr=Object.setPrototypeOf||("__proto__"in{}?function(){var e=!1,t={},n;try{n=Pp(Object.prototype,"__proto__","set"),n(t,[]),e=t instanceof Array}catch{}return function(o,r){return qp(o),Op(r),Dp(o)&&(e?n(o,r):o.__proto__=r),o}}():void 0),Mp=Ie,Cp=L,br=Jo,Lp=S,Rp=bp,qa=fr,Oa=hr,_p=st,zp=$e,qt=X,jp=I,Bp=Ae,Tr=yr,Hp=br.PROPER,Fp=br.CONFIGURABLE,Ma=Tr.IteratorPrototype,Ce=Tr.BUGGY_SAFARI_ITERATORS,de=jp("iterator"),Ca="keys",ge="values",La="entries",Np=function(){return this},Dn=function(e,t,n,a,o,r,i){Rp(n,t,a);var l=function(m){if(m===o&&d)return d;if(!Ce&&m&&m in c)return c[m];switch(m){case Ca:return function(){return new n(this,m)};case ge:return function(){return new n(this,m)};case La:return function(){return new n(this,m)}}return function(){return new n(this)}},s=t+" Iterator",u=!1,c=e.prototype,p=c[de]||c["@@iterator"]||o&&c[o],d=!Ce&&p||l(o),g=t==="Array"&&c.entries||p,v,y,T;if(g&&(v=qa(g.call(new e)),v!==Object.prototype&&v.next&&(qa(v)!==Ma&&(Oa?Oa(v,Ma):Lp(v[de])||qt(v,de,Np)),_p(v,s,!0))),Hp&&o===ge&&p&&p.name!==ge&&(Fp?zp(c,"name",ge):(u=!0,d=function(){return Cp(p,this)})),o)if(y={values:l(ge),keys:r?d:l(Ca),entries:l(La)},i)for(T in y)(Ce||u||!(T in c))&&qt(c,T,y[T]);else Mp({target:t,proto:!0,forced:Ce||u},y);return c[de]!==d&&qt(c,de,d,{name:o}),Bp[t]=d,y},qn=function(e,t){return{value:e,done:t}},Vp=le,On=Yu,Ra=Ae,xr=ke,Wp=R.f,Up=Dn,Le=qn,Gp=O,wr="Array Iterator",Kp=xr.set,Yp=xr.getterFor(wr),Jp=Up(Array,"Array",function(e,t){Kp(this,{type:wr,target:Vp(e),index:0,kind:t})},function(){var e=Yp(this),t=e.target,n=e.index++;if(!t||n>=t.length)return e.target=void 0,Le(void 0,!0);switch(e.kind){case"keys":return Le(n,!1);case"values":return Le(t[n],!1)}return Le([n,t[n]],!1)},"values"),_a=Ra.Arguments=Ra.Array;On("keys");On("values");On("entries");if(Gp&&_a.name!=="values")try{Wp(_a,"name",{value:"values"})}catch{}var Xp=En,Zp=it,Qp=Xp?{}.toString:function(){return"[object "+Zp(this)+"]"},ed=En,td=X,nd=Qp;ed||td(Object.prototype,"toString",nd,{unsafe:!0});var $r={exports:{}},kr={},ad=k,od=ad([].slice),rd=J,id=le,Sr=ot.f,ld=od,Ir=typeof window=="object"&&window&&Object.getOwnPropertyNames?Object.getOwnPropertyNames(window):[],sd=function(e){try{return Sr(e)}catch{return ld(Ir)}};kr.f=function(t){return Ir&&rd(t)==="Window"?sd(t):Sr(id(t))};var cd=$,ud=cd(function(){if(typeof ArrayBuffer=="function"){var e=new ArrayBuffer(8);Object.isExtensible(e)&&Object.defineProperty(e,"a",{value:8})}}),pd=$,dd=D,gd=J,za=ud,He=Object.isExtensible,md=pd(function(){He(1)}),fd=md||za?function(t){return!dd(t)||za&&gd(t)==="ArrayBuffer"?!1:He?He(t):!0}:He,vd=$,yd=!vd(function(){return Object.isExtensible(Object.preventExtensions({}))}),hd=Ie,bd=k,Td=at,xd=D,Mn=z,wd=R.f,ja=ot,$d=kr,Cn=fd,kd=xn,Sd=yd,Ar=!1,F=kd("meta"),Id=0,Ln=function(e){wd(e,F,{value:{objectID:"O"+Id++,weakData:{}}})},Ad=function(e,t){if(!xd(e))return typeof e=="symbol"?e:(typeof e=="string"?"S":"P")+e;if(!Mn(e,F)){if(!Cn(e))return"F";if(!t)return"E";Ln(e)}return e[F].objectID},Ed=function(e,t){if(!Mn(e,F)){if(!Cn(e))return!0;if(!t)return!1;Ln(e)}return e[F].weakData},Pd=function(e){return Sd&&Ar&&Cn(e)&&!Mn(e,F)&&Ln(e),e},Dd=function(){qd.enable=function(){},Ar=!0;var e=ja.f,t=bd([].splice),n={};n[F]=1,e(n).length&&(ja.f=function(a){for(var o=e(a),r=0,i=o.length;r<i;r++)if(o[r]===F){t(o,r,1);break}return o},hd({target:"Object",stat:!0,forced:!0},{getOwnPropertyNames:$d.f}))},qd=$r.exports={enable:Dd,fastKey:Ad,getWeakData:Ed,onFreeze:Pd};Td[F]=!0;var Er=$r.exports,Od=J,Md=k,Cd=function(e){if(Od(e)==="Function")return Md(e)},Ba=Cd,Ld=et,Rd=Ze,_d=Ba(Ba.bind),Pr=function(e,t){return Ld(e),t===void 0?e:Rd?_d(e,t):function(){return e.apply(t,arguments)}},zd=I,jd=Ae,Bd=zd("iterator"),Hd=Array.prototype,Fd=function(e){return e!==void 0&&(jd.Array===e||Hd[Bd]===e)},Nd=it,Ha=tt,Vd=ie,Wd=Ae,Ud=I,Gd=Ud("iterator"),Dr=function(e){if(!Vd(e))return Ha(e,Gd)||Ha(e,"@@iterator")||Wd[Nd(e)]},Kd=L,Yd=et,Jd=j,Xd=yn,Zd=Dr,Qd=TypeError,eg=function(e,t){var n=arguments.length<2?Zd(e):t;if(Yd(n))return Jd(Kd(n,e));throw new Qd(Xd(e)+" is not iterable")},tg=L,Fa=j,ng=tt,ag=function(e,t,n){var a,o;Fa(e);try{if(a=ng(e,"return"),!a){if(t==="throw")throw n;return n}a=tg(a,e)}catch(r){o=!0,a=r}if(t==="throw")throw n;if(o)throw a;return Fa(a),n},og=Pr,rg=L,ig=j,lg=yn,sg=Fd,cg=In,Na=fn,ug=eg,pg=Dr,Va=ag,dg=TypeError,Fe=function(e,t){this.stopped=e,this.result=t},Wa=Fe.prototype,qr=function(e,t,n){var a=n&&n.that,o=!!(n&&n.AS_ENTRIES),r=!!(n&&n.IS_RECORD),i=!!(n&&n.IS_ITERATOR),l=!!(n&&n.INTERRUPTED),s=og(t,a),u,c,p,d,g,v,y,T=function(f){return u&&Va(u,"normal",f),new Fe(!0,f)},m=function(f){return o?(ig(f),l?s(f[0],f[1],T):s(f[0],f[1])):l?s(f,T):s(f)};if(r)u=e.iterator;else if(i)u=e;else{if(c=pg(e),!c)throw new dg(lg(e)+" is not iterable");if(sg(c)){for(p=0,d=cg(e);d>p;p++)if(g=m(e[p]),g&&Na(Wa,g))return g;return new Fe(!1)}u=ug(e,c)}for(v=r?e.next:u.next;!(y=rg(v,u)).done;){try{g=m(y.value)}catch(f){Va(u,"throw",f)}if(typeof g=="object"&&g&&Na(Wa,g))return g}return new Fe(!1)},gg=fn,mg=TypeError,Or=function(e,t){if(gg(t,e))return e;throw new mg("Incorrect invocation")},fg=I,Mr=fg("iterator"),Cr=!1;try{var vg=0,Ua={next:function(){return{done:!!vg++}},return:function(){Cr=!0}};Ua[Mr]=function(){return this},Array.from(Ua,function(){throw 2})}catch{}var yg=function(e,t){try{if(!t&&!Cr)return!1}catch{return!1}var n=!1;try{var a={};a[Mr]=function(){return{next:function(){return{done:n=!0}}}},e(a)}catch{}return n},hg=S,bg=D,Ga=hr,Tg=function(e,t,n){var a,o;return Ga&&hg(a=t.constructor)&&a!==n&&bg(o=a.prototype)&&o!==n.prototype&&Ga(e,o),e},xg=Ie,wg=A,$g=k,Ka=or,kg=X,Sg=Er,Ig=qr,Ag=Or,Eg=S,Pg=ie,Ot=D,Mt=$,Dg=yg,qg=st,Og=Tg,Mg=function(e,t,n){var a=e.indexOf("Map")!==-1,o=e.indexOf("Weak")!==-1,r=a?"set":"add",i=wg[e],l=i&&i.prototype,s=i,u={},c=function(m){var f=$g(l[m]);kg(l,m,m==="add"?function(b){return f(this,b===0?0:b),this}:m==="delete"?function(h){return o&&!Ot(h)?!1:f(this,h===0?0:h)}:m==="get"?function(b){return o&&!Ot(b)?void 0:f(this,b===0?0:b)}:m==="has"?function(b){return o&&!Ot(b)?!1:f(this,b===0?0:b)}:function(b,x){return f(this,b===0?0:b,x),this})},p=Ka(e,!Eg(i)||!(o||l.forEach&&!Mt(function(){new i().entries().next()})));if(p)s=n.getConstructor(t,e,a,r),Sg.enable();else if(Ka(e,!0)){var d=new s,g=d[r](o?{}:-0,1)!==d,v=Mt(function(){d.has(1)}),y=Dg(function(m){new i(m)}),T=!o&&Mt(function(){for(var m=new i,f=5;f--;)m[r](f,f);return!m.has(-0)});y||(s=t(function(m,f){Ag(m,l);var h=Og(new i,m,s);return Pg(f)||Ig(f,h[r],{that:h,AS_ENTRIES:a}),h}),s.prototype=l,l.constructor=s),(v||T)&&(c("delete"),c("has"),a&&c("get")),(T||g)&&c(r),o&&l.clear&&delete l.clear}return u[e]=s,xg({global:!0,constructor:!0,forced:s!==i},u),qg(s,e),o||n.setStrong(s,e,a),s},Ya=er,Cg=R,Lr=function(e,t,n){return n.get&&Ya(n.get,t,{getter:!0}),n.set&&Ya(n.set,t,{setter:!0}),Cg.f(e,t,n)},Lg=X,Rg=function(e,t,n){for(var a in t)Lg(e,a,t[a],n);return e},_g=we,zg=Lr,jg=I,Bg=O,Ja=jg("species"),Hg=function(e){var t=_g(e);Bg&&t&&!t[Ja]&&zg(t,Ja,{configurable:!0,get:function(){return this}})},Xa=lt,Fg=Lr,Za=Rg,Ng=Pr,Vg=Or,Wg=ie,Ug=qr,Gg=Dn,Re=qn,Kg=Hg,me=O,Qa=Er.fastKey,Rr=ke,eo=Rr.set,Ct=Rr.getterFor,Yg={getConstructor:function(e,t,n,a){var o=e(function(u,c){Vg(u,r),eo(u,{type:t,index:Xa(null),first:void 0,last:void 0,size:0}),me||(u.size=0),Wg(c)||Ug(c,u[a],{that:u,AS_ENTRIES:n})}),r=o.prototype,i=Ct(t),l=function(u,c,p){var d=i(u),g=s(u,c),v,y;return g?g.value=p:(d.last=g={index:y=Qa(c,!0),key:c,value:p,previous:v=d.last,next:void 0,removed:!1},d.first||(d.first=g),v&&(v.next=g),me?d.size++:u.size++,y!=="F"&&(d.index[y]=g)),u},s=function(u,c){var p=i(u),d=Qa(c),g;if(d!=="F")return p.index[d];for(g=p.first;g;g=g.next)if(g.key===c)return g};return Za(r,{clear:function(){for(var c=this,p=i(c),d=p.first;d;)d.removed=!0,d.previous&&(d.previous=d.previous.next=void 0),d=d.next;p.first=p.last=void 0,p.index=Xa(null),me?p.size=0:c.size=0},delete:function(u){var c=this,p=i(c),d=s(c,u);if(d){var g=d.next,v=d.previous;delete p.index[d.index],d.removed=!0,v&&(v.next=g),g&&(g.previous=v),p.first===d&&(p.first=g),p.last===d&&(p.last=v),me?p.size--:c.size--}return!!d},forEach:function(c){for(var p=i(this),d=Ng(c,arguments.length>1?arguments[1]:void 0),g;g=g?g.next:p.first;)for(d(g.value,g.key,this);g&&g.removed;)g=g.previous},has:function(c){return!!s(this,c)}}),Za(r,n?{get:function(c){var p=s(this,c);return p&&p.value},set:function(c,p){return l(this,c===0?0:c,p)}}:{add:function(c){return l(this,c=c===0?0:c,c)}}),me&&Fg(r,"size",{configurable:!0,get:function(){return i(this).size}}),o},setStrong:function(e,t,n){var a=t+" Iterator",o=Ct(t),r=Ct(a);Gg(e,t,function(i,l){eo(this,{type:a,target:i,state:o(i),kind:l,last:void 0})},function(){for(var i=r(this),l=i.kind,s=i.last;s&&s.removed;)s=s.previous;return!i.target||!(i.last=s=s?s.next:i.state.first)?(i.target=void 0,Re(void 0,!0)):Re(l==="keys"?s.key:l==="values"?s.value:[s.key,s.value],!1)},n?"entries":"values",!n,!0),Kg(t)}},Jg=Mg,Xg=Yg;Jg("Set",function(e){return function(){return e(this,arguments.length?arguments[0]:void 0)}},Xg);var Zg=it,Qg=String,ct=function(e){if(Zg(e)==="Symbol")throw new TypeError("Cannot convert a Symbol value to a string");return Qg(e)},Rn=k,em=rt,tm=ct,nm=xe,am=Rn("".charAt),to=Rn("".charCodeAt),om=Rn("".slice),no=function(e){return function(t,n){var a=tm(nm(t)),o=em(n),r=a.length,i,l;return o<0||o>=r?e?"":void 0:(i=to(a,o),i<55296||i>56319||o+1===r||(l=to(a,o+1))<56320||l>57343?e?am(a,o):i:e?om(a,o,o+2):(i-55296<<10)+(l-56320)+65536)}},_r={codeAt:no(!1),charAt:no(!0)},rm=_r.charAt,im=ct,zr=ke,lm=Dn,ao=qn,jr="String Iterator",sm=zr.set,cm=zr.getterFor(jr);lm(String,"String",function(e){sm(this,{type:jr,string:im(e),index:0})},function(){var t=cm(this),n=t.string,a=t.index,o;return a>=n.length?ao(void 0,!0):(o=rm(n,a),t.index+=o.length,ao(o,!1))});var um={CSSRuleList:0,CSSStyleDeclaration:0,CSSValueList:0,ClientRectList:0,DOMRectList:0,DOMStringList:0,DOMTokenList:1,DataTransferItemList:0,FileList:0,HTMLAllCollection:0,HTMLCollection:0,HTMLFormElement:0,HTMLSelectElement:0,MediaList:0,MimeTypeArray:0,NamedNodeMap:0,NodeList:1,PaintRequestList:0,Plugin:0,PluginArray:0,SVGLengthList:0,SVGNumberList:0,SVGPathSegList:0,SVGPointList:0,SVGStringList:0,SVGTransformList:0,SourceBufferList:0,StyleSheetList:0,TextTrackCueList:0,TextTrackList:0,TouchList:0},pm=wn,Lt=pm("span").classList,oo=Lt&&Lt.constructor&&Lt.constructor.prototype,dm=oo===Object.prototype?void 0:oo,ro=A,Br=um,gm=dm,fe=Jp,io=$e,mm=st,fm=I,Rt=fm("iterator"),_t=fe.values,Hr=function(e,t){if(e){if(e[Rt]!==_t)try{io(e,Rt,_t)}catch{e[Rt]=_t}if(mm(e,t,!0),Br[t]){for(var n in fe)if(e[n]!==fe[n])try{io(e,n,fe[n])}catch{e[n]=fe[n]}}}};for(var zt in Br)Hr(ro[zt]&&ro[zt].prototype,zt);Hr(gm,"DOMTokenList");var vm=j,ym=function(){var e=vm(this),t="";return e.hasIndices&&(t+="d"),e.global&&(t+="g"),e.ignoreCase&&(t+="i"),e.multiline&&(t+="m"),e.dotAll&&(t+="s"),e.unicode&&(t+="u"),e.unicodeSets&&(t+="v"),e.sticky&&(t+="y"),t},_n=$,hm=A,zn=hm.RegExp,jn=_n(function(){var e=zn("a","y");return e.lastIndex=2,e.exec("abcd")!==null}),bm=jn||_n(function(){return!zn("a","y").sticky}),Tm=jn||_n(function(){var e=zn("^r","gy");return e.lastIndex=2,e.exec("str")!==null}),xm={BROKEN_CARET:Tm,MISSED_STICKY:bm,UNSUPPORTED_Y:jn},wm=$,$m=A,km=$m.RegExp,Sm=wm(function(){var e=km(".","s");return!(e.dotAll&&e.test(`
`)&&e.flags==="s")}),Im=$,Am=A,Em=Am.RegExp,Pm=Im(function(){var e=Em("(?<a>b)","g");return e.exec("b").groups.a!=="b"||"b".replace(e,"$<a>c")!=="bc"}),re=L,ut=k,Dm=ct,qm=ym,Om=xm,Mm=Tn,Cm=lt,Lm=ke.get,Rm=Sm,_m=Pm,zm=Mm("native-string-replace",String.prototype.replace),Ge=RegExp.prototype.exec,an=Ge,jm=ut("".charAt),Bm=ut("".indexOf),Hm=ut("".replace),jt=ut("".slice),on=function(){var e=/a/,t=/b*/g;return re(Ge,e,"a"),re(Ge,t,"a"),e.lastIndex!==0||t.lastIndex!==0}(),Fr=Om.BROKEN_CARET,rn=/()??/.exec("")[1]!==void 0,Fm=on||rn||Fr||Rm||_m;Fm&&(an=function(t){var n=this,a=Lm(n),o=Dm(t),r=a.raw,i,l,s,u,c,p,d;if(r)return r.lastIndex=n.lastIndex,i=re(an,r,o),n.lastIndex=r.lastIndex,i;var g=a.groups,v=Fr&&n.sticky,y=re(qm,n),T=n.source,m=0,f=o;if(v&&(y=Hm(y,"y",""),Bm(y,"g")===-1&&(y+="g"),f=jt(o,n.lastIndex),n.lastIndex>0&&(!n.multiline||n.multiline&&jm(o,n.lastIndex-1)!==`
`)&&(T="(?: "+T+")",f=" "+f,m++),l=new RegExp("^(?:"+T+")",y)),rn&&(l=new RegExp("^"+T+"$(?!\\s)",y)),on&&(s=n.lastIndex),u=re(Ge,v?l:n,f),v?u?(u.input=jt(u.input,m),u[0]=jt(u[0],m),u.index=n.lastIndex,n.lastIndex+=u[0].length):n.lastIndex=0:on&&u&&(n.lastIndex=n.global?u.index+u[0].length:s),rn&&u&&u.length>1&&re(zm,u[0],l,function(){for(c=1;c<arguments.length-2;c++)arguments[c]===void 0&&(u[c]=void 0)}),u&&g)for(u.groups=p=Cm(null),c=0;c<g.length;c++)d=g[c],p[d[0]]=u[d[1]];return u});var Bn=an,Nm=Ie,lo=Bn;Nm({target:"RegExp",proto:!0,forced:/./.exec!==lo},{exec:lo});var Vm=Ze,Nr=Function.prototype,so=Nr.apply,co=Nr.call,Wm=typeof Reflect=="object"&&Reflect.apply||(Vm?co.bind(so):function(){return co.apply(so,arguments)}),uo=L,po=X,Um=Bn,go=$,Vr=I,Gm=$e,Km=Vr("species"),Bt=RegExp.prototype,Ym=function(e,t,n,a){var o=Vr(e),r=!go(function(){var u={};return u[o]=function(){return 7},""[e](u)!==7}),i=r&&!go(function(){var u=!1,c=/a/;return e==="split"&&(c={},c.constructor={},c.constructor[Km]=function(){return c},c.flags="",c[o]=/./[o]),c.exec=function(){return u=!0,null},c[o](""),!u});if(!r||!i||n){var l=/./[o],s=t(o,""[e],function(u,c,p,d,g){var v=c.exec;return v===Um||v===Bt.exec?r&&!g?{done:!0,value:uo(l,c,p,d)}:{done:!0,value:uo(u,p,c,d)}:{done:!1}});po(String.prototype,e,s[0]),po(Bt,o,s[1])}a&&Gm(Bt[o],"sham",!0)},Jm=_r.charAt,Xm=function(e,t,n){return t+(n?Jm(e,t).length:1)},Hn=k,Zm=nt,Qm=Math.floor,Ht=Hn("".charAt),ef=Hn("".replace),Ft=Hn("".slice),tf=/\$([$&'`]|\d{1,2}|<[^>]*>)/g,nf=/\$([$&'`]|\d{1,2})/g,af=function(e,t,n,a,o,r){var i=n+e.length,l=a.length,s=nf;return o!==void 0&&(o=Zm(o),s=tf),ef(r,s,function(u,c){var p;switch(Ht(c,0)){case"$":return"$";case"&":return e;case"`":return Ft(t,0,n);case"'":return Ft(t,i);case"<":p=o[Ft(c,1,-1)];break;default:var d=+c;if(d===0)return u;if(d>l){var g=Qm(d/10);return g===0?u:g<=l?a[g-1]===void 0?Ht(c,1):a[g-1]+Ht(c,1):u}p=a[d-1]}return p===void 0?"":p})},mo=L,of=j,rf=S,lf=J,sf=Bn,cf=TypeError,uf=function(e,t){var n=e.exec;if(rf(n)){var a=mo(n,e,t);return a!==null&&of(a),a}if(lf(e)==="RegExp")return mo(sf,e,t);throw new cf("RegExp#exec called on incompatible receiver")},pf=Wm,fo=L,pt=k,df=Ym,gf=$,mf=j,ff=S,vf=ie,yf=rt,hf=tr,ee=ct,bf=xe,Tf=Xm,xf=tt,wf=af,$f=uf,kf=I,ln=kf("replace"),Sf=Math.max,If=Math.min,Af=pt([].concat),Nt=pt([].push),vo=pt("".indexOf),yo=pt("".slice),Ef=function(e){return e===void 0?e:String(e)},Pf=function(){return"a".replace(/./,"$0")==="$0"}(),ho=function(){return/./[ln]?/./[ln]("a","$0")==="":!1}(),Df=!gf(function(){var e=/./;return e.exec=function(){var t=[];return t.groups={a:"7"},t},"".replace(e,"$<a>")!=="7"});df("replace",function(e,t,n){var a=ho?"$":"$0";return[function(r,i){var l=bf(this),s=vf(r)?void 0:xf(r,ln);return s?fo(s,r,l,i):fo(t,ee(l),r,i)},function(o,r){var i=mf(this),l=ee(o);if(typeof r=="string"&&vo(r,a)===-1&&vo(r,"$<")===-1){var s=n(t,i,l,r);if(s.done)return s.value}var u=ff(r);u||(r=ee(r));var c=i.global,p;c&&(p=i.unicode,i.lastIndex=0);for(var d=[],g;g=$f(i,l),!(g===null||(Nt(d,g),!c));){var v=ee(g[0]);v===""&&(i.lastIndex=Tf(l,hf(i.lastIndex),p))}for(var y="",T=0,m=0;m<d.length;m++){g=d[m];for(var f=ee(g[0]),h=Sf(If(yf(g.index),l.length),0),b=[],x,Z=1;Z<g.length;Z++)Nt(b,Ef(g[Z]));var se=g.groups;if(u){var ce=Af([f],b,h,l);se!==void 0&&Nt(ce,se),x=ee(pf(r,void 0,ce))}else x=wf(f,l,h,b,se,r);h>=T&&(y+=yo(l,T,h)+x,T=h+f.length)}return y+yo(l,T)}]},!Df||!Pf||ho);var ve;typeof window<"u"?ve=window:typeof W<"u"?ve=W:typeof self<"u"?ve=self:ve={};var qf=ve;const Wr=vi(qf);var Of=Wr.LOGLEVEL,q=Wr.console,V={trace:1,debug:2,info:3,warn:4,error:5,silent:10},Mf=Of,te=V[Mf]||V.info,he={trace:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<=V.trace&&q.trace.apply(q,[t].concat(a))},debug:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<=V.debug&&q.debug.apply(q,[t].concat(a))},info:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<=V.info&&q.info.apply(q,[t].concat(a))},warn:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<=V.warn&&q.warn.apply(q,[t].concat(a))},error:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<=V.error&&q.error.apply(q,[t].concat(a))},log:function(t){for(var n=arguments.length,a=new Array(n>1?n-1:0),o=1;o<n;o++)a[o-1]=arguments[o];return te<V.silent&&q.log.apply(q,[t].concat(a))}},sn=new Set,P=function(t){return function(n){if(!sn.has(n)){sn.add(n);for(var a=arguments.length,o=new Array(a>1?a-1:0),r=1;r<a;r++)o[r-1]=arguments[r];return he[t].apply(he,[n].concat(o))}}};P.clear=function(){return sn.clear()};P.trace=P("trace");P.debug=P("debug");P.info=P("info");P.warn=P("warn");P.error=P("error");P.log=P("log");var C=function(t){return function(){for(var n=[],a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];if(o.length){var i=/<span\s+style=(['"])([^'"]*)\1\s*>/gi,l=/<\/span>/gi,s;for(n.push(o[0].replace(i,"%c").replace(l,"%c"));s=i.exec(o[0]);)n.push(s[2]),n.push("");for(var u=1;u<o.length;u++)n.push(o[u])}he[t].apply(he,n)}};C.trace=C("trace");C.debug=C("debug");C.info=C("info");C.warn=C("warn");C.error=C("error");const Cf=Object.freeze(Object.defineProperty({__proto__:null,logger:he,once:P,pretty:C},Symbol.toStringTag,{value:"Module"})),Lf=yi(Cf);(function(e){var t=W&&W.__assign||function(){return t=Object.assign||function(m){for(var f,h=1,b=arguments.length;h<b;h++){f=arguments[h];for(var x in f)Object.prototype.hasOwnProperty.call(f,x)&&(m[x]=f[x])}return m},t.apply(this,arguments)};Object.defineProperty(e,"__esModule",{value:!0}),e.extractComponentDescription=e.extractArgTypes=e.extractArgTypesFactory=e.extractArgTypesFromElements=e.getStencilDocJson=e.setStencilDocJson=void 0;var n=Lf,a=function(m){if(!m)return!1;if(typeof m=="string")return!0;throw new Error('Provided component needs to be a string. e.g. component: "my-element"')},o=function(m){if(!m)return!1;if(m.components&&Array.isArray(m.components))return!0;throw new Error(`You need to setup valid meta data in your preview.js via setStencilDocJson().
    The meta data can be generated with the stencil output target 'docs-json'.`)},r=function(m,f){if(!a(m)||!o(f))return null;var h=f.components.find(function(b){return b.tag.toUpperCase()===m.toUpperCase()});return h||n.logger.warn("Component not found in stencil doc json: ".concat(m)),h},i=function(m){return m.values.filter(function(f){return["string","number"].includes(f.type)}).map(function(f){return f.value})},l=function(m){var f,h=null;switch(m.type){case"string":f={type:"text"};break;case"number":f={type:"number"};break;case"boolean":f={type:"boolean"};break;case"function":case"void":f=null;break;default:h=i(m),h.length===0?f={type:"object"}:h.length<5?f={type:"radio"}:f={type:"select"}}return{control:f,options:h}},s=function(m,f){var h=f.dashCase;return m&&m.reduce(function(b,x){var Z=l(x),se=Z.control,ce=Z.options,Xn=h===!0&&x.attr||x.name;return b[Xn]={name:x.attr||x.name,description:x.docs,type:{required:x.required},control:se,table:{category:"props",type:{summary:x.type},defaultValue:{summary:x.default}}},ce!==null&&(b[Xn].options=ce),b},{})},u=function(m){return m&&m.reduce(function(f,h){return f["event-".concat(h.event)]={name:h.event,description:h.docs,type:{name:"void"},control:null,table:{category:"events",type:{summary:h.detail}}},f},{})},c=function(m){return m&&m.reduce(function(f,h){return f["method-".concat(h.name)]={name:h.name,description:h.docs,type:{name:"void"},control:null,table:{category:"methods",type:{summary:h.signature}}},f},{})},p=function(m,f){return m&&m.reduce(function(h,b){var x={name:"void"};return h["".concat(f.replace(/\s/g,"-").toLowerCase(),"-").concat(b.name)]={name:b.name,required:!1,description:b.docs,control:null,type:x,table:{category:f,type:x}},h},{})},d=function(m){window.__STORYBOOK_STENCIL_DOC_JSON__=m};e.setStencilDocJson=d;var g=function(){return window.__STORYBOOK_STENCIL_DOC_JSON__};e.getStencilDocJson=g;var v=function(m,f,h){var b=r(m,f);return b&&t(t(t(t(t(t({},s(b.props,h)),u(b.events)),c(b.methods)),p(b.slots,"slots")),p(b.styles,"css custom properties")),p(b.parts,"css shadow parts"))};e.extractArgTypesFromElements=v;var y=function(m){return m===void 0&&(m={}),function(f){return(0,e.extractArgTypesFromElements)(f,(0,e.getStencilDocJson)(),t({dashCase:!1},m))}};e.extractArgTypesFactory=y,e.extractArgTypes=(0,e.extractArgTypesFactory)();var T=function(m){var f=r(m,(0,e.getStencilDocJson)());return f&&(f.readme||f.docs)};e.extractComponentDescription=T})(Ne);const{addons:Rf}=__STORYBOOK_MODULE_PREVIEW_API__,{global:bo}=__STORYBOOK_MODULE_GLOBAL__,{ImplicitActionsDuringRendering:_f}=__STORYBOOK_MODULE_CORE_EVENTS_PREVIEW_ERRORS__;var zf="actions",jf="storybook/actions",Bf=`${jf}/action-event`,cn={depth:10,clearOnStoryChange:!0,limit:50},Ur=(e,t)=>{let n=Object.getPrototypeOf(e);return!n||t(n)?n:Ur(n,t)},Hf=e=>!!(typeof e=="object"&&e&&Ur(e,t=>/^Synthetic(?:Base)?Event$/.test(t.constructor.name))&&typeof e.persist=="function"),Ff=e=>{if(Hf(e)){let t=Object.create(e.constructor.prototype,Object.getOwnPropertyDescriptors(e));t.persist();let n=Object.getOwnPropertyDescriptor(t,"view"),a=n==null?void 0:n.value;return typeof a=="object"&&(a==null?void 0:a.constructor.name)==="Window"&&Object.defineProperty(t,"view",{...n,value:Object.create(a.constructor.prototype)}),t}return e},Nf=()=>typeof crypto=="object"&&typeof crypto.getRandomValues=="function"?hi():Date.now().toString(36)+Math.random().toString(36).substring(2);function Vf(e,t={}){let n={...cn,...t},a=function(...o){var p,d;if(t.implicit){let g=(p="__STORYBOOK_PREVIEW__"in bo?bo.__STORYBOOK_PREVIEW__:void 0)==null?void 0:p.storyRenders.find(v=>v.phase==="playing"||v.phase==="rendering");if(g){let v=!((d=window==null?void 0:window.FEATURES)!=null&&d.disallowImplicitActionsInRenderV8),y=new _f({phase:g.phase,name:e,deprecated:v});if(v)console.warn(y);else throw y}}let r=Rf.getChannel(),i=Nf(),l=5,s=o.map(Ff),u=o.length>1?s:s[0],c={id:i,count:0,data:{name:e,args:u},options:{...n,maxDepth:l+(n.depth||3),allowFunction:n.allowFunction||!1}};r.emit(Bf,c)};return a.isAction=!0,a.implicit=t.implicit,a}var Wf=(...e)=>{let t=cn,n=e;n.length===1&&Array.isArray(n[0])&&([n]=n),n.length!==1&&typeof n[n.length-1]!="string"&&(t={...cn,...n.pop()});let a=n[0];(n.length!==1||typeof a=="string")&&(a={},n.forEach(r=>{a[r]=r}));let o={};return Object.keys(a).forEach(r=>{o[r]=Vf(a[r],t)}),o};const{global:Uf}=__STORYBOOK_MODULE_GLOBAL__,{makeDecorator:Gf,useEffect:Kf}=__STORYBOOK_MODULE_PREVIEW_API__;var{document:To,Element:xo}=Uf,Yf=/^(\S+)\s*(.*)$/,Jf=xo!=null&&!xo.prototype.matches,Xf=Jf?"msMatchesSelector":"matches",Gr=(e,t)=>{if(e[Xf](t))return!0;let n=e.parentElement;return n?Gr(n,t):!1},Zf=(e,...t)=>{let n=e(...t);return Object.entries(n).map(([a,o])=>{let[r,i,l]=a.match(Yf)||[];return{eventName:i,handler:s=>{(!l||Gr(s.target,l))&&o(s)}}})},Qf=(e,...t)=>{let n=To&&To.getElementById("storybook-root");Kf(()=>{if(n!=null){let a=Zf(e,...t);return a.forEach(({eventName:o,handler:r})=>n.addEventListener(o,r)),()=>a.forEach(({eventName:o,handler:r})=>n.removeEventListener(o,r))}},[n,e,t])},ev=Gf({name:"withActions",parameterName:zf,skipIfNoParametersOrOptions:!0,wrapper:(e,t,{parameters:n})=>(n!=null&&n.handles&&Qf(Wf,...n.handles),e(t))});const tv="2024-06-19T09:00:18",nv={name:"@stencil/core",version:"4.18.3",typescriptVersion:"5.4.5"},av=[{filePath:"src/components/molecules/mg-action-more/mg-action-more.tsx",encapsulation:"shadow",tag:"mg-action-more",readme:`## Anatomy

![](./doc/img/mg-action-more-anatomy.png)

## Specifications

![](./doc/img/mg-action-more-popover-spacing.png)

### Spacing

Popover padding should be 10px up/down, 0px left/right.

## Behavior

### Action

In addition of the standard popover's behavior, when an item of the menu is clicked the popover closes itself.

## Items

### Button's variant

![](./doc/img/mg-action-more-options-variant.png)

It is possible to set another variant (see [mg-button](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/atoms-mg-button--docs)).

### Icon

![](./doc/img/mg-action-more-options-icon.png)

It is possible to set another icon

### Label

![](./doc/img/mg-action-more-options-label.png)

It is possible to set another label.

### Chevron

![](./doc/img/mg-action-more-options-chevron.png)

It is possible to display a chevron on the label right side, it make a 180 degree rotation on click.
`,docs:"![](./doc/img/mg-action-more-anatomy.png)",docsTags:[],usage:{},props:[{name:"button",type:'{ label?: string; disabled?: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; isIcon: boolean; }',complexType:{original:"MgActionMoreButtonType",resolved:'{ label?: string; disabled?: boolean; variant: "flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"; isIcon: boolean; }',references:{MgActionMoreButtonType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType"}}},mutable:!1,reflectToAttr:!1,docs:"Define button properties",docsTags:[],default:"{ variant: 'flat', isIcon: true }",values:[{type:'{ label?: string; disabled?: boolean; variant: "flat"'},{value:"info",type:"string"},{value:"success",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"danger",type:"string"},{type:'"danger-alt"; isIcon: boolean; }'}],optional:!0,required:!1},{name:"displayChevron",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-chevron",reflectToAttr:!1,docs:"Define if chevron is display",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"icon",type:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',complexType:{original:"MgActionMoreIconType",resolved:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',references:{MgActionMoreIconType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType"}}},mutable:!0,reflectToAttr:!1,docs:"Define displayed icon",docsTags:[],values:[{type:'{ icon: "filter"'},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{type:'"wallet-outline"; }'}],optional:!0,required:!1},{name:"items",type:"MgActionMoreItemType[]",complexType:{original:"MgActionMoreItemType[]",resolved:"MgActionMoreItemType[]",references:{MgActionMoreItemType:{location:"import",path:"./mg-action-more.conf",id:"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType"}}},mutable:!1,reflectToAttr:!1,docs:"Define the menu-items elements",docsTags:[],values:[{type:"MgActionMoreItemType[]"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],dependencyGraph:{"mg-action-more":["mg-icon","mg-popover","mg-button","mg-menu","mg-menu-item","mg-badge"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-menu":["mg-item-more"],"mg-item-more":["mg-menu-item","mg-icon","mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"]}},{filePath:"src/components/atoms/mg-badge/mg-badge.tsx",encapsulation:"shadow",tag:"mg-badge",readme:`## Design

The badge is always placed on top of, or next to the element it is for.

The badge displays a number (can be followed by the \`+\` character) or a punctuation character.

## Specs

![](./doc/img/mg-badge-specs.png)

## Theming

![](./doc/img/mg-badge-styles.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-badge-size\`: define badge height and min-width, default: \`1.6rem\`
- \`--mg-badge-font-size\`: define badge font size, default: \`1.1rem\`
- \`--mg-badge-text-color\`: define badge color for text-color variant, default: \`--color-light\`
`,docs:"The badge is always placed on top of, or next to the element it is for.\n\nThe badge displays a number (can be followed by the `+` character) or a punctuation character.",docsTags:[],usage:{},props:[{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Badge label. Include short description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if button is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"value",type:"number | string",complexType:{original:"string | number",resolved:"number | string",references:{}},mutable:!1,attr:"value",reflectToAttr:!1,docs:"Badge value",docsTags:[],values:[{type:"number"},{type:"string"}],optional:!1,required:!0},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',complexType:{original:"BadgeVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "text-color" | "warning"',references:{BadgeVariantType:{location:"import",path:"./mg-badge.conf",id:"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define badge variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"text-color",type:"string"},{value:"warning",type:"string"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-menu-item","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-badge"],"mg-menu-item":["mg-badge"],"mg-tabs":["mg-badge"]}},{filePath:"src/components/atoms/mg-button/mg-button.tsx",encapsulation:"shadow",tag:"mg-button",readme:'## Usage\n\nA primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.\nEx: Validation, Save\n\nA tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.\n\nA button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the `disable-on-click` attribute to ensure that the button is disabled when clicked.\n\nA button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".\n\n## Specs\n\n![](./doc/img/mg-button-specs.png)\n\n## Placement\n\n![](./doc/img/mg-button-placement.png)\n\n## Theming\n\n![](./doc/img/mg-button-styles.png)\n\nFocused `mg-button` style is the one from the browser (outline).\n\n## Attributes combination: `disable-on-click` and `disabled`\n\nWhen a click is triggered, the component sets the `disabled` prop to true.\n\nTo benefit from a reactive `disabled` prop, you need to handle the `disabled-change` event.\n\nTo reset the loader after the process has completed, you need to set the `disabled` prop asynchronously.\n\n## CSS Variables\n\nIf needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:\n\n### Global\n\n- `--mg-button-border-radius`: define button border radius, default: `0.3rem`\n- `--mg-button-icon-border-radius`: define button border radius in icon mode, default: `--default-size`\n- `--mg-button-disabled-opacity`: define button opacity when disabled, default: `--mg-disabled-opacity`\n- `--mg-button-gradient`: define if button use gradient, possible values 0 (no gradient) or 1 (with gradient), default: `1`\n- `--mg-button-border-variation`: define if button has a border based on background color, possible values 0 (no border) or 1 (with border), default: `1`\n\n### Variant\n\nVariants `danger`, `danger-alt`, `info` and `success` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).\n\n#### Primary\n\n- `--mg-button-primary-color-h`: define hue color value for primary button, default: `--color-dark-h`\n- `--mg-button-primary-color-s`: define saturation color value for primary button, default: `--color-dark-s`\n- `--mg-button-primary-color-l`: define lightness color value for primary button, default: `--color-dark-l`\n- `--mg-button-primary-font-color`: define font color for primary button, default: `--color-neutral`\n\n#### Secondary\n\n- `--mg-button-secondary-color-h`: define hue color value for secondary button, default: `--color-neutral-h`\n- `--mg-button-secondary-color-s`: define saturation color value for secondary button, default: `--color-neutral-s`\n- `--mg-button-secondary-color-l`: define lightness color value for secondary button, default: `--color-neutral-l`\n- `--mg-button-secondary-font-color`: define font color for secondary button, default: `--color-dark`\n',docs:`A primary action button is, in most cases, unique on the screen, the other buttons must be displayed as "secondary", to highlight the primary action.
Ex: Validation, Save

A tooltip must be displayed on hover when the button only displays a non-explicit icon, and has no label. The tooltip must indicate the action of the button.

A button that launches a potentially long process is disabled and displays a loader for the duration of the process needs to use the \`disable-on-click\` attribute to ensure that the button is disabled when clicked.

A button with undefined type in a form will natively have a [submit type](https://developer.mozilla.org/fr/docs/Web/HTML/Element/Button#attributs) and trigger form submission. So on non-submission buttons you need to explicitely set the type attribute as "button".`,docsTags:[{name:"slot",text:"- Button content"}],usage:{},props:[{name:"disableOnClick",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disable-on-click",reflectToAttr:!1,docs:`Option to set input disable on click, in order to prevent multi-click.
Parent component have to remove the attribute 'disabled' when the process ends.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"disabled",reflectToAttr:!1,docs:"Disable button",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"form",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"form",reflectToAttr:!1,docs:`Define form id to attach button with.
If this attribute is not set, the <button> is associated with its ancestor <form> element.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"fullWidth",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"full-width",reflectToAttr:!1,docs:"Set button to full-width",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:`Define if button is round.
Used for icon button.`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`aria-label
In case button text is not explicit enough`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"type",type:'"button" | "reset" | "submit"',complexType:{original:"ButtonType",resolved:'"button" | "reset" | "submit"',references:{ButtonType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define button type",docsTags:[],values:[{value:"button",type:"string"},{value:"reset",type:"string"},{value:"submit",type:"string"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',complexType:{original:"VariantType",resolved:'"danger" | "danger-alt" | "flat" | "info" | "link" | "primary" | "secondary" | "success"',references:{VariantType:{location:"import",path:"./mg-button.conf",id:"src/components/atoms/mg-button/mg-button.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define button variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"danger-alt",type:"string"},{value:"flat",type:"string"},{value:"info",type:"string"},{value:"link",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"disabled-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgButtonElement['disabled']",resolved:"boolean",references:{HTMLMgButtonElement:{location:"global",id:"global::HTMLMgButtonElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when disabled change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Button content"}],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-input-checkbox-paginated","mg-input-password","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content"],dependencies:["mg-icon"],dependencyGraph:{"mg-button":["mg-icon"],"mg-action-more":["mg-button"],"mg-input-checkbox":["mg-button"],"mg-input-checkbox-paginated":["mg-button"],"mg-input-password":["mg-button"],"mg-message":["mg-button"],"mg-modal":["mg-button"],"mg-pagination":["mg-button"],"mg-panel":["mg-button"],"mg-popover-content":["mg-button"]}},{filePath:"src/components/atoms/mg-card/mg-card.tsx",encapsulation:"shadow",tag:"mg-card",readme:`## Specifications

### Style

![](./doc/img/mg-card-style.png)

1. Border radius: 5px
2. Background: [@color-light](./?path=/docs/style-colors--docs)
3. Border: 1px, [@color-dark](./?path=/docs/style-colors--docs) with alpha at 5%
4. Shadow: [@shadow](./?path=/docs/style-colors--docs)

### Variant on bar / on background

You can set variant color on left bar or on background of the card

Values for variant colors are:

- info
- success
- warning
- danger
- app

![](./doc/img/mg-card-variant.png)

_exemple of "app color" for the last one_

Variant applied on the left bar uses **[full colors](./?path=/docs/style-colors--docs)**

Variant applied on the background uses **[soft colors](./?path=/docs/style-colors--docs)**

### Spacing

![](./doc/img/mg-card-spacing.png)

A padding of 16px is applied around the content

### Size

![](./doc/img/mg-card-size.png)

1. Ajusting with the content
2. Ajusting with its parent (100%)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-card-padding\`: define car padding, default: \`1.6rem\`
- \`--mg-card-border-radius\`: define card border radius, default: \`0.5rem\`
- \`--mg-card-background\`: define card background, default: \`hsl(var(--color-light))\`
- \`--mg-card-border\`: define card border, default: \`0.1rem solid hsla(var(--color-dark), 5%)\`
- \`--mg-card-box-shadow\`: define card shadow, default: \`var(--box-shadow)\`
- \`--mg-card-box-overflow\`: define card overflow, default: \`unset\`
- \`--mg-card-max-width\`: define card max-width, default: \`unset\`
- \`--mg-card-min-width\`: define card min-width, default: \`unset\`
`,docs:"",docsTags:[{name:"slot",text:"- Card content"}],usage:{},props:[{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"undefined | VariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define variant prop",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1},{name:"variantStyle",type:'"bar-left" | "fill"',complexType:{original:"undefined | VariantStyleType",resolved:'"bar-left" | "fill"',references:{VariantStyleType:{location:"import",path:"./mg-card.conf",id:"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:"Define variantStyle prop",docsTags:[],values:[{value:"bar-left",type:"string"},{value:"fill",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Card content"}],parts:[],dependents:["mg-message","mg-modal","mg-panel","mg-popover-content"],dependencies:[],dependencyGraph:{"mg-message":["mg-card"],"mg-modal":["mg-card"],"mg-panel":["mg-card"],"mg-popover-content":["mg-card"]}},{filePath:"src/components/atoms/mg-character-left/mg-character-left.tsx",encapsulation:"scoped",tag:"mg-character-left",readme:`## Design

This component display the number of characters left beside the max value length: \`{{number of characters left}}/{{max value length}}\`
`,docs:"This component display the number of characters left beside the max value length: `{{number of characters left}}/{{max value length}}`",docsTags:[],usage:{},props:[{name:"characters",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"characters",reflectToAttr:!1,docs:"Sets the characters to count",docsTags:[],default:"''",values:[{type:"string"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Add maximum length",docsTags:[],values:[{type:"number"}],optional:!1,required:!0}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-text","mg-input-textarea"],dependencies:[],dependencyGraph:{"mg-input-text":["mg-character-left"],"mg-input-textarea":["mg-character-left"]}},{filePath:"src/components/molecules/mg-details/mg-details.tsx",encapsulation:"shadow",tag:"mg-details",readme:`## Properties

![](./doc/img/mg-details-components.png)

- **summary** and **details** are slots which allow html content
- **toggle** is defined by mg-icon plus a custom text
  - mg-icon _chevron-down_ is used for the close state
  - mg-icon _chevron-up_ is used for the open state

## Behavior

### Action

The complete zone including the _summary_ and the _toggle_ is clickable and toggles the state of the component.

![](./doc/img/mg-details-behavior.png)

### Position

_Toggle_ follows the _summary_ and is always on the top right.

![](./doc/img/mg-details-position.png)

### Responsive

In mobile resolution, the text of the _toggle_ is hidden

![](./doc/img/mg-details-responsive.png)

## Specs

### Spacing

![](./doc/img/mg-details-spacing.png)

### Icons

Toggle's icon is chevron-down when closed.
Toggle's icon is chevron-up when opened.

The icon is displayed in "small" size.

### Style

Toggle's text is in 'Open Sans', 13px, Regular, [@color-dark](./?path=/docs/style-colors--docs).

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-details-spacing\`: define space between summary and details, default: \`1.5rem\`
`,docs:`![](./doc/img/mg-details-components.png)

- **summary** and **details** are slots which allow html content
- **toggle** is defined by mg-icon plus a custom text
  - mg-icon _chevron-down_ is used for the close state
  - mg-icon _chevron-up_ is used for the open state`,docsTags:[],usage:{},props:[{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Define if details are diplayed",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"hideSummary",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-summary",reflectToAttr:!1,docs:"Hide summary element",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"toggleClosed",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"toggle-closed",reflectToAttr:!1,docs:"Displayed title when details are closed",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"toggleOpened",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"toggle-opened",reflectToAttr:!1,docs:"Displayed title when details are opened",docsTags:[],values:[{type:"string"}],optional:!1,required:!0}],methods:[],events:[{event:"expanded-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgDetailsElement['expanded']",resolved:"boolean",references:{HTMLMgDetailsElement:{location:"global",id:"global::HTMLMgDetailsElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when expanded change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon"],dependencyGraph:{"mg-details":["mg-icon"]}},{filePath:"src/components/atoms/mg-divider/mg-divider.tsx",encapsulation:"shadow",tag:"mg-divider",readme:`## Sizing

![](./doc/img/mg-divider-sizing.png)

Two sizes are possible:

- Regular: 120px
- Full: 100%

Rules:

- Regular is the default mode.
- In full mode it takes 100% of its parent.
- The thickness is 1px.

## Spacing

![](./doc/img/mg-divider-spacing.png)

Default margin applied on top and bottom of the divider is set to 40px.

## Color

![](./doc/img/mg-divider-color.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-divider-background-color\`: define the divider background color, default: \`hsla(var(--color-danger), 15%)\`
- \`--mg-divider-thickness\`: define the divider thickness, default: \`0.1rem\`
- \`--mg-divider-vertical-spacing\`: define the divider vertical spacing, default: \`4rem\`
`,docs:`![](./doc/img/mg-divider-sizing.png)

Two sizes are possible:

- Regular: 120px
- Full: 100%

Rules:

- Regular is the default mode.
- In full mode it takes 100% of its parent.
- The thickness is 1px.`,docsTags:[],usage:{},props:[{name:"size",type:'"full" | "regular"',complexType:{original:"'regular' | 'full'",resolved:'"full" | "regular"',references:{}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define component size",docsTags:[],default:"'regular'",values:[{value:"full",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/mg-form/mg-form.tsx",encapsulation:"shadow",tag:"mg-form",readme:`## Use

Use mg-form to build clean forms.  
The component manages:

- the spacing between inputs
- the required fileds message

## Anatomy

![](./doc/img/mg-form-anatomy.png)

1. Required field(s) message
2. Inputs zone
3. Actions zone

## Style

### Required field(s) message

![](./doc/img/mg-form-style-required-message.png)

Text is in 'Open Sans', Regular, 12px, [@color-dark](./?path=/docs/style-colors--docs)  
The "\\*" is in [@color-danger](./?path=/docs/style-colors--docs)

## Spacing

### Inputs

The \`mg-form\` component applies a 15px margin to the bottom of the slotted \`mg-input-*\` elements.
The space between the label and the input area is increased to 30px.

![](./doc/img/mg-form-spacing-inputs.png)

#### Label on top

When the \`label-on-top\` prop is used, the vertical spacing is increased to 25px.

![](./doc/img/mg-form-spacing-inputs-label-on-top.png)

## Behavior

### Required field(s) message

This message is automatically generated by the component.

- If there is only 1 input required (among other inputs)

  > Field with a \\* is required

- If there are many required inputs (among other inputs)

  > Fields with a \\* are required

- If there is only 1 input and it is required

  > The field is required

  In this case, the \\* is hidden on inputs labels.

- If all inputs are required

  > All fields are required

  In this case, the \\* is hidden on inputs labels.

## Combining \`mg-input-*\` with legacy libraries

If you are creating a form that combines \`mg-components\` inputs with inputs from one of our legacy libraries (e.g., form, ui-components, ui-components-vuejs), you can achieve consistent styling by applying the \`mg-u-form-legacy\` class to the \`mg-form\` element. This ensures that \`mg-input-*\` components behave in accordance with Bootstrap styling conventions.

\`\`\`html
<mg-form class="form-horizontal mg-u-form-legacy">
  <text-field
    label="Text field label"
    reference="reference"
    help="Text field tooltip"
  ></text-field>
  <mg-input-text
    label="Mg input text label"
    identifier="identifier"
    tooltip="Mg input text tooltip"
  ></mg-input-text>
</mg-form>
\`\`\`

## 👍 Good practices

### Enabling _submit_ button

You can disable _submit button_ until all required fields are empty.
For this, use "valid/invalid" options.

## 💥 Troubleshooting

### axe-core: \`aria-valid-attr\` error for \`aria-role\` props

#### Issue

When we run a unit test with axe-core on an \`<mg-form />\` element we can get the following error:  [\`aria-valid-attr\`](https://github.com/dequelabs/axe-core/blob/develop/doc/rule-descriptions.md).

#### Workaround

To succeed the test with the \`<mg-form />\` property \`aria-role\`, you need to bind this \`prop\` as a framework JS property, ex:
- vue: \`<mg-form :aria-role.prop="presentation"></mg-form>\`
- angular: \`<mg-form ng-prop-aria-role="presentation"></mg-form>\`
- jsx: \`<mg-form ariaRole={"presentation"}></mg-form>\`

#### Explanation

When you use JS property binding instead of HTML attribute, the component prop isn't rendered in the DOM, which results in a valid HTML DOM semantic, and succeed the test.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-form-inputs-title-width\`: Define slotted input label width, default: \`23rem\`

## Example

**Code example does not reflect all the code.**

Here we have a \`form-valid\` event listener on the \`mg-form\` to define if the "submit" button should be enable or not.  
The "Display errors" button use the \`mg-form\` \`displayError()\` method.
`,docs:`Use mg-form to build clean forms.  
The component manages:

- the spacing between inputs
- the required fileds message`,docsTags:[],usage:{},props:[{name:"ariaRole",type:'"form" | "none" | "presentation" | "search"',complexType:{original:"AriaRoleType",resolved:'"form" | "none" | "presentation" | "search"',references:{AriaRoleType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType"}}},mutable:!1,attr:"aria-role",reflectToAttr:!1,docs:"Define `<form/>` element aria role\nsee more about aria roles use case: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles",docsTags:[],values:[{value:"form",type:"string"},{value:"none",type:"string"},{value:"presentation",type:"string"},{value:"search",type:"string"}],optional:!0,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if form is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-form')",values:[{type:"string"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define form invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if slotted mg-component's label are displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if form is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"requiredMessage",type:'"default" | "hide"',complexType:{original:"RequiredMessageStatusType",resolved:'"default" | "hide"',references:{RequiredMessageStatusType:{location:"import",path:"./mg-form.conf",id:"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType"}}},mutable:!1,attr:"required-message",reflectToAttr:!1,docs:`Define when required message is display.
When it is unset, component use it internal logic to manage "required message" help text display.
When you set the prop to \`default\`, you override the component internal logique to torce it display "required message" help text.
When you set the prop to \`hide\`, it will prevent the rendering of the message in the component's DOM.
As **this element is an accessibility requirement in the view**,
you **MUST*** re-implement this message on your own and display it when your form contains required inputs.`,docsTags:[],values:[{value:"default",type:"string"},{value:"hide",type:"string"}],optional:!0,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define form valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]}],events:[{event:"form-submit",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emitted event on form submit",docsTags:[]},{event:"form-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgFormElement['valid']",resolved:"boolean",references:{HTMLMgFormElement:{location:"global",id:"global::HTMLMgFormElement"}}},cancelable:!0,composed:!0,docs:`Emitted event on form validity check
Tells if form is valid or not`,docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/atoms/mg-icon/mg-icon.tsx",encapsulation:"shadow",tag:"mg-icon",readme:`## Specifications

### Sizing

![](./doc/img/mg-icon-sizing.png) 

Sizes (px):

- small: 12x12
- regular: 16x16
- medium: 20x20
- large: 24x24
- extra-large: 32x32

### With "variant" applied

![](./doc/img/mg-icon-sizing-variant.png)

When *variant* is set a circle is put back to the icon with a width and height equal to the size of the icon multiplied by 2.
The icon is centered in it.

## Styling

### Default

![](./doc/img/mg-icon-styling-default.png)

Default color for the icon is the color used for the text.
Color: text of the page (usually [@color-dark](./?path=/docs/style-colors--docs))

### Variant style


### Variant
![](./doc/img/mg-icon-styling-iconVariant.png) 


![](./doc/img/mg-icon-styling-variant.png) 

"variant" property applies [semantic color](http://core.pages.mgdis.fr/core-ui/core-ui/storybook/?path=/docs/style-colors--docs) or "app color" to the background of the icon with Lightness set to 90% 
You can select "variant style" to apply "variant" on the icon or the background or both.

# File naming

Separator: "-" (dash).
By default, the pictograms are the "filled" version, but this doesn't need to be specified in the naming
Variant: "-outline". If pictogram variant has a background that has a full circle > add "-circle" *ex: check-circle, check-circle-outline*

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-icon-small-size\`: Define small icon size, default: \`1.2rem\`
- \`--mg-icon-regular-size\`: Define regular icon size, default: \`1.6rem\`
- \`--mg-icon-medium-size\`: Define medium icon size, default: \`2rem\`
- \`--mg-icon-large-size\`: Define large icon size, default: \`2.4rem\`
- \`--mg-icon-extra-large-size\`: Define extra large icon size, default: \`3.6rem\`
- \`--mg-icon-border-radius\`: Define icon border radiys, default: \`50%\`
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',complexType:{original:"IconType",resolved:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',references:{IconType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconType"}}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Icon to display.",docsTags:[],values:[{value:"filter",type:"string"},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{value:"wallet-outline",type:"string"}],optional:!1,required:!0},{name:"size",type:'"extra-large" | "large" | "medium" | "regular" | "small"',complexType:{original:"IconSizeType",resolved:'"extra-large" | "large" | "medium" | "regular" | "small"',references:{IconSizeType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define icon size",docsTags:[],default:"'regular'",values:[{value:"extra-large",type:"string"},{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1},{name:"spin",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"spin",reflectToAttr:!1,docs:"Make the icon spin",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"variant",type:'"app" | "danger" | "info" | "success" | "warning"',complexType:{original:"IconVariantType",resolved:'"app" | "danger" | "info" | "success" | "warning"',references:{IconVariantType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define icon variant color",docsTags:[],values:[{value:"app",type:"string"},{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!0,required:!1},{name:"variantStyle",type:'"background" | "full" | "icon"',complexType:{original:"IconVariantStyleType",resolved:'"background" | "full" | "icon"',references:{IconVariantStyleType:{location:"import",path:"./mg-icon.conf",id:"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType"}}},mutable:!0,attr:"variant-style",reflectToAttr:!1,docs:`Define icon color variant style
Add a color to the icon based on variant color with given style
'full': Used to set a circular background with variant soft color and icon variant color
'background': Used to set a circular background with variant soft color
'icon': Used to set a color only to the icon`,docsTags:[],values:[{value:"background",type:"string"},{value:"full",type:"string"},{value:"icon",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-action-more","mg-button","mg-details","mg-input","mg-input-checkbox","mg-input-checkbox-paginated","mg-input-password","mg-input-text","mg-item-more","mg-loader","mg-menu-item","mg-message","mg-modal","mg-pagination","mg-panel","mg-popover-content","mg-tabs"],dependencies:[],dependencyGraph:{"mg-action-more":["mg-icon"],"mg-button":["mg-icon"],"mg-details":["mg-icon"],"mg-input":["mg-icon"],"mg-input-checkbox":["mg-icon"],"mg-input-checkbox-paginated":["mg-icon"],"mg-input-password":["mg-icon"],"mg-input-text":["mg-icon"],"mg-item-more":["mg-icon"],"mg-loader":["mg-icon"],"mg-menu-item":["mg-icon"],"mg-message":["mg-icon"],"mg-modal":["mg-icon"],"mg-pagination":["mg-icon"],"mg-panel":["mg-icon"],"mg-popover-content":["mg-icon"],"mg-tabs":["mg-icon"]}},{filePath:"src/components/molecules/mg-illustrated-message/mg-illustrated-message.tsx",encapsulation:"shadow",tag:"mg-illustrated-message",readme:`## Specs

### Vertical

#### Anatomy

![](./doc/img/mg-illustrated-message-vertical-anatomy.png)

Component is built with:

- an illustration
- a title

Optionnally:

- one or more _details_ slot which accept HTML content (text, button...)

#### Style

- _title_: Open Sans, 20px, Regular
- All contents are centered.

#### Spacing

![](./doc/img/mg-illustrated-message-vertical-spacing.png).

30px between the bottom of the _illustration_ and top of the _title_.

20px for the top of the _details_ zone.

15px between left/right border of the screen and the component

#### Sizing

The maximum width of the component is 475px.

The maximum height of the illustration is 184px. Illustration must keep its proportionnality.
Illustration can be displayed in "small" size so its maximum height is set to 60px.

![](./doc/img/mg-illustrated-message-vertical-sizing-small.png)

### Horizontal

#### Anatomy

![](./doc/img/mg-illustrated-message-horizontal-anatomy.png)

#### Spacing

![](./doc/img/mg-illustrated-message-horizontal-spacing.png)

By default the margin is set to 40px on top and bottom. It's possible to modify this props.

![](./doc/img/mg-illustrated-message-horizontal-spacing-2.png)

Between the image and the group title/action.

#### Alignment

![](./doc/img/mg-illustrated-message-horizontal-alignment.png)

The image/illustration and the group tittle/details/action are vertically centred between them in the background.

#### Responsive

When there is not enough space the component take is default appearance.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-illustrated-message-padding-vertical\`: define component vertical padding, default: \`4rem\`
`,docs:"",docsTags:[],usage:{},props:[{name:"direction",type:'"horizontal" | "vertical"',complexType:{original:"'vertical' | 'horizontal'",resolved:'"horizontal" | "vertical"',references:{}},mutable:!1,attr:"direction",reflectToAttr:!1,docs:"Define component orientation",docsTags:[],default:"'vertical'",values:[{value:"horizontal",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"size",type:'"regular" | "small"',complexType:{original:"'regular' | 'small'",resolved:'"regular" | "small"',references:{}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define illustration size",docsTags:[],default:"'regular'",values:[{value:"regular",type:"string"},{value:"small",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/inputs/mg-input/mg-input.tsx",encapsulation:"shadow",tag:"mg-input",readme:`
## UX

### Label

- The label is located on the left of the input field.
- The text is to be right aligned.
- The label can be on one or more lines.
- The label can be positioned above the input field.

### Input help

The message displayed indicates the format expected by the input field "example: email@provider.com" or "expected format: DD/MM/YYYY (ex: 13/04/2019)"

### Message order

When the messages are displayed under the field the order is as follows:

1. input help
2. error

### Placeholder

The placeholder should not be used as an input help.  
♿ RGAA: The placeholder is not considered a valid label under the RGAA so is not subject to a contrast ratio.

### Read only

- The value is no longer editable.
- The input field no longer has a border or background.
- The value is displayed in bold.
- If there is no value entered, nothing is displayed.

### Required field

The asterisk is displayed regardless of the status of the field: input, read-only, disabled.

### Pattern

Please ensure to consider this when using regular expressions in your components.

Since mid-2023, there have been updates to the regular expressions used in native inputs. Browsers now uses the 'v' flag instead of the 'u' flag.  
Consequently, all literal characters must be escaped, and there's no longer a need to use the \`^\` and \`$\` characters to indicate the start and end of the string.

For exemple this RegExp working using the 'u' flag \`^[\\d ()+]*$\` should be converted to the corresponding 'v' flag \`[\\d\\s\\(\\)\\+]\` on our components. You can get more info on the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/pattern#overview).

If needed, this library has been identified for converting regular expressions: [regexpu-core](https://www.npmjs.com/package/regexpu-core).

## Specs

### Positioning of "i" icon

![](./doc/img/mg-input-tooltip-position.png)

By default, the "i" icon is positioned next to the input field.

You can position it next to the label by using the \`tooltip-placement\` prop with the value \`label\`.

When \`label-on-top\` is enabled, the "i" icon moves next to the label, overriding the \`tooltip-placement\` setting.

When the \`label-hide\` prop is enabled, the "i" icon moves next to the input, overriding the \`tooltip-placement\` setting.

### Value positioning

By default, the value is left aligned, you can change the CSS variable \`--mg-inputs-text-align\` to right align.

### Responsive

![](./doc/img/mg-input-responsive.png)

When the viewport width is less than 768px, the label is stacked above the input field.

If you are creating a form that combines mg-components inputs with inputs from one of our legacy libraries (such as form, ui-components, ui-components-vuejs), please refer to [this section on mg-form](.?path=/docs/molecules-mg-form--docs#combining-mg-input--with-legacy-libraries).

### Errors

Input field border and error message text are in [@color-danger](./?path=/docs/style-colors--docs).  
Error message background is a variant of [@color-danger](./?path=/docs/style-colors--docs) : #FEF6F6 or HSL (357,80%,98%).

## Behavior

### Errors

Error is triggered and displayed when we leave the input field.

When we enter in an input field with an error its state is checked everytime the user update its content, when the error is fixed the message disapears.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-inputs-text-align\`: Define input text alignement, numeric input default is \`right\`, others inputs default is \`left\`
- \`--mg-inputs-border-width\`: Define input border witdh, default: \`0.1rem\`
- \`--mg-inputs-border-radius\`: Define input border radius, default: \`0.3rem\`
- \`--mg-inputs-color\`: Define input border an placeholder color, default: \`#b5c2c9\`
- \`--mg-inputs-spacer\`: Define input space between label, input, tooltip, etc., default: \`1rem\`
- \`--mg-inputs-error-bg-color\`: Define input error message backround color, default: \`var(--color-danger-h), calc(var(--color-danger-s) + 5%), calc(var(--color-danger-l) + 49%)\`
- \`--mg-inputs-color-shadow-focus-hsl\`: Define input shadow when focused, default: \`188, 100%, 50%\`
- \`--mg-inputs-title-width\`: Define input label width, default: \`23rem\`
- \`--mg-inputs-margin-bottom\`: Define input bottom margin, default: \`1.5rem\`
- \`--mg-inputs-title-horizontal-space\`: Define space between label and input when inside a \`mg-form\`, default: \`3rem\`


If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-inputs-text-align\`: Define input text alignement, numeric input default is \`right\`, others inputs default is \`left\`
- \`--mg-inputs-border-width\`: Define input border witdh, default: \`0.1rem\`
- \`--mg-inputs-border-radius\`: Define input border radius, default: \`0.3rem\`
- \`--mg-inputs-color\`: Define input border an placeholder color, default: \`#b5c2c9\`
- \`--mg-inputs-spacer\`: Define input space between label, input, tooltip, etc., default: \`1rem\`
- \`--mg-inputs-error-bg-color\`: Define input error message backround color, default: \`var(--color-danger-h), calc(var(--color-danger-s) + 5%), calc(var(--color-danger-l) + 49%)\`
- \`--mg-inputs-color-shadow-focus-hsl\`: Define input shadow when focused, default: \`188, 100%, 50%\`
- \`--mg-inputs-title-width\`: Define input label width, default: \`23rem\`
- \`--mg-inputs-margin-bottom\`: Define input bottom margin, default: \`1.5rem\`
- \`--mg-inputs-title-horizontal-space\`: Define space between label and input when inside a \`mg-form\`, default: \`3rem\`
`,docs:"",docsTags:[{name:"slot",text:"- Input content"},{name:"slot",text:"label - Label content"},{name:"slot",text:"help-text - Help text content"},{name:"slot",text:"error - error content"}],usage:{},props:[{name:"ariaDescribedbyIDs",type:"string[]",complexType:{original:"string[]",resolved:"string[]",references:{}},mutable:!1,reflectToAttr:!1,docs:"Define aria-describedby ids to link with",docsTags:[],values:[{type:"string[]"}],optional:!1,required:!1},{name:"errorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"error-message",reflectToAttr:!1,docs:"Define error message to display",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Define help text to display",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Define input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"readonlyValue",type:"string | string[]",complexType:{original:"string | string[]",resolved:"string | string[]",references:{}},mutable:!1,attr:"readonly-value",reflectToAttr:!1,docs:"Defines value to display in readonly mode",docsTags:[],values:[{type:"string"},{type:"string[]"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"./mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Input content"},{name:"error",docs:"error content"},{name:"help-text",docs:"Help text content"},{name:"label",docs:"Label content"}],parts:[],dependents:["mg-input-checkbox","mg-input-date","mg-input-numeric","mg-input-password","mg-input-radio","mg-input-select","mg-input-text","mg-input-textarea","mg-input-toggle"],dependencies:["mg-tooltip","mg-icon","mg-input-title"],dependencyGraph:{"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-input"],"mg-input-date":["mg-input"],"mg-input-numeric":["mg-input"],"mg-input-password":["mg-input"],"mg-input-radio":["mg-input"],"mg-input-select":["mg-input"],"mg-input-text":["mg-input"],"mg-input-textarea":["mg-input"],"mg-input-toggle":["mg-input"]}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.tsx",encapsulation:"shadow",tag:"mg-input-checkbox",readme:`## Usage

True/False value notion.
Only 2 possible values.

### Theming

The style of the active checkbox is the browser's style.

## Specs

![](./doc/img/mg-input-checkbox-specs.png)

## Type "multi"

### Anatomy

![](./doc/img/mg-input-checkbox-multi-anatomy.png)

1. Button
  - variant: secondary
  - icon: list
2. Button
  - variant: link
3. Popover
4. Checkbox
5. Details
6. Search
7. Pagination

### Type "multi" with sections

![](./doc/img/mg-input-checkbox-multi-section.png)

#### Spacings

![](./doc/img/mg-input-checkbox-multi-section-button-spacing.png)

"Select all" and "Unselect all" buttons are aligned on left. 

![](./doc/img/mg-input-checkbox-multi-section-internal-spacing.png)

![](./doc/img/mg-input-checkbox-multi-section-spacing.png)


### Displayed values

![](./doc/img/mg-input-checkbox-display-values.png)

#### Without values

If the space is too narrow the text button will do a line break.

#### With values

If the space is too narrow the button and values will do a line break.

The component is ajusting with the space available. If the width is not enought big the values will do a breakline.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-check-size\`: Define checkbox size, default: \`1.3rem\`

## Warning

Please be aware that this component has a known issue ([#139](https://gitlab.mgdis.fr/core/core-ui/mg-components/-/issues/139)) **when used with the Vue2 framework**. It is essential that your project loads the [mg-model directive](http://core.pages.mgdis.fr/core-back/core/docs/mg-components-helpers/mg-model-vue) and that the component uses it.
`,docs:`True/False value notion.
Only 2 possible values.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displaySelectedValues",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-selected-values",reflectToAttr:!1,docs:`Display selected values list in "multi" type
This prop is only applied with prop type "multi" or when an "unset" mode render a "multi" type.`,docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Define input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Define input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if mg-input-checkbox is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"checkbox" | "multi"',complexType:{original:"CheckboxType",resolved:'"checkbox" | "multi"',references:{CheckboxType:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType"}}},mutable:!0,attr:"type",reflectToAttr:!1,docs:`Define checkbox type
When it's undefined the type is dynamic:
- With 0-5 items type is 'checkbox'
- With 5-10 items type is 'multi'
When it set the type is locked to the defined value.
When type is dynamic OR with 'multi' type AND Over 10 items "search" feature is enabled`,docsTags:[],values:[{value:"checkbox",type:"string"},{value:"multi",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"CheckboxValue[]",complexType:{original:"CheckboxValue[]",resolved:"CheckboxValue[]",references:{CheckboxValue:{location:"import",path:"./mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue"}}},mutable:!0,reflectToAttr:!1,docs:"Component value\nIf item.value is `null`, checkbox will be indeterminate by default",docsTags:[],values:[{type:"CheckboxValue[]"}],optional:!1,required:!0}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputCheckbox['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputCheckbox:{location:"global",id:"global::MgInputCheckbox"}},return:"Promise<void>"},signature:"setError(valid: MgInputCheckbox['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-input"],dependencyGraph:{"mg-input-checkbox":["mg-input-checkbox-paginated","mg-popover","mg-button","mg-icon","mg-input-text","mg-input"],"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-input-text":["mg-input","mg-icon","mg-character-left"]}},{filePath:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox-paginated/mg-input-checkbox-paginated.tsx",encapsulation:"scoped",tag:"mg-input-checkbox-paginated",readme:`# mg-input-checkbox-paginated


`,docs:"Internal component use to manage sections instances",docsTags:[],usage:{},props:[{name:"checkboxes",type:"CheckboxItem[]",complexType:{original:"CheckboxItem[]",resolved:"CheckboxItem[]",references:{CheckboxItem:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem"}}},mutable:!1,reflectToAttr:!1,docs:"Define checkboxes to paginate",docsTags:[],default:"[]",values:[{type:"CheckboxItem[]"}],optional:!1,required:!1},{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!1,docs:"Current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is disabled",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"invalid",reflectToAttr:!1,docs:"Define mg-input-checkbox input invalid",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"messages",type:"{ [x: string]: string; }",complexType:{original:"Record<string, string>",resolved:"{ [x: string]: string; }",references:{Record:{location:"global",id:"global::Record"}}},mutable:!1,reflectToAttr:!1,docs:"Define component message",docsTags:[],values:[{type:"{ [x: string]: string; }"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:"Define mg-input-checkbox input name",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if mg-input-checkbox-list is readonly",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"sectionKind",type:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",complexType:{original:"SectionKind",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{SectionKind:{location:"import",path:"../mg-input-checkbox.conf",id:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind"}}},mutable:!1,attr:"section-kind",reflectToAttr:!1,docs:"Define section kind",docsTags:[],values:[{type:"SectionKind.NOT_SELECTED"},{type:"SectionKind.SELECTED"}],optional:!0,required:!1}],methods:[],events:[{event:"mass-action",detail:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxPaginatedElement['sectionKind']",resolved:"SectionKind.NOT_SELECTED | SectionKind.SELECTED",references:{HTMLMgInputCheckboxPaginatedElement:{location:"global",id:"global::HTMLMgInputCheckboxPaginatedElement"}}},cancelable:!0,composed:!0,docs:`Emit 'mass-action' event
used to informe that select-all/unselect-all button listner is triggered`,docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox"],dependencies:["mg-button","mg-icon","mg-tooltip","mg-pagination"],dependencyGraph:{"mg-input-checkbox-paginated":["mg-button","mg-icon","mg-tooltip","mg-pagination"],"mg-button":["mg-icon"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-input-checkbox":["mg-input-checkbox-paginated"]}},{filePath:"src/components/molecules/inputs/mg-input-date/mg-input-date.tsx",encapsulation:"shadow",tag:"mg-input-date",readme:`## Behavior

The behavior is the native behavior of the browser.

### Theming

Calendar and trigger: The style is the browser's native style.
`,docs:"The behavior is the native behavior of the browser.",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example\nAvailable string variables:\n - `{pattern}`: render innerHTML pattern based on system\n - `{date}`: render innerText date with a pattern base format.\n - `{defaultHelpText}`: render default `helpText` usefull to concat helpText local with your custom text.\nex: `Input use {pattern} pattern` as `helpText` prop value will be render as `Input use mm/dd/yyyy pattern`",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"max",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:`Define input maximum date
format: yyyy-mm-dd`,docsTags:[],default:"'9999-12-31'",values:[{type:"string"}],optional:!0,required:!1},{name:"min",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:`Define input minimum date
format: yyyy-mm-dd`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputDate['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputDate:{location:"global",id:"global::MgInputDate"}},return:"Promise<void>"},signature:"setError(valid: MgInputDate['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['valid']",resolved:"boolean",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputDateElement['value']",resolved:"string",references:{HTMLMgInputDateElement:{location:"global",id:"global::HTMLMgInputDateElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-date":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.tsx",encapsulation:"shadow",tag:"mg-input-numeric",readme:`## Usage

An amount field is a numeric field.  
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.  
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.

## Specs

### Positioning

By default, the value is right aligned.

![](./doc/img/mg-input-numeric-positioning-default.png)

You can change the CSS variable \`--mg-inputs-text-align\` to left align.

![](./doc/img/mg-input-numeric-positioning-custom.png)

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.

### Unit positioning

![](./doc/img/mg-input-numeric-unit.png)

Unit term must be placed into the field slot using a "space" character before the unit term.
`,docs:`An amount field is a numeric field.  
By default it is limited to 16 characters (including comma).

It is not possible to enter characters other than numbers, "," or ".".

Rounding is to two digits after the decimal point.  
It is not possible to enter more than two digits after the decimal point.

It is possible to specify a unit after the field for integers and decimals. For currencies, the symbol is positioned in the input field.`,docsTags:[{name:"slot",text:"append-input - Content to display next to the input"}],usage:{},props:[{name:"currency",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"currency",reflectToAttr:!1,docs:"Define currency",docsTags:[],default:"'USD'",values:[{type:"string"}],optional:!1,required:!1},{name:"decimalLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"decimal-length",reflectToAttr:!1,docs:`Override decimal length
decimal is the number after the decimal point`,docsTags:[],default:"2",values:[{type:"number"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"format",type:'"currency" | "none" | "number"',complexType:{original:"Format",resolved:'"currency" | "none" | "number"',references:{Format:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format"}}},mutable:!0,attr:"format",reflectToAttr:!1,docs:"Set local formatting.\nNumbers are formatted based on the locale.\nWhen type is set to `currency`, formatting has no effect.",docsTags:[],default:"'number'",values:[{value:"currency",type:"string"},{value:"none",type:"string"},{value:"number",type:"string"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"integerLength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"integer-length",reflectToAttr:!1,docs:`Override integer length
integer is the number before the decimal point`,docsTags:[],default:"13",values:[{type:"number"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"max",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"max",reflectToAttr:!1,docs:"Maximum value",docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!0,required:!1},{name:"min",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"min",reflectToAttr:!1,docs:"Minimum value",docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"currency" | "decimal" | "integer"',complexType:{original:"NumericType",resolved:'"currency" | "decimal" | "integer"',references:{NumericType:{location:"import",path:"./mg-input-numeric.conf",id:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Define numeric type",docsTags:[],default:"'decimal'",values:[{value:"currency",type:"string"},{value:"decimal",type:"string"},{value:"integer",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input pattern to validate",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputNumeric['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputNumeric:{location:"global",id:"global::MgInputNumeric"}},return:"Promise<void>"},signature:"setError(valid: MgInputNumeric['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputNumericElement['valid']",resolved:"boolean",references:{HTMLMgInputNumericElement:{location:"global",id:"global::HTMLMgInputNumericElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"append-input",docs:"Content to display next to the input"}],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-numeric":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-password/mg-input-password.tsx",encapsulation:"shadow",tag:"mg-input-password",readme:`## Design

The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).
`,docs:'The standard display of "bullets" instead of characters is the standard one (depending on the rendering of the used browser).',docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputPassword['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputPassword:{location:"global",id:"global::MgInputPassword"}},return:"Promise<void>"},signature:"setError(valid: MgInputPassword['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['valid']",resolved:"boolean",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputPasswordElement['value']",resolved:"string",references:{HTMLMgInputPasswordElement:{location:"global",id:"global::HTMLMgInputPasswordElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input","mg-button","mg-icon"],dependencyGraph:{"mg-input-password":["mg-input","mg-button","mg-icon"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.tsx",encapsulation:"shadow",tag:"mg-input-radio",readme:`## Usage

- Always used in a group with minimum 2 options
- Only one selected option is possible from all the options in the group
- The label option is clickable and selects the option
- The group can be initialized without any default value

### Theming

The style of the active radio button is that of the browser.

## Specs

![](./doc/img/mg-input-radio-specs.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-check-size\`: Define radio input size, default: \`1.3rem\`
`,docs:`- Always used in a group with minimum 2 options
- Only one selected option is possible from all the options in the group
- The label option is clickable and selects the option
- The group can be initialized without any default value`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"inputVerticalList",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"input-vertical-list",reflectToAttr:!1,docs:"Define if inputs are display verticaly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"RadioOption[] | string[]",complexType:{original:"string[] | RadioOption[]",resolved:"RadioOption[] | string[]",references:{RadioOption:{location:"import",path:"./mg-input-radio.conf",id:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"RadioOption[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputRadio['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputRadio:{location:"global",id:"global::MgInputRadio"}},return:"Promise<void>"},signature:"setError(valid: MgInputRadio['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['valid']",resolved:"boolean",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputRadioElement['value']",resolved:"any",references:{HTMLMgInputRadioElement:{location:"global",id:"global::HTMLMgInputRadioElement"}}},cancelable:!0,composed:!0,docs:"Emitted event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-radio":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/inputs/mg-input-select/mg-input-select.tsx",encapsulation:"shadow",tag:"mg-input-select",readme:`## Design

The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.

### Sizing

The width of the component is defined by the largest option of the options.
`,docs:`The placeholder of the list is "Select a value".

The behavior, style and position of the chevron on the right of the field are those of the native browser.  
The spacing between the text and the chevron is at least 10px.`,docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"(string | SelectOption)[]",complexType:{original:"(string | SelectOption)[]",resolved:"(string | SelectOption)[]",references:{SelectOption:{location:"import",path:"./mg-input-select.conf",id:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"(string"},{type:"SelectOption)[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!0,docs:"Define input width",docsTags:[],values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"placeholderDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-disabled",reflectToAttr:!1,docs:"Option to disable placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"placeholderHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"placeholder-hide",reflectToAttr:!1,docs:"Option to remove placeholder",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputSelect['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputSelect:{location:"global",id:"global::MgInputSelect"}},return:"Promise<void>"},signature:"setError(valid: MgInputSelect['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['valid']",resolved:"boolean",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"CheckboxValue[]",bubbles:!0,complexType:{original:"HTMLMgInputCheckboxElement['value']",resolved:"CheckboxValue[]",references:{HTMLMgInputCheckboxElement:{location:"global",id:"global::HTMLMgInputCheckboxElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-pagination"],dependencies:["mg-input"],dependencyGraph:{"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-pagination":["mg-input-select"]}},{filePath:"src/components/molecules/inputs/mg-input-text/mg-input-text.tsx",encapsulation:"shadow",tag:"mg-input-text",readme:`## Design

### Indication of the number of characters left

- when the focus is on the input field, the \`mg-character-left\` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 400 alpha numeric characters

#### Font

![](./doc/img/mg-input-text-fonts.png)

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity: 0.6

#### Spacing

![](./doc/img/mg-input-text-spacing.png)

#### Position

![](./doc/img/mg-input-text-position.png)

Position: center

## Use as \`search\` input

Due to [accessibility recommendation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/Input/search#search_form_labels_and_accessibility), an \`<input type="search" />\` must be used within a \`<form role="search" />\` we recommend using mg-input-text as in dedicated story.

The "search" role can only be used when the input field is the main website search field.

## Display a \`datalist\`

The \`datalist\` behavior is set with \`datalistoptions\` prop to initalize options list.

## Slot

The spacing between the field and the slot content is not managed by the component, it must be defined in slot implementation.
`,docs:"",docsTags:[{name:"slot",text:"append-input - Content to display next to the input"}],usage:{},props:[{name:"datalistoptions",type:"string[]",complexType:{original:"string[]",resolved:"string[]",references:{}},mutable:!1,reflectToAttr:!1,docs:"Define datalist options",docsTags:[],values:[{type:"string[]"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"icon",type:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',complexType:{original:"IconType",resolved:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',references:{IconType:{location:"import",path:"../../../../components",id:"src/components.d.ts::IconType"}}},mutable:!1,attr:"icon",reflectToAttr:!1,docs:"Input icon",docsTags:[],values:[{value:"filter",type:"string"},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{value:"wallet-outline",type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"400",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"type",type:'"search" | "text"',complexType:{original:"TextType",resolved:'"search" | "text"',references:{TextType:{location:"import",path:"./mg-input-text.conf",id:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType"}}},mutable:!1,attr:"type",reflectToAttr:!1,docs:"Input type",docsTags:[],default:"'text'",values:[{value:"search",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputText['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputText:{location:"global",id:"global::MgInputText"}},return:"Promise<void>"},signature:"setError(valid: MgInputText['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]},{name:"setFocus",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setFocus() => Promise<void>",parameters:[],docs:"Public method to play input focus",docsTags:[]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['valid']",resolved:"boolean",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextElement['value']",resolved:"string",references:{HTMLMgInputTextElement:{location:"global",id:"global::HTMLMgInputTextElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"append-input",docs:"Content to display next to the input"}],parts:[],dependents:["mg-input-checkbox","mg-panel"],dependencies:["mg-input","mg-icon","mg-character-left"],dependencyGraph:{"mg-input-text":["mg-input","mg-icon","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox":["mg-input-text"],"mg-panel":["mg-input-text"]}},{filePath:"src/components/molecules/inputs/mg-input-textarea/mg-input-textarea.tsx",encapsulation:"shadow",tag:"mg-input-textarea",readme:`## Design

### Indication of the number of characters left

- when the focus is on the input field, the \`mg-character-left\` component is displayed
- when the focus is no longer on the input field, the message disappears
- by default limited to 4000 alpha numeric characters

#### Font

Open Sans, regular, 11px  
Color: [@color-dark](./?path=/docs/style-colors--docs), opacity: 0.6

#### Spacing

![](./doc/img/mg-input-textarea-spacing.png)

### Dimensions

- the height of the component is by default 3 lines of text (this value is configurable)
- by default, the input field cannot be resized
`,docs:"",docsTags:[],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"displayCharacterLeft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"display-character-left",reflectToAttr:!1,docs:"Define if component should display character left",docsTags:[],default:"true",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"invalid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"invalid",reflectToAttr:!1,docs:"Define input invalid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"maxlength",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"maxlength",reflectToAttr:!1,docs:"Input max length",docsTags:[],default:"4000",values:[{type:"number"}],optional:!1,required:!1},{name:"mgWidth",type:'"full" | 16 | 2 | 4',complexType:{original:"Width",resolved:'"full" | 16 | 2 | 4',references:{Width:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width"}}},mutable:!1,attr:"mg-width",reflectToAttr:!1,docs:"Define input width",docsTags:[],default:"'full'",values:[{value:"full",type:"string"},{value:"16",type:"number"},{value:"2",type:"number"},{value:"4",type:"number"}],optional:!1,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"pattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern",reflectToAttr:!1,docs:`Define input pattern to validate
Please refer to the Pattern section in the input documentation for detailed information on using regular expressions in components.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"patternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"pattern-error-message",reflectToAttr:!1,docs:"Define input pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"placeholder",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"placeholder",reflectToAttr:!1,docs:`Input placeholder.
It should be a word or short phrase that demonstrates the expected type of data, not a replacement for labels or help text.`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"Define if input is required",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"resizable",type:'"both" | "horizontal" | "none" | "vertical"',complexType:{original:"'none' | 'both' | 'horizontal' | 'vertical'",resolved:'"both" | "horizontal" | "none" | "vertical"',references:{}},mutable:!1,attr:"resizable",reflectToAttr:!1,docs:"Define if input is resizable",docsTags:[],default:"'none'",values:[{value:"both",type:"string"},{value:"horizontal",type:"string"},{value:"none",type:"string"},{value:"vertical",type:"string"}],optional:!1,required:!1},{name:"rows",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"rows",reflectToAttr:!1,docs:"Define the number of visible text lines for the control",docsTags:[],default:"3",values:[{type:"number"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"valid",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"valid",reflectToAttr:!1,docs:"Define input valid state",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"value",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"value",reflectToAttr:!0,docs:"Component value",docsTags:[],values:[{type:"string"}],optional:!1,required:!1}],methods:[{name:"displayError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"() => Promise<void>",parameters:[],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"displayError() => Promise<void>",parameters:[],docs:"Display input error if it exists.",docsTags:[]},{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: MgInputTextarea['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"},MgInputTextarea:{location:"global",id:"global::MgInputTextarea"}},return:"Promise<void>"},signature:"setError(valid: MgInputTextarea['valid'], errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['valid']",resolved:"boolean",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgInputTextareaElement['value']",resolved:"string",references:{HTMLMgInputTextareaElement:{location:"global",id:"global::HTMLMgInputTextareaElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-input","mg-character-left"],dependencyGraph:{"mg-input-textarea":["mg-input","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/atoms/mg-input-title/mg-input-title.tsx",encapsulation:"scoped",tag:"mg-input-title",readme:`## Design

### Label

The label can be on more than one line.

### Styles

![](./doc/img/mg-input-title.png)
`,docs:"",docsTags:[{name:"slot",text:"- Title content"}],usage:{},props:[{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Label input id",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isLegend",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-legend",reflectToAttr:!1,docs:"Switch from label to fieldset sementic",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"required",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"required",reflectToAttr:!1,docs:"If input is required an asterisk is added at the end of the label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Title content"}],parts:[],dependents:["mg-input"],dependencies:[],dependencyGraph:{"mg-input":["mg-input-title"]}},{filePath:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.tsx",encapsulation:"shadow",tag:"mg-input-toggle",readme:`## Usage

Clicking anywhere on the entire component area toggles the selected value.

The first value is always selected by default.

When the "on/off" property is used, the first value is always the disabled value and the style is adjusted.

The values must be transcribed by texts or icons.

### Types

![](./doc/img/mg-input-toggle-use.png)

### Specs

![](./doc/img/mg-input-toggle-specs.png)

### Readonly

![](./doc/img/mg-input-toggle-readonly.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-input-toggle-border-radius-ratio\`: Define input border radius ration, default: \`2\`
`,docs:`Clicking anywhere on the entire component area toggles the selected value.

The first value is always selected by default.

When the "on/off" property is used, the first value is always the disabled value and the style is adjusted.

The values must be transcribed by texts or icons.`,docsTags:[{name:"slot",text:"item-1 - Left option toggle content"},{name:"slot",text:"item-2 - Right option toggle content"}],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Define if input is disabled",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"helpText",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"help-text",reflectToAttr:!1,docs:"Add a help text under the input, usually expected data format and example",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used for the element ID (id is a reserved prop in Stencil.js)",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"isIcon",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-icon",reflectToAttr:!1,docs:"Define if toggle display icon",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"isOnOff",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"is-on-off",reflectToAttr:!1,docs:"Define if toggle have on/off style",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"items",type:"ToggleValue[] | string[]",complexType:{original:"string[] | ToggleValue[]",resolved:"ToggleValue[] | string[]",references:{ToggleValue:{location:"import",path:"./mg-input-toggle.conf",id:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue"}}},mutable:!1,reflectToAttr:!1,docs:"Items are the possible options to select",docsTags:[],values:[{type:"ToggleValue[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:"Input label",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"labelHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-hide",reflectToAttr:!1,docs:"Define if label is visible",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"labelOnTop",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"label-on-top",reflectToAttr:!1,docs:"Define if label is displayed on top",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"name",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"name",reflectToAttr:!1,docs:`Input name
If not set the value equals the identifier`,docsTags:[],default:"this.identifier",values:[{type:"string"}],optional:!1,required:!1},{name:"readonly",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"readonly",reflectToAttr:!1,docs:"Define if input is readonly",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"tooltip",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"tooltip",reflectToAttr:!1,docs:"Add a tooltip message next to the input",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"tooltipPosition",type:'"input" | "label"',complexType:{original:"TooltipPosition",resolved:'"input" | "label"',references:{TooltipPosition:{location:"import",path:"../mg-input/mg-input.conf",id:"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition"}}},mutable:!1,attr:"tooltip-position",reflectToAttr:!1,docs:"Define tooltip position",docsTags:[],default:"'input'",values:[{value:"input",type:"string"},{value:"label",type:"string"}],optional:!1,required:!1},{name:"value",type:"any",complexType:{original:"any",resolved:"any",references:{}},mutable:!0,attr:"value",reflectToAttr:!1,docs:"Component value",docsTags:[],values:[{type:"any"}],optional:!1,required:!1}],methods:[{name:"setError",returns:{type:"Promise<void>",docs:""},complexType:{signature:"(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],references:{Promise:{location:"global",id:"global::Promise"}},return:"Promise<void>"},signature:"setError(valid: boolean, errorMessage: string) => Promise<void>",parameters:[{name:"valid",type:"boolean",docs:"- value indicating the validity"},{name:"errorMessage",type:"string",docs:"- the error message to display"}],docs:"Set an error and display a custom error message.\nThis method can be used to set the component's error state from its context by passing a boolean value to the `valid` parameter.\nIt must be paired with an error message to display for the given context.\nWhen used to set validity to `false`, you should use this method again to reset the validity to `true`.",docsTags:[{name:"param",text:"valid - value indicating the validity"},{name:"param",text:"errorMessage - the error message to display"}]}],events:[{event:"input-valid",detail:"boolean",bubbles:!0,complexType:{original:"boolean",resolved:"boolean",references:{}},cancelable:!0,composed:!0,docs:"Emited event when checking validity",docsTags:[]},{event:"value-change",detail:"any",bubbles:!0,complexType:{original:"HTMLMgInputToggleElement['value']",resolved:"any",references:{HTMLMgInputToggleElement:{location:"global",id:"global::HTMLMgInputToggleElement"}}},cancelable:!0,composed:!0,docs:"Emited event when value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"item-1",docs:"Left option toggle content"},{name:"item-2",docs:"Right option toggle content"}],parts:[],dependents:[],dependencies:["mg-input"],dependencyGraph:{"mg-input-toggle":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-item-more/mg-item-more.tsx",encapsulation:"shadow",tag:"mg-item-more",readme:`# mg-item-more
`,docs:"",docsTags:[],usage:{},props:[{name:"icon",type:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',complexType:{original:"IconType",resolved:'{ icon: "filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"; }',references:{IconType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType"}}},mutable:!1,reflectToAttr:!1,docs:"Define icon",docsTags:[],default:"{ icon: 'ellipsis-vertical' }",values:[{type:'{ icon: "filter"'},{value:"copy",type:"string"},{value:"link",type:"string"},{value:"picture",type:"string"},{value:"table",type:"string"},{value:"circle",type:"string"},{value:"download",type:"string"},{value:"history",type:"string"},{value:"location",type:"string"},{value:"key",type:"string"},{value:"loader",type:"string"},{value:"address-card",type:"string"},{value:"align-center",type:"string"},{value:"align-justify",type:"string"},{value:"align-left",type:"string"},{value:"align-right",type:"string"},{value:"api",type:"string"},{value:"archive",type:"string"},{value:"archive-outline",type:"string"},{value:"arrow-clock",type:"string"},{value:"arrow-down",type:"string"},{value:"arrow-down-a-z",type:"string"},{value:"arrow-down-right",type:"string"},{value:"arrow-left",type:"string"},{value:"arrow-right",type:"string"},{value:"arrow-rotate",type:"string"},{value:"arrow-rotate-backward",type:"string"},{value:"arrow-up",type:"string"},{value:"arrow-up-right",type:"string"},{value:"arrow-up-right-square",type:"string"},{value:"arrow-up-z-a",type:"string"},{value:"arrows-compare",type:"string"},{value:"arrows-right-down",type:"string"},{value:"arrows-right-left",type:"string"},{value:"arrows-rotate",type:"string"},{value:"arrows-rotate-backward",type:"string"},{value:"ban",type:"string"},{value:"bell",type:"string"},{value:"bell-outline",type:"string"},{value:"book",type:"string"},{value:"book-outline",type:"string"},{value:"briefcase",type:"string"},{value:"briefcase-outline",type:"string"},{value:"building-outline",type:"string"},{value:"calculator",type:"string"},{value:"calendar",type:"string"},{value:"calendar-euro",type:"string"},{value:"calendar-euro-outline",type:"string"},{value:"calendar-outline",type:"string"},{value:"check",type:"string"},{value:"check-circle",type:"string"},{value:"check-circle-outline",type:"string"},{value:"chevron-down",type:"string"},{value:"chevron-down-circle",type:"string"},{value:"chevron-left",type:"string"},{value:"chevron-left-circle",type:"string"},{value:"chevron-right",type:"string"},{value:"chevron-right-circle",type:"string"},{value:"chevron-up",type:"string"},{value:"chevron-up-circle",type:"string"},{value:"clock",type:"string"},{value:"clock-outline",type:"string"},{value:"code-square-outline",type:"string"},{value:"cog",type:"string"},{value:"cog-outline",type:"string"},{value:"comment",type:"string"},{value:"comment-outline",type:"string"},{value:"comment-sms",type:"string"},{value:"conversation",type:"string"},{value:"conversation-outline",type:"string"},{value:"copy-file",type:"string"},{value:"copy-file-outline",type:"string"},{value:"copy-outline",type:"string"},{value:"credit-card",type:"string"},{value:"cross",type:"string"},{value:"cross-circle",type:"string"},{value:"cross-circle-outline",type:"string"},{value:"dashboard",type:"string"},{value:"dashboard-outline",type:"string"},{value:"earth",type:"string"},{value:"earth-outline",type:"string"},{value:"ellipsis",type:"string"},{value:"ellipsis-vertical",type:"string"},{value:"euro",type:"string"},{value:"euro-circle",type:"string"},{value:"exclamation-circle",type:"string"},{value:"exclamation-circle-outline",type:"string"},{value:"exclamation-stamp",type:"string"},{value:"exclamation-triangle",type:"string"},{value:"exclamation-triangle-outline",type:"string"},{value:"eye",type:"string"},{value:"eye-slash",type:"string"},{value:"fax",type:"string"},{value:"fax-outline",type:"string"},{value:"file",type:"string"},{value:"file-cog",type:"string"},{value:"file-download",type:"string"},{value:"file-excel",type:"string"},{value:"file-excel-outline",type:"string"},{value:"file-outline",type:"string"},{value:"file-pdf",type:"string"},{value:"file-pdf-outline",type:"string"},{value:"file-text",type:"string"},{value:"file-text-outline",type:"string"},{value:"file-upload",type:"string"},{value:"file-word",type:"string"},{value:"file-word-outline",type:"string"},{value:"filter-outline",type:"string"},{value:"floppy-disk",type:"string"},{value:"floppy-disk-outline",type:"string"},{value:"folder",type:"string"},{value:"folder-check",type:"string"},{value:"folder-check-outline",type:"string"},{value:"folder-lines",type:"string"},{value:"folder-lines-outline",type:"string"},{value:"folder-link",type:"string"},{value:"folder-link-outline",type:"string"},{value:"folder-outline",type:"string"},{value:"folder-star",type:"string"},{value:"folders",type:"string"},{value:"folders-outline",type:"string"},{value:"gavel",type:"string"},{value:"gavel-outline",type:"string"},{value:"graduation-cap",type:"string"},{value:"graduation-cap-outline",type:"string"},{value:"hand-up",type:"string"},{value:"home",type:"string"},{value:"home-outline",type:"string"},{value:"info-circle",type:"string"},{value:"info-circle-outline",type:"string"},{value:"interrogation-circle",type:"string"},{value:"interrogation-circle-outline",type:"string"},{value:"laptop",type:"string"},{value:"life-ring",type:"string"},{value:"lines-rectangle",type:"string"},{value:"lines-rectangle-outline",type:"string"},{value:"list",type:"string"},{value:"location-outline",type:"string"},{value:"lock",type:"string"},{value:"lock-outline",type:"string"},{value:"log-in",type:"string"},{value:"log-out",type:"string"},{value:"magnifying-glass",type:"string"},{value:"mail",type:"string"},{value:"mail-outline",type:"string"},{value:"messages-square",type:"string"},{value:"messages-square-outline",type:"string"},{value:"mobile",type:"string"},{value:"mobile-outline",type:"string"},{value:"notes",type:"string"},{value:"notes-outline",type:"string"},{value:"paper-plane",type:"string"},{value:"paper-plane-slash",type:"string"},{value:"paperclip",type:"string"},{value:"pen",type:"string"},{value:"pen-circle",type:"string"},{value:"pen-fancy",type:"string"},{value:"pen-fancy-files-outline",type:"string"},{value:"pen-fancy-outline",type:"string"},{value:"pen-outline",type:"string"},{value:"phone",type:"string"},{value:"phone-outline",type:"string"},{value:"picture-outline",type:"string"},{value:"play-circle",type:"string"},{value:"plus",type:"string"},{value:"plus-circle",type:"string"},{value:"question-circle",type:"string"},{value:"share",type:"string"},{value:"share-outline",type:"string"},{value:"shuffle",type:"string"},{value:"sitemap",type:"string"},{value:"sliders",type:"string"},{value:"sliders-outline",type:"string"},{value:"squares",type:"string"},{value:"star",type:"string"},{value:"star-outline",type:"string"},{value:"tag",type:"string"},{value:"tags",type:"string"},{value:"thumb-down",type:"string"},{value:"thumb-down-outline",type:"string"},{value:"thumb-up",type:"string"},{value:"thumb-up-outline",type:"string"},{value:"thumbtack",type:"string"},{value:"thumbtack-outline",type:"string"},{value:"trash",type:"string"},{value:"trash-outline",type:"string"},{value:"universal-access",type:"string"},{value:"unlink",type:"string"},{value:"unlock",type:"string"},{value:"unlock-outline",type:"string"},{value:"upload",type:"string"},{value:"user",type:"string"},{value:"user-circle",type:"string"},{value:"user-group",type:"string"},{value:"user-lock",type:"string"},{value:"user-outline",type:"string"},{value:"user-pen-fancy-outline",type:"string"},{value:"user-plus",type:"string"},{value:"user-question-outline",type:"string"},{value:"user-shield-outline",type:"string"},{value:"users",type:"string"},{value:"users-outline",type:"string"},{value:"wallet",type:"string"},{type:'"wallet-outline"; }'}],optional:!0,required:!1},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "medium" | "regular"',references:{SizeType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define component child menu size.",docsTags:[],values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!0,required:!1},{name:"slotlabel",type:"{ label?: string; display?: boolean; }",complexType:{original:"SlotLabelType",resolved:"{ label?: string; display?: boolean; }",references:{SlotLabelType:{location:"import",path:"./mg-item-more.conf",id:"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType"}}},mutable:!1,reflectToAttr:!1,docs:"Define slot label element",docsTags:[],default:"{ display: false }",values:[{type:"{ label?: string; display?: boolean; }"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-menu"],dependencies:["mg-menu-item","mg-icon","mg-menu"],dependencyGraph:{"mg-item-more":["mg-menu-item","mg-icon","mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-menu":["mg-item-more"]}},{filePath:"src/components/molecules/mg-loader/mg-loader.tsx",encapsulation:"shadow",tag:"mg-loader",readme:`## Behavior

![](./doc/img/mg-loader-anatomy.png)

The default loader message is "Loading in progress..." and can be overridden with the \`message\` prop.

The loader message can be hidden using the \`messageHide\` prop.
`,docs:'![](./doc/img/mg-loader-anatomy.png)\n\nThe default loader message is "Loading in progress..." and can be overridden with the `message` prop.\n\nThe loader message can be hidden using the `messageHide` prop.',docsTags:[],usage:{},props:[{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Override loader message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"messageHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"message-hide",reflectToAttr:!1,docs:"Hide message",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-icon"],dependencyGraph:{"mg-loader":["mg-icon"]}},{filePath:"src/components/molecules/menu/mg-menu/mg-menu.tsx",encapsulation:"shadow",tag:"mg-menu",readme:`## Horizontal

### Use

![](./doc/img/mg-menu-horizontal-exemple.png)

Horizontal menu is used with large ("desktop") resolutions, it is placed in the upper area of the screen.

### Anatomy

![](./doc/img/mg-menu-horizontal-anatomy.png)

![](./doc/img/mg-menu-horizontal-item-anatomy.png)

### Behavior

#### Sizing

![](./doc/img/mg-menu-horizontal-sizing.png)

A horizontal menu can display different item sizes: regular, medium, large.

![](./doc/img/mg-menu-horizontal-sizing-itemmaxwidth.png)

The content of the element determines its width, but to handle the case where the content is too large (long label), it is possible to specify a maximum width for the element._Label_ and _Meta_ are then truncated.

#### Sub-content

![](./doc/img/mg-menu-horizontal-subcontent-submenu.png)

![](./doc/img/mg-menu-horizontal-subcontent-slot.png)

A "submenu" or a "free content" can be set to the item.
An icon "chevron-down" at the right of the item informs the user.

##### Badge

![](./doc/img/mg-menu-horizontal-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./doc/img/mg-menu-horizontal-plus.png)

When not all items can be displayed due to the width of the menu container, the items are grouped into a "plus item".

## Vertical

### Use

![](./doc/img/mg-menu-vertical-use.png)

The horizontal menu is used with large resolutions ("desktop"), it is mainly placed in the left area of the screen.

### Anatomy

![](./doc/img/mg-menu-vertical-anatomy.png)

![](./doc/img/mg-menu-vertical-item-anatomy.png)

### Behavior

#### Sub content

An item can display a sub content which can be another vertical menu.
This item displays a chevron to its right.
The submenu is displayed by clicking on the item.

##### Badge

![](./doc/img/mg-menu-vertical-subcontent-badge.png)

If at least one sub-item has a badge, the item displays a badge with an exclamation symbol.

#### Overflow

![](./doc/img/mg-menu-vertical-scroll.png)

When not all items can be displayed due to the height of the menu container, a scroll bar helps to see hidden items.

**🔺child mg-menu-item slots image / information**

With a mg-badge/mg-tag/mg-icon, **you must set the component using HTML attributes** instead, because the behavior uses the [cloneNode](https://developer.mozilla.org/fr/docs/Web/API/Node/cloneNode) method which breaks properties.

## CSS Variables

### global

- \`--mg-menu-background-color-hsl\`: define mg-menu background color. Default: \`--color-light\`.
`,docs:"",docsTags:[{name:"slot",text:"- Menu content"}],usage:{},props:[{name:"direction",type:"Direction.HORIZONTAL | Direction.VERTICAL",complexType:{original:"Direction",resolved:"Direction.HORIZONTAL | Direction.VERTICAL",references:{Direction:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction"}}},mutable:!1,attr:"direction",reflectToAttr:!0,docs:"Component display direction.",docsTags:[],default:"Direction.HORIZONTAL",values:[{type:"Direction.HORIZONTAL"},{type:"Direction.VERTICAL"}],optional:!1,required:!1},{name:"itemmore",type:'{ size?: "regular" | "medium" | "large"; icon?: IconType; slotlabel?: SlotLabelType; }',complexType:{original:"ItemMoreType",resolved:'{ size?: "regular" | "medium" | "large"; icon?: IconType; slotlabel?: SlotLabelType; }',references:{ItemMoreType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType"}}},mutable:!1,reflectToAttr:!1,docs:`Customize "mg-item-more" element
Used with direction: 'vertical' to manage overflow`,docsTags:[],values:[{type:'{ size?: "regular"'},{value:"medium",type:"string"},{type:'"large"; icon?: IconType; slotlabel?: SlotLabelType; }'}],optional:!0,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Menu label. Include short menu description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "medium" | "regular"',complexType:{original:"MenuSizeType",resolved:'"large" | "medium" | "regular"',references:{MenuSizeType:{location:"import",path:"./mg-menu.conf",id:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define mg-menu size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"medium",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Menu content"}],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:["mg-item-more"],dependencyGraph:{"mg-menu":["mg-item-more"],"mg-item-more":["mg-menu"],"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-menu"]}},{filePath:"src/components/molecules/menu/mg-menu-item/mg-menu-item.tsx",encapsulation:"shadow",tag:"mg-menu-item",readme:`## Use

Item menu is used with horizontal or vertical menus.

## Anatomy

![](./doc/img/mg-menu-item-anatomy.png)

An item must have a label.
An icon can be added before the text.
A badge can be added after the text.
When a submenu is available, a chevron is displayed (in horizontal and vertical menus) to indicate its presence.

## Specs

Item's display depends on the size of the menu (regular, medium, large) and its mode (horizontal, vertical).

### Spacing

![](./doc/img/mg-menu-item-spacing.png)

### Sizing

#### Horizontal menu

![](./doc/img/mg-menu-item-sizing-horizontal.png)

Width of the item depends on its content.

![](./doc/img/mg-menu-item-sizing-maxwidth.png)

If a max-width is set, the _label_ and the _meta_ use an ellipsis to truncate the content if necessary.

#### Vertical menu

![](./doc/img/mg-menu-item-sizing-vertical.png)

Width of the item is 100% width of the menu.

### Alignment

#### Horizontal and vertical menus

![](./doc/img/mg-menu-item-alignment.png)

All contents are aligned vertically.

#### Vertical menu

![](./doc/img/mg-menu-item-alignment-vertical.png)

All items are aligned to left.
The chevron is aligned to the right of the item.

### Styling

![](./doc/img/mg-menu-item-horizontal-menu-styling.png)

![](./doc/img/mg-menu-item-vertical-menu-styling.png)

Hover item: the background is colored
Active item: the font color changes, an active bar (3px) is displayed at the bottom of the item for horizontal, at the left of the item for vertical menus.

#### Colors

Standard color is @color-dark.
Active color is the color of the app.
Hover color is the color of the app with an opacity set to 10%.
Disabled item's opacity is set to 40%.

#### Fonts

Family: Open Sans
Regular size: 13px
Medium/Large size: 15px

#### Icons

Regular/Medium/Large menus: regular size

## Behavior

### Click

Click on an item of the menu can:

- redirect to a url
- display child content (see below)

If child content is available, an icon "chevron-down" is displayed at the right of the item.
When opening the child content, the chevron makes a 180° rotation.
When closing the child content, the chevron returns to position 0°.

## Child content

### Horizontal and vertical menus

Child content is displayed

- by clicking on the item
- by pressing the space or enter key

It is closed

- by clicking on the item
- by pressing the space or enter key
- by clicking outside of the child content if the menu is horizontal

The child content can be:

- another horizontal or vertical menu with sub items
- a slot for HTML content

#### In an horizontal menu

![](./doc/img/mg-menu-submenu-alignment.png)

Child content is displayed in a floating component over the content (like a popover).
It is aligned to the left bottom of the item, excepted for the last item of the menu which is aligned to the right bottom.

If the floating component is higher than the screen size, there is no overflow, user has to scroll the page.

![](./doc/img/mg-menu-item-child-styling.png)

The floating component has a _@color-light_ background and a _@shadow_.

![](./doc/img/mg-menu-item-child-menu-spacing.png)

If the floating component displays a submenu, there are top and bottom spacing of 10px.

![](./doc/img/mg-menu-item-child-slot-spacing.png)

If the floating component displays a slot, there is no spacing.

![](./doc/img/mg-menu-submenu-slot.png)

The minimal width of the submenu is the item's width.
Width of the submenu is determined by the width of the largest item or the content of the slot.

#### In a vertical menu

![](./doc/img/mg-menu-submenu-vertical-menu.png)

Menu is displayed under the item, with the same width. **(i) Vertical menu is recommended if you display a submenu.**
Idem for the slot.
There is no space to display child content.
Items below are pushed to bottom.

##### Spacing

Sub-items add to their left spacing the spacing between left border and content of their parent's item.

## Slots

### Image

Recommanded element is an icon or a SVG.

### Information

Recommanded element is a mg-badge. Use it when you need to notify new events in this section.

## CSS Variables

### global

- \`--mg-menu-item-focused-background-color-hsl\`: define mg-menu-item focused background color. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-border-color-active-hsl\`: define mg-menu-item border color. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-color-hsl\`: define mg-menu-item font color. default: \`--mg-color-dark\`.
- \`--mg-menu-item-color-active-hsl\`: define mg-menu-item font color active. default: \`--mg-color-app-hsl\`.
- \`--mg-menu-item-navigation-button-column-gap\`: define mg-menu-item button column gap. default: \`unset\`.
- \`--mg-c-menu-item-chevron-display\`: override chevron display.

### navigation-button

- \`--mg-menu-item-navigation-button-max-width\`: define mg-menu-item button max-width. Useful to apply \`text-overflow: ellipsis;\` on \`mg-menu-item__navigation-button-text\` element. default: \`unset\`.
`,docs:"Item menu is used with horizontal or vertical menus.",docsTags:[{name:"slot",text:"- Menu item content"},{name:"slot",text:"image - Menu item image content"},{name:"slot",text:"label - Menu item label content"},{name:"slot",text:"information - Menu item information content"},{name:"slot",text:"metadata - Menu item metadata content"}],usage:{},props:[{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Define menu-item content expanded.",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!0,required:!1},{name:"href",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"href",reflectToAttr:!1,docs:`Define menu-item href
when defined menu-item contain an anchor instead of button`,docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Identifier is used to control mg-popover",docsTags:[],default:"createID('mg-menu-item')",values:[{type:"string"}],optional:!1,required:!1},{name:"status",type:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",complexType:{original:"Status",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{Status:{location:"import",path:"./mg-menu-item.conf",id:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status"}}},mutable:!0,attr:"status",reflectToAttr:!0,docs:"Define menu-item status.",docsTags:[],default:"Status.VISIBLE",values:[{type:"Status.ACTIVE"},{type:"Status.DISABLED"},{type:"Status.HIDDEN"},{type:"Status.VISIBLE"}],optional:!0,required:!1},{name:"target",type:'"_blank" | "_parent" | "_self" | "_top"',complexType:{original:"TargetType",resolved:'"_blank" | "_parent" | "_self" | "_top"',references:{TargetType:{location:"import",path:"./mg-menu-item.conf",id:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::TargetType"}}},mutable:!1,attr:"target",reflectToAttr:!1,docs:"Define target type",docsTags:[],values:[{value:"_blank",type:"string"},{value:"_parent",type:"string"},{value:"_self",type:"string"},{value:"_top",type:"string"}],optional:!0,required:!1}],methods:[],events:[{event:"item-loaded",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when item is loaded",docsTags:[]},{event:"item-updated",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when item is updated",docsTags:[]},{event:"status-change",detail:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",bubbles:!0,complexType:{original:"HTMLMgMenuItemElement['status']",resolved:"Status.ACTIVE | Status.DISABLED | Status.HIDDEN | Status.VISIBLE",references:{HTMLMgMenuItemElement:{location:"global",id:"global::HTMLMgMenuItemElement"}}},cancelable:!0,composed:!0,docs:"Emited event when status change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Menu item content"},{name:"image",docs:"Menu item image content"},{name:"information",docs:"Menu item information content"},{name:"label",docs:"Menu item label content"},{name:"metadata",docs:"Menu item metadata content"}],parts:[],dependents:["mg-action-more","mg-item-more"],dependencies:["mg-badge","mg-icon","mg-popover"],dependencyGraph:{"mg-menu-item":["mg-badge","mg-icon","mg-popover"],"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-menu-item"],"mg-item-more":["mg-menu-item"]}},{filePath:"src/components/molecules/mg-message/mg-message.tsx",encapsulation:"shadow",tag:"mg-message",readme:`## Usage

### Types

The element can be of four different types depending on the message to be indicated:

- validation (green)
- information (blue)
- warning (orange)
- error (red)

When a trigger (button...) is set up, it can trigger the display of a message. By default, the execution of the trigger erases the previous messages in the screen of the same type.

## Specs

![](./doc/img/mg-message-specs.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-message-border-radius\`: Define message border radius, default: \`0.3rem\`

Please note that the mg-message component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-message. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-message to your design.
`,docs:"",docsTags:[],usage:{},props:[{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"close-button",reflectToAttr:!1,docs:`Define if message has a cross button
RG 01: https://jira.mgdis.fr/browse/PDA9-140`,docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"delay",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"delay",reflectToAttr:!1,docs:`Add a delay to hide/close message when it passed
Value is defined in seconds and must greater than 2 seconds (PDA9-314 RG-06)`,docsTags:[],values:[{type:"number"}],optional:!0,required:!1},{name:"hide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"hide",reflectToAttr:!1,docs:"Define if message is hidden",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-message')",values:[{type:"string"}],optional:!1,required:!1},{name:"noAriaRole",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"no-aria-role",reflectToAttr:!1,docs:"Define if aria role is unset\nFor a11y reasons, `<mg-message />` was design for `alert` needs with attached semantic role: `status`, `alert`.\nBy toggle this props to `true`, you can unset the role to benefit from the template without any semantic role.\nBe careful to set the mode according to the context needs.",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "info" | "success" | "warning"',complexType:{original:"VariantType",resolved:'"danger" | "info" | "success" | "warning"',references:{VariantType:{location:"import",path:"./mg-message.conf",id:"src/components/molecules/mg-message/mg-message.conf.ts::VariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Message variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"component-hide",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is hidden",docsTags:[]},{event:"component-show",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emited event when message is diplayed",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-card","mg-icon","mg-button"],dependencyGraph:{"mg-message":["mg-card","mg-icon","mg-button"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-modal/mg-modal.tsx",encapsulation:"shadow",tag:"mg-modal",readme:`## Anatomy

A modal has:

- a closing cross at the top right corner
- a title
- a body composed of fields or a message
- a validation button
- a cancel button

## Behavior

When clicking on the cross, the cancel button or the \`<Escape>\` key is pressed the modal closes and no processing is done.

When the validation button is clicked, processing is performed and the modal closes.

As long as the user does not press one of these three buttons, the modal does not close.

The modal allows focusing the attention on what it is asking: a confirmation or a cancellation.  
In this sense the rest of the screen should not be accessible:

- it is hidden by a backdrop
- clicking on the backdrop does not close the modal

The title of the modal has a written name.
Ex: Add value

The wording of the validation button is the infinitive verb of the current action.  
Avoid the verb "Validate" if a more explicit one is possible.  
Ex: "Add" for adding a value, "Delete" to delete a value, "Modify" to modify a value.

### Icon or not icon on the action buttons ?

In the case of a targeted action, the icon can help to understand or even reassure > check icon that validates the action.

In the case of a confirmation/cancellation choice: not necessary or even superfluous > the term "Save/Cancel" is enough.

Ex: if I put a check in front of the term "Delete" which is the validation button of a deletion, the check refers to positive while the action of deletion is negative, and the Cancel button also, so not to add to the confusion, do not put an icon...

## Specs

### Shapes

![](./doc/img/mg-modal-shapes.png)

### Fonts

![](./doc/img/mg-modal-fonts.png)

### Spacing

#### Spacing between edges and content

![](./doc/img/mg-modal-spaces-borders.png)

#### Spacing between title, text and buttons

![](./doc/img/mg-modal-spaces-slot.png)
![](./doc/img/mg-modal-spaces-slot-title.png)

#### Spacing between the title and the cross button

![](./doc/img/mg-modal-spaces-title.png)
![](./doc/img/mg-modal-spaces-title-multiline.png)

### Alignments

![](./doc/img/mg-modal-alignments.png)

### Sizes

![](./doc/img/mg-modal-sizes.png)

### Colors

![](./doc/img/mg-modal-colors.png)

### Backdrop

Color: [@color-light](./?path=/docs/style-colors--docs) with an opacity set to 85%.

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-modal-border-radius\`: Define border radius modal, default: \`0.5rem\`
- \`--mg-modal-title-font-size\`: Define modal title font size, default: \`1.8rem\`
- \`--mg-modal-content-font-size\`: Define modall content font size, default: \`1.2rem\`

Please note that the mg-modal component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-modal. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-modal to your design.
`,docs:`A modal has:

- a closing cross at the top right corner
- a title
- a body composed of fields or a message
- a validation button
- a cancel button`,docsTags:[],usage:{},props:[{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if modal has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"dialogRole",type:'"alertdialog" | "dialog"',complexType:{original:"DialogRoleType",resolved:'"alertdialog" | "dialog"',references:{DialogRoleType:{location:"import",path:"./mg-modal.conf",id:"src/components/molecules/mg-modal/mg-modal.conf.ts::DialogRoleType"}}},mutable:!1,attr:"dialog-role",reflectToAttr:!1,docs:"Modal dialog role.",docsTags:[],default:"dialogRoles[0]",values:[{value:"alertdialog",type:"string"},{value:"dialog",type:"string"}],optional:!1,required:!1},{name:"hide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"hide",reflectToAttr:!1,docs:"Define if modal is hidden",docsTags:[],values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-modal')",values:[{type:"string"}],optional:!1,required:!1},{name:"modalTitle",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"modal-title",reflectToAttr:!1,docs:"Displayed modal title",docsTags:[],values:[{type:"string"}],optional:!1,required:!0}],methods:[],events:[{event:"component-hide",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when modal is hidden",docsTags:[]},{event:"component-show",detail:"void",bubbles:!0,complexType:{original:"void",resolved:"void",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when modal is diplayed",docsTags:[]}],listeners:[{event:"keydown",target:"window",capture:!1,passive:!1}],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-card","mg-button","mg-icon"],dependencyGraph:{"mg-modal":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"]}},{filePath:"src/components/molecules/mg-pagination/mg-pagination.tsx",encapsulation:"shadow",tag:"mg-pagination",readme:`## Anatomy

![](./doc/img/mg-pagination-nav-anatomy.png)

## Specs

![](./doc/img/mg-pagination-nav-specs.png)

It's possible to hide the labels "prev" and "next" to show only the "chevron" icons

![](./doc/img/mg-pagination-nav-label-hide.png)

It's possible to hide the page count to show only the "chevron" icons

![](./doc/img/mg-pagination-nav-select-hide.png)

## When to use it ?

A pagination component should be displayed only when it is useful, for example:

When the number of pages is greater than 1.
When there are elements to be displayed.
`,docs:"![](./doc/img/mg-pagination-nav-anatomy.png)",docsTags:[],usage:{},props:[{name:"currentPage",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"current-page",reflectToAttr:!0,docs:"Component current page",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1},{name:"hideNavigationLabels",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-navigation-labels",reflectToAttr:!1,docs:"Hide navigation label",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"hidePageCount",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"hide-page-count",reflectToAttr:!1,docs:"Hide select input",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-pagination')",values:[{type:"string"}],optional:!1,required:!1},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"label",reflectToAttr:!1,docs:`Panignation label. Is a short description.
Customize default value can be usefull to improve accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!1},{name:"totalPages",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!1,attr:"total-pages",reflectToAttr:!1,docs:"Component total pages",docsTags:[],default:"1",values:[{type:"number"}],optional:!1,required:!1}],methods:[],events:[{event:"current-page-change",detail:"number",bubbles:!0,complexType:{original:"number",resolved:"number",references:{}},cancelable:!0,composed:!0,docs:"Emmited event when current page change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:["mg-input-checkbox-paginated"],dependencies:["mg-button","mg-icon","mg-input-select"],dependencyGraph:{"mg-pagination":["mg-button","mg-icon","mg-input-select"],"mg-button":["mg-icon"],"mg-input-select":["mg-input"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"],"mg-input-checkbox-paginated":["mg-pagination"]}},{filePath:"src/components/molecules/mg-panel/mg-panel.tsx",encapsulation:"shadow",tag:"mg-panel",readme:`## Behavior

The left zone of the header displays the item label, this zone is clickable and allows the user to unfold/fold the panel.
If no content is available, the panel cannot be unfolded.
When the panel is unfolded, the icon is vertically inverted.

The right area of the header can accommodate any component.

## Anatomy

![](./doc/img/mg-panel-anatomy.png)

## Specs

### Sizing

![](./doc/img/mg-panel-sizing.png)

### Spacing

![](./doc/img/mg-panel-spacing.png)

Slot content padding can be customized using the --mg-panel-content-padding CSS variable, default is 15px.

### Alignments

![](./doc/img/mg-panel-align.png)

### Styles

![](./doc/img/mg-panel-style.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-panel-border-radius\`: Define panel border radius, default: \`0.5rem\`
- \`--mg-panel-background\`: Define panel background, default: \`var(--color-info-h) var(--color-info-s) calc(var(--color-info-l) + 68%)\`
- \`--mg-panel-box-shadow\`: Define panel box shadow, default: \`var(--box-shadow)\`
- \`--mg-panel-content-padding\`: Define panel content padding, default: \`1.5rem\`

Please note that the mg-panel component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-panel. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-panel to your design.
`,docs:`The left zone of the header displays the item label, this zone is clickable and allows the user to unfold/fold the panel.
If no content is available, the panel cannot be unfolded.
When the panel is unfolded, the icon is vertically inverted.

The right area of the header can accommodate any component.`,docsTags:[],usage:{},props:[{name:"expandToggleDisabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"expand-toggle-disabled",reflectToAttr:!1,docs:"Disable possibility to toggle expand",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"expandToggleDisplay",type:'"icon" | "text"',complexType:{original:"ExpandToggleDisplayType",resolved:'"icon" | "text"',references:{ExpandToggleDisplayType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType"}}},mutable:!1,attr:"expand-toggle-display",reflectToAttr:!1,docs:"Define expand toggle button display",docsTags:[],default:"expandToggleDisplays[0]",values:[{value:"icon",type:"string"},{value:"text",type:"string"}],optional:!1,required:!1},{name:"expanded",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"expanded",reflectToAttr:!1,docs:"Panel is opened",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-panel')",values:[{type:"string"}],optional:!1,required:!1},{name:"panelTitle",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!0,attr:"panel-title",reflectToAttr:!1,docs:"Panel title",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"titleEditable",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"title-editable",reflectToAttr:!1,docs:"Define if panel title is editable",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"titlePattern",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern",reflectToAttr:!1,docs:"Panel title pattern",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"titlePatternErrorMessage",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"title-pattern-error-message",reflectToAttr:!1,docs:"Panel title pattern error message",docsTags:[],values:[{type:"string"}],optional:!0,required:!1},{name:"titlePosition",type:'"left" | "right"',complexType:{original:"TitlePositionType",resolved:'"left" | "right"',references:{TitlePositionType:{location:"import",path:"./mg-panel.conf",id:"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType"}}},mutable:!1,attr:"title-position",reflectToAttr:!1,docs:"Define title position",docsTags:[],default:"titlePositions[0]",values:[{value:"left",type:"string"},{value:"right",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"expanded-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPanelElement['expanded']",resolved:"boolean",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when expanded change",docsTags:[]},{event:"title-change",detail:"string",bubbles:!0,complexType:{original:"HTMLMgPanelElement['panelTitle']",resolved:"string",references:{HTMLMgPanelElement:{location:"global",id:"global::HTMLMgPanelElement"}}},cancelable:!0,composed:!0,docs:"Emmited event when title change",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:["mg-button","mg-icon","mg-input-text","mg-card"],dependencyGraph:{"mg-panel":["mg-button","mg-icon","mg-input-text","mg-card"],"mg-button":["mg-icon"],"mg-input-text":["mg-input","mg-icon","mg-character-left"],"mg-input":["mg-tooltip","mg-icon","mg-input-title"],"mg-tooltip":["mg-tooltip-content"]}},{filePath:"src/components/molecules/mg-popover/mg-popover.tsx",encapsulation:"shadow",tag:"mg-popover",readme:`## Usage

A popover is more enhanced than a tooltip but less blocking than a modal.

## Behavior

The window is displayed when clicking on its trigger.

The window is displayed next to its trigger, usually below it. A triangle (in css) makes the link between the trigger and the window.

The window closes:

- when clicking on its trigger
- clicking outside the window
- when the ESC key is pressed
- when clicking on the close button at the top right corner

The size of the window is determined by the content (set a maximum size to avoid problems).

The title and the close button are optional.

## Specs

### Fonts

![](./doc/img/mg-popover-fonts.png)

### Spacing

![](./doc/img/mg-popover-spacing.png)

### Sizing

![](./doc/img/mg-popover-sizing.png)

Default max-width: 400px
The value of the max-width can be modified according to the case via the CSS variable.

### Alignments

![](./doc/img/mg-popover-align.png)

### Positioning

#### Item

![](./doc/img/mg-popover-position.png)

#### Screen

![](./doc/img/mg-popover-position-screen.png)

### Style

![](./doc/img/mg-popover-style.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-popover-background-color\`: Define popover background color, default: \`var(--color-light)\`
- \`--mg-popover-font-color\`: Define popover font color, default: \`var(--color-font-dark)\`
- \`--mg-popover-title-font-size\`: Define popover title font size, default: \`1.4rem\`
- \`--mg-popover-padding-vertical\`: Define popover vertical padding, default: \`1.5rem\`
- \`--mg-popover-padding-horizontal\`: Define popover horizontal padding, default: \`--mg-popover-padding-vertical\`
- \`--mg-popover-max-width\`: Define the popover max-width. Default: \`40rem\`;
- \`--mg-popover-min-width\`: Define the popover min-width. Default: \`unset\`;

Please note that the mg-popover component uses the [mg-card](./?path=/docs/atoms-mg-card--mg-card) component. This means that you can benefit from the CSS variables of [mg-card](./?path=/docs/atoms-mg-card--mg-card) to customize mg-popover. You can easily change padding, border-radius, etc. Use this feature to seamlessly adapt mg-popover to your design.
`,docs:"A popover is more enhanced than a tooltip but less blocking than a modal.",docsTags:[{name:"slot",text:"- Element that will display the popover"},{name:"slot",text:"content - popover content"}],usage:{},props:[{name:"arrowHide",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"arrow-hide",reflectToAttr:!1,docs:"Hide popover arrow",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"closeButton",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"close-button",reflectToAttr:!1,docs:"Define if popover has a cross button",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display popover",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-popover')",values:[{type:"string"}],optional:!1,required:!1},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Popover placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"display-change",detail:"boolean",bubbles:!0,complexType:{original:"HTMLMgPopoverElement['display']",resolved:"boolean",references:{HTMLMgPopoverElement:{location:"global",id:"global::HTMLMgPopoverElement"}}},cancelable:!0,composed:!0,docs:"Emited event when display value change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"",docs:"Element that will display the popover"},{name:"content",docs:"popover content"}],parts:[],dependents:["mg-action-more","mg-input-checkbox","mg-menu-item"],dependencies:["mg-popover-content"],dependencyGraph:{"mg-popover":["mg-popover-content"],"mg-popover-content":["mg-card","mg-button","mg-icon"],"mg-button":["mg-icon"],"mg-action-more":["mg-popover"],"mg-input-checkbox":["mg-popover"],"mg-menu-item":["mg-popover"]}},{filePath:"src/components/molecules/mg-skip-links/mg-skip-links.tsx",encapsulation:"shadow",tag:"mg-skip-links",readme:`## Behavior

On the first tab, a banner with the link(s) is displayed by pushing the content down.

The number of links will be added according to the content of the page.

## Specs

### Sizing

The minimum height of the banner is 55px.

### Spacing

Items have an internal margin of 12px and are spaced 6px apart.

### Styling

- The links are in [@color-dark](./?path=/docs/style-colors--docs).
- The background of the banner is in [@color-light](./?path=/docs/style-colors--docs).

#### On hover

The background of the item takes the color [@color-dark](./?path=/docs/style-colors--docs) at 10% opacity.

#### Focus taking

Native browser behavior is retained.

## Code example

You need to press <kbd>Tab</kbd> in the code example to see the component.

## Integration

The \`mg-skip-links\` must be integrated at the very top of your page to be the first focusable element.

## Implementation with a "#" based router

\`mg-skip-links\` uses native anchor behavior, but if your site/app uses a "#" link-based router, like AngularJS does, you'll need to use the "go-to-anchor" component event. This event returns its detail property to the target anchor, then you can apply the scrollTo anchor behavior:

- if the anchor is in the same window, with native javascript:

\`\`\`js
const goToAnchor = (anchor) => {
    const top = document.querySelector(anchor).offsetTop;
    window.scrollTo(0, top);

    // set focus on next element to put keyboard navigation at the right place
    anchor.focus();
}

// optionaly you can use a timeout to wait document ready
setTimeout(()=> {
    // you must add listener on skip links element to prevent redirection
    Array.from(document.querySelector('mg-skip-links').shadowRoot.querySelectorAll('a')).forEach(anchor => {
        anchor.addEventListener('click', event => {
            event.preventDefault();
        })
    })​
})
\`\`\`

- in case the anchor is in another window, with the [iframeRisizer's moveToAnchor method](https://github.com/davidjbradshaw/iframe-resizer/blob/master/docs/parent_page/methods.md#movetoanchoranchor)
`,docs:`On the first tab, a banner with the link(s) is displayed by pushing the content down.

The number of links will be added according to the content of the page.`,docsTags:[],usage:{},props:[{name:"links",type:"SkipLink[]",complexType:{original:"SkipLink[]",resolved:"SkipLink[]",references:{SkipLink:{location:"import",path:"./mg-skip-links.conf",id:"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx::SkipLink"}}},mutable:!1,reflectToAttr:!1,docs:"Skip links",docsTags:[],values:[{type:"SkipLink[]"}],optional:!1,required:!1}],methods:[],events:[{event:"go-to-anchor",detail:"string",bubbles:!0,complexType:{original:"string",resolved:"string",references:{}},cancelable:!0,composed:!0,docs:"Emited event when link is clicked",docsTags:[]}],listeners:[],styles:[],slots:[],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/molecules/mg-tabs/mg-tabs.tsx",encapsulation:"shadow",tag:"mg-tabs",readme:`## Anatomy

![](./doc/img/mg-tabs-anatomy.png)

## Specs

### Spacing

- Regular
  - X = 20px;
  - Y = 10px;
- Large
  - X = 30px;
  - Y = 15px;

![](./doc/img/mg-tabs-spacing.png)

- if only text, no extra spacing,
- if no badge: no extra spacing on the right
- if only icon: no extra spacing on the right

### Sizing

![](./doc/img/mg-tabs-sizing.png)

The header bottom border is 100% wide, 1px sizing and its color is @color-dark-soft. You can override it with [CSS variable](./?path=/docs/molecules-mg-tabs--docs#css-variables).

![](./doc/img/mg-tabs-header-border.png)

### States

![](./doc/img/mg-tabs-states.png)

### Responsive

#### Line breaks (current management)

![](./doc/img/mg-tabs-responsive.png)

## CSS variables

If needed some [variables](./?path=/story/css-variables--page) are available to customize the component:

- \`--mg-tabs-border-bottom\`: define tabs header border-bottom. Default: \`solid 0.1rem hsl(var(--mg-color-dark-soft-hsl))\`.
`,docs:"![](./doc/img/mg-tabs-anatomy.png)",docsTags:[{name:"slot",text:"tab_content-n - Tab content, where `n` represents the position of the tab content. It starts at 1."}],usage:{},props:[{name:"activeTab",type:"number",complexType:{original:"number",resolved:"number",references:{}},mutable:!0,attr:"active-tab",reflectToAttr:!0,docs:"Active tab number",docsTags:[],values:[{type:"number"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:`Identifier is used for the element ID (id is a reserved prop in Stencil.js)
If not set, it will be created.`,docsTags:[],default:"createID('mg-tabs')",values:[{type:"string"}],optional:!1,required:!1},{name:"items",type:"TabItem[] | string[]",complexType:{original:"string[] | TabItem[]",resolved:"TabItem[] | string[]",references:{TabItem:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem"}}},mutable:!1,reflectToAttr:!1,docs:"Tabs items",docsTags:[],values:[{type:"TabItem[]"},{type:"string[]"}],optional:!1,required:!0},{name:"label",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"label",reflectToAttr:!1,docs:`Tabs label. Include short tabs description.
Required for accessibility`,docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"size",type:'"large" | "regular"',complexType:{original:"SizeType",resolved:'"large" | "regular"',references:{SizeType:{location:"import",path:"./mg-tabs.conf",id:"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType"}}},mutable:!1,attr:"size",reflectToAttr:!1,docs:"Define tabs size",docsTags:[],default:"'regular'",values:[{value:"large",type:"string"},{value:"regular",type:"string"}],optional:!1,required:!1}],methods:[],events:[{event:"active-tab-change",detail:"number",bubbles:!0,complexType:{original:"HTMLMgTabsElement['activeTab']",resolved:"number",references:{HTMLMgTabsElement:{location:"global",id:"global::HTMLMgTabsElement"}}},cancelable:!0,composed:!0,docs:"Emited event when active tab change",docsTags:[]}],listeners:[],styles:[],slots:[{name:"tab_content-n",docs:"Tab content, where `n` represents the position of the tab content. It starts at 1."}],parts:[],dependents:[],dependencies:["mg-icon","mg-badge"],dependencyGraph:{"mg-tabs":["mg-icon","mg-badge"]}},{filePath:"src/components/atoms/mg-tag/mg-tag.tsx",encapsulation:"shadow",tag:"mg-tag",readme:`## Specs

![](./doc/img/mg-tag-specs.png)

### Fill / Outline tags

#### Colors

![](./doc/img/mg-tag-colors.png)

Icons take the color of the label.

### Soft tags

#### Font

![](./doc/img/mg-tag-font.png)

They are not on SemiBold but **Regular**.

#### Colors

![](./doc/img/mg-tag-icons-colors.png)

1. Icons takes the color of the tag variant.
2. Labels are [**@color-dark**](./?path=/docs/style-colors--docs) for all.
3. Color background is **[**soft color**](./?path=/docs/style-colors--docs)** of the tag variant.

#### Rules

![](./doc/img/mg-tag-use.png)

For accessibility, soft variant tags cannot use an icon on its own.

## Theming

![](./doc/img/mg-tag-variants.png)

### With Icons

![](./doc/img/mg-tag-icons.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

### Global

- \`--mg-tag-height\`: Define tag min height, default: \`2.3rem\`
- \`--mg-tag-border-radius\`: Define tag border radius, default: \`0.5rem\`
- \`--mg-tag-font-size\`: Define tag font size, default: \`1.2rem\`

### Variant

Variants \`primary\`, \`secondary\`, \`success\`, \`warning\`, \`danger\`, \`info\` can be customized by changing the global [colors](./?path=/docs/style-colors--docs).
`,docs:"![](./doc/img/mg-tag-specs.png)",docsTags:[{name:"slot",text:"- Tag content"}],usage:{},props:[{name:"outline",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"outline",reflectToAttr:!1,docs:"Define if tag is using outline style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"soft",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"soft",reflectToAttr:!1,docs:"Define if tag is using soft style",docsTags:[],values:[{type:"boolean"}],optional:!0,required:!1},{name:"variant",type:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',complexType:{original:"TagVariantType",resolved:'"danger" | "info" | "primary" | "secondary" | "success" | "warning"',references:{TagVariantType:{location:"import",path:"./mg-tag.conf",id:"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType"}}},mutable:!1,attr:"variant",reflectToAttr:!1,docs:"Define tag variant",docsTags:[],default:"variants[0]",values:[{value:"danger",type:"string"},{value:"info",type:"string"},{value:"primary",type:"string"},{value:"secondary",type:"string"},{value:"success",type:"string"},{value:"warning",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Tag content"}],parts:[],dependents:[],dependencies:[],dependencyGraph:{}},{filePath:"src/components/atoms/mg-tooltip/mg-tooltip.tsx",encapsulation:"shadow",tag:"mg-tooltip",readme:`## Usage

Tooltips are messages that provide additional information about an element.
They are presented as a message that appears when an element is hovered over or when the keyboard is focused.
Tooltips are called "custom" when they are not built on the basis of the standard HTML code provided for these elements by the specification: the title attribute.
Our "custom tooltip" component is called "tooltip" here.

## Behavior

The tooltip must be displayed when the element that allows its display:

- Is hovered over by the mouse.
- Takes the keyboard focus.

The tooltip must be hidden when the element that allows its display:

- Is no longer hovered over by the mouse.
- Loses the keyboard focus.
- Pressing the Escape key must hide the tooltip.

The tooltip must remain displayed when its content is hovered over by the mouse.

The tooltip can be placed above, to the right, below or to the left of the element it describes.

By default, the message is displayed at the bottom of the element.

If the element is located at the edge of the screen, the tooltip is shifted to be always visible.

## Specs

### Shapes

![](./doc/img/mg-tooltip-shape.png)

### Fonts

![](./doc/img/mg-tooltip-font.png)

### Spacing

![](./doc/img/mg-tooltip-spaces.png)

### Alignments

![](./doc/img/mg-tooltip-alignments-text.png)

### Positioning

Triangle is always centered on the call component

![](./doc/img/mg-tooltip-positioning.png)
![](./doc/img/mg-tooltip-positioning2.png)

### Colors

![](./doc/img/mg-tooltip-colors.png)

### Sizes

![](./doc/img/mg-tooltip-sizing.png)

Component's max-width is 400px.

![](./doc/img/mg-tooltip-max-width.png)

## CSS Variables

If needed some [variables](./?path=/docs/css-variables--docs) are available to customize the component:

- \`--mg-tooltip-border-radius\`: Define tooltip border radius, default: \`0.5rem\`
- \`--mg-tooltip-background-color\`: Define tooltip background color, default: \`--color-dark\`
- \`--mg-tooltip-font-color\`: Define tooltip font color, default: \`--color-font-light\`
`,docs:`Tooltips are messages that provide additional information about an element.
They are presented as a message that appears when an element is hovered over or when the keyboard is focused.
Tooltips are called "custom" when they are not built on the basis of the standard HTML code provided for these elements by the specification: the title attribute.
Our "custom tooltip" component is called "tooltip" here.`,docsTags:[{name:"slot",text:"- Element that will display the tooltip"},{name:"slot",text:"content - Tooltip content"}],usage:{},props:[{name:"disabled",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!1,attr:"disabled",reflectToAttr:!1,docs:"Disable tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"display",type:"boolean",complexType:{original:"boolean",resolved:"boolean",references:{}},mutable:!0,attr:"display",reflectToAttr:!1,docs:"Display tooltip",docsTags:[],default:"false",values:[{type:"boolean"}],optional:!1,required:!1},{name:"identifier",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"identifier",reflectToAttr:!1,docs:"Sets an `id` attribute.\nNeeded by the input for accessibility `aria-decribedby`.",docsTags:[],default:"createID('mg-tooltip')",values:[{type:"string"}],optional:!1,required:!1},{name:"message",type:"string",complexType:{original:"string",resolved:"string",references:{}},mutable:!1,attr:"message",reflectToAttr:!1,docs:"Displayed message in the tooltip",docsTags:[],values:[{type:"string"}],optional:!1,required:!0},{name:"placement",type:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',complexType:{original:"Placement",resolved:'"auto" | "auto-end" | "auto-start" | "bottom" | "bottom-end" | "bottom-start" | "left" | "left-end" | "left-start" | "right" | "right-end" | "right-start" | "top" | "top-end" | "top-start"',references:{Placement:{location:"import",path:"@popperjs/core",id:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement"}}},mutable:!1,attr:"placement",reflectToAttr:!1,docs:"Tooltip placement",docsTags:[],default:"'bottom'",values:[{value:"auto",type:"string"},{value:"auto-end",type:"string"},{value:"auto-start",type:"string"},{value:"bottom",type:"string"},{value:"bottom-end",type:"string"},{value:"bottom-start",type:"string"},{value:"left",type:"string"},{value:"left-end",type:"string"},{value:"left-start",type:"string"},{value:"right",type:"string"},{value:"right-end",type:"string"},{value:"right-start",type:"string"},{value:"top",type:"string"},{value:"top-end",type:"string"},{value:"top-start",type:"string"}],optional:!1,required:!1}],methods:[],events:[],listeners:[],styles:[],slots:[{name:"",docs:"Element that will display the tooltip"},{name:"content",docs:"Tooltip content"}],parts:[],dependents:["mg-input","mg-input-checkbox-paginated"],dependencies:["mg-tooltip-content"],dependencyGraph:{"mg-tooltip":["mg-tooltip-content"],"mg-input":["mg-tooltip"],"mg-input-checkbox-paginated":["mg-tooltip"]}}],ov={"src/components/atoms/mg-badge/mg-badge.conf.ts::BadgeVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger" | "text-color"',docstring:"",path:"src/components/atoms/mg-badge/mg-badge.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::VariantType":{declaration:'"flat" | "info" | "success" | "link" | "primary" | "secondary" | "danger" | "danger-alt"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-button/mg-button.conf.ts::ButtonType":{declaration:'"button" | "submit" | "reset"',docstring:"",path:"src/components/atoms/mg-button/mg-button.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconType":{declaration:'"filter" | "copy" | "link" | "picture" | "table" | "circle" | "download" | "history" | "location" | "key" | "loader" | "address-card" | "align-center" | "align-justify" | "align-left" | "align-right" | "api" | "archive" | "archive-outline" | "arrow-clock" | "arrow-down" | "arrow-down-a-z" | "arrow-down-right" | "arrow-left" | "arrow-right" | "arrow-rotate" | "arrow-rotate-backward" | "arrow-up" | "arrow-up-right" | "arrow-up-right-square" | "arrow-up-z-a" | "arrows-compare" | "arrows-right-down" | "arrows-right-left" | "arrows-rotate" | "arrows-rotate-backward" | "ban" | "bell" | "bell-outline" | "book" | "book-outline" | "briefcase" | "briefcase-outline" | "building-outline" | "calculator" | "calendar" | "calendar-euro" | "calendar-euro-outline" | "calendar-outline" | "check" | "check-circle" | "check-circle-outline" | "chevron-down" | "chevron-down-circle" | "chevron-left" | "chevron-left-circle" | "chevron-right" | "chevron-right-circle" | "chevron-up" | "chevron-up-circle" | "clock" | "clock-outline" | "code-square-outline" | "cog" | "cog-outline" | "comment" | "comment-outline" | "comment-sms" | "conversation" | "conversation-outline" | "copy-file" | "copy-file-outline" | "copy-outline" | "credit-card" | "cross" | "cross-circle" | "cross-circle-outline" | "dashboard" | "dashboard-outline" | "earth" | "earth-outline" | "ellipsis" | "ellipsis-vertical" | "euro" | "euro-circle" | "exclamation-circle" | "exclamation-circle-outline" | "exclamation-stamp" | "exclamation-triangle" | "exclamation-triangle-outline" | "eye" | "eye-slash" | "fax" | "fax-outline" | "file" | "file-cog" | "file-download" | "file-excel" | "file-excel-outline" | "file-outline" | "file-pdf" | "file-pdf-outline" | "file-text" | "file-text-outline" | "file-upload" | "file-word" | "file-word-outline" | "filter-outline" | "floppy-disk" | "floppy-disk-outline" | "folder" | "folder-check" | "folder-check-outline" | "folder-lines" | "folder-lines-outline" | "folder-link" | "folder-link-outline" | "folder-outline" | "folder-star" | "folders" | "folders-outline" | "gavel" | "gavel-outline" | "graduation-cap" | "graduation-cap-outline" | "hand-up" | "home" | "home-outline" | "info-circle" | "info-circle-outline" | "interrogation-circle" | "interrogation-circle-outline" | "laptop" | "life-ring" | "lines-rectangle" | "lines-rectangle-outline" | "list" | "location-outline" | "lock" | "lock-outline" | "log-in" | "log-out" | "magnifying-glass" | "mail" | "mail-outline" | "messages-square" | "messages-square-outline" | "mobile" | "mobile-outline" | "notes" | "notes-outline" | "paper-plane" | "paper-plane-slash" | "paperclip" | "pen" | "pen-circle" | "pen-fancy" | "pen-fancy-files-outline" | "pen-fancy-outline" | "pen-outline" | "phone" | "phone-outline" | "picture-outline" | "play-circle" | "plus" | "plus-circle" | "question-circle" | "share" | "share-outline" | "shuffle" | "sitemap" | "sliders" | "sliders-outline" | "squares" | "star" | "star-outline" | "tag" | "tags" | "thumb-down" | "thumb-down-outline" | "thumb-up" | "thumb-up-outline" | "thumbtack" | "thumbtack-outline" | "trash" | "trash-outline" | "universal-access" | "unlink" | "unlock" | "unlock-outline" | "upload" | "user" | "user-circle" | "user-group" | "user-lock" | "user-outline" | "user-pen-fancy-outline" | "user-plus" | "user-question-outline" | "user-shield-outline" | "users" | "users-outline" | "wallet" | "wallet-outline"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconSizeType":{declaration:'"small" | "regular" | "medium" | "large" | "extra-large"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/atoms/mg-icon/mg-icon.conf.ts::IconVariantStyleType":{declaration:'"icon" | "background" | "full"',docstring:"",path:"src/components/atoms/mg-icon/mg-icon.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::Direction":{declaration:`export enum Direction {
  VERTICAL = 'vertical',
  HORIZONTAL = 'horizontal',
}`,docstring:"Menu direction type",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::ItemMoreType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/menu/mg-menu/mg-menu.conf.ts::MenuSizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/menu/mg-menu/mg-menu.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::IconType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SlotLabelType":{declaration:`{
  label?: string;
  display?: boolean;
}`,docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"src/components/molecules/mg-item-more/mg-item-more.conf.ts::SizeType":{declaration:'"regular" | "medium" | "large"',docstring:"",path:"src/components/molecules/mg-item-more/mg-item-more.conf.ts"},"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts::Placement":{declaration:"any",docstring:"",path:"../../node_modules/.pnpm/@popperjs+core@2.11.8/node_modules/@popperjs/core/index.d.ts"},"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::TargetType":{declaration:'"_blank" | "_self" | "_parent" | "_top"',docstring:"",path:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts"},"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts::Status":{declaration:`export enum Status {
  VISIBLE = 'visible',
  HIDDEN = 'hidden',
  DISABLED = 'disabled',
  ACTIVE = 'active',
}`,docstring:"Available menu item status",path:"src/components/molecules/menu/mg-menu-item/mg-menu-item.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger" | "app"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-card/mg-card.conf.ts::VariantStyleType":{declaration:'"fill" | "bar-left"',docstring:"",path:"src/components/atoms/mg-card/mg-card.conf.ts"},"src/components/atoms/mg-tag/mg-tag.conf.ts::TagVariantType":{declaration:'"info" | "success" | "primary" | "secondary" | "warning" | "danger"',docstring:"",path:"src/components/atoms/mg-tag/mg-tag.conf.ts"},"src/components/molecules/inputs/mg-input/mg-input.conf.ts::TooltipPosition":{declaration:'"input" | "label"',docstring:"",path:"src/components/molecules/inputs/mg-input/mg-input.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxValue":{declaration:`export interface CheckboxValue {
  title: string;
  value: boolean | null;
  disabled?: boolean;
  required?: boolean;
}`,docstring:`interface CheckboxValue
use to match returned value`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxType":{declaration:'"checkbox" | "multi"',docstring:"",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::CheckboxItem":{declaration:`export interface CheckboxItem extends CheckboxValue {
  _id: string;
  _handleInput: (event: InputEvent & { target: HTMLInputElement }) => void;
  _handleBlur: () => void;
  _handleKeydown: (event: KeyboardEvent & { target: HTMLElement }) => void;
  _handleMouseEnter: () => void;
  _handleMouseLeave: () => void;
}`,docstring:`interface CheckboxItem
use to match checkbox attributes`,path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts::SectionKind":{declaration:`export enum SectionKind {
  SELECTED = 'selected',
  NOT_SELECTED = 'not-selected',
}`,docstring:"mg-input-checkbox-paginated section kind",path:"src/components/molecules/inputs/mg-input-checkbox/mg-input-checkbox.conf.ts"},"src/components/molecules/inputs/mg-input/mg-input.conf.ts::Width":{declaration:'2 | 4 | 16 | "full"',docstring:"",path:"src/components/molecules/inputs/mg-input/mg-input.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::NumericType":{declaration:'"decimal" | "integer" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts::Format":{declaration:'"number" | "none" | "currency"',docstring:"",path:"src/components/molecules/inputs/mg-input-numeric/mg-input-numeric.conf.ts"},"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts::RadioOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-radio/mg-input-radio.conf.ts"},"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts::SelectOption":{declaration:`{
  title: string;
  value: unknown;
  disabled?: boolean;
  group?: string;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-select/mg-input-select.conf.ts"},"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts::TextType":{declaration:"export type TextType = 'text' | 'search';",docstring:"",path:"src/components/molecules/inputs/mg-input-text/mg-input-text.conf.ts"},"src/components.d.ts::IconType":{declaration:"any",docstring:"",path:"src/components.d.ts"},"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts::ToggleValue":{declaration:`{
  title: string;
  value: unknown;
}`,docstring:"",path:"src/components/molecules/inputs/mg-input-toggle/mg-input-toggle.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreItemType":{declaration:`export type MgActionMoreItemType = Pick<MgMenuItem, 'status' | 'href' | 'target'> & {
  label: string;
  mouseEventHandler: IMouseEventHandler;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'label'>;
};`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreIconType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-action-more/mg-action-more.conf.ts::MgActionMoreButtonType":{declaration:`{
    [P in K]: T[P];
}`,docstring:"",path:"src/components/molecules/mg-action-more/mg-action-more.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::RequiredMessageStatusType":{declaration:'"default" | "hide"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-form/mg-form.conf.ts::AriaRoleType":{declaration:'"none" | "form" | "search" | "presentation"',docstring:"",path:"src/components/molecules/mg-form/mg-form.conf.ts"},"src/components/molecules/mg-message/mg-message.conf.ts::VariantType":{declaration:'"info" | "success" | "warning" | "danger"',docstring:"",path:"src/components/molecules/mg-message/mg-message.conf.ts"},"src/components/molecules/mg-modal/mg-modal.conf.ts::DialogRoleType":{declaration:'"dialog" | "alertdialog"',docstring:"",path:"src/components/molecules/mg-modal/mg-modal.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::TitlePositionType":{declaration:'"right" | "left"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-panel/mg-panel.conf.ts::ExpandToggleDisplayType":{declaration:'"text" | "icon"',docstring:"",path:"src/components/molecules/mg-panel/mg-panel.conf.ts"},"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx::SkipLink":{declaration:`{
  href: string;
  label: string;
}`,docstring:"",path:"src/components/molecules/mg-skip-links/mg-skip-links.conf.tsx"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::SizeType":{declaration:'"regular" | "large"',docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"},"src/components/molecules/mg-tabs/mg-tabs.conf.ts::TabItem":{declaration:`{
  label: string;
  icon?: MgIcon['icon'];
  badge?: Pick<MgBadge, 'value' | 'variant' | 'label'> & { role: 'notification' | 'information' };
  status: Status;
}`,docstring:"",path:"src/components/molecules/mg-tabs/mg-tabs.conf.ts"}},rv={timestamp:tv,compiler:nv,components:av,typeLibrary:ov},iv="mg-components",Fn={allRenderFn:!1,appendChildSlotFix:!1,asyncLoading:!0,asyncQueue:!1,attachStyles:!0,cloneNodeFix:!1,cmpDidLoad:!0,cmpDidRender:!0,cmpDidUnload:!1,cmpDidUpdate:!0,cmpShouldUpdate:!0,cmpWillLoad:!0,cmpWillRender:!1,cmpWillUpdate:!0,connectedCallback:!1,constructableCSS:!0,cssAnnotations:!0,devTools:!1,disconnectedCallback:!0,element:!1,event:!0,experimentalScopedSlotChanges:!1,experimentalSlotFixes:!1,formAssociated:!1,hasRenderFn:!0,hostListener:!0,hostListenerTarget:!0,hostListenerTargetBody:!1,hostListenerTargetDocument:!1,hostListenerTargetParent:!1,hostListenerTargetWindow:!0,hotModuleReplacement:!1,hydrateClientSide:!1,hydrateServerSide:!1,hydratedAttribute:!1,hydratedClass:!0,hydratedSelectorName:"hydrated",initializeNextTick:!1,invisiblePrehydration:!0,isDebug:!1,isDev:!1,isTesting:!1,lazyLoad:!0,lifecycle:!0,lifecycleDOMEvents:!1,member:!0,method:!0,mode:!1,observeAttribute:!0,profile:!1,prop:!0,propBoolean:!0,propMutable:!0,propNumber:!0,propString:!0,reflect:!0,scoped:!0,scopedSlotTextContentFix:!1,scriptDataOpts:!1,shadowDelegatesFocus:!1,shadowDom:!0,slot:!0,slotChildNodesFix:!1,slotRelocation:!0,state:!0,style:!0,svg:!1,taskQueue:!0,transformTagName:!1,updatable:!0,vdomAttribute:!0,vdomClass:!0,vdomFunctional:!0,vdomKey:!0,vdomListener:!0,vdomPropOrAttr:!0,vdomRef:!0,vdomRender:!0,vdomStyle:!0,vdomText:!0,vdomXlink:!0,watchCallback:!0};var lv=Object.defineProperty,sv=(e,t)=>{for(var n in t)lv(e,n,{get:t[n],enumerable:!0})},wo={},cv=e=>e!=null,Nn=e=>(e=typeof e,e==="object"||e==="function");function Kr(e){var t,n,a;return(a=(n=(t=e.head)==null?void 0:t.querySelector('meta[name="csp-nonce"]'))==null?void 0:n.getAttribute("content"))!=null?a:void 0}var uv={};sv(uv,{err:()=>Yr,map:()=>pv,ok:()=>un,unwrap:()=>dv,unwrapErr:()=>gv});var un=e=>({isOk:!0,isErr:!1,value:e}),Yr=e=>({isOk:!1,isErr:!0,value:e});function pv(e,t){if(e.isOk){const n=t(e.value);return n instanceof Promise?n.then(a=>un(a)):un(n)}if(e.isErr){const n=e.value;return Yr(n)}throw"should never get here"}var dv=e=>{if(e.isOk)return e.value;throw e.value},gv=e=>{if(e.isErr)return e.value;throw e.value},N=(e,t="")=>()=>{},mv=(e,t)=>()=>{},fv="{visibility:hidden}.hydrated{visibility:inherit}",Jr="slot-fb{display:contents}slot-fb[hidden]{display:none}",$o="http://www.w3.org/1999/xlink",Xr=(e,t,...n)=>{let a=null,o=null,r=null,i=!1,l=!1;const s=[],u=p=>{for(let d=0;d<p.length;d++)a=p[d],Array.isArray(a)?u(a):a!=null&&typeof a!="boolean"&&((i=typeof e!="function"&&!Nn(a))&&(a=String(a)),i&&l?s[s.length-1].$text$+=a:s.push(i?Ke(null,a):a),l=i)};if(u(n),t){t.key&&(o=t.key),t.name&&(r=t.name);{const p=t.className||t.class;p&&(t.class=typeof p!="object"?p:Object.keys(p).filter(d=>p[d]).join(" "))}}if(typeof e=="function")return e(t===null?{}:t,s,hv);const c=Ke(e,null);return c.$attrs$=t,s.length>0&&(c.$children$=s),c.$key$=o,c.$name$=r,c},Ke=(e,t)=>{const n={$flags$:0,$tag$:e,$text$:t,$elm$:null,$children$:null};return n.$attrs$=null,n.$key$=null,n.$name$=null,n},vv={},yv=e=>e&&e.$tag$===vv,hv={forEach:(e,t)=>e.map(ko).forEach(t),map:(e,t)=>e.map(ko).map(t).map(bv)},ko=e=>({vattrs:e.$attrs$,vchildren:e.$children$,vkey:e.$key$,vname:e.$name$,vtag:e.$tag$,vtext:e.$text$}),bv=e=>{if(typeof e.vtag=="function"){const n={...e.vattrs};return e.vkey&&(n.key=e.vkey),e.vname&&(n.name=e.vname),Xr(e.vtag,n,...e.vchildren||[])}const t=Ke(e.vtag,e.vtext);return t.$attrs$=e.vattrs,t.$children$=e.vchildren,t.$key$=e.vkey,t.$name$=e.vname,t},Tv=(e,t)=>e!=null&&!Nn(e)?t&4?e==="false"?!1:e===""||!!e:t&2?parseFloat(e):t&1?String(e):e:e,xv=e=>G(e).$hostElement$,sy=(e,t,n)=>{const a=xv(e);return{emit:o=>Zr(a,t,{bubbles:!!(n&4),composed:!!(n&2),cancelable:!!(n&1),detail:o})}},Zr=(e,t,n)=>{const a=w.ce(t,n);return e.dispatchEvent(a),a},So=new WeakMap,wv=(e,t,n)=>{let a=Xe.get(e);Jv&&n?(a=a||new CSSStyleSheet,typeof a=="string"?a=t:a.replaceSync(t)):a=t,Xe.set(e,a)},$v=(e,t,n)=>{var a;const o=Qr(t),r=Xe.get(o);if(e=e.nodeType===11?e:E,r)if(typeof r=="string"){e=e.head||e;let i=So.get(e),l;if(i||So.set(e,i=new Set),!i.has(o)){{l=E.createElement("style"),l.innerHTML=r;const s=(a=w.$nonce$)!=null?a:Kr(E);s!=null&&l.setAttribute("nonce",s),e.insertBefore(l,e.querySelector("link"))}t.$flags$&4&&(l.innerHTML+=Jr),i&&i.add(o)}}else e.adoptedStyleSheets.includes(r)||(e.adoptedStyleSheets=[...e.adoptedStyleSheets,r]);return o},kv=e=>{const t=e.$cmpMeta$,n=e.$hostElement$,a=t.$flags$,o=N("attachStyles",t.$tagName$),r=$v(n.shadowRoot?n.shadowRoot:n.getRootNode(),t);a&10&&(n["s-sc"]=r,n.classList.add(r+"-h"),a&2&&n.classList.add(r+"-s")),o()},Qr=(e,t)=>"sc-"+e.$tagName$,Io=(e,t,n,a,o,r)=>{if(n!==a){let i=qo(e,t),l=t.toLowerCase();if(t==="class"){const s=e.classList,u=Ao(n),c=Ao(a);s.remove(...u.filter(p=>p&&!c.includes(p))),s.add(...c.filter(p=>p&&!u.includes(p)))}else if(t==="style"){for(const s in n)(!a||a[s]==null)&&(s.includes("-")?e.style.removeProperty(s):e.style[s]="");for(const s in a)(!n||a[s]!==n[s])&&(s.includes("-")?e.style.setProperty(s,a[s]):e.style[s]=a[s])}else if(t!=="key")if(t==="ref")a&&a(e);else if(!i&&t[0]==="o"&&t[1]==="n"){if(t[2]==="-"?t=t.slice(3):qo(Ee,l)?t=l.slice(2):t=l[2]+t.slice(3),n||a){const s=t.endsWith(ei);t=t.replace(Iv,""),n&&w.rel(e,t,n,s),a&&w.ael(e,t,a,s)}}else{const s=Nn(a);if((i||s&&a!==null)&&!o)try{if(e.tagName.includes("-"))e[t]=a;else{const c=a??"";t==="list"?i=!1:(n==null||e[t]!=c)&&(e[t]=c)}}catch{}let u=!1;l!==(l=l.replace(/^xlink\:?/,""))&&(t=l,u=!0),a==null||a===!1?(a!==!1||e.getAttribute(t)==="")&&(u?e.removeAttributeNS($o,t):e.removeAttribute(t)):(!i||r&4||o)&&!s&&(a=a===!0?"":a,u?e.setAttributeNS($o,t,a):e.setAttribute(t,a))}}},Sv=/\s/,Ao=e=>e?e.split(Sv):[],ei="Capture",Iv=new RegExp(ei+"$"),ti=(e,t,n)=>{const a=t.$elm$.nodeType===11&&t.$elm$.host?t.$elm$.host:t.$elm$,o=e&&e.$attrs$||wo,r=t.$attrs$||wo;for(const i of Eo(Object.keys(o)))i in r||Io(a,i,o[i],void 0,n,t.$flags$);for(const i of Eo(Object.keys(r)))Io(a,i,o[i],r[i],n,t.$flags$)};function Eo(e){return e.includes("ref")?[...e.filter(t=>t!=="ref"),"ref"]:e}var ne,pn,be,Vn=!1,Ye=!1,Wn=!1,ni=!1,Je=(e,t,n,a)=>{var o;const r=t.$children$[n];let i=0,l,s,u;if(Vn||(Wn=!0,r.$tag$==="slot"&&(ne&&a.classList.add(ne+"-s"),r.$flags$|=r.$children$?2:1)),r.$text$!==null)l=r.$elm$=E.createTextNode(r.$text$);else if(r.$flags$&1)l=r.$elm$=E.createTextNode("");else if(l=r.$elm$=E.createElement(r.$flags$&2?"slot-fb":r.$tag$),ti(null,r,ni),cv(ne)&&l["s-si"]!==ne&&l.classList.add(l["s-si"]=ne),Gn(l,a),r.$children$)for(i=0;i<r.$children$.length;++i)s=Je(e,r,i,l),s&&l.appendChild(s);return l["s-hn"]=be,r.$flags$&3&&(l["s-sr"]=!0,l["s-cr"]=pn,l["s-sn"]=r.$name$||"",l["s-rf"]=(o=r.$attrs$)==null?void 0:o.ref,u=e&&e.$children$&&e.$children$[n],u&&u.$tag$===r.$tag$&&e.$elm$&&Te(e.$elm$,!1)),l},Te=(e,t)=>{w.$flags$|=1;const n=Array.from(e.childNodes);if(e["s-sr"]&&Fn.experimentalSlotFixes){let a=e;for(;a=a.nextSibling;)a&&a["s-sn"]===e["s-sn"]&&a["s-sh"]===be&&n.push(a)}for(let a=n.length-1;a>=0;a--){const o=n[a];o["s-hn"]!==be&&o["s-ol"]&&(U(ri(o),o,Un(o)),o["s-ol"].remove(),o["s-ol"]=void 0,o["s-sh"]=void 0,Wn=!0),t&&Te(o,t)}w.$flags$&=-2},ai=(e,t,n,a,o,r)=>{let i=e["s-cr"]&&e["s-cr"].parentNode||e,l;for(i.shadowRoot&&i.tagName===be&&(i=i.shadowRoot);o<=r;++o)a[o]&&(l=Je(null,n,o,e),l&&(a[o].$elm$=l,U(i,l,Un(t))))},oi=(e,t,n)=>{for(let a=t;a<=n;++a){const o=e[a];if(o){const r=o.$elm$;si(o),r&&(Ye=!0,r["s-ol"]?r["s-ol"].remove():Te(r,!0),r.remove())}}},Av=(e,t,n,a,o=!1)=>{let r=0,i=0,l=0,s=0,u=t.length-1,c=t[0],p=t[u],d=a.length-1,g=a[0],v=a[d],y,T;for(;r<=u&&i<=d;)if(c==null)c=t[++r];else if(p==null)p=t[--u];else if(g==null)g=a[++i];else if(v==null)v=a[--d];else if(_e(c,g,o))ae(c,g,o),c=t[++r],g=a[++i];else if(_e(p,v,o))ae(p,v,o),p=t[--u],v=a[--d];else if(_e(c,v,o))(c.$tag$==="slot"||v.$tag$==="slot")&&Te(c.$elm$.parentNode,!1),ae(c,v,o),U(e,c.$elm$,p.$elm$.nextSibling),c=t[++r],v=a[--d];else if(_e(p,g,o))(c.$tag$==="slot"||v.$tag$==="slot")&&Te(p.$elm$.parentNode,!1),ae(p,g,o),U(e,p.$elm$,c.$elm$),p=t[--u],g=a[++i];else{for(l=-1,s=r;s<=u;++s)if(t[s]&&t[s].$key$!==null&&t[s].$key$===g.$key$){l=s;break}l>=0?(T=t[l],T.$tag$!==g.$tag$?y=Je(t&&t[i],n,l,e):(ae(T,g,o),t[l]=void 0,y=T.$elm$),g=a[++i]):(y=Je(t&&t[i],n,i,e),g=a[++i]),y&&U(ri(c.$elm$),y,Un(c.$elm$))}r>u?ai(e,a[d+1]==null?null:a[d+1].$elm$,n,a,i,d):i>d&&oi(t,r,u)},_e=(e,t,n=!1)=>e.$tag$===t.$tag$?e.$tag$==="slot"?e.$name$===t.$name$:n?!0:e.$key$===t.$key$:!1,Un=e=>e&&e["s-ol"]||e,ri=e=>(e["s-ol"]?e["s-ol"]:e).parentNode,ae=(e,t,n=!1)=>{const a=t.$elm$=e.$elm$,o=e.$children$,r=t.$children$,i=t.$tag$,l=t.$text$;let s;l===null?(i==="slot"&&!Vn||ti(e,t,ni),o!==null&&r!==null?Av(a,o,t,r,n):r!==null?(e.$text$!==null&&(a.textContent=""),ai(a,null,t,r,0,r.length-1)):o!==null&&oi(o,0,o.length-1)):(s=a["s-cr"])?s.parentNode.textContent=l:e.$text$!==l&&(a.data=l)},ii=e=>{const t=e.childNodes;for(const n of t)if(n.nodeType===1){if(n["s-sr"]){const a=n["s-sn"];n.hidden=!1;for(const o of t)if(o!==n){if(o["s-hn"]!==n["s-hn"]||a!==""){if(o.nodeType===1&&(a===o.getAttribute("slot")||a===o["s-sn"])||o.nodeType===3&&a===o["s-sn"]){n.hidden=!0;break}}else if(o.nodeType===1||o.nodeType===3&&o.textContent.trim()!==""){n.hidden=!0;break}}}ii(n)}},B=[],li=e=>{let t,n,a;for(const o of e.childNodes){if(o["s-sr"]&&(t=o["s-cr"])&&t.parentNode){n=t.parentNode.childNodes;const r=o["s-sn"];for(a=n.length-1;a>=0;a--)if(t=n[a],!t["s-cn"]&&!t["s-nr"]&&t["s-hn"]!==o["s-hn"]&&!Fn.experimentalSlotFixes)if(Po(t,r)){let i=B.find(l=>l.$nodeToRelocate$===t);Ye=!0,t["s-sn"]=t["s-sn"]||r,i?(i.$nodeToRelocate$["s-sh"]=o["s-hn"],i.$slotRefNode$=o):(t["s-sh"]=o["s-hn"],B.push({$slotRefNode$:o,$nodeToRelocate$:t})),t["s-sr"]&&B.map(l=>{Po(l.$nodeToRelocate$,t["s-sn"])&&(i=B.find(s=>s.$nodeToRelocate$===t),i&&!l.$slotRefNode$&&(l.$slotRefNode$=i.$slotRefNode$))})}else B.some(i=>i.$nodeToRelocate$===t)||B.push({$nodeToRelocate$:t})}o.nodeType===1&&li(o)}},Po=(e,t)=>e.nodeType===1?e.getAttribute("slot")===null&&t===""||e.getAttribute("slot")===t:e["s-sn"]===t?!0:t==="",si=e=>{e.$attrs$&&e.$attrs$.ref&&e.$attrs$.ref(null),e.$children$&&e.$children$.map(si)},U=(e,t,n)=>{const a=e==null?void 0:e.insertBefore(t,n);return Gn(t,e),a},ci=e=>{const t=[];return e&&t.push(...e["s-scs"]||[],e["s-si"],e["s-sc"],...ci(e.parentElement)),t},Gn=(e,t,n=!1)=>{var a;if(e&&t&&e.nodeType===1){const o=new Set(ci(t).filter(Boolean));if(o.size&&((a=e.classList)==null||a.add(...e["s-scs"]=[...o]),e["s-ol"]||n))for(const r of Array.from(e.childNodes))Gn(r,e,!0)}},Ev=(e,t,n=!1)=>{var a,o,r,i;const l=e.$hostElement$,s=e.$cmpMeta$,u=e.$vnode$||Ke(null,null),c=yv(t)?t:Xr(null,null,t);if(be=l.tagName,s.$attrsToReflect$&&(c.$attrs$=c.$attrs$||{},s.$attrsToReflect$.map(([p,d])=>c.$attrs$[d]=l[p])),n&&c.$attrs$)for(const p of Object.keys(c.$attrs$))l.hasAttribute(p)&&!["key","ref","style","class"].includes(p)&&(c.$attrs$[p]=l[p]);c.$tag$=null,c.$flags$|=4,e.$vnode$=c,c.$elm$=u.$elm$=l.shadowRoot||l,ne=l["s-sc"],Vn=(s.$flags$&1)!==0,pn=l["s-cr"],Ye=!1,ae(u,c,n);{if(w.$flags$|=1,Wn){li(c.$elm$);for(const p of B){const d=p.$nodeToRelocate$;if(!d["s-ol"]){const g=E.createTextNode("");g["s-nr"]=d,U(d.parentNode,d["s-ol"]=g,d)}}for(const p of B){const d=p.$nodeToRelocate$,g=p.$slotRefNode$;if(g){const v=g.parentNode;let y=g.nextSibling;{let T=(a=d["s-ol"])==null?void 0:a.previousSibling;for(;T;){let m=(o=T["s-nr"])!=null?o:null;if(m&&m["s-sn"]===d["s-sn"]&&v===m.parentNode){for(m=m.nextSibling;m===d||m!=null&&m["s-sr"];)m=m==null?void 0:m.nextSibling;if(!m||!m["s-nr"]){y=m;break}}T=T.previousSibling}}(!y&&v!==d.parentNode||d.nextSibling!==y)&&d!==y&&(!d["s-hn"]&&d["s-ol"]&&(d["s-hn"]=d["s-ol"].parentNode.nodeName),U(v,d,y),d.nodeType===1&&(d.hidden=(r=d["s-ih"])!=null?r:!1)),d&&typeof g["s-rf"]=="function"&&g["s-rf"](d)}else d.nodeType===1&&(n&&(d["s-ih"]=(i=d.hidden)!=null?i:!1),d.hidden=!0)}}Ye&&ii(c.$elm$),w.$flags$&=-2,B.length=0}pn=void 0},ui=(e,t)=>{t&&!e.$onRenderResolve$&&t["s-p"]&&t["s-p"].push(new Promise(n=>e.$onRenderResolve$=n))},Kn=(e,t)=>{if(e.$flags$|=16,e.$flags$&4){e.$flags$|=512;return}return ui(e,e.$ancestorComponent$),Zv(()=>Pv(e,t))},Pv=(e,t)=>{const n=e.$hostElement$,a=N("scheduleUpdate",e.$cmpMeta$.$tagName$),o=e.$lazyInstance$;if(!o)throw new Error(`Can't render component <${n.tagName.toLowerCase()} /> with invalid Stencil runtime! Make sure this imported component is compiled with a \`externalRuntime: true\` flag. For more information, please refer to https://stenciljs.com/docs/custom-elements#externalruntime`);let r;return t?(e.$flags$|=256,e.$queuedListeners$&&(e.$queuedListeners$.map(([i,l])=>K(o,i,l)),e.$queuedListeners$=void 0),r=K(o,"componentWillLoad")):r=K(o,"componentWillUpdate"),a(),Dv(r,()=>Ov(e,o,t))},Dv=(e,t)=>qv(e)?e.then(t):t(),qv=e=>e instanceof Promise||e&&e.then&&typeof e.then=="function",Ov=async(e,t,n)=>{var a;const o=e.$hostElement$,r=N("update",e.$cmpMeta$.$tagName$),i=o["s-rc"];n&&kv(e);const l=N("render",e.$cmpMeta$.$tagName$);Mv(e,t,o,n),i&&(i.map(s=>s()),o["s-rc"]=void 0),l(),r();{const s=(a=o["s-p"])!=null?a:[],u=()=>Cv(e);s.length===0?u():(Promise.all(s).then(u),e.$flags$|=4,s.length=0)}},Mv=(e,t,n,a)=>{try{t=t.render&&t.render(),e.$flags$&=-17,e.$flags$|=2,Ev(e,t,a)}catch(o){H(o,e.$hostElement$)}return null},Cv=e=>{const t=e.$cmpMeta$.$tagName$,n=e.$hostElement$,a=N("postUpdate",t),o=e.$lazyInstance$,r=e.$ancestorComponent$;K(o,"componentDidRender"),e.$flags$&64?(K(o,"componentDidUpdate"),a()):(e.$flags$|=64,di(n),K(o,"componentDidLoad"),a(),e.$onReadyResolve$(n),r||pi()),e.$onInstanceResolve$(n),e.$onRenderResolve$&&(e.$onRenderResolve$(),e.$onRenderResolve$=void 0),e.$flags$&512&&Jn(()=>Kn(e,!1)),e.$flags$&=-517},pi=e=>{di(E.documentElement),Jn(()=>Zr(Ee,"appload",{detail:{namespace:iv}}))},K=(e,t,n)=>{if(e&&e[t])try{return e[t](n)}catch(a){H(a)}},di=e=>{var t;return e.classList.add((t=Fn.hydratedSelectorName)!=null?t:"hydrated")},Lv=(e,t)=>G(e).$instanceValues$.get(t),Rv=(e,t,n,a)=>{const o=G(e);if(!o)throw new Error(`Couldn't find host element for "${a.$tagName$}" as it is unknown to this Stencil runtime. This usually happens when integrating a 3rd party Stencil component with another Stencil component or application. Please reach out to the maintainers of the 3rd party Stencil component or report this on the Stencil Discord server (https://chat.stenciljs.com) or comment on this similar [GitHub issue](https://github.com/ionic-team/stencil/issues/5457).`);const r=o.$hostElement$,i=o.$instanceValues$.get(t),l=o.$flags$,s=o.$lazyInstance$;n=Tv(n,a.$members$[t][0]);const u=Number.isNaN(i)&&Number.isNaN(n),c=n!==i&&!u;if((!(l&8)||i===void 0)&&c&&(o.$instanceValues$.set(t,n),s)){if(a.$watchers$&&l&128){const p=a.$watchers$[t];p&&p.map(d=>{try{s[d](n,i,t)}catch(g){H(g,r)}})}if((l&18)===2){if(s.componentShouldUpdate&&s.componentShouldUpdate(n,i,t)===!1)return;Kn(o,!1)}}},gi=(e,t,n)=>{var a;const o=e.prototype;if(t.$members$){e.watchers&&(t.$watchers$=e.watchers);const r=Object.entries(t.$members$);if(r.map(([i,[l]])=>{l&31||n&2&&l&32?Object.defineProperty(o,i,{get(){return Lv(this,i)},set(s){Rv(this,i,s,t)},configurable:!0,enumerable:!0}):n&1&&l&64&&Object.defineProperty(o,i,{value(...s){var u;const c=G(this);return(u=c==null?void 0:c.$onInstancePromise$)==null?void 0:u.then(()=>{var p;return(p=c.$lazyInstance$)==null?void 0:p[i](...s)})}})}),n&1){const i=new Map;o.attributeChangedCallback=function(l,s,u){w.jmp(()=>{var c;const p=i.get(l);if(this.hasOwnProperty(p))u=this[p],delete this[p];else{if(o.hasOwnProperty(p)&&typeof this[p]=="number"&&this[p]==u)return;if(p==null){const d=G(this),g=d==null?void 0:d.$flags$;if(g&&!(g&8)&&g&128&&u!==s){const v=d.$lazyInstance$,y=(c=t.$watchers$)==null?void 0:c[l];y==null||y.forEach(T=>{v[T]!=null&&v[T].call(v,u,s,l)})}return}}this[p]=u===null&&typeof this[p]=="boolean"?!1:u})},e.observedAttributes=Array.from(new Set([...Object.keys((a=t.$watchers$)!=null?a:{}),...r.filter(([l,s])=>s[0]&15).map(([l,s])=>{var u;const c=s[1]||l;return i.set(c,l),s[0]&512&&((u=t.$attrsToReflect$)==null||u.push([l,c])),c})]))}}return e},_v=async(e,t,n,a)=>{let o;if(!(t.$flags$&32)){if(t.$flags$|=32,n.$lazyBundleId$){const s=Gv(n);if(s&&"then"in s){const c=mv();o=await s,c()}else o=s;if(!o)throw new Error(`Constructor for "${n.$tagName$}#${t.$modeName$}" was not found`);o.isProxied||(n.$watchers$=o.watchers,gi(o,n,2),o.isProxied=!0);const u=N("createInstance",n.$tagName$);t.$flags$|=8;try{new o(t)}catch(c){H(c)}t.$flags$&=-9,t.$flags$|=128,u()}else{o=e.constructor;const s=e.localName;customElements.whenDefined(s).then(()=>t.$flags$|=128)}if(o&&o.style){let s=o.style;const u=Qr(n);if(!Xe.has(u)){const c=N("registerStyles",n.$tagName$);wv(u,s,!!(n.$flags$&1)),c()}}}const r=t.$ancestorComponent$,i=()=>Kn(t,!0);r&&r["s-rc"]?r["s-rc"].push(i):i()},zv=e=>{},jv=e=>{if(!(w.$flags$&1)){const t=G(e),n=t.$cmpMeta$,a=N("connectedCallback",n.$tagName$);if(t.$flags$&1)mi(e,t,n.$listeners$),t!=null&&t.$lazyInstance$||t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>zv());else{t.$flags$|=1,n.$flags$&12&&Bv(e);{let o=e;for(;o=o.parentNode||o.host;)if(o["s-p"]){ui(t,t.$ancestorComponent$=o);break}}n.$members$&&Object.entries(n.$members$).map(([o,[r]])=>{if(r&31&&e.hasOwnProperty(o)){const i=e[o];delete e[o],e[o]=i}}),_v(e,t,n)}a()}},Bv=e=>{const t=e["s-cr"]=E.createComment("");t["s-cn"]=!0,U(e,t,e.firstChild)},Do=e=>{K(e,"disconnectedCallback")},Hv=async e=>{if(!(w.$flags$&1)){const t=G(e);t.$rmListeners$&&(t.$rmListeners$.map(n=>n()),t.$rmListeners$=void 0),t!=null&&t.$lazyInstance$?Do(t.$lazyInstance$):t!=null&&t.$onReadyPromise$&&t.$onReadyPromise$.then(()=>Do(t.$lazyInstance$))}},Fv=(e,t={})=>{var n;const a=N(),o=[],r=t.exclude||[],i=Ee.customElements,l=E.head,s=l.querySelector("meta[charset]"),u=E.createElement("style"),c=[];let p,d=!0;Object.assign(w,t),w.$resourcesUrl$=new URL(t.resourcesUrl||"./",E.baseURI).href;let g=!1;if(e.map(v=>{v[1].map(y=>{var T;const m={$flags$:y[0],$tagName$:y[1],$members$:y[2],$listeners$:y[3]};m.$flags$&4&&(g=!0),m.$members$=y[2],m.$listeners$=y[3],m.$attrsToReflect$=[],m.$watchers$=(T=y[4])!=null?T:{};const f=m.$tagName$,h=class extends HTMLElement{constructor(b){super(b),b=this,Uv(b,m),m.$flags$&1&&b.attachShadow({mode:"open"})}connectedCallback(){p&&(clearTimeout(p),p=null),d?c.push(this):w.jmp(()=>jv(this))}disconnectedCallback(){w.jmp(()=>Hv(this))}componentOnReady(){return G(this).$onReadyPromise$}};m.$lazyBundleId$=v[0],!r.includes(f)&&!i.get(f)&&(o.push(f),i.define(f,gi(h,m,1)))})}),o.length>0&&(g&&(u.textContent+=Jr),u.textContent+=o+fv,u.innerHTML.length)){u.setAttribute("data-styles","");const v=(n=w.$nonce$)!=null?n:Kr(E);v!=null&&u.setAttribute("nonce",v),l.insertBefore(u,s?s.nextSibling:l.firstChild)}d=!1,c.length?c.map(v=>v.connectedCallback()):w.jmp(()=>p=setTimeout(pi,30)),a()},mi=(e,t,n,a)=>{n&&n.map(([o,r,i])=>{const l=Vv(e,o),s=Nv(t,i),u=Wv(o);w.ael(l,r,s,u),(t.$rmListeners$=t.$rmListeners$||[]).push(()=>w.rel(l,r,s,u))})},Nv=(e,t)=>n=>{var a;try{e.$flags$&256?(a=e.$lazyInstance$)==null||a[t](n):(e.$queuedListeners$=e.$queuedListeners$||[]).push([t,n])}catch(o){H(o)}},Vv=(e,t)=>t&8?Ee:e,Wv=e=>Kv?{passive:(e&1)!==0,capture:(e&2)!==0}:(e&2)!==0,Yn=new WeakMap,G=e=>Yn.get(e),cy=(e,t)=>Yn.set(t.$lazyInstance$=e,t),Uv=(e,t)=>{const n={$flags$:0,$hostElement$:e,$cmpMeta$:t,$instanceValues$:new Map};return n.$onInstancePromise$=new Promise(a=>n.$onInstanceResolve$=a),n.$onReadyPromise$=new Promise(a=>n.$onReadyResolve$=a),e["s-p"]=[],e["s-rc"]=[],mi(e,n,t.$listeners$),Yn.set(e,n)},qo=(e,t)=>t in e,H=(e,t)=>(0,console.error)(e,t),Vt=new Map,Gv=(e,t,n)=>{const a=e.$tagName$.replace(/-/g,"_"),o=e.$lazyBundleId$;if(!o)return;const r=Vt.get(o);if(r)return r[a];{const i=l=>(Vt.set(o,l),l[a]);switch(o){case"mg-action-more_36":return dt(()=>import("./mg-action-more_36.entry-m4JCIYfR.js"),__vite__mapDeps([0,1,2,3,4,5]),import.meta.url).then(i,H);case"mg-loader":return dt(()=>import("./mg-loader.entry-DZljuGC7.js"),__vite__mapDeps([6,1,2,3,4,5]),import.meta.url).then(i,H)}}return dt(()=>import(`./${o}.entry.js`),[],import.meta.url).then(i=>(Vt.set(o,i),i[a]),H)},Xe=new Map,Ee=typeof window<"u"?window:{},E=Ee.document||{head:{}},w={$flags$:0,$resourcesUrl$:"",jmp:e=>e(),raf:e=>requestAnimationFrame(e),ael:(e,t,n,a)=>e.addEventListener(t,n,a),rel:(e,t,n,a)=>e.removeEventListener(t,n,a),ce:(e,t)=>new CustomEvent(e,t)},Kv=(()=>{let e=!1;try{E.addEventListener("e",null,Object.defineProperty({},"passive",{get(){e=!0}}))}catch{}return e})(),Yv=e=>Promise.resolve(e),Jv=(()=>{try{return new CSSStyleSheet,typeof new CSSStyleSheet().replaceSync=="function"}catch{}return!1})(),dn=!1,Oo=[],fi=[],Xv=(e,t)=>n=>{e.push(n),dn||(dn=!0,w.$flags$&4?Jn(gn):w.raf(gn))},Mo=e=>{for(let t=0;t<e.length;t++)try{e[t](performance.now())}catch(n){H(n)}e.length=0},gn=()=>{Mo(Oo),Mo(fi),(dn=Oo.length>0)&&w.raf(gn)},Jn=e=>Yv().then(e),Zv=Xv(fi);const Qv=()=>{},ey=async(e,t)=>{if(!(typeof window>"u"))return await Qv(),Fv(JSON.parse('[["mg-action-more_36",[[1,"mg-input-checkbox",{"value":[1040],"type":[1025],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"displaySelectedValues":[4,"display-selected-values"],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"checkboxItems":[32],"displaySearchInput":[32],"searchValue":[32],"searchResults":[32],"selectValuesButtonKey":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"type":["validateType"],"inputVerticalList":["watchInputVerticalList"],"readonly":["watchReadonly","handleValidityChange"],"displaySelectedValues":["watchDisplaySelectedValues"],"required":["handleValidityChange"],"disabled":["handleValidityChange","validateDisabled"],"checkboxItems":["validateCheckboxItems"],"displaySearchInput":["watchDisplaySearchInput"],"searchValue":["validateSearchValue"]}],[1,"mg-action-more",{"items":[16],"icon":[1040],"button":[16],"displayChevron":[4,"display-chevron"],"expanded":[32]},null,{"items":["validateItems"],"icon":["validateIcon"],"button":["validateButton"],"displayChevron":["validateDisplayChevron"]}],[1,"mg-panel",{"identifier":[1],"panelTitle":[1025,"panel-title"],"titlePattern":[1,"title-pattern"],"titlePatternErrorMessage":[1,"title-pattern-error-message"],"titleEditable":[1028,"title-editable"],"titlePosition":[1,"title-position"],"expanded":[1028],"expandToggleDisplay":[1,"expand-toggle-display"],"expandToggleDisabled":[4,"expand-toggle-disabled"],"classCollection":[32],"isEditing":[32],"updatedPanelTitle":[32]},null,{"panelTitle":["validatePanelTitle"],"titlePattern":["validateTitlePattern"],"titlePatternErrorMessage":["validateTitlePattern"],"titlePosition":["validateTitlePosition"],"expanded":["handleExpanded"],"expandToggleDisplay":["validateExpandToggleDisplay"]}],[1,"mg-input-password",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayPassword":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"]}],[1,"mg-input-textarea",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"rows":[2],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"resizable":[1],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","validateDisabled"],"mgWidth":["watchMgWidth"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"],"displayCharacterLeft":["validateDisplayCharacterLeft"]}],[1,"mg-input-date",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"required":[4],"readonly":[4],"min":[1],"max":[1],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"readonly":["watchReadonly","handleValidityChange"],"min":["validateMinMax","handleValidityChange"],"max":["validateMinMax","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"]}],[1,"mg-input-numeric",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"required":[4],"readonly":[4],"max":[2],"min":[2],"disabled":[4],"mgWidth":[8,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"type":[1],"format":[1025],"currency":[1],"integerLength":[2,"integer-length"],"decimalLength":[2,"decimal-length"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"hasFocus":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"min":["handleValidityChange"],"max":["handleValidityChange"],"mgWidth":["watchMgWidth"],"type":["validateType"],"format":["watchFormat"],"integerLength":["validateIntegerLength"],"decimalLength":["validateDecimalLength"]}],[1,"mg-input-radio",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"inputVerticalList":[4,"input-vertical-list"],"required":[4],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"items":["validateItems"],"inputVerticalList":["watchInputVerticalList"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"]}],[1,"mg-input-toggle",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"isOnOff":[4,"is-on-off"],"isIcon":[4,"is-icon"],"readonly":[4],"disabled":[4],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"classCollection":[32],"options":[32],"errorMessage":[32],"valid":[32],"checked":[32],"setError":[64]},null,{"value":["handleValue"],"items":["validateItems"],"isOnOff":["watchIsOnOff"],"isIcon":["watchIsIcon"],"readonly":["watchReadonly"],"disabled":["watchDisabled"],"checked":["handleChecked"]}],[1,"mg-message",{"identifier":[1],"delay":[2],"variant":[1],"closeButton":[1028,"close-button"],"hide":[1028],"noAriaRole":[4,"no-aria-role"],"classCollection":[32],"hasActions":[32]},null,{"delay":["validateDelay"],"variant":["validateVariant"],"closeButton":["validateCloseButton"],"hide":["validateHide"]}],[1,"mg-modal",{"identifier":[1],"dialogRole":[1,"dialog-role"],"modalTitle":[1,"modal-title"],"closeButton":[4,"close-button"],"hide":[1028],"hasActions":[32],"hasContent":[32],"classCollection":[32]},[[8,"keydown","handleKeyDown"]],{"dialogRole":["validateDialogRole"],"modalTitle":["validateModalTitle"],"hide":["validateHide"]}],[1,"mg-tabs",{"identifier":[1],"label":[1],"size":[1],"items":[16],"activeTab":[1538,"active-tab"],"tabs":[32],"classCollection":[32]},null,{"label":["validateLabel"],"size":["validateSize"],"items":["validateItems"],"activeTab":["validateActiveTab"]}],[1,"mg-details",{"toggleClosed":[1,"toggle-closed"],"toggleOpened":[1,"toggle-opened"],"hideSummary":[4,"hide-summary"],"expanded":[1028]},null,{"toggleClosed":["validateTitles"],"toggleOpened":["validateTitles"],"expanded":["handleExpanded"]}],[1,"mg-divider",{"size":[1]}],[1,"mg-form",{"identifier":[1],"name":[1],"readonly":[4],"requiredMessage":[1,"required-message"],"ariaRole":[1,"aria-role"],"labelOnTop":[4,"label-on-top"],"disabled":[4],"valid":[1028],"invalid":[1028],"classCollection":[32],"requiredMessageText":[32],"displayError":[64]},null,{"requiredMessage":["validateRequiredMessage","handleAttributeChange"],"ariaRole":["validateAriaRole"],"labelOnTop":["handlelabelOnTop"],"readonly":["handleAttributeChange"],"disabled":["handleAttributeChange"]}],[1,"mg-illustrated-message",{"size":[1],"direction":[1]}],[1,"mg-skip-links",{"links":[16]},null,{"links":["validateLinks"]}],[1,"mg-tag",{"variant":[1],"outline":[4],"soft":[4],"classCollection":[32]},null,{"variant":["validateVariant"],"outline":["validateOutline"],"soft":["validateSoft"]}],[2,"mg-input-checkbox-paginated",{"readonly":[4],"disabled":[4],"name":[1],"invalid":[4],"currentPage":[1026,"current-page"],"checkboxes":[16],"sectionKind":[1,"section-kind"],"messages":[16],"titleKind":[32],"expanded":[32]},null,{"checkboxes":["validateCheckboxes"],"sectionKind":["validateSectionKind"]}],[1,"mg-pagination",{"identifier":[1],"label":[1025],"hideNavigationLabels":[4,"hide-navigation-labels"],"hidePageCount":[4,"hide-page-count"],"totalPages":[2,"total-pages"],"currentPage":[1538,"current-page"]},null,{"totalPages":["validateTotalPages"],"currentPage":["validateCurrentPage"]}],[1,"mg-input-text",{"value":[1537],"identifier":[1],"name":[1],"label":[1],"type":[1],"icon":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1],"datalistoptions":[16],"maxlength":[2],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[8,"mg-width"],"pattern":[1],"patternErrorMessage":[1,"pattern-error-message"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"displayCharacterLeft":[4,"display-character-left"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"setFocus":[64],"displayError":[64],"setError":[64]},null,{"value":["handleValue"],"icon":["validateIcon"],"datalistoptions":["validateDatalistoptions"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"],"pattern":["validatePattern"],"patternErrorMessage":["validatePattern"]}],[1,"mg-item-more",{"icon":[16],"slotlabel":[16],"size":[1],"parentMenu":[32]},null,{"icon":["validateIcon"],"slotlabel":["validateSlotLabel"],"size":["validateSize"]}],[1,"mg-menu",{"label":[1],"direction":[513],"itemmore":[16],"size":[1],"isChildMenu":[32]},null,{"label":["validateLabel"],"direction":["validateDirection"],"itemmore":["validateItemMore"],"size":["validateSize"]}],[1,"mg-menu-item",{"identifier":[1],"href":[1],"target":[1],"status":[1537],"expanded":[1028],"size":[32],"navigationButtonClassList":[32],"direction":[32],"isInMainMenu":[32],"isItemMore":[32],"hasChildren":[32],"displayNotificationBadge":[32]},null,{"target":["watchTarget"],"status":["validateStatus"],"expanded":["validateExpanded"],"size":["validateSize"],"direction":["validateDirection"],"hasChildren":["validateHasChildren"]}],[1,"mg-input-select",{"value":[1032],"items":[16],"identifier":[1],"name":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"placeholder":[1025],"placeholderHide":[4,"placeholder-hide"],"placeholderDisabled":[4,"placeholder-disabled"],"required":[4],"readonly":[4],"disabled":[4],"mgWidth":[520,"mg-width"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"helpText":[1,"help-text"],"valid":[1028],"invalid":[1028],"classCollection":[32],"errorMessage":[32],"options":[32],"valueExist":[32],"readonlyValue":[32],"displayError":[64],"setError":[64]},null,{"value":["validateValue"],"items":["validateItems"],"readonly":["watchReadonly","handleValidityChange"],"required":["handleValidityChange"],"disabled":["handleValidityChange","watchDisabled"],"mgWidth":["watchMgWidth"]}],[2,"mg-character-left",{"identifier":[1],"characters":[1],"maxlength":[2]},null,{"maxlength":["validateMaxlength"]}],[1,"mg-popover",{"identifier":[1],"placement":[1],"arrowHide":[4,"arrow-hide"],"closeButton":[4,"close-button"],"display":[1028],"disabled":[4]},null,{"identifier":["validateIdentifier"],"arrowHide":["validateArrowHide"],"closeButton":["validateCloseButton"],"display":["handleDisplay"]}],[1,"mg-badge",{"value":[8],"label":[1],"variant":[1],"outline":[4],"classCollection":[32]},null,{"value":["validateValue"],"label":["validateLabel"],"variant":["validateVariant"],"outline":["validateOutline"]}],[1,"mg-popover-content",{"closeButton":[4,"close-button"],"classCollection":[32]}],[1,"mg-card",{"variant":[1],"variantStyle":[1025,"variant-style"],"classCollection":[32]},null,{"variant":["validateVariant"],"variantStyle":["validateVariantStyle"]}],[1,"mg-input",{"identifier":[1],"label":[1],"labelOnTop":[4,"label-on-top"],"labelHide":[4,"label-hide"],"tooltip":[1],"tooltipPosition":[1,"tooltip-position"],"required":[4],"readonlyValue":[1,"readonly-value"],"errorMessage":[1,"error-message"],"helpText":[1,"help-text"],"ariaDescribedbyIDs":[16],"isFieldset":[32],"isReadonly":[32],"isDisabled":[32],"isVerticalList":[32]},null,{"identifier":["watchIdentifier","watchAriaDescribedbyIDs"],"labelOnTop":["watchLabelOnTop","watchLabelConfig"],"labelHide":["watchLabelConfig"],"tooltipPosition":["watchTooltipPosition"],"errorMessage":["watchErrorMessage","watchAriaDescribedbyIDs"],"helpText":["watchHelpText","watchAriaDescribedbyIDs"],"ariaDescribedbyIDs":["watchAriaDescribedbyIDs"],"class":["watchClass","watchLabel"],"label":["watchLabel"]}],[1,"mg-button",{"variant":[1],"identifier":[1],"label":[1],"type":[1],"fullWidth":[4,"full-width"],"form":[1],"disabled":[1028],"isIcon":[4,"is-icon"],"disableOnClick":[4,"disable-on-click"],"loading":[32],"classCollection":[32]},null,{"variant":["validateVariant"],"fullWidth":["validateFullWidth"],"disabled":["disabledHandler"],"loading":["loadingHandler"]}],[1,"mg-tooltip",{"identifier":[1],"message":[1],"placement":[1],"display":[1028],"disabled":[4]},null,{"identifier":["watchIdentifier"],"message":["watchMessage"],"display":["watchDisplay"],"disabled":["watchDisabled"]}],[6,"mg-input-title",{"identifier":[1],"required":[4],"readonly":[4],"isLegend":[4,"is-legend"],"tagName":[32]},null,{"identifier":["validateIdentifier"],"isLegend":["validateIsLegend"]}],[1,"mg-tooltip-content",{"message":[1]}],[1,"mg-icon",{"icon":[1],"size":[1],"variant":[1],"variantStyle":[1025,"variant-style"],"spin":[4],"classCollection":[32]},null,{"icon":["validateIcon"],"size":["validateSize"],"variant":["validateVariant"],"variantStyle":["validateVariantStyle"],"spin":["handleSpin"]}]]],["mg-loader",[[1,"mg-loader",{"message":[1],"messageHide":[4,"message-hide"]},null,{"message":["watchMessage"]}]]]]'),t)};(function(){if(typeof window<"u"&&window.Reflect!==void 0&&window.customElements!==void 0){var e=HTMLElement;window.HTMLElement=function(){return Reflect.construct(e,[],this.constructor)},HTMLElement.prototype=e.prototype,HTMLElement.prototype.constructor=HTMLElement,Object.setPrototypeOf(HTMLElement,e)}})();ey();Ne.setStencilDocJson(rv);const ty={controls:{matchers:{color:/(background|color)$/i,date:/Date$/}},docs:{extractArgTypes:Ne.extractArgTypes,extractComponentDescription:Ne.extractComponentDescription,transformSource:(e,t)=>bi(t.originalStoryFn(t.args))},options:{storySort:{order:["Intro","Atoms","Molecules","Style"]}}},ny={locale:{name:"Locale",description:"Internationalization locale",toolbar:{icon:"globe",items:[{value:"en",title:"English"},{value:"fr",title:"Français"}],showName:!0}}},ay=[Ti,ev],uy=Object.freeze(Object.defineProperty({__proto__:null,decorators:ay,globalTypes:ny,parameters:ty},Symbol.toStringTag,{value:"Module"}));export{vv as H,sy as c,xv as g,Xr as h,uy as p,cy as r};
