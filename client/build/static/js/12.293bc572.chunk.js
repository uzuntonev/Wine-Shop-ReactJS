(this["webpackJsonpwine-shop"]=this["webpackJsonpwine-shop"]||[]).push([[12],{408:function(e,a,t){"use strict";t.r(a);var n=t(0),r=t.n(n),i=t(13),l=t(31),o=t(196),c=t(197),m=t(107),s=t(190),d=t(106),p=t(57),u=t(21),h=t(7),b=t(37),f=t(56),x=t(43),g=Object(d.a)((function(e){return{paper:{marginTop:e.spacing(8),marginBottom:e.spacing(14),display:"flex",flexDirection:"column",alignItems:"center",border:"solid 1px ".concat(e.palette.primary.text),padding:"20px",borderRadius:"20px",boxShadow:"3px 3px 5px ".concat(e.palette.primary.text)},avatar:{margin:e.spacing(1),backgroundColor:e.palette.primary.text},form:{width:"100%",marginTop:e.spacing(3)}}})),E=l.a().shape({name:l.c().required("Name is required"),email:l.c().email("Must be valid email").required("Email is required"),town:l.c().required("Town is required"),address:l.c().required("Address is required")});a.default=Object(p.a)((function(e){var a=e.changeHandlerFactory,t=e.formState,l=e.runValidations,d=e.runControlValidation,p=e.formIsInvalid,E=g(),w=Object(i.g)(),q=Object(n.useContext)(u.a),v=q.state,C=q.dispatch,O=a("name"),S=a("town"),j=a("address"),k=a("email"),y=Object(n.useCallback)((function(e){e.preventDefault(),l().then((function(e){x.a.checkoutOrder(v.cart,e).then((function(){C(Object(h.A)()),w.push("/thankyou")}))}))}),[w,C,l,v.cart]);return r.a.createElement(o.a,{component:"main",maxWidth:"xs"},r.a.createElement(c.a,null),r.a.createElement("div",{className:E.paper},r.a.createElement(m.a,{component:"h1",variant:"h5"},"\u0414\u0430\u043d\u043d\u0438 \u0437\u0430 \u043f\u043e\u0440\u044a\u0447\u043a\u0430"),r.a.createElement("form",{className:E.form,onSubmit:y},r.a.createElement(s.a,{container:!0,spacing:2},r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(b.a,{label:"\u0418\u043c\u0435",name:"name",changeHandler:O,runControlValidation:d,formState:t})),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(b.a,{label:"Email \u0430\u0434\u0440\u0435\u0441",name:"email",changeHandler:k,runControlValidation:d,formState:t})),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(b.a,{label:"\u0413\u0440\u0430\u0434",name:"town",changeHandler:S,runControlValidation:d,formState:t})),r.a.createElement(s.a,{item:!0,xs:12},r.a.createElement(b.a,{label:"\u0410\u0434\u0440\u0435\u0441",name:"address",changeHandler:j,runControlValidation:d,formState:t}))),r.a.createElement(f.a,{disabled:p(),title:"\u041f\u043e\u0440\u044a\u0447\u0430\u0439"}))))}),{name:"",email:"",town:"",address:""},E)}}]);
//# sourceMappingURL=12.293bc572.chunk.js.map