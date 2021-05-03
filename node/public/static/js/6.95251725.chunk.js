(this.webpackJsonprewer=this.webpackJsonprewer||[]).push([[6],{114:function(e,t,n){"use strict";n.r(t),n.d(t,"default",(function(){return _}));var a=n(0),r=n.n(a),c=n(69),s=n(2),o=n.n(s),i=n(19),u=n(3),l=n(12),m=n(13),f=n(78),d=n(56),b=n(21),v=n(92),p=n(57),j=n(11),g=(n(80),function(e){var t=e.artist,n=Object(d.g)("/rewer/uploads/portraits","".concat(t.id,".jpg"),d.a.Small),c=Object(l.a)(n,2),s=c[0],o=c[1],i=Object(a.useState)(""),u=Object(l.a)(i,2),m=u[0],f=u[1];return Object(a.useEffect)((function(){t.bio.length>80?f("".concat(t.bio.substring(0,150),"...")):f(t.bio)}),[t]),r.a.createElement(j.b,{className:"standard-artist-grid highlight",to:"/rewer/star?artistId=".concat(t.id)},r.a.createElement("img",{src:s,alt:"poster-".concat(t.id),title:t.name,onError:o}),r.a.createElement("div",null,r.a.createElement("p",{className:"name"},t.name),r.a.createElement("p",null,Object(p.d)(t.birthDate.toString())),r.a.createElement("p",null,m)))}),E=function(e){var t=e.artists;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(g,{key:"artist-row-".concat(e.id),artist:e})})))},O=n(82),h=n(70),y=function(e){var t=e.user,n=Object(d.g)("/rewer/uploads/avatars","".concat(t.userName,".jpg"),d.a.Small),c=Object(l.a)(n,2),s=c[0],o=c[1],i=Object(a.useState)(""),u=Object(l.a)(i,2),m=u[0],f=u[1];return Object(a.useEffect)((function(){t.about.length>100?f("".concat(t.about.substring(0,100),"...")):f(t.about)}),[t]),r.a.createElement(j.b,{className:"user-row highlight",to:"/rewer/user?userName=".concat(t.userName)},r.a.createElement("img",{src:s,onError:o,alt:"user-".concat(t.nickName)}),r.a.createElement("div",null,r.a.createElement("p",{className:"name"},t.nickName),r.a.createElement("p",null,m)))},w=function(e){var t=e.users;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(y,{key:"user-row-".concat(e.userName),user:e})})))},S=n(96),k=function(e){var t=e.series;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(S.a,{key:"series-row-".concat(e.id),series:e})})))};function N(){var e=Object(a.useState)({movies:[],series:[],artists:[],users:[],articles:[]}),t=Object(l.a)(e,2),n=t[0],c=t[1],s=Object(d.d)(Object(b.b)("keyword")),p=Object(l.a)(s,2),j=p[0],g=p[1],y=Object(a.useState)(""),S=Object(l.a)(y,2),N=S[0],C=S[1],_=Object(a.useState)({movies:!0,series:!0,artists:!0,articles:!0,users:!0}),M=Object(l.a)(_,2),x=M[0],D=M[1],F=Object(m.postCaller)(),I=Object(l.a)(F,2),L=I[0],J=I[1],P=Object(a.useState)([]),R=Object(l.a)(P,2),A=R[0],T=R[1];function G(e){return U.apply(this,arguments)}function U(){return(U=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return C('Searching for "'.concat(t,'"...')),e.next=3,L({keyword:t,filter:x},f.a.search);case 3:(n=e.sent)&&(c(n),C(""),document.title="Search: ".concat(t," - Rewer")),Object(b.a)({name:"keyword",value:t});case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function Y(e){var t=x;for(var n in t)t[n]=e;D(Object(i.a)({},t))}function V(){return(V=Object(u.a)(o.a.mark((function e(t){var n;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!(t.length>3)){e.next=7;break}return e.next=3,L({keyword:t,limit:5,filter:x},f.a.autoComplete);case 3:(n=e.sent)&&T(n),e.next=8;break;case 7:T([]);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(a.useEffect)((function(){return G(j.current),function(){J.abort()}}),[]),r.a.createElement("div",null,r.a.createElement(O.a,{value:j.current,setValue:function(e){g(e)},stringList:A,onSubmit:function(e){G(e)},requestAutoComplete:function(e){!function(e){V.apply(this,arguments)}(e)}}),r.a.createElement("h3",null,"Include: "),r.a.createElement("label",null,"Movies:"),r.a.createElement("input",{checked:x.movies,name:"movies",type:"checkbox",onChange:function(){D(Object(i.a)(Object(i.a)({},x),{},{movies:!x.movies}))},className:"search-cb"}),r.a.createElement("label",null,"Series:"),r.a.createElement("input",{checked:x.series,name:"series",type:"checkbox",onChange:function(){D(Object(i.a)(Object(i.a)({},x),{},{series:!x.series}))},className:"search-cb"}),r.a.createElement("label",null,"Artists:"),r.a.createElement("input",{checked:x.artists,name:"artists",type:"checkbox",onChange:function(){D(Object(i.a)(Object(i.a)({},x),{},{artists:!x.artists}))},className:"search-cb"}),r.a.createElement("label",null,"Articles:"),r.a.createElement("input",{checked:x.articles,name:"articles",type:"checkbox",onChange:function(){D(Object(i.a)(Object(i.a)({},x),{},{articles:!x.articles}))},className:"search-cb"}),r.a.createElement("label",null,"Users:"),r.a.createElement("input",{checked:x.users,name:"users",type:"checkbox",onChange:function(){D(Object(i.a)(Object(i.a)({},x),{},{users:!x.users}))},className:"search-cb"}),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){Y(!0)}},"All"),r.a.createElement("button",{onClick:function(){Y(!1)}},"Clear"),r.a.createElement("p",null,N),r.a.createElement(h.a,{movies:n.movies}),r.a.createElement(k,{series:n.series}),r.a.createElement(E,{artists:n.artists}),r.a.createElement(w,{users:n.users}),r.a.createElement(v.a,{articles:n.articles,cutPos:150}))}var C=n(73);function _(){return Object(a.useEffect)((function(){document.title="Search - Rewer"}),[]),r.a.createElement(a.Fragment,null,window.screen.width>1e3?r.a.createElement("div",{className:"main-grid"},r.a.createElement("div",{className:"left-item"},r.a.createElement("div",{className:"side-container medium-side"},r.a.createElement(C.a,null))),r.a.createElement("div",{className:"main-item"},r.a.createElement(N,null)),r.a.createElement("div",{className:"right-item "},r.a.createElement("div",{className:"side-container medium-side"},r.a.createElement(c.a,null)))):r.a.createElement("div",{className:"main-container"},r.a.createElement(N,null)))}},56:function(e,t,n){"use strict";n.d(t,"d",(function(){return i})),n.d(t,"e",(function(){return u})),n.d(t,"c",(function(){return l})),n.d(t,"f",(function(){return m})),n.d(t,"b",(function(){return d})),n.d(t,"h",(function(){return b})),n.d(t,"a",(function(){return a})),n.d(t,"g",(function(){return v}));var a,r=n(28),c=n(19),s=n(12),o=n(0);function i(e){var t=Object(o.useRef)(e),n=Object(o.useState)(!1),a=Object(s.a)(n,2)[1];return[t,function(e){Object.is(t.current,e)||(t.current=e,a((function(e){return!e})))}]}function u(e){var t=Object(o.useState)(e),n=Object(s.a)(t,2),a=n[0],i=n[1];return[a,i,function(e){i(Object(c.a)(Object(c.a)({},a),{},Object(r.a)({},e.target.name,e.target.value)))}]}function l(e){var t=Object(o.useRef)(e),n=Object(o.useState)(!1),a=Object(s.a)(n,2)[1],i=function(e){Object.is(t.current,e)||(t.current=e,a((function(e){return!e})))};return[t,i,function(e){i(Object(c.a)(Object(c.a)({},t.current),{},Object(r.a)({},e.target.name,e.target.value)))}]}function m(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=f(e,t>0,t),a=Object(s.a)(n,2),r=a[0],c=a[1],i=Object(o.useState)(c),u=Object(s.a)(i,2),l=u[0],m=u[1],d=Object(o.useState)(r),b=Object(s.a)(d,2),v=b[0],p=b[1],j=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=f(e,t>0,t),a=Object(s.a)(n,2),r=a[0],c=a[1];p(r),m(c)};return[v,l,j]}function f(e,t,n){return t&&e.length>n?[e.substring(0,n)+"...",!0]:[e,!1]}function d(e,t){"Enter"===e.key&&t()}function b(e,t){var n=e;(e>1||e<0)&&(n=.8);var a=Object(o.useRef)(n),r=function(){window.innerHeight+window.scrollY>=document.body.offsetHeight*a.current&&t()};return[function(){window.addEventListener("scroll",r)},function(){window.removeEventListener("scroll",r)}]}function v(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:a.Normal,r=arguments.length>3&&void 0!==arguments[3]&&arguments[3],c=Object(o.useState)("".concat(e,"/").concat(n).concat(t)),i=Object(s.a)(c,2),u=i[0],l=i[1],m=Object(o.useRef)(r),f=function(){m.current?(l("".concat(e,"/").concat(a.Normal).concat(t)),m.current=!1):l("".concat(e,"/").concat(n,"0.jpg"))},d=function(e,t){l("".concat(e,"/").concat(n).concat(t))};return[u,f,d]}!function(e){e.Normal="",e.Medium="medium-",e.Small="small-"}(a||(a={}))},57:function(e,t,n){"use strict";function a(e){return"".concat(e.getFullYear(),". ").concat(u[e.getMonth()]," ").concat(e.getDate())}function r(e){return new Date(e).getFullYear()}function c(e){return u[new Date(e).getMonth()]}function s(e){return new Date(e).getDate()}function o(e){var t=new Date(e);return"".concat(t.getDate()," ").concat(u[t.getMonth()]," ").concat(t.getFullYear())}function i(e){var t,n;return t=e.getMonth()<9?"0".concat(e.getMonth()+1):(e.getMonth()+1).toString(),n=e.getDate()<10?"0".concat(e.getDate()):e.getDate().toString(),"".concat(e.getFullYear(),"-").concat(t,"-").concat(n)}n.d(t,"e",(function(){return a})),n.d(t,"c",(function(){return r})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return s})),n.d(t,"d",(function(){return o})),n.d(t,"f",(function(){return i}));var u=["Janury","February","March","April","May","June","July","August","September","October","November","December"]},58:function(e,t,n){},59:function(e,t,n){"use strict";n.d(t,"b",(function(){return o})),n.d(t,"c",(function(){return i})),n.d(t,"a",(function(){return l}));var a=n(2),r=n.n(a),c=n(3),s=n(13),o={selectDetailedMovie:"/movie/select_detailed_movie",selectLatestMovies:"/movie/select_latest_movies",selectLatestMoviesJson:"/jsondb/latest_movies.json",selectLatestMoviesByGenre:"/movie/select_latest_movies_by_genre",selectMoviesByScore:"/movie/select_movies_by_score",getGenres:"/jsondb/genres.json",insertMovie:"/movie/insert_movie",updateMovie:"/movie/update_movie",deleteMovie:"/movie/delete_movie",uploadPoster:"/movie/upload_poster",insertMovieGenre:"/genre/insert_movie_genre",deleteMovieGenre:"/genre/delete_movie_genre",selectUpcomingMovies:"/movie/select_upcoming_movies",selectUpcomingMoviesJson:"/jsondb/upcoming_movies.json"};function i(e){return u.apply(this,arguments)}function u(){return(u=Object(c.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(s.UploadFile)("/movie/upload_poster",t);case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return",!0);case 5:return e.abrupt("return",!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function l(e,t){return e.genreName.localeCompare(t.genreName)}},60:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(12),r=n(0),c=n.n(r),s=function(e){var t=e.value,n=Object(r.useState)("score"),s=Object(a.a)(n,2),o=s[0],i=s[1];return Object(r.useEffect)((function(){i(t>6?"score high":t>3?"score":t>0?"score low":"score unset")}),[t]),c.a.createElement("div",{className:o},c.a.createElement("p",null,Math.round(10*t)/10))}},61:function(e,t,n){"use strict";n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r}));var a={getCastTypes:"/jsondb/cast_types.json",insertCast:"/cast/insert_cast",insertCasts:"/cast/insert_casts",updateCast:"/cast/update_cast",deleteCast:"/cast/delete_cast"};function r(e,t){return e.castTypeId<t.castTypeId?-1:e.castTypeId>t.castTypeId?1:0}},62:function(e,t,n){"use strict";n.d(t,"i",(function(){return m})),n.d(t,"j",(function(){return f})),n.d(t,"h",(function(){return b})),n.d(t,"f",(function(){return v})),n.d(t,"d",(function(){return p})),n.d(t,"e",(function(){return j})),n.d(t,"b",(function(){return g})),n.d(t,"g",(function(){return E})),n.d(t,"c",(function(){return O})),n.d(t,"a",(function(){return k}));var a=n(2),r=n.n(a),c=n(19),s=n(27),o=n(3),i=n(13),u=n(61),l=n(59),m={insertSeries:"/series/insert_series",updateSeries:"/series/update_series",uploadSeriesPoster:"/series/upload_series_poster",selectDetailedSeries:"/series/select_detailed_series",selectLatestPreviewSeries:"/series/select_latest_preview_series",selectLatestPreviewSeriesJson:"/jsondb/latest_series.json",insertSeriesGenre:"/genre/insert_series_genre",deleteSeriesGenre:"/genre/delete_series_genre"};function f(e){return d.apply(this,arguments)}function d(){return(d=Object(o.a)(r.a.mark((function e(t){return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,Object(i.UploadFile)("/series/upload_series_poster",t);case 2:if(!e.sent.ok){e.next=5;break}return e.abrupt("return",!0);case 5:return e.abrupt("return",!1);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function b(e){e.genres.sort(l.a),function(e){var t,n=Object(s.a)(e.seasons);try{for(n.s();!(t=n.n()).done;){S(t.value)}}catch(a){n.e(a)}finally{n.f()}}(e);var t,n=Object(s.a)(e.seasons);try{for(n.s();!(t=n.n()).done;){t.value.episodes.sort(k)}}catch(a){n.e(a)}finally{n.f()}}function v(e){return e.seasons.filter((function(e){return e.episodes.length>0})).length}function p(e){var t=0;return e.seasons.forEach((function(e){t+=e.episodes.length})),t}function j(e){return e.seasons.length>0&&e.seasons[0].episodes.length>0?e.seasons[0].episodes[0].releaseDate:null}function g(e){var t,n=p(e),a=0,r=Object(s.a)(e.seasons);try{for(r.s();!(t=r.n()).done;){var c,o=t.value,i=Object(s.a)(o.episodes);try{for(i.s();!(c=i.n()).done;){var u=c.value;u.runtime>0&&(a+=u.runtime)}}catch(l){i.e(l)}finally{i.f()}}}catch(l){r.e(l)}finally{r.f()}return a/n}function E(e){var t,n=[],a=Object(s.a)(e.seasons);try{for(a.s();!(t=a.n()).done;){h(t.value,n)}}catch(r){a.e(r)}finally{a.f()}return n}function O(e){var t,n=0,a=0,r=Object(s.a)(e.seasons);try{for(r.s();!(t=r.n()).done;){var c,o=t.value,i=Object(s.a)(o.episodes);try{for(i.s();!(c=i.n()).done;){var u=c.value;u.avgScore>0&&(a+=u.avgScore,n++)}}catch(l){i.e(l)}finally{i.f()}}}catch(l){r.e(l)}finally{r.f()}return a/n}function h(e,t){var n,a=Object(s.a)(e.episodes);try{for(a.s();!(n=a.n()).done;){y(n.value,t)}}catch(r){a.e(r)}finally{a.f()}}function y(e,t){var n,a=Object(s.a)(e.casts);try{for(a.s();!(n=a.n()).done;){w(n.value,t)}}catch(r){a.e(r)}finally{a.f()}}function w(e,t){var n=t.find((function(t){return t.artistId===e.artistId}));null!=n?function(e,t){var n=t.characterNames;0===t.characterNames.filter((function(t){return t===e.name})).length&&n.push(e.name);t=Object(c.a)(Object(c.a)({},t),{},{episodeCount:t.episodeCount++,characterNames:n})}(e,n):t.push({artistId:e.artistId,artistName:e.artistName,episodeCount:1,characterNames:[e.name],castTypeId:e.castTypeId})}function S(e){var t,n=Object(s.a)(e.episodes);try{for(n.s();!(t=n.n()).done;){t.value.casts.sort(u.b)}}catch(a){n.e(a)}finally{n.f()}}function k(e,t){if(new Date(e.releaseDate)>new Date(t.releaseDate))return 1;if(new Date(e.releaseDate)<new Date(t.releaseDate))return-1;if(e.releaseDate===t.releaseDate){if(e.id>t.id)return 1;if(e.id<t.id)return-1}return 0}},63:function(e,t,n){"use strict";n.d(t,"a",(function(){return l}));var a=n(12),r=n(0),c=n.n(r),s=n(11),o=n(60),i=n(57),u=n(56),l=(n(58),function(e){var t=e.movie,n=e.cutPos,l=void 0===n?70:n,m=Object(u.g)("/rewer/uploads/posters","".concat(t.id,".jpg"),u.a.Small),f=Object(a.a)(m,2),d=f[0],b=f[1],v=Object(r.useState)(""),p=Object(a.a)(v,2),j=p[0],g=p[1],E=Object(u.f)(t.summary,l),O=Object(a.a)(E,1)[0];return Object(r.useEffect)((function(){t.avgScore>6?g("high-poster"):t.avgScore>3?g("medium-poster"):t.avgScore>0?g("low-poster"):g(""),window.screen.width}),[t]),c.a.createElement(s.b,{className:"movie-row-grid",to:"/rewer/movie?movieId=".concat(t.id)},c.a.createElement("img",{className:j,src:d,alt:"poster-".concat(t.id),title:t.title,onError:b}),c.a.createElement("div",null,c.a.createElement("p",{className:"row-title"},t.title),c.a.createElement("p",{className:"summary"},O)),new Date(t.releaseDate)<=new Date?c.a.createElement(o.a,{value:t.avgScore})?null==t.releaseDate:c.a.createElement("p",null):c.a.createElement("p",{className:"movie-row-date"},Object(i.d)(t.releaseDate.toString())))})},64:function(e,t,n){"use strict";var a=n(12),r=n(0),c=n.n(r),s=n(56);t.a=function(e){var t=e.movie,n=Object(s.g)("/rewer/uploads/posters","".concat(t.id,".jpg"),s.a.Medium,!0),o=Object(a.a)(n,2),i=o[0],u=o[1],l=Object(r.useState)(""),m=Object(a.a)(l,2),f=m[0],d=m[1],b=Object(r.useState)(""),v=Object(a.a)(b,2),p=v[0],j=v[1],g=Object(r.useRef)();return Object(r.useEffect)((function(){t.avgScore>6?(d("high-poster"),j("high"),g.current.style.display="block"):t.avgScore>3?(d("medium-poster"),j("medium"),g.current.style.display="block"):t.avgScore>0?(d("low-poster"),j("low"),g.current.style.display="block"):g.current.style.display="none"}),[t]),Object(r.useEffect)((function(){}),[t]),c.a.createElement("div",{className:"movie-container fade"},c.a.createElement("img",{className:f,src:i,alt:"".concat(t.title,"-poster"),onError:u}),c.a.createElement("p",{className:"movie-title"},t.title),c.a.createElement("div",{ref:g,className:p},c.a.createElement("p",{className:"score-line"},Math.round(10*t.avgScore)/10)))}},67:function(e,t,n){"use strict";var a=n(12),r=n(0),c=n.n(r),s=n(56);n(58);t.a=function(e){var t=e.series,n=Object(s.g)("/rewer/uploads/seriesposters","".concat(t.id,".jpg")),o=Object(a.a)(n,2),i=o[0],u=o[1],l=Object(r.useState)(""),m=Object(a.a)(l,2),f=m[0],d=m[1],b=Object(r.useState)(""),v=Object(a.a)(b,2),p=v[0],j=v[1],g=Object(r.useRef)();return Object(r.useEffect)((function(){t.avgScore>6?(d("high-poster"),j("high"),g.current.style.display="block"):t.avgScore>3?(d("medium-poster"),j("medium"),g.current.style.display="block"):t.avgScore>0?(d("low-poster"),j("low"),g.current.style.display="block"):g.current.style.display="none"}),[t]),c.a.createElement("div",{className:"movie-container fade"},c.a.createElement("img",{className:f,src:i,alt:"".concat(t.title,"-poster"),onError:u}),c.a.createElement("p",{className:"movie-title"},t.title),c.a.createElement("div",{ref:g,className:p},c.a.createElement("p",{className:"score-line"},Math.round(10*t.avgScore)/10)))}},69:function(e,t,n){"use strict";n.d(t,"a",(function(){return d}));var a=n(2),r=n.n(a),c=n(3),s=n(12),o=n(0),i=n.n(o),u=n(11),l=n(13),m=n(59),f=n(64);function d(){var e=Object(o.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1],d=Object(l.getCaller)(m.b.selectLatestMoviesJson),b=Object(s.a)(d,2),v=b[0],p=b[1];function j(){return(j=Object(c.a)(r.a.mark((function e(){var t,n;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:t=e.sent,n=Math.floor(5*Math.random()),t&&a(t.slice(n,n+2));case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(o.useEffect)((function(){return function(){j.apply(this,arguments)}(),function(){p.abort()}}),[]),i.a.createElement(o.Fragment,null,i.a.createElement("h3",{className:"center-text"},"Featured Films"),i.a.createElement("div",{className:"double-grid"},n.map((function(e){return i.a.createElement(u.b,{key:"featured-".concat(e.id),to:"/rewer/movie?movieId=".concat(e.id)},i.a.createElement(f.a,{movie:e}))}))))}},70:function(e,t,n){"use strict";n.d(t,"a",(function(){return s}));var a=n(0),r=n.n(a),c=n(63),s=function(e){var t=e.movies;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(c.a,{key:"movie-row-".concat(e.id),movie:e})})))}},71:function(e,t,n){},73:function(e,t,n){"use strict";var a=n(2),r=n.n(a),c=n(3),s=n(12),o=n(0),i=n.n(o),u=n(11),l=n(13),m=n(62),f=n(67);t.a=function(){var e=Object(o.useState)([]),t=Object(s.a)(e,2),n=t[0],a=t[1],d=Object(l.getCaller)(m.i.selectLatestPreviewSeriesJson),b=Object(s.a)(d,2),v=b[0],p=b[1];function j(){return(j=Object(c.a)(r.a.mark((function e(){var t;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,v();case 2:(t=e.sent)&&a(t.slice(0,2));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(o.useEffect)((function(){return function(){j.apply(this,arguments)}(),function(){p.abort()}}),[]),i.a.createElement("div",null,i.a.createElement("h3",{className:"center-text"},"Featured Series"),i.a.createElement("div",{className:"double-grid"},n.map((function(e){return i.a.createElement(u.b,{key:"featured-".concat(e.id),to:"/rewer/series?seriesId=".concat(e.id)},i.a.createElement(f.a,{series:e}))}))))}},78:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));n(2),n(3),n(13);var a={search:"/search",autoComplete:"/auto-complete"}},80:function(e,t,n){},82:function(e,t,n){"use strict";var a=n(12),r=n(6),c=n(4),s=n(0),o=n.n(s),i=function(e){var t=e.text,n=e.onClick,r=e.selectedValue,c=Object(s.useState)(""),i=Object(a.a)(c,2),u=i[0],l=i[1];return Object(s.useEffect)((function(){l(r===t?"auto-selected":"")}),[r]),o.a.createElement("div",{className:u,onClick:function(){n(t)}},t)};t.a=function(e){var t=e.value,n=e.setValue,u=e.stringList,l=e.onSubmit,m=e.requestAutoComplete,f=Object(s.useState)(!1),d=Object(a.a)(f,2),b=d[0],v=d[1],p=Object(s.useState)(""),j=Object(a.a)(p,2),g=j[0],E=j[1],O=Object(s.useRef)();Object(s.useEffect)((function(){return h(),function(){y()}}),[]),Object(s.useEffect)((function(){b||E("")}),[b]);var h=function(){window.addEventListener("click",w)},y=function(){window.removeEventListener("click",w)},w=function(e){null==O.current||O.current.contains(e.target)||v(!1)},S=function(e){v(!0),E(""),t.length>3&&m(t+String.fromCharCode(e).toLowerCase())},k=function(){if(""===g)E(u[0]);else{var e=u.indexOf(g);0!==e&&E(u[e-1])}},N=function(){if(""===g&&u.length>0)E(u[0]);else{var e=u.indexOf(g);e!==u.length-1&&E(u[e+1])}};return o.a.createElement("div",{ref:O,className:"autocomplete"},o.a.createElement("div",{className:"search-grid"},o.a.createElement("input",{placeholder:"Keres\xe9s",className:"search-input",autoComplete:"off",value:t,onChange:function(e){n(e.target.value)},onKeyDown:function(e){!function(e){"Enter"===e.key&&(b&&""!==g?(l(g),n(g)):l(t),v(!1)),38===e.keyCode&&b&&u.length>0&&k(),40===e.keyCode&&b&&u.length>0&&N(),39===e.keyCode&&b&&u.length>0&&""!==g&&n(g),e.keyCode>=48&&e.keyCode<=57||e.keyCode>=65&&e.keyCode<=90||e.keyCode>=97&&e.keyCode<=122?S(e.keyCode):32!==e.keycode&&8!==e.keycode&&46!==e.keyCode||(v(!0),E(""))}(e)},onClick:function(){v(!0)},type:"text",list:"datalist"}),o.a.createElement("button",{className:"search-btn",onClick:function(){l(t),v(!1)}},o.a.createElement(c.a,{icon:r.l}))),o.a.createElement("div",{className:"autocomplete-items"},b?o.a.createElement(s.Fragment,null,u.map((function(e){return o.a.createElement(i,{key:"auto-".concat(e),text:e,onClick:function(e){n(e),v(!1),l(e)},selectedValue:g})}))):o.a.createElement(s.Fragment,null)))}},92:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(12),s=n(56),o=n(11),i=(n(71),function(e){var t=e.article,n=e.cutPos,i=Object(s.f)(t.text,n),u=Object(c.a)(i,3),l=u[0],m=u[1],f=u[2],d=Object(s.g)("/rewer/uploads/articles","".concat(t.id,".jpg"),s.a.Medium),b=Object(c.a)(d,2),v=b[0],p=b[1];return r.a.createElement("div",{className:"article-row"},r.a.createElement("h3",null,t.title),r.a.createElement("img",{src:v,onError:p,alt:"article_".concat(t.title)}),r.a.createElement("p",null,l),m?r.a.createElement(a.Fragment,null,r.a.createElement("p",{onClick:function(){f(t.text)},className:"show-more"},"Show more")):r.a.createElement(a.Fragment,null,t.text.length>n?r.a.createElement(a.Fragment,null,r.a.createElement("p",{className:"show-more",onClick:function(){f(t.text,n)}},"Show less")):r.a.createElement(a.Fragment,null)),r.a.createElement("p",null,r.a.createElement(o.b,{to:"/rewer/user?userName=".concat(t.userName)},"By ",r.a.createElement("i",null,t.userName))),null!=t.readMore&&t.readMore.length>10?r.a.createElement("a",{href:t.readMore,target:"blank"},"Read the full article"):r.a.createElement(a.Fragment,null))});t.a=function(e){var t=e.articles,n=e.cutPos;return r.a.createElement("div",null,t.map((function(e){return r.a.createElement(i,{key:"article-row-".concat(e.id),article:e,cutPos:n})})))}},96:function(e,t,n){"use strict";var a=n(12),r=n(0),c=n.n(r),s=(n(58),n(11)),o=n(60),i=n(56);t.a=function(e){var t=e.series,n=Object(i.g)("/rewer/uploads/seriesposters","".concat(t.id,".jpg"),i.a.Small),u=Object(a.a)(n,2),l=u[0],m=u[1],f=Object(r.useState)(""),d=Object(a.a)(f,2),b=d[0],v=d[1],p=Object(i.f)(t.summary,70),j=Object(a.a)(p,1)[0];return Object(r.useEffect)((function(){t.avgScore>6?v("high-poster"):t.avgScore>3?v("medium-poster"):t.avgScore>0?v("low-poster"):v("")}),[t]),c.a.createElement("div",{className:"movie-row-grid"},c.a.createElement(s.b,{to:"/rewer/series?seriesId=".concat(t.id)},c.a.createElement("img",{className:b,src:l,alt:"poster-".concat(t.id),title:t.title,onError:m})),c.a.createElement("div",null,c.a.createElement("p",{className:"row-title"},t.title,":"),c.a.createElement("p",{className:"summary"},j)),c.a.createElement(o.a,{value:t.avgScore}))}}}]);
//# sourceMappingURL=6.95251725.chunk.js.map