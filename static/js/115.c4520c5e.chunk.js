"use strict";(self.webpackChunkreact_burger=self.webpackChunkreact_burger||[]).push([[115],{2852:(e,t,s)=>{s.d(t,{F:()=>F});var n=s(5043),r=s(8139),i=s.n(r),a=s(3216),d=s(3473),c=s(3734),l=s(2339),_=s(5909),m=s(7120);const o="feed-ingredient_feedIngredient__fsyB6",x="feed-ingredient_image__zAUSF",f="feed-ingredient_remain__dfP63",g="feed-ingredient_count__hVBUs";var u=s(579);const j=e=>{let{ingredient:t,remain:s}=e;const{image:n,name:r}=t;return(0,u.jsx)("div",{className:o,children:s?(0,u.jsxs)("div",{className:f,children:[(0,u.jsx)("img",{className:x,src:n,alt:r}),(0,u.jsx)("span",{className:i()(g,"text text_type_main-default"),children:`+${s}`})]}):(0,u.jsx)("img",{className:x,src:n,alt:r})})},p="feed-ingredients_feedIngredients__7vF7h",h=e=>{let{ingredients:t}=e;const s=t.length-6;return(0,u.jsx)("div",{className:p,children:t.map(((e,n)=>t.length>=6?5===n?(0,u.jsx)(j,{ingredient:e,remain:s},n):n>=6?null:(0,u.jsx)(j,{ingredient:e},n):(0,u.jsx)(j,{ingredient:e},n)))})};var N=s(6064);const v="feed-item_feedItem__yuQs+",y="feed-item_itemSection__ZMozu",b="feed-item_orderDate__NmAQU",k="feed-item_orderPrice__wzttU",w=e=>{let{order:t,profile:s}=e;const{name:r,ingredients:o,number:x,createdAt:f,status:g}=t,j=(0,a.zy)(),p=(0,a.Zp)(),w=(0,d.jL)(),I=(0,d.GV)((0,c.W9)(o)),F=(0,n.useMemo)((()=>(0,_.Q)(I)),[I]);return(0,u.jsxs)("div",{className:i()(v,"p-6"),onClick:()=>{const e=window.getSelection();e&&e.toString().length>0||(w((0,l.QK)({number:x,name:r,ingredients:o,status:g,createdAt:f})),p(s?`${m.y4}/${x}`:`${m.y3}/${x}`,{state:{backgroundLocation:j}}))},children:[(0,u.jsxs)("section",{className:i()(y,"mb-6"),children:[(0,u.jsx)("span",{className:"text text_type_digits-default",children:`#${x}`}),(0,u.jsx)("span",{className:i()(b,"text text_type_main-default text_color_inactive"),children:(0,u.jsx)(N.XU,{date:new Date(f)})})]}),(0,u.jsx)("span",{className:"text text_type_main-medium",children:r}),(0,u.jsxs)("section",{className:i()(y,"mt-6"),children:[(0,u.jsx)(h,{ingredients:I}),(0,u.jsxs)("span",{className:i()(k),children:[(0,u.jsx)("p",{className:"text text_type_digits-default",children:F}),(0,u.jsx)(N.px,{type:"primary"})]})]})]})},I="feed-items_feedItems__fF8iT",F=e=>{let{ordersData:t,profile:s}=e;const{orders:n=[]}=t||{};return n.length?(0,u.jsx)("div",{className:I,children:n.map((e=>e.ingredients?(0,u.jsx)(w,{order:e,profile:s},e._id):null))}):(0,u.jsx)("h1",{children:"\u0417\u0430\u043a\u0430\u0437\u043e\u0432 \u043d\u0435\u0442"})}},2115:(e,t,s)=>{s.r(t),s.d(t,{default:()=>u});var n=s(5043),r=s(8139),i=s.n(r),a=s(3473),d=s(2852),c=s(1841),l=s(3734),_=s(6861),m=s(4342),o=s(7120);const x="orders_orders__jz3IZ",f="orders_tip__wCdkg";var g=s(579);const u=()=>{const e=(0,a.jL)(),t=(0,a.GV)(l.Zy),s=(0,a.GV)((e=>e.profileOrders.feed));return(0,n.useEffect)((()=>(e(m.p.connect(o.ir)),()=>{e(m.p.disconnect())})),[e]),(0,n.useEffect)((()=>{t[_.I.MAIN].length||e((0,c.L)())}),[e,t]),(0,g.jsxs)(n.Fragment,{children:[s.success?(0,g.jsx)("div",{className:x,children:(0,g.jsx)(d.F,{ordersData:s,profile:!0})}):(0,g.jsx)("h1",{children:"\u0417\u0430\u0433\u0440\u0443\u0437\u043a\u0430..."}),(0,g.jsx)("p",{className:i()(f,"text text_type_main-default text_color_inactive"),children:"\u0412 \u044d\u0442\u043e\u043c \u0440\u0430\u0437\u0434\u0435\u043b\u0435 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u043f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0441\u0432\u043e\u044e \u0438\u0441\u0442\u043e\u0440\u0438\u044e \u0437\u0430\u043a\u0430\u0437\u043e\u0432"})]})}}}]);
//# sourceMappingURL=115.c4520c5e.chunk.js.map