import{r as h,R as I}from"./iframe-CgqaXW-U.js";import{r as _e}from"./index-D-qssfwX.js";import"./preload-helper-Dp1pzeXC.js";var X={exports:{}},S={};/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var G;function xe(){if(G)return S;G=1;var e=Symbol.for("react.transitional.element"),o=Symbol.for("react.fragment");function t(n,r,a){var l=null;if(a!==void 0&&(l=""+a),r.key!==void 0&&(l=""+r.key),"key"in r){a={};for(var s in r)s!=="key"&&(a[s]=r[s])}else a=r;return r=a.ref,{$$typeof:e,type:n,key:l,ref:r!==void 0?r:null,props:a}}return S.Fragment=o,S.jsx=t,S.jsxs=t,S}var Q;function Re(){return Q||(Q=1,X.exports=xe()),X.exports}var d=Re(),Ee=_e(),B=(e=>(e.AND="&&",e.OR="||",e.NOT="!",e.GT=">",e.GTE=">=",e.LT="<",e.LTE="<=",e.EQ="==",e.NEQ="!=",e.PLUS="+",e.MINUS="-",e.MUL="*",e.DIV="/",e))(B||{});const ke={"&&":"&&","||":"\\|\\|","!":"!",">":">",">=":">=","<":"<","<=":"<=","==":"==","!=":"!=","+":"\\+","-":"-","*":"\\*","/":"/"},z=["!"];var i=(e=>(e.VAR="variable",e.VALUE="value",e.UNARY_OP="unary operator",e.BINARY_OP="binary operator",e.OPEN_P="open parenthesis",e.CLOSE_P="close parenthesis",e.SPACE="space",e.UNKNOWN="unknown",e))(i||{});const Ne=e=>{const o=e.filter(n=>!z.includes(n)).sort((n,r)=>r.length-n.length||n.localeCompare(r)),t=new RegExp(`^(${o.map(n=>ke[n]).join("|")})`);return[{type:"space",regex:/^\s+/},{type:"value",regex:/^(?:\d+(?:\.\d*)?|\.\d+|true|false)/},{type:"binary operator",regex:t},{type:"unary operator",regex:/^!/},{type:"open parenthesis",regex:/^\(/},{type:"close parenthesis",regex:/^\)/},{type:"variable",regex:/^[a-zA-Z_][\w.]*/}]},T=(e,o)=>{const t=o.length>0?o:Object.values(B);let n=[],r=0;for(;r<e.length;){let a=!1;const l=e.slice(r);for(const{type:s,regex:u}of Ne(t)){const p=l.match(u);if(p){const _=p[0];n.push({type:s,value:_,start:r,end:r+_.length}),r+=_.length,a=!0;break}}a||(n.push({type:"unknown",value:l[0],start:r,end:r+1}),r++)}return n},Z=(e,o,t)=>{const r=T(e,o).find(a=>t>=a.start&&t<=a.end);return r||{type:null,value:"",start:t,end:t}},Ce="_root_3n8mz_1",Ae="_editor_3n8mz_5",Pe="_validation_3n8mz_13",ye="_token_VAR_3n8mz_21",Ve="_token_VALUE_3n8mz_25",Oe="_token_BINARY_OP_3n8mz_28",we="_token_UNARY_OP_3n8mz_31",Se="_token_UNKNOWN_3n8mz_34",Te="_token_ERROR_3n8mz_38",N={root:Ce,editor:Ae,validation:Pe,token_VAR:ye,token_VALUE:Ve,token_BINARY_OP:Oe,token_UNARY_OP:we,token_UNKNOWN:Se,token_ERROR:Te},v=(e,o)=>o||e,Ie=e=>e.replace(/[&<>"']/g,o=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[o]||o),ee=(e,o,t)=>e.map((r,a)=>{let l="",s=o.errorTokenIndex===a;switch(r.type){case i.VAR:l=v(N.token_VAR,t==null?void 0:t.tokenVar);break;case i.VALUE:l=v(N.token_VALUE,t==null?void 0:t.tokenValue);break;case i.BINARY_OP:l=v(N.token_BINARY_OP,t==null?void 0:t.tokenBinaryOp);break;case i.UNARY_OP:l=v(N.token_UNARY_OP,t==null?void 0:t.tokenUnaryOp);break;case i.UNKNOWN:l=v(N.token_UNKNOWN,t==null?void 0:t.tokenUnknown);break;default:l=""}return`<span title="${Ie(o.error??"")}" class="${l} ${s?v(N.token_ERROR,t==null?void 0:t.tokenError):""}">${r.value}</span>`}).join(""),be=e=>{let o=0;const t=window.getSelection();if(t&&t.rangeCount>0){const n=t.getRangeAt(0),r=n.cloneRange();r.selectNodeContents(e),r.setEnd(n.endContainer,n.endOffset),o=r.toString().length}return o},Ue=(e,o)=>{var l,s;const t=document.createRange(),n=window.getSelection();let r=0,a=e.firstChild;for(;a;){if(a.nodeType===Node.TEXT_NODE){const u=((l=a.textContent)==null?void 0:l.length)||0;if(r+u>=o){t.setStart(a,o-r),t.collapse(!0),n==null||n.removeAllRanges(),n==null||n.addRange(t);return}r+=u}else if(a.childNodes.length>0){const u=a.firstChild;if(u){const p=((s=u.textContent)==null?void 0:s.length)||0;if(r+p>=o){t.setStart(u,o-r),t.collapse(!0),n==null||n.removeAllRanges(),n==null||n.addRange(t);return}r+=p}}a=a.nextSibling}},te=()=>{const e=window.getSelection();if(!e||e.rangeCount===0)return null;const t=e.getRangeAt(0).getBoundingClientRect();return{top:t.bottom,left:t.left}};var k=(e=>(e.EXPECT_OPERAND="expect operand",e.EXPECT_OPERATOR="expect operator",e))(k||{});const je={manageToken:(e,o)=>{let t=k.EXPECT_OPERAND,n=null;switch(e.type){case i.UNKNOWN:n=`Invalid character: "${e.value}"`;break;case i.VAR:case i.VALUE:t=k.EXPECT_OPERATOR;break;case i.OPEN_P:o++;break;case i.UNARY_OP:break;case i.BINARY_OP:n=`Unexpected operator "${e.value}" at start of expression`;case i.CLOSE_P:n="Unexpected closing parenthesis";default:n=`Expected value, found "${e.value}"`}return{state:t,parenDepth:o,error:n}}},De={manageToken:(e,o)=>{let t=k.EXPECT_OPERATOR,n=null;switch(e.type){case i.UNKNOWN:n=`Invalid character: "${e.value}"`;break;case i.BINARY_OP:t=k.EXPECT_OPERAND;break;case i.CLOSE_P:o--,o<0&&(n="Too many closing parentheses");break;case i.VAR:case i.VALUE:n=`Expected operator, found "${e.value}"`;case i.OPEN_P:n="Implicit multiplication not allowed. Use an operator like && or ||";default:n=`Expected operator, found "${e.value}"`}return{state:t,parenDepth:o,error:n}}},H=(e,o,t)=>{let n=k.EXPECT_OPERAND,r=0,a=0,l=null;for(let s=0;s<e.length;s++){const u=e[s];if(u.type===i.SPACE){a=a+u.value.length;continue}if(t&&u.type===i.VAR&&!o.includes(u.value))return{isValid:!1,error:`Unknown variable "${u.value}"`,errorToken:u,errorTokenIndex:s,errorCharPosition:a,state:n};switch(n){case k.EXPECT_OPERAND:({state:n,parenDepth:r,error:l}=je.manageToken(u,r));break;case k.EXPECT_OPERATOR:({state:n,parenDepth:r,error:l}=De.manageToken(u,r));break}if(l)return{isValid:!1,error:l,errorToken:u,errorTokenIndex:s,errorCharPosition:a};a=a+u.value.length}return r!==0?{isValid:!1,error:"Unbalanced parentheses",errorCharPosition:a,state:n}:n===k.EXPECT_OPERAND&&e.filter(s=>s.type!==i.SPACE).length>0?{isValid:!1,error:"Expression cannot end with an operator",errorCharPosition:a,state:n}:{isValid:!0,error:null,state:n}},Le=(e,o,t,n,r,a,l,s)=>{const[u,p]=h.useState([]),[_,g]=h.useState(!1),[w,R]=h.useState({top:0,left:0}),[A,E]=h.useState(0),P=t.length>0?t:Object.values(B),b=[...o,...P],U=(c,C)=>{const f=Z(c,P,C);if(!f.type)return;if([i.VAR,i.BINARY_OP,i.UNKNOWN].includes(f.type)&&f.value.trim().length>0){const y=f.value.toLowerCase(),V=b.filter(x=>x.toLowerCase().startsWith(y)&&x!==f.value);if(V.length<s&&V.push(...b.filter(x=>x.toLowerCase().includes(y)&&x!==f.value)),V.length>0){const x=te();if(x){R(x),p([...new Set(V.slice(0,s))]),E(0),g(!0);return}}}g(!1)},M=c=>{const{state:C}=H(T(c,P),o,!1),f=C==k.EXPECT_OPERAND?[...o,...z]:P.filter(m=>!z.includes(m));if(f.length>0){const m=te();if((m==null?void 0:m.left)===0&&(m==null?void 0:m.top)===0){const y=r.current.getBoundingClientRect();m.left=y.left,m.top=y.top+26}if(m){R(m),p([...new Set(f.slice(0,s))]),E(0),g(!0);return}}g(!1)},j=c=>{var F;const C=n.current||0,f=Z(a,P,C),m=a.slice(0,f.start),y=a.slice(f.end),V=z.includes(c)?"":" ",x=f.type===i.SPACE?" ":"",J=m+x+c+V+y;l(J),e(J),n.current=f.start+x.length+c.length+V.length,g(!1),(F=r.current)==null||F.focus()};return{updateSuggestions:U,showMenu:_,suggestions:u,menuPos:w,selectedIndex:A,setShowMenu:g,setSelectedIndex:E,insertSuggestion:j,handleKeyDown:c=>{var C;_?c.key==="ArrowDown"||c.key==="Tab"?(c.preventDefault(),E(f=>(f+1)%u.length)):c.key==="ArrowUp"?(c.preventDefault(),E(f=>(f-1+u.length)%u.length)):c.key==="Enter"?(c.preventDefault(),j(u[A])):c.key==="Escape"&&g(!1):c.key==="Tab"&&(c.preventDefault(),M(((C=r.current)==null?void 0:C.innerText)||""))}}},We=(e,o,t,n,r)=>{const a=t.length>0?t:Object.values(B),l=T(e,a),[s,u]=h.useState(H(l,o,n)),[p,_]=h.useState(ee(T(e,a),s,r));return{html:p,validation:s,updateHtml:w=>{const R=T(w,a),A=H(R,o,n),E=ee(R,A,r);_(E),u(A)}}},Ye="_menu_zez3e_1",$e="_menuItem_zez3e_16",ze="_menuItemActive_zez3e_23",q={menu:Ye,menuItem:$e,menuItemActive:ze},he=({suggestions:e,menuPos:o,selectedIndex:t,insertSuggestion:n,classes:r})=>{const a=h.useRef(null);return h.useEffect(()=>{if(a.current){const l=a.current.children[t];l&&l.scrollIntoView({block:"nearest"})}},[t]),d.jsx("ul",{className:v(q.menu,r==null?void 0:r.menu),ref:a,style:{top:o.top,left:o.left,pointerEvents:"auto",position:"fixed",zIndex:9999},children:e.map((l,s)=>d.jsx("li",{onMouseDown:u=>{u.preventDefault(),n(l)},className:`${v(q.menuItem,r==null?void 0:r.menuItem)} ${s===t?v(q.menuItemActive,r==null?void 0:r.menuItemActive):""}`,children:l},l))})};he.__docgenInfo={description:"",methods:[],displayName:"AutoCompleteMenu"};const O=({value:e,onChange:o,showValidationText:t,variables:n=[],operators:r=[],constraintVariables:a=!1,maxSuggestions:l=10,classes:s,onValidationChange:u})=>{const p=h.useRef(null),{html:_,validation:g,updateHtml:w}=We(e,n,r,a,s);h.useEffect(()=>{u&&u(g)},[g,u]);const R=h.useRef(0),{updateSuggestions:A,showMenu:E,menuPos:P,suggestions:b,selectedIndex:U,handleKeyDown:M,insertSuggestion:j}=Le(w,n,r,R,p,e,o,l),K=()=>{if(!p.current)return;const c=p.current.innerText;R.current=be(p.current),w(c),o(c),A(c,R.current)};return h.useLayoutEffect(()=>{p.current&&Ue(p.current,R.current)},[_,E,U]),d.jsxs("div",{style:{position:"relative"},className:v(N.root,s==null?void 0:s.root),children:[d.jsx("div",{ref:p,contentEditable:!0,onInput:K,onKeyDown:M,suppressContentEditableWarning:!0,dangerouslySetInnerHTML:{__html:_},className:v(N.editor,s==null?void 0:s.editor),style:{whiteSpace:"pre-wrap"}}),E&&Ee.createPortal(d.jsx(he,{suggestions:b,menuPos:P,selectedIndex:U,insertSuggestion:j,classes:s}),document.body),t&&d.jsx("div",{className:v(N.validation,s==null?void 0:s.validation),children:(g==null?void 0:g.error)&&`${g.error} at character ${g.errorCharPosition}`})]})};O.__docgenInfo={description:"",methods:[],displayName:"Editor",props:{variables:{defaultValue:{value:"[]",computed:!1},required:!1},operators:{defaultValue:{value:"[]",computed:!1},required:!1},constraintVariables:{defaultValue:{value:"false",computed:!1},required:!1},maxSuggestions:{defaultValue:{value:"10",computed:!1},required:!1}}};const qe={title:"Expression Editor",component:O,decorators:[(e,o)=>d.jsxs("div",{style:{maxWidth:"1000px"},children:[d.jsx("h2",{children:"react-expression-editor"}),d.jsx(e,{})]})],args:{variables:["engine.transmission.speed","temperature","var1"],constraintVariables:!0,showValidationText:!0},parameters:{layout:"centered"}},D={render:function(o){const[t,n]=I.useState("");return console.log("Current value",t),d.jsx("div",{style:{maxWidth:"100%",width:"600px"},children:d.jsx(O,{...o,value:t,onChange:n})})},args:{}},L={render:function(o){const[t,n]=I.useState("");return console.log("Current value",t),d.jsx("div",{style:{maxWidth:"100%",width:"600px"},children:d.jsx(O,{...o,value:t,onChange:n})})},args:{constraintVariables:!1}},W={render:function(o){const[t,n]=I.useState("");return console.log("Current value",t),d.jsx("div",{style:{maxWidth:"100%",width:"600px"},children:d.jsx(O,{...o,value:t,onChange:n})})},args:{showValidationText:!1}},Y={render:function(o){const[t,n]=I.useState("(engine.transmission.speed > 100) || !temperature");return console.log("Current value",t),d.jsx("div",{style:{maxWidth:"100%",width:"600px"},children:d.jsx(O,{...o,value:t,onChange:n})})},args:{showValidationText:!1}},$={render:function(o){const[t,n]=I.useState("(engine.transmission.speed > 100) || !temperature");return console.log("Current value",t),d.jsxs("div",{style:{maxWidth:"100%",width:"600px"},children:[d.jsx("style",{children:`
      .c-root {
        background-color: #222;
        color: #fff;
      }
      .token-var {
        color: #fff;
      }

      .token-binary-op {
        color: green;
      }

      .token-value {
        color: yellow;
      }
    `}),d.jsx(O,{...o,value:t,onChange:n})]})},args:{classes:{root:"c-root",tokenVar:"token-var",tokenBinaryOp:"token-binary-op",tokenValue:"token-value"}}};var ne,re,oe;D.parameters={...D.parameters,docs:{...(ne=D.parameters)==null?void 0:ne.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {}
}`,...(oe=(re=D.parameters)==null?void 0:re.docs)==null?void 0:oe.source}}};var ae,se,le;L.parameters={...L.parameters,docs:{...(ae=L.parameters)==null?void 0:ae.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    constraintVariables: false
  }
}`,...(le=(se=L.parameters)==null?void 0:se.docs)==null?void 0:le.source}}};var ue,ie,ce;W.parameters={...W.parameters,docs:{...(ue=W.parameters)==null?void 0:ue.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = React.useState('');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    showValidationText: false
  }
}`,...(ce=(ie=W.parameters)==null?void 0:ie.docs)==null?void 0:ce.source}}};var de,pe,fe;Y.parameters={...Y.parameters,docs:{...(de=Y.parameters)==null?void 0:de.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = React.useState('(engine.transmission.speed > 100) || !temperature');
    console.log('Current value', value);
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    showValidationText: false
  }
}`,...(fe=(pe=Y.parameters)==null?void 0:pe.docs)==null?void 0:fe.source}}};var ge,me,ve;$.parameters={...$.parameters,docs:{...(ge=$.parameters)==null?void 0:ge.docs,source:{originalSource:`{
  render: function Render(args) {
    const [value, setValue] = React.useState('(engine.transmission.speed > 100) || !temperature');
    console.log('Current value', value);
    const css = \`
      .c-root {
        background-color: #222;
        color: #fff;
      }
      .token-var {
        color: #fff;
      }

      .token-binary-op {
        color: green;
      }

      .token-value {
        color: yellow;
      }
    \`;
    return <div style={{
      maxWidth: '100%',
      width: '600px'
    }}>
        <style>{css}</style>
        <Editor {...args} value={value} onChange={setValue} />
      </div>;
  },
  args: {
    classes: {
      root: 'c-root',
      tokenVar: 'token-var',
      tokenBinaryOp: 'token-binary-op',
      tokenValue: 'token-value'
    }
  }
}`,...(ve=(me=$.parameters)==null?void 0:me.docs)==null?void 0:ve.source}}};const He=["Default","NoVariableConstraint","NoValidationMessage","InitialValue","CustomClasses"];export{$ as CustomClasses,D as Default,Y as InitialValue,W as NoValidationMessage,L as NoVariableConstraint,He as __namedExportsOrder,qe as default};
