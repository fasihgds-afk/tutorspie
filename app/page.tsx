"use client";
import { useState, useRef, useEffect, type MouseEvent } from "react";
import ReferenceContent from "@/components/reference-content";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
type Mode = "order" | "login" | "support" | "info" | null;
export default function Home() {
  const [mode,setMode]=useState<Mode>(null);
  const [complete,setComplete]=useState(false);
  const [summary,setSummary]=useState<string[]>([]);
  const [info,setInfo]=useState("");
  const root=useRef<HTMLDivElement>(null);
  function open(next:Mode){setComplete(false);setMode(next);}
  function click(event:MouseEvent<HTMLDivElement>){
    const element=(event.target as HTMLElement).closest<HTMLElement>("a,button,[data-bs-slide-to],#navbar_closer,[data-bs-toggle]");
    if(!element)return;
    const target=element.dataset.bsTarget;
    if(element.dataset.bsToggle==="collapse" && target){
      event.preventDefault();const panel=document.querySelector(target);const shown=panel?.classList.toggle("show");
      element.setAttribute("aria-expanded",String(!!shown));element.classList.toggle("collapsed",!shown);return;
    }
    if(element.id==="navbar_closer"){document.querySelector("#nav_responsive")?.classList.remove("show");document.querySelector(".navbar-toggler")?.setAttribute("aria-expanded","false");return;}
    if(element.dataset.bsSlideTo!==undefined && target){
      event.preventDefault();const carousel=document.querySelector(target);const index=Number(element.dataset.bsSlideTo);
      carousel?.querySelectorAll(".carousel-item").forEach((slide,i)=>slide.classList.toggle("active",i===index));
      carousel?.querySelectorAll("[data-bs-slide-to]").forEach((dot,i)=>{dot.classList.toggle("active",i===index);dot.setAttribute("aria-current",String(i===index));});return;
    }
    const action=element.dataset.action;
    if(action){
      event.preventDefault();
      if(action==="order")setSummary(Array.from(root.current?.querySelectorAll(".main_form select")??[]).map(s=>(s as unknown as HTMLSelectElement).selectedOptions[0]?.textContent?.trim()??""));
      if(action==="info")setInfo(element.textContent?.trim()??"About Tutorspie");
      open(action as Mode);return;
    }
    if(element.dataset.bsToggle==="modal"){event.preventDefault();setInfo("Design preview");open("info");}
  }
  useEffect(()=>{
    const node=root.current;
    const keyboard=(event:KeyboardEvent)=>{const el=event.target as HTMLElement;if((event.key==="Enter"||event.key===" ")&&el.getAttribute("role")==="button"){event.preventDefault();el.click();}};
    node?.addEventListener("keydown",keyboard);return()=>node?.removeEventListener("keydown",keyboard);
  },[]);
  useEffect(()=>{
    type Context={registerTool:(tool:{name:string;description:string;inputSchema:object;annotations:object;execute:(input:unknown)=>Promise<object>},options:{signal:AbortSignal})=>unknown};
    const context=(document as unknown as {modelContext?:Context}).modelContext;
    if(!context)return;
    const lifecycle=new AbortController();
    try{Promise.resolve(context.registerTool({name:"start_order_preview",description:"Open the Tutorspie order preview with the current selections. Does not place an order or submit data.",inputSchema:{type:"object",properties:{},additionalProperties:false},annotations:{readOnlyHint:false},execute:async(input)=>{
      if(!input||typeof input!=="object"||Object.keys(input).length)throw new Error("Expected an empty object.");
      const values=Array.from(root.current?.querySelectorAll(".main_form select")??[]).map(s=>(s as unknown as HTMLSelectElement).selectedOptions[0]?.textContent?.trim()??"");
      setSummary(values);setComplete(false);setMode("order");
      await new Promise<void>(resolve=>requestAnimationFrame(()=>resolve()));
      return {status:"preview_open",selections:values,orderPlaced:false};
    }},{signal:lifecycle.signal})).catch(()=>{});}catch{/* Optional browser capability. */}
    return()=>lifecycle.abort();
  },[]);
  return <>
    <a className="skip-link" href="#home">Skip to content</a>
    <div ref={root} onClick={click} onSubmit={event=>event.preventDefault()}><ReferenceContent/></div>
    <div className="preview-note">Tutorspie design preview · Profiles, ratings, offers, and testimonials are sample content.</div>
    <button className="support-fab" onClick={()=>open("support")} aria-label="Open support">💬 <span>Let’s talk</span></button>
    <Dialog open={mode!==null} onOpenChange={value=>{if(!value)setMode(null)}}>
      <DialogContent className="tutorspie-dialog">
        <DialogTitle>{mode==="order"?(complete?"Your order preview is ready":"Let’s get started"):mode==="login"?"Welcome to Tutorspie":mode==="support"?"Tutorspie support":info}</DialogTitle>
        <DialogDescription>{mode==="order"?"Review your requirements. This frontend preview does not place an order or take payment.":mode==="login"?"Account access will be available when the backend is connected.":mode==="support"?"Live support is not connected in this frontend preview.":"Tutorspie academic writing assistance."}</DialogDescription>
        {mode==="order" && (complete?<div role="status" className="confirmation"><strong>Requirements reviewed successfully.</strong><p>No information was sent or saved. Ordering and payments will become available after backend integration.</p><button className="primary-action" onClick={()=>setMode(null)}>Back to website</button></div>:<form className="preview-form" onSubmit={e=>{e.preventDefault();setComplete(true)}}>
          {summary.length>0&&<div className="order-summary">{summary.map((text,i)=><div key={i}><small>{["Assignment","Academic level","Subject","Deadline"][i]}</small><strong>{text}</strong></div>)}</div>}
          <label>Your name<input name="name" autoComplete="name" required placeholder="Full name"/></label>
          <label>Email address<input name="email" autoComplete="email" type="email" required placeholder="you@example.com"/></label>
          <label>Project details<textarea name="details" required rows={3} placeholder="Describe your topic and requirements"/></label>
          <button className="primary-action" type="submit">Review order preview</button>
        </form>)}
        {mode==="login"&&<div className="confirmation"><p>Sign-in, registration, and your order dashboard are planned for the next phase.</p><button className="primary-action" onClick={()=>open("order")}>Explore the order form</button></div>}
        {mode==="support"&&<div className="confirmation"><p>You can explore our frequently asked questions or preview the order form.</p><a className="primary-action" href="#faq" onClick={()=>setMode(null)}>Read the FAQs</a></div>}
        {mode==="info"&&<div className="confirmation"><p>{/privacy/i.test(info)?"This preview does not transmit form entries or create accounts. A privacy policy will be added before the service launches.":/terms/i.test(info)?"Service terms will be added before Tutorspie begins accepting orders. Academic support materials are intended for research and learning.":"Tutorspie helps students explore academic writing support. This is a frontend design preview; reference profiles, awards, ratings, and promotional claims are illustrative and are not verified Tutorspie credentials."}</p></div>}
      </DialogContent>
    </Dialog>
  </>;
}

