import{a as u,S as p}from"./assets/vendor-I6ojcvTw.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))n(t);new MutationObserver(t=>{for(const s of t)if(s.type==="childList")for(const i of s.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&n(i)}).observe(document,{childList:!0,subtree:!0});function a(t){const s={};return t.integrity&&(s.integrity=t.integrity),t.referrerPolicy&&(s.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?s.credentials="include":t.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(t){if(t.ep)return;t.ep=!0;const s=a(t);fetch(t.href,s)}})();const f="https://pixabay.com/api/",g="47377871-88caea6ffc61c5284332b3ad8";async function y(e,o=1){const{data:a}=await u(`${f}`,{params:{key:g,q:e,page:o,per_page:15}});return a}function h(e){return e.map(({id:o,largeImageURL:a,webformatURL:n,tags:t,likes:s,views:i,comments:d,downloads:m})=>`<li class="gallery-item" data-id="${o}">
  <a class="gallery-link" href="${a}">
    <span class="loader"></span>
    <img
      class="gallery-image"
      src="${n}"
      alt="${t}"
      style="display: none;"
      onload="this.style.display='block'; this.previousElementSibling.style.display='none';"
    />
    <ul class="list-infoImg">
    <li class="item-infoImg"><span>Likes</span>${s}</li>
    <li class="item-infoImg"><span>Views</span>${i}</li>
    <li class="item-infoImg"><span>Comments</span>${d}</li>
    <li class="item-infoImg"><span>Downloads</span>${m}</li>
    </ul>
  </a>
</li>`).join("")}function b(e){e.style.display="block"}function L(e){e.style.display="none"}const S=document.querySelector(".form"),I=document.querySelector(".gallery"),l=document.querySelector(".loading-message"),$=document.querySelector(".js-load-more");S.addEventListener("submit",M);let c="",r=1;function M(e){e.preventDefault(),c=e.target.elements.search.value.trim(),q()}function q(){b(l),y(c,r).then(e=>{L(l),I.insertAdjacentHTML("beforeend",h(e.hits)),r<Math.ceil(e.totalHits/15)&&$.classList.replace("load-more-hidden","load-more")}).catch(e=>alert(e.message))}let v=new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250,captionPosition:"bottom"});v.on("error.simplelightbox",function(e){console.log(e)});
//# sourceMappingURL=index.js.map
