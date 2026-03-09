import { useState, useMemo, useEffect } from "react";

const NEEL_PHOTO = "data:image/jpeg;base64,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";

//  Math helpers 
function fCAD(v,d=0){return new Intl.NumberFormat("en-CA",{style:"currency",currency:"CAD",minimumFractionDigits:d,maximumFractionDigits:d}).format(v||0);}
function fPct(v,d=2){return v.toFixed(d)+"%";}
function calcMinDown(p){if(p<=0)return 0;if(p<=500000)return p*0.05;if(p<1500000)return 25000+(p-500000)*0.10;return p*0.20;}
function getCMHCRate(pct,is30){const s=is30?0.002:0;if(pct>=20)return 0;if(pct>=15)return 0.028+s;if(pct>=10)return 0.031+s;if(pct>=5)return 0.040+s;return 0;}
function effRate(annual,comp){const r=annual/100;if(comp==="monthly")return r/12;if(comp==="annual")return Math.pow(1+r,1/12)-1;if(comp==="quarterly")return Math.pow(1+r/4,1/3)-1;return Math.pow(1+r/2,1/6)-1;}
function mtgPmt(P,rate,yrs,comp){if(P<=0||rate<=0)return 0;const rm=effRate(rate,comp),n=yrs*12;return(P*rm*Math.pow(1+rm,n))/(Math.pow(1+rm,n)-1);}
function allPmts(P,rate,yrs,comp){if(P<=0||rate<=0)return{monthly:0,semiMonthly:0,biweekly:0,accelBiweekly:0,weekly:0,accelWeekly:0};const rm=effRate(rate,comp),n=yrs*12,mo=(P*rm*Math.pow(1+rm,n))/(Math.pow(1+rm,n)-1);return{monthly:mo,semiMonthly:mo/2,biweekly:mo*12/26,accelBiweekly:mo/2,weekly:mo*12/52,accelWeekly:mo/4};}
function toMo(a,f){return f==="biweekly"?(a*26)/12:a;}

// Ontario Land Transfer Tax
function calcOntarioLTT(price, fthb){
  let tax=0;
  if(price<=55000) tax=price*0.005;
  else if(price<=250000) tax=275+(price-55000)*0.010;
  else if(price<=400000) tax=2225+(price-250000)*0.015;
  else if(price<=2000000) tax=4475+(price-400000)*0.020;
  else tax=36475+(price-2000000)*0.025;
  const rebate=fthb?Math.min(tax,4000):0;
  return{tax,rebate,net:tax-rebate};
}
// Toronto Municipal LTT (only if toggled)
function calcTorontoLTT(price, fthb){
  let tax=0;
  if(price<=55000) tax=price*0.005;
  else if(price<=400000) tax=275+(price-55000)*0.010;
  else if(price<=40000000) tax=3725+(price-400000)*0.020;
  else tax=795725+(price-40000000)*0.025;
  const rebate=fthb?Math.min(tax,4475):0;
  return{tax,rebate,net:tax-rebate};
}

const FREQS=[
  {key:"monthly",label:"Monthly"},
  {key:"semiMonthly",label:"Semi-Mo"},
  {key:"biweekly",label:"Bi-Weekly"},
  {key:"accelBiweekly",label:"Accel BW"},
  {key:"weekly",label:"Weekly"},
  {key:"accelWeekly",label:"Accel Wk"},
];
const COMPOUNDS=[
  {key:"semi-annual",label:"Semi-Annual"},
  {key:"monthly",label:"Monthly"},
  {key:"quarterly",label:"Quarterly"},
  {key:"annual",label:"Annual"},
];

const C={
  bg:"#f5f5f7", surface:"#ffffff", navy:"#1d1d1f", label:"#6e6e73",
  text:"#1d1d1f", blue:"#0071e3", green:"#34c759", red:"#ff3b30",
  amber:"#ff9500", border:"rgba(0,0,0,0.08)",
  font:"-apple-system,BlinkMacSystemFont,'SF Pro Text','SF Pro Display',sans-serif",
};

function useWidth(){
  const[w,setW]=useState(typeof window!=="undefined"?window.innerWidth:800);
  useEffect(()=>{const h=()=>setW(window.innerWidth);window.addEventListener("resize",h);return()=>window.removeEventListener("resize",h);},[]);
  return w;
}

//  UI Atoms 
function NumInput({value,onChange,pre,suf,ph="0",readOnly}){
  const[f,setF]=useState(false);
  return(
    <div style={{display:"flex",alignItems:"center",height:44,background:f?"#fff":"rgba(118,118,128,0.12)",border:"1.5px solid "+(f?C.blue:"transparent"),borderRadius:10,overflow:"hidden",transition:"border-color 0.18s"}}>
      {pre&&<span style={{padding:"0 12px",fontSize:15,color:C.label,flexShrink:0}}>{pre}</span>}
      <input type="number" inputMode="decimal" min={0} value={value||""} placeholder={ph} readOnly={readOnly}
        onFocus={()=>setF(true)} onBlur={()=>setF(false)}
        onChange={e=>onChange&&onChange(parseFloat(e.target.value)||0)}
        style={{flex:1,border:"none",outline:"none",background:"transparent",fontSize:17,color:C.text,padding:"0 12px",fontFamily:C.font,fontWeight:400,minWidth:0}}/>
      {suf&&<span style={{padding:"0 12px",fontSize:13,color:C.label,flexShrink:0,whiteSpace:"nowrap"}}>{suf}</span>}
    </div>
  );
}

function Pills({value,onChange,options}){
  return(
    <div style={{display:"flex",background:"rgba(118,118,128,0.12)",borderRadius:9,padding:2,gap:1}}>
      {options.map(o=>{
        const k=o.value!==undefined?o.value:o.key;
        const active=value===k;
        return(
          <button key={String(k)} onClick={()=>onChange(k)}
            style={{flex:1,padding:"8px 4px",borderRadius:7,border:"none",cursor:"pointer",background:active?C.surface:"transparent",boxShadow:active?"0 1px 3px rgba(0,0,0,0.14)":"none",color:active?C.text:C.label,fontWeight:active?600:400,fontSize:13,fontFamily:C.font,transition:"all 0.18s",whiteSpace:"nowrap",letterSpacing:"-0.01em"}}>
            {o.label}
          </button>
        );
      })}
    </div>
  );
}

function Field({label,hint,note,children}){
  return(
    <div style={{marginBottom:18}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"baseline",marginBottom:6}}>
        <span style={{fontSize:13,fontWeight:500,color:C.label,letterSpacing:"-0.01em"}}>{label}</span>
        {hint&&<span style={{fontSize:12,color:C.label,opacity:0.75}}>{hint}</span>}
      </div>
      {children}
      {note&&<div style={{fontSize:12,color:C.amber,marginTop:5,fontWeight:500}}>{note}</div>}
    </div>
  );
}

function SectionTitle({children}){
  return <div style={{fontSize:20,fontWeight:700,color:C.text,letterSpacing:"-0.03em",marginBottom:16,marginTop:2}}>{children}</div>;
}
function Divider(){return <div style={{height:1,background:C.border,margin:"22px 0"}}/>;}

function StatRow({label,value,color,big,sub}){
  return(
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"11px 0",borderBottom:"1px solid "+C.border}}>
      <div>
        <span style={{fontSize:big?15:14,color:C.label}}>{label}</span>
        {sub&&<div style={{fontSize:11,color:C.label,opacity:0.65,marginTop:1}}>{sub}</div>}
      </div>
      <span style={{fontSize:big?20:15,fontWeight:big?700:600,color:color||C.text,letterSpacing:"-0.02em"}}>{value}</span>
    </div>
  );
}

function InfoBox({children,color}){
  const bg=color==="green"?"rgba(52,199,89,0.1)":color==="red"?"rgba(255,59,48,0.1)":"rgba(0,113,227,0.07)";
  const tc=color==="green"?C.green:color==="red"?C.red:C.blue;
  return <div style={{background:bg,borderRadius:12,padding:"12px 16px",fontSize:14,color:tc,marginTop:14}}>{children}</div>;
}

