(this["webpackJsonpmemory-game"]=this["webpackJsonpmemory-game"]||[]).push([[0],{13:function(e,t,c){},14:function(e,t,c){},15:function(e,t,c){},17:function(e,t,c){"use strict";c.r(t);var n=c(0),a=c.n(n),r=c(8),o=c.n(r),i=(c(13),c(4)),l=c(7),s=c(2),u=(c(14),c(15),c(1)),d=function(e){var t=e.image,c=e.handleChoice,n=e.flipped,a=e.disabled,r=e.scale,o=e.breakPoint,i={flex:"0 1 calc(11rem * ".concat(r,")")},l={flex:"0 1 calc(16rem * ".concat(r,")")},s={flex:"0 1 calc(18rem * ".concat(r,")")},d={flex:"0 1 calc(24rem * ".concat(r,")")},m={maxHeight:"calc(9rem * ".concat(r,")"),maxWidth:"calc(11rem * ".concat(r,")")},b={maxHeight:"calc(12.5rem * ".concat(r,")"),maxWidth:"calc(16rem * ".concat(r,")")},f={maxHeight:"calc(14rem * ".concat(r,")"),maxWidth:"calc(18rem * ".concat(r,")")},j={maxHeight:"calc(18rem * ".concat(r,")"),maxWidth:"calc(24rem * ".concat(r,")")};return Object(u.jsx)("div",{style:"mobile"===o&&i||"tablet"===o&&l||"laptop"===o&&s||"desktop"===o&&d,className:"card",children:Object(u.jsxs)("div",{className:n?"flipped":"",children:[Object(u.jsx)("img",{decoding:"async",className:"front",src:t.src,alt:"card front",style:"mobile"===o&&m||"tablet"===o&&b||"laptop"===o&&f||"desktop"===o&&j}),Object(u.jsx)("img",{className:"back",src:"https://www.logopik.com/wp-content/uploads/edd/2018/07/Pokeball-Vector-Logo.png",alt:"card caver",onClick:function(){a||c(t)}})]})})};var m=function(e,t){var c=Object(n.useState)((function(){try{var c=window.localStorage.getItem(e);return c?JSON.parse(c):t}catch(n){return console.log(n),t}})),a=Object(s.a)(c,2),r=a[0],o=a[1];return[r,function(t){try{var c=t instanceof Function?t(r):t;o(c),window.localStorage.setItem(e,JSON.stringify(c))}catch(n){console.log(n)}}]};function b(e,t){for(var c=0,n=Object.keys(e);c<n.length;c++){var a=n[c];window.matchMedia("".concat(e[a])).matches&&t(a)}}var f={mobile:"(max-width:600px)",tablet:"(min-width:600px) and (max-width:900px)",laptop:"(min-width:901px) and (max-width:1281px)",desktop:"(min-width:1282px)"};var j=function(){var e=Object(n.useState)(),t=Object(s.a)(e,2),c=t[0],a=t[1];Object(n.useEffect)((function(){!function(e,t){b(e,t),window.addEventListener("resize",(function(){b(e,t)}))}(f,a)}),[c]);var r=Object(n.useState)([]),o=Object(s.a)(r,2),j=o[0],h=o[1],O=Object(n.useState)([]),p=Object(s.a)(O,2),x=p[0],v=p[1],g=Object(n.useState)(0),w=Object(s.a)(g,2),S=w[0],k=w[1],y=Object(n.useState)(null),N=Object(s.a)(y,2),M=N[0],E=N[1],T=Object(n.useState)(null),C=Object(s.a)(T,2),J=C[0],L=C[1],P=Object(n.useState)(!1),H=Object(s.a)(P,2),I=H[0],W=H[1],G=m("level",1),z=Object(s.a)(G,2),A=z[0],B=z[1],F=m("levelLength",3),V=Object(s.a)(F,2),q=V[0],D=V[1],K=Object(n.useState)("Memory Game"),Q=Object(s.a)(K,2),R=Q[0],U=Q[1],X=Object(n.useState)(!1),Y=Object(s.a)(X,2),Z=Y[0],$=Y[1],_=m("scale",1),ee=Object(s.a)(_,2),te=ee[0],ce=ee[1],ne=m("score",0),ae=Object(s.a)(ne,2),re=ae[0],oe=ae[1];Object(n.useMemo)((function(){for(var e=[],t=0;t<q;t++)e[t]={src:"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/".concat(Math.floor(648*Math.random()+1),".svg"),matched:!1};h(e)}),[q]);var ie=function(){for(var e,t,c=[].concat(Object(l.a)(j),Object(l.a)(j)),n=c.length;n;)t=Math.floor(Math.random()*n--),e=c[n],c[n]=c[t],c[t]=e;var a=c.map((function(e){return Object(i.a)(Object(i.a)({},e),{},{id:Math.floor(1e3*Math.random())})}));v(a),k(0),E(null),L(null)},le=function(e){M?L(e):E(e)};Object(n.useEffect)((function(){M&&J&&(W(!0),M.src===J.src?(v((function(e){return e.map((function(e){return e.src===M.src?Object(i.a)(Object(i.a)({},e),{},{matched:!0}):e}))})),se()):setTimeout((function(){return se()}),1e3))}),[M,J]);var se=function(){E(null),L(null),k((function(e){return e+1})),W(!1)},ue=function(){E(null),L(null),k(0),W(!1)};return Object(n.useEffect)((function(){var e=x.every((function(e){return!0===e.matched}));return S&&!0===e&&(setTimeout((function(){return $(!0)}),3e3),setTimeout((function(){return U("Good Job! Next Level")}),1500)),function(){return clearTimeout()}}),[x,S]),Object(n.useEffect)((function(){Z&&($(!1),ue(),B((function(e){return e+1})),D((function(e){return e+1})),ce((function(e){return e-.1})),oe((function(e){return e+Math.floor(x.length/2/S*100)})),ie())}),[Z]),Object(n.useEffect)((function(){return ie(),setTimeout((function(){return U("")}),3500),function(){return clearTimeout()}}),[q]),Object(u.jsxs)("div",{className:"game",children:[Object(u.jsxs)("div",{className:"heder",children:[" ",R]}),Object(u.jsxs)("div",{className:"game-data",children:[Object(u.jsxs)("div",{children:["Turns:",S]}),Object(u.jsxs)("div",{children:["Level:",A]}),Object(u.jsxs)("div",{children:["Score:",re]}),Object(u.jsx)("span",{className:"btn",onClick:function(){window.localStorage.clear(),$(!1),ue(),B(1),D(3),ce(1),oe(0),ie()},children:"Clear"})]}),Object(u.jsx)("div",{className:"card-grid",children:x.map((function(e){return Object(u.jsx)(d,{image:e,handleChoice:le,flipped:e===M||e===J||e.matched,disabled:I,scale:te,breakPoint:c},e.id)}))})]})};o.a.render(Object(u.jsx)(a.a.StrictMode,{children:Object(u.jsx)(j,{})}),document.getElementById("root"))}},[[17,1,2]]]);
//# sourceMappingURL=main.11916ba8.chunk.js.map