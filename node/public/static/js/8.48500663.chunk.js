(this.webpackJsonprewer=this.webpackJsonprewer||[]).push([[8],{102:function(e,t,a){"use strict";a.d(t,"a",(function(){return i}));var n=a(0),r=a.n(n),c=a(12),l=a(56),s=(a(71),function(e){var t=e.article,a=e.cutPos,s=Object(l.g)("/rewer/uploads/articles","".concat(t.id,".jpg"),l.a.Normal),i=Object(c.a)(s,2),o=i[0],u=i[1],m=Object(l.f)(t.text,a),f=Object(c.a)(m,3),d=f[0],p=f[1],E=f[2];return r.a.createElement("div",{className:"article-side-row"},r.a.createElement("img",{src:o,onError:u,alt:"".concat(t.title)}),r.a.createElement("h3",null,t.title),r.a.createElement("p",null,d),p?r.a.createElement(n.Fragment,null,r.a.createElement("p",{onClick:function(){E(t.text)},className:"show-more"},"Show more")):r.a.createElement(n.Fragment,null,t.text.length>a?r.a.createElement(n.Fragment,null,r.a.createElement("p",{className:"show-more",onClick:function(){E(t.text,a)}},"Show less")):r.a.createElement(n.Fragment,null)),null!=t.readMore&&t.readMore.length>10?r.a.createElement("a",{href:t.readMore,target:"blank"},"Full article"):r.a.createElement(n.Fragment,null))}),i=function(e){var t=e.articles,a=e.cutPos;return r.a.createElement(n.Fragment,null,t.map((function(e){return r.a.createElement(s,{key:"side-article-".concat(e.id),article:e,cutPos:a})})))};t.b=i},112:function(e,t,a){"use strict";a.r(t),a.d(t,"default",(function(){return P}));var n=a(2),r=a.n(n),c=a(3),l=a(12),s=a(0),i=a.n(s),o=a(20),u=a(27),m=a(70),f=a(11),d=(a(58),a(64)),p=a(4),E=a(6),v=function(e){var t=e.movies,a=e.onHover,n=Object(s.useRef)(),r=Object(s.useRef)(),c=Object(s.useState)(t.slice(0,3)),o=Object(l.a)(c,2),u=o[0],m=o[1],v=Object(s.useState)(0),b=Object(l.a)(v,2),g=b[0],h=b[1];return Object(s.useEffect)((function(){m(t.slice(0,3)),t.length<=3?(n.current.style.visibility="hidden",r.current.style.visibility="hidden"):(n.current.style.visibility="visible",r.current.style.visibility="visible")}),[t]),Object(s.useEffect)((function(){m(t.slice(3*g,3*g+3))}),[g]),i.a.createElement(s.Fragment,null,i.a.createElement("div",{className:"slide-grid"},i.a.createElement("button",{ref:n,className:"slide-btn",onClick:function(){h(g-1<0?Math.ceil(t.length/3)-1:function(e){return e-1})}},i.a.createElement(p.a,{icon:E.a})),i.a.createElement("div",{className:"movie-grid"},u.map((function(e){return i.a.createElement(f.b,{onMouseEnter:function(){a(e)},key:"latest-".concat(e.id),to:"/rewer/movie?movieId=".concat(e.id),className:"movie-anchor"},i.a.createElement(d.a,{movie:e}))}))),i.a.createElement("button",{ref:r,className:"slide-btn",onClick:function(){3*(g+1)>=t.length?h(0):h((function(e){return e+1}))}},i.a.createElement(p.a,{icon:E.f}))))},b=v,g=a(59),h=a(13),j=function(e){var t=e.onMovieUpdate,a=Object(s.useState)([]),n=Object(l.a)(a,2),d=n[0],p=n[1],E=Object(s.useState)({id:0,title:"",summary:"",casts:[],genres:[],releaseDate:""}),v=Object(l.a)(E,2),j=v[0],O=v[1],w=Object(h.postCaller)({limit:9},g.b.selectLatestMovies),y=Object(l.a)(w,2),N=y[0],S=y[1],k=Object(s.useState)([]),I=Object(l.a)(k,2),C=I[0],x=I[1],F=Object(s.useState)([]),_=Object(l.a)(F,2),T=_[0],D=_[1];return Object(s.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,N();case 2:(t=e.sent)&&(p(t.slice(0,9)),O(t[0]));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(){e.apply(this,arguments)}(),function(){S.abort()}}),[]),Object(s.useEffect)((function(){t&&t(function(){var e,t=[],a=Object(u.a)(d);try{for(a.s();!(e=a.n()).done;){var n=e.value;t=[].concat(Object(o.a)(t),Object(o.a)(n.casts))}}catch(r){a.e(r)}finally{a.f()}return t}())}),[d]),Object(s.useEffect)((function(){null==j||null==j.casts?(x([]),D([])):(x(j.casts.filter((function(e){return 1===e.castTypeId}))),D(j.casts.filter((function(e){return e.castTypeId>3})).slice(0,5)))}),[j]),i.a.createElement("div",null,window.screen.width>600?i.a.createElement(s.Fragment,null,i.a.createElement("div",{className:"highlight-grid"},i.a.createElement(b,{movies:d,onHover:function(e){O(e)}}),i.a.createElement("div",{className:"highlighted-movie fade"},i.a.createElement("h3",null,j.title),i.a.createElement("p",{className:"highlight-text"},j.summary),i.a.createElement("p",null,i.a.createElement("span",null,"Directed by: "),C.filter((function(e){return 1===e.castTypeId})).map((function(e){return i.a.createElement(f.b,{key:"latest-".concat(e.artistId),to:"/rewer/star?artistId=".concat(e.artistId)},e.artistName,e.id!==C[C.length-1].id?i.a.createElement("span",null,", "):i.a.createElement(s.Fragment,null))}))),i.a.createElement("p",null,i.a.createElement("span",null,"Starring: "),T.map((function(e){return i.a.createElement(f.b,{key:"latest-".concat(e.artistId),to:"/rewer/star?artistId=".concat(e.artistId)},e.artistName,e.id!==T[T.length-1].id?i.a.createElement("span",null,", "):i.a.createElement(s.Fragment,null))})))))):i.a.createElement(m.a,{movies:d}))},O=a(57);function w(){var e=Object(s.useState)([]),t=Object(l.a)(e,2),a=t[0],n=t[1],o=Object(s.useState)({id:0,title:"",summary:"",casts:[],genres:[],releaseDate:""}),u=Object(l.a)(o,2),d=u[0],p=u[1],E=Object(h.postCaller)(g.b.selectUpcomingMovies),b=Object(l.a)(E,2),j=b[0],w=b[1],y=Object(s.useState)([]),N=Object(l.a)(y,2),S=N[0],k=N[1],I=Object(s.useState)([]),C=Object(l.a)(I,2),x=C[0],F=C[1];function _(){return(_=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j({limit:3,offset:0},g.b.selectUpcomingMovies);case 2:(t=e.sent)&&(n(t),p(t[0]));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){return function(){_.apply(this,arguments)}(),function(){w.abort()}}),[]),Object(s.useEffect)((function(){null==d||null==d.casts?(k([]),F([])):(k(d.casts.filter((function(e){return 1===e.castTypeId}))),F(d.casts.filter((function(e){return e.castTypeId>3})).slice(0,5)))}),[d]),i.a.createElement("div",null,window.screen.width>600?i.a.createElement("div",{className:"highlight-grid"},i.a.createElement(v,{movies:a,onHover:function(e){p(e)}}),i.a.createElement("div",{className:"highlighted-movie fade"},i.a.createElement("h3",null,d.title),i.a.createElement("p",{className:"highlight-text"},d.summary),i.a.createElement("p",null,i.a.createElement("span",null,"Directed by: "),S.map((function(e){return i.a.createElement(f.b,{key:"upcoming-".concat(e.artistId),to:"/rewer/star?artistId=".concat(e.artistId)},e.artistName,e.id!==S[S.length-1].id?i.a.createElement("span",null,", "):i.a.createElement(s.Fragment,null)," ")}))),i.a.createElement("p",null,i.a.createElement("span",null,"Starring: "),x.map((function(e){return i.a.createElement(f.b,{key:"upcoming-".concat(e.artistId),to:"/rewer/star?artistId=".concat(e.artistId)},e.artistName,e.id!==x[x.length-1].id?i.a.createElement("span",null,", "):i.a.createElement(s.Fragment,null))}))),i.a.createElement("p",null,"Coming: ",i.a.createElement("b",null,Object(O.d)(d.releaseDate))))):i.a.createElement(m.a,{movies:a}))}var y=a(74),N=a(95),S=a(67),k=function(e){var t=e.series,a=e.onHover,n=Object(s.useRef)(),r=Object(s.useRef)(),c=Object(s.useState)([]),o=Object(l.a)(c,2),u=o[0],m=o[1],d=Object(s.useState)(0),v=Object(l.a)(d,2),b=v[0],g=v[1];return Object(s.useEffect)((function(){m(t.slice(0,3)),t.length<=3?(n.current.style.visibility="hidden",r.current.style.visibility="hidden"):(n.current.style.visibility="visible",r.current.style.visibility="visible")}),[t]),Object(s.useEffect)((function(){m(t.slice(3*b,3*b+3))}),[b]),i.a.createElement(s.Fragment,null,i.a.createElement("div",{className:"slide-grid"},i.a.createElement("button",{ref:n,className:"slide-btn",onClick:function(){g(b-1<0?Math.ceil(t.length/3)-1:function(e){return e-1})}},i.a.createElement(p.a,{icon:E.a})),i.a.createElement("div",{className:"movie-grid"},u.map((function(e){return i.a.createElement(f.b,{key:"series-".concat(e.id),onMouseEnter:function(){a(e)},className:"movie-anchor",to:"/rewer/series?seriesId=".concat(e.id)},i.a.createElement(S.a,{series:e}))}))),i.a.createElement("button",{ref:r,className:"slide-btn",onClick:function(){3*(b+1)>=t.length?g(0):g((function(e){return e+1}))}},i.a.createElement(p.a,{icon:E.f}))))},I=a(96),C=a(62);function x(){var e=Object(s.useState)([]),t=Object(l.a)(e,2),a=t[0],n=t[1],o=Object(s.useState)({id:0,title:"",summary:"",lastEpisodeId:0,lastEpisodeTitle:""}),u=Object(l.a)(o,2),m=u[0],d=u[1],p=Object(h.postCaller)({limit:9},C.i.selectLatestPreviewSeries),E=Object(l.a)(p,2),v=E[0],b=E[1];return Object(s.useEffect)((function(){function e(){return(e=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:(t=e.sent)&&(n(t.slice(0,3)),d(t[0]));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return function(){e.apply(this,arguments)}(),function(){b.abort()}}),[]),i.a.createElement("div",null,window.screen.width>800?i.a.createElement("div",{className:"highlight-grid"},i.a.createElement(k,{series:a,onHover:function(e){d(e)}}),i.a.createElement("div",{className:"highlighted-movie fade"},i.a.createElement("h3",null,m.title),i.a.createElement("p",{className:"highlight-text"},m.summary),i.a.createElement("p",null,"Last episode: "),i.a.createElement(f.b,{to:"/rewer/movie?movieId=".concat(m.lastEpisodeId)},m.lastEpisodeTitle),i.a.createElement("br",null),i.a.createElement("br",null))):i.a.createElement(s.Fragment,null,a.map((function(e){return i.a.createElement(I.a,{key:"series-row".concat(e.id),series:e})}))))}a(30);var F=a(56),_=function(e){var t=e.cast,a=Object(F.g)("/rewer/uploads/portraits","".concat(t.artistId,".jpg"),F.a.Small),n=Object(l.a)(a,2),r=n[0],c=n[1];return i.a.createElement("div",{className:"cast-row"},i.a.createElement("img",{src:r,onError:c,alt:"star-".concat(t.artistName)}),i.a.createElement(f.b,{to:"/rewer/star?artistId=".concat(t.artistId),className:"line-start"},t.artistName,": "),window.screen.width>=1280?i.a.createElement(f.b,{to:"/rewer/movie?movieId=".concat(t.movieId),className:"line-end"},t.movieName):i.a.createElement(s.Fragment,null))},T=(a(68),function(e){var t=e.casts,a=e.length,n=Object(s.useState)([]),r=Object(l.a)(n,2),c=r[0],o=r[1];return Object(s.useEffect)((function(){o(function(e){var t;t=e.length<a?e.length:a;var n,r,c=e.filter((function(e){return 4===e.castTypeId||5===e.castTypeId})),l=[];for(n=0;t>n;n++)r=c[Math.floor(Math.random()*c.length)],l.push(r),c=c.filter((function(e){return e.artistId!==r.artistId}));return l}(t))}),[t]),i.a.createElement("div",null,i.a.createElement("h3",{className:"center-text"},"Spotlight"),c.map((function(e){return i.a.createElement(_,{key:"sportlight-".concat(e.id),cast:e})})))}),D=a(87),M=a(75),L=a(92),R=a(102);function P(){var e=Object(s.useState)([]),t=Object(l.a)(e,2),a=t[0],n=t[1],o=Object(s.useState)([]),u=Object(l.a)(o,2),m=u[0],f=u[1],d=Object(h.postCaller)({limit:3,offset:0},M.a.selectLatestArticles),p=Object(l.a)(d,2),E=p[0],v=p[1];function b(){return(b=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E();case 2:(t=e.sent)&&f(t);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(s.useEffect)((function(){return document.title="Rewer",function(){b.apply(this,arguments)}(),function(){v.abort()}}),[]),i.a.createElement(s.Fragment,null,window.screen.width>800?i.a.createElement("div",{className:"home-grid"},i.a.createElement("div",{className:"main-item"},i.a.createElement("h2",{className:"main-title"},"In Theatres"),i.a.createElement(j,{onMovieUpdate:function(e){n(e)}}),i.a.createElement("h2",{className:"main-title"},"Upcoming"),i.a.createElement(w,null),i.a.createElement("h2",{className:"main-title"},"Shows with new episodes"),i.a.createElement(x,null),i.a.createElement("h2",{className:"main-title"},"Follows"),null!=localStorage.getItem("userName")?i.a.createElement(N.a,null):i.a.createElement(y.a,{message:"to follow other users."})),i.a.createElement("div",{className:"right-item"},i.a.createElement("div",{className:"side-container"},i.a.createElement(D.a,null)),i.a.createElement("div",{className:"side-container"},i.a.createElement("h2",null,"Latest news"),i.a.createElement(R.a,{articles:m,cutPos:150})),i.a.createElement("div",{className:"side-container"},i.a.createElement(T,{casts:a,length:5})))):i.a.createElement("div",{className:"main-container"},i.a.createElement("h2",{className:"main-title"},"In Theatres"),i.a.createElement(j,null),i.a.createElement("h2",{className:"main-title"},"Upcoming"),i.a.createElement(w,null),i.a.createElement("h2",{className:"main-title"},"Shows with new episodes"),i.a.createElement(x,null),i.a.createElement("h2",{className:"main-title"},"Latest news"),i.a.createElement(L.a,{articles:m,cutPos:50}),i.a.createElement("h2",{className:"main-title"},"Follows"),null!=localStorage.getItem("userName")?i.a.createElement(N.a,null):i.a.createElement(y.a,{message:"to follow other users."})))}},61:function(e,t,a){"use strict";a.d(t,"a",(function(){return n})),a.d(t,"b",(function(){return r}));var n={getCastTypes:"/jsondb/cast_types.json",insertCast:"/cast/insert_cast",insertCasts:"/cast/insert_casts",updateCast:"/cast/update_cast",deleteCast:"/cast/delete_cast"};function r(e,t){return e.castTypeId<t.castTypeId?-1:e.castTypeId>t.castTypeId?1:0}},62:function(e,t,a){"use strict";a.d(t,"i",(function(){return m})),a.d(t,"j",(function(){return f})),a.d(t,"h",(function(){return p})),a.d(t,"f",(function(){return E})),a.d(t,"d",(function(){return v})),a.d(t,"e",(function(){return b})),a.d(t,"b",(function(){return g})),a.d(t,"g",(function(){return h})),a.d(t,"c",(function(){return j})),a.d(t,"a",(function(){return S}));var n=a(2),r=a.n(n),c=a(19),l=a(27),s=a(3),i=a(13),o=a(61),u=a(59),m={insertSeries:"/series/insert_series",updateSeries:"/series/update_series",uploadSeriesPoster:"/series/upload_series_poster",selectDetailedSeries:"/series/select_detailed_series",selectLatestPreviewSeries:"/series/select_latest_preview_series",selectLatestPreviewSeriesJson:"/jsondb/latest_series.json",insertSeriesGenre:"/genre/insert_series_genre",deleteSeriesGenre:"/genre/delete_series_genre"};function f(e){return d.apply(this,arguments)}function d(){return(d=Object(s.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(i.UploadFile)("/series/upload_series_poster",t);case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return",!0);case 5:return e.abrupt("return",!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function p(e){e.genres.sort(u.a),function(e){var t,a=Object(l.a)(e.seasons);try{for(a.s();!(t=a.n()).done;){N(t.value)}}catch(n){a.e(n)}finally{a.f()}}(e);var t,a=Object(l.a)(e.seasons);try{for(a.s();!(t=a.n()).done;){t.value.episodes.sort(S)}}catch(n){a.e(n)}finally{a.f()}}function E(e){return e.seasons.filter((function(e){return e.episodes.length>0})).length}function v(e){var t=0;return e.seasons.forEach((function(e){t+=e.episodes.length})),t}function b(e){return e.seasons.length>0&&e.seasons[0].episodes.length>0?e.seasons[0].episodes[0].releaseDate:null}function g(e){var t,a=v(e),n=0,r=Object(l.a)(e.seasons);try{for(r.s();!(t=r.n()).done;){var c,s=t.value,i=Object(l.a)(s.episodes);try{for(i.s();!(c=i.n()).done;){var o=c.value;o.runtime>0&&(n+=o.runtime)}}catch(u){i.e(u)}finally{i.f()}}}catch(u){r.e(u)}finally{r.f()}return n/a}function h(e){var t,a=[],n=Object(l.a)(e.seasons);try{for(n.s();!(t=n.n()).done;){O(t.value,a)}}catch(r){n.e(r)}finally{n.f()}return a}function j(e){var t,a=0,n=0,r=Object(l.a)(e.seasons);try{for(r.s();!(t=r.n()).done;){var c,s=t.value,i=Object(l.a)(s.episodes);try{for(i.s();!(c=i.n()).done;){var o=c.value;o.avgScore>0&&(n+=o.avgScore,a++)}}catch(u){i.e(u)}finally{i.f()}}}catch(u){r.e(u)}finally{r.f()}return n/a}function O(e,t){var a,n=Object(l.a)(e.episodes);try{for(n.s();!(a=n.n()).done;){w(a.value,t)}}catch(r){n.e(r)}finally{n.f()}}function w(e,t){var a,n=Object(l.a)(e.casts);try{for(n.s();!(a=n.n()).done;){y(a.value,t)}}catch(r){n.e(r)}finally{n.f()}}function y(e,t){var a=t.find((function(t){return t.artistId===e.artistId}));null!=a?function(e,t){var a=t.characterNames;0===t.characterNames.filter((function(t){return t===e.name})).length&&a.push(e.name);t=Object(c.a)(Object(c.a)({},t),{},{episodeCount:t.episodeCount++,characterNames:a})}(e,a):t.push({artistId:e.artistId,artistName:e.artistName,episodeCount:1,characterNames:[e.name],castTypeId:e.castTypeId})}function N(e){var t,a=Object(l.a)(e.episodes);try{for(a.s();!(t=a.n()).done;){t.value.casts.sort(o.b)}}catch(n){a.e(n)}finally{a.f()}}function S(e,t){if(new Date(e.releaseDate)>new Date(t.releaseDate))return 1;if(new Date(e.releaseDate)<new Date(t.releaseDate))return-1;if(e.releaseDate===t.releaseDate){if(e.id>t.id)return 1;if(e.id<t.id)return-1}return 0}},63:function(e,t,a){"use strict";a.d(t,"a",(function(){return u}));var n=a(12),r=a(0),c=a.n(r),l=a(11),s=a(60),i=a(57),o=a(56),u=(a(58),function(e){var t=e.movie,a=e.cutPos,u=void 0===a?70:a,m=Object(o.g)("/rewer/uploads/posters","".concat(t.id,".jpg"),o.a.Small),f=Object(n.a)(m,2),d=f[0],p=f[1],E=Object(r.useState)(""),v=Object(n.a)(E,2),b=v[0],g=v[1],h=Object(o.f)(t.summary,u),j=Object(n.a)(h,1)[0];return Object(r.useEffect)((function(){t.avgScore>6?g("high-poster"):t.avgScore>3?g("medium-poster"):t.avgScore>0?g("low-poster"):g(""),window.screen.width}),[t]),c.a.createElement(l.b,{className:"movie-row-grid",to:"/rewer/movie?movieId=".concat(t.id)},c.a.createElement("img",{className:b,src:d,alt:"poster-".concat(t.id),title:t.title,onError:p}),c.a.createElement("div",null,c.a.createElement("p",{className:"row-title"},t.title),c.a.createElement("p",{className:"summary"},j)),new Date(t.releaseDate)<=new Date?c.a.createElement(s.a,{value:t.avgScore})?null==t.releaseDate:c.a.createElement("p",null):c.a.createElement("p",{className:"movie-row-date"},Object(i.d)(t.releaseDate.toString())))})},64:function(e,t,a){"use strict";var n=a(12),r=a(0),c=a.n(r),l=a(56);t.a=function(e){var t=e.movie,a=Object(l.g)("/rewer/uploads/posters","".concat(t.id,".jpg"),l.a.Medium,!0),s=Object(n.a)(a,2),i=s[0],o=s[1],u=Object(r.useState)(""),m=Object(n.a)(u,2),f=m[0],d=m[1],p=Object(r.useState)(""),E=Object(n.a)(p,2),v=E[0],b=E[1],g=Object(r.useRef)();return Object(r.useEffect)((function(){t.avgScore>6?(d("high-poster"),b("high"),g.current.style.display="block"):t.avgScore>3?(d("medium-poster"),b("medium"),g.current.style.display="block"):t.avgScore>0?(d("low-poster"),b("low"),g.current.style.display="block"):g.current.style.display="none"}),[t]),Object(r.useEffect)((function(){}),[t]),c.a.createElement("div",{className:"movie-container fade"},c.a.createElement("img",{className:f,src:i,alt:"".concat(t.title,"-poster"),onError:o}),c.a.createElement("p",{className:"movie-title"},t.title),c.a.createElement("div",{ref:g,className:v},c.a.createElement("p",{className:"score-line"},Math.round(10*t.avgScore)/10)))}},67:function(e,t,a){"use strict";var n=a(12),r=a(0),c=a.n(r),l=a(56);a(58);t.a=function(e){var t=e.series,a=Object(l.g)("/rewer/uploads/seriesposters","".concat(t.id,".jpg")),s=Object(n.a)(a,2),i=s[0],o=s[1],u=Object(r.useState)(""),m=Object(n.a)(u,2),f=m[0],d=m[1],p=Object(r.useState)(""),E=Object(n.a)(p,2),v=E[0],b=E[1],g=Object(r.useRef)();return Object(r.useEffect)((function(){t.avgScore>6?(d("high-poster"),b("high"),g.current.style.display="block"):t.avgScore>3?(d("medium-poster"),b("medium"),g.current.style.display="block"):t.avgScore>0?(d("low-poster"),b("low"),g.current.style.display="block"):g.current.style.display="none"}),[t]),c.a.createElement("div",{className:"movie-container fade"},c.a.createElement("img",{className:f,src:i,alt:"".concat(t.title,"-poster"),onError:o}),c.a.createElement("p",{className:"movie-title"},t.title),c.a.createElement("div",{ref:g,className:v},c.a.createElement("p",{className:"score-line"},Math.round(10*t.avgScore)/10)))}},68:function(e,t,a){},70:function(e,t,a){"use strict";a.d(t,"a",(function(){return l}));var n=a(0),r=a.n(n),c=a(63),l=function(e){var t=e.movies;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(c.a,{key:"movie-row-".concat(e.id),movie:e})})))}},71:function(e,t,a){},74:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(11);t.a=function(e){var t=e.message;return r.a.createElement("p",null,"You must be ",r.a.createElement(c.b,{to:"/rewer/profile"},"logged in")," ",t)}},75:function(e,t,a){"use strict";a.d(t,"a",(function(){return s})),a.d(t,"b",(function(){return i}));var n=a(2),r=a.n(n),c=a(3),l=a(13),s={insertArticle:"/article/insert_article",updateArticle:"/article/update_article",deleteArticle:"/article/delete_article",selectLatestArticles:"/article/select_latest_articles",selectArticlesByUser:"/article/select_articles_by_user",uploadImage:"/article/upload_article_image"};function i(e){return o.apply(this,arguments)}function o(){return(o=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(l.UploadFile)("/article/upload_article_image",t);case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return",!0);case 5:return e.abrupt("return",!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}},78:function(e,t,a){"use strict";a.d(t,"a",(function(){return n}));a(2),a(3),a(13);var n={search:"/search",autoComplete:"/auto-complete"}},82:function(e,t,a){"use strict";var n=a(12),r=a(6),c=a(4),l=a(0),s=a.n(l),i=function(e){var t=e.text,a=e.onClick,r=e.selectedValue,c=Object(l.useState)(""),i=Object(n.a)(c,2),o=i[0],u=i[1];return Object(l.useEffect)((function(){u(r===t?"auto-selected":"")}),[r]),s.a.createElement("div",{className:o,onClick:function(){a(t)}},t)};t.a=function(e){var t=e.value,a=e.setValue,o=e.stringList,u=e.onSubmit,m=e.requestAutoComplete,f=Object(l.useState)(!1),d=Object(n.a)(f,2),p=d[0],E=d[1],v=Object(l.useState)(""),b=Object(n.a)(v,2),g=b[0],h=b[1],j=Object(l.useRef)();Object(l.useEffect)((function(){return O(),function(){w()}}),[]),Object(l.useEffect)((function(){p||h("")}),[p]);var O=function(){window.addEventListener("click",y)},w=function(){window.removeEventListener("click",y)},y=function(e){null==j.current||j.current.contains(e.target)||E(!1)},N=function(e){E(!0),h(""),t.length>3&&m(t+String.fromCharCode(e).toLowerCase())},S=function(){if(""===g)h(o[0]);else{var e=o.indexOf(g);0!==e&&h(o[e-1])}},k=function(){if(""===g&&o.length>0)h(o[0]);else{var e=o.indexOf(g);e!==o.length-1&&h(o[e+1])}};return s.a.createElement("div",{ref:j,className:"autocomplete"},s.a.createElement("div",{className:"search-grid"},s.a.createElement("input",{placeholder:"Keres\xe9s",className:"search-input",autoComplete:"off",value:t,onChange:function(e){a(e.target.value)},onKeyDown:function(e){!function(e){"Enter"===e.key&&(p&&""!==g?(u(g),a(g)):u(t),E(!1)),38===e.keyCode&&p&&o.length>0&&S(),40===e.keyCode&&p&&o.length>0&&k(),39===e.keyCode&&p&&o.length>0&&""!==g&&a(g),e.keyCode>=48&&e.keyCode<=57||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=97&&e.keyCode<=122?N(e.keyCode):32!==e.keycode&&8!==e.keycode&&46!==e.keyCode||(E(!0),h(""))}(e)},onClick:function(){E(!0)},type:"text",list:"datalist"}),s.a.createElement("button",{className:"search-btn",onClick:function(){u(t),E(!1)}},s.a.createElement(c.a,{icon:r.l}))),s.a.createElement("div",{className:"autocomplete-items"},p?s.a.createElement(l.Fragment,null,o.map((function(e){return s.a.createElement(i,{key:"auto-".concat(e),text:e,onClick:function(e){a(e),E(!1),u(e)},selectedValue:g})}))):s.a.createElement(l.Fragment,null)))}},84:function(e,t,a){"use strict";var n=a(12),r=a(0),c=a.n(r),l=a(85),s=a(11),i=a(56);t.a=function(e){var t=e.review,a=e.onDelete,o=Object(i.g)("/rewer/uploads/posters","0.jpg",i.a.Small),u=Object(n.a)(o,3),m=u[0],f=u[1],d=u[2];return Object(r.useEffect)((function(){t.seriesId?d("/rewer/uploads/seriesposters","".concat(t.seriesId,".jpg")):d("/rewer/uploads/posters","".concat(t.movieId,".jpg"))}),[t]),c.a.createElement("div",{className:"followed-review-grid"},c.a.createElement("div",{className:"review-poster-container"},null!=t.seriesId?c.a.createElement(r.Fragment,null,c.a.createElement(s.b,{to:"/rewer/series?seriesId=".concat(t.seriesId)},c.a.createElement("img",{src:m,alt:"".concat(t.movieTitle,"-poster"),onError:f,className:"review-poster"}),c.a.createElement("p",null,t.seriesTitle)),c.a.createElement(s.b,{to:"/rewer/movie?movieId=".concat(t.movieId)},c.a.createElement("p",null,t.movieTitle))):c.a.createElement(s.b,{to:"/rewer/movie?movieId=".concat(t.movieId)},c.a.createElement("img",{src:m,alt:"".concat(t.movieTitle,"-poster"),onError:f}),c.a.createElement("p",null,t.movieTitle))),c.a.createElement("div",null,c.a.createElement(l.a,{review:t,onDelete:a})))}},86:function(e,t,a){"use strict";var n=a(12),r=a(0),c=a.n(r),l=a(11),s=a(60),i=a(93),o=a(57),u=(a(76),a(56));t.a=function(e){var t=e.review,a=e.onDelete,m=Object(r.useState)(c.a.createElement("p",null)),f=Object(n.a)(m,2),d=f[0],p=f[1],E=c.a.createElement(r.Fragment,null,c.a.createElement("p",{className:"review-text"},t.text.substring(0,500)),c.a.createElement("p",{onClick:function(){p(c.a.createElement(r.Fragment,null,c.a.createElement("p",{className:"review-text"},t.text),c.a.createElement("p",{onClick:N,className:"show-more"},"Show less")))},className:"show-more"},"Show more")),v=Object(r.useState)("movie-title"),b=Object(n.a)(v,2),g=b[0],h=b[1],j=Object(u.g)("/rewer/uploads/avatars","".concat(t.userName,".jpg"),u.a.Small),O=Object(n.a)(j,2),w=O[0],y=O[1];function N(){p(E)}return Object(r.useEffect)((function(){t.text.length>500?N():p(c.a.createElement("p",{className:"review-text"},t.text)),t.score>6?h("movie-title title-high"):t.score>3?h("movie-title title-medium"):h("movie-title title-low")}),[t]),c.a.createElement("div",{className:"review-container"},c.a.createElement("div",{className:"review-grid"},null!=t.nickName&&""!==t.nickName?c.a.createElement(l.b,{to:"/rewer/user?userName=".concat(t.userName)},c.a.createElement("img",{className:"avatar",src:w,alt:"avatar_".concat(t.nickName),onError:y})):c.a.createElement("p",null),c.a.createElement(l.b,{className:"nick-name",to:"/rewer/user?userName=".concat(t.userName)},t.nickName),c.a.createElement(s.a,{value:t.score})),t.seriesId?c.a.createElement(r.Fragment,null,c.a.createElement(l.b,{className:g,to:"/rewer/series?seriesId=".concat(t.seriesId)},t.seriesTitle,":"),c.a.createElement("br",null),c.a.createElement("br",null)):c.a.createElement(r.Fragment,null),c.a.createElement(l.b,{className:g,to:"/movie?movieId=".concat(t.movieId)},t.movieTitle),d,c.a.createElement(i.a,{reviewLike:t.myLike,onDelete:a,popIndex:t.popIndex,reviewDate:Object(o.d)(t.date)}))}},87:function(e,t,a){"use strict";a.d(t,"a",(function(){return p}));var n=a(2),r=a.n(n),c=a(3),l=a(12),s=a(0),i=a.n(s),o=a(5),u=a(13),m=a(78),f=a(56),d=a(82);function p(){var e=Object(f.d)(""),t=Object(l.a)(e,2),a=t[0],n=t[1],p=Object(s.useState)([]),E=Object(l.a)(p,2),v=E[0],b=E[1],g=Object(u.postCaller)(),h=Object(l.a)(g,2),j=h[0],O=h[1],w=Object(o.f)();Object(s.useEffect)((function(){return function(){O.abort()}}),[]);var y=function(){var e=Object(c.a)(r.a.mark((function e(t){var a;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,j({limit:5,keyword:t},m.a.autoComplete);case 2:(a=e.sent)&&b(a);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return i.a.createElement("div",null,i.a.createElement(d.a,{value:a.current,setValue:function(e){n(e)},onSubmit:function(e){var t;t=e,w.push("/rewer/search?keyword=".concat(t))},requestAutoComplete:function(e){y(e)},stringList:v}))}},92:function(e,t,a){"use strict";var n=a(0),r=a.n(n),c=a(12),l=a(56),s=a(11),i=(a(71),function(e){var t=e.article,a=e.cutPos,i=Object(l.f)(t.text,a),o=Object(c.a)(i,3),u=o[0],m=o[1],f=o[2],d=Object(l.g)("/rewer/uploads/articles","".concat(t.id,".jpg"),l.a.Medium),p=Object(c.a)(d,2),E=p[0],v=p[1];return r.a.createElement("div",{className:"article-row"},r.a.createElement("h3",null,t.title),r.a.createElement("img",{src:E,onError:v,alt:"article_".concat(t.title)}),r.a.createElement("p",null,u),m?r.a.createElement(n.Fragment,null,r.a.createElement("p",{onClick:function(){f(t.text)},className:"show-more"},"Show more")):r.a.createElement(n.Fragment,null,t.text.length>a?r.a.createElement(n.Fragment,null,r.a.createElement("p",{className:"show-more",onClick:function(){f(t.text,a)}},"Show less")):r.a.createElement(n.Fragment,null)),r.a.createElement("p",null,r.a.createElement(s.b,{to:"/rewer/user?userName=".concat(t.userName)},"By ",r.a.createElement("i",null,t.userName))),null!=t.readMore&&t.readMore.length>10?r.a.createElement("a",{href:t.readMore,target:"blank"},"Read the full article"):r.a.createElement(n.Fragment,null))});t.a=function(e){var t=e.articles,a=e.cutPos;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(i,{key:"article-row-".concat(e.id),article:e,cutPos:a})})))}},95:function(e,t,a){"use strict";a.d(t,"a",(function(){return v}));var n=a(20),r=a(2),c=a.n(r),l=a(3),s=a(12),i=a(0),o=a.n(i),u=a(56),m=a(84),f=a(86),d=a(74),p=a(66),E=a(13);function v(){var e=Object(u.d)([]),t=Object(s.a)(e,2),a=t[0],r=t[1],v=Object(i.useState)(o.a.createElement(i.Fragment,null)),b=Object(s.a)(v,2),g=b[0],h=b[1],j=Object(E.postCaller)({limit:10,offset:0},p.b.selectFollowedReviews),O=Object(s.a)(j,2),w=O[0],y=O[1],N=Object(u.h)(.9,(function(){return _.apply(this,arguments)})),S=Object(s.a)(N,2),k=S[0],I=S[1];function C(){return(C=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({limit:10,offset:0},p.b.selectFollowedReviews,E.ECallType.SELECT);case 2:(t=e.sent)?(r(t),10===t.length&&k()):null!=localStorage.getItem("userName")&&setTimeout(x,3e3);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return F.apply(this,arguments)}function F(){return(F=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({limit:10,offset:0},p.b.selectFollowedReviews,E.ECallType.SELECT);case 2:(t=e.sent)?(r(t),10===t.length&&k()):h(o.a.createElement(d.a,{message:"manage your followers."}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(l.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return I(),e.next=3,w({limit:10,offset:a.current.length},p.b.selectFollowedReviews,E.ECallType.SELECT);case 3:(t=e.sent)&&(r([].concat(Object(n.a)(a.current),Object(n.a)(t))),10===t.length&&k());case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function T(e){return D.apply(this,arguments)}function D(){return(D=Object(l.a)(c.a.mark((function e(t){return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,w({id:t},p.b.deleteReview,E.ECallType.ISOK);case 2:if(!e.sent){e.next=4;break}r(a.current.filter((function(e){return e.id!==t})));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(i.useEffect)((function(){return localStorage.getItem("userName")&&function(){C.apply(this,arguments)}(),function(){y.abort(),I()}}),[]),o.a.createElement("div",null,window.screen.width>600?o.a.createElement(i.Fragment,null,g,null==localStorage.getItem("userName")?o.a.createElement(d.a,{message:"to follow other reviewers."}):o.a.createElement(i.Fragment,null),a.current.map((function(e){return o.a.createElement(m.a,{key:"followed-".concat(e.id),review:e,onDelete:T})}))):o.a.createElement(i.Fragment,null,g,a.current.map((function(e){return o.a.createElement(f.a,{key:"followed-".concat(e.id),review:e,onDelete:T})}))))}},96:function(e,t,a){"use strict";var n=a(12),r=a(0),c=a.n(r),l=(a(58),a(11)),s=a(60),i=a(56);t.a=function(e){var t=e.series,a=Object(i.g)("/rewer/uploads/seriesposters","".concat(t.id,".jpg"),i.a.Small),o=Object(n.a)(a,2),u=o[0],m=o[1],f=Object(r.useState)(""),d=Object(n.a)(f,2),p=d[0],E=d[1],v=Object(i.f)(t.summary,70),b=Object(n.a)(v,1)[0];return Object(r.useEffect)((function(){t.avgScore>6?E("high-poster"):t.avgScore>3?E("medium-poster"):t.avgScore>0?E("low-poster"):E("")}),[t]),c.a.createElement("div",{className:"movie-row-grid"},c.a.createElement(l.b,{to:"/rewer/series?seriesId=".concat(t.id)},c.a.createElement("img",{className:p,src:u,alt:"poster-".concat(t.id),title:t.title,onError:m})),c.a.createElement("div",null,c.a.createElement("p",{className:"row-title"},t.title,":"),c.a.createElement("p",{className:"summary"},b)),c.a.createElement(s.a,{value:t.avgScore}))}}}]);
//# sourceMappingURL=8.48500663.chunk.js.map