function ResultBar({c,selPmt,payFreq}){
  const qualify=c.downPct>0&&c.downPct<5?"warn":c.eligible?"pass":"fail";
  const pillColor=qualify==="warn"?C.amber:qualify==="pass"?C.green:C.red;
  const pillLabel=qualify==="warn"?"Min 5% Down":qualify==="pass"?"Qualifies":"Does Not Qualify";
  return(
    <div style={{background:"#1c1c1e",padding:"14px 20px calc(14px + env(safe-area-inset-bottom,0px))",borderRadius:"20px 20px 0 0",boxShadow:"0 -1px 0 rgba(255,255,255,0.06)"}}>
      <div style={{display:"flex",justifyContent:"space-between",marginBottom:12}}>
        <div>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:2}}>Max Mortgage</div>
          <div style={{fontSize:26,fontWeight:700,color:"#fff",letterSpacing:"-0.03em",lineHeight:1}}>{fCAD(c.maxMtg)}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:3}}>Stress @ {c.stressR.toFixed(2)}%</div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:11,color:"rgba(255,255,255,0.4)",fontWeight:500,letterSpacing:"0.06em",textTransform:"uppercase",marginBottom:2}}>Payment</div>
          <div style={{fontSize:26,fontWeight:700,color:"#fff",letterSpacing:"-0.03em",lineHeight:1}}>{fCAD(selPmt,2)}</div>
          <div style={{fontSize:12,color:"rgba(255,255,255,0.35)",marginTop:3}}>{FREQS.find(f=>f.key===payFreq)?.label}</div>
        </div>
      </div>
      <div style={{display:"flex",gap:8}}>
        <div style={{flex:1,background:"rgba(255,255,255,0.07)",borderRadius:10,padding:"8px 0",textAlign:"center"}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.38)",marginBottom:1}}>GDS</div>
          <div style={{fontSize:17,fontWeight:700,color:c.gdsPass?C.green:C.red,letterSpacing:"-0.02em"}}>{c.gds.toFixed(1)}%</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>max 39%</div>
        </div>
        <div style={{flex:1,background:"rgba(255,255,255,0.07)",borderRadius:10,padding:"8px 0",textAlign:"center"}}>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.38)",marginBottom:1}}>TDS</div>
          <div style={{fontSize:17,fontWeight:700,color:c.tdsPass?C.green:C.red,letterSpacing:"-0.02em"}}>{c.tds.toFixed(1)}%</div>
          <div style={{fontSize:10,color:"rgba(255,255,255,0.28)"}}>max 44%</div>
        </div>
        <div style={{flex:2,background:pillColor+"28",border:"1px solid "+pillColor+"55",borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",padding:"8px"}}>
          <span style={{fontSize:14,fontWeight:700,color:pillColor}}>{pillLabel}</span>
        </div>
      </div>
    </div>
  );
}

