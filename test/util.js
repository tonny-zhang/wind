function createField(e,t,n){function r(t,n){var r=e[Math.round(t)];return r&&r[Math.round(n)]||NULL_WIND_VECTOR}return r.isDefined=function(e,t){return null!==r(e,t)[2]},r.isInsideBoundary=function(e,t){return r(e,t)!==NULL_WIND_VECTOR},r.release=function(){e=[]},r.randomize=function(e){var n,i,a=0;do{n=Math.round(_.random(t.x,t.xMax)),i=Math.round(_.random(t.y,t.yMax))}while(!r.isDefined(n,i)&&a++<30);return e.x=n,e.y=i,e},r.overlay=n.imageData,r}function createMask(e){if(!e)return null;console.time("render mask");var t=view.width,n=view.height,r=maskCanvas.getContext("2d");r.fillStyle="rgba(255, 0, 0, 1)",r.fill();var i=r.getImageData(0,0,t,n),a=i.data;return console.timeEnd("render mask"),{imageData:i,putImageData:function(){r.putImageData(i,0,0)},isVisible:function(e,t){return!0},set:function(e,n,r){var i=4*(n*t+e);return a[i]=r[0],a[i+1]=r[1],a[i+2]=r[2],a[i+3]=r[3],this}}}function distort(e,t,n,r,i,a,o){var u=o[0]*a,l=o[1]*a,s=µ.distortion(e,t,n,r,i);return o[0]=s[0]*u+s[2]*l,o[1]=s[1]*u+s[3]*l,o}function interpolateField(e,t){function n(e){for(var t=[],n=s.y;n<=s.yMax;n+=2)if(r.isVisible(e,n)){f[0]=e,f[1]=n;var i=l.invert(f),a=TRANSPARENT_BLACK,o=null;if(i){var u=i[0],v=i[1];if(isFinite(u)){o=m(u,v);var _=null;if(o){var p=d;o[0]*=p,o[1]*=p,_=o[2]}h&&(_=g(u,v)),µ.isValue(_)&&(a=M.gradient(_,OVERLAY_ALPHA))}}t[n+1]=t[n]=o||HOLE_VECTOR,r.set(e,n,a).set(e+1,n,a).set(e,n+1,a).set(e+1,n+1,a)}c[e+1]=c[e]=t}if(!e||!t)return null;var r=createMask(e),i=t.primaryGrid,a=t.overlayGrid;console.time("interpolating field");var o=when.defer(),u=this.cancel,l=e.projection,s=e.bounds(view),d=s.height*i.particles.velocityScale,c=[],f=[],v=s.x,m=i.interpolate,g=a.interpolate,h=i!==a,M=a.scale;return function e(){try{if(!u.requested)for(var t=Date.now();v<s.xMax;)if(n(v),v+=2,Date.now()-t>MAX_TASK_TIME)return void setTimeout(e,MIN_SLEEP_TIME);r.putImageData(),o.resolve(createField(c,s,r))}catch(e){o.reject(e)}console.timeEnd("interpolating field")}(),o.promise}