//  Main App 
export default function App(){
  const w=useWidth();
  const mobile=w<1024;

  // Qualifier state
  const[income,setIncome]=useState(0);
  const[coIncome,setCoIncome]=useState(0);
  const[rental,setRental]=useState(0);
  const[price,setPrice]=useState(0);
  const[down,setDown]=useState(0);
  const[rate,setRate]=useState(5.0);
  const[amort,setAmort]=useState(25);
  const[isFTHB,setIsFTHB]=useState(false);
  const[compound,setCompound]=useState("semi-annual");
  const[taxMode,setTaxMode]=useState("monthly");
  const[tax,setTax]=useState(0);
  const[condo,setCondo]=useState(0);
  const[carAmt,setCarAmt]=useState(0);
  const[carFreq,setCarFreq]=useState("monthly");
  const[studMode,setStudMode]=useState("payment");
  const[studPmt,setStudPmt]=useState(0);
  const[studFreq,setStudFreq]=useState("monthly");
  const[studBal,setStudBal]=useState(0);
  const[ccBal,setCcBal]=useState(0);
  const[otherAmt,setOtherAmt]=useState(0);
  const[otherFreq,setOtherFreq]=useState("monthly");
  const[heat,setHeat]=useState(100);
  const[payFreq,setPayFreq]=useState("monthly");
  // Income tool
  const[targetPrice,setTargetPrice]=useState(0);
  const[targetDown,setTargetDown]=useState(0);
  // LTT
  const[lttPrice,setLttPrice]=useState(0);
  const[lttFTHB,setLttFTHB]=useState(false);
  const[lttToronto,setLttToronto]=useState(false);
  // Closing costs
  const[ccPrice,setCcPrice]=useState(0);
  const[ccLegal,setCcLegal]=useState(1500);
  const[ccInspect,setCcInspect]=useState(500);
  const[ccTitle,setCcTitle]=useState(300);
  const[ccOther,setCcOther]=useState(500);
  const[ccFTHB,setCcFTHB]=useState(false);
  const[ccDown,setCcDown]=useState(0);
  const[ccToronto,setCcToronto]=useState(false);
  // Rent vs Buy
  const[rvbRent,setRvbRent]=useState(0);
  const[rvbPrice,setRvbPrice]=useState(0);
  const[rvbDown,setRvbDown]=useState(0);
  const[rvbRate,setRvbRate]=useState(5.0);
  const[rvbAppreciation,setRvbAppreciation]=useState(3.0);
  const[rvbRentIncrease,setRvbRentIncrease]=useState(3.0);
  const[rvbYears,setRvbYears]=useState(5);
  // Amort table
  const[atPrice,setAtPrice]=useState(0);
  const[atDown,setAtDown]=useState(0);
  const[atRate,setAtRate]=useState(5.0);
  const[atAmort,setAtAmort]=useState(25);
  const[atComp,setAtComp]=useState("semi-annual");
  // Refinance
  const[rfBalance,setRfBalance]=useState(0);
  const[rfCurrentRate,setRfCurrentRate]=useState(0);
  const[rfNewRate,setRfNewRate]=useState(0);
  const[rfAmort,setRfAmort]=useState(25);
  const[rfPenalty,setRfPenalty]=useState(0);
  const[rfComp,setRfComp]=useState("semi-annual");
  // Renewal
  const[rnBalance,setRnBalance]=useState(0);
  const[rnCurrentRate,setRnCurrentRate]=useState(0);
  const[rnNewRate,setRnNewRate]=useState(0);
  const[rnAmort,setRnAmort]=useState(20);
  const[rnRenewalDate,setRnRenewalDate]=useState("");
  const[rnComp,setRnComp]=useState("semi-annual");

  const[tab,setTab]=useState("inputs");
  const[resetFlash,setResetFlash]=useState(false);

  const is30=amort>25;
  function handleFTHB(v){setIsFTHB(v);setAmort(v?30:25);}
  function handleReset(){
    // Qualifier
    setIncome(0);setCoIncome(0);setRental(0);setPrice(0);setDown(0);
    setRate(5.0);setAmort(25);setIsFTHB(false);setCompound("semi-annual");
    setTaxMode("monthly");setTax(0);setCondo(0);setHeat(100);
    setCarAmt(0);setCarFreq("monthly");setStudMode("payment");
    setStudPmt(0);setStudFreq("monthly");setStudBal(0);
    setCcBal(0);setOtherAmt(0);setOtherFreq("monthly");setPayFreq("monthly");
    // Income tool
    setTargetPrice(0);setTargetDown(0);
    // LTT
    setLttPrice(0);setLttFTHB(false);setLttToronto(false);
    // Closing costs
    setCcPrice(0);setCcDown(0);setCcLegal(1500);setCcInspect(500);
    setCcTitle(300);setCcOther(500);setCcFTHB(false);setCcToronto(false);
    // Rent vs Buy
    setRvbRent(0);setRvbPrice(0);setRvbDown(0);setRvbRate(5.0);
    setRvbAppreciation(3.0);setRvbRentIncrease(3.0);setRvbYears(5);
    // Amortization
    setAtPrice(0);setAtDown(0);setAtRate(5.0);setAtAmort(25);setAtComp("semi-annual");
    // Refinance
    setRfBalance(0);setRfCurrentRate(0);setRfNewRate(0);
    setRfAmort(25);setRfPenalty(0);setRfComp("semi-annual");
    // Renewal
    setRnBalance(0);setRnCurrentRate(0);setRnNewRate(0);
    setRnAmort(20);setRnRenewalDate("");setRnComp("semi-annual");
    // Return to first tab
    setTab("inputs");
    setResetFlash(true);
    setTimeout(()=>setResetFlash(false),1200);
  }
  function setMinDown(){if(price>0)setDown(Math.ceil(calcMinDown(price)));}

  //  Qualifier calc 
  const c=useMemo(()=>{
    const grossMo=(income+coIncome)/12;
    const rentAdd=(rental*0.5)/12;
    const qualMo=grossMo+rentAdd;
    const downPct=price>0?(down/price)*100:0;
    const cmhcRate=getCMHCRate(downPct,is30);
    const baseMtg=Math.max(0,price-down);
    const cmhcAmt=baseMtg*cmhcRate;
    const totalMtg=baseMtg+cmhcAmt;
    const stressR=Math.max(rate+2,5.25);
    const qualPmt=mtgPmt(totalMtg,stressR,amort,"semi-annual");
    const pmts=allPmts(totalMtg,rate,amort,compound);
    const moTax=taxMode==="annual"?tax/12:tax;
    const condoC=condo*0.5;
    const carM=toMo(carAmt,carFreq);
    const studM=studMode==="balance"?studBal*0.01:toMo(studPmt,studFreq);
    const ccM=ccBal*0.03;
    const othM=toMo(otherAmt,otherFreq);
    const gdsN=qualPmt+moTax+heat+condoC;
    const tdsN=gdsN+carM+studM+ccM+othM;
    const gds=qualMo>0?(gdsN/qualMo)*100:0;
    const tds=qualMo>0?(tdsN/qualMo)*100:0;
    const rm=effRate(stressR,"semi-annual");
    const n=amort*12;
    const avail=qualMo*0.44-carM-studM-ccM-othM-moTax-heat-condoC;
    const maxB=avail>0&&rm>0?(avail*(Math.pow(1+rm,n)-1))/(rm*Math.pow(1+rm,n)):0;
    const maxMtg=cmhcRate>0?maxB/(1+cmhcRate):maxB;
    const incNeeded=Math.max(gdsN/0.39,tdsN/0.44)*12;
    const minDown=calcMinDown(price);
    let incReqForTarget=0;
    if(targetPrice>0){
      const td=targetDown>0?targetDown:calcMinDown(targetPrice);
      const tdPct=td/targetPrice*100;
      const tcmhc=getCMHCRate(tdPct,is30);
      const tbM=Math.max(0,targetPrice-td);
      const tTot=tbM*(1+tcmhc);
      const tPmt=mtgPmt(tTot,stressR,amort,"semi-annual");
      const tGds=tPmt+moTax+heat+condoC;
      const tTds=tGds+carM+studM+ccM+othM;
      incReqForTarget=Math.max(tGds/0.39,tTds/0.44)*12;
    }
    const scenarios=[5,10,15,20].map(pct=>{
      const sd=Math.round(price*pct/100);
      const scmhc=getCMHCRate(pct,is30);
      const sbM=Math.max(0,price-sd);
      const sTot=sbM*(1+scmhc);
      const sPmt=mtgPmt(sTot,stressR,amort,"semi-annual");
      const sActual=allPmts(sTot,rate,amort,compound).monthly;
      const sGdsN=sPmt+moTax+heat+condoC;
      const sTdsN=sGdsN+carM+studM+ccM+othM;
      const sGds=qualMo>0?(sGdsN/qualMo)*100:0;
      const sTds=qualMo>0?(sTdsN/qualMo)*100:0;
      return{pct,down:sd,cmhcPct:scmhc*100,totalMtg:sTot,actualMonthly:sActual,gds:sGds,tds:sTds,gdsPass:sGds<=39,tdsPass:sTds<=44};
    });
    return{qualMo,downPct,cmhcRate,cmhcAmt,baseMtg,totalMtg,stressR,qualPmt,pmts,moTax,heat,condoC,carM,studM,ccM,othM,gdsN,tdsN,gds,tds,gdsPass:gds<=39,tdsPass:tds<=44,eligible:gds<=39&&tds<=44&&downPct>=5&&price<1500000,maxMtg,incNeeded,minDown,incReqForTarget,scenarios};
  },[income,coIncome,rental,price,down,rate,amort,compound,tax,taxMode,condo,heat,carAmt,carFreq,studMode,studPmt,studFreq,studBal,ccBal,otherAmt,otherFreq,is30,targetPrice,targetDown]);

  const selPmt=c.pmts[payFreq]||0;

  //  LTT calc 
  const ltt=useMemo(()=>{
    if(lttPrice<=0)return null;
    const ontario=calcOntarioLTT(lttPrice,lttFTHB);
    const toronto=lttToronto?calcTorontoLTT(lttPrice,lttFTHB):{tax:0,rebate:0,net:0};
    const total=ontario.net+toronto.net;
    return{ontario,toronto,total};
  },[lttPrice,lttFTHB,lttToronto]);

  //  Closing costs calc 
  const closing=useMemo(()=>{
    if(ccPrice<=0)return null;
    const ontario=calcOntarioLTT(ccPrice,ccFTHB);
    const toronto=ccToronto?calcTorontoLTT(ccPrice,ccFTHB):{net:0};
    const lttTotal=ontario.net+toronto.net;
    // Total target is 1.5% of price; line items fill that budget
    const targetTotal=ccPrice*0.015;
    const total=lttTotal+ccLegal+ccInspect+ccTitle+ccOther;
    const pct=ccPrice>0?total/ccPrice*100:0;
    return{lttTotal,legal:ccLegal,inspect:ccInspect,title:ccTitle,other:ccOther,total,targetTotal,pct};
  },[ccPrice,ccLegal,ccInspect,ccTitle,ccOther,ccFTHB,ccToronto]);

  //  Rent vs Buy calc 
  const rvb=useMemo(()=>{
    if(rvbPrice<=0||rvbRent<=0)return null;
    const yrs=rvbYears;
    const dn=rvbDown>0?rvbDown:calcMinDown(rvbPrice);
    const cmhc=getCMHCRate((dn/rvbPrice)*100,false);
    const mtg=Math.max(0,rvbPrice-dn)*(1+cmhc);
    const pmt=mtgPmt(mtg,rvbRate,25,"semi-annual");
    // Buy costs over N years
    const propTaxAnnual=rvbPrice*0.01;
    const maintAnnual=rvbPrice*0.01;
    const totalBuyCost=pmt*12*yrs+propTaxAnnual*yrs+maintAnnual*yrs;
    const futureValue=rvbPrice*Math.pow(1+rvbAppreciation/100,yrs);
    // Rent cost over N years with increases
    let totalRentCost=0, rent=rvbRent;
    for(let i=0;i<yrs;i++){totalRentCost+=rent*12;rent*=(1+rvbRentIncrease/100);}
    // Equity built
    const rm=effRate(rvbRate,"semi-annual");
    const n=25*12;
    let bal=mtg;
    for(let i=0;i<yrs*12;i++){bal=bal*(1+rm)-pmt;}
    bal=Math.max(0,bal);
    const equity=futureValue-bal;
    const netBuyCost=totalBuyCost-(equity-dn);
    return{pmt,totalBuyCost,totalRentCost,futureValue,equity,netBuyCost,buyWins:netBuyCost<totalRentCost,dn};
  },[rvbRent,rvbPrice,rvbDown,rvbRate,rvbAppreciation,rvbRentIncrease,rvbYears]);

  //  Amortization table 
  const amortTable=useMemo(()=>{
    if(atPrice<=0)return[];
    const dn=atDown>0?atDown:calcMinDown(atPrice);
    const cmhc=getCMHCRate((dn/atPrice)*100,false);
    const principal=Math.max(0,atPrice-dn)*(1+cmhc);
    if(principal<=0)return[];
    const rm=effRate(atRate,atComp);
    const n=atAmort*12;
    const pmt=(principal*rm*Math.pow(1+rm,n))/(Math.pow(1+rm,n)-1);
    let bal=principal;
    const rows=[];
    for(let yr=1;yr<=atAmort;yr++){
      let intYr=0,prinYr=0;
      for(let m=0;m<12;m++){
        const intM=bal*rm;
        const prinM=pmt-intM;
        intYr+=intM;prinYr+=prinM;
        bal=Math.max(0,bal-prinM);
      }
      rows.push({yr,payment:pmt*12,interest:intYr,principal:prinYr,balance:bal});
      if(bal<=0)break;
    }
    return{rows,pmt,principal};
  },[atPrice,atDown,atRate,atAmort,atComp]);

  //  Refinance calc 
  const refi=useMemo(()=>{
    if(rfBalance<=0||rfCurrentRate<=0||rfNewRate<=0)return null;
    const oldPmt=mtgPmt(rfBalance,rfCurrentRate,rfAmort,rfComp);
    const newPmt=mtgPmt(rfBalance,rfNewRate,rfAmort,rfComp);
    const monthlySavings=oldPmt-newPmt;
    const breakEvenMonths=rfPenalty>0&&monthlySavings>0?Math.ceil(rfPenalty/monthlySavings):0;
    const annualSavings=monthlySavings*12;
    const lifetimeSavings=monthlySavings*rfAmort*12;
    return{oldPmt,newPmt,monthlySavings,annualSavings,breakEvenMonths,lifetimeSavings,saves:monthlySavings>0};
  },[rfBalance,rfCurrentRate,rfNewRate,rfAmort,rfPenalty,rfComp]);

  //  Renewal calc 
  const renewal=useMemo(()=>{
    if(rnBalance<=0||rnCurrentRate<=0||rnNewRate<=0)return null;
    const oldPmt=mtgPmt(rnBalance,rnCurrentRate,rnAmort,rnComp);
    const newPmt=mtgPmt(rnBalance,rnNewRate,rnAmort,rnComp);
    const diff=newPmt-oldPmt;
    let daysUntil=null;
    if(rnRenewalDate){
      const today=new Date();
      const rd=new Date(rnRenewalDate);
      daysUntil=Math.round((rd-today)/(1000*60*60*24));
    }
    const urgency=daysUntil!==null?(daysUntil<=30?"red":daysUntil<=90?"amber":"green"):null;
    return{oldPmt,newPmt,diff,daysUntil,urgency,higher:diff>0};
  },[rnBalance,rnCurrentRate,rnNewRate,rnAmort,rnRenewalDate,rnComp]);

  //  PANES 
  const InputsPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Income</SectionTitle>
      <Field label="Primary Annual Income"><NumInput value={income} onChange={setIncome} pre="$" suf="/yr"/></Field>
      <Field label="Co-Borrower Income"><NumInput value={coIncome} onChange={setCoIncome} pre="$" suf="/yr"/></Field>
      <Field label="Rental Income" hint="50% add-back"><NumInput value={rental} onChange={setRental} pre="$" suf="/mo gross"/></Field>
      {(income+coIncome)>0&&(
        <div style={{background:"rgba(0,113,227,0.08)",borderRadius:10,padding:"10px 14px",fontSize:13,color:C.blue,fontWeight:500,marginTop:-6,marginBottom:18}}>
          Qualifying: {fCAD(c.qualMo*12,0)}/yr ({fCAD(c.qualMo,0)}/mo)
        </div>
      )}
      <Divider/>
      <SectionTitle>Property</SectionTitle>
      <Field label="Purchase Price"><NumInput value={price} onChange={setPrice} pre="$"/></Field>
      <Field label="Down Payment" hint={price>0?c.downPct.toFixed(1)+"% | min "+fCAD(c.minDown):""}
        note={c.downPct>0&&c.downPct<5?"Minimum 5% required":undefined}>
        <NumInput value={down} onChange={setDown} pre="$"/>
        <div style={{display:"flex",gap:6,marginTop:8,flexWrap:"wrap"}}>
          {[{label:"Min",fn:()=>setDown(Math.ceil(calcMinDown(price)))},{label:"10%",fn:()=>setDown(Math.round(price*0.10))},{label:"15%",fn:()=>setDown(Math.round(price*0.15))},{label:"20%",fn:()=>setDown(Math.round(price*0.20))}].map(opt=>(
            <button key={opt.label} onClick={opt.fn} disabled={price<=0}
              style={{flex:1,height:34,borderRadius:8,border:"1px solid "+C.border,background:"rgba(118,118,128,0.1)",color:price>0?C.text:C.label,fontSize:13,fontWeight:500,cursor:price>0?"pointer":"default",fontFamily:C.font,transition:"all 0.15s"}}>
              {opt.label}
            </button>
          ))}
        </div>
      </Field>
      <Field label="First-Time Buyer">
        <Pills value={isFTHB} onChange={handleFTHB} options={[{value:false,label:"No"},{value:true,label:"Yes (enables 30yr)"}]}/>
      </Field>
      <Field label="Amortization"><NumInput value={amort} onChange={v=>setAmort(Math.min(30,Math.max(5,v)))} suf="years"/></Field>
      <Field label="Interest Rate" hint={"Stress test: "+c.stressR.toFixed(2)+"%"}><NumInput value={rate} onChange={setRate} pre="%" suf="annual"/></Field>
      <Field label="Compounding">
        <Pills value={compound} onChange={setCompound} options={COMPOUNDS.map(x=>({key:x.key,label:x.label}))}/>
      </Field>
      <Divider/>
      <SectionTitle>Housing Costs</SectionTitle>
      <Field label="Property Tax">
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1}}><NumInput value={tax} onChange={setTax} pre="$"/></div>
          <div style={{width:170}}><Pills value={taxMode} onChange={setTaxMode} options={[{key:"monthly",label:"Monthly"},{key:"annual",label:"Annual"}]}/></div>
        </div>
      </Field>
      <Field label="Heating" hint="default $100/mo"><NumInput value={heat} onChange={setHeat} pre="$" suf="/mo"/></Field>
      <Field label="Condo Fees" hint={condo>0?fCAD(c.condoC,0)+"/mo used":"50% counted"}><NumInput value={condo} onChange={setCondo} pre="$" suf="/mo"/></Field>
      <Divider/>
      <SectionTitle>Debts</SectionTitle>
      <Field label="Car Payment">
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1}}><NumInput value={carAmt} onChange={setCarAmt} pre="$"/></div>
          <div style={{width:170}}><Pills value={carFreq} onChange={setCarFreq} options={[{key:"monthly",label:"Monthly"},{key:"biweekly",label:"Bi-Weekly"}]}/></div>
        </div>
      </Field>
      <Field label="Student Loan">
        <div style={{marginBottom:8}}><Pills value={studMode} onChange={setStudMode} options={[{key:"payment",label:"By Payment"},{key:"balance",label:"By Balance (1%)"}]}/></div>
        {studMode==="payment"
          ?<div style={{display:"flex",gap:8}}><div style={{flex:1}}><NumInput value={studPmt} onChange={setStudPmt} pre="$"/></div><div style={{width:170}}><Pills value={studFreq} onChange={setStudFreq} options={[{key:"monthly",label:"Monthly"},{key:"biweekly",label:"Bi-Weekly"}]}/></div></div>
          :<NumInput value={studBal} onChange={setStudBal} pre="$" suf="balance"/>}
      </Field>
      <Field label="Credit Cards" hint="3% of balance"><NumInput value={ccBal} onChange={setCcBal} pre="$" suf="balance"/></Field>
      <Field label="Other Debt">
        <div style={{display:"flex",gap:8}}>
          <div style={{flex:1}}><NumInput value={otherAmt} onChange={setOtherAmt} pre="$"/></div>
          <div style={{width:170}}><Pills value={otherFreq} onChange={setOtherFreq} options={[{key:"monthly",label:"Monthly"},{key:"biweekly",label:"Bi-Weekly"}]}/></div>
        </div>
      </Field>
    </div>
  );

  const ResultsPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Qualification</SectionTitle>
      <StatRow label="Qualifying Income" value={fCAD(c.qualMo*12,0)+"/yr"}/>
      <StatRow label="Stress Test Payment" value={fCAD(c.qualPmt,0)+"/mo"}/>
      <StatRow label="GDS Ratio" value={fPct(c.gds)+" (max 39%)"} color={c.gdsPass?C.green:C.red}/>
      <StatRow label="TDS Ratio" value={fPct(c.tds)+" (max 44%)"} color={c.tdsPass?C.green:C.red}/>
      <StatRow label="Max Mortgage" value={fCAD(c.maxMtg,0)} color={C.blue} big/>
      <StatRow label="Income Needed" value={fCAD(c.incNeeded,0)+"/yr"}/>
      {price>0&&(
        <InfoBox color={c.eligible?"green":"red"}>
          <div style={{fontWeight:600}}>{c.eligible?"Client likely qualifies.":"Client does not qualify."}</div>
          {!c.eligible&&c.incNeeded>(income+coIncome)&&<div style={{fontWeight:400,fontSize:13,marginTop:3,color:C.label}}>Shortfall: {fCAD(c.incNeeded-(income+coIncome),0)}/yr</div>}
        </InfoBox>
      )}
      {c.eligible&&(
        <a href="https://velocity-client.newton.ca/en/client/journey/home?shortCode=pzdcffg7l1o6" target="_blank" rel="noopener noreferrer"
          style={{display:"block",marginTop:12,padding:"14px",borderRadius:14,background:C.blue,textAlign:"center",textDecoration:"none"}}>
          <span style={{fontSize:16,fontWeight:700,color:"#fff",letterSpacing:"-0.02em"}}>Apply Now</span>
          <span style={{display:"block",fontSize:12,color:"rgba(255,255,255,0.7)",marginTop:2}}>Continue to full application</span>
        </a>
      )}
      <Divider/>
      <SectionTitle>Payments</SectionTitle>
      <div style={{marginBottom:12}}><Pills value={payFreq} onChange={setPayFreq} options={FREQS.map(f=>({key:f.key,label:f.label}))}/></div>
      <div style={{textAlign:"center",padding:"14px 0 18px"}}>
        <div style={{fontSize:13,color:C.label,marginBottom:4}}>{FREQS.find(f=>f.key===payFreq)?.label} at {rate}%</div>
        <div style={{fontSize:48,fontWeight:700,color:C.text,letterSpacing:"-0.05em"}}>{fCAD(selPmt,2)}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {FREQS.map(f=>(
          <div key={f.key} onClick={()=>setPayFreq(f.key)}
            style={{background:payFreq===f.key?"rgba(0,113,227,0.08)":"rgba(118,118,128,0.07)",borderRadius:10,padding:"10px 12px",cursor:"pointer",border:"1.5px solid "+(payFreq===f.key?C.blue:"transparent"),transition:"all 0.18s"}}>
            <div style={{fontSize:12,color:C.label,marginBottom:3}}>{f.label}</div>
            <div style={{fontSize:16,fontWeight:600,color:payFreq===f.key?C.blue:C.text}}>{fCAD(c.pmts[f.key]||0,2)}</div>
          </div>
        ))}
      </div>
      {price>0&&(
        <>
          <Divider/>
          <SectionTitle>CMHC Insurance</SectionTitle>
          <StatRow label="Down Payment" value={fPct(c.downPct)}/>
          <StatRow label="CMHC Rate" value={c.cmhcRate>0?fPct(c.cmhcRate*100):"None"} color={c.cmhcRate>0?C.amber:C.green}/>
          <StatRow label="CMHC Premium" value={fCAD(c.cmhcAmt,0)}/>
          <StatRow label="Base Mortgage" value={fCAD(c.baseMtg,0)}/>
          <StatRow label="Total Mortgage" value={fCAD(c.totalMtg,0)} color={C.blue} big/>
          {c.cmhcRate>0&&is30&&<div style={{marginTop:10,fontSize:12,color:C.amber,fontWeight:500}}>+0.20% surcharge applied (amort over 25yr)</div>}
        </>
      )}
    </div>
  );

  const IncomePane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Income Required</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Enter a target purchase price to see how much income is needed and how your down payment affects qualification.</p>
      <Field label="Target Purchase Price"><NumInput value={targetPrice} onChange={setTargetPrice} pre="$"/></Field>
      <Field label="Down Payment" hint="Leave 0 for minimum"><NumInput value={targetDown} onChange={setTargetDown} pre="$"/></Field>
      {targetPrice>0&&(
        <>
          <div style={{background:"rgba(0,113,227,0.06)",border:"1px solid rgba(0,113,227,0.15)",borderRadius:16,padding:"20px",marginTop:8,marginBottom:16}}>
            <div style={{fontSize:13,color:C.label,marginBottom:4}}>Income required for {fCAD(targetPrice,0)}</div>
            <div style={{fontSize:48,fontWeight:700,color:C.blue,letterSpacing:"-0.05em",lineHeight:1}}>{fCAD(c.incReqForTarget,0)}</div>
            <div style={{fontSize:14,color:C.label,marginTop:4,marginBottom:targetDown>0||income+coIncome>0?16:0}}>/year</div>
            {(income+coIncome)>0&&(
              <div style={{borderTop:"1px solid rgba(0,113,227,0.12)",paddingTop:14}}>
                <div style={{fontSize:13,color:C.label,marginBottom:4}}>Your income: {fCAD(income+coIncome,0)}/yr</div>
                {c.incReqForTarget<=(income+coIncome)
                  ?<div style={{fontSize:14,fontWeight:600,color:C.green}}>Current income is sufficient</div>
                  :<div style={{fontSize:14,fontWeight:600,color:C.red}}>Shortfall: {fCAD(c.incReqForTarget-(income+coIncome),0)}/yr</div>
                }
              </div>
            )}
          </div>
          <Divider/>
          <SectionTitle>Down Payment Scenarios</SectionTitle>
          <p style={{fontSize:13,color:C.label,marginBottom:14,lineHeight:1.5}}>How different down payments affect qualification and income needed. Tap to apply.</p>
          {[{label:"Min",getPct:p=>calcMinDown(p)/p*100,getDown:p=>Math.ceil(calcMinDown(p))},{label:"10%",getPct:()=>10,getDown:p=>Math.round(p*0.10)},{label:"15%",getPct:()=>15,getDown:p=>Math.round(p*0.15)},{label:"20%",getPct:()=>20,getDown:p=>Math.round(p*0.20)}].map(opt=>{
            const sd=opt.getDown(targetPrice);
            const sdPct=sd/targetPrice*100;
            const scmhc=getCMHCRate(sdPct,is30);
            const sbM=Math.max(0,targetPrice-sd);
            const sTot=sbM*(1+scmhc);
            const stressR=Math.max(rate+2,5.25);
            const sPmt=mtgPmt(sTot,stressR,amort,"semi-annual");
            const moTax=tax>0?(taxMode==="annual"?tax/12:tax):0;
            const condoC=condo*0.5;
            const carM=toMo(carAmt,carFreq);
            const studM=studMode==="balance"?studBal*0.01:toMo(studPmt,studFreq);
            const ccM=ccBal*0.03;
            const othM=toMo(otherAmt,otherFreq);
            const sGds=sPmt+moTax+heat+condoC;
            const sTds=sGds+carM+studM+ccM+othM;
            const incReq=Math.max(sGds/0.39,sTds/0.44)*12;
            const qualMo=c.qualMo;
            const maxRm=effRate(stressR,"semi-annual");
            const maxN=amort*12;
            const avail=qualMo*0.44-carM-studM-ccM-othM-moTax-heat-condoC;
            const maxB=avail>0&&maxRm>0?(avail*(Math.pow(1+maxRm,maxN)-1))/(maxRm*Math.pow(1+maxRm,maxN)):0;
            const maxMtgS=scmhc>0?maxB/(1+scmhc):maxB;
            const maxPrice=maxMtgS+sd;
            const qualifies=(income+coIncome)>0&&incReq<=(income+coIncome);
            const active=Math.abs(targetDown-sd)<100;
            return(
              <div key={opt.label} onClick={()=>setTargetDown(sd)}
                style={{borderRadius:14,padding:"14px",marginBottom:10,cursor:"pointer",background:active?"rgba(0,113,227,0.07)":"rgba(118,118,128,0.05)",border:"1.5px solid "+(active?C.blue:"transparent"),transition:"all 0.18s"}}>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <div style={{display:"flex",alignItems:"center",gap:8}}>
                    <span style={{fontSize:15,fontWeight:700,color:C.blue}}>{opt.label}</span>
                    <span style={{fontSize:13,color:C.label}}>{fCAD(sd,0)} ({sdPct.toFixed(1)}%)</span>
                  </div>
                  {(income+coIncome)>0&&<span style={{fontSize:12,fontWeight:600,padding:"3px 10px",borderRadius:20,background:qualifies?"rgba(52,199,89,0.12)":"rgba(255,59,48,0.10)",color:qualifies?C.green:C.red}}>{qualifies?"Qualifies":"Short"}</span>}
                </div>
                <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                  <div style={{background:"rgba(118,118,128,0.07)",borderRadius:10,padding:"9px 11px"}}>
                    <div style={{fontSize:11,color:C.label,marginBottom:2}}>Income Needed</div>
                    <div style={{fontSize:14,fontWeight:700,color:incReq<=(income+coIncome)||income+coIncome===0?C.text:C.red}}>{fCAD(incReq,0)}<span style={{fontSize:11,fontWeight:400,color:C.label}}>/yr</span></div>
                  </div>
                  <div style={{background:"rgba(118,118,128,0.07)",borderRadius:10,padding:"9px 11px"}}>
                    <div style={{fontSize:11,color:C.label,marginBottom:2}}>Max Purchase Price</div>
                    <div style={{fontSize:14,fontWeight:700,color:C.blue}}>{fCAD(maxPrice,0)}</div>
                  </div>
                  <div style={{background:"rgba(118,118,128,0.07)",borderRadius:10,padding:"9px 11px"}}>
                    <div style={{fontSize:11,color:C.label,marginBottom:2}}>CMHC Rate</div>
                    <div style={{fontSize:14,fontWeight:700,color:scmhc>0?C.amber:C.green}}>{scmhc>0?(scmhc*100).toFixed(2)+"%":"None"}</div>
                  </div>
                  <div style={{background:"rgba(118,118,128,0.07)",borderRadius:10,padding:"9px 11px"}}>
                    <div style={{fontSize:11,color:C.label,marginBottom:2}}>Mtg Payment/mo</div>
                    <div style={{fontSize:14,fontWeight:700}}>{fCAD(allPmts(sTot,rate,amort,"semi-annual").monthly,0)}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </>
      )}
    </div>
  );

  const LTTPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Land Transfer Tax</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Ontario LTT calculated automatically. Add Toronto municipal tax if buying in the City of Toronto.</p>
      <Field label="Purchase Price"><NumInput value={lttPrice} onChange={setLttPrice} pre="$"/></Field>
      <Field label="First-Time Buyer">
        <Pills value={lttFTHB} onChange={setLttFTHB} options={[{value:false,label:"No"},{value:true,label:"Yes (rebate applied)"}]}/>
      </Field>
      <Field label="City of Toronto">
        <Pills value={lttToronto} onChange={setLttToronto} options={[{value:false,label:"No"},{value:true,label:"Yes (add municipal LTT)"}]}/>
      </Field>
      {ltt&&(
        <>
          <Divider/>
          <SectionTitle>Ontario LTT</SectionTitle>
          <StatRow label="Base Tax" value={fCAD(ltt.ontario.tax,2)}/>
          {lttFTHB&&<StatRow label="FTHB Rebate" value={"-"+fCAD(ltt.ontario.rebate,2)} color={C.green}/>}
          <StatRow label="Ontario LTT Owing" value={fCAD(ltt.ontario.net,2)} big color={C.blue}/>
          {lttToronto&&(
            <>
              <Divider/>
              <SectionTitle>Toronto Municipal LTT</SectionTitle>
              <StatRow label="Base Tax" value={fCAD(ltt.toronto.tax,2)}/>
              {lttFTHB&&<StatRow label="FTHB Rebate" value={"-"+fCAD(ltt.toronto.rebate,2)} color={C.green}/>}
              <StatRow label="Toronto LTT Owing" value={fCAD(ltt.toronto.net,2)} big color={C.blue}/>
            </>
          )}
          <Divider/>
          <div style={{background:"rgba(0,113,227,0.06)",border:"1px solid rgba(0,113,227,0.15)",borderRadius:14,padding:"16px 18px"}}>
            <div style={{fontSize:13,color:C.label,marginBottom:4}}>Total Land Transfer Tax</div>
            <div style={{fontSize:42,fontWeight:700,color:C.blue,letterSpacing:"-0.04em"}}>{fCAD(ltt.total,2)}</div>
            {lttFTHB&&<div style={{fontSize:13,color:C.green,marginTop:6,fontWeight:500}}>FTHB rebates applied</div>}
          </div>
        </>
      )}
    </div>
  );

  const ClosingPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Closing Costs</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Enter the purchase price to see what your client needs to have available.</p>
      <Field label="Purchase Price"><NumInput value={ccPrice} onChange={setCcPrice} pre="$"/></Field>

      {ccPrice>0&&(
        <>
          {/* --- Down payment input + instant summary box --- */}
          <Field label="Down Payment" hint={"min "+fCAD(calcMinDown(ccPrice),0)}>
            <NumInput value={ccDown} onChange={setCcDown} pre="$"/>
            <div style={{display:"flex",gap:6,marginTop:8}}>
              {[{label:"Min",fn:()=>setCcDown(Math.ceil(calcMinDown(ccPrice)))},{label:"10%",fn:()=>setCcDown(Math.round(ccPrice*0.10))},{label:"15%",fn:()=>setCcDown(Math.round(ccPrice*0.15))},{label:"20%",fn:()=>setCcDown(Math.round(ccPrice*0.20))}].map(opt=>(
                <button key={opt.label} onClick={opt.fn}
                  style={{flex:1,height:34,borderRadius:8,border:"1px solid "+C.border,background:"rgba(118,118,128,0.1)",color:C.text,fontSize:13,fontWeight:500,cursor:"pointer",fontFamily:C.font}}>
                  {opt.label}
                </button>
              ))}
            </div>
          </Field>
          <div style={{background:C.navy,borderRadius:16,padding:"18px 20px",marginTop:4,marginBottom:4}}>
            <div style={{fontSize:12,color:"rgba(255,255,255,0.45)",fontWeight:500,letterSpacing:"0.05em",textTransform:"uppercase",marginBottom:12}}>Total Funds Required</div>
            <div style={{display:"flex",flexDirection:"column",gap:10}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>{ccDown>0?"Down Payment":"Min Down Payment"}</span>
                <span style={{fontSize:16,fontWeight:600,color:"#fff"}}>{fCAD(ccDown>0?ccDown:calcMinDown(ccPrice),0)}</span>
              </div>
              {ccDown>0&&ccDown<calcMinDown(ccPrice)&&(
                <div style={{fontSize:12,color:C.red,fontWeight:500}}>Below minimum required ({fCAD(calcMinDown(ccPrice),0)})</div>
              )}
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:14,color:"rgba(255,255,255,0.6)"}}>Closing Costs (1.5%)</span>
                <span style={{fontSize:16,fontWeight:600,color:"#fff"}}>{fCAD(ccPrice*0.015,0)}</span>
              </div>
              <div style={{height:1,background:"rgba(255,255,255,0.1)"}}/>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                <span style={{fontSize:15,fontWeight:600,color:"rgba(255,255,255,0.85)"}}>Total to Show Bank</span>
                <span style={{fontSize:22,fontWeight:700,color:C.green,letterSpacing:"-0.02em"}}>{fCAD((ccDown>0?ccDown:calcMinDown(ccPrice))+ccPrice*0.015,0)}</span>
              </div>
            </div>
          </div>
          <div style={{marginTop:12,display:"flex",flexDirection:"column",gap:12}}>
            <Field label="First-Time Buyer">
              <Pills value={ccFTHB} onChange={setCcFTHB} options={[{value:false,label:"No"},{value:true,label:"Yes (LTT rebate)"}]}/>
            </Field>
            <Field label="City of Toronto">
              <Pills value={ccToronto} onChange={setCcToronto} options={[{value:false,label:"No"},{value:true,label:"Yes"}]}/>
            </Field>
          </div>

          <Divider/>
          <SectionTitle>Closing Cost Breakdown</SectionTitle>
          <div style={{background:"rgba(255,149,0,0.08)",border:"1px solid rgba(255,149,0,0.2)",borderRadius:10,padding:"10px 14px",marginBottom:16,fontSize:13,color:C.amber}}>
            Guideline: 1.5% = {fCAD(ccPrice*0.015,0)}. Adjust line items below to match your client.
          </div>
          <Field label="Legal Fees"><NumInput value={ccLegal} onChange={setCcLegal} pre="$"/></Field>
          <Field label="Home Inspection"><NumInput value={ccInspect} onChange={setCcInspect} pre="$"/></Field>
          <Field label="Title Insurance"><NumInput value={ccTitle} onChange={setCcTitle} pre="$"/></Field>
          <Field label="Other / Adjustments"><NumInput value={ccOther} onChange={setCcOther} pre="$"/></Field>
        </>
      )}
      {closing&&(
        <>
          <Divider/>
          <SectionTitle>Detailed Summary</SectionTitle>
          <StatRow label="Land Transfer Tax" value={fCAD(closing.lttTotal,0)} sub={ccToronto?"Ontario + Toronto":"Ontario only"}/>
          <StatRow label="Legal Fees" value={fCAD(closing.legal,0)}/>
          <StatRow label="Home Inspection" value={fCAD(closing.inspect,0)}/>
          <StatRow label="Title Insurance" value={fCAD(closing.title,0)}/>
          <StatRow label="Other / Adjustments" value={fCAD(closing.other,0)}/>
          <div style={{background:"rgba(0,113,227,0.06)",border:"1px solid rgba(0,113,227,0.15)",borderRadius:14,padding:"16px 18px",marginTop:14}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:4}}>
              <div style={{fontSize:13,color:C.label}}>Itemized Closing Costs</div>
              <div style={{fontSize:13,fontWeight:600,color:closing.pct<=1.5?C.green:C.amber}}>{closing.pct.toFixed(2)}% of price</div>
            </div>
            <div style={{fontSize:42,fontWeight:700,color:C.blue,letterSpacing:"-0.04em"}}>{fCAD(closing.total,0)}</div>
            <div style={{fontSize:12,color:C.label,marginTop:8}}>Guideline (1.5%): {fCAD(closing.targetTotal,0)}</div>
          </div>
        </>
      )}
    </div>
  );

  const RentBuyPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Rent vs Buy</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Compare the true cost of renting vs owning over time.</p>
      <Field label="Monthly Rent"><NumInput value={rvbRent} onChange={setRvbRent} pre="$" suf="/mo"/></Field>
      <Field label="Purchase Price"><NumInput value={rvbPrice} onChange={setRvbPrice} pre="$"/></Field>
      <Field label="Down Payment" hint="Leave 0 for minimum"><NumInput value={rvbDown} onChange={setRvbDown} pre="$"/></Field>
      <Field label="Interest Rate"><NumInput value={rvbRate} onChange={setRvbRate} pre="%" suf="annual"/></Field>
      <Field label="Home Appreciation"><NumInput value={rvbAppreciation} onChange={setRvbAppreciation} pre="%" suf="/yr"/></Field>
      <Field label="Annual Rent Increase"><NumInput value={rvbRentIncrease} onChange={setRvbRentIncrease} pre="%" suf="/yr"/></Field>
      <Field label="Time Horizon">
        <Pills value={rvbYears} onChange={setRvbYears} options={[{value:5,label:"5 yrs"},{value:10,label:"10 yrs"},{value:15,label:"15 yrs"},{value:25,label:"25 yrs"}]}/>
      </Field>
      {rvb&&(
        <>
          <Divider/>
          <SectionTitle>Over {rvbYears} Years</SectionTitle>
          <StatRow label="Monthly Mortgage Payment" value={fCAD(rvb.pmt,0)+"/mo"}/>
          <StatRow label="Down Payment Used" value={fCAD(rvb.dn,0)}/>
          <StatRow label="Total Cost of Buying" value={fCAD(rvb.totalBuyCost,0)} sub="Pmts + tax + maintenance"/>
          <StatRow label="Total Cost of Renting" value={fCAD(rvb.totalRentCost,0)}/>
          <StatRow label="Projected Home Value" value={fCAD(rvb.futureValue,0)} color={C.green}/>
          <StatRow label="Equity Built" value={fCAD(rvb.equity,0)} color={C.green} big/>
          <InfoBox color={rvb.buyWins?"green":"amber"}>
            <div style={{fontWeight:600,marginBottom:4}}>{rvb.buyWins?"Buying wins over "+rvbYears+" years":"Renting is cheaper over "+rvbYears+" years"}</div>
            <div style={{fontSize:13,fontWeight:400}}>
              {rvb.buyWins
                ?"After accounting for equity built, buying results in a better net position."
                :"Consider a longer time horizon  buying typically wins over 10+ years."}
            </div>
          </InfoBox>
        </>
      )}
    </div>
  );

  const AmortPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Amortization Table</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Year-by-year breakdown of principal, interest, and remaining balance.</p>
      <Field label="Purchase Price"><NumInput value={atPrice} onChange={setAtPrice} pre="$"/></Field>
      <Field label="Down Payment" hint="Leave 0 for minimum"><NumInput value={atDown} onChange={setAtDown} pre="$"/></Field>
      <Field label="Interest Rate"><NumInput value={atRate} onChange={setAtRate} pre="%" suf="annual"/></Field>
      <Field label="Amortization"><NumInput value={atAmort} onChange={v=>setAtAmort(Math.min(30,Math.max(1,v)))} suf="years"/></Field>
      <Field label="Compounding">
        <Pills value={atComp} onChange={setAtComp} options={COMPOUNDS.map(x=>({key:x.key,label:x.label}))}/>
      </Field>
      {amortTable.rows&&amortTable.rows.length>0&&(
        <>
          <Divider/>
          <div style={{marginBottom:10,display:"flex",justifyContent:"space-between"}}>
            <span style={{fontSize:13,color:C.label}}>Monthly payment</span>
            <span style={{fontSize:15,fontWeight:700,color:C.blue}}>{fCAD(amortTable.pmt,2)}</span>
          </div>
          <div style={{overflowX:"auto",borderRadius:12,border:"1px solid "+C.border}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontSize:13,fontFamily:C.font}}>
              <thead>
                <tr style={{background:"rgba(118,118,128,0.07)"}}>
                  {["Year","Payment","Interest","Principal","Balance"].map(h=>(
                    <th key={h} style={{padding:"10px 12px",textAlign:"right",color:C.label,fontWeight:600,fontSize:12,borderBottom:"1px solid "+C.border}}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {amortTable.rows.map((r,i)=>(
                  <tr key={r.yr} style={{background:i%2===0?"transparent":"rgba(118,118,128,0.04)"}}>
                    <td style={{padding:"9px 12px",textAlign:"right",fontWeight:600,color:C.blue}}>Yr {r.yr}</td>
                    <td style={{padding:"9px 12px",textAlign:"right"}}>{fCAD(r.payment,0)}</td>
                    <td style={{padding:"9px 12px",textAlign:"right",color:C.red}}>{fCAD(r.interest,0)}</td>
                    <td style={{padding:"9px 12px",textAlign:"right",color:C.green}}>{fCAD(r.principal,0)}</td>
                    <td style={{padding:"9px 12px",textAlign:"right",fontWeight:500}}>{fCAD(r.balance,0)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );

  const RefiPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Refinance Calculator</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>See how much you save by refinancing to a lower rate.</p>
      <Field label="Current Balance"><NumInput value={rfBalance} onChange={setRfBalance} pre="$"/></Field>
      <Field label="Current Rate"><NumInput value={rfCurrentRate} onChange={setRfCurrentRate} pre="%" suf="annual"/></Field>
      <Field label="New Rate"><NumInput value={rfNewRate} onChange={setRfNewRate} pre="%" suf="annual"/></Field>
      <Field label="Remaining Amortization"><NumInput value={rfAmort} onChange={setRfAmort} suf="years"/></Field>
      <Field label="Prepayment Penalty" hint="Leave 0 if none"><NumInput value={rfPenalty} onChange={setRfPenalty} pre="$"/></Field>
      <Field label="Compounding">
        <Pills value={rfComp} onChange={setRfComp} options={COMPOUNDS.map(x=>({key:x.key,label:x.label}))}/>
      </Field>
      {refi&&(
        <>
          <Divider/>
          <SectionTitle>Results</SectionTitle>
          <StatRow label="Current Payment" value={fCAD(refi.oldPmt,2)+"/mo"}/>
          <StatRow label="New Payment" value={fCAD(refi.newPmt,2)+"/mo"} color={refi.saves?C.green:C.red}/>
          <StatRow label="Monthly Savings" value={fCAD(Math.abs(refi.monthlySavings),2)+"/mo"} color={refi.saves?C.green:C.red} big/>
          <StatRow label="Annual Savings" value={fCAD(Math.abs(refi.annualSavings),0)+"/yr"} color={refi.saves?C.green:C.red}/>
          {rfPenalty>0&&<StatRow label="Break-Even" value={refi.breakEvenMonths+" months"} color={refi.breakEvenMonths<24?C.green:C.amber}/>}
          <StatRow label="Lifetime Savings" value={fCAD(Math.abs(refi.lifetimeSavings),0)}/>
          <InfoBox color={refi.saves?"green":"red"}>
            <div style={{fontWeight:600}}>{refi.saves?"Refinancing saves money.":"New rate is higher than current rate."}</div>
            {refi.saves&&rfPenalty>0&&<div style={{fontSize:13,fontWeight:400,marginTop:3}}>Break-even in {refi.breakEvenMonths} months  {refi.breakEvenMonths<24?"worth it.":"consider carefully."}</div>}
          </InfoBox>
        </>
      )}
    </div>
  );

  const RenewalPane=(
    <div style={{paddingBottom:16}}>
      <SectionTitle>Renewal Planner</SectionTitle>
      <p style={{fontSize:14,color:C.label,marginBottom:20,lineHeight:1.6}}>Plan ahead for your mortgage renewal and compare rate scenarios.</p>
      <Field label="Current Balance"><NumInput value={rnBalance} onChange={setRnBalance} pre="$"/></Field>
      <Field label="Current Rate"><NumInput value={rnCurrentRate} onChange={setRnCurrentRate} pre="%" suf="annual"/></Field>
      <Field label="New Rate at Renewal"><NumInput value={rnNewRate} onChange={setRnNewRate} pre="%" suf="annual"/></Field>
      <Field label="Remaining Amortization"><NumInput value={rnAmort} onChange={setRnAmort} suf="years"/></Field>
      <Field label="Renewal Date">
        <input type="date" value={rnRenewalDate} onChange={e=>setRnRenewalDate(e.target.value)}
          style={{width:"100%",height:44,borderRadius:10,border:"1.5px solid "+C.border,background:"rgba(118,118,128,0.12)",fontSize:16,color:C.text,padding:"0 14px",fontFamily:C.font,outline:"none",boxSizing:"border-box"}}/>
      </Field>
      <Field label="Compounding">
        <Pills value={rnComp} onChange={setRnComp} options={COMPOUNDS.map(x=>({key:x.key,label:x.label}))}/>
      </Field>
      {renewal&&(
        <>
          <Divider/>
          <SectionTitle>Renewal Impact</SectionTitle>
          {renewal.daysUntil!==null&&(
            <div style={{background:renewal.urgency==="red"?"rgba(255,59,48,0.1)":renewal.urgency==="amber"?"rgba(255,149,0,0.1)":"rgba(52,199,89,0.1)",borderRadius:12,padding:"12px 16px",marginBottom:16,fontSize:14,fontWeight:600,color:renewal.urgency==="red"?C.red:renewal.urgency==="amber"?C.amber:C.green}}>
              {renewal.daysUntil>0?renewal.daysUntil+" days until renewal":"Renewal date has passed"}
              {renewal.urgency==="red"&&" - Act now!"}
              {renewal.urgency==="amber"&&" - Start shopping rates"}
            </div>
          )}
          <StatRow label="Current Payment" value={fCAD(renewal.oldPmt,2)+"/mo"}/>
          <StatRow label="New Payment" value={fCAD(renewal.newPmt,2)+"/mo"} color={renewal.higher?C.red:C.green}/>
          <StatRow label="Payment Change" value={(renewal.higher?"+":"-")+fCAD(Math.abs(renewal.diff),2)+"/mo"} color={renewal.higher?C.red:C.green} big/>
          <StatRow label="Annual Impact" value={(renewal.higher?"+":"-")+fCAD(Math.abs(renewal.diff)*12,0)+"/yr"} color={renewal.higher?C.red:C.green}/>
          <InfoBox color={renewal.higher?"red":"green"}>
            <div style={{fontWeight:600}}>{renewal.higher?"Payment will increase at renewal.":"Payment will decrease at renewal."}</div>
            <div style={{fontSize:13,fontWeight:400,marginTop:3}}>
              {renewal.higher?"Consider locking in early if rates are expected to rise further.":"Great time to lock in a lower rate."}
            </div>
          </InfoBox>
        </>
      )}
    </div>
  );


function DisclaimerBar(){
  const[open,setOpen]=useState(false);
  return(
    <div style={{borderTop:"1px solid rgba(255,255,255,0.08)",padding:"10px 20px calc(10px + env(safe-area-inset-bottom,0px))"}}>
      <div style={{maxWidth:1100,margin:"0 auto",display:"flex",alignItems:"flex-start",gap:8,flexWrap:"wrap"}}>
        <span style={{fontSize:10,color:"rgba(255,255,255,0.25)",lineHeight:1.6,flex:1,minWidth:200}}>
          For illustration purposes only. Not a commitment to lend. No fees collected through this tool.
          {open&&<span> Results are estimates subject to full lender underwriting, credit adjudication, and appraisal. Stress test per OSFI guidelines (contract rate +2% or 5.25%, whichever is greater). CMHC premiums, LTT, and closing costs are estimates only. No fees or commissions are collected through this tool and use does not establish a client relationship. Regulated by FSRA. For borrower rights visit <a href="https://www.fsrao.ca" style={{color:"rgba(255,255,255,0.3)",textDecoration:"underline"}}>fsrao.ca</a>.</span>}
        </span>
        <button onClick={()=>setOpen(o=>!o)} style={{background:"none",border:"none",cursor:"pointer",fontSize:10,color:"rgba(255,255,255,0.3)",padding:"2px 0",fontFamily:C.font,flexShrink:0,whiteSpace:"nowrap"}}>
          {open?"Show less":"Read more"}
        </button>
      </div>
    </div>
  );
}

  const Footer=(
    <div style={{background:C.navy}}>
      <div style={{padding:mobile?"24px 20px":"28px 40px"}}>
        <div style={{maxWidth:1100,margin:"0 auto",display:"flex",flexDirection:mobile?"column":"row",justifyContent:"space-between",alignItems:mobile?"flex-start":"center",gap:16}}>
          <div style={{display:"flex",alignItems:"center",gap:14}}>
            <img src={NEEL_PHOTO} alt="Neel Idnani" style={{width:52,height:52,borderRadius:"50%",objectFit:"cover",objectPosition:"center center",flexShrink:0,border:"2px solid rgba(255,255,255,0.15)"}}/>
            <div>
              <div style={{color:"#fff",fontWeight:600,fontSize:15,marginBottom:4,letterSpacing:"-0.02em"}}>Neel Idnani Mortgage Group</div>
              <div style={{color:"rgba(255,255,255,0.45)",fontSize:13,marginBottom:8}}>London, Ontario, Canada</div>
              <div style={{display:"flex",flexDirection:"column",gap:4}}>
                <a href="tel:5196972359" style={{color:"rgba(255,255,255,0.55)",fontSize:13,textDecoration:"none"}}>519-697-2359</a>
                <a href="mailto:info@neelidnani.com" style={{color:"rgba(255,255,255,0.55)",fontSize:13,textDecoration:"none"}}>info@neelidnani.com</a>
                <a href="https://www.neelidnani.com" style={{color:"rgba(255,255,255,0.55)",fontSize:13,textDecoration:"none"}}>www.neelidnani.com</a>
              </div>
            </div>
          </div>
          <div style={{color:"rgba(255,255,255,0.28)",fontSize:11,lineHeight:1.7,textAlign:mobile?"left":"right"}}>
            <div>Neel Idnani - Mortgage Agent Level 1</div>
            <div>Lic. #M23005524</div>
            <div>Dominion Lending Centres FC Funding</div>
            <div>Brokerage Lic. FSRA #10671</div>
          </div>
        </div>
      </div>
      <DisclaimerBar/>
    </div>
  );

  const TABS=[
    {key:"inputs",label:"Inputs"},
    {key:"results",label:"Results"},
    {key:"income",label:"Income"},
    {key:"ltt",label:"LTT"},
    {key:"closing",label:"Closing"},
    {key:"rentbuy",label:"Rent/Buy"},
    {key:"amort",label:"Amort"},
    {key:"refi",label:"Refi"},
    {key:"renewal",label:"Renewal"},
  ];

  const paneMap={inputs:InputsPane,results:ResultsPane,income:IncomePane,ltt:LTTPane,closing:ClosingPane,rentbuy:RentBuyPane,amort:AmortPane,refi:RefiPane,renewal:RenewalPane};

  const showResultBar=tab==="inputs"||tab==="results";

  if(!mobile){
    const tabLabels={inputs:"Inputs",results:"Results",income:"Income Tool",ltt:"Land Transfer Tax",closing:"Closing Costs",rentbuy:"Rent vs Buy",amort:"Amortization",refi:"Refinance",renewal:"Renewal Planner"};
    const allTabs=["inputs","results","income","ltt","closing","rentbuy","amort","refi","renewal"];
    return(
      <div style={{fontFamily:C.font,background:C.bg,minHeight:"100vh",color:C.text}}>
        <div style={{background:"rgba(255,255,255,0.92)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:100}}>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px",height:48,display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",alignItems:"center",gap:10}}>
              <img src={NEEL_PHOTO} alt="Neel Idnani" style={{width:30,height:30,borderRadius:"50%",objectFit:"cover",objectPosition:"center center",flexShrink:0,border:"1.5px solid rgba(0,0,0,0.08)"}}/>
              <span style={{fontSize:15,fontWeight:600,color:C.text,letterSpacing:"-0.02em"}}>Mortgage <span style={{fontWeight:400,color:C.label}}>Qualifier</span></span>
            </div>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <button onClick={handleReset} style={{padding:"5px 14px",borderRadius:20,border:"1px solid "+(resetFlash?C.green:C.border),background:resetFlash?"rgba(52,199,89,0.1)":"transparent",fontSize:13,color:resetFlash?C.green:C.label,cursor:"pointer",fontFamily:C.font,transition:"all 0.3s"}}>{resetFlash?"Cleared":"Reset"}</button>
              <a href="https://velocity-client.newton.ca/en/client/journey/home?shortCode=pzdcffg7l1o6" target="_blank" rel="noopener noreferrer"
                style={{padding:"6px 18px",borderRadius:20,background:C.blue,fontSize:13,fontWeight:600,color:"#fff",textDecoration:"none"}}>
                Apply Now
              </a>
            </div>
          </div>
          <div style={{maxWidth:1200,margin:"0 auto",padding:"0 32px",borderTop:"1px solid "+C.border,display:"flex",overflowX:"auto",scrollbarWidth:"none"}}>
            {allTabs.map(k=>(
              <button key={k} onClick={()=>setTab(k)}
                style={{flexShrink:0,padding:"9px 16px",border:"none",background:"transparent",fontFamily:C.font,fontSize:13,fontWeight:tab===k?600:400,color:tab===k?C.blue:C.label,borderBottom:"2px solid "+(tab===k?C.blue:"transparent"),cursor:"pointer",transition:"all 0.18s",whiteSpace:"nowrap"}}>
                {tabLabels[k]}
              </button>
            ))}
          </div>
        </div>
        <div style={{maxWidth:1200,margin:"0 auto",padding:"32px 32px 60px"}}>
          <div style={{background:C.surface,borderRadius:20,padding:"28px 32px",boxShadow:"0 1px 3px rgba(0,0,0,0.06)"}}>
            {paneMap[tab]}
          </div>
        </div>
        {Footer}
      </div>
    );
  }

  return(
    <div style={{fontFamily:C.font,background:C.bg,color:C.text,maxWidth:"100vw",overflowX:"hidden",minHeight:"100vh",display:"flex",flexDirection:"column"}}>
      <div style={{background:"rgba(249,249,249,0.94)",backdropFilter:"blur(20px)",WebkitBackdropFilter:"blur(20px)",borderBottom:"1px solid "+C.border,position:"sticky",top:0,zIndex:100}}>
        <div style={{padding:"8px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
          <div style={{display:"flex",alignItems:"center",gap:8}}>
            <img src={NEEL_PHOTO} alt="Neel Idnani" style={{width:30,height:30,borderRadius:"50%",objectFit:"cover",objectPosition:"center center",flexShrink:0,border:"1.5px solid rgba(0,0,0,0.08)"}}/>
            <span style={{fontSize:15,fontWeight:600,letterSpacing:"-0.02em"}}>Mortgage Qualifier</span>
          </div>
          <div style={{display:"flex",gap:8,alignItems:"center"}}>
            <button onClick={handleReset} style={{padding:"5px 14px",borderRadius:20,border:"1px solid "+(resetFlash?C.green:C.border),background:resetFlash?"rgba(52,199,89,0.1)":"transparent",fontSize:13,color:resetFlash?C.green:C.label,cursor:"pointer",fontFamily:C.font,transition:"all 0.3s"}}>{resetFlash?"Cleared":"Reset"}</button>
            <a href="https://velocity-client.newton.ca/en/client/journey/home?shortCode=pzdcffg7l1o6" target="_blank" rel="noopener noreferrer"
              style={{padding:"5px 14px",borderRadius:20,background:C.blue,fontSize:13,fontWeight:600,color:"#fff",textDecoration:"none"}}>
              Apply
            </a>
          </div>
        </div>
        <div style={{display:"flex",overflowX:"auto",overflowY:"hidden",borderTop:"1px solid "+C.border,WebkitOverflowScrolling:"touch",msOverflowStyle:"none",scrollbarWidth:"none",minHeight:40}}>
          {TABS.map(t=>(
            <button key={t.key} onClick={()=>setTab(t.key)}
              style={{flexShrink:0,padding:"9px 14px",border:"none",background:"transparent",fontFamily:C.font,fontSize:13,fontWeight:tab===t.key?600:400,color:tab===t.key?C.blue:C.label,borderBottom:"2px solid "+(tab===t.key?C.blue:"transparent"),cursor:"pointer",transition:"all 0.18s",whiteSpace:"nowrap",WebkitTapHighlightColor:"transparent"}}>
              {t.label}
            </button>
          ))}
        </div>
      </div>

      <div style={{flex:1,padding:"20px 16px 0"}}>
        {paneMap[tab]}
      </div>

      {showResultBar&&(
        <div style={{position:"sticky",bottom:0,zIndex:99}}>
          <ResultBar c={c} selPmt={selPmt} payFreq={payFreq}/>
        </div>
      )}

      {Footer}
    </div>
  );
